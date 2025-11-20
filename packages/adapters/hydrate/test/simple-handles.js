'use strict';

/**
 * Simple handle tracking for clean test execution
 */

let activeTimers = new Set();

function trackHandles() {
	// Track and intercept timers for cleanup
	const originalSetTimeout = global.setTimeout;
	const originalSetInterval = global.setInterval;
	const originalClearTimeout = global.clearTimeout;
	const originalClearInterval = global.clearInterval;

	global.setTimeout = function (...args) {
		const timer = originalSetTimeout.apply(this, args);
		activeTimers.add(timer);
		return timer;
	};

	global.setInterval = function (...args) {
		const timer = originalSetInterval.apply(this, args);
		activeTimers.add(timer);
		return timer;
	};

	global.clearTimeout = function (timer) {
		activeTimers.delete(timer);
		return originalClearTimeout.call(this, timer);
	};

	global.clearInterval = function (timer) {
		activeTimers.delete(timer);
		return originalClearInterval.call(this, timer);
	};

	// Store original handlers for cleanup
	const originalHandlers = {
		setTimeout: originalSetTimeout,
		setInterval: originalSetInterval,
		clearTimeout: originalClearTimeout,
		clearInterval: originalClearInterval,
	};

	return {
		clearAllTimers() {
			// Clear all tracked timers
			for (const timer of activeTimers) {
				try {
					originalClearTimeout(timer);
					originalClearInterval(timer);
				} catch (e) {
					// Ignore errors when clearing timers
				}
			}
			activeTimers.clear();
		},

		getActiveTimers() {
			return Array.from(activeTimers);
		},

		setCurrentComponent() {
			// Simplified - no component tracking needed
		},

		clearCurrentComponent() {
			// Simplified - no component tracking needed
		},

		getTimersByComponent() {
			return {}; // Simplified - no component tracking
		},

		restore() {
			// Restore original functions
			global.setTimeout = originalHandlers.setTimeout;
			global.setInterval = originalHandlers.setInterval;
			global.clearTimeout = originalHandlers.clearTimeout;
			global.clearInterval = originalHandlers.clearInterval;
		},
	};
}

function restoreHandles() {
	// Will be handled by the tracker object
}

function forceExit() {
	process.exit(0);
}

module.exports = {
	trackHandles,
	restoreHandles,
	forceExit,
};
