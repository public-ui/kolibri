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
				void inputDate.evaluate((element: HTMLKolInputDateElement, date) => {
					element._value = date;
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
				void inputDate.evaluate((element: HTMLKolInputDateElement, date) => {
					element._value = date;
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
					element._value = date;
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
				minDateFormat = new Date('2024-01-10T12:00:00Z');
				maxDateFormat = new Date('2024-10-20T15:00:00Z');
			});
			test('should set correct min and max for type date', async ({ page }) => {
				const minDate = '2024-01-10';
				const maxDate = '2024-10-20';
				await page.setContent(`<kol-input-date _label="Date input" _type="date"></kol-input-date>`);

				await page.locator('kol-input-date').evaluate(
					(element: HTMLKolInputDateElement, { minDateFormat, maxDateFormat }) => {
						element._min = minDateFormat;
						element._max = maxDateFormat;
					},
					{ minDateFormat, maxDateFormat },
				);
				await page.waitForChanges();

				await expect(page.locator('input')).toHaveAttribute('min', minDate);
				await expect(page.locator('input')).toHaveAttribute('max', maxDate);
			});

			test('should set correct min and max for type time', async ({ page }) => {
				const minTime = '13:00';
				const maxTime = '17:00';
				await page.setContent(`<kol-input-date _label="Date input" _type="time"></kol-input-date>`);

				await page.locator('kol-input-date').evaluate(
					(element: HTMLKolInputDateElement, { minDateFormat, maxDateFormat }) => {
						element._min = minDateFormat;
						element._max = maxDateFormat;
					},
					{ minDateFormat, maxDateFormat },
				);

				await expect(page.locator('input')).toHaveAttribute('min', minTime);
				await expect(page.locator('input')).toHaveAttribute('max', maxTime);
			});

			test('should set correct min and max for type datetime_locale', async ({ page }) => {
				const minDayTime = '2024-01-10T13:00:00';
				const maxDaytime = '2024-10-20T17:00:00';
				await page.setContent(`<kol-input-date _label="Date input" _type="datetime-local"></kol-input-date>`);

				await page.locator('kol-input-date').evaluate(
					(element: HTMLKolInputDateElement, { minDateFormat, maxDateFormat }) => {
						element._min = minDateFormat;
						element._max = maxDateFormat;
					},
					{ minDateFormat, maxDateFormat },
				);

				await expect(page.locator('input')).toHaveAttribute('min', minDayTime);
				await expect(page.locator('input')).toHaveAttribute('max', maxDaytime);
			});

			test('should set correct min and max for type week', async ({ page }) => {
				const minWeek = '2024-W02';
				const maxWeek = '2024-W42';
				await page.setContent(`<kol-input-date _label="Date input" _type="week"></kol-input-date>`);

				await page.locator('kol-input-date').evaluate(
					(element: HTMLKolInputDateElement, { minDateFormat, maxDateFormat }) => {
						element._min = minDateFormat;
						element._max = maxDateFormat;
					},
					{ minDateFormat, maxDateFormat },
				);

				await expect(page.locator('input')).toHaveAttribute('min', minWeek);
				await expect(page.locator('input')).toHaveAttribute('max', maxWeek);
			});

			test('should set correct min and max for type month', async ({ page }) => {
				const minMonth = '2024-01';
				const maxMonth = '2024-10';
				await page.setContent(`<kol-input-date _label="Date input" _type="month"></kol-input-date>`);

				await page.locator('kol-input-date').evaluate(
					(element: HTMLKolInputDateElement, { minDateFormat, maxDateFormat }) => {
						element._min = minDateFormat;
						element._max = maxDateFormat;
					},
					{ minDateFormat, maxDateFormat },
				);

				await expect(page.locator('input')).toHaveAttribute('min', minMonth);
				await expect(page.locator('input')).toHaveAttribute('max', maxMonth);
			});
		});
	});
});
