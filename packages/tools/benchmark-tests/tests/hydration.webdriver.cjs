const fs = require('fs');

const TAGS = [
	'kol-abbr',
	'kol-accordion',
	'kol-alert',
	'kol-avatar',
	'kol-badge',
	'kol-breadcrumb',
	'kol-button',
	'kol-button-group',
	'kol-button-link',
	'kol-card',
	'kol-details',
	'kol-drawer',
	'kol-form',
	'kol-heading',
	'kol-icon',
	'kol-image',
	'kol-indented-text',
	'kol-input-checkbox',
	'kol-input-color',
	'kol-input-date',
	'kol-input-email',
	'kol-input-file',
	'kol-input-number',
	'kol-input-password',
	'kol-input-radio',
	'kol-input-text',
	// 'kol-kolibri',
	'kol-link',
	'kol-link-button',
	'kol-link-group',
	'kol-logo',
	'kol-modal',
	'kol-nav',
	'kol-pagination',
	'kol-popover-button',
	'kol-progress',
	'kol-quote',
	'kol-select',
	'kol-skip-nav',
	'kol-spin',
	'kol-split-button',
	// 'kol-symbol',
	// 'kol-table',
	'kol-table-stateful',
	'kol-table-stateless',
	'kol-tabs',
	'kol-textarea',
	// 'kol-toast-container',
	'kol-toolbar',
	'kol-tree',
	'kol-tree-item',
	'kol-version',
];

const TEST_ITERATIONS = parseInt(process.env.TEST_ITERATIONS || '25', 10);
const TEST_TIMEOUT = parseInt(process.env.TEST_TIMEOUT || '5000', 10);

const results = new Map();

describe('Hydration Benchmark', () => {
	/**
	 * The network request durations are removed from the test results
	 * to focus on the hydration performance of the web components itself.
	 */
	before(async () => {
		await browser.url('/test-page.html');
	});

	for (const tag of TAGS) {
		it(`${tag}`, async () => {
			const durations = await browser.executeAsync(
				async ({ iterations, tag, timeout }, done) => {
					const testResults = new Map();
					const webComponents = new Set();

					window.gc?.();
					await customElements.whenDefined(tag);

					function startNextHydration() {
						if (webComponents.size > 0) {
							const el = webComponents.values().next().value;
							testResults.set(el, {
								hydrated: null,
								started: performance.now(),
								themed: null,
							});
							document.body.appendChild(el);
						} else {
							returnDurations();
						}
					}

					function returnDurations() {
						const durations = [];
						testResults.forEach((measure) => {
							if (measure.hydrated !== null) {
								durations.push(measure.hydrated);
							}
						});
						observer.disconnect();
						done(durations);
					}

					function removeElement(el) {
						webComponents.delete(el);
						try {
							el.remove();
						} catch {}
					}

					const observer = new MutationObserver((mutations) => {
						for (const mutation of mutations) {
							const el = mutation.target;
							if (!webComponents.has(el) && !el.isConnected) continue;

							const measure = testResults.get(el);
							if (!measure) continue;

							if (!measure.hydrated && el.classList.contains('hydrated')) {
								measure.hydrated = performance.now() - measure.started;
								// } else if (measure.hydrated && el.hasAttribute('data-themed')) {
								// 	measure.themed = performance.now() - measure.started;

								removeElement(el);
								startNextHydration();
							}
						}
					});

					for (let i = 0; i <= iterations; i++) {
						const el = document.createElement(tag);
						el.setAttribute('data-iteration', i);
						webComponents.add(el);
						observer.observe(el, {
							attributes: true,
							attributeFilter: ['class', 'data-themed'],
						});
					}

					// Fallback for when no elements are hydrated
					setTimeout(returnDurations, timeout);

					startNextHydration();
				},
				{
					iterations: TEST_ITERATIONS,
					tag,
					timeout: TEST_TIMEOUT,
				},
			);

			console.log(`Hydration durations for ${tag}:`, durations);
			results.set(tag, durations.splice(1, durations.length - 1));
		});
	}

	after(() => {
		const finalResults = Array.from(results.entries()).map(([tag, values]) => {
			values.sort((a, b) => a - b);
			const mid = Math.floor(values.length / 2);
			return {
				name: tag,
				unit: 'ms',
				value: values[mid],
				values,
			};
		});

		fs.writeFileSync('benchmark-result.json', JSON.stringify(finalResults, null, 2));
	});
});
