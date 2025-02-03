import { expect, test } from '@playwright/test';

test.describe('inputs-get-value', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/#/scenarios/inputs-get-value');
	});

	test('InputText', async ({ page }) => {
		const scenario = page.getByTestId('scenario-inputText');
		await scenario.getByLabel('InputText').fill('Hello Playwright!');
		await scenario.getByRole('button').click();

		expect(await scenario.locator('pre').innerText()).toBe('"Hello Playwright!"');
	});

	test('KolInputCheckbox (value)', async ({ page }) => {
		const scenario = page.getByTestId('scenario-inputCheckboxString');
		await scenario.locator('kol-input-checkbox kol-icon').click();
		await scenario.getByRole('button').click();

		expect(await scenario.locator('pre').innerText()).toBe('"Checkbox True Value"');
	});

	test('KolInputCheckbox (boolean)', async ({ page }) => {
		const scenario = page.getByTestId('scenario-inputCheckboxBoolean');
		await scenario.locator('kol-input-checkbox kol-icon').click();
		await scenario.getByRole('button').click();

		expect(await scenario.locator('pre').innerText()).toBe('true');
	});

	test('KolInputColor', async ({ page }) => {
		const scenario = page.getByTestId('scenario-inputColor');
		await scenario.getByLabel('KolInputColor').fill('#cc006e');
		await scenario.getByRole('button').click();

		expect(await scenario.locator('pre').innerText()).toBe('"#cc006e"');
	});

	test('KolInputDate', async ({ page }) => {
		const scenario = page.getByTestId('scenario-inputDate');
		await scenario.getByLabel('KolInputDate').fill('2024-05-24');
		await scenario.getByRole('button').click();

		expect(await scenario.locator('pre').innerText()).toBe('"2024-05-24"');
	});

	test('KolInputEmail', async ({ page }) => {
		const scenario = page.getByTestId('scenario-inputEmail');
		await scenario.getByLabel('KolInputEmail').fill('test@example.com');
		await scenario.getByRole('button').click();

		expect(await scenario.locator('pre').innerText()).toBe('"test@example.com"');
	});

	test('KolInputFile', async ({ page }) => {
		const scenario = page.getByTestId('scenario-inputFile');
		await scenario.getByLabel('KolInputFile').setInputFiles({
			name: 'KoliBri.txt',
			mimeType: 'text/plain',
			buffer: Buffer.from('This is test bird.'),
		});
		await scenario.getByRole('button').click();

		expect(await scenario.locator('pre').innerText()).toBe('FileList{KoliBri.txt}');
	});

	test('KolInputNumber', async ({ page }) => {
		const scenario = page.getByTestId('scenario-inputNumber');
		await scenario.getByLabel('KolInputNumber').fill('42');
		await scenario.getByRole('button').click();

		expect(await scenario.locator('pre').innerText()).toBe('"42"');
	});

	test('KolInputPassword', async ({ page }) => {
		const scenario = page.getByTestId('scenario-inputPassword');
		await scenario.getByLabel('KolInputPassword').fill('hunter2');
		await scenario.getByRole('button').click();

		expect(await scenario.locator('pre').innerText()).toBe('"hunter2"');
	});

	test('KolInputRange', async ({ page }) => {
		const scenario = page.getByTestId('scenario-inputRange');
		await scenario.getByLabel('KolInputRange').fill('42');
		await scenario.getByRole('button').click();

		expect(await scenario.locator('pre').innerText()).toBe('42');
	});

	test('KolInputRadio', async ({ page }) => {
		const scenario = page.getByTestId('scenario-inputRadio');
		await scenario.getByLabel('Rio de Janeiro').check();
		await scenario.getByRole('button').click();

		expect(await scenario.locator('pre').innerText()).toBe('"Rio de Janeiro"');
	});

	test('KolSelect', async ({ page }) => {
		const scenario = page.getByTestId('scenario-select');
		await scenario.getByLabel('KolSelect').selectOption('Rio de Janeiro');
		await scenario.getByRole('button').click();

		expect(await scenario.locator('pre').innerText()).toBe('["Rio de Janeiro"]');
	});

	test('KolSingleSelect', async ({ page }) => {
		const scenario = page.getByTestId('scenario-singleSelect');
		await scenario.locator('#input').getByRole('button').click();
		await scenario.getByRole('option', { name: 'New York' }).click();
		await scenario.getByRole('button', { name: /getValue\(\)/ }).click();

		expect(await scenario.locator('pre').innerText()).toBe('"New York"');
	});

	test('KolCombobox', async ({ page }) => {
		const scenario = page.getByTestId('scenario-combobox');
		await scenario.getByRole('combobox').fill('Atlantis');
		await scenario.getByRole('button', { name: /getValue\(\)/ }).click();

		expect(await scenario.locator('pre').innerText()).toBe('"Atlantis"');
	});

	test('KolTextarea', async ({ page }) => {
		const scenario = page.getByTestId('scenario-textarea');
		await scenario.getByLabel('KolTextarea').fill('Hello Playwright!');
		await scenario.getByRole('button').click();

		expect(await scenario.locator('pre').innerText()).toBe('"Hello Playwright!"');
	});

	test('KolButton', async ({ page }) => {
		const scenario = page.getByTestId('scenario-button');
		await scenario.getByRole('button', { name: /getValue\(\)/ }).click();

		expect(await scenario.locator('pre').innerText()).toBe('"KolButton value"');
	});

	test('KolButtonLink', async ({ page }) => {
		const scenario = page.getByTestId('scenario-buttonLink');
		await scenario.getByRole('button', { name: /getValue\(\)/ }).click();

		expect(await scenario.locator('pre').innerText()).toBe('"KolButtonLink value"');
	});
});
