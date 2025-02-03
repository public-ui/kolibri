import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { KolEvent } from '../../utils/events';

const TABS = [
	{
		_label: 'First tab',
	},
	{
		_label: 'Second Tab',
	},
];

test.describe('kol-tabs', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent(`<kol-tabs _tabs='${JSON.stringify(TABS)}' _label="Tabs">
			<div slot="tab-0">Contents of Tab 1</div>
			<div slot="tab-1">Contents of Tab 2</div>
		</kol-tabs>`);
	});

	test.describe('Callbacks', () => {
		test('it calls the onSelectionChange callback when the selection changes', async ({ page }) => {
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
			const kolTabs = page.locator('kol-tabs');
			const eventPromise = kolTabs.evaluate((element: HTMLKolTabsElement, KolEvent) => {
				return new Promise<number>((resolve) => {
					element.addEventListener(KolEvent.select, (event: Event) => {
						resolve((event as CustomEvent).detail as number);
					});
				});
			}, KolEvent);
			await kolTabs.getByRole('tab', { name: 'Second Tab' }).click();

			await expect(eventPromise).resolves.toEqual(1);
		});
	});
});
