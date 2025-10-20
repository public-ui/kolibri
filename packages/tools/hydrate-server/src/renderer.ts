import type { HydrateRenderer, RenderResponsePayload } from './types.js';

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

export const hydrateFragment = async (renderer: HydrateRenderer, html: string, options?: unknown): Promise<RenderResponsePayload> => {
	if (typeof html !== 'string' || html.trim().length === 0) {
		throw new TypeError('HTML input must be a non-empty string');
	}

	const normalizedOptions = isPlainObject(options) ? options : undefined;
	const result = await renderer(html, normalizedOptions);

	return {
		html: typeof result.html === 'string' ? result.html : html,
		components: coerceComponents(result.components),
		hydratedCount: coerceHydratedCount(result.hydratedCount),
		diagnostics: normalizeDiagnostics(result.diagnostics),
	};
};
