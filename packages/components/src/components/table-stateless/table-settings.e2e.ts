import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import type { KoliBriTableHeaderCell, TableHeaderCellsPropType } from '../../schema';

const DATA = [
	{ id: '1001', name: 'John', age: 30 },
	{ id: '1002', name: 'Jane', age: 25 },
	{ id: '1003', name: 'Bob', age: 35 },
];

const HEADERS: TableHeaderCellsPropType = {
	horizontal: [
		[
			{ key: 'id', label: 'ID', width: 120 },
			{ key: 'name', label: 'Name', width: 180 },
			{ key: 'age', label: 'Age', width: 120 },
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
			const settingsButton = page.locator('.kol-table-settings').locator('button').first();
			await settingsButton.click();
			const popover = page.locator('.kol-table-settings__content');
			await expect(popover).toBeVisible();
		});

		test('it closes the popover when clicking the cancel button', async ({ page }) => {
			const settingsButton = page.locator('.kol-table-settings').locator('button').first();
			await settingsButton.click();
			const cancelButton = page.locator('.kol-table-settings__actions').locator('button').first();
			await cancelButton.click();
			const popover = page.locator('.kol-table-settings__content');
			await expect(popover).not.toBeVisible();
		});

		test('it persists settings after closing and reopening the popover', async ({ page }) => {
			const settingsButton = page.locator('.kol-table-settings').locator('button').first();
			await settingsButton.click();

			// Hide the name column
			const nameCheckbox = page.getByRole('checkbox', { name: 'Name' });
			await nameCheckbox.click();

			// Apply changes
			const applyButton = page.locator('.kol-table-settings__actions').locator('button').last();
			await applyButton.click();

			// Reopen settings
			await settingsButton.click();

			// Verify name column is still hidden
			await expect(nameCheckbox).not.toBeChecked();
		});

		test('it emits an DOM event when settings change', async ({ page }) => {
			const tableStateless = page.locator('kol-table-stateless');
			const settingsButton = page.locator('.kol-table-settings').locator('button').first();
			await settingsButton.click();

			const eventPromise = tableStateless.evaluate((element: HTMLKolTableStatelessElement) => {
				return new Promise<KoliBriTableHeaderCell[][]>((resolve) => {
					element.addEventListener('changeheadercells', (event: Event) => {
						resolve((event as CustomEvent).detail as KoliBriTableHeaderCell[][]);
					});
				});
			});

			// Apply changes
			const applyButton = page.locator('.kol-table-settings__actions').locator('button').last();
			await applyButton.click();

			await expect(eventPromise).resolves.toEqual([
				[
					{ key: 'id', label: 'ID', visible: true, hidable: true, width: 120 },
					{ key: 'name', label: 'Name', visible: true, hidable: true, width: 180 },
					{ key: 'age', label: 'Age', visible: true, hidable: true, width: 120 },
				],
			]);
		});
	});

	test.describe('Column Visibility Management', () => {
		test('it lists all columns in the settings', async ({ page }) => {
			const settingsButton = page.locator('.kol-table-settings').locator('button').first();
			await settingsButton.click();

			const columnLabels = page.locator('.kol-table-settings__column-label');
			await expect(columnLabels).toHaveText(['ID', 'Name', 'Age']);
		});

		test('it toggles visibility of individual columns', async ({ page }) => {
			const settingsButton = page.locator('.kol-table-settings').locator('button').first();
			await settingsButton.click();

			const nameCheckbox = page.getByRole('checkbox', { name: 'Name' });
			await nameCheckbox.click();

			const applyButton = page.locator('.kol-table-settings__actions').locator('button').last();
			await applyButton.click();

			// Verify name column is hidden in the table
			const nameColumn = page.locator('kol-table-stateless-wc th').filter({ hasText: 'Name' });
			await expect(nameColumn).not.toBeVisible();
		});

		test('it shows error message when all columns are hidden', async ({ page }) => {
			const settingsButton = page.locator('.kol-table-settings').locator('button').first();
			await settingsButton.click();

			// Hide all columns
			const checkboxes = page.getByRole('checkbox');
			for (const checkbox of await checkboxes.all()) {
				await checkbox.click();
			}

			const applyButton = page.locator('.kol-table-settings__actions').locator('button').last();
			await applyButton.click();

			const errorMessage = page.locator('kol-table-settings-wc kol-alert-wc');
			await expect(errorMessage).toBeVisible();
		});

		test('it removes error message when at least one column is visible', async ({ page }) => {
			const settingsButton = page.locator('.kol-table-settings').locator('button').first();
			await settingsButton.click();

			// Hide all columns
			const checkboxes = page.getByRole('checkbox');
			for (const checkbox of await checkboxes.all()) {
				await checkbox.click();
			}

			const applyButton = page.locator('.kol-table-settings__actions').locator('button').last();
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
			const settingsButton = page.locator('.kol-table-settings').locator('button').first();
			await settingsButton.click();

			const idWidthInput = page.getByRole('spinbutton', { name: 'ID' });
			await idWidthInput.fill('50');

			const applyButton = page.locator('.kol-table-settings__actions').locator('button').last();
			await applyButton.click();

			// Verify width is applied
			const idColumn = page.locator('kol-table-stateless-wc th').filter({ hasText: 'ID' });
			await expect(idColumn).toHaveCSS('width', '50px');
		});
	});

	test.describe('Column Order Management', () => {
		test('it disables up button for first column', async ({ page }) => {
			const settingsButton = page.locator('.kol-table-settings').locator('button').first();
			await settingsButton.click();

			const firstUpButton = page.locator('[data-testid="table-settings-move-up"]').first().locator('button');
			await expect(firstUpButton).toBeDisabled();
		});

		test('it disables down button for last column', async ({ page }) => {
			const settingsButton = page.locator('.kol-table-settings').locator('button').first();
			await settingsButton.click();

			const lastDownButton = page.locator('[data-testid="table-settings-move-down"]').last().locator('button');
			await expect(lastDownButton).toBeDisabled();
		});

		test('it moves a column up', async ({ page }) => {
			const settingsButton = page.locator('.kol-table-settings').locator('button').first();
			await settingsButton.click();

			// Move name column up - find the button in the Name column row
			const nameRow = page.locator('.kol-table-settings__column').filter({ hasText: 'Name' });
			const nameUpButton = nameRow.locator('[data-testid="table-settings-move-up"]').locator('button');
			await nameUpButton.click();

			const applyButton = page.locator('.kol-table-settings__actions').locator('button').last();
			await applyButton.click();

			// Verify column order in table
			const columns = page.locator('kol-table-stateless-wc th');
			await expect(columns.nth(0)).toHaveText('Name');
			await expect(columns.nth(1)).toHaveText('ID');
		});

		test('it moves a column down', async ({ page }) => {
			const settingsButton = page.locator('.kol-table-settings').locator('button').first();
			await settingsButton.click();

			// Move ID column down - find the button in the ID column row
			const idRow = page.locator('.kol-table-settings__column').filter({ hasText: 'ID' });
			const idDownButton = idRow.locator('[data-testid="table-settings-move-down"]').locator('button');
			await idDownButton.click();

			const applyButton = page.locator('.kol-table-settings__actions').locator('button').last();
			await applyButton.click();

			// Verify column order in table
			const columns = page.locator('kol-table-stateless-wc th');
			await expect(columns.nth(0)).toHaveText('Name');
			await expect(columns.nth(1)).toHaveText('ID');
		});
	});
});
