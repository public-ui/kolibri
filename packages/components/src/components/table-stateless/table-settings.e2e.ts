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
			{ key: 'id', label: 'ID' },
			{ key: 'name', label: 'Name' },
			{ key: 'age', label: 'Age' },
		],
	],
};

test.describe('kol-table-settings', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(`<kol-table-stateless
      _label="Table with Settings"
      _header-cells='${JSON.stringify(HEADERS)}'
      _data='${JSON.stringify(DATA)}'
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
			const nameCheckbox = page.getByRole('checkbox', { name: 'Name' });
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
						position: 0,
						visible: true,
					},
					{
						key: 'name',
						label: 'Name',
						position: 1,
						visible: true,
					},
					{
						key: 'age',
						label: 'Age',
						position: 2,
						visible: true,
					},
				],
			});
		});
	});

	test.describe('Column Visibility Management', () => {
		test('it lists all columns in the settings', async ({ page }) => {
			const settingsButton = page.getByTestId('popover-button').locator('button');
			await settingsButton.click();

			const columnLabels = page.locator('.kol-table-settings__column > span');
			await expect(columnLabels).toHaveText(['ID', 'Name', 'Age']);
		});

		test('it toggles visibility of individual columns', async ({ page }) => {
			const settingsButton = page.getByTestId('popover-button').locator('button');
			await settingsButton.click();

			const nameCheckbox = page.getByRole('checkbox', { name: 'Name' });
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
			const checkboxes = page.getByRole('checkbox');
			for (const checkbox of await checkboxes.all()) {
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
			const checkboxes = page.getByRole('checkbox');
			for (const checkbox of await checkboxes.all()) {
				await checkbox.click();
			}

			const applyButton = page.getByTestId('table-settings-apply');
			await applyButton.click();

			// Show one column
			await checkboxes.first().click();
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
