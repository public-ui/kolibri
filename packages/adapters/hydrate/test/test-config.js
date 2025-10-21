'use strict';

/**
 * Shared configuration for hydration tests
 */

/**
 * Hydration options for renderToString
 * @see https://stenciljs.com/docs/hydrate-app
 */
const hydrateOptions = {
	clientHydrateAnnotations: false,
	prettyHtml: false,
	removeAttributeQuotes: false,
	removeBooleanAttributeQuotes: true,
	removeEmptyAttributes: false,
	removeHtmlComments: true,
	removeUnusedStyles: true,
	// Ensure resources are cleaned up properly
	destroyDocument: true,
	destroyWindow: true,
	serializeToHtml: true,
	timeout: 5000,
};

/**
 * Reset hydration state and clean up resources
 */
function resetHydrationState() {
	// Force garbage collection if available
	if (global.gc) {
		global.gc();
	}

	// Clear DOM-related globals
	['document', 'window', 'navigator', 'location'].forEach((globalName) => {
		if (global[globalName]) {
			delete global[globalName];
		}
	});
}

/**
 * Test timeout configuration (in milliseconds)
 */
const timeouts = {
	hydration: 10000,
};

module.exports = {
	hydrateOptions,
	resetHydrationState,
};
