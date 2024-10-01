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

		test('should return Date when initial value is a Date object', async ({ page }) => {
			const TEST_DATE = new Date('2020-03-03T03:02:01.099Z');
			await page.setContent('<kol-input-date _label="Date input"></kol-input-date>');
			await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date) => {
				element._value = date;
				element.addEventListener('change', (e: Event) => {
					expect((e as CustomEvent).detail.value).toBeInstanceOf(Date);
				});
			}, TEST_DATE);
			await page.locator('input').fill('2021-04-04');
			await page.locator('input').dispatchEvent('change');
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
		test('should return ISO 8601 string when initial value is a string', async ({ page }) => {
			const TEST_STRING = '2020-03-03T03:02:01' as Iso8601;
			await page.setContent('<kol-input-date _label="Date input"></kol-input-date>');
			await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, isoString) => {
				element._value = isoString;
				element.addEventListener('change', (e: Event) => {
					expect((e as CustomEvent).detail.value).toBe(isoString);
				});
			}, TEST_STRING);
			await page.locator('input').fill('2021-04-04');
			await page.locator('input').dispatchEvent('change');
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
