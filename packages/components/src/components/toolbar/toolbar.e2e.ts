import { expect, type Locator } from '@playwright/test';
import { test } from '@stencil/playwright';
import type { ToolbarItemsPropType } from '../../schema';

const COMPONENT_NAME = 'kol-toolbar';

const ITEMS_ICONS_FIRST: ToolbarItemsPropType = [
	{ type: 'button', _label: 'Back', _icons: { left: { icon: 'codicon codicon-arrow-left' } }, _disabled: false },
	{ type: 'button', _label: 'Next', _disabled: false, _icons: { right: { icon: 'codicon codicon-arrow-right' } } },
];

const ITEMS_DISABLED_FIRST: ToolbarItemsPropType = [
	{ type: 'button', _label: 'Back', _disabled: false, _icons: { left: { icon: 'codicon codicon-arrow-left' } } },
	{ type: 'button', _label: 'Next', _disabled: false, _icons: { right: { icon: 'codicon codicon-arrow-right' } } },
];

async function setItems(tb: Locator, items: ToolbarItemsPropType): Promise<void> {
	await tb.evaluate((el, its) => {
		(el as unknown as { _items: ToolbarItemsPropType })._items = its;
	}, items);
}

function innerButtonOf(nthButtonWc: Locator): Locator {
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

		await tb.evaluate((el) => {
			const host = el as unknown as { _items: ToolbarItemsPropType };
			host._items = host._items.map((it) => ({ ...it, _disabled: true }));
			setTimeout(() => {
				host._items = host._items.map((it) => ({ ...it, _disabled: false }));
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

		await tb.evaluate((el) => {
			const host = el as unknown as { _items: ToolbarItemsPropType };
			host._items = host._items.map((it) => ({ ...it, _disabled: true }));
			setTimeout(() => {
				host._items = host._items.map((it) => ({ ...it, _disabled: false }));
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

		await tb.evaluate((el: HTMLKolToolbarElement) => {
			el._items = [
				{ type: 'button', _label: 'One', _disabled: false },
				{ type: 'button', _label: 'Two', _disabled: true },
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

	test('focus() method sets focus on the currently active toolbar item', async ({ page }) => {
		await page.setContent(`<kol-toolbar _label="Toolbar Focus Method"></kol-toolbar>`);
		const tb = page.locator('kol-toolbar');
		await expect(tb).toHaveClass(/hydrated/);

		await tb.evaluate((el: HTMLKolToolbarElement) => {
			el._items = [
				{ type: 'button', _label: 'First', _disabled: false },
				{ type: 'button', _label: 'Second', _disabled: false },
				{ type: 'button', _label: 'Third', _disabled: false },
			];
		});
		await page.waitForChanges();

		const btnWcs = tb.locator('kol-button-wc');
		await expect(btnWcs).toHaveCount(3);

		const firstInnerBtn = innerButtonOf(btnWcs.first());
		const secondInnerBtn = innerButtonOf(btnWcs.nth(1));

		await tb.evaluate((el: HTMLKolToolbarElement) => {
			void el.focus();
		});

		await expect(firstInnerBtn).toBeFocused();

		await page.keyboard.press('ArrowRight');
		await tb.evaluate((el: HTMLKolToolbarElement) => {
			void el.focus();
		});

		await expect(secondInnerBtn).toBeFocused();
	});
});
