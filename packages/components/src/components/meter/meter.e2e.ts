import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-meter', () => {
	test.describe('Native meter', () => {
		test('should pass min, max and value to the native meter', async ({ page }) => {
			await page.setContent('<kol-meter _label="Storage" _min="10" _max="50" _value="30" _unit="GB"></kol-meter>');
			const meter = page.locator('meter');

			await expect(meter).toHaveAttribute('min', '10');
			await expect(meter).toHaveAttribute('max', '50');
			await expect(meter).toHaveJSProperty('value', 30);
		});

		test('should cap the value between min and max', async ({ page }) => {
			await page.setContent('<kol-meter _label="Storage" _max="50" _value="80" _unit="GB"></kol-meter>');

			await expect(page.locator('meter')).toHaveJSProperty('value', 50);
			await expect(page.locator('.kol-meter__value')).toHaveText('50');
		});

		test('should follow a changed value', async ({ page }) => {
			await page.setContent('<kol-meter _label="Storage" _value="0.25"></kol-meter>');
			const kolMeter = page.locator('kol-meter');

			await kolMeter.evaluate((element: HTMLKolMeterElement) => {
				element._value = 0.75;
			});
			await page.waitForChanges();

			await expect(page.locator('meter')).toHaveJSProperty('value', 0.75);
			await expect(page.locator('.kol-meter__value')).toHaveText('75');
		});
	});

	test.describe('Accessibility', () => {
		test('should name the meter after the label', async ({ page }) => {
			await page.setContent('<kol-meter _label="Storage" _value="0.5"></kol-meter>');

			await expect(page.getByRole('meter', { name: 'Storage' })).toBeVisible();
		});

		test('should announce the value as a percentage by default', async ({ page }) => {
			await page.setContent('<kol-meter _label="Storage" _value="0.5"></kol-meter>');

			await expect(page.locator('meter')).toHaveAttribute('aria-valuetext', /^50 %$/);
		});

		test('should announce the value with its maximum for a unit other than percent', async ({ page }) => {
			await page.setContent('<kol-meter _label="Storage" _max="50" _value="30" _unit="GB"></kol-meter>');

			await expect(page.locator('meter')).toHaveAttribute('aria-valuetext', /^30 \S+ 50 GB$/);
		});
	});

	test.describe('State classification', () => {
		test('should classify nothing without low and high', async ({ page }) => {
			await page.setContent('<kol-meter _label="Storage" _value="0.9"></kol-meter>');

			await expect(page.locator('.kol-meter__bar-state')).toHaveCount(0);
		});

		test.describe('with the optimum in the low range', () => {
			const meter = (value: number) => `<kol-meter _label="Load" _low="0.3" _high="0.7" _optimum="0.1" _value="${value}"></kol-meter>`;

			for (const [value, state] of [
				[0.2, 'optimum'],
				[0.5, 'suboptimal'],
				[0.9, 'critical'],
			] as const) {
				test(`should classify ${value} as ${state}`, async ({ page }) => {
					await page.setContent(meter(value));
					const stateLabel = page.locator('.kol-meter__bar-state');

					await expect(stateLabel).toHaveClass(new RegExp(`kol-meter__bar-state--${state}`));
					const stateText = (await stateLabel.textContent())?.replace(' – ', '') ?? '';
					await expect(page.locator('meter')).toHaveAttribute('aria-valuetext', new RegExp(` – ${stateText}$`));
				});
			}
		});

		test('should follow a changed optimum', async ({ page }) => {
			await page.setContent('<kol-meter _label="Load" _low="0.3" _high="0.7" _optimum="0.1" _value="0.9"></kol-meter>');
			const kolMeter = page.locator('kol-meter');

			await kolMeter.evaluate((element: HTMLKolMeterElement) => {
				element._optimum = 0.9;
			});
			await page.waitForChanges();

			await expect(page.locator('.kol-meter__bar-state')).toHaveClass(/kol-meter__bar-state--optimum/);
		});
	});
});
