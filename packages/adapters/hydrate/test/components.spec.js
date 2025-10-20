'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { expect } = require('chai');
const { hydrateOptions, timeouts } = require('./test-config');
const { extractBodyContent } = require('./test-utils');

// Read custom-elements.json from @public-ui/components package
const customElementsPath = require.resolve('@public-ui/components/custom-elements.json');
const customElements = JSON.parse(fs.readFileSync(customElementsPath, 'utf-8'));

console.log(`Found ${customElements.tags.length} components to test`);

// Check if hydration bundle exists
const distPath = path.resolve(__dirname, '..', 'dist', 'index.js');
if (!fs.existsSync(distPath)) {
	throw new Error('Cannot find the hydration bundle. Run "pnpm --filter @public-ui/components build" before executing tests.');
}

const { renderToString } = require(distPath);

/**
 * Generates a minimal HTML string for a component based on its metadata
 * @param {object} componentMeta - Component metadata from custom-elements.json
 * @returns {string} HTML string for testing
 */
function generateComponentHTML(componentMeta) {
	const { name, attributes = [], slots = [] } = componentMeta;

	// Build attributes string with required and some optional attributes
	const attrs = attributes
		.filter((attr) => {
			// Include required attributes and some common optional ones
			if (attr.required) return true;
			// Include label if available (very common)
			if (attr.name === '_label') return true;
			return false;
		})
		.map((attr) => {
			// Generate appropriate values based on type
			let value = '';
			if (attr.type.includes('string')) {
				value = attr.name === '_label' ? `Test ${name}` : 'Test value';
			} else if (attr.type.includes('boolean')) {
				value = attr.defaultValue === 'true' ? 'true' : 'false';
			} else if (attr.type.includes('number')) {
				value = '1';
			} else if (attr.type.includes('object') || attr.type.includes('array')) {
				// Skip complex types for now
				return null;
			}
			return `${attr.name}="${value}"`;
		})
		.filter(Boolean)
		.join(' ');

	// Add content if component has default slot
	const hasDefaultSlot = slots.some((slot) => slot.name === '');
	const content = hasDefaultSlot ? 'Test content' : '';

	return `<${name}${attrs ? ' ' + attrs : ''}>${content}</${name}>`;
}

// Known problematic components - still need investigation
const skipComponents = new Set([
	'kol-accordion',
	'kol-card',
	'kol-combobox', // Dynamic IDs cause snapshot mismatches
	'kol-details',
	'kol-drawer',
	'kol-input-checkbox',
	'kol-input-color',
	'kol-input-date',
	'kol-input-email',
	'kol-input-file',
	'kol-input-number',
	'kol-input-password',
	'kol-input-radio',
	'kol-input-range', // Dynamic IDs cause snapshot mismatches
	'kol-input-text',
	'kol-kolibri',
	'kol-modal',
	'kol-nav',
	'kol-pagination',
	'kol-popover-button',
	'kol-select',
	'kol-single-select', // Dynamic IDs cause snapshot mismatches
	'kol-skip-nav',
	'kol-split-button',
	'kol-table-stateful',
	'kol-table-stateless',
	'kol-tabs',
	'kol-textarea',
	'kol-toast-container',
	'kol-toolbar',
	'kol-version',
]);

describe('Component hydration snapshots', function () {
	// Default timeout for the suite
	this.timeout(timeouts.default);

	customElements.tags.forEach((componentMeta) => {
		const { name } = componentMeta;

		// Skip -wc components (Web Component wrappers)
		if (name.endsWith('-wc')) {
			it.skip(`renders ${name} to HTML snapshot (Web Component wrapper - not tested)`, () => {});
			return;
		}

		// Skip tree components (kol-tree, kol-tree-item)
		if (name.startsWith('kol-tree')) {
			it.skip(`renders ${name} to HTML snapshot (Tree component - not tested)`, () => {});
			return;
		}

		// Skip components that are known to cause issues
		if (skipComponents.has(name)) {
			it.skip(`renders ${name} to HTML snapshot (known to hang or fail)`, () => {});
			return;
		}

		it(`renders ${name} to HTML snapshot`, async function () {
			/**
			 * PERFORMANCE REQUIREMENT:
			 * Each component must render within 5 seconds maximum.
			 * This ensures high-performance server-side rendering.
			 * Components that exceed this timeout need optimization.
			 */
			this.timeout(5000); // 5 seconds max per component

			const html = generateComponentHTML(componentMeta);
			const result = await renderToString(html, hydrateOptions);

			expect(result).to.be.an('object');
			expect(result.html).to.be.a('string');
			expect(result.diagnostics).to.be.an('array');

			const bodyContent = extractBodyContent(result.html);
			expect(bodyContent).to.matchSnapshot();
		});
	});
});
