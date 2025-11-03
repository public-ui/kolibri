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

	test('should hide its tooltip when popover is shown', async ({ page }) => {
		await page.setContent(`
			<kol-popover-button _label="Toggle popover" _icons="codicon codicon-info" _hide-label>
				Popover content
			</kol-popover-button>
		`);
		const button = page.getByTestId('popover-button').locator('button');
		const tooltip = page.locator('kol-tooltip-wc');

		await button.hover();
		await expect(tooltip).toBeVisible();

		await button.click();
		await expect(tooltip).not.toBeVisible();
	});

	test('should be open initially when the _show prop is set to true', async ({ page }) => {
		await page.setContent(`
			<kol-popover-button _show _label="Toggle popover">
				Popover content
			</kol-popover-button>
		`);

		const popover = page.getByTestId('popover-content');
		await expect(popover).toBeVisible();
	});

	test('should be closed initially when the _show prop is set to false', async ({ page }) => {
		await page.setContent(`
			<kol-popover-button _show="false" _label="Toggle popover">
				Popover content
			</kol-popover-button>
		`);

		const popover = page.getByTestId('popover-content');
		await expect(popover).not.toBeVisible();
	});

	test('should be closed initially when the _show prop is not set', async ({ page }) => {
		await page.setContent(`
			<kol-popover-button _label="Toggle popover">
				Popover content
			</kol-popover-button>
		`);

		const popover = page.getByTestId('popover-content');
		await expect(popover).not.toBeVisible();
	});
});
