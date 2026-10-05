import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-accordion', () => {
	test.describe('when accordion is enabled', () => {
		test.beforeEach(async ({ page }) => {
			await page.setContent('<kol-accordion _label="Accordion Label">Accordion contents</kol-accordion>');
		});

		test('should render the accordion title', async ({ page }) => {
			const summary = page.locator('summary');
			await expect(summary).toHaveText('Accordion Label');
		});

		test('should offer a pointer cursor', async ({ page }) => {
			await expect
				.poll(() =>
					page
						.locator('kol-accordion')
						.evaluate((element: HTMLKolAccordionElement) => getComputedStyle(element.shadowRoot?.querySelector('summary') as HTMLElement).cursor),
				)
				.toBe('pointer');
		});

		test('should show the accordion content after the title has been clicked', async ({ page }) => {
			await expect(page.locator('.kol-accordion__content')).toHaveAttribute('aria-hidden', 'true');
			await page.locator('summary').click();
			await expect(page.locator('.kol-accordion__content')).not.toHaveAttribute('aria-hidden', 'true');
		});

		test('should have proper aria attributes', async ({ page }) => {
			const summary = page.locator('summary');
			const details = page.locator('details');
			const content = page.locator('.kol-accordion__content');

			/* The expanded state is the native `open` attribute on `<details>` — no hand-maintained
			   aria-expanded to keep in sync. */
			await expect(details).not.toHaveAttribute('open');
			await expect(summary).toHaveAttribute('aria-controls', /-control-/);
			await expect(content).toHaveAttribute('role', 'region');
			await expect(content).toHaveAttribute('aria-labelledby', /-heading-/);
			await expect(content).toHaveAttribute('aria-hidden', 'true');

			await summary.click();

			await expect(details).toHaveAttribute('open', '');
			await expect(content).not.toHaveAttribute('aria-hidden');
		});

		test('should hide the accordion content after the title has been clicked again', async ({ page }) => {
			await page.locator('summary').click();
			await expect(page.locator('.kol-accordion__content')).not.toHaveAttribute('aria-hidden', 'true');
			await page.locator('summary').click();
			await expect(page.locator('.kol-accordion__content')).toHaveAttribute('aria-hidden', 'true');
		});

		test('should toggle with the keyboard, without any scripted key handling', async ({ page }) => {
			const content = page.locator('.kol-accordion__content');

			await page.locator('summary').focus();
			await page.keyboard.press('Enter');
			await expect(content).not.toHaveAttribute('aria-hidden', 'true');

			await page.keyboard.press('Space');
			await expect(content).toHaveAttribute('aria-hidden', 'true');
		});

		test('should emit "click" event when the title is clicked', async ({ page }) => {
			const eventPromise = page.locator('kol-accordion').evaluate(async (element: HTMLKolAccordionElement) => {
				return new Promise((resolve) => {
					element.addEventListener('click', resolve);
				});
			});
			await page.waitForChanges();
			await page.locator('summary').click();
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
			await page.locator('summary').click();
			await expect(callbackPromise).resolves.toBe(true);
		});

		test(`should call "onToggle" callback when title is clicked`, async ({ page }) => {
			const callbackPromise = page.locator('kol-accordion').evaluate(async (element: HTMLKolAccordionElement) => {
				return new Promise((resolve) => {
					element._on = {
						onToggle: (_event: MouseEvent, value?: boolean) => {
							resolve(value);
						},
					};
				});
			});
			await page.waitForChanges();
			await page.locator('summary').click();
			await expect(callbackPromise).resolves.toBe(true);
		});
	});

	test.describe('when accordion is disabled', () => {
		test.beforeEach(async ({ page }) => {
			await page.setContent('<kol-accordion _label="Accordion Label" _disabled>Accordion contents</kol-accordion>');
		});

		test('should not show the accordion content after the title has been clicked', async ({ page }) => {
			await page.locator('summary').click({ force: true });
			await expect(page.locator('.kol-accordion__content')).toHaveAttribute('aria-hidden', 'true');
		});

		test('should not take focus when the title is clicked', async ({ page }) => {
			await page.locator('summary').click({ force: true });

			await expect
				.poll(() => page.locator('kol-accordion').evaluate((element: HTMLKolAccordionElement) => element.shadowRoot?.activeElement?.localName ?? null))
				.toBeNull();
		});

		test('should not take focus when the focus() method is called', async ({ page }) => {
			const kolAccordion = page.locator('kol-accordion');

			await kolAccordion.evaluate(async (element: HTMLKolAccordionElement) => await element.focus());
			await page.waitForChanges();

			await expect.poll(() => kolAccordion.evaluate((element: HTMLKolAccordionElement) => element.shadowRoot?.activeElement?.localName ?? null)).toBeNull();
		});

		test('should not offer a pointer cursor', async ({ page }) => {
			await expect
				.poll(() =>
					page
						.locator('kol-accordion')
						.evaluate((element: HTMLKolAccordionElement) => getComputedStyle(element.shadowRoot?.querySelector('summary') as HTMLElement).cursor),
				)
				.toBe('not-allowed');
		});
	});

	test.describe('click() method', () => {
		test('should expand accordion when click() method is called', async ({ page }) => {
			await page.setContent('<kol-accordion _label="Accordion Label">Accordion contents</kol-accordion>');
			const kolAccordion = page.locator('kol-accordion');

			await kolAccordion.evaluate(async (element: HTMLKolAccordionElement) => await element.click());
			await page.waitForChanges();

			await expect(page.locator('.kol-accordion__content')).not.toHaveAttribute('aria-hidden', 'true');
		});

		test('should toggle accordion state when click() method is called multiple times', async ({ page }) => {
			await page.setContent('<kol-accordion _label="Accordion Label">Accordion contents</kol-accordion>');
			const kolAccordion = page.locator('kol-accordion');

			await kolAccordion.evaluate(async (element: HTMLKolAccordionElement) => await element.click());
			await page.waitForChanges();
			await expect(page.locator('.kol-accordion__content')).not.toHaveAttribute('aria-hidden', 'true');

			await kolAccordion.evaluate(async (element: HTMLKolAccordionElement) => await element.click());
			await page.waitForChanges();
			await expect(page.locator('.kol-accordion__content')).toHaveAttribute('aria-hidden', 'true');
		});
	});

	test.describe('tab order', () => {
		/* Own `setContent` call: the stencil fixture serves the page from a single route and a second
		   call inside a test would not reload it. */
		test('should skip a disabled accordion', async ({ page }) => {
			await page.setContent(
				'<button id="before">before</button><kol-accordion _label="Accordion Label" _disabled>Accordion contents</kol-accordion><button id="after">after</button>',
			);
			await page.locator('#before').focus();

			await page.keyboard.press('Tab');

			await expect(page.locator('#after')).toBeFocused();
		});

		test('should include an enabled accordion', async ({ page }) => {
			await page.setContent('<button id="before">before</button><kol-accordion _label="Accordion Label">Accordion contents</kol-accordion>');
			await page.locator('#before').focus();

			await page.keyboard.press('Tab');

			await expect(page.locator('summary')).toBeFocused();
		});
	});
});
