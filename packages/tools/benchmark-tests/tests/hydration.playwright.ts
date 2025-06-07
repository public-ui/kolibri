import { test } from '@playwright/test';
import { writeFileSync } from 'fs';

const TAGS = [
	'kol-abbr',
	'kol-accordion',
	'kol-alert',
	'kol-avatar',
	'kol-badge',
	'kol-breadcrumb',
	'kol-button',
	'kol-button-link',
	'kol-card',
	'kol-details',
	'kol-drawer',
	'kol-form',
	'kol-heading',
	'kol-icon',
	'kol-image',
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
	'kol-table-stateful',
	'kol-table-stateless',
	'kol-tabs',
	'kol-textarea',
	// 'kol-toast-container',
	'kol-toolbar',
	'kol-tree',
	'kol-tree-item',
	'kol-version',
] as const;

type TagType = (typeof TAGS)[number];

const TEST_ITERATIONS = parseInt(process.env.TEST_ITERATIONS || '3', 10);
const TEST_TIMEOUT = parseInt(process.env.TEST_TIMEOUT || '5000', 10);

const results: Map<TagType, number[]> = new Map();

test.describe('Hydration Benchmark', () => {
	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();
		const page = await context.newPage();
		await page.goto('http://localhost:3000/test-page.html');
		await page.close();
	});

	for (const tag of TAGS) {
		test(`${tag}`, async ({ page }) => {
			await page.goto('http://localhost:3000/test-page.html');

			const durations = await page.evaluate(
				async ({ tag, iterations, timeout }) => {
					const testResults = new Map<Element, { started: number; hydrated: number | null }>();
					const webComponents = new Set<Element>();

					window.gc?.();
					await customElements.whenDefined(tag);

					function removeElement(el: Element) {
						if (el.parentNode) el.parentNode.removeChild(el);
						webComponents.delete(el);
					}

					function wait(ms: number) {
						return new Promise((res) => setTimeout(res, ms));
					}

					const observer = new MutationObserver((mutations) => {
						for (const mutation of mutations) {
							const el = mutation.target;
							if (webComponents.has(el)) {
								const result = testResults.get(el);
								if (result && result.hydrated === null && (el as HTMLElement).classList.contains('hydrated')) {
									result.hydrated = performance.now() - result.started;
									removeElement(el);
								}
							}
						}
					});

					for (let i = 0; i < iterations; i++) {
						const el = document.createElement(tag);
						el.setAttribute('data-iteration', i.toString());
						webComponents.add(el);
						testResults.set(el, { started: performance.now(), hydrated: null });
						document.body.appendChild(el);

						observer.observe(el, {
							attributes: true,
							attributeFilter: ['class'],
						});

						await new Promise<void>((resolve) => {
							const timeoutId = setTimeout(() => {
								removeElement(el);
								resolve();
							}, timeout);

							const checkHydrated = () => {
								const entry = testResults.get(el);
								if (entry?.hydrated !== null) {
									clearTimeout(timeoutId);
									resolve();
								} else {
									requestAnimationFrame(checkHydrated);
								}
							};
							checkHydrated();
						});
					}

					observer.disconnect();

					return Array.from(testResults.values())
						.map((r) => r.hydrated)
						.filter((v): v is number => v !== null);
				},
				{ tag, iterations: TEST_ITERATIONS, timeout: TEST_TIMEOUT },
			);

			results.set(tag, durations);
		});
	}

	test.afterAll(() => {
		const finalResults = Array.from(results.entries()).map(([tag, values]) => {
			values.sort((a, b) => a - b);
			const mid = Math.floor(values.length / 2);
			const median = values.length % 2 === 0 ? Math.round((values[mid - 1] + values[mid]) / 2) : values[mid];

			return {
				name: tag,
				unit: 'ms',
				value: median,
				values,
			};
		});

		writeFileSync('benchmark-result.json', JSON.stringify(finalResults, null, 2));
	});
});
