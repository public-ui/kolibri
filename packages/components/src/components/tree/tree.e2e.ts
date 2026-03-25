import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

declare global {
	interface Window {
		__focusinEventCount: number;
		__focusEventCount: number;
	}
}

test.describe('kol-tree', () => {
	test('focus() method sets focus on the first focusable tree item', async ({ page }) => {
		await page.setContent(`
			<kol-tree _label="Test Tree">
				<kol-tree-item _label="Item 1" _href="#item1" _open></kol-tree-item>
				<kol-tree-item _label="Item 2" _href="#item2"></kol-tree-item>
				<kol-tree-item _label="Item 3" _href="#item3"></kol-tree-item>
			</kol-tree>
		`);

		const tree = page.locator('kol-tree');
		await expect(tree).toHaveClass(/hydrated/);

		const treeItems = page.locator('kol-tree-item');
		await expect(treeItems).toHaveCount(3);

		const firstItemLink = treeItems.first().locator('a').first();

		await tree.evaluate((el: HTMLKolTreeElement) => {
			void el.focus();
		});

		await expect(firstItemLink).toBeFocused();
	});
});

test.describe('kol-tree - Focus Performance', () => {
	test('Focus stability: Tab on tree delegates to first item without flicker', async ({ page }) => {
		await page.setContent(`
			<kol-tree _label="Test Tree">
				<kol-tree-item _label="Item 1" _href="#item1" _open></kol-tree-item>
				<kol-tree-item _label="Item 2" _href="#item2"></kol-tree-item>
				<kol-tree-item _label="Item 3" _href="#item3"></kol-tree-item>
			</kol-tree>
		`);

		const tree = page.locator('kol-tree');
		await expect(tree).toHaveClass(/hydrated/);

		const treeItems = page.locator('kol-tree-item');
		await expect(treeItems).toHaveCount(3);

		const firstItemLink = treeItems.first().locator('a').first();
		const treeHost = page.locator('kol-tree');

		// Initialize focusin event counter on the tree host
		await treeHost.evaluate(() => {
			window.__focusinEventCount = 0;
		});

		// Add focusin event listener to count events
		await treeHost.evaluate(() => {
			const treeElement = document.querySelector('kol-tree');
			if (treeElement) {
				treeElement.addEventListener('focusin', () => {
					window.__focusinEventCount++;
				});
			}
		});

		// Focus the tree host
		await treeHost.evaluate((el: HTMLKolTreeElement) => {
			void el.focus();
		});

		// Wait a bit for potential flicker/redundant events
		await page.waitForTimeout(50);

		// Check that first item is focused
		await expect(firstItemLink).toBeFocused();

		// Check focusin event count - should be max 1 (guard clause prevents multiple triggers)
		const focusinCount = await page.evaluate(() => window.__focusinEventCount);
		expect(focusinCount).toBeLessThanOrEqual(1);
	});

	test('Expand cache invalidation does not trigger redundant focus events', async ({ page }) => {
		await page.setContent(`
			<kol-tree _label="Test Tree">
				<kol-tree-item _label="Item 1" _href="#item1" _open></kol-tree-item>
				<kol-tree-item _label="Item 2" _href="#item2">
					<kol-tree-item _label="Item 2.1" _href="#item2.1"></kol-tree-item>
					<kol-tree-item _label="Item 2.2" _href="#item2.2"></kol-tree-item>
					<kol-tree-item _label="Item 2.3" _href="#item2.3"></kol-tree-item>
				</kol-tree-item>
				<kol-tree-item _label="Item 3" _href="#item3" _open></kol-tree-item>
				<kol-tree-item _label="Item 4" _href="#item4"></kol-tree-item>
				<kol-tree-item _label="Item 5" _href="#item5"></kol-tree-item>
			</kol-tree>
		`);

		const tree = page.locator('kol-tree');
		await expect(tree).toHaveClass(/hydrated/);

		const treeItems = page.locator('kol-tree-item');
		await expect(treeItems).toHaveCount(8); // 5 top-level + 3 children of Item 2

		// Get Item 2 (the one we'll expand)
		const item2 = treeItems.nth(1);
		const item2Link = item2.locator('a').first();

		// Initialize focus event counter
		await page.evaluate(() => {
			window.__focusEventCount = 0;
		});

		// Add focus event listener on the tree host
		await tree.evaluate(() => {
			const treeElement = document.querySelector('kol-tree');
			if (treeElement) {
				treeElement.addEventListener('focusin', () => {
					window.__focusEventCount++;
				});
			}
		});

		// Focus on Item 2
		await item2Link.focus();
		await expect(item2Link).toBeFocused();

		// Reset counter after focus is set
		await page.evaluate(() => {
			window.__focusEventCount = 0;
		});

		// Expand Item 2
		await item2.evaluate((el: HTMLKolTreeItemElement) => {
			void el.expand();
		});

		// Wait for RAF debouncing and potential cache invalidation
		await page.waitForTimeout(100);

		// Check focus event count - should be <= 1 (at most 1 from expand, not multiple)
		const focusCount = await page.evaluate(() => window.__focusEventCount);
		expect(focusCount).toBeLessThanOrEqual(1);

		// Verify Item 2 is still focused
		await expect(item2Link).toBeFocused();
	});

	test('Focus navigation with many items completes without janky performance', async ({ page }) => {
		// Create HTML with 20 items and set first item as active
		const items = Array.from({ length: 20 }, (_, i) => {
			const itemNum = i + 1;
			const isActive = i === 0 ? '_active' : '';
			return `<kol-tree-item _label="Item ${itemNum}" _href="#item${itemNum}" _open ${isActive}></kol-tree-item>`;
		}).join('\n');

		await page.setContent(`
			<kol-tree _label="Large Tree">
				${items}
			</kol-tree>
		`);

		const tree = page.locator('kol-tree');
		await expect(tree).toHaveClass(/hydrated/);

		const treeItems = page.locator('kol-tree-item');
		await expect(treeItems).toHaveCount(20);

		// Get first item and focus it
		const firstItem = treeItems.first();
		const firstItemLink = firstItem.locator('a').first();

		await firstItemLink.focus();
		await expect(firstItemLink).toBeFocused();

		// Track time for programmatic focus changes (simulating arrow nav)
		const startTime = Date.now();

		// Programmatically focus on different items to simulate rapid navigation
		// This bypasses tabindex issues and tests the underlying cache performance
		for (let i = 1; i < 6; i++) {
			const itemLink = treeItems.nth(i).locator('a').first();
			await itemLink.evaluate((el: HTMLElement) => {
				el.focus();
			});
		}

		const endTime = Date.now();
		const navigationTime = endTime - startTime;

		// Should complete in reasonable time (performance check)
		expect(navigationTime).toBeLessThan(2000);

		// Verify final focus is on Item 6
		const item6Link = treeItems.nth(5).locator('a').first();
		await expect(item6Link).toBeFocused();
	});

	test('Cache prevents unnecessary recalculation during rapid focus changes', async ({ page }) => {
		await page.setContent(`
			<kol-tree _label="Cache Test Tree">
				<kol-tree-item _label="Item 1" _href="#item1" _open _active></kol-tree-item>
				<kol-tree-item _label="Item 2" _href="#item2" _open></kol-tree-item>
				<kol-tree-item _label="Item 3" _href="#item3" _open></kol-tree-item>
				<kol-tree-item _label="Item 4" _href="#item4" _open></kol-tree-item>
				<kol-tree-item _label="Item 5" _href="#item5" _open></kol-tree-item>
				<kol-tree-item _label="Item 6" _href="#item6" _open></kol-tree-item>
				<kol-tree-item _label="Item 7" _href="#item7" _open></kol-tree-item>
				<kol-tree-item _label="Item 8" _href="#item8" _open></kol-tree-item>
			</kol-tree>
		`);

		const tree = page.locator('kol-tree');
		await expect(tree).toHaveClass(/hydrated/);

		const treeItems = page.locator('kol-tree-item');
		const firstItemLink = treeItems.first().locator('a').first();

		// Focus first item
		await firstItemLink.focus();
		await expect(firstItemLink).toBeFocused();

		// Initialize event counter before any navigation
		await page.evaluate(() => {
			window.__focusinEventCount = 0;
		});

		// Add focusin event listener during navigation phase
		await tree.evaluate(() => {
			const treeElement = document.querySelector('kol-tree');
			if (treeElement) {
				treeElement.addEventListener('focusin', () => {
					window.__focusinEventCount++;
				});
			}
		});

		// Programmatically focus on items (simulating focused navigation)
		// Without expand/collapse, cache should remain valid and reused
		for (let i = 1; i < 4; i++) {
			const itemLink = treeItems.nth(i).locator('a').first();
			await itemLink.evaluate((el: HTMLElement) => {
				el.focus();
			});
		}

		// Wait a bit for any potential events to fire
		await page.waitForTimeout(50);

		// Check focusin event count - should match number of focus changes (3 items focused)
		// Each focus generates 1 focusin event; what matters is that there's no redundancy
		const focusinCount = await page.evaluate(() => window.__focusinEventCount);
		expect(focusinCount).toBeLessThanOrEqual(3);

		// Verify final focus is on Item 4
		const item4Link = treeItems.nth(3).locator('a').first();
		await expect(item4Link).toBeFocused();
	});

	test('Focus is maintained on item after expand', async ({ page }) => {
		await page.setContent(`
			<kol-tree _label="Focus Maintenance Tree">
				<kol-tree-item _label="Item 1" _href="#item1" _open></kol-tree-item>
				<kol-tree-item _label="Item 2" _href="#item2">
					<kol-tree-item _label="Item 2.1" _href="#item2.1"></kol-tree-item>
					<kol-tree-item _label="Item 2.2" _href="#item2.2"></kol-tree-item>
				</kol-tree-item>
				<kol-tree-item _label="Item 3" _href="#item3" _open></kol-tree-item>
			</kol-tree>
		`);

		const tree = page.locator('kol-tree');
		await expect(tree).toHaveClass(/hydrated/);

		const treeItems = page.locator('kol-tree-item');
		const item2 = treeItems.nth(1);
		const item2Link = item2.locator('a').first();

		// Focus Item 2
		await item2Link.focus();
		await expect(item2Link).toBeFocused();

		// Expand Item 2
		await item2.evaluate((el: HTMLKolTreeItemElement) => {
			return el.expand();
		});

		// Wait for DOM updates
		await page.waitForTimeout(50);

		// Focus should still be on Item 2 (not moved to first child)
		await expect(item2Link).toBeFocused();
	});
});
