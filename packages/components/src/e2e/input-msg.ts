import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import type { MsgPropType, Stringified } from '../schema';

const testInputMessage = <ElementType extends { _msg?: Stringified<MsgPropType>; _touched?: boolean } & HTMLElement>(componentName: string) => {
	test.describe('Input messages', () => {
		test(`should render a message when provided as object`, async ({ page }) => {
			await page.setContent(`<${componentName} _label="Input" _msg="{'_description': 'This is a info message', '_type': 'info'}"></${componentName}>`);
			const alert = page.getByTestId('alert');

			await expect(alert).toHaveCount(0);

			const input = page.locator(componentName);
			await input.evaluate((element: ElementType) => {
				element._touched = true;
			});

			await expect(alert).toContainText('This is a info message');
		});

		test(`should render a error message when provided as string`, async ({ page }) => {
			await page.setContent(`<${componentName} _label="Input" _msg="This is a string error message" _touched></${componentName}>`);
			const alert = page.getByTestId('alert');

			await expect(alert).toContainText('This is a string error message');
		});

		test('should display and hide message based on _msg value', async ({ page }) => {
			await page.setContent(`<${componentName}
				_label="Input"
				_msg="{'_description': 'An error message', '_type': 'error'}"
				_touched
			></${componentName}>`);
			const alert = page.getByTestId('alert');

			await expect(alert).toBeVisible();

			const input = page.locator(componentName);
			await input.evaluate((element: ElementType) => {
				element._msg = undefined;
			});

			await expect(alert).not.toBeVisible();
		});
	});
};

export { testInputMessage };
