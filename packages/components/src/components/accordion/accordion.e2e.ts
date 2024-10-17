import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-accordion', () => {
	test.describe('when accordion is enabled', () => {
		test.beforeEach(async ({ page }) => {
			await page.setContent('<kol-accordion _label="Accordion Label">Accordion contents</kol-accordion>');
		});

		test('should render the accordion title', async ({ page }) => {
			const button = page.getByRole('button');
			await expect(button).toHaveText('Accordion Label');
		});

		test('should show the accordion content after the title has been clicked', async ({ page }) => {
			await expect(page.locator('.collapsible__content')).toHaveAttribute('aria-hidden', 'true');
			await page.getByRole('button', { name: 'Accordion label' }).click();
			await expect(page.locator('.collapsible__content')).not.toHaveAttribute('aria-hidden', 'true');
		});

		test('should hide the accordion content after the title has been clicked again', async ({ page }) => {
			await page.getByRole('button', { name: 'Accordion label' }).click();
			await expect(page.locator('.collapsible__content')).not.toHaveAttribute('aria-hidden', 'true');
			await page.getByRole('button', { name: 'Accordion label' }).click();
			await expect(page.locator('.collapsible__content')).toHaveAttribute('aria-hidden', 'true');
		});
	});

	test.describe('when accordion is disabled', () => {
		test.beforeEach(async ({ page }) => {
			await page.setContent('<kol-accordion _label="Accordion Label" _disabled>Accordion contents</kol-accordion>');
		});

		test('should not show the accordion content after the title has been clicked', async ({ page }) => {
			await page.getByRole('button', { name: 'Accordion label' }).click({ force: true });
			await expect(page.locator('.collapsible__content')).toHaveAttribute('aria-hidden', 'true');
		});
	});
});
