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

		test('should emit "click" event when the title is clicked', async ({ page }) => {
			const eventPromise = page.locator('kol-accordion').evaluate(async (element: HTMLKolAccordionElement) => {
				return new Promise((resolve) => {
					element.addEventListener('click', resolve);
				});
			});
			await page.waitForChanges();
			await page.getByRole('button', { name: 'Accordion label' }).click();
			await expect(eventPromise).resolves.toBeTruthy();
		});

		test('should call "onClick" callback when the title is clicked', async ({ page }) => {
			const callbackPromise = page.locator('kol-accordion').evaluate(async (element: HTMLKolAccordionElement) => {
				return new Promise((resolve) => {
					element._on = {
						onClick: (_event: MouseEvent, value?: boolean) => {
							resolve(value);
						},
					};
				});
			});
			await page.waitForChanges();
			await page.getByRole('button', { name: 'Accordion label' }).click();
			await expect(callbackPromise).resolves.toBe(true);
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

	test.describe('click() method', () => {
		test('should expand accordion when click() method is called', async ({ page }) => {
			await page.setContent('<kol-accordion _label="Accordion Label">Accordion contents</kol-accordion>');
			const kolAccordion = page.locator('kol-accordion');

			await kolAccordion.evaluate(async (element: HTMLKolAccordionElement) => await element.click());
			await page.waitForChanges();

			await expect(page.locator('.collapsible__content')).not.toHaveAttribute('aria-hidden', 'true');
		});

		test('should toggle accordion state when click() method is called multiple times', async ({ page }) => {
			await page.setContent('<kol-accordion _label="Accordion Label">Accordion contents</kol-accordion>');
			const kolAccordion = page.locator('kol-accordion');

			await kolAccordion.evaluate(async (element: HTMLKolAccordionElement) => await element.click());
			await page.waitForChanges();
			await expect(page.locator('.collapsible__content')).not.toHaveAttribute('aria-hidden', 'true');

			await kolAccordion.evaluate(async (element: HTMLKolAccordionElement) => await element.click());
			await page.waitForChanges();
			await expect(page.locator('.collapsible__content')).toHaveAttribute('aria-hidden', 'true');
		});
	});
});
