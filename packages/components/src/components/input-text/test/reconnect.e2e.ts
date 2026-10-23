import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-input-text reconnect', () => {
	test('shows the clear button tooltip after the element was reattached', async ({ page }) => {
		await page.setContent('<kol-input-text _label="Search" _type="search" _value="Text"></kol-input-text>');
		const host = page.locator('kol-input-text');
		const clearButton = host.locator('.kol-input-text__clear-button button');
		/** The tooltip class changes a moment after hover (over-focus timeout). */
		const tooltipClass = async (): Promise<string | null> => {
			await page.waitForTimeout(600);
			return page.locator('.kol-tooltip__floating').getAttribute('class');
		};

		// Sanity before the detach: the tooltip of the clear button shows on hover.
		await clearButton.hover();
		await expect(await tooltipClass()).toContain('show');
		await page.mouse.move(0, 0);
		await expect(await tooltipClass()).toContain('hide');

		// Detach and reattach without any further state change: no re-render happens.
		await host.evaluate((element) => {
			const parent = element.parentElement!;
			const next = element.nextSibling;
			element.remove();
			parent.insertBefore(element, next);
		});
		await page.waitForChanges();
		await page.waitForTimeout(300);

		await clearButton.hover();
		await expect(await tooltipClass()).toContain('show');
	});
});
