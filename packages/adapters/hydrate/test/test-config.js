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
};

/**
 * Test timeout configuration (in milliseconds)
 * Global default is 5000ms (set in .mocharc.json)
 * Only override for tests that need more time.
 */
const timeouts = {
	hydration: 20000, // Hydration tests need more time for complex operations
};

module.exports = {
	hydrateOptions,
	timeouts,
};
