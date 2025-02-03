import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';

/* @TODO Instead of further extending this file, consider refactoring to a composition approach. */
test.describe('inputs-common', () => {
	const INPUT_COMPONENTS_WITH_COUNTER = [`kol-input-text`, `kol-input-password`, `kol-input-email`, `kol-textarea`];
	for (const component of INPUT_COMPONENTS_WITH_COUNTER) {
		test.describe(component, () => {
			test.describe('counter', () => {
				test('should show the counter for an initial value', async ({ page }) => {
					await page.setContent(`<${component} _label="Input" _value="Lorem Ipsum" _has-counter></${component}>`);
					await expect(page.getByTestId('input-counter')).toHaveText('11 Zeichen');
				});

				test('should update the counter when the value changes', async ({ page }) => {
					await page.setContent(`<${component} _label="Input" _value="Lorem Ipsum" _has-counter></${component}>`);
					await page.getByLabel('Input').fill('Lorem');
					await expect(page.getByTestId('input-counter')).toHaveText('5 Zeichen');
				});
			});
		});
	}
});
