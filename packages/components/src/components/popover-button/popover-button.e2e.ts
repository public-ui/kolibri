import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-popover-button', () => {
	test('should show and hide popover on click', async ({ page }) => {
		await page.setContent(`
			<kol-popover-button _label="Toggle popover">
				Popover content
			</kol-popover-button>
		`);

		const button = page.getByTestId('popover-button');
		const popover = page.getByTestId('popover-content');

		// Initially hidden
		await expect(popover).not.toBeVisible();

		// Show on click
		await button.click();
		await expect(popover).toBeVisible();

		// Hide on second click
		await button.click();
		await expect(popover).not.toBeVisible();
	});

	test('should handle disabled state', async ({ page }) => {
		await page.setContent(`
			<kol-popover-button _label="Open popover" _disabled>
				Popover content
			</kol-popover-button>
		`);

		const button = page.getByTestId('popover-button');
		const popover = page.getByTestId('popover-content');

		await button.click({ force: true });
		await expect(popover).not.toBeVisible();
	});
});
