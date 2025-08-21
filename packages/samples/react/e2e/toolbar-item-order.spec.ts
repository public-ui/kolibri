import { expect, test } from '@playwright/test';

test.describe('KolToolbar item order', () => {
	const toolbars = [
		{ name: 'KolToolbar A', description: 'icons before disabled' },
		{ name: 'KolToolbar B', description: 'disabled before icons' },
	];

	test.beforeEach(async ({ page }) => {
		await page.goto('#/scenarios/toolbar-item-order?hideMenus');
	});

	for (const { name, description } of toolbars) {
		test(`re-enables buttons when ${description}`, async ({ page }) => {
			const toolbar = page.getByRole('toolbar', { name });
			const buttons = toolbar.getByRole('button');

			await buttons.first().click();
			await page.waitForTimeout(2000);

			const count = await buttons.count();
			for (let i = 0; i < count; i++) {
				await expect(buttons.nth(i)).toBeEnabled();
			}
		});
	}
});
