import { expect, type Page } from '@playwright/test';
import type { E2EPage } from '@stencil/playwright';
import { test } from '@stencil/playwright';
import type { KoliBriTableDataType, KoliBriTableHeaders, TableHeaderCells } from '../../schema';

const DATA = [{ id: '1001' }, { id: '1002' }];
const DATA_NUM = [{ id: 1001 }, { id: 1002 }];
const HEADERS: TableHeaderCells = {
	horizontal: [
		[
			{
				key: 'id',
				label: 'ID',
				width: 100,
			},
		],
	],
};

const SORTABLE_DATA = [{ id: '3' }, { id: '1' }, { id: '2' }];

type Data = (typeof DATA)[0];

const getFirstBodyCell = (page: Page) => page.locator('kol-table-stateful').locator('tbody td.kol-table__cell--body').first();

test.describe('kol-table-stateful', () => {
	test.describe('kol-table-stateful (string ids)', () => {
		test.beforeEach(async ({ page }) => {
			await page.setContent(`<kol-table-stateful
					_label="Table Stateful"
					_headers='${JSON.stringify(HEADERS)}'
					_data='${JSON.stringify(DATA)}'
				/>`);
			await page.locator('kol-table-stateful').evaluate((element: HTMLKolTableStatefulElement) => {
				element._selection = {
					label: (row) => `Selection for ${(row as Data).id}`,
					selectedKeys: [],
				};
			});
		});

		test.describe('Callbacks', () => {
			test('it calls the onSelectionChange callback when the selection changes', async ({ page }) => {
				const kolTableStateful = page.locator('kol-table-stateful');
				const callbackPromise = kolTableStateful.evaluate((element: HTMLKolTableStatefulElement) => {
					return new Promise<KoliBriTableDataType[] | KoliBriTableDataType | null>((resolve) => {
						element._on = {
							onSelectionChange: (_event: Event, selection: KoliBriTableDataType[] | KoliBriTableDataType | null) => {
								resolve(selection);
							},
						};
					});
				});
				await kolTableStateful.getByLabel(`Selection for ${DATA[0].id}`).check();

				await expect(callbackPromise).resolves.toEqual([DATA[0]]);
			});
		});

		test.describe('DOM events', () => {
			test('it emits selectionchange when the selection changes', async ({ page }) => {
				const kolTableStateful = page.locator('kol-table-stateful');
				const callbackPromise = kolTableStateful.evaluate((element: HTMLKolTableStatefulElement) => {
					return new Promise<KoliBriTableDataType[] | KoliBriTableDataType | null>((resolve) => {
						element.addEventListener('selectionchange', (event: Event) => {
							resolve((event as CustomEvent).detail as KoliBriTableDataType[] | KoliBriTableDataType | null);
						});
					});
				});
				await kolTableStateful.getByLabel(`Selection for ${DATA[0].id}`).check();

				await expect(callbackPromise).resolves.toEqual([DATA[0]]);
			});
		});
	});

	test.describe('kol-table-stateful (number ids)', () => {
		test('selection works with number[]', async ({ page }) => {
			await page.setContent(`<kol-table-stateful
					_label="Table Stateful"
					_headers='${JSON.stringify(HEADERS)}'
					_data='${JSON.stringify(DATA_NUM)}'
				/>`);
			await page.locator('kol-table-stateful').evaluate((el: HTMLKolTableStatefulElement) => {
				el._selection = { label: (row: KoliBriTableDataType) => `Selection for ${(row.id as number).toString()}`, keyPropertyName: 'id', selectedKeys: [1002] };
			});
			const got = await page.locator('kol-table-stateful').evaluate((el: HTMLKolTableStatefulElement) => el.getSelection());
			expect(got).toEqual([{ id: 1002 }]);
		});
	});

	test('hides internal caption and removes aria-labelledby when _ariaLabelledby is set', async ({ page }) => {
		await page.setContent(
			`<span id="external-caption">Caption</span><kol-table-stateful _label="Fallback" _headers='${JSON.stringify(HEADERS)}' _data='${JSON.stringify(DATA)}'></kol-table-stateful>`,
		);
		await page.locator('kol-table-stateful').evaluate((el: HTMLKolTableStatefulElement) => {
			(el as unknown as { _ariaLabelledby: string })._ariaLabelledby = 'external-caption';
		});
		await page.waitForChanges();
		const table = page.locator('kol-table-stateful').locator('table');
		// External element resolved — the table must no longer point to its internal caption.
		await expect(table).not.toHaveAttribute('aria-labelledby', 'caption');
		// Stateful table does not expose an internal caption when external labelling is active.
		await expect(table.locator('caption')).toHaveCount(0);
	});

	test.describe('resetSort()', () => {
		test('resets manual sort back to the default sort defined in headers', async ({ page }) => {
			await page.setContent(`<kol-table-stateful
					_label="Table Stateful"
					_data='${JSON.stringify(SORTABLE_DATA)}'
				/>`);

			// Set headers with a compareFn via evaluate (functions cannot be serialized to JSON)
			await page.locator('kol-table-stateful').evaluate((el: HTMLKolTableStatefulElement) => {
				const headers: KoliBriTableHeaders = {
					horizontal: [
						[
							{
								key: 'id',
								label: 'ID',
								sortDirection: 'ASC',
								compareFn: (a, b) => String(a.id).localeCompare(String(b.id)),
							},
						],
					],
				};
				el._headers = headers as unknown as string;
			});
			await page.waitForChanges();

			// Verify initial ASC sort: first row should be '1'
			await expect(getFirstBodyCell(page)).toHaveText('1');

			// Toggle sorting by clicking the visible header sort button (ASC -> DESC)
			const idSortButton = page.locator('kol-table-stateful').getByRole('button', { name: 'ID' });
			await idSortButton.click();
			await idSortButton.click();
			await page.waitForChanges();

			// Verify DESC sort: first row should be '3'
			await expect(getFirstBodyCell(page)).toHaveText('3');

			// Reset sort
			await page.locator('kol-table-stateful').evaluate((el: HTMLKolTableStatefulElement) => el.resetSort());
			await page.waitForChanges();

			// Verify the sort is back to ASC: first row should be '1'
			await expect(getFirstBodyCell(page)).toHaveText('1');
		});

		test('clears manual sort when no default sort is defined in headers', async ({ page }) => {
			await page.setContent(`<kol-table-stateful
					_label="Table Stateful"
					_data='${JSON.stringify(SORTABLE_DATA)}'
				/>`);

			// Set headers without initial sortDirection via evaluate
			await page.locator('kol-table-stateful').evaluate((el: HTMLKolTableStatefulElement) => {
				const headers: KoliBriTableHeaders = {
					horizontal: [
						[
							{
								key: 'id',
								label: 'ID',
								compareFn: (a, b) => String(a.id).localeCompare(String(b.id)),
							},
						],
					],
				};
				el._headers = headers as unknown as string;
			});
			await page.waitForChanges();

			// Trigger an ASC sort on the id column
			await page.locator('kol-table-stateful').getByRole('button', { name: 'ID' }).click();
			await page.waitForChanges();

			// Verify ASC sort applied: first row should be '1'
			await expect(getFirstBodyCell(page)).toHaveText('1');

			// Reset sort
			await page.locator('kol-table-stateful').evaluate((el: HTMLKolTableStatefulElement) => el.resetSort());
			await page.waitForChanges();

			// Verify the sort is cleared: first row should be back to original order '3'
			await expect(getFirstBodyCell(page)).toHaveText('3');
		});
	});
});

