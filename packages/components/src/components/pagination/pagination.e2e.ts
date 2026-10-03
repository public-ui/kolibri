import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import type { E2EPage } from '@stencil/playwright';
import { test } from '@stencil/playwright';
import { Callback } from '../../schema/enums';

test.describe('kol-pagination', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(`
			<kol-pagination
				_max="40"
				_page="1"
				_siblingCount="0"
				_boundaryCount="2"
				_label="Pagination"
				_page-size-options="[10, 20]"
			/>
		`);
	});

	test.describe('Callbacks', () => {
		[Callback.onClick, Callback.onChangePage].forEach((callbackName) => {
			test(`it calls the ${callbackName} callback when a page is clicked`, async ({ page }) => {
				const callbackPromise = page.locator('kol-pagination').evaluate((element: HTMLKolPaginationElement, callbackName) => {
					return new Promise<number>((resolve) => {
						element._on = {
							[callbackName]: (_: Event, page: number) => {
								resolve(page);
							},
						};
					});
				}, callbackName);
				await page.waitForChanges();
				await page.getByRole('button', { name: '2' }).click();
				await page.waitForChanges();

				await expect(callbackPromise).resolves.toBe(2);
			});
		});

		test('it calls the onChangePageSize callback when the page size is changed', async ({ page }) => {
			const callbackPromise = page.locator('kol-pagination').evaluate((element: HTMLKolPaginationElement, Callback) => {
				return new Promise<number>((resolve) => {
					element._on = {
						[Callback.onChangePageSize]: (_: Event, pageSize: number) => {
							resolve(pageSize);
						},
					};
				});
			}, Callback);
			await page.waitForChanges();
			await page.locator('select').selectOption('-1'); // choose second option (20)
			await page.waitForChanges();

			await expect(callbackPromise).resolves.toBe(20);
		});
	});

	test.describe('DOM events', () => {
		['click', 'changepage'].forEach((eventName) => {
			test(`it emits ${eventName} when a page is clicked`, async ({ page }) => {
				const eventPromise = page.locator('kol-pagination').evaluate((element: HTMLKolPaginationElement, eventName) => {
					return new Promise<number>((resolve) => {
						element.addEventListener(eventName, (event: Event) => {
							resolve((event as CustomEvent).detail as number);
						});
					});
				}, eventName);
				await page.waitForChanges();
				await page.getByRole('button', { name: '2' }).click();
				await page.waitForChanges();

				await expect(eventPromise).resolves.toBe(2);
			});
		});

		test('it emits changepagesize when the page size is changed', async ({ page }) => {
			const eventPromise = page.locator('kol-pagination').evaluate((element: HTMLKolPaginationElement) => {
				return new Promise<number>((resolve) => {
					element.addEventListener('changepagesize', (event: Event) => {
						resolve((event as CustomEvent).detail as number);
					});
				});
			});
			await page.waitForChanges();
			await page.locator('select').selectOption('-1'); // choose second option (20)
			await page.waitForChanges();

			await expect(eventPromise).resolves.toBe(20);
		});
	});
});

/*
 * Pins the event and callback protocol ahead of the skeleton migration (#9590): which callbacks and
 * DOM events fire, in which order, with which value, and how often a clamped page is reported.
 */
