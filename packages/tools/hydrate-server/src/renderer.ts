import { IsolatedHydrateRenderer } from './resource-manager.js';
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
	timeout: 5000, // Keep original timeout for backward compatibility
});

const mergeHydrateOptions = (base: Record<string, unknown> | undefined, overrides: Record<string, unknown> | undefined): HydrateRendererOptions => ({
	...DEFAULT_RENDERER_OPTIONS,
	...(base ?? {}),
	...(overrides ?? {}),
});

// Global isolated renderer instance for resource management
let globalIsolatedRenderer: IsolatedHydrateRenderer | null = null;

/**
 * Initialize or get the global isolated renderer
 */
export const getIsolatedRenderer = (baseRenderer: HydrateRenderer): IsolatedHydrateRenderer => {
	if (!globalIsolatedRenderer) {
		globalIsolatedRenderer = new IsolatedHydrateRenderer(baseRenderer);
	}
	return globalIsolatedRenderer;
};

/**
 * Cleanup the global isolated renderer
 */
export const cleanupGlobalRenderer = (): void => {
	if (globalIsolatedRenderer) {
		globalIsolatedRenderer.destroy();
		globalIsolatedRenderer = null;
	}
};

/**
 * Creates a timeout promise that rejects after a specified duration
 */
const createTimeoutPromise = (timeoutMs: number, componentHtml: string): Promise<never> => {
	return new Promise((_, reject) => {
		setTimeout(() => {
			reject(new Error(`Hydration timeout after ${timeoutMs}ms for component: ${componentHtml.substring(0, 100)}...`));
		}, timeoutMs);
	});
};

/**
 * Server-optimized hydrate function that reuses isolated renderer instance
 */
export const hydrateFragmentForServer = async (
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

	// Extract timeout from options or use default
	const timeoutMs = (effectiveOptions.timeout as number) || 5000;

	// Use shared isolated renderer for server efficiency
	const isolatedRenderer = getIsolatedRenderer(renderer);

	try {
		// Race between rendering and timeout to prevent hanging
		const renderPromise = isolatedRenderer.render(html, effectiveOptions);
		const timeoutPromise = createTimeoutPromise(timeoutMs, html);

		const result = await Promise.race([renderPromise, timeoutPromise]);

		return {
			html: typeof result.html === 'string' ? result.html : html,
			components: coerceComponents(result.components),
			hydratedCount: coerceHydratedCount(result.hydratedCount),
			diagnostics: normalizeDiagnostics(result.diagnostics),
		};
	} catch (error) {
		// Log renderer stats for debugging
		const stats = isolatedRenderer.getStats();
		console.warn(`Hydration failed with ${stats.activeTimers} active timers:`, error);

		// Force cleanup on timeout/error
		isolatedRenderer.destroy();
		globalIsolatedRenderer = null;

		throw error;
	}
};

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

	// Extract timeout from options or use default
	const timeoutMs = (effectiveOptions.timeout as number) || 5000;

	// Create a new isolated renderer for each call to ensure test isolation
	const isolatedRenderer = new IsolatedHydrateRenderer(renderer);

	try {
		// Race between rendering and timeout to prevent hanging
		const renderPromise = isolatedRenderer.render(html, effectiveOptions);
		const timeoutPromise = createTimeoutPromise(timeoutMs, html);

		const result = await Promise.race([renderPromise, timeoutPromise]);

		// Clean up after successful rendering
		isolatedRenderer.destroy();

		return {
			html: typeof result.html === 'string' ? result.html : html,
			components: coerceComponents(result.components),
			hydratedCount: coerceHydratedCount(result.hydratedCount),
			diagnostics: normalizeDiagnostics(result.diagnostics),
		};
	} catch (error) {
		// Log renderer stats for debugging
		const stats = isolatedRenderer.getStats();
		console.warn(`Hydration failed with ${stats.activeTimers} active timers:`, error);

		// Force cleanup on timeout/error
		isolatedRenderer.destroy();

		throw error;
	}
};
