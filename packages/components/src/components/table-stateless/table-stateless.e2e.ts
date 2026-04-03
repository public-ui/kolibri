import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import type { KoliBriTableSelection, KoliBriTableSelectionKeys, SortEventPayload, TableHeaderCellsPropType } from '../../schema';

const DATA = [{ id: '1001' }, { id: '1002' }, { id: '1003' }, { id: '1004' }];
const HEADERS: TableHeaderCellsPropType = {
	horizontal: [[{ key: 'id', label: 'ID', sortDirection: 'ASC', width: 160 }]],
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
				return new Promise<KoliBriTableSelectionKeys>((resolve) => {
					element._on = {
						onSelectionChange: (_event: Event, selection: KoliBriTableSelectionKeys) => {
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
		test('it emits selectionchange when the selection changes', async ({ page }) => {
			const kolTableStateless = page.locator('kol-table-stateless');
			const eventPromise = kolTableStateless.evaluate((element: HTMLKolTableStatelessElement) => {
				return new Promise<KoliBriTableSelectionKeys>((resolve) => {
					element.addEventListener('selectionchange', (event: Event) => {
						resolve((event as CustomEvent<KoliBriTableSelectionKeys>).detail);
					});
				});
			});
			await kolTableStateless.getByLabel(`Selection for ${DATA[0].id}`).check();

			await expect(eventPromise).resolves.toEqual([DATA[0].id]);
		});

		test('it emits sort when the ID column header is clicked', async ({ page }) => {
			const kolTableStateless = page.locator('kol-table-stateless');
			const eventPromise = kolTableStateless.evaluate((element: HTMLKolTableStatelessElement) => {
				return new Promise<SortEventPayload>((resolve) => {
					element.addEventListener('sort', (event: Event) => {
						resolve((event as CustomEvent<SortEventPayload>).detail);
					});
				});
			});
			await kolTableStateless.getByRole('button', { name: 'ID' }).click();

			await expect(eventPromise).resolves.toEqual({
				key: 'id',
				currentSortDirection: 'ASC',
			});
		});
	});

	test.describe('Selection', () => {
		test.beforeEach(async ({ page }) => {
			await page.setContent(`<kol-table-stateless
						_label="Table Stateless with selection"
						_header-cells='${JSON.stringify(HEADERS)}'
						_data='${JSON.stringify(DATA)}'
					/>`);
			await page.locator('kol-table-stateless').evaluate((element: HTMLKolTableStatelessElement) => {
				element._selection = {
					label: (row) => `Selection for ${(row as Data).id}`,
					selectedKeys: ['1003'],
					disabledKeys: ['1002', '1003'],
				} as KoliBriTableSelection;
			});
			await page.waitForChanges();
		});

		test('it allows selecting individual rows', async ({ page }) => {
			const kolTableStateless = page.locator('kol-table-stateless');
			const callbackPromise = kolTableStateless.evaluate((element: HTMLKolTableStatelessElement) => {
				return new Promise<KoliBriTableSelectionKeys>((resolve) => {
					element._on = {
						onSelectionChange: (_event: Event, selection: KoliBriTableSelectionKeys) => {
							resolve(selection);
						},
					};
				});
			});
			await kolTableStateless.getByLabel(`Selection for ${DATA[0].id}`).check();

			await expect(callbackPromise).resolves.toEqual([DATA[2].id, DATA[0].id]);
		});

		test('it prevents selecting disabled rows', async ({ page }) => {
			const kolTableStateless = page.locator('kol-table-stateless');
			const disabledCheckbox = kolTableStateless.getByLabel(`Selection for ${DATA[1].id}`);
			await disabledCheckbox.click({ force: true });
			await expect(disabledCheckbox).toBeDisabled();
			await expect(disabledCheckbox).not.toBeChecked();
		});

		test('it allows selecting all enabled rows', async ({ page }) => {
			const kolTableStateless = page.locator('kol-table-stateless');
			const callbackPromise = kolTableStateless.evaluate((element: HTMLKolTableStatelessElement) => {
				return new Promise<KoliBriTableSelectionKeys>((resolve) => {
					element._on = {
						onSelectionChange: (_event: Event, selection: KoliBriTableSelectionKeys) => {
							resolve(selection);
						},
					};
				});
			});
			await kolTableStateless.getByTestId('selection-checkbox-all').check();

			await expect(callbackPromise).resolves.toEqual([DATA[2].id, DATA[0].id, DATA[3].id]);
		});

		test('it allows deselecting all enabled rows', async ({ page }) => {
			const kolTableStateless = page.locator('kol-table-stateless');
			await kolTableStateless.evaluate((element: HTMLKolTableStatelessElement) => {
				const currentSelection = element._selection as KoliBriTableSelection;
				element._selection = {
					...currentSelection,
					selectedKeys: ['1001', '1003', '1004'], // Pre-select both enabled and disabled keys
				};
			});
			await page.waitForChanges();

			const callbackPromise = kolTableStateless.evaluate((element: HTMLKolTableStatelessElement) => {
				return new Promise<KoliBriTableSelectionKeys>((resolve) => {
					element._on = {
						onSelectionChange: (_event: Event, selection: KoliBriTableSelectionKeys) => {
							resolve(selection);
						},
					};
				});
			});
			await kolTableStateless.getByTestId('selection-checkbox-all').uncheck({ force: true }); // need to use force because kol-icon is intercepting the click

			await expect(callbackPromise).resolves.toEqual(['1003']); // Should only keep the disabled key
		});

		test('it shows indeterminate state when some rows are selected', async ({ page }) => {
			const kolTableStateless = page.locator('kol-table-stateless');
			await kolTableStateless.evaluate((element: HTMLKolTableStatelessElement) => {
				const currentSelection = element._selection as KoliBriTableSelection;
				element._selection = {
					...currentSelection,
					selectedKeys: ['1003', '1001'],
				};
			});
			await page.waitForChanges();

			const selectAllCheckbox = kolTableStateless.getByTestId('selection-checkbox-all');
			await expect(selectAllCheckbox).toHaveJSProperty('indeterminate', true);
		});

		test('it handles single selection mode correctly', async ({ page }) => {
			const kolTableStateless = page.locator('kol-table-stateless');
			await kolTableStateless.evaluate((element: HTMLKolTableStatelessElement) => {
				const currentSelection = element._selection as KoliBriTableSelection;
				element._selection = {
					...currentSelection,
					multiple: false,
				};
			});
			await page.waitForChanges();

			const callbackPromise = kolTableStateless.evaluate((element: HTMLKolTableStatelessElement) => {
				return new Promise<KoliBriTableSelectionKeys>((resolve) => {
					element._on = {
						onSelectionChange: (_event: Event, selection: KoliBriTableSelectionKeys) => {
							resolve(selection);
						},
					};
				});
			});
			await kolTableStateless.getByLabel(`Selection for ${DATA[0].id}`).check();

			await expect(callbackPromise).resolves.toEqual([DATA[0].id]);
		});
	});

	test('supports external caption via aria-labelledby', async ({ page }) => {
		await page.setContent(
			`<span id="external-caption">Caption</span><kol-table-stateless aria-labelledby="external-caption" _label="" _header-cells='${JSON.stringify(HEADERS)}' _data='${JSON.stringify(DATA)}'></kol-table-stateless>`,
		);
		await page.waitForChanges();
		const table = page.locator('kol-table-stateless table');
		await expect(table.locator('caption')).toHaveCount(0);
		const supportsInternals = await page.evaluate(() => {
			return 'ElementInternals' in window && 'ariaLabelledByElements' in (ElementInternals.prototype as unknown as Record<string, unknown>);
		});

		if (supportsInternals) {
			await expect(table).not.toHaveAttribute('aria-labelledby');
		} else {
			await expect(table).toHaveAttribute('aria-labelledby', 'external-caption');
		}
	});

	test('renders internal caption when external target is missing', async ({ page }) => {
		await page.setContent(
			`<kol-table-stateless aria-labelledby="missing" _label="Internal" _header-cells='${JSON.stringify(HEADERS)}' _data='${JSON.stringify(DATA)}'></kol-table-stateless>`,
		);
		await page.waitForChanges();
		const table = page.locator('kol-table-stateless table');
		await expect(table).not.toHaveAttribute('aria-labelledby');
		await expect(table.locator('caption')).toHaveText('Internal');
	});
});
