import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-input-text reconnect', () => {
	test('shows the clear button tooltip after the element was reattached', async ({ page }) => {
		await page.setContent('<kol-input-text _label="Search" _type="search" _value="Text"></kol-input-text>');
		const host = page.locator('kol-input-text');
		const clearButton = host.locator('.kol-input-text__clear-button button');
		const tooltipClass = (): Promise<string | null> => page.locator('.kol-tooltip__floating').getAttribute('class');

		// Sanity before the detach: the tooltip of the clear button shows on hover. The class flips
		// a moment after the hover (over-focus timeout), so the assertion polls.
		await clearButton.hover();
		await expect.poll(tooltipClass, { timeout: 5_000 }).toContain('show');
		await page.mouse.move(0, 0);
		await expect.poll(tooltipClass, { timeout: 5_000 }).toContain('hide');

		// Detach and reattach without any further state change: no re-render happens.
		await host.evaluate((element) => {
			const parent = element.parentElement!;
			const next = element.nextSibling;
			element.remove();
			parent.insertBefore(element, next);
		});
		await page.waitForChanges();

		await clearButton.hover();
		await expect.poll(tooltipClass, { timeout: 5_000 }).toContain('show');
	});
});
