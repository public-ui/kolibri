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

function innerButtonOf(nthItem: Locator): Locator {
	return nthItem.locator('button');
}

test.describe(COMPONENT_NAME, () => {
	test('disables all items and re-enables after timeout (icons before disabled)', async ({ page }) => {
		await page.setContent(`<kol-toolbar _label="Toolbar A"></kol-toolbar>`);
		const tb = page.locator('kol-toolbar');

		await expect(tb).toHaveClass(/hydrated/);
		await setItems(tb, ITEMS_ICONS_FIRST);
		await page.waitForChanges();

		const items = tb.locator('.kol-toolbar__item');
		await expect(items).toHaveCount(2);

		await tb.evaluate((el) => {
			const host = el as unknown as { _items: ToolbarItemsPropType };
			host._items = host._items.map((it) => ({ ...it, _disabled: true }));
			setTimeout(() => {
				host._items = host._items.map((it) => ({ ...it, _disabled: false }));
			}, 1200);
		});

		const firstInnerBtn = innerButtonOf(items.first());
		await expect(firstInnerBtn).toBeDisabled();
		await expect(firstInnerBtn).not.toBeDisabled({ timeout: 3000 });
	});

	test('disables all items and re-enables after timeout (disabled before icons)', async ({ page }) => {
		await page.setContent(`<kol-toolbar _label="Toolbar B"></kol-toolbar>`);
		const tb = page.locator('kol-toolbar');

		await expect(tb).toHaveClass(/hydrated/);
		await setItems(tb, ITEMS_DISABLED_FIRST);
		await page.waitForChanges();

		const items = tb.locator('.kol-toolbar__item');
		await expect(items).toHaveCount(2);

		await tb.evaluate((el) => {
			const host = el as unknown as { _items: ToolbarItemsPropType };
			host._items = host._items.map((it) => ({ ...it, _disabled: true }));
			setTimeout(() => {
				host._items = host._items.map((it) => ({ ...it, _disabled: false }));
			}, 1200);
		});

		const firstInnerBtn = innerButtonOf(items.first());
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

		const items = tb.locator('.kol-toolbar__item');
		await expect(items).toHaveCount(2);

		const firstBtn = items.first().locator('button');
		const secondBtn = items.nth(1).locator('button');

		await firstBtn.focus();
		await page.keyboard.press('ArrowRight');

		await expect(firstBtn).toBeFocused();
		await expect(secondBtn).not.toBeFocused();
	});

	test('skips a disabled item with arrow keys instead of stopping at it', async ({ page }) => {
		await page.setContent(`<kol-toolbar _label="Toolbar Skip"></kol-toolbar>`);
		const tb = page.locator('kol-toolbar');
		await expect(tb).toHaveClass(/hydrated/);

		await tb.evaluate((el: HTMLKolToolbarElement) => {
			el._items = [
				{ type: 'button', _label: 'One', _disabled: false },
				{ type: 'button', _label: 'Two', _disabled: true },
				{ type: 'button', _label: 'Three', _disabled: false },
			];
		});
		await page.waitForChanges();

		const items = tb.locator('.kol-toolbar__item');
		await expect(items).toHaveCount(3);

		const firstBtn = items.first().locator('button');
		const thirdBtn = items.nth(2).locator('button');

		await firstBtn.focus();
		await page.keyboard.press('ArrowRight');

		/* Stopping at the disabled neighbour would leave the third item unreachable by keyboard. */
		await expect(thirdBtn).toBeFocused();
	});

	test('skips a disabled item backwards as well', async ({ page }) => {
		await page.setContent(`<kol-toolbar _label="Toolbar Skip Back"></kol-toolbar>`);
		const tb = page.locator('kol-toolbar');
		await expect(tb).toHaveClass(/hydrated/);

		await tb.evaluate((el: HTMLKolToolbarElement) => {
			el._items = [
				{ type: 'button', _label: 'One', _disabled: false },
				{ type: 'button', _label: 'Two', _disabled: true },
				{ type: 'button', _label: 'Three', _disabled: false },
			];
		});
		await page.waitForChanges();

		const items = tb.locator('.kol-toolbar__item');
		const firstBtn = items.first().locator('button');
		const thirdBtn = items.nth(2).locator('button');

		await firstBtn.focus();
		await page.keyboard.press('ArrowLeft');
		await expect(thirdBtn).toBeFocused();

		await page.keyboard.press('ArrowLeft');
		await expect(firstBtn).toBeFocused();
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

		const items = tb.locator('.kol-toolbar__item');
		await expect(items).toHaveCount(3);

		const firstInnerBtn = innerButtonOf(items.first());
		const secondInnerBtn = innerButtonOf(items.nth(1));

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
	test("calls the item's onClick callback with its value", async ({ page }) => {
		await page.setContent(`<kol-toolbar _label="Toolbar Click"></kol-toolbar>`);
		const tb = page.locator('kol-toolbar');
		await expect(tb).toHaveClass(/hydrated/);

		await tb.evaluate((el: HTMLKolToolbarElement) => {
			el._items = [
				{
					type: 'button',
					_label: 'One',
					_value: 'one',
					_on: {
						onClick: (_event: Event, value: unknown) => {
							(window as unknown as { clickedValue: unknown }).clickedValue = value;
						},
					},
				},
			];
		});
		await page.waitForChanges();

		await innerButtonOf(tb.locator('.kol-toolbar__item').first()).click();
		expect(await page.evaluate(() => (window as unknown as { clickedValue: unknown }).clickedValue)).toBe('one');
	});

	test('moves the roving focus onto a link item', async ({ page }) => {
		await page.setContent(`<kol-toolbar _label="Toolbar Link"></kol-toolbar>`);
		const tb = page.locator('kol-toolbar');
		await expect(tb).toHaveClass(/hydrated/);

		await setItems(tb, [
			{ type: 'button', _label: 'One' },
			{ type: 'link', _label: 'Two', _href: '#two' },
		]);
		await page.waitForChanges();

		const firstBtn = innerButtonOf(tb.locator('.kol-toolbar__item').first());
		const anchor = tb.locator('.kol-toolbar__item').nth(1).locator('a');
		await expect(anchor).toHaveAttribute('tabindex', '-1');

		await firstBtn.focus();
		await page.keyboard.press('ArrowRight');

		await expect(anchor).toBeFocused();
		await expect(anchor).toHaveAttribute('tabindex', '0');
		await expect(firstBtn).toHaveAttribute('tabindex', '-1');
	});
});
