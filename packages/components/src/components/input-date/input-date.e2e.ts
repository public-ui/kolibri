import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { testInputMessage } from '../../e2e/input-msg';
import { setContentWithRetry } from '../../e2e/utils/setContentWithRetry';
import type { Iso8601 } from '../../schema';

test.describe('kol-input-date', () => {
	test.describe('when value is Date object', () => {
		const TEST_DATE = new Date('2020-03-03T03:02:01.099Z');

		test('should set the correct value for type date', async ({ page }) => {
			await page.setContent('<kol-input-date _label="Date input"></kol-input-date>');
			await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date: unknown) => {
				element._value = new Date(date as string);
			}, TEST_DATE.toISOString());
			await expect(page.locator('input')).toHaveValue('2020-03-03');
		});

		test('should set the correct value for type datetime-local', async ({ page }) => {
			await page.setContent('<kol-input-date _label="Date input" _type="datetime-local"></kol-input-date>');
			await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date: unknown) => {
				element._value = new Date(date as string);
			}, TEST_DATE.toISOString());
			await expect(page.locator('input')).toHaveValue('2020-03-03T04:02:01');
		});

		test('should set the correct value for type month', async ({ page }) => {
			await page.setContent('<kol-input-date _label="Date input" _type="month"></kol-input-date>');
			await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date: unknown) => {
				element._value = new Date(date as string);
			}, TEST_DATE.toISOString());
			await expect(page.locator('input')).toHaveValue('2020-03');
		});

		test('should set the correct value for type time', async ({ page }) => {
			await page.setContent('<kol-input-date _label="Date input" _type="time"></kol-input-date>');
			await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement, date: unknown) => {
				element._value = new Date(date as string);
			}, TEST_DATE.toISOString());
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

	test.describe('Value reflection', () => {
		const testValues: Array<{ label: string; value: Iso8601 | Date }> = [
			{ label: 'ISO String', value: '2020-03-03' as Iso8601 },
			{ label: 'Date Object', value: new Date('2020-03-03T03:02:01.099Z') },
		];

		testValues.forEach(({ label, value }) => {
			test.describe(`when initial value is a ${label}`, () => {
				test(`should return the correct value for getValue() as ${label}`, async ({ page }) => {
					await page.setContent('<kol-input-date _label="Date input"></kol-input-date>');
					const valueToSet: { kind: 'date'; iso: string } | { kind: 'string'; value: Iso8601 } =
						value instanceof Date ? { kind: 'date', iso: value.toISOString() } : { kind: 'string', value };
					await page
						.locator('kol-input-date')
						.evaluate((element: HTMLKolInputDateElement, date: { kind: 'date'; iso: string } | { kind: 'string'; value: Iso8601 }) => {
							element._value = date.kind === 'date' ? new Date(date.iso) : date.value;
						}, valueToSet);

					const getValue = await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement) => {
						return element.getValue();
					});

					if (value instanceof Date) {
						expect(getValue).toBeInstanceOf(Date);
						expect((getValue as Date).toISOString().split('T')[0]).toBe(value.toISOString().split('T')[0]);
					} else {
						expect(getValue).toBe(value);
					}
				});

				test(`should reflect the correct _value property as ${label} on the web component`, async ({ page }) => {
					await page.setContent('<kol-input-date _label="Date input"></kol-input-date>');
					const valueToSet: { kind: 'date'; iso: string } | { kind: 'string'; value: Iso8601 } =
						value instanceof Date ? { kind: 'date', iso: value.toISOString() } : { kind: 'string', value };
					await page
						.locator('kol-input-date')
						.evaluate((element: HTMLKolInputDateElement, date: { kind: 'date'; iso: string } | { kind: 'string'; value: Iso8601 }) => {
							element._value = date.kind === 'date' ? new Date(date.iso) : date.value; // set the initial value
						}, valueToSet);

					const NEW_DATE = '2021-03-03';
					await page.locator('input').fill(NEW_DATE);

					const valueDomProperty = await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement) => element._value);

					if (value instanceof Date) {
						expect(valueDomProperty).toBeInstanceOf(Date);
						expect((valueDomProperty as Date).toISOString().split('T')[0]).toBe(new Date(NEW_DATE).toISOString().split('T')[0]);
					} else {
						expect(valueDomProperty).toBe(NEW_DATE);
					}
				});
			});
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
					(element: HTMLKolInputDateElement, { minDateFormat, maxDateFormat }: { minDateFormat: unknown; maxDateFormat: unknown }) => {
						element._min = new Date(minDateFormat as string) as unknown as Date;
						element._max = new Date(maxDateFormat as string) as unknown as Date;
					},
					{ minDateFormat: minDateFormat.toISOString(), maxDateFormat: maxDateFormat.toISOString() },
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
					(element: HTMLKolInputDateElement, { minDateFormat, maxDateFormat }: { minDateFormat: unknown; maxDateFormat: unknown }) => {
						element._min = new Date(minDateFormat as string) as unknown as Date;
						element._max = new Date(maxDateFormat as string) as unknown as Date;
					},
					{ minDateFormat: minDateFormat.toISOString(), maxDateFormat: maxDateFormat.toISOString() },
				);

				await expect(page.locator('input')).toHaveAttribute('min', minTime);
				await expect(page.locator('input')).toHaveAttribute('max', maxTime);
			});

			test('should set correct min and max for type datetime_locale', async ({ page }) => {
				const minDayTime = '2024-01-10T13:00:00';
				const maxDaytime = '2024-10-20T17:00:00';
				await page.setContent(`<kol-input-date _label="Date input" _type="datetime-local"></kol-input-date>`);

				await page.locator('kol-input-date').evaluate(
					(element: HTMLKolInputDateElement, { minDateFormat, maxDateFormat }: { minDateFormat: unknown; maxDateFormat: unknown }) => {
						element._min = new Date(minDateFormat as string) as unknown as Date;
						element._max = new Date(maxDateFormat as string) as unknown as Date;
					},
					{ minDateFormat: minDateFormat.toISOString(), maxDateFormat: maxDateFormat.toISOString() },
				);

				await expect(page.locator('input')).toHaveAttribute('min', minDayTime);
				await expect(page.locator('input')).toHaveAttribute('max', maxDaytime);
			});

			test('should set correct min and max for type week', async ({ page }) => {
				const minWeek = '2024-W02';
				const maxWeek = '2024-W42';
				await page.setContent(`<kol-input-date _label="Date input" _type="week"></kol-input-date>`);

				await page.locator('kol-input-date').evaluate(
					(element: HTMLKolInputDateElement, { minDateFormat, maxDateFormat }: { minDateFormat: unknown; maxDateFormat: unknown }) => {
						element._min = new Date(minDateFormat as string) as unknown as Date;
						element._max = new Date(maxDateFormat as string) as unknown as Date;
					},
					{ minDateFormat: minDateFormat.toISOString(), maxDateFormat: maxDateFormat.toISOString() },
				);

				await expect(page.locator('input')).toHaveAttribute('min', minWeek);
				await expect(page.locator('input')).toHaveAttribute('max', maxWeek);
			});

			test('should set correct min and max for type month', async ({ page }) => {
				const minMonth = '2024-01';
				const maxMonth = '2024-10';
				await page.setContent(`<kol-input-date _label="Date input" _type="month"></kol-input-date>`);

				await page.locator('kol-input-date').evaluate(
					(element: HTMLKolInputDateElement, { minDateFormat, maxDateFormat }: { minDateFormat: unknown; maxDateFormat: unknown }) => {
						element._min = new Date(minDateFormat as string) as unknown as Date;
						element._max = new Date(maxDateFormat as string) as unknown as Date;
					},
					{ minDateFormat: minDateFormat.toISOString(), maxDateFormat: maxDateFormat.toISOString() },
				);

				await expect(page.locator('input')).toHaveAttribute('min', minMonth);
				await expect(page.locator('input')).toHaveAttribute('max', maxMonth);
			});
		});
	});

	test.describe('when initial value is null', () => {
		test('should set value as empty string', async ({ page }) => {
			await page.setContent('<kol-input-date _label="Date input"></kol-input-date>');
			await page.locator('kol-input-date').evaluate((element: HTMLKolInputDateElement) => {
				element._value = null;
			});
			await expect(page.locator('input')).toHaveValue('');
		});
	});

	test.describe('Callbacks and Events', () => {
		test('should call onFocus callback and emit focus event when input receives focus', async ({ page }) => {
			await setContentWithRetry(page, `<kol-input-date _label="Date input"></kol-input-date>`);
			const component = page.locator('kol-input-date');
			const input = page.locator('input');

			await component.evaluate((element: HTMLKolInputDateElement) => {
				element._on = { onFocus: () => ((window as unknown as Record<string, unknown>).focusCallback = true) };
				element.addEventListener('focus', () => ((window as unknown as Record<string, unknown>).focusEvent = true));
			});

			await input.focus();
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).focusCallback)).toBe(true);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).focusEvent)).toBe(true);
		});

		test('should call onBlur callback and emit blur event when input loses focus', async ({ page }) => {
			await setContentWithRetry(page, `<kol-input-date _label="Date input"></kol-input-date><button id="next">Next</button>`);
			const component = page.locator('kol-input-date');
			const input = page.locator('input');
			const nextButton = page.locator('#next');

			await component.evaluate((element: HTMLKolInputDateElement) => {
				element._on = { onBlur: () => ((window as unknown as Record<string, unknown>).blurCallback = true) };
				element.addEventListener('blur', () => ((window as unknown as Record<string, unknown>).blurEvent = true));
			});

			await input.focus();
			await page.waitForChanges();
			await nextButton.focus();
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).blurCallback)).toBe(true);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).blurEvent)).toBe(true);
		});

		test('should call onClick callback and emit click event when input is clicked', async ({ page }) => {
			await setContentWithRetry(page, `<kol-input-date _label="Date input"></kol-input-date>`);
			const component = page.locator('kol-input-date');
			const input = page.locator('input');

			await component.evaluate((element: HTMLKolInputDateElement) => {
				element._on = { onClick: () => ((window as unknown as Record<string, unknown>).clickCallback = true) };
				element.addEventListener('click', () => ((window as unknown as Record<string, unknown>).clickEvent = true));
			});

			await input.click();
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).clickCallback)).toBe(true);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).clickEvent)).toBe(true);
		});
	});

	testInputMessage<HTMLKolInputDateElement>('kol-input-date');
});
