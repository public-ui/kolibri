import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';
import type { MsgPropType } from '../schema';

const testInputMessage = <ElementType extends { _msg?: MsgPropType } & HTMLElement>(componentName: string) => {
	test.describe('Input messages', () => {
		test.skip(({ browserName }) => browserName !== 'webkit', 'Fails in Chromium and Firefox');

		test('should render a message when provided as object', async ({ page }) => {
			await page.setContent(`<${componentName} _label="Input"></${componentName}>`);
			const host = page.locator(componentName);
			await host.evaluate((element: ElementType) => {
				element._msg = { _description: 'This is a info message', _type: 'info' };
			});
			const alert = page.getByTestId('alert');

			await expect(alert).toContainText('This is a info message');
		});

		test('should render a error message when provided as string', async ({ page }) => {
			const errorMsg = 'This is a string error message';
			await page.setContent(`<${componentName} _label="Input" _msg="${errorMsg}" _touched></${componentName}>`);
			const alert = page.getByTestId('alert');

			await expect(alert).toContainText(errorMsg);
		});

		test('should display and hide message based on _msg value', async ({ page }) => {
			await page.setContent(`<${componentName} _label="Input" _touched></${componentName}>`);
			const host = page.locator(componentName);
			await host.evaluate((element: ElementType) => {
				element._msg = { _description: 'An error message', _type: 'error' };
			});
			const alert = page.getByTestId('alert');

			await expect(alert).toBeVisible();

			await host.evaluate((element: ElementType) => {
				element._msg = undefined;
			});

			await expect(alert).not.toBeVisible();
		});
	});
};

export { testInputMessage };
