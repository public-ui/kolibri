import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import type { KoliBriTableDataType } from '../../schema';
import { KolEvent } from '../../utils/events';

const DATA = [{ id: '1001' }, { id: '1002' }];
const DATA_NUM = [{ id: 1001 }, { id: 1002 }];
const HEADERS = {
	horizontal: [[{ key: 'id', label: 'ID' }]],
};

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
			await page.waitForChanges();
		});

		test.describe('Callbacks', () => {
			test('it calls the onSelectionChange callback when the selection changes', async ({ page }) => {
				const kolTableStateful = page.locator('kol-table-stateful');
				const selectionCheckbox = kolTableStateful.getByLabel(`Selection for ${DATA[0].id}`);
				const callbackPromise = kolTableStateful.evaluate((element: HTMLKolTableStatefulElement) => {
					return new Promise<KoliBriTableDataType[] | KoliBriTableDataType | null>((resolve) => {
						element._on = {
							onSelectionChange: (_event: Event, selection: KoliBriTableDataType[] | KoliBriTableDataType | null) => {
								resolve(selection);
							},
						};
					});
				});
				await expect(selectionCheckbox).toBeVisible();
				await selectionCheckbox.check();

				await expect(callbackPromise).resolves.toEqual([DATA[0]]);
			});
		});

		test.describe('DOM events', () => {
			test('it emits selectionChange when the selection changes', async ({ page }) => {
				const kolTableStateful = page.locator('kol-table-stateful');
				const selectionCheckbox = kolTableStateful.getByLabel(`Selection for ${DATA[0].id}`);
				const selectionChange = String(KolEvent.selectionChange);
				const callbackPromise = kolTableStateful.evaluate((element: Element, selectionChangeEvent: string) => {
					const host = element as HTMLElement;
					return new Promise<KoliBriTableDataType[] | KoliBriTableDataType | null>((resolve) => {
						host.addEventListener(selectionChangeEvent, (event: Event) => {
							resolve((event as CustomEvent<KoliBriTableDataType[] | KoliBriTableDataType | null>).detail);
						});
					});
				}, selectionChange);
				await expect(selectionCheckbox).toBeVisible();
				await selectionCheckbox.check();

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
			await page.waitForChanges();
			const got = await page.locator('kol-table-stateful').evaluate<KoliBriTableDataType[] | null>(async (el: Element) => {
				const table = el as HTMLElement & { getSelection: () => Promise<KoliBriTableDataType[] | null> };
				return await table.getSelection();
			});
			expect(got).toEqual([{ id: 1002 }]);
		});
	});
});
