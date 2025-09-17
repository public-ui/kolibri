import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

const COMPONENT_NAME = 'kol-toolbar';

const ITEMS_ICONS_FIRST = [
	{ _label: 'Back', _icons: { left: { icon: 'codicon codicon-arrow-left' } }, _disabled: false },
	{ _label: 'Next', _disabled: false, _icons: { right: { icon: 'codicon codicon-arrow-right' } } },
];

const ITEMS_DISABLED_FIRST = [
	{ _label: 'Back', _disabled: false, _icons: { left: { icon: 'codicon codicon-arrow-left' } } },
	{ _label: 'Next', _disabled: false, _icons: { right: { icon: 'codicon codicon-arrow-right' } } },
];

async function setItems(tb: any, items: any[]) {
	await tb.evaluate((el: any, its) => (el._items = its), items);
}

function innerButtonOf(nthButtonWc: any) {
	return nthButtonWc.locator('button');
}

test.describe(COMPONENT_NAME, () => {
	test('disables all items and re-enables after timeout (icons before disabled)', async ({ page }) => {
		await page.setContent(`<kol-toolbar _label="Toolbar A"></kol-toolbar>`);
		const tb = page.locator('kol-toolbar');

		await expect(tb).toHaveClass(/hydrated/);
		await setItems(tb, ITEMS_ICONS_FIRST);
		await page.waitForChanges();

		const btnWcs = tb.locator('kol-button-wc');
		await expect(btnWcs).toHaveCount(2);

		await tb.evaluate((el: any) => {
			el._items = el._items.map((it: any) => ({ ...it, _disabled: true }));
			setTimeout(() => {
				el._items = el._items.map((it: any) => ({ ...it, _disabled: false }));
			}, 1200);
		});

		const firstInnerBtn = innerButtonOf(btnWcs.first());
		await expect(firstInnerBtn).toBeDisabled();
		await expect(firstInnerBtn).not.toBeDisabled({ timeout: 3000 });
	});

	test('disables all items and re-enables after timeout (disabled before icons)', async ({ page }) => {
		await page.setContent(`<kol-toolbar _label="Toolbar B"></kol-toolbar>`);
		const tb = page.locator('kol-toolbar');

		await expect(tb).toHaveClass(/hydrated/);
		await setItems(tb, ITEMS_DISABLED_FIRST);
		await page.waitForChanges();

		const btnWcs = tb.locator('kol-button-wc');
		await expect(btnWcs).toHaveCount(2);

		await tb.evaluate((el: any) => {
			el._items = el._items.map((it: any) => ({ ...it, _disabled: true }));
			setTimeout(() => {
				el._items = el._items.map((it: any) => ({ ...it, _disabled: false }));
			}, 1200);
		});

		const firstInnerBtn = innerButtonOf(btnWcs.first());
		await expect(firstInnerBtn).toBeDisabled();
		await expect(firstInnerBtn).not.toBeDisabled({ timeout: 3000 });
	});

	test('does not move focus to a disabled item with arrow keys', async ({ page }) => {
		await page.setContent(`<kol-toolbar _label="Toolbar Focus"></kol-toolbar>`);
		const tb = page.locator('kol-toolbar');
		await expect(tb).toHaveClass(/hydrated/);

		await tb.evaluate((el: any) => {
			el._items = [
				{ _label: 'One', _disabled: false },
				{ _label: 'Two', _disabled: true },
			];
		});
		await page.waitForChanges();

		const btnWcs = tb.locator('kol-button-wc');
		await expect(btnWcs).toHaveCount(2);

		const firstBtn = btnWcs.first().locator('button');
		const secondBtn = btnWcs.nth(1).locator('button');

		await firstBtn.focus();
		await page.keyboard.press('ArrowRight');

		await expect(firstBtn).toBeFocused();
		await expect(secondBtn).not.toBeFocused();
	});
});
