import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-progress', () => {
	test.describe('Native progress', () => {
		test('should pass max and value to the native progress', async ({ page }) => {
			await page.setContent('<kol-progress _label="Upload" _max="200" _value="50"></kol-progress>');
			const progress = page.locator('progress');

			await expect(progress).toHaveJSProperty('max', 200);
			await expect(progress).toHaveJSProperty('value', 50);
		});

		test('should cap the value at max', async ({ page }) => {
			await page.setContent('<kol-progress _label="Upload" _max="100" _value="150"></kol-progress>');

			await expect(page.locator('progress')).toHaveJSProperty('value', 100);
		});

		test('should follow a changed value', async ({ page }) => {
			await page.setContent('<kol-progress _label="Upload" _max="100" _value="10"></kol-progress>');
			const kolProgress = page.locator('kol-progress');

			await kolProgress.evaluate((element: HTMLKolProgressElement) => {
				element._value = 60;
			});
			await page.waitForChanges();

			await expect(page.locator('progress')).toHaveJSProperty('value', 60);
			await expect(page.locator('.kol-progress__bar-value')).toHaveText('60');
		});
	});

	test.describe('Accessibility', () => {
		test('should name the progress after the label', async ({ page }) => {
			await page.setContent('<kol-progress _label="Upload" _max="100" _value="10"></kol-progress>');

			await expect(page.getByRole('progressbar', { name: 'Upload' })).toBeAttached();
		});

		test('should keep an accessible name without a label', async ({ page }) => {
			await page.setContent('<kol-progress _max="100" _value="10"></kol-progress>');

			await expect(page.locator('progress')).toHaveAttribute('aria-label', /\S/);
		});

		test('should hide the visual presentation from assistive technology', async ({ page }) => {
			await page.setContent('<kol-progress _label="Upload" _max="100" _value="10"></kol-progress>');

			await expect(page.locator('.kol-progress__bar')).toHaveAttribute('aria-hidden', 'true');
		});

		test('should be busy until the value reaches max', async ({ page }) => {
			await page.setContent('<kol-progress _label="Upload" _max="100" _value="99"></kol-progress>');
			const kolProgress = page.locator('kol-progress');
			const progress = page.locator('progress');

			await expect(progress).toHaveAttribute('aria-busy', 'true');

			await kolProgress.evaluate((element: HTMLKolProgressElement) => {
				element._value = 100;
			});
			await page.waitForChanges();

			await expect(progress).toHaveAttribute('aria-busy', 'false');
		});
	});

	test.describe('Live region', () => {
		test('should announce a changed value with the next interval tick', async ({ page }) => {
			await page.clock.install();
			await page.setContent('<kol-progress _label="Upload" _max="100" _value="10" _unit="%"></kol-progress>');
			const kolProgress = page.locator('kol-progress');
			const liveRegion = page.locator('[aria-live="polite"]');

			await expect(liveRegion).toHaveText(/^10 %$/);

			await kolProgress.evaluate((element: HTMLKolProgressElement) => {
				element._value = 60;
			});
			await page.waitForChanges();
			await expect(liveRegion).toHaveText(/^10 %$/);

			await page.clock.runFor(5000);
			await page.waitForChanges();
			await expect(liveRegion).toHaveText(/^60 %$/);
		});
	});

	test.describe('Variants', () => {
		test('should render the value inside the cycle', async ({ page }) => {
			await page.setContent('<kol-progress _label="Upload" _max="100" _value="40" _unit="%" _variant="cycle"></kol-progress>');

			await expect(page.locator('.kol-progress__cycle-value')).toHaveText('40 %');
			await expect(page.locator('.kol-progress__bar')).toHaveCount(0);
		});
	});
});
