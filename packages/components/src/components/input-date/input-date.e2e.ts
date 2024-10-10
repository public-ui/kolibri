import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { Iso8601 } from '../../schema';

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
		test('should return Date when initial value is a Date object and trigger onChange', async ({ page }) => {
			await page.setContent('<kol-input-date _label="Date input"></kol-input-date>');
			await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date) => {
				element._value = date;
				element.addEventListener('change', (e: Event) => {
					const { value } = (e as CustomEvent).detail;
					expect(value).toBeInstanceOf(Date);
					expect(value.toISOString()).toBe('2021-04-04T00:00:00.000Z');
				});
			}, TEST_DATE);
			await page.locator('input').fill('2021-04-04');
			await page.locator('input').dispatchEvent('change');
		});

		test('should return the correct value with getValue()', async ({ page }) => {
			await page.setContent('<kol-input-date _label="Date input"></kol-input-date>');
			await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date) => {
				element._value = date;
			}, TEST_DATE);
			await page.locator('input').fill('2021-04-04');
			const value = await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement) => {
				return element.getValue();
			});
			expect(value).toBeInstanceOf(Date);
			if (value instanceof Date) expect(value?.toISOString()).toBe('2021-04-04T00:00:00.000Z');
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

		test('should return ISO 8601 string when initial value is a string and trigger onChange', async ({ page }) => {
			const TEST_STRING = '2020-03-03T03:02:01' as Iso8601;
			await page.setContent('<kol-input-date _label="Date input"></kol-input-date>');
			await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, isoString) => {
				element._value = isoString;
				element.addEventListener('change', (e: Event) => {
					const { value } = (e as CustomEvent).detail;
					expect(value).toBe(isoString);
				});
			}, TEST_STRING);
			await page.locator('input').fill('2021-04-04');
			await page.locator('input').dispatchEvent('change');
		});
		test('should return the correct ISO 8601 string with getValue()', async ({ page }) => {
			const TEST_STRING = '2020-03-03T03:02:01' as Iso8601;
			await page.setContent('<kol-input-date _label="Date input"></kol-input-date>');
			await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, isoString) => {
				element._value = isoString;
			}, TEST_STRING);
			await page.locator('input').fill('2021-04-04');
			const value = await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement) => {
				return element.getValue();
			});
			expect(value).toBe('2021-04-04');
		});
	});

	test.describe('when value is null', () => {
		test('should set value to null', async ({ page }) => {
			await page.setContent('<kol-input-date _label="Date input"></kol-input-date>');
			await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement) => {
				element._value = null;
			});
			await expect(page.locator('input')).toHaveValue('');
		});
	});
});
