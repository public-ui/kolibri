import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-input-date', () => {
	test.describe('when value is Date object', () => {
		const TEST_DATE = new Date('2020-03-03T03:02:01.099Z');

		test('should set the correct value for type date', async ({ page }) => {
			await page.setContent('<kol-input-date _label="Date input"></kol-input-date>');
			await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date) => {
				element._value = date;
			}, TEST_DATE);
			await expect(page.locator('input')).toHaveValue('2020-03-03');
		});

		test('should set the correct value for type datetime-local', async ({ page }) => {
			await page.setContent('<kol-input-date _label="Date input" _type="datetime-local"></kol-input-date>');
			await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date) => {
				element._value = date;
			}, TEST_DATE);
			await expect(page.locator('input')).toHaveValue('2020-03-03T04:02:01');
		});

		test('should set the correct value for type month', async ({ page }) => {
			await page.setContent('<kol-input-date _label="Date input" _type="month"></kol-input-date>');
			await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date) => {
				element._value = date;
			}, TEST_DATE);
			await expect(page.locator('input')).toHaveValue('2020-03');
		});

		test('should set the correct value for type time', async ({ page }) => {
			await page.setContent('<kol-input-date _label="Date input" _type="time"></kol-input-date>');
			await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date) => {
				element._value = date;
			}, TEST_DATE);
			await expect(page.locator('input')).toHaveValue('04:02');
		});
	});

	test.describe('when value is String', () => {
		test('should set the correct value for type date', async ({ page }) => {
			await page.setContent(`<kol-input-date _label="Date input" _value="2020-03-03"></kol-input-date>`);
			await expect(page.locator('input')).toHaveValue('2020-03-03');
		});

		test('should set the correct value for type datetime-local', async ({ page }) => {
			await page.setContent(`<kol-input-date _label="Date input" _type="datetime-local" _value="2020-03-03T04:02:01"></kol-input-date>`);
			await expect(page.locator('input')).toHaveValue('2020-03-03T04:02:01');
		});

		test('should set the correct value for type month', async ({ page }) => {
			await page.setContent(`<kol-input-date _label="Date input" _type="month" _value="2020-03"></kol-input-date>`);
			await expect(page.locator('input')).toHaveValue('2020-03');
		});

		test('should set the correct value for type time', async ({ page }) => {
			await page.setContent(`<kol-input-date _label="Date input" _type="time" _value="04:02"></kol-input-date>`);
			await expect(page.locator('input')).toHaveValue('04:02');
		});
	});

	test.describe('when min and max is set', () => {
		test.describe('for Iso8601-Format', () => {
			test('should set correct min and max for type date', async ({ page }) => {
				const minDate = '2024-09-26';
				const maxDate = '2024-09-27';
				await page.setContent(`<kol-input-date _label="Date input" _type="date" _min="${minDate}" _max="${maxDate}"></kol-input-date>`);

				await expect(page.locator('input')).toHaveAttribute('min', minDate);
				await expect(page.locator('input')).toHaveAttribute('max', maxDate);
			});

			test('should set correct min and max for type time', async ({ page }) => {
				const minTime = '12:00';
				const maxTime = '15:00';
				await page.setContent(`<kol-input-date _label="Date input" _type="time" _min="${minTime}" _max="${maxTime}"></kol-input-date>`);

				await expect(page.locator('input')).toHaveAttribute('min', minTime);
				await expect(page.locator('input')).toHaveAttribute('max', maxTime);
			});

			test('should set correct min and max for type datetime_locale', async ({ page }) => {
				const minDayTime = '2024-09-26T12:00';
				const maxDaytime = '2024-09-27T15:00';
				await page.setContent(`<kol-input-date _label="Date input" _type="datetime-local" _min="${minDayTime}" _max="${maxDaytime}"></kol-input-date>`);

				await expect(page.locator('input')).toHaveAttribute('min', minDayTime);
				await expect(page.locator('input')).toHaveAttribute('max', maxDaytime);
			});

			test('should set correct min and max for type week', async ({ page }) => {
				const minWeek = '2024-W10';
				const maxWeek = '2024-W50';
				await page.setContent(`<kol-input-date _label="Date input" _type="week" _min="${minWeek}" _max="${maxWeek}"></kol-input-date>`);

				await expect(page.locator('input')).toHaveAttribute('min', minWeek);
				await expect(page.locator('input')).toHaveAttribute('max', maxWeek);
			});

			test('should set correct min and max for type month', async ({ page }) => {
				const minMonth = '2024-02';
				const maxMonth = '2024-10';
				await page.setContent(`<kol-input-date _label="Date input" _type="month" _min="${minMonth}" _max="${maxMonth}"></kol-input-date>`);

				await expect(page.locator('input')).toHaveAttribute('min', minMonth);
				await expect(page.locator('input')).toHaveAttribute('max', maxMonth);
			});
		});
		test.describe('for Date-Format', () => {
			let minDateFormat: Date;
			let maxDateFormat: Date;
			test.beforeEach(() => {
				minDateFormat = new Date('January 10, 2024, 12:00');
				maxDateFormat = new Date('October 20, 2024, 15:00');
			});
			test('should set correct min and max for type date', async ({ page }) => {
				const minDate = '2024-01-10';
				const maxDate = '2024-10-20';
				await page.setContent(`<kol-input-date _label="Date input" _type="date"></kol-input-date>`);

				await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date) => {
					element._min = date;
				}, minDateFormat);
				await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date) => {
					element._max = date;
				}, maxDateFormat);
				await page.waitForChanges();

				await expect(page.locator('input')).toHaveAttribute('min', minDate);
				await expect(page.locator('input')).toHaveAttribute('max', maxDate);
			});

			test('should set correct min and max for type time', async ({ page }) => {
				const minTime = '12:00';
				const maxTime = '15:00';
				await page.setContent(`<kol-input-date _label="Date input" _type="time"></kol-input-date>`);

				await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date) => {
					element._min = date;
				}, minDateFormat);
				await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date) => {
					element._max = date;
				}, maxDateFormat);

				await expect(page.locator('input')).toHaveAttribute('min', minTime);
				await expect(page.locator('input')).toHaveAttribute('max', maxTime);
			});

			test('should set correct min and max for type datetime_locale', async ({ page }) => {
				const minDayTime = '2024-01-10T12:00:00';
				const maxDaytime = '2024-10-20T15:00:00';
				await page.setContent(`<kol-input-date _label="Date input" _type="datetime-local"></kol-input-date>`);

				await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date) => {
					element._min = date;
				}, minDateFormat);
				await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date) => {
					element._max = date;
				}, maxDateFormat);

				await expect(page.locator('input')).toHaveAttribute('min', minDayTime);
				await expect(page.locator('input')).toHaveAttribute('max', maxDaytime);
			});

			test('should set correct min and max for type week', async ({ page }) => {
				const minWeek = '2024-W02';
				const maxWeek = '2024-W42';
				await page.setContent(`<kol-input-date _label="Date input" _type="week"></kol-input-date>`);

				await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date) => {
					element._min = date;
				}, minDateFormat);
				await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date) => {
					element._max = date;
				}, maxDateFormat);

				await expect(page.locator('input')).toHaveAttribute('min', minWeek);
				await expect(page.locator('input')).toHaveAttribute('max', maxWeek);
			});

			test('should set correct min and max for type month', async ({ page }) => {
				const minMonth = '2024-01';
				const maxMonth = '2024-10';
				await page.setContent(`<kol-input-date _label="Date input" _type="month"></kol-input-date>`);

				await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date) => {
					element._min = date;
				}, minDateFormat);
				await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date) => {
					element._max = date;
				}, maxDateFormat);

				await expect(page.locator('input')).toHaveAttribute('min', minMonth);
				await expect(page.locator('input')).toHaveAttribute('max', maxMonth);
			});
		});
	});
});
