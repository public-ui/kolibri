let data = { collectionUrl: '', shimUrl: '' };
export function initialize(value) {
	data = value;
}
export async function resolve(specifier, context, next) {
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
export async function load(url, context, next) {
	if (!url.startsWith(data.collectionUrl) || !url.endsWith('.js')) return next(url, context);
	const result = await next(url, { ...context, format: 'module' });
	return { ...result, format: 'module', source: superFirst(typeof result.source === 'string' ? result.source : new TextDecoder().decode(result.source)) };
}
/**
 * The collection output initializes the class fields of a derived component before `super()`; the
 * Stencil build moves them later. Moved behind `super()`, the class can be instantiated in Node.
 */
function superFirst(source) {
	return source.replace(/constructor\(([^)]*)\)\s*\{([\s\S]*?)\n(\s*)super\(([^;]*)\);/g, (match, parameters, before, indent, args) =>
		/\bsuper\(/.test(before) ? match : `constructor(${parameters}) {\n${indent}super(${args});${before}`,
	);
}
