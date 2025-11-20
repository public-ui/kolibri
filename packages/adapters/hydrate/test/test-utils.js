'use strict';

/**
 * Extracts the body content from a full HTML document
 * @param {string} html - Full HTML document string
 * @returns {string} Body content only
 */
function extractBodyContent(html) {
	const bodyMatch = html.match(/<body>([\s\S]*)<\/body>/);
	return bodyMatch ? bodyMatch[1].trim() : html;
}

module.exports = {
	extractBodyContent,
};
