import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import type { E2EPage } from '@stencil/playwright';
import { test } from '@stencil/playwright';

const LINKS = {
	empty: [],
	simple: [{ _label: 'Item', _href: '#' }],
	linkItem: [{ _label: 'LinkItem', _href: '#/link' }],
	activeChild: [{ _label: 'Parent', _children: [{ _label: 'ChildA', _href: '#', _active: true }] }],
	nested: [{ _label: 'Parent', _children: [{ _label: 'Child', _href: '#' }] }],
	mixedActive: [
		{ _label: 'First', _href: '#' },
		{ _label: 'Second', _href: '#', _active: true },
		{
			_label: 'Parent',
			_children: [
				{ _label: 'Child1', _href: '#', _active: true },
				{ _label: 'Child2', _href: '#' },
			],
		},
	],
};

test.describe('kol-nav component', () => {
	test.describe('attributes', () => {
		test('renders aria-label on the navigation landmark', async ({ page }) => {
			await page.setContent(`<kol-nav _label="Main Navigation" _links='${JSON.stringify(LINKS.empty)}'></kol-nav>`);
			const nav = page.locator('kol-nav nav');
			await expect(nav).toHaveAttribute('aria-label', 'Main Navigation');
		});

		test('does not render compact toggle in horizontal orientation even when hasCompactButton is set', async ({ page }) => {
			await page.setContent(`<kol-nav _label="Nav" _links='${JSON.stringify(LINKS.simple)}' _orientation="horizontal" _hasCompactButton></kol-nav>`);
			const toggle = page.locator('.kol-nav__toggle-button');
			await expect(toggle).toBeHidden();
		});
	});

	test.describe('initial expansion based on active links', () => {
		test('automatically expands a branch with an active child', async ({ page }) => {
			await page.setContent(`<kol-nav _label="Nav" _links='${JSON.stringify(LINKS.activeChild)}'></kol-nav>`);
			const nested = page.locator('.kol-nav__list--nested');
			await expect(nested).toBeVisible();
			await expect(nested.locator('li')).toHaveCount(1);
		});
	});

	test.describe('entry rendering', () => {
		test('renders entries as links when _href is provided', async ({ page }) => {
			await page.setContent(`<kol-nav _label="Nav" _links='${JSON.stringify(LINKS.linkItem)}'></kol-nav>`);
			const linkEntries = page.locator('.kol-nav__entry--link');
			await expect(linkEntries).toHaveCount(1);
		});

		test('renders expand icons in nav entry for items with children', async ({ page }) => {
			await page.setContent(`<kol-nav _label="Nav" _links='${JSON.stringify(LINKS.nested)}'></kol-nav>`);
			const expandBtn = page.locator('.kol-nav__entry--collapsible');
			await expect(expandBtn).toHaveCount(1);
		});
	});

	test.describe('active state classes', () => {
		test('applies active class to items based on _active flag', async ({ page }) => {
			await page.setContent(`<kol-nav _label="Nav" _links='${JSON.stringify(LINKS.mixedActive)}'></kol-nav>`);
			const activeItems = page.locator('.kol-nav__list-item--active');
			await expect(activeItems).toHaveCount(2);
			const nested = page.locator('.kol-nav__list--nested');
			await expect(nested).toBeVisible();
		});
	});

	test.describe('programmatic _active updates', () => {
		test('opens parent nodes when active links change at runtime', async ({ page }) => {
			await page.setContent(`<kol-nav _label="Nav" _links='${JSON.stringify(LINKS.simple)}'></kol-nav>`);
			const nav = page.locator('kol-nav');
			const nestedBefore = page.locator('.kol-nav__list--nested');
			await expect(nestedBefore).toBeHidden();

			const updatedLinks = JSON.stringify(LINKS.activeChild);
			await nav.evaluate((el, links) => {
				(el as HTMLKolNavElement)._links = links;
			}, updatedLinks);
			await page.waitForChanges();

			const nestedAfter = page.locator('.kol-nav__list--nested');
			await expect(nestedAfter).toBeVisible();
			await expect(nestedAfter.locator('li')).toHaveCount(1);
		});
	});

	test.describe('disabled entries', () => {
		test('passes _disabled of a button entry through to the rendered button', async ({ page }) => {
			await page.setContent('<kol-nav _label="Nav"></kol-nav>');
			const nav = page.locator('kol-nav');
			await expect(nav).toHaveClass(/hydrated/);

			await nav.evaluate((element: HTMLKolNavElement) => {
				element._links = [
					{ _label: 'Enabled', _on: { onClick: () => undefined } },
					{ _label: 'Disabled', _disabled: true, _on: { onClick: () => undefined } },
				];
			});
			await page.waitForChanges();

			const buttons = nav.locator('kol-button-wc button');
			await expect(buttons).toHaveCount(2);
			await expect(buttons.first()).not.toBeDisabled();
			await expect(buttons.nth(1)).toBeDisabled();
		});
	});
});

