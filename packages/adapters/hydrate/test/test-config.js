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
 */
const timeouts = {
	default: 5000, // Default timeout for test suites
	hydration: 20000, // Timeout for full hydration tests
};

module.exports = {
	hydrateOptions,
	timeouts,
};
