import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('Dynamic Tabs', () => {
	test('should update tabs when _tabs prop changes', async ({ page }) => {
		const initialTabs = [{ _label: 'First tab' }, { _label: 'Second Tab' }];
		await page.setContent(`<kol-tabs _tabs='${JSON.stringify(initialTabs)}' _label="Tabs"> <div>Content 1</div> <div>Content 2</div> </kol-tabs>`);
		const kolTabs = page.locator('kol-tabs');
		await expect(kolTabs.getByRole('tab', { name: 'First tab' })).toBeVisible();
		await expect(kolTabs.getByRole('tab', { name: 'Second Tab' })).toBeVisible();
		await kolTabs.evaluate((el: HTMLKolTabsElement) => {
			el._tabs = JSON.stringify([{ _label: 'Updated Tab A' }, { _label: 'Updated Tab B' }, { _label: 'Updated Tab C' }]);
		});
		await expect(kolTabs.getByRole('tab', { name: 'Updated Tab A' })).toBeVisible();
		await expect(kolTabs.getByRole('tab', { name: 'Updated Tab B' })).toBeVisible();
		await expect(kolTabs.getByRole('tab', { name: 'Updated Tab C' })).toBeVisible();
		await expect(kolTabs.getByRole('tab', { name: 'First tab' })).toHaveCount(0);
	});
});
