import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import type { KoliBriTableDataType } from '../../schema';
import { KolEvent } from '../../utils/events';

const DATA = [{ id: '1001' }, { id: '1002' }];
const HEADERS = {
	horizontal: [[{ key: 'id', label: 'ID' }]],
};

type Data = (typeof DATA)[0];

test.describe('kol-table-stateful', () => {
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
		test('it emits selectionChange when the selection changes', async ({ page }) => {
			const kolTableStateful = page.locator('kol-table-stateful');
			const callbackPromise = kolTableStateful.evaluate((element: HTMLKolTableStatefulElement, KolEvent) => {
				return new Promise<KoliBriTableDataType[] | KoliBriTableDataType | null>((resolve) => {
					element.addEventListener(KolEvent.selectionChange, (event: Event) => {
						resolve((event as CustomEvent).detail as KoliBriTableDataType[] | KoliBriTableDataType | null);
					});
				});
			}, KolEvent);
			await kolTableStateful.getByLabel(`Selection for ${DATA[0].id}`).check();

			await expect(callbackPromise).resolves.toEqual([DATA[0]]);
		});
	});
});