test.describe('kol-nav behavior', () => {
	type Log = string[];

	/** Mounts a nav with a parent text entry, a parent button entry with a callback and a plain link. */
	const mount = async (page: Page & E2EPage, props: Record<string, unknown> = {}) => {
		await page.setContent('<div id="root"></div>');
		await page.evaluate((props) => {
			const log: string[] = [];
			(window as unknown as { log: string[] }).log = log;
			const element = document.createElement('kol-nav');
			element._label = 'Nav';
			element._links = [
				{ _label: 'Section', _children: [{ _label: 'Section child', _href: '#section-child' }] },
				{
					_label: 'Action',
					_on: { onClick: (_event: Event, value: unknown) => log.push(`cb:onClick:${JSON.stringify(value)}`) },
					_children: [{ _label: 'Action child', _href: '#action-child' }],
				},
				{ _label: 'Link', _href: '#link' },
			];
			Object.assign(element, props);
			document.getElementById('root')?.append(element);
		}, props);
		await page.waitForChanges();
	};

	const readLog = (page: Page): Promise<Log> =>
		page.evaluate(() => {
			const log = (window as unknown as { log: string[] }).log;
			return log.splice(0, log.length);
		});

	const entry = (page: Page, label: string) => page.locator('kol-nav .kol-nav__list-item').filter({ hasText: label }).first();

	const click = async (page: Page & E2EPage, label: string) => {
		await entry(page, label).locator('button').first().click();
		await page.waitForChanges();
	};

	test('toggles the children of a parent entry by click', async ({ page }) => {
		await mount(page);
		await expect(page.locator('kol-nav .kol-nav__list--nested')).toHaveCount(0);

		await click(page, 'Section');
		await expect(entry(page, 'Section')).toHaveClass(/kol-nav__list-item--expanded/);
		await expect(entry(page, 'Section').locator('.kol-nav__list--nested')).toHaveCount(1);
		await expect(entry(page, 'Section').locator('.kolicon-minus')).toHaveCount(1);

		await click(page, 'Section');
		await expect(entry(page, 'Section')).not.toHaveClass(/kol-nav__list-item--expanded/);
		await expect(entry(page, 'Section').locator('.kol-nav__list--nested')).toHaveCount(0);
		await expect(entry(page, 'Section').locator('.kolicon-plus')).toHaveCount(1);
	});

	test('points aria-controls of an expanded entry to its nested list', async ({ page }) => {
		await mount(page);
		await click(page, 'Section');
		const controls = await entry(page, 'Section').locator('button').first().getAttribute('aria-controls');
		expect(controls).toBeTruthy();
		await expect(page.locator(`kol-nav ul#${controls}`)).toHaveCount(1);
		await expect(entry(page, 'Section').locator('button').first()).toHaveAttribute('aria-expanded', 'true');
	});

	test('calls the callback of a button entry and then toggles its children', async ({ page }) => {
		await mount(page);
		await click(page, 'Action');
		expect(await readLog(page)).toHaveLength(1);
		await expect(entry(page, 'Action')).toHaveClass(/kol-nav__list-item--expanded/);
	});

	test('toggles the children without collapse icons when _collapsible is false', async ({ page }) => {
		await mount(page, { _collapsible: false });
		await expect(page.locator('kol-nav .kolicon-plus')).toHaveCount(0);
		await click(page, 'Section');
		await expect(entry(page, 'Section').locator('.kol-nav__list--nested')).toHaveCount(1);
		await expect(page.locator('kol-nav .kolicon-minus')).toHaveCount(0);
	});

	test('toggles the compact view with the compact button and keeps the _hideLabel prop', async ({ page }) => {
		await mount(page, { _hasCompactButton: true });
		const toggle = page.locator('kol-nav .kol-nav__toggle-button button');
		await expect(page.locator('kol-nav .kol-nav')).not.toHaveClass(/kol-nav--is-compact/);
		await expect(toggle).toHaveAttribute('aria-expanded', 'true');

		await toggle.click();
		await page.waitForChanges();
		await expect(page.locator('kol-nav .kol-nav')).toHaveClass(/kol-nav--is-compact/);
		await expect(toggle).toHaveAttribute('aria-expanded', 'false');
		await expect(entry(page, 'Link').locator('.kolicon-link')).toHaveCount(1);
		expect(await page.locator('kol-nav').evaluate((element: HTMLKolNavElement) => element._hideLabel)).toBe(false);

		await toggle.click();
		await page.waitForChanges();
		await expect(page.locator('kol-nav .kol-nav')).not.toHaveClass(/kol-nav--is-compact/);
	});

	test('resets a manual expansion when _links changes', async ({ page }) => {
		await mount(page);
		await click(page, 'Section');
		await expect(entry(page, 'Section')).toHaveClass(/kol-nav__list-item--expanded/);

		await page.locator('kol-nav').evaluate((element: HTMLKolNavElement) => {
			element._links = [...(element._links as unknown as unknown[])] as unknown as string;
		});
		await page.waitForChanges();
		await expect(entry(page, 'Section')).not.toHaveClass(/kol-nav__list-item--expanded/);
	});

	test('keeps the previous links when _links gets an invalid entry', async ({ page }) => {
		await mount(page);
		await page.locator('kol-nav').evaluate((element: HTMLKolNavElement) => {
			element._links = [{ _icons: 'kolicon-home' }] as unknown as string;
		});
		await page.waitForChanges();
		await expect(page.locator('kol-nav .kol-nav__list > .kol-nav__list-item')).toHaveCount(3);
	});
});
