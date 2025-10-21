'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const fs = require('node:fs');
const path = require('node:path');
const { expect } = require('chai');
const { hydrateOptions, resetHydrationState } = require('./test-config');
const { extractBodyContent } = require('./test-utils');
const { handleTracker } = require('./setup');

// Read custom-elements.json from @public-ui/components package
const customElementsPath = require.resolve('@public-ui/components/custom-elements.json');
const customElements = JSON.parse(fs.readFileSync(customElementsPath, 'utf-8'));

// Check if hydration bundle exists
const distPath = path.resolve(__dirname, '..', 'dist', 'index.js');
if (!fs.existsSync(distPath)) {
	throw new Error('Cannot find the hydration bundle. Run "pnpm --filter @public-ui/components build" before executing tests.');
}

const { renderToString, streamToString } = require(distPath);

const collectStream = (readable) =>
	new Promise((resolve, reject) => {
		let buffer = '';
		readable.setEncoding('utf8');
		readable.on('data', (chunk) => {
			buffer += chunk;
		});
		readable.on('end', () => resolve(buffer));
		readable.on('error', reject);
	});

/**
 * Get fresh renderToString function by clearing require cache
 * This prevents accumulation of state between tests
 */
function getFreshRenderToString() {
	// Clear the hydration module from require cache
	delete require.cache[distPath];

	// Also clear related modules to prevent state accumulation
	Object.keys(require.cache).forEach((key) => {
		if (key.includes('@public-ui/components') && !key.includes('custom-elements.json')) {
			delete require.cache[key];
		}
	});

	// Require fresh module
	const { renderToString } = require(distPath);
	return renderToString;
}

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

// Minimal skip list - only components that truly cause issues
const skipComponents = new Set([
	// Temporarily skip nothing - let's test them all with our improved setup
]);

describe('Component hydration snapshots', () => {
	// Setup and teardown for each test
	beforeEach(() => {
		// Clear any existing timers before each test
		if (handleTracker) {
			handleTracker.clearAllTimers();
		}

		// Reset hydration state
		resetHydrationState();

		// No delays - they interfere with timeouts
	});

	afterEach(() => {
		// Clear component tracking and timers after each test
		if (handleTracker) {
			handleTracker.clearCurrentComponent();
			handleTracker.clearAllTimers();
		}

		// Reset hydration state
		resetHydrationState();

		// No delays - they interfere with timeouts
	}); // Force garbage collection after all tests if available
	after(() => {
		// Report any components that created timers
		if (handleTracker) {
			const timersByComponent = handleTracker.getTimersByComponent();
			const componentNames = Object.keys(timersByComponent);

			if (componentNames.length > 0) {
				console.log('\n=== COMPONENTS THAT CREATED TIMERS ===');
				componentNames.forEach((componentName) => {
					const timers = timersByComponent[componentName];
					console.log(`\n${componentName}:`);
					timers.forEach((timer, index) => {
						console.log(`  Timer ${index + 1}: ${timer.type} (${timer.delay}ms)`);
						console.log(`    Stack: ${timer.stack.split('\n')[1]?.trim() || 'unknown'}`);
					});
				});
				console.log('\n=== END TIMER REPORT ===\n');
			}

			// Final cleanup
			handleTracker.clearAllTimers();
		}

		if (global.gc) {
			global.gc();
		}
	});

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

		it(`renders ${name} with renderToString`, async function () {
			// Set timeout for individual component tests
			this.timeout(3000);

			// Track timers for this component
			if (handleTracker) {
				handleTracker.setCurrentComponent(name);
			}

			try {
				const html = generateComponentHTML(componentMeta);

				// Render component to HTML using renderToString
				const result = await renderToString(html, hydrateOptions);

				expect(result).to.be.an('object');
				expect(result.html).to.be.a('string');
				expect(result.diagnostics).to.be.an('array');

				const bodyContent = extractBodyContent(result.html);
				expect(bodyContent).to.matchSnapshot();
			} catch (error) {
				throw error;
			} finally {
				// Clear component tracking
				if (handleTracker) {
					handleTracker.clearCurrentComponent();
					handleTracker.clearAllTimers();
				}
			}
		});

		it(`renders ${name} with streamToString`, async function () {
			// Set timeout for individual component tests
			this.timeout(3000);

			// Track timers for this component
			if (handleTracker) {
				handleTracker.setCurrentComponent(name);
			}

			try {
				const html = generateComponentHTML(componentMeta);

				// Render component to HTML using streamToString
				const readable = streamToString(html, hydrateOptions);
				const resultHtml = await collectStream(readable);

				expect(resultHtml).to.be.a('string');

				const bodyContent = extractBodyContent(resultHtml);
				expect(bodyContent).to.matchSnapshot();
			} catch (error) {
				throw error;
			} finally {
				// Clear component tracking
				if (handleTracker) {
					handleTracker.clearCurrentComponent();
					handleTracker.clearAllTimers();
				}
			}
		});
	});
});
