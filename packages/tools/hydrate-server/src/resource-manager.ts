import type { HydrateRenderer, HydrateRendererOptions, HydrateRendererResult } from './types.js';

/**
 * Simplified resource cleanup utility for hydration rendering
 */
export class HydrateResourceManager {
	private activeTimers = new Set<NodeJS.Timeout>();

	/**
	 * Track a timer for cleanup
	 */
	public trackTimer(timer: NodeJS.Timeout): void {
		this.activeTimers.add(timer);
	}

	/**
	 * Untrack a timer
	 */
	public untrackTimer(timer: NodeJS.Timeout): void {
		this.activeTimers.delete(timer);
	}

	/**
	 * Clean up all tracked resources
	 */
	public cleanup(): void {
		// Clear all active timers
		for (const timer of this.activeTimers) {
			try {
				clearTimeout(timer);
				clearInterval(timer);
			} catch {
				// Ignore errors when clearing timers
			}
		}
		this.activeTimers.clear();

		// Reset DOM-related globals that might accumulate state
		const globalsToReset = ['document', 'window', 'navigator', 'location', 'history', 'screen'];
		for (const globalName of globalsToReset) {
			const globalObj = global as Record<string, unknown>;
			if (globalObj[globalName]) {
				try {
					delete globalObj[globalName];
				} catch {
					// Ignore errors if globals can't be deleted
				}
			}
		}

		// Force garbage collection if available
		if (global.gc) {
			global.gc();
		}
	}

	/**
	 * Get count of active timers (for monitoring)
	 */
	public getActiveTimerCount(): number {
		return this.activeTimers.size;
	}
}

/**
 * Enhanced renderer that provides resource isolation and cleanup
 */
export class IsolatedHydrateRenderer {
	private resourceManager = new HydrateResourceManager();

	constructor(private baseRenderer: HydrateRenderer) {}

	/**
	 * Render HTML with automatic resource cleanup and timeout protection
	 */
	public async render(html: string, options?: HydrateRendererOptions): Promise<HydrateRendererResult> {
		let renderTimeout: NodeJS.Timeout | null = null;

		try {
			// Clean up any lingering resources before rendering
			this.resourceManager.cleanup();

			// Render with enhanced options for proper cleanup
			const enhancedOptions: HydrateRendererOptions = {
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
				timeout: 5000, // Conservative timeout to prevent hanging
				...options,
			};

			// Set up an additional safety timeout
			const safetyTimeoutMs = (enhancedOptions.timeout as number) + 2000; // Extra buffer
			let timeoutReached = false;

			const timeoutPromise = new Promise<never>((_, reject) => {
				renderTimeout = setTimeout(() => {
					timeoutReached = true;
					reject(new Error(`Render safety timeout reached (${safetyTimeoutMs}ms)`));
				}, safetyTimeoutMs);
			});

			const renderPromise = this.baseRenderer(html, enhancedOptions);

			const result = await Promise.race([renderPromise, timeoutPromise]);

			// Clear the safety timeout if render completed normally
			if (renderTimeout) {
				clearTimeout(renderTimeout);
				renderTimeout = null;
			}

			// Clean up resources after successful rendering
			if (!timeoutReached) {
				this.resourceManager.cleanup();
			}

			return result;
		} catch (error) {
			// Always clean up on error or timeout
			if (renderTimeout) {
				clearTimeout(renderTimeout);
			}
			this.resourceManager.cleanup();
			throw error;
		}
	}

	/**
	 * Get rendering statistics
	 */
	public getStats(): { activeTimers: number } {
		return {
			activeTimers: this.resourceManager.getActiveTimerCount(),
		};
	}

	/**
	 * Destroy the renderer and clean up all resources
	 */
	public destroy(): void {
		this.resourceManager.cleanup();
	}
}
