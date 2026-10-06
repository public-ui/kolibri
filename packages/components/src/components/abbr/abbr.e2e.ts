import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { setContentWithRetry } from '../../e2e/utils/setContentWithRetry';

const COMPONENT_NAME = 'kol-abbr';
const tooltip = `${COMPONENT_NAME} .kol-tooltip__floating`;

test.describe(COMPONENT_NAME, () => {
	test.describe('with a long form', () => {
		test.beforeEach(async ({ page }) => {
			await setContentWithRetry(page, `<p><${COMPONENT_NAME} _abbr="z. B." _label="zum Beispiel"></${COMPONENT_NAME}> <span id="outside">Text</span></p>`);
		});

		test('shows the long form as tooltip on hover', async ({ page }) => {
			await page.locator('abbr').hover();
			await expect(page.locator(tooltip)).toBeVisible();
			await expect(page.locator(tooltip)).toContainText('zum Beispiel');

			await page.locator('#outside').hover();
			await expect(page.locator(tooltip)).not.toBeVisible();
		});

		test('shows the tooltip on keyboard focus and hides it with Escape', async ({ page }) => {
			await page.keyboard.press('Tab');
			await expect(page.locator('abbr')).toBeFocused();
			await expect(page.locator(tooltip)).toBeVisible();

			await page.keyboard.press('Escape');
			await expect(page.locator(tooltip)).not.toBeVisible();
		});

		test('references the long form as description', async ({ page }) => {
			const describedBy = await page.locator('abbr').getAttribute('aria-describedby');
			await expect(page.locator(`[id="${describedBy}"]`)).toHaveText('zum Beispiel');
			expect(await page.locator('abbr').getAttribute('title')).toBeNull();
		});
	});

	test('is not focusable and has no tooltip without a long form', async ({ page }) => {
		await setContentWithRetry(page, `<${COMPONENT_NAME} _abbr="z. B."></${COMPONENT_NAME}>`);
		expect(await page.locator('abbr').getAttribute('tabindex')).toBeNull();
		await expect(page.locator(tooltip)).toHaveCount(0);
	});

	test('renders plain text in the deprecated slot and hides markup', async ({ page }) => {
		await setContentWithRetry(
			page,
			`<${COMPONENT_NAME} id="text">z. B.</${COMPONENT_NAME}><${COMPONENT_NAME} id="markup"><strong>z. B.</strong></${COMPONENT_NAME}>`,
		);
		await expect(page.locator('#text')).toBeVisible();
		await expect(page.locator('#markup strong')).not.toBeVisible();

		await page.locator('#markup').evaluate((element) => (element.textContent = 'z. B.'));
		await page.waitForChanges();
		await expect(page.locator('#markup')).toContainText('z. B.');
		expect(await page.locator('#markup').evaluate((element) => element.shadowRoot?.querySelector('slot')?.closest('[hidden]') ?? null)).toBeNull();
	});
});
