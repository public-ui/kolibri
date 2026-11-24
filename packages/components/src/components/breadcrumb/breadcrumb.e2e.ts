import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

const LINKS = JSON.stringify([
	{ _label: 'Home', _href: '#home' },
	{ _label: 'Products', _href: '#products' },
	{ _label: 'Detail', _href: '#detail' },
]);

const breadcrumb = (links = LINKS) => `<kol-breadcrumb _label="Path" _links='${links}'></kol-breadcrumb>`;

test.describe('kol-breadcrumb', () => {
	test.describe('Landmark', () => {
		test('should render a navigation named after the label', async ({ page }) => {
			await page.setContent(breadcrumb());

			await expect(page.getByRole('navigation', { name: 'Path' })).toBeVisible();
		});

		test('should list one entry per link', async ({ page }) => {
			await page.setContent(breadcrumb());

			await expect(page.getByRole('listitem')).toHaveCount(3);
		});

		test('should show a placeholder entry without links', async ({ page }) => {
			await page.setContent(breadcrumb('[]'));

			await expect(page.getByRole('listitem')).toHaveCount(1);
			await expect(page.getByRole('link')).toHaveCount(0);
		});
	});

	test.describe('Links', () => {
		test('should render every entry except the last one as a link', async ({ page }) => {
			await page.setContent(breadcrumb());
			const links = page.getByRole('link');

			await expect(links).toHaveCount(2);
			await expect(links.nth(0)).toHaveAttribute('href', '#home');
			await expect(links.nth(1)).toHaveAttribute('href', '#products');
		});

		test('should mark the last entry as the current page', async ({ page }) => {
			await page.setContent(breadcrumb());
			const current = page.locator('[aria-current="page"]');

			await expect(current).toHaveCount(1);
			await expect(current).toHaveText('Detail');
			await expect(page.getByRole('link', { name: 'Detail' })).toHaveCount(0);
		});

		test('should reach the links in order with the tab key', async ({ page }) => {
			await page.setContent(breadcrumb());

			await page.keyboard.press('Tab');
			await expect(page.getByRole('link', { name: 'Home' })).toBeFocused();
			await page.keyboard.press('Tab');
			await expect(page.getByRole('link', { name: 'Products' })).toBeFocused();
		});

		test('should follow changed links', async ({ page }) => {
			await page.setContent(breadcrumb());
			const kolBreadcrumb = page.locator('kol-breadcrumb');

			await kolBreadcrumb.evaluate((element: HTMLKolBreadcrumbElement) => {
				element._links = [
					{ _label: 'Start', _href: '#start' },
					{ _label: 'Page', _href: '#page' },
				];
			});
			await page.waitForChanges();

			await expect(page.getByRole('listitem')).toHaveCount(2);
			await expect(page.getByRole('link')).toHaveCount(1);
			await expect(page.getByRole('link', { name: 'Start' })).toHaveAttribute('href', '#start');
			await expect(page.locator('[aria-current="page"]')).toHaveText('Page');
		});
	});
});
