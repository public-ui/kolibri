import { expect, test } from '@playwright/test';

test.describe('debug checkbox', () => {
	test.setTimeout(150000);
	test('value chain', async ({ page }) => {
		test.info().setTimeout(150000);
		await page.goto('#/inputs-get-value?hideMenus');
		await page.waitForSelector('[data-testid="scenario-inputCheckboxBoolean"] kol-input-checkbox', { timeout: 120000 });
		const dump = async (label: string) => {
			const state = await page.evaluate(async () => {
				const host = document.querySelector('[data-testid="scenario-inputCheckboxBoolean"] kol-input-checkbox') as any;
				const input = host?.shadowRoot?.querySelector('input');
				const value = typeof host?.getValue === 'function' ? JSON.stringify(await host.getValue()) : 'no method';
				return { checked: host?._checked, valueProp: JSON.stringify(host?._value), domChecked: input?.checked ?? null, domValue: JSON.stringify(input?.value) ?? null, getValue: value };
			});
			console.log(`${label}:`, JSON.stringify(state));
		};
		await dump('before');
		await page.locator('[data-testid="scenario-inputCheckboxBoolean"] .kol-checkbox__input').click();
		await page.waitForTimeout(600);
		await dump('after click');
		expect(true).toBe(true);
	});
});
