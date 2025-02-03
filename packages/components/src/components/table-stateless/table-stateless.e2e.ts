import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import type { SortEventPayload, TableHeaderCellsPropType } from '../../schema';
import { KolEvent } from '../../utils/events';

const DATA = [{ id: '1001' }, { id: '1002' }];
const HEADERS: TableHeaderCellsPropType = {
	horizontal: [[{ key: 'id', label: 'ID', sortDirection: 'ASC' }]],
};

type Data = (typeof DATA)[0];

test.describe('kol-table-stateless', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(`<kol-table-stateless
					_label="Table Stateless"
					_header-cells='${JSON.stringify(HEADERS)}'
					_data='${JSON.stringify(DATA)}'
				/>`);
		await page.locator('kol-table-stateless').evaluate((element: HTMLKolTableStatelessElement) => {
			element._selection = {
				label: (row) => `Selection for ${(row as Data).id}`,
				selectedKeys: [],
			};
		});
		await page.waitForChanges();
	});

	test.describe('Callbacks', () => {
		test('it calls the onSelectionChange callback when the selection changes', async ({ page }) => {
			const kolTableStateless = page.locator('kol-table-stateless');
			const callbackPromise = kolTableStateless.evaluate((element: HTMLKolTableStatelessElement) => {
				return new Promise<string | string[]>((resolve) => {
					element._on = {
						onSelectionChange: (_event: Event, selection: string | string[]) => {
							resolve(selection);
						},
					};
				});
			});
			await kolTableStateless.getByLabel(`Selection for ${DATA[0].id}`).check();

			await expect(callbackPromise).resolves.toEqual([DATA[0].id]);
		});

		test('it calls the onSort callback when the ID column header is clicked', async ({ page }) => {
			const kolTableStateless = page.locator('kol-table-stateless');
			const callbackPromise = kolTableStateless.evaluate((element: HTMLKolTableStatelessElement) => {
				return new Promise<SortEventPayload>((resolve) => {
					element._on = {
						onSort: (_event: Event, sortEvent: SortEventPayload) => {
							resolve(sortEvent);
						},
					};
				});
			});
			await kolTableStateless.getByRole('button', { name: 'ID' }).click();

			await expect(callbackPromise).resolves.toEqual({
				key: 'id',
				currentSortDirection: 'ASC',
			});
		});
	});

	test.describe('DOM events', () => {
		test('it emits selectionChange when the selection changes', async ({ page }) => {
			const kolTableStateless = page.locator('kol-table-stateless');
			const eventPromise = kolTableStateless.evaluate((element: HTMLKolTableStatelessElement, KolEvent) => {
				return new Promise<string | string[]>((resolve) => {
					element.addEventListener(KolEvent.selectionChange, (event: Event) => {
						resolve((event as CustomEvent).detail as string | string[]);
					});
				});
			}, KolEvent);
			await kolTableStateless.getByLabel(`Selection for ${DATA[0].id}`).check();

			await expect(eventPromise).resolves.toEqual([DATA[0].id]);
		});

		test('it emits sort when the ID column header is clicked', async ({ page }) => {
			const kolTableStateless = page.locator('kol-table-stateless');
			const eventPromise = kolTableStateless.evaluate((element: HTMLKolTableStatelessElement, KolEvent) => {
				return new Promise<SortEventPayload>((resolve) => {
					element.addEventListener(KolEvent.sort, (event: Event) => {
						resolve((event as CustomEvent).detail as SortEventPayload);
					});
				});
			}, KolEvent);
			await kolTableStateless.getByRole('button', { name: 'ID' }).click();

			await expect(eventPromise).resolves.toEqual({
				key: 'id',
				currentSortDirection: 'ASC',
			});
		});
	});
});