test.describe('kol-table-stateful behavior', () => {
	type Row = { id: number; name: string; city: string };

	/**
	 * Mounts a table with 23 rows (ids 23 to 1), two sortable columns (`id`, `city`), a multiple selection
	 * and a pagination of 5 rows per page. Callbacks and listeners are attached before the element is
	 * connected, so the load is logged too.
	 */
	const mount = async (page: Page & E2EPage, props: Record<string, unknown> = {}) => {
		await page.setContent('<div id="root"></div>');
		await page.evaluate((props) => {
			const log: string[] = [];
			(window as unknown as { log: string[] }).log = log;
			const cities = ['Berlin', 'Hamburg', 'Bonn'];
			const element = document.createElement('kol-table-stateful');
			element._label = 'Table';
			const headers: KoliBriTableHeaders = {
				horizontal: [
					[
						{ key: 'id', label: 'ID', compareFn: (a, b) => (a as Row).id - (b as Row).id },
						{ key: 'name', label: 'Name' },
						{ key: 'city', label: 'City', compareFn: (a, b) => (a as Row).city.localeCompare((b as Row).city) },
					],
				],
			};
			element._headers = headers as unknown as string;
			element._data = Array.from({ length: 23 }, (_, index) => ({ id: 23 - index, name: `Name ${index}`, city: cities[index % 3] }));
			element._pagination = {
				_page: 1,
				_pageSize: 5,
				_pageSizeOptions: [5, 10, 20],
				_on: {
					onClick: (event: Event, value: number) => log.push(`pagination:onClick:${value}:${event.type}`),
					onChangePage: (event: Event, value: number) => log.push(`pagination:onChangePage:${value}:${event.type}`),
					onChangePageSize: (event: Event, value: number) => log.push(`pagination:onChangePageSize:${value}:${event.type}`),
				},
			};
			element._selection = { label: (row) => `Select ${(row as Row).id}`, keyPropertyName: 'id', multiple: true, selectedKeys: [] };
			element._on = {
				onSelectionChange: (_event: Event, value: unknown) => log.push(`cb:onSelectionChange:${JSON.stringify((value as Row[] | null)?.map((row) => row.id))}`),
			};
			Object.assign(element, props);
			['changepage', 'changepagesize', 'input', 'change', 'selectionchange', 'sort'].forEach((type) =>
				element.addEventListener(type, (event) => {
					if (event instanceof CustomEvent) {
						const detail = type === 'selectionchange' ? (event.detail as Row[] | null)?.map((row) => row.id) : event.detail;
						log.push(`ev:${type}:${JSON.stringify(detail)}`);
					}
				}),
			);
			document.getElementById('root')?.append(element);
		}, props);
		await page.waitForChanges();
		await page.waitForTimeout(100);
	};

	const settle = async (page: Page & E2EPage) => {
		await page.waitForChanges();
		await page.waitForTimeout(100);
	};

	const readLog = (page: Page): Promise<string[]> =>
		page.evaluate(() => {
			const log = (window as unknown as { log: string[] }).log;
			return log.splice(0, log.length);
		});

	const table = (page: Page) => page.locator('kol-table-stateful');

	/** The ids of the displayed rows, in order. */
	const rowIds = (page: Page) =>
		table(page)
			.locator('tbody tr')
			.evaluateAll((rows) => rows.map((row) => row.querySelector('td.kol-table__cell--body:not(.kol-table__cell--checkbox)')?.textContent ?? ''));

	const sortStates = (page: Page) =>
		table(page)
			.locator('th[aria-sort]')
			.evaluateAll((cells) => cells.map((cell) => cell.getAttribute('aria-sort')));

	const entries = (page: Page) => table(page).locator('.kol-pagination__entries').textContent();

	const clickSort = async (page: Page & E2EPage, name: string) => {
		await table(page).getByRole('button', { name, exact: true }).click();
		await settle(page);
	};

	/** Clicks a pagination button through the DOM: the buttons have no layout without a theme. */
	const clickPagination = async (page: Page & E2EPage, selector: string) => {
		await table(page)
			.locator(`${selector} button`)
			.first()
			.evaluate((button: HTMLButtonElement) => button.click());
		await settle(page);
	};

	test('cycles the sort of a column through ascending, descending and unsorted', async ({ page }) => {
		await mount(page);
		expect(await rowIds(page)).toEqual(['23', '22', '21', '20', '19']);
		expect(await sortStates(page)).toEqual(['none', 'none', 'none']);

		await clickSort(page, 'ID');
		expect(await rowIds(page)).toEqual(['1', '2', '3', '4', '5']);
		expect(await sortStates(page)).toEqual(['ascending', 'none', 'none']);

		await clickSort(page, 'ID');
		expect(await rowIds(page)).toEqual(['23', '22', '21', '20', '19']);
		expect(await sortStates(page)).toEqual(['descending', 'none', 'none']);

		await clickSort(page, 'ID');
		expect(await sortStates(page)).toEqual(['none', 'none', 'none']);
		expect(await readLog(page)).toEqual([
			'ev:sort:{"key":"id","currentSortDirection":"NOS"}',
			'ev:sort:{"key":"id","currentSortDirection":"ASC"}',
			'ev:sort:{"key":"id","currentSortDirection":"DESC"}',
		]);
	});

	test('replaces the sort of another column without multi sort', async ({ page }) => {
		await mount(page);
		await clickSort(page, 'City');
		expect(await rowIds(page)).toEqual(['23', '20', '17', '14', '11']);
		await clickSort(page, 'ID');
		expect(await rowIds(page)).toEqual(['1', '2', '3', '4', '5']);
		expect(await sortStates(page)).toEqual(['ascending', 'none', 'none']);
	});

	test('keeps the sort of several columns in click order with multi sort', async ({ page }) => {
		await mount(page, { _allowMultiSort: true });
		await clickSort(page, 'City');
		await clickSort(page, 'ID');
		await clickSort(page, 'ID');
		expect(await sortStates(page)).toEqual(['descending', 'none', 'ascending']);
		expect(await rowIds(page)).toEqual(['23', '20', '17', '14', '11']);
		expect(await table(page).locator('th[aria-sort] .kol-table__sort-order').allTextContents()).toEqual(['2', '1']);
	});

	test('reports a page click through the pagination callbacks and shows the page', async ({ page }) => {
		await mount(page);
		await readLog(page);
		await clickPagination(page, '.kol-pagination__button--numbers');
		expect((await readLog(page)).filter((entry) => !entry.startsWith('ev:click'))).toEqual([
			'pagination:onClick:2:click',
			'pagination:onChangePage:2:click',
			'ev:changepage:2',
		]);
		expect(await rowIds(page)).toEqual(['18', '17', '16', '15', '14']);
		expect(await entries(page)).toContain('6');
	});

	test('clamps the page when a larger page size is chosen and reports the select events at the table', async ({ page }) => {
		await mount(page);
		await clickPagination(page, '.kol-pagination__button--last');
		expect(await rowIds(page)).toEqual(['3', '2', '1']);
		await readLog(page);

		await table(page).locator('select').selectOption('-2');
		await settle(page);
		expect(await readLog(page)).toEqual([
			'ev:input:20',
			'ev:change:20',
			'pagination:onChangePage:2:StateChange',
			'ev:changepage:2',
			'pagination:onChangePageSize:20:change',
			'ev:changepagesize:20',
		]);
		expect(await rowIds(page)).toEqual(['3', '2', '1']);
	});

	test('clamps the page when the data shrinks', async ({ page }) => {
		await mount(page);
		await clickPagination(page, '.kol-pagination__button--last');
		await readLog(page);

		await table(page).evaluate((element: HTMLKolTableStatefulElement) => {
			element._data = (element._data as unknown as Row[]).slice(0, 7);
		});
		await settle(page);
		expect(await readLog(page)).toEqual(['pagination:onChangePage:2:StateChange', 'ev:changepage:2']);
		expect(await rowIds(page)).toEqual(['18', '17']);
	});

	test('keeps the selection across pages', async ({ page }) => {
		await mount(page);
		await table(page).getByLabel('Select 23').check();
		await settle(page);
		await clickPagination(page, '.kol-pagination__button--numbers');
		await readLog(page);

		await table(page).getByLabel('Select 18').check({ force: true });
		await settle(page);
		expect(await readLog(page)).toEqual(['cb:onSelectionChange:[23,18]', 'ev:selectionchange:[23,18]']);
		const selection = await table(page).evaluate(async (element: HTMLKolTableStatefulElement) =>
			((await element.getSelection()) as Row[] | null)?.map((row) => row.id),
		);
		expect(selection).toEqual([23, 18]);
	});

	test('shows all rows when the pagination is switched off', async ({ page }) => {
		await mount(page);
		await table(page).evaluate((element: HTMLKolTableStatefulElement) => {
			element._pagination = false;
		});
		await settle(page);
		expect(await rowIds(page)).toHaveLength(23);
		await expect(table(page).locator('.kol-pagination')).toHaveCount(0);
	});
});
