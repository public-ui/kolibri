import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import type { TableHeaderCellsPropType } from '../../schema';

const DATA = [
	{ id: '1001', name: 'John', age: 30 },
	{ id: '1002', name: 'Jane', age: 25 },
];

const HEADERS_WITH_NON_HIDABLE: TableHeaderCellsPropType = {
	horizontal: [
		[
			{ key: 'id', label: 'ID', hidable: false, width: 120 },
			{ key: 'name', label: 'Name', width: 180 },
			{ key: 'age', label: 'Age', width: 120 },
		],
	],
};

test.describe('kol-table-settings hidable functionality', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(`<kol-table-stateless
      _label="Table with Non-Hidable Column"
      _header-cells='${JSON.stringify(HEADERS_WITH_NON_HIDABLE)}'
      _data='${JSON.stringify(DATA)}'
      _has-settings-menu
    />`);
		await page.waitForChanges();
	});

	test('it should show disabled checkbox for non-hidable columns', async ({ page }) => {
		const settingsButton = page.getByTestId('popover-button').locator('button');
		await settingsButton.click();

		// Check that the ID column (hidable: false) has a disabled checkbox
		const idColumnRow = page.locator('.kol-table-settings__column').filter({ hasText: 'ID' });
		const idCheckbox = idColumnRow.getByRole('checkbox');
		await expect(idCheckbox).toBeVisible();
		await expect(idCheckbox).toBeDisabled();
		await expect(idCheckbox).toBeChecked(); // Should be checked since it's visible

		// Check that the label contains "nicht ausblendbar" text
		await expect(idColumnRow).toContainText('nicht ausblendbar');

		// Check that other columns have enabled checkboxes
		const nameColumnRow = page.locator('.kol-table-settings__column').filter({ hasText: 'Name' });
		const nameCheckbox = nameColumnRow.getByRole('checkbox');
		await expect(nameCheckbox).toBeVisible();
		await expect(nameCheckbox).toBeEnabled();

		const ageColumnRow = page.locator('.kol-table-settings__column').filter({ hasText: 'Age' });
		const ageCheckbox = ageColumnRow.getByRole('checkbox');
		await expect(ageCheckbox).toBeVisible();
		await expect(ageCheckbox).toBeEnabled();
	});

	test('it should ensure at least one column is visible including non-hidable columns', async ({ page }) => {
		const settingsButton = page.getByTestId('popover-button').locator('button');
		await settingsButton.click();

		// Hide all hidable columns (Name and Age) - ID checkbox should be disabled
		const nameCheckbox = page.locator('.kol-table-settings__column').filter({ hasText: 'Name' }).getByRole('checkbox');
		const ageCheckbox = page.locator('.kol-table-settings__column').filter({ hasText: 'Age' }).getByRole('checkbox');

		await nameCheckbox.click();
		await ageCheckbox.click();

		// Try to apply settings - should succeed because ID column (non-hidable) is still visible
		const applyButton = page.getByTestId('table-settings-apply');
		await applyButton.click();

		// Should not show error message since ID column is always visible
		const errorMessage = page.locator('kol-table-settings-wc kol-alert-wc');
		await expect(errorMessage).not.toBeVisible();

		// Verify that only ID column is visible in the table
		const tableColumns = page.locator('kol-table-stateless-wc th');
		await expect(tableColumns).toHaveCount(1);
		await expect(tableColumns.first()).toHaveText('ID');
	});

	test('it should not allow clicking disabled checkbox for non-hidable columns', async ({ page }) => {
		const settingsButton = page.getByTestId('popover-button').locator('button');
		await settingsButton.click();

		// Try to click the disabled ID checkbox
		const idCheckbox = page.locator('.kol-table-settings__column').filter({ hasText: 'ID' }).getByRole('checkbox');
		await expect(idCheckbox).toBeDisabled();

		// Checkbox should remain checked after attempted interaction
		await expect(idCheckbox).toBeChecked();
	});
});
