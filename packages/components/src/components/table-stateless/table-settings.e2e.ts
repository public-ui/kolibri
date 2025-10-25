import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import type { TableHeaderCellsPropType, TableSettings } from '../../schema';
import { KolEvent } from '../../utils/events';

const DATA = [
	{ id: '1001', name: 'John', age: 30 },
	{ id: '1002', name: 'Jane', age: 25 },
	{ id: '1003', name: 'Bob', age: 35 },
];

const HEADERS: TableHeaderCellsPropType = {
	horizontal: [
		[
			{ key: 'id', label: 'ID', sortDirection: 'NOS' },
			{ key: 'name', label: 'Name', sortDirection: 'NOS' },
			{ key: 'age', label: 'Age', sortDirection: 'NOS' },
		],
	],
};

test.describe('kol-table-settings', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(`<kol-table-stateless
      _label="Table with Settings"
      _header-cells='${JSON.stringify(HEADERS)}'
      _data='${JSON.stringify(DATA)}'
      _has-settings-menu
    />`);
		await page.waitForChanges();
	});

	test.describe('Basic Settings Popover Tests', () => {
		test('it opens the settings popover when clicking the settings button', async ({ page }) => {
			const settingsButton = page.getByTestId('popover-button').locator('button');
			await settingsButton.click();
			const popover = page.getByTestId('popover-content');
			await expect(popover).toBeVisible();
		});

		test('it closes the popover when clicking the cancel button', async ({ page }) => {
			const settingsButton = page.getByTestId('popover-button').locator('button');
			await settingsButton.click();
			const cancelButton = page.getByTestId('table-settings-cancel');
			await cancelButton.click();
			const popover = page.getByTestId('popover-content');
			await expect(popover).not.toBeVisible();
		});

		test('it persists settings after closing and reopening the popover', async ({ page }) => {
			const settingsButton = page.getByTestId('popover-button').locator('button');
			await settingsButton.click();

			// Hide the name column
			const nameCheckbox = page.getByTestId('table-settings-visible-name');
			await nameCheckbox.click();

			// Apply changes
			const applyButton = page.getByTestId('table-settings-apply');
			await applyButton.click();

			// Reopen settings
			await settingsButton.click();

			// Verify name column is still hidden
			await expect(nameCheckbox).not.toBeChecked();
		});

		test('it emits an DOM event when settings change', async ({ page }) => {
			const tableStateless = page.locator('kol-table-stateless');
			const settingsButton = page.getByTestId('popover-button').locator('button');
			await settingsButton.click();

			const eventPromise = tableStateless.evaluate((element: HTMLKolTableStatelessElement, KolEvent) => {
				return new Promise<TableSettings>((resolve) => {
					element.addEventListener(KolEvent.settingsChange, (event: Event) => {
						resolve((event as CustomEvent).detail as TableSettings);
					});
				});
			}, KolEvent);

			// Apply changes
			const applyButton = page.getByTestId('table-settings-apply');
			await applyButton.click();

			await expect(eventPromise).resolves.toEqual({
				columns: [
					{
						key: 'id',
						label: 'ID',
						visible: true,
						hidable: true,
						sortable: true,
						sizable: true,
					},
					{
						key: 'name',
						label: 'Name',
						visible: true,
						hidable: true,
						sortable: true,
						sizable: true,
					},
					{
						key: 'age',
						label: 'Age',
						visible: true,
						hidable: true,
						sortable: true,
						sizable: true,
					},
				],
			});
		});
	});

	test.describe('Column Visibility Management', () => {
		test('it lists all columns in the settings', async ({ page }) => {
			const settingsButton = page.getByTestId('popover-button').locator('button');
			await settingsButton.click();

			const columnLabels = page.locator('.kol-table-settings__column-label');
			await expect(columnLabels).toHaveText(['ID', 'Name', 'Age']);
		});

		test('it toggles visibility of individual columns', async ({ page }) => {
			const settingsButton = page.getByTestId('popover-button').locator('button');
			await settingsButton.click();

			const nameCheckbox = page.getByTestId('table-settings-visible-name');
			await nameCheckbox.click();

			const applyButton = page.getByTestId('table-settings-apply');
			await applyButton.click();

			// Verify name column is hidden in the table
			const nameColumn = page.locator('kol-table-stateless-wc th').filter({ hasText: 'Name' });
			await expect(nameColumn).not.toBeVisible();
		});

		test('it shows error message when all columns are hidden', async ({ page }) => {
			const settingsButton = page.getByTestId('popover-button').locator('button');
			await settingsButton.click();
			await page.waitForChanges();

			// Hide all columns
			const visibilityCheckboxes = page.locator('[data-testid^="table-settings-visible-"]');
			for (const checkbox of await visibilityCheckboxes.all()) {
				await checkbox.click();
			}

			const applyButton = page.getByTestId('table-settings-apply');
			await applyButton.click();

			const errorMessage = page.locator('kol-table-settings-wc kol-alert-wc');
			await expect(errorMessage).toBeVisible();
		});

		test('it removes error message when at least one column is visible', async ({ page }) => {
			const settingsButton = page.getByTestId('popover-button').locator('button');
			await settingsButton.click();
			await page.waitForChanges();

			// Hide all columns
			const visibilityCheckboxes = page.locator('[data-testid^="table-settings-visible-"]');
			for (const checkbox of await visibilityCheckboxes.all()) {
				await checkbox.click();
			}

			const applyButton = page.getByTestId('table-settings-apply');
			await applyButton.click();

			// Show one column
			await visibilityCheckboxes.first().click();
			await applyButton.click();

			const errorMessage = page.locator('kol-table-settings-wc kol-alert-wc');
			await expect(errorMessage).not.toBeVisible();
		});
	});

	test.describe('Column Width Management', () => {
		test('it accepts valid width values', async ({ page }) => {
			const settingsButton = page.getByTestId('popover-button').locator('button');
			await settingsButton.click();

			const idWidthInput = page.getByRole('spinbutton', { name: 'ID' });
			await idWidthInput.fill('50');

			const applyButton = page.getByTestId('table-settings-apply');
			await applyButton.click();

			// Verify width is applied
			const idColumn = page.locator('kol-table-stateless-wc th').filter({ hasText: 'ID' });
			await expect(idColumn).toHaveAttribute('style', 'width: 50ch;');
		});
	});

	test.describe('Column metadata restrictions', () => {
		test('it respects non-sortable columns from the header definition', async ({ page }) => {
			await page.setContent(`<kol-table-stateless
      _label="Table with non-sortable column"
      _header-cells='${JSON.stringify({
				horizontal: [
					[
						{ key: 'id', label: 'ID', sortDirection: 'NOS', sortable: false },
						{ key: 'name', label: 'Name', sortDirection: 'NOS' },
					],
				],
			})}'
      _data='${JSON.stringify(DATA)}'
      _has-settings-menu
    />`);
			await page.waitForChanges();

			await expect(page.locator('kol-table-stateless-wc').getByRole('button', { name: 'ID' })).toHaveCount(0);

			const tableStateless = page.locator('kol-table-stateless');
			const settingsButton = page.getByTestId('popover-button').locator('button');
			await settingsButton.click();

			const eventPromise = tableStateless.evaluate((element: HTMLKolTableStatelessElement, KolEvent) => {
				return new Promise<TableSettings>((resolve) => {
					element.addEventListener(KolEvent.settingsChange, (event: Event) => {
						resolve((event as CustomEvent).detail as TableSettings);
					});
				});
			}, KolEvent);

			const applyButton = page.getByTestId('table-settings-apply');
			await applyButton.click();

			await expect(eventPromise).resolves.toEqual({
				columns: [
					{
						key: 'id',
						label: 'ID',
						visible: true,
						hidable: true,
						sortable: false,
						sizable: true,
					},
					{
						key: 'name',
						label: 'Name',
						visible: true,
						hidable: true,
						sortable: true,
						sizable: true,
					},
				],
			});
		});

		test('it disables width editing for non-sizable columns', async ({ page }) => {
			await page.setContent(`<kol-table-stateless
      _label="Table with fixed width column"
      _header-cells='${JSON.stringify({
				horizontal: [
					[
						{ key: 'id', label: 'ID', sortDirection: 'NOS', sizable: false },
						{ key: 'name', label: 'Name', sortDirection: 'NOS' },
					],
				],
			})}'
      _data='${JSON.stringify(DATA)}'
      _has-settings-menu
    />`);
			await page.waitForChanges();

			const settingsButton = page.getByTestId('popover-button').locator('button');
			await settingsButton.click();

			const idWidthInput = page.getByRole('spinbutton', { name: 'ID' });
			await expect(idWidthInput).toBeDisabled();
		});

		test('it disables column move controls for non-sortable columns', async ({ page }) => {
			await page.setContent(`<kol-table-stateless
      _label="Table with fixed column order"
      _header-cells='${JSON.stringify({
				horizontal: [
					[
						{ key: 'id', label: 'ID', sortDirection: 'NOS', sortable: false },
						{ key: 'name', label: 'Name', sortDirection: 'NOS' },
					],
				],
			})}'
      _data='${JSON.stringify(DATA)}'
      _has-settings-menu
    />`);
			await page.waitForChanges();

			const settingsButton = page.getByTestId('popover-button').locator('button');
			await settingsButton.click();

			const idColumnRow = page.locator('.kol-table-settings__column').filter({ hasText: 'ID' });
			const idMoveUpButton = idColumnRow.getByTestId('table-settings-move-up').locator('button');
			const idMoveDownButton = idColumnRow.getByTestId('table-settings-move-down').locator('button');

			await expect(idMoveUpButton).toBeDisabled();
			await expect(idMoveDownButton).toBeDisabled();
		});

		test('it prevents moving columns past non-sortable neighbours', async ({ page }) => {
			await page.setContent(`<kol-table-stateless
      _label="Table with locked middle column"
      _header-cells='${JSON.stringify({
				horizontal: [
					[
						{ key: 'id', label: 'ID', sortDirection: 'NOS' },
						{ key: 'name', label: 'Name', sortDirection: 'NOS', sortable: false },
						{ key: 'age', label: 'Age', sortDirection: 'NOS' },
					],
				],
			})}'
      _data='${JSON.stringify(DATA)}'
      _has-settings-menu
    />`);
			await page.waitForChanges();

			const settingsButton = page.getByTestId('popover-button').locator('button');
			await settingsButton.click();

			const idRow = page.locator('.kol-table-settings__column').filter({ hasText: 'ID' });
			const nameRow = page.locator('.kol-table-settings__column').filter({ hasText: 'Name' });
			const ageRow = page.locator('.kol-table-settings__column').filter({ hasText: 'Age' });

			await expect(idRow.getByTestId('table-settings-move-down').locator('button')).toBeDisabled();
			await expect(nameRow.getByTestId('table-settings-move-up').locator('button')).toBeDisabled();
			await expect(nameRow.getByTestId('table-settings-move-down').locator('button')).toBeDisabled();
			await expect(ageRow.getByTestId('table-settings-move-up').locator('button')).toBeDisabled();
		});
	});

	test.describe('Column Order Management', () => {
		test('it disables up button for first column', async ({ page }) => {
			const settingsButton = page.getByTestId('popover-button').locator('button');
			await settingsButton.click();

			const firstUpButton = page.getByTestId('table-settings-move-up').first().locator('button');
			await expect(firstUpButton).toBeDisabled();
		});

		test('it disables down button for last column', async ({ page }) => {
			const settingsButton = page.getByTestId('popover-button').locator('button');
			await settingsButton.click();

			const lastDownButton = page.getByTestId('table-settings-move-down').last().locator('button');
			await expect(lastDownButton).toBeDisabled();
		});

		test('it moves a column up', async ({ page }) => {
			const settingsButton = page.getByTestId('popover-button').locator('button');
			await settingsButton.click();

			// Move name column up
			const nameUpButton = page.getByTestId('table-settings-move-up').filter({ hasText: 'Name' });
			await nameUpButton.click();

			const applyButton = page.getByTestId('table-settings-apply');
			await applyButton.click();

			// Verify column order in table
			const columns = page.locator('kol-table-stateless-wc th');
			await expect(columns.nth(0)).toHaveText('Name');
			await expect(columns.nth(1)).toHaveText('ID');
		});

		test('it moves a column down', async ({ page }) => {
			const settingsButton = page.getByTestId('popover-button').locator('button');
			await settingsButton.click();

			// Move ID column down
			const idDownButton = page.getByTestId('table-settings-move-down').filter({ hasText: 'ID' });
			await idDownButton.click();

			const applyButton = page.getByTestId('table-settings-apply');
			await applyButton.click();

			// Verify column order in table
			const columns = page.locator('kol-table-stateless-wc th');
			await expect(columns.nth(0)).toHaveText('Name');
			await expect(columns.nth(1)).toHaveText('ID');
		});
	});
});
