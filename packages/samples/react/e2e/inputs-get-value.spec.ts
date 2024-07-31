import { test, expect } from '@playwright/test';

test('inputText', async ({ page }) => {
	await page.goto('/#/scenarios/inputs-get-value');

	const scenario = await page.getByTestId('scenario-inputText');
	await scenario.getByLabel('InputText').fill('Hello Playwright!');
	await scenario.getByRole('button').click();

	expect(await scenario.locator('pre').innerText()).toBe('"Hello Playwright!"');
});
