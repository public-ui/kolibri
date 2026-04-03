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

/**
 * Normalize CSS content in shadow DOM to reduce snapshot flakiness
 * Removes style tags completely and replaces with a placeholder
 * @param {string} html - HTML string with shadow DOM
 * @returns {string} Normalized HTML
 */
function normalizeShadowDOMStyles(html) {
	// Replace entire <style>...</style> blocks inside shadow roots with a placeholder
	// This prevents CSS order/hash differences from causing snapshot failures
	return html.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '<style>/* CSS normalized */</style>');
}

/**
 * Normalize component HTML for stable snapshots
 * @param {string} html - HTML string
 * @returns {string} Normalized HTML
 */
function normalizeComponentHTML(html) {
	let normalized = html;

	// 1. Normalize shadow DOM styles (biggest source of flakiness)
	normalized = normalizeShadowDOMStyles(normalized);

	// 2. Normalize dynamic IDs (e.g., id="nonce" -> id="[id]")
	normalized = normalized.replace(/\bid="[^"]*nonce[^"]*"/gi, 'id="[id]"');
	normalized = normalized.replace(/\bid-[a-z0-9-]*nonce[a-z0-9-]*/gi, '[id]');

	// 3. Normalize htmlfor/for attributes on labels
	normalized = normalized.replace(/\bhtmlfor="[^"]*"/gi, 'for="[id]"');
	normalized = normalized.replace(/\bfor="[^"]*nonce[^"]*"/gi, 'for="[id]"');

	// 4. Normalize aria-controls (often references dynamic IDs)
	normalized = normalized.replace(/\baria-controls="[^"]*"/gi, 'aria-controls="[id]"');

	// 5. Normalize aria-describedby
	normalized = normalized.replace(/\baria-describedby="[^"]*"/gi, 'aria-describedby="[id]"');

	// 6. Remove data-testid attributes if they contain dynamic values
	// (keep static ones)
	// normalized = normalized.replace(/\bdata-testid="[^"]*-\d+[^"]*"/gi, 'data-testid="[dynamic]"');

	return normalized;
}

module.exports = {
	extractBodyContent,
	normalizeComponentHTML,
	normalizeShadowDOMStyles,
};
