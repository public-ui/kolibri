import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-popover-button', () => {
	test('should show and hide popover on click', async ({ page }) => {
		await page.setContent(`
			<kol-popover-button _label="Toggle popover">
				Popover content
			</kol-popover-button>
		`);

		const button = page.locator('.kol-popover-button');
		const popover = page.locator('.kol-popover');

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

		const button = page.locator('.kol-popover-button');
		const popover = page.locator('.kol-popover');

		await button.click({ force: true });
		await expect(popover).not.toBeVisible();
	});

	test('should hide its tooltip when popover is shown', async ({ page }) => {
		await page.setContent(`
			<kol-popover-button _label="Toggle popover" _icons="codicon codicon-info" _hide-label>
				Popover content
			</kol-popover-button>
		`);
		const button = page.locator('.kol-popover-button button');
		const tooltip = page.locator('.kol-tooltip__floating');

		await button.hover();
		await expect(tooltip).toBeVisible();

		await button.click();
		await expect(tooltip).not.toBeVisible();
	});

	test('should render inline without enforcing a minimum height', async ({ page }) => {
		await page.setContent(`
			<kol-popover-button _label="Inline" _icons="codicon codicon-info" _inline="true">
				Popover content
			</kol-popover-button>
		`);

		const wrapper = page.locator('.kol-popover-button');

		await expect(wrapper).toHaveClass(/kol-popover-button--inline/);
	});

	test.describe('Keyboard interaction', () => {
		test('should toggle popover with Enter key', async ({ page }) => {
			await page.setContent(`
				<kol-popover-button _label="Toggle popover">
					Popover content
				</kol-popover-button>
			`);

			const button = page.locator('.kol-popover-button button');
			const popover = page.locator('.kol-popover');

			// Initially hidden
			await expect(popover).not.toBeVisible();

			// Focus and press Enter
			await button.focus();
			await page.keyboard.press('Enter');
			await page.waitForChanges();

			// Should be visible after Enter
			await expect(popover).toBeVisible();

			// Press Enter again to close
			await page.keyboard.press('Enter');
			await page.waitForChanges();
			await expect(popover).not.toBeVisible();
		});

		test('should toggle popover with Space key', async ({ page }) => {
			await page.setContent(`
				<kol-popover-button _label="Toggle popover">
					Popover content
				</kol-popover-button>
			`);

			const button = page.locator('.kol-popover-button button');
			const popover = page.locator('.kol-popover');

			// Initially hidden
			await expect(popover).not.toBeVisible();

			// Focus and press Space
			await button.focus();
			await page.keyboard.press(' ');
			await page.waitForChanges();

			// Should be visible after Space
			await expect(popover).toBeVisible();

			// Press Space again to close
			await page.keyboard.press(' ');
			await page.waitForChanges();
			await expect(popover).not.toBeVisible();
		});

		test('should close popover with Escape key', async ({ page }) => {
			await page.setContent(`
				<kol-popover-button _label="Toggle popover">
					Popover content
				</kol-popover-button>
			`);

			const button = page.locator('.kol-popover-button button');
			const popover = page.locator('.kol-popover');

			// Open popover
			await button.focus();
			await page.keyboard.press('Enter');
			await expect(popover).toBeVisible();

			// Close with Escape
			await page.keyboard.press('Escape');
			await expect(popover).not.toBeVisible();
		});
	});
});
