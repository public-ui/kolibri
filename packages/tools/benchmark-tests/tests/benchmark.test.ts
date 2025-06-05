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

type ResultEntry = {
	name: TagType;
	values: number[];
	unit: 'ms';
};

const results: Map<TagType, ResultEntry> = new Map();

const TEST_ITERATIONS = Math.max(parseInt(process.env.TEST_ITERATIONS || '1', 10), !!process.env.CI ? 5 : 1);
const TEST_TIMEOUT = parseInt(process.env.TEST_TIMEOUT || '5000', 10);

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:3000/test-page.html');
	await page.waitForLoadState('networkidle');
});

for (const tag of TAGS) {
	for (let idx = 0; idx < TEST_ITERATIONS; idx++) {
		test(`${tag} hydration (${idx + 1})`, async ({ page }) => {
			const { hydratedTime } = await page.evaluate(
				async ({ tag, timeout }) => {
					window.gc?.();
					await customElements.whenDefined(tag);
					const el = document.createElement(tag);
					document.body.appendChild(el);
					const start = performance.now();
					let hydratedTime: number | null = null;
					let themedTime: number | null = null;

					await new Promise<void>((resolve) => {
						let cleaned = false;

						const timeoutId = setTimeout(cleanup, timeout);

						const observer = new MutationObserver(() => {
							if (!hydratedTime && el.classList.contains('hydrated')) {
								hydratedTime = performance.now() - start;
							}
							if (hydratedTime && el.hasAttribute('data-themed')) {
								themedTime = performance.now() - hydratedTime;
								cleanup();
							}
						});

						function cleanup() {
							if (cleaned) return;
							cleaned = true;
							clearTimeout(timeoutId);
							observer.disconnect();
							if (el.parentNode) el.remove();
							resolve();
						}

						observer.observe(el, {
							attributes: true,
							attributeFilter: ['class', 'data-themed'],
						});
					});

					return {
						hydratedTime,
						themedTime,
					};
				},
				{ tag, timeout: TEST_TIMEOUT },
			);

			if (hydratedTime !== null) {
				if (!results.has(tag)) {
					results.set(tag, {
						name: tag,
						values: [],
						unit: 'ms',
					});
				}
				results.get(tag)!.values.push(Math.round(hydratedTime));
			}
		});
	}
}

test.afterAll(() => {
	const finalResults = Array.from(results.values()).map(({ name, values, unit }) => {
		values.sort((a, b) => a - b);
		const mid = Math.floor(values.length / 2);
		const median = values.length % 2 === 0 ? Math.round((values[mid - 1] + values[mid]) / 2) : values[mid];

		return {
			name,
			value: median,
			unit,
		};
	});

	writeFileSync('benchmark-result.json', JSON.stringify(finalResults, null, 2));
});
