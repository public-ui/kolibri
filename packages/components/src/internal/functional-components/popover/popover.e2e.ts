import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-popover', () => {
	test('should display popover when opened and hide when closed', async ({ page }) => {
		await page.setContent(`<kol-split-button _label="Toggle">Popover content</kol-split-button>`);
		const splitButton = page.locator('kol-split-button');
		const popoverElement = splitButton.locator('.kol-popover');

		await expect(popoverElement).not.toBeVisible();
		await splitButton.locator('.kol-split-button__secondary-button').click();
		await expect(popoverElement).toBeVisible();

		await splitButton.locator('.kol-split-button__secondary-button').click();
		await expect(popoverElement).not.toBeVisible();
	});

	test.describe('Callbacks', () => {
		test('it calls the onClose callback when popover is closed', async ({ page }) => {
			await page.setContent(`<kol-split-button _label="Toggle">Popover content</kol-split-button>`);
			const splitButton = page.locator('kol-split-button');

			await splitButton.locator('.kol-split-button__secondary-button').click();
			await expect(splitButton.locator('.kol-popover')).toBeVisible();

			await page.keyboard.press('Escape');
			await expect(splitButton.locator('.kol-popover')).not.toBeVisible();
		});
	});

	test.describe('DOM events', () => {
		test('it closes popover with Escape key', async ({ page }) => {
			await page.setContent(`<kol-split-button _label="Toggle">Popover content</kol-split-button>`);
			const splitButton = page.locator('kol-split-button');
			const popover = splitButton.locator('.kol-popover');

			// Open popover
			await splitButton.locator('.kol-split-button__secondary-button').click();
			await expect(popover).toBeVisible();

			// Close with Escape
			await page.keyboard.press('Escape');
			await expect(popover).not.toBeVisible();
		});

		test('should emit toggle event when popover visibility changes', async ({ page }) => {
			await page.setContent(`<kol-split-button _label="Toggle">Popover content</kol-split-button>`);
			const splitButton = page.locator('kol-split-button');
			const popover = splitButton.locator('.kol-popover');

			const toggleEventPromise = popover.evaluate((element) => {
				return new Promise((resolve) => {
					element.addEventListener('toggle', resolve);
				});
			});

			// Trigger toggle by clicking the secondary button
			await splitButton.locator('.kol-split-button__secondary-button').click();

			await expect(toggleEventPromise).resolves.toBeTruthy();
		});
	});
});