test.describe('kol-pagination behavior', () => {
	type Log = string[];

	/** Creates the element, attaches the `_on` callbacks and the listeners, then appends it, so the load is logged too. */
	const mount = async (page: Page & E2EPage, props: Record<string, unknown>) => {
		await page.setContent('<div id="root"></div>');
		await page.evaluate((props) => {
			const log: string[] = [];
			(window as unknown as { log: string[] }).log = log;
			const element = document.createElement('kol-pagination');
			Object.assign(element, props);
			element._on = {
				onClick: (_event: Event, value: number) => log.push(`cb:onClick:${value}`),
				onChangePage: (event: Event, value: number) => log.push(`cb:onChangePage:${value}:${event.type}`),
				onChangePageSize: (event: Event, value: number) => log.push(`cb:onChangePageSize:${value}:${event.type}`),
			};
			['click', 'changepage', 'changepagesize'].forEach((type) =>
				element.addEventListener(type, (event) => {
					if (event instanceof CustomEvent) log.push(`ev:${type}:${JSON.stringify(event.detail)}`);
				}),
			);
			document.getElementById('root')?.append(element);
		}, props);
		await page.waitForChanges();
		await page.waitForTimeout(100);
	};

	const readLog = (page: Page): Promise<Log> =>
		page.evaluate(() => {
			const log = (window as unknown as { log: string[] }).log;
			return log.splice(0, log.length);
		});

	const selectedPage = (page: Page) => page.locator('kol-pagination .kol-pagination__button--selected .kol-span__label').textContent();

	test('clamps a page beyond the last page on load and reports the clamped page twice', async ({ page }) => {
		await mount(page, { _max: 10, _page: 20 });
		expect(await readLog(page)).toEqual(['cb:onChangePage:10:StateChange', 'ev:changepage:10', 'cb:onChangePage:10:StateChange', 'ev:changepage:10']);
		expect(await selectedPage(page)).toBe('10');
	});

	test('clamps a page below the first page on load', async ({ page }) => {
		await mount(page, { _max: 10, _page: 0 });
		expect(await readLog(page)).toEqual(['cb:onChangePage:1:StateChange', 'ev:changepage:1', 'cb:onChangePage:1:StateChange', 'ev:changepage:1']);
		expect(await selectedPage(page)).toBe('1');
	});

	test('clamps a page set after load and keeps the _page prop', async ({ page }) => {
		await mount(page, { _max: 10, _page: 2 });
		await readLog(page);
		await page.locator('kol-pagination').evaluate((element: HTMLKolPaginationElement) => {
			element._page = 99;
		});
		await page.waitForChanges();
		await page.waitForTimeout(100);
		expect(await readLog(page)).toEqual(['cb:onChangePage:10:StateChange', 'ev:changepage:10']);
		expect(await selectedPage(page)).toBe('10');
		expect(await page.locator('kol-pagination').evaluate((element: HTMLKolPaginationElement) => element._page)).toBe(99);
	});

	test('reports a page click as click, then the click of the inner button, then asynchronously as page change', async ({ page }) => {
		await mount(page, { _max: 10, _page: 5 });
		await readLog(page);
		await page.getByRole('button', { name: '6' }).click();
		await page.waitForTimeout(100);
		expect(await readLog(page)).toEqual(['cb:onClick:6', 'ev:click:6', 'ev:click:null', 'cb:onChangePage:6:click', 'ev:changepage:6']);
	});

	test('navigates with the first, previous, next and last buttons without changing the selected page itself', async ({ page }) => {
		await mount(page, { _max: 10, _page: 5 });
		await readLog(page);
		for (const position of ['first', 'previous', 'next', 'last']) {
			await page.locator(`kol-pagination .kol-pagination__button--${position} button`).click();
			await page.waitForTimeout(100);
		}
		expect(await readLog(page)).toEqual([
			'cb:onClick:1',
			'ev:click:1',
			'ev:click:null',
			'cb:onChangePage:1:click',
			'ev:changepage:1',
			'cb:onClick:4',
			'ev:click:4',
			'ev:click:null',
			'cb:onChangePage:4:click',
			'ev:changepage:4',
			'cb:onClick:6',
			'ev:click:6',
			'ev:click:null',
			'cb:onChangePage:6:click',
			'ev:changepage:6',
			'cb:onClick:10',
			'ev:click:10',
			'ev:click:null',
			'cb:onChangePage:10:click',
			'ev:changepage:10',
		]);
		expect(await selectedPage(page)).toBe('5');
	});

	test('disables the first and previous buttons on the first page and the next and last buttons on the last page', async ({ page }) => {
		await mount(page, { _max: 10, _page: 1 });
		const disabled = (position: string) => page.locator(`kol-pagination .kol-pagination__button--${position} button`).isDisabled();
		expect([await disabled('first'), await disabled('previous'), await disabled('next'), await disabled('last')]).toEqual([true, true, false, false]);
		await page.locator('kol-pagination').evaluate((element: HTMLKolPaginationElement) => {
			element._page = 10;
		});
		await page.waitForChanges();
		expect([await disabled('first'), await disabled('previous'), await disabled('next'), await disabled('last')]).toEqual([false, false, true, true]);
	});

	test('changes the page size, keeps the _pageSize prop and clamps the page to the new last page', async ({ page }) => {
		await mount(page, { _max: 40, _page: 4, _pageSize: 10, _pageSizeOptions: [10, 20] });
		await readLog(page);
		await page.locator('kol-pagination select').selectOption('-1');
		await page.waitForChanges();
		await page.waitForTimeout(100);
		expect(await readLog(page)).toEqual(['cb:onChangePage:2:StateChange', 'ev:changepage:2', 'cb:onChangePageSize:20:change', 'ev:changepagesize:20']);
		// The inner `kol-pagination-wc` writes its own `_pageSize`; the prop of `kol-pagination` keeps its value.
		expect(await page.locator('kol-pagination').evaluate((element: HTMLKolPaginationElement) => element._pageSize)).toBe(10);
		expect(await selectedPage(page)).toBe('2');
	});

	test('falls back to the first page size option when _pageSize is not an option', async ({ page }) => {
		await mount(page, { _max: 40, _page: 1, _pageSize: 15, _pageSizeOptions: [10, 20] });
		expect(await page.locator('kol-pagination .kol-pagination__entries').textContent()).toContain('10');
		expect(await page.locator('kol-pagination select').inputValue()).toBe('-0');
	});
});
