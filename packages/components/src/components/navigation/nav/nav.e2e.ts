import { expect } from '@playwright/test';
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

		test('renders expand button for items with children', async ({ page }) => {
			await page.setContent(`<kol-nav _label="Nav" _links='${JSON.stringify(LINKS.nested)}'></kol-nav>`);
			const expandBtn = page.locator('.kol-nav__expand-button');
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
});
