import { expect } from '@playwright/test';
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

			// Wait for the initial sort to be applied
			await page.waitForTimeout(50);

			// Verify initial ASC sort: first row should be '1'
			const firstRowBeforeReset = await page.locator('kol-table-stateful').evaluate((el: HTMLKolTableStatefulElement) => {
				return (el as unknown as { state: { _sortedData: KoliBriTableDataType[] } }).state._sortedData[0].id;
			});
			expect(firstRowBeforeReset).toBe('1');

			// Change sort to DESC by calling handleSort internally
			await page.locator('kol-table-stateful').evaluate((el: HTMLKolTableStatefulElement) => {
				const headers = (el as unknown as { state: { _headers: KoliBriTableHeaders } }).state._headers;
				const cell = headers.horizontal?.[0]?.[0];
				if (cell) {
					(el as unknown as { changeCellSort: (cell: unknown) => void }).changeCellSort(cell);
					(el as unknown as { changeCellSort: (cell: unknown) => void }).changeCellSort(cell);
				}
			});

			// Verify DESC sort: first row should be '3'
			const firstRowAfterDescSort = await page.locator('kol-table-stateful').evaluate((el: HTMLKolTableStatefulElement) => {
				return (el as unknown as { state: { _sortedData: KoliBriTableDataType[] } }).state._sortedData[0].id;
			});
			expect(firstRowAfterDescSort).toBe('3');

			// Reset sort
			await page.locator('kol-table-stateful').evaluate((el: HTMLKolTableStatefulElement) => el.resetSort());

			// Verify the sort is back to ASC: first row should be '1'
			const firstRowAfterReset = await page.locator('kol-table-stateful').evaluate((el: HTMLKolTableStatefulElement) => {
				return (el as unknown as { state: { _sortedData: KoliBriTableDataType[] } }).state._sortedData[0].id;
			});
			expect(firstRowAfterReset).toBe('1');
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

			// Trigger an ASC sort on the id column
			await page.locator('kol-table-stateful').evaluate((el: HTMLKolTableStatefulElement) => {
				const headers = (el as unknown as { state: { _headers: KoliBriTableHeaders } }).state._headers;
				const cell = headers.horizontal?.[0]?.[0];
				if (cell) {
					(el as unknown as { changeCellSort: (cell: unknown) => void }).changeCellSort(cell);
				}
			});

			// Verify ASC sort applied: first row should be '1'
			const firstRowAfterSort = await page.locator('kol-table-stateful').evaluate((el: HTMLKolTableStatefulElement) => {
				return (el as unknown as { state: { _sortedData: KoliBriTableDataType[] } }).state._sortedData[0].id;
			});
			expect(firstRowAfterSort).toBe('1');

			// Reset sort
			await page.locator('kol-table-stateful').evaluate((el: HTMLKolTableStatefulElement) => el.resetSort());

			// Verify the sort is cleared: first row should be back to original order '3'
			const firstRowAfterReset = await page.locator('kol-table-stateful').evaluate((el: HTMLKolTableStatefulElement) => {
				return (el as unknown as { state: { _sortedData: KoliBriTableDataType[] } }).state._sortedData[0].id;
			});
			expect(firstRowAfterReset).toBe('3');
		});
	});
});
