/**
 * Module hooks for the Stencil collection output (`dist/collection`) of `@public-ui/components`:
 * its imports carry no file extension, `@stencil/core` resolves to the shim, and its files load as
 * ES modules. Registered by `load-collection.ts` through `module.register`.
 */
interface HookData {
	collectionUrl: string;
	shimUrl: string;
}

interface ResolveContext {
	parentURL?: string;
}

type NextResolve = (specifier: string, context: ResolveContext) => Promise<{ url: string }>;
type NextLoad = (url: string, context: { format?: string }) => Promise<unknown>;

let data: HookData = { collectionUrl: '', shimUrl: '' };

export function initialize(value: HookData): void {
	data = value;
}

export async function resolve(specifier: string, context: ResolveContext, next: NextResolve): Promise<{ url: string; shortCircuit?: boolean }> {
	const inCollection = context.parentURL?.startsWith(data.collectionUrl) === true;
	if (inCollection && specifier === '@stencil/core') return { url: data.shimUrl, shortCircuit: true };
	if (inCollection && /^\.\.?\//.test(specifier) && !/\.(c|m)?js$|\.json$/.test(specifier)) {
		for (const suffix of ['.js', '/index.js']) {
			try {
				return await next(specifier + suffix, context);
			} catch {
				// The next suffix decides.
			}
		}
	}
	return next(specifier, context);
}

export async function load(url: string, context: { format?: string }, next: NextLoad): Promise<unknown> {
	if (!url.startsWith(data.collectionUrl) || !url.endsWith('.js')) return next(url, context);
	const result = (await next(url, { ...context, format: 'module' })) as { source?: ArrayBuffer | string | Uint8Array };
	return { ...result, format: 'module', source: superFirst(typeof result.source === 'string' ? result.source : new TextDecoder().decode(result.source)) };
}

/**
 * The collection output initializes the class fields of a derived component before `super()`; the
 * Stencil build moves them later. Moved behind `super()`, the class can be instantiated in Node.
 */
function superFirst(source: string): string {
	return source.replace(
		/constructor\(([^)]*)\)\s*\{([\s\S]*?)\n(\s*)super\(([^;]*)\);/g,
		(match, parameters: string, before: string, indent: string, args: string) =>
			/\bsuper\(/.test(before) ? match : `constructor(${parameters}) {\n${indent}super(${args});${before}`,
	);
}
