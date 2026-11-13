import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

const LINKS = JSON.stringify([
	{ _label: 'Zum Hauptinhalt', _href: '#main' },
	{ _label: 'Zur Suche', _href: '#search' },
]);

test.describe('kol-skip-nav', () => {
	test('renders a navigation with the given links as a list', async ({ page }) => {
		await page.setContent(`<kol-skip-nav _label="Sprungnavigation" _links='${LINKS}'></kol-skip-nav>`);

		const nav = page.locator('nav.kol-skip-nav');
		await expect(nav).toHaveAttribute('aria-label', 'Sprungnavigation');
		await expect(nav.getByRole('list')).toBeAttached();
		await expect(nav.getByRole('listitem')).toHaveCount(2);
	});

	test('exposes every link as a focusable anchor with its accessible name', async ({ page }) => {
		await page.setContent(`<kol-skip-nav _label="Sprungnavigation" _links='${LINKS}'></kol-skip-nav>`);

		await expect(page.getByRole('link', { name: 'Zum Hauptinhalt' })).toHaveAttribute('href', '#main');
		await expect(page.getByRole('link', { name: 'Zur Suche' })).toHaveAttribute('href', '#search');
	});

	test('jumps to the target of a clicked skip link', async ({ page }) => {
		await page.setContent(`
			<kol-skip-nav _label="Sprungnavigation" _links='${LINKS}'></kol-skip-nav>
			<main id="main" tabindex="-1">Hauptinhalt</main>
			<section id="search" tabindex="-1">Suche</section>
		`);

		// The skip navigation stays off-screen until it receives the focus via the Tab key;
		// a pointer click can never reach it, exactly like a keyboard user operates it.
		await page.keyboard.press('Tab');
		const firstLink = page.getByRole('link', { name: 'Zum Hauptinhalt' });
		await expect(firstLink).toBeFocused();

		await page.keyboard.press('Tab');
		await expect(page.getByRole('link', { name: 'Zur Suche' })).toBeFocused();
		await page.keyboard.press('Enter');
		await expect(page.locator('#search')).toBeFocused();
	});
});
