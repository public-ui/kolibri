import type { HydrateRenderer, HydrateRendererOptions, RenderResponsePayload } from './types.js';

export const isPlainObject = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const normalizeDiagnostics = (diagnostics: unknown): unknown[] => {
	if (!diagnostics) {
		return [];
	}

	if (Array.isArray(diagnostics)) {
		return diagnostics;
	}

	return [diagnostics];
};

const coerceComponents = (components: unknown): string[] => {
	if (!Array.isArray(components)) {
		return [];
	}

	return components.filter((component): component is string => typeof component === 'string');
};

const coerceHydratedCount = (hydratedCount: unknown): number => {
	return typeof hydratedCount === 'number' && Number.isFinite(hydratedCount) ? hydratedCount : 0;
};

const DEFAULT_RENDERER_OPTIONS: Readonly<HydrateRendererOptions> = Object.freeze({
	clientHydrateAnnotations: false,
	destroyDocument: true,
	destroyWindow: true,
	prettyHtml: false,
	removeAttributeQuotes: false,
	removeBooleanAttributeQuotes: true,
	removeEmptyAttributes: false,
	removeHtmlComments: true,
	removeUnusedStyles: true,
	serializeToHtml: true,
	timeout: 5000,
});

const mergeHydrateOptions = (base: Record<string, unknown> | undefined, overrides: Record<string, unknown> | undefined): HydrateRendererOptions => ({
	...DEFAULT_RENDERER_OPTIONS,
	...(base ?? {}),
	...(overrides ?? {}),
});

export const hydrateFragment = async (
	renderer: HydrateRenderer,
	html: string,
	options?: unknown,
	baseOptions?: Record<string, unknown>,
): Promise<RenderResponsePayload> => {
	if (typeof html !== 'string' || html.trim().length === 0) {
		throw new TypeError('HTML input must be a non-empty string');
	}

	const normalizedOptions = isPlainObject(options) ? (options as Record<string, unknown>) : undefined;
	const normalizedBaseOptions = isPlainObject(baseOptions) ? baseOptions : undefined;
	const effectiveOptions = mergeHydrateOptions(normalizedBaseOptions, normalizedOptions);

	const result = await renderer(html, effectiveOptions);

	return {
		html: typeof result.html === 'string' ? result.html : html,
		components: coerceComponents(result.components),
		hydratedCount: coerceHydratedCount(result.hydratedCount),
		diagnostics: normalizeDiagnostics(result.diagnostics),
	};
};
