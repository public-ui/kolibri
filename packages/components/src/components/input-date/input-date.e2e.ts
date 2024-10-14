import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import type { Iso8601 } from '../../schema';

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

	test.describe('Consistent Return Value for type datetime-local', () => {
		const testValues = [
			{ label: 'ISO String', value: '2020-03-03' as Iso8601 },
			{ label: 'Date Object', value: new Date('2020-03-03T03:02:01.099Z') },
		];

		testValues.forEach(({ label, value }) => {
			test(`should dispatch onchange  with value as ${label} in event detail`, async ({ page }) => {
				await page.setContent('<kol-input-date _label="Date input"></kol-input-date>');
				const inputDate = page.locator('kol-input-date');
				inputDate.evaluate((element: HTMLKolInputDateElement, date) => {
					element._value = date as Iso8601 | Date;
				}, value);

				const inputDateEventPromise = inputDate.evaluate((element) => {
					return new Promise<Date | Iso8601>((resolve) => {
						(element as HTMLKolSelectElement)._on = {
							onChange: (_event, eventValue: unknown) => {
								resolve(eventValue as Date | Iso8601);
							},
						};
					});
				});

				await page.waitForChanges();
				await page.locator('input').dispatchEvent('change');

				const eventDetail = await inputDateEventPromise;
				if (value instanceof Date) {
					expect(eventDetail).toBeInstanceOf(Date);
					expect((eventDetail as Date).toISOString().split('T')[0]).toBe(value.toISOString().split('T')[0]);
				} else {
					expect(eventDetail).toBe(value);
				}
			});

			test(`should dispatch onInput with value as ${label} in event detail`, async ({ page }) => {
				await page.setContent('<kol-input-date _label="Date input"></kol-input-date>');
				const inputDate = page.locator('kol-input-date');
				inputDate.evaluate((element: HTMLKolInputDateElement, date) => {
					element._value = date as Iso8601 | Date;
				}, value);

				const inputDateEventPromise = inputDate.evaluate((element) => {
					return new Promise<Date | Iso8601>((resolve) => {
						(element as HTMLKolSelectElement)._on = {
							onInput: (_event, eventValue: unknown) => {
								resolve(eventValue as Date | Iso8601);
							},
						};
					});
				});

				await page.waitForChanges();
				await page.locator('input').dispatchEvent('input');

				const eventDetail = await inputDateEventPromise;
				if (value instanceof Date) {
					expect(eventDetail).toBeInstanceOf(Date);
					expect((eventDetail as Date).toISOString().split('T')[0]).toBe(value.toISOString().split('T')[0]);
				} else {
					expect(eventDetail).toBe(value);
				}
			});

			test(`should return ${label} when initial value is a ${label} and trigger custom "change" DOM event`, async ({ page }) => {
				await page.setContent('<kol-input-date _label="Date input"></kol-input-date>');
				const inputDate = page.locator('kol-input-date');

				await inputDate.evaluate((element: HTMLKolInputDateElement, date) => {
					element._value = date;
				}, value);

				const inputDateEventPromise = inputDate.evaluate((element: HTMLKolInputDateElement) => {
					return new Promise<Date | Iso8601>((resolve) => {
						element.addEventListener('kol-change', (e: Event) => {
							const eventValue: Date | Iso8601 = (e as CustomEvent).detail;
							resolve(eventValue);
						});
					});
				});

				await page.waitForChanges();
				await page.locator('input').dispatchEvent('change');

				const eventDetail = await inputDateEventPromise;

				if (value instanceof Date) {
					expect(eventDetail).toBeInstanceOf(Date);
					expect((eventDetail as Date).toISOString().split('T')[0]).toBe(value.toISOString().split('T')[0]);
				} else {
					expect(eventDetail).toBe(value);
				}
			});

			test(`should return ${label} when initial value is a ${label} and trigger custom "input" DOM event`, async ({ page }) => {
				await page.setContent('<kol-input-date _label="Date input"></kol-input-date>');
				const inputDate = page.locator('kol-input-date');

				await inputDate.evaluate((element: HTMLKolInputDateElement, date) => {
					element._value = date;
				}, value);

				const inputDateEventPromise = inputDate.evaluate((element: HTMLKolInputDateElement) => {
					return new Promise<Date | Iso8601>((resolve) => {
						element.addEventListener('kol-input', (e: Event) => {
							const eventValue: Date | Iso8601 = (e as CustomEvent).detail;
							resolve(eventValue);
						});
					});
				});

				await page.waitForChanges();
				await page.locator('input').dispatchEvent('input');

				const eventDetail = await inputDateEventPromise;

				if (value instanceof Date) {
					expect(eventDetail).toBeInstanceOf(Date);
					expect((eventDetail as Date).toISOString().split('T')[0]).toBe(value.toISOString().split('T')[0]);
				} else {
					expect(eventDetail).toBe(value);
				}
			});

			test(`should return the correct value with getValue() as ${label}`, async ({ page }) => {
				await page.setContent('<kol-input-date _label="Date input"></kol-input-date>');
				await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date) => {
					element._value = date as Iso8601 | Date;
				}, value);

				const getValue = await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement) => {
					return element.getValue();
				});

				if (label === 'Date Object') {
					expect(getValue).toBeInstanceOf(Date);
				} else {
					expect(getValue).toBe(value);
				}
			});
		});

		test('should set value as empty string when null is provided', async ({ page }) => {
			await page.setContent('<kol-input-date _label="Date input"></kol-input-date>');
			await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement) => {
				element._value = null;
			});
			await expect(page.locator('input')).toHaveValue('');
		});
	});
});
