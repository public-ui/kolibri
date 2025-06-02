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

const results: {
	name: TagType;
	value: number;
	unit: 'ms';
}[] = [];

const TEST_ITERATIONS = parseInt(process.env.TEST_ITERATIONS || '1', 10);
const TEST_TIMEOUT = parseInt(process.env.TEST_TIMEOUT || '5000', 10);

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:3000/test-page.html');
});

for (const tag of TAGS) {
	test(`${tag} hydrates`, async ({ page }) => {
		const durations: number[] = [];

		for (let idx = 0; idx < TEST_ITERATIONS; idx++) {
			await page.evaluate(() => window.gc?.());

			const duration = await page.evaluate(
				async ({ tag, timeout, idx }) => {
					await customElements.whenDefined(tag);

					const el = document.createElement(tag);
					el.setAttribute('data-test', `hydration-${idx}`);
					const start = performance.now();
					document.body.appendChild(el);

					await new Promise<void>((resolve) => {
						let cleaned = false;

						const timeoutId = setTimeout(cleanup, timeout);
						const observer = new MutationObserver(() => {
							if (el.classList.contains('hydrated')) cleanup();
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
							attributeFilter: ['class'],
						});
					});

					const end = performance.now();
					return end - start;
				},
				{ tag, timeout: TEST_TIMEOUT, idx },
			);

			durations.push(duration);
		}

		durations.sort((a, b) => a - b);
		const median = durations[Math.floor(durations.length / 2)];

		results.push({
			name: tag,
			value: Math.round(median),
			unit: 'ms',
		});
	});
}

test.afterAll(() => {
	writeFileSync('benchmark-result.json', JSON.stringify(results, null, 2));
});
