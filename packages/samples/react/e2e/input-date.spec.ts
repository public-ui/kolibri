import { expect, test } from '@playwright/test';

test.describe('KolInputDate', () => {
	test.describe('when _min and _max is set with Iso8601', () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/#/input-date/basic?hideMenus');
		});

		test('should set correct min and max for type date', async ({ page }) => {
			const minDate = '2024-09-26';
			const maxDate = '2024-09-27';
			const input = page.getByTestId('isoDate').locator('input');

			await expect(input).toHaveAttribute('min', minDate);
			await expect(input).toHaveAttribute('max', maxDate);
		});

		test('should set correct min and max for type time', async ({ page }) => {
			const minTime = '12:00';
			const maxTime = '15:00';
			const input = page.getByTestId('isoTime').locator('input');

			await expect(input).toHaveAttribute('min', minTime);
			await expect(input).toHaveAttribute('max', maxTime);
		});

		test('should set correct min and max for type datetime_locale', async ({ page }) => {
			const minDayTime = '2024-09-26T12:00';
			const maxDaytime = '2024-09-27T15:00';
			const input = page.getByTestId('isoDatetime').locator('input');

			await expect(input).toHaveAttribute('min', minDayTime);
			await expect(input).toHaveAttribute('max', maxDaytime);
		});

		test('should set correct min and max for type week', async ({ page }) => {
			const minWeek = '2024-W10';
			const maxWeek = '2024-W50';
			const input = page.getByTestId('isoWeek').locator('input');

			await expect(input).toHaveAttribute('min', minWeek);
			await expect(input).toHaveAttribute('max', maxWeek);
		});

		test('should set correct min and max for type month', async ({ page }) => {
			const minMonth = '2024-02';
			const maxMonth = '2024-10';
			const input = page.getByTestId('isoMonth').locator('input');

			await expect(input).toHaveAttribute('min', minMonth);
			await expect(input).toHaveAttribute('max', maxMonth);
		});
	});

	test.describe('when _min and _max is set with JS Date', () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/#/input-date/basic?hideMenus');
		});

		test('should set correct min and max for type date', async ({ page }) => {
			const minDate = '2024-01-10';
			const maxDate = '2024-10-20';
			const input = page.getByTestId('dateDate').locator('input');

			await expect(input).toHaveAttribute('min', minDate);
			await expect(input).toHaveAttribute('max', maxDate);
		});

		test('should set correct min and max for type time', async ({ page }) => {
			const minTime = '12:00';
			const maxTime = '15:00';
			const input = page.getByTestId('dateTime').locator('input');

			await expect(input).toHaveAttribute('min', minTime);
			await expect(input).toHaveAttribute('max', maxTime);
		});

		test('should set correct min and max for type datetime_locale', async ({ page }) => {
			const minDayTime = '2024-01-10T12:00:00';
			const maxDaytime = '2024-10-20T15:00:00';
			const input = page.getByTestId('dateDatetime').locator('input');

			await expect(input).toHaveAttribute('min', minDayTime);
			await expect(input).toHaveAttribute('max', maxDaytime);
		});

		test('should set correct min and max for type week', async ({ page }) => {
			const minWeek = '2024-W02';
			const maxWeek = '2024-W42';
			const input = page.getByTestId('dateWeek').locator('input');

			await expect(input).toHaveAttribute('min', minWeek);
			await expect(input).toHaveAttribute('max', maxWeek);
		});

		test('should set correct min and max for type month', async ({ page }) => {
			const minMonth = '2024-01';
			const maxMonth = '2024-10';
			const input = page.getByTestId('dateMonth').locator('input');

			await expect(input).toHaveAttribute('min', minMonth);
			await expect(input).toHaveAttribute('max', maxMonth);
		});
	});
});
