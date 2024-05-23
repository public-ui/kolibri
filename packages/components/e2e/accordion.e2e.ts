import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test('accordion', async ({ page }) => {
	await page.goto('/#/accordion/basic');
	await expect(page.getByText('Inhalt Accordion Tab 1')).not.toBeVisible();
	await page.getByRole('button', { name: 'Überschrift Accordion Tab 1' }).click();
	await expect(page.getByText('Inhalt Accordion Tab 1')).toBeVisible();
});
