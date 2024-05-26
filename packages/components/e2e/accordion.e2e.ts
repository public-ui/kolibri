import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('Accordion', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/#/accordion/basic');
	});

	test('should render the accordion title', async ({ page }) => {
		expect(await page.locator('kol-accordion').first().getByRole('button')).toHaveText('Überschrift Accordion Tab 1');
	});

	test('should render the accordion content after the title has been clicked', async ({ page }) => {
		await expect(page.getByText('Inhalt Accordion Tab 1')).not.toBeVisible();
		await page.getByRole('button', { name: 'Überschrift Accordion Tab 1' }).click();
		await expect(page.getByText('Inhalt Accordion Tab 1')).toBeVisible();
	});

	test('should hide the accordion content after the title has been clicked again', async ({ page }) => {
		await page.getByRole('button', { name: 'Überschrift Accordion Tab 1' }).click();
		await expect(page.getByText('Inhalt Accordion Tab 1')).toBeVisible();
		await page.getByRole('button', { name: 'Überschrift Accordion Tab 1' }).click();
		await expect(page.getByText('Inhalt Accordion Tab 1')).not.toBeVisible();
	});

	test("should not hide the accordion content after the title has been clicked if it's disabled", async ({ page }) => {
		await expect(page.getByText('Inhalt Accordion Tab 2')).toBeVisible();
		await page.getByRole('button', { name: 'Überschrift Accordion Tab 2 (deaktiviert)' }).click();
		await expect(page.getByText('Inhalt Accordion Tab 2')).toBeVisible();
	});
});
