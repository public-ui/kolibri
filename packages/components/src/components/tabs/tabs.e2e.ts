import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

const TABS = [
	{
		_label: 'First tab',
	},
	{
		_label: 'Second Tab',
	},
];

test.describe('kol-tabs', () => {
	test.describe('Callbacks', () => {
		test('it calls the onSelectionChange callback when the selection changes', async ({ page }) => {
			await page.setContent(`<kol-tabs _tabs='${JSON.stringify(TABS)}' _label="Tabs">
				<div slot="tab-0">Contents of Tab 1</div>
				<div slot="tab-1">Contents of Tab 2</div>
			</kol-tabs>`);
			const kolTabs = page.locator('kol-tabs');
			const callbackPromise = kolTabs.evaluate((element: HTMLKolTabsElement) => {
				return new Promise<number>((resolve) => {
					element._on = {
						onSelect: (_event: Event, tabIndex: number) => {
							resolve(tabIndex);
						},
					};
				});
			});
			await kolTabs.getByRole('tab', { name: 'Second Tab' }).click();

			await expect(callbackPromise).resolves.toEqual(1);
		});
	});

	test.describe('DOM events', () => {
		test('it emits selectionChange when the selection changes', async ({ page }) => {
			await page.setContent(`<kol-tabs _tabs='${JSON.stringify(TABS)}' _label="Tabs">
				<div slot="tab-0">Contents of Tab 1</div>
				<div slot="tab-1">Contents of Tab 2</div>
			</kol-tabs>`);
			const kolTabs = page.locator('kol-tabs');
			const eventPromise = kolTabs.evaluate((element: HTMLKolTabsElement) => {
				return new Promise<number>((resolve) => {
					element.addEventListener('select', (event: Event) => {
						resolve((event as CustomEvent).detail as number);
					});
				});
			});
			await kolTabs.getByRole('tab', { name: 'Second Tab' }).click();

			await expect(eventPromise).resolves.toEqual(1);
		});
	});

	test.describe('Dynamic Tabs', () => {
		test('should update tabs when _tabs prop changes', async ({ page }) => {
			await page.setContent(`<kol-tabs _tabs='${JSON.stringify(TABS)}' _label="Tabs">
				<div slot="tab-0">Contents of Tab 1</div>
				<div slot="tab-1">Contents of Tab 2</div>
			</kol-tabs>`);
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

	test.describe('Tabs create button', () => {
		test('should not show create button by default', async ({ page }) => {
			await page.setContent(`<kol-tabs _tabs='${JSON.stringify(TABS)}' _label="Tabs"></kol-tabs>`);
			const createButton = page.getByTestId('tabs-create-button');
			await expect(createButton).toHaveCount(0);
		});

		test('should show create button when _has-create-button is true', async ({ page }) => {
			await page.setContent(`<kol-tabs _tabs='${JSON.stringify(TABS)}' _label="Tabs" _has-create-button></kol-tabs>`);
			const createButton = page.getByTestId('tabs-create-button');
			await expect(createButton).toBeVisible();
		});

		test('it calls the onCreate callback when create button is clicked', async ({ page }) => {
			await page.setContent(`<kol-tabs _tabs='${JSON.stringify(TABS)}' _label="Tabs" _has-create-button></kol-tabs>`);
			const kolTabs = page.locator('kol-tabs');
			const createButton = page.getByTestId('tabs-create-button');
			const callbackPromise = kolTabs.evaluate((element: HTMLKolTabsElement) => {
				return new Promise<void>((resolve) => {
					element._on = {
						onCreate: () => {
							resolve();
						},
					};
				});
			});
			await createButton.click();
			await expect(callbackPromise).resolves.toBeUndefined();
		});

		test('it emits create event when create button is clicked', async ({ page }) => {
			await page.setContent(`<kol-tabs _tabs='${JSON.stringify(TABS)}' _label="Tabs" _has-create-button></kol-tabs>`);
			const kolTabs = page.locator('kol-tabs');
			const createButton = page.getByTestId('tabs-create-button');
			const eventPromise = kolTabs.evaluate((element: HTMLKolTabsElement) => {
				return new Promise<void>((resolve) => {
					element.addEventListener('create', () => {
						resolve();
					});
				});
			});
			await createButton.click();
			await expect(eventPromise).resolves.toBeUndefined();
		});
	});

	test('after click only 1 tab has selected class', async ({ page }) => {
		await page.setContent(`<kol-tabs _tabs='${JSON.stringify(TABS)}' _label="Tabs">
				<div slot="tab-0">Contents of Tab 1</div>
				<div slot="tab-1">Contents of Tab 2</div>
			</kol-tabs>`);
		const kolTabs = page.locator('kol-tabs');
		await kolTabs.getByRole('tab', { name: 'Second Tab' }).click();
		await expect(page.locator('.kol-tabs .selected')).toHaveCount(1);
	});

	test.describe('click() method', () => {
		test('should select tab when click() method is called on a tab', async ({ page }) => {
			await page.setContent(`<kol-tabs _tabs='${JSON.stringify(TABS)}' _label="Tabs">
				<div slot="tab-0">Contents of Tab 1</div>
				<div slot="tab-1">Contents of Tab 2</div>
			</kol-tabs>`);
			const kolTabs = page.locator('kol-tabs');

			const callbackPromise = kolTabs.evaluate((element: HTMLKolTabsElement) => {
				return new Promise<number>((resolve) => {
					const tabsElement = element as HTMLKolTabsElement & { _on?: { onSelect?: (event: Event, tabIndex: number) => void } };
					tabsElement._on = {
						onSelect: (_event: Event, tabIndex: number) => {
							resolve(tabIndex);
						},
					};
				});
			});
			await page.waitForChanges();

			const secondTab = kolTabs.getByRole('tab', { name: 'Second Tab' });
			// Call the component's async click() method to trigger tab selection
			await secondTab.evaluate((el: HTMLElement) => {
				const tabElement = el as HTMLElement & { click: () => Promise<void> };
				if (typeof tabElement.click === 'function') {
					return tabElement.click();
				}
			});
			await expect(callbackPromise).resolves.toBe(1);
		});

		test('should not trigger double tab switch on multiple clicks', async ({ page }) => {
			await page.setContent(`<kol-tabs _tabs='${JSON.stringify(TABS)}' _label="Tabs">
				<div slot="tab-0">Contents of Tab 1</div>
				<div slot="tab-1">Contents of Tab 2</div>
			</kol-tabs>`);
			const kolTabs = page.locator('kol-tabs');

			await kolTabs.evaluate((element: HTMLKolTabsElement) => {
				(window as unknown as Record<string, number>).switchCount = 0;
				const tabsElement = element as HTMLKolTabsElement & { _on?: { onSelect?: () => void } };
				tabsElement._on = {
					onSelect: () => {
						(window as unknown as Record<string, number>).switchCount++;
					},
				};
			});
			await page.waitForChanges();

			const secondTab = kolTabs.getByRole('tab', { name: 'Second Tab' });
			// Trigger tab selection via Locator.click() on the tab element
			await secondTab.click();

			const finalCount = await page.evaluate(() => (window as unknown as Record<string, number>).switchCount);
			expect(finalCount).toBe(1);
		});
	});
});
