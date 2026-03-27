import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-split-button', () => {
	test('should display toggle popover when the secondary button is clicked', async ({ page }) => {
		await page.setContent(` <kol-split-button _label="Sample Button">Dropdown contents</kol-split-button> `);
		const splitButton = page.locator('kol-split-button ');

		const secondaryButton = splitButton.locator('.kol-split-button__secondary-button');
		const popover = splitButton.locator('.kol-popover');

		await expect(popover).not.toBeVisible();
		await secondaryButton.click();
		await expect(popover).toBeVisible();
		await secondaryButton.click();
		await expect(popover).not.toBeVisible();
	});

	test.describe('click() method', () => {
		test('should activate primary button when click() method is called', async ({ page }) => {
			await page.setContent('<kol-split-button _label="Primary Action">Dropdown contents</kol-split-button>');
			const kolSplitButton = page.locator('kol-split-button');

			const callbackPromise = kolSplitButton.evaluate((element) => {
				return new Promise<number>((resolve) => {
					let clickCount = 0;
					element._on = {
						onClick: () => {
							clickCount++;
							resolve(clickCount);
						},
					};
				});
			});
			await page.waitForChanges();

			await kolSplitButton.evaluate((el) => el.click());
			await expect(callbackPromise).resolves.toBe(1);
		});

		test('should not trigger secondary button action on primary click()', async ({ page }) => {
			await page.setContent('<kol-split-button _label="Primary Action">Dropdown contents</kol-split-button>');
			const kolSplitButton = page.locator('kol-split-button');

			await kolSplitButton.evaluate((element) => {
				(window as any).actionType = null;
				element._on = {
					onClick: () => {
						(window as any).actionType = 'primary';
					},
				};
			});
			await page.waitForChanges();

			await kolSplitButton.evaluate((el) => el.click());
			const action = await page.evaluate(() => (window as any).actionType);
			expect(action).toBe('primary');
		});
	});
});
