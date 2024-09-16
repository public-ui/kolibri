import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';

const ALL_INPUT_COMPONENTS = [
	`kol-combobox`,
	`kol-input-checkbox`,
	`kol-input-color`,
	`kol-input-date`,
	`kol-input-email`,
	`kol-input-file`,
	`kol-input-number`,
	`kol-input-password`,
	`kol-input-radio`,
	`kol-input-range`,
	`kol-input-text`,
	`kol-select`,
	`kol-single-select`,
	`kol-textarea`,
];

const INPUT_COMPONENTS_WITH_COUNTER = [`kol-input-text`, `kol-input-password`, `kol-input-email`];

test.describe('inputs-common', () => {
	for (const component of ALL_INPUT_COMPONENTS) {
		test.describe(component, () => {
			test.describe('alert', () => {
				test('should render error messages with role=alert when the _alert prop is set to true', async ({ page }) => {
					await page.setContent(`<${component}
															_label="Input"
															_msg="{'_description': 'Broken', '_type': 'error'}"
															_touched
															_alert
														/>`);

					await expect(page.locator('kol-alert-wc')).toHaveAttribute('role', 'alert');
				});

				test('should control the role=alert on error messages based on focus when no _alert prop is set', async ({ page }) => {
					await page.setContent(`<${component}
															_label="Input"
															_msg="{'_description': 'Broken', '_type': 'erro=r'}"
															_touched
														/>`);

					await expect(page.locator('kol-alert-wc')).toHaveAttribute('role', 'alert');
					await page.locator('input').focus();
					await expect(page.locator('kol-alert-wc')).not.toHaveAttribute('role', 'alert');
					await page.locator('input').blur();
					await expect(page.locator('kol-alert-wc')).toHaveAttribute('role', 'alert');
				});
			});
		});
	}

	for (const component of INPUT_COMPONENTS_WITH_COUNTER) {
		test.describe(component, () => {
			test.describe('counter', () => {
				test('should show the counter for an initial value', async ({ page }) => {
					await page.setContent(`<${component} _label="Input" _value="Lorem Ipsum" _has-counter></${component}>`);
					await expect(page.getByTestId('input-counter')).toHaveText('11 Zeichen');
				});

				test('should update the counter when the value changes', async ({ page }) => {
					await page.setContent(`<${component} _label="Input" _value="Lorem Ipsum" _has-counter></${component}>`);
					await page.locator('input').fill('Lorem');
					await expect(page.getByTestId('input-counter')).toHaveText('5 Zeichen');
				});
			});
		});
	}
});
