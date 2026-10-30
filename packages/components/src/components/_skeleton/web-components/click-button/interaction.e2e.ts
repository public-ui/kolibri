import { expect, type Page } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-click-button', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent('<kol-click-button _label="Click"></kol-click-button><button>next</button>');
	});

	/** Resolves with the text of the next console message reporting a handled click. */
	const nextClickLog = (page: Page): Promise<string> =>
		page
			.waitForEvent('console', {
				predicate: (msg) => msg.text().includes('button clicked'),
				timeout: 5_000,
			})
			.then((msg) => msg.text());

	test('should call handleClick when clicked', async ({ page }) => {
		const clickLog = nextClickLog(page);
		await page.getByRole('button', { name: 'Click' }).click();
		expect(await clickLog).toContain('button clicked');
	});

	test('Enter fires the click', async ({ page }) => {
		const clickLog = nextClickLog(page);
		const button = page.getByRole('button', { name: 'Click' });
		await button.focus();
		await button.press('Enter');
		expect(await clickLog).toContain('button clicked');
	});

	test('Space fires the click', async ({ page }) => {
		const clickLog = nextClickLog(page);
		const button = page.getByRole('button', { name: 'Click' });
		await button.focus();
		await button.press('Space');
		expect(await clickLog).toContain('button clicked');
	});

	test('Tab leaves the button', async ({ page }) => {
		const button = page.getByRole('button', { name: 'Click' });
		await button.focus();
		await expect(button).toBeFocused();
		await button.press('Tab');
		await expect(button).not.toBeFocused();
		await expect(page.getByRole('button', { name: 'next' })).toBeFocused();
	});
});
