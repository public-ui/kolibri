import type { HydrateRenderer, HydrateRendererOptions, HydrateRendererResult } from './types.js';

/**
 * Simplified resource cleanup utility for hydration rendering.
 * Focuses on timers and DOM globals only - does NOT touch process event listeners.
 */
export class HydrateResourceManager {
	private activeTimers = new Set<NodeJS.Timeout>();
	private originalHandlers: {
		setTimeout?: typeof setTimeout;
		setInterval?: typeof setInterval;
		clearTimeout?: typeof clearTimeout;
		clearInterval?: typeof clearInterval;
	} = {};
	private isTrackingEnabled = false;

	/**
	 * Enable aggressive timer tracking (similar to hydrate-adapter approach)
	 */
	public enableTimerTracking(): void {
		if (this.isTrackingEnabled) return;

		// Store original handlers
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.originalHandlers.setTimeout = (global as any).setTimeout;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.originalHandlers.setInterval = (global as any).setInterval;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.originalHandlers.clearTimeout = (global as any).clearTimeout;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.originalHandlers.clearInterval = (global as any).clearInterval;

		// Intercept timer creation like in hydrate-adapter
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(global as any).setTimeout = (...args: any[]) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const timer = (this.originalHandlers.setTimeout as any).apply(global, args);
			this.activeTimers.add(timer);
			return timer;
		};

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(global as any).setInterval = (...args: any[]) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const timer = (this.originalHandlers.setInterval as any).apply(global, args);
			this.activeTimers.add(timer);
			return timer;
		};

		// Intercept timer clearing
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(global as any).clearTimeout = (timer: any) => {
			this.activeTimers.delete(timer);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return (this.originalHandlers.clearTimeout as any)(timer);
		};

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(global as any).clearInterval = (timer: any) => {
			this.activeTimers.delete(timer);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return (this.originalHandlers.clearInterval as any)(timer);
		};

		this.isTrackingEnabled = true;
	}

	/**
	 * Disable timer tracking and restore original handlers
	 */
	public disableTimerTracking(): void {
		if (!this.isTrackingEnabled) return;

		// Clear all active timers before restoring
		this.clearAllTimers();

		// Restore original handlers
		if (this.originalHandlers.setTimeout) global.setTimeout = this.originalHandlers.setTimeout;
		if (this.originalHandlers.setInterval) global.setInterval = this.originalHandlers.setInterval;
		if (this.originalHandlers.clearTimeout) global.clearTimeout = this.originalHandlers.clearTimeout;
		if (this.originalHandlers.clearInterval) global.clearInterval = this.originalHandlers.clearInterval;

		this.isTrackingEnabled = false;
	}

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
	 * Clear all tracked timers using original handlers
	 */
	private clearAllTimers(): void {
		for (const timer of this.activeTimers) {
			try {
				if (this.originalHandlers.clearTimeout) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					(this.originalHandlers.clearTimeout as any)(timer);
				}
				if (this.originalHandlers.clearInterval) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					(this.originalHandlers.clearInterval as any)(timer);
				}
			} catch {
				// Ignore errors when clearing timers
			}
		}
		this.activeTimers.clear();
	}

	/**
	 * Clean up all tracked resources - focuses on timers and DOM globals only.
	 * Does NOT clear process event listeners, as those belong to the host application.
	 */
	public cleanup(): void {
		// Clear all active timers first
		this.clearAllTimers();

		// Aggressive module cache clearing (similar to hydrate-adapter approach)
		this.clearModuleCache();

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

		// Force garbage collection if available (twice for more thorough cleanup)
		if (global.gc) {
			global.gc();
			// Small delay then GC again to catch more references
			setTimeout(() => {
				if (global.gc) {
					global.gc();
				}
			}, 10);
		}
	}

	/**
	 * Clear module cache for better isolation - focuses on Stencil/component modules only.
	 * Uses aggressive strategy similar to hydrate-adapter.
	 */
	private clearModuleCache(): void {
		// Clear require cache for Stencil-related modules to prevent accumulation
		if (typeof require !== 'undefined' && require.cache) {
			Object.keys(require.cache).forEach((key) => {
				// Aggressive clearing like in hydrate-adapter tests - clear ALL @public-ui/components modules
				// except custom-elements.json to prevent state accumulation
				if (key.includes('@public-ui/components') && !key.includes('custom-elements.json')) {
					try {
						delete require.cache[key];
					} catch {
						// Ignore errors
					}
				}
				// Also clear Stencil and hydrate-related modules
				else if (key.includes('stencil') || key.includes('hydrate')) {
					try {
						delete require.cache[key];
					} catch {
						// Ignore errors
					}
				}
			});
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

	constructor(private baseRenderer: HydrateRenderer) {
		// Enable aggressive timer tracking (similar to hydrate-adapter approach)
		this.resourceManager.enableTimerTracking();
	}

	/**
	 * Render HTML with automatic resource cleanup and timeout protection
	 */
	public async render(html: string, options?: HydrateRendererOptions): Promise<HydrateRendererResult> {
		let renderTimeout: NodeJS.Timeout | null = null;

		try {
			// Clean up any lingering resources before rendering (timers and DOM globals only)
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
			// Always clean up on error or timeout with aggressive strategy
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
		this.resourceManager.disableTimerTracking();
	}
}
