import { test, expect } from '@playwright/test';
import { ROUTES } from './sample-app.routes.js';

// https://playwright.dev/docs/emulation
test.use({
	colorScheme: 'light',
	locale: 'de-DE',
	isMobile: false,
	timezoneId: 'Europe/Berlin',
	viewport: {
		width: 800,
		height: 0,
	},
});

const DEFAULT_SNAPSHOT_OPTIONS = {
	animations: 'disabled',
	fullPage: true,
	maxDiffPixelRatio: 0,
	scale: 'css', // 'css' or 'device'
};

ROUTES.forEach((options, route) => {
	// Skip unnecessary snapshot tests
	if (options?.snapshot?.skip === true && options?.snapshot?.zoom?.skip === true) {
		return;
	}
	test(`snapshot for ${route}`, async ({ page }) => {
		const hideMenusParam = `${route.includes('?') ? '&' : '?'}hideMenus`;
		await page.goto(`/#${route}${hideMenusParam}`);
		await page.waitForLoadState('networkidle');
		await page.addStyleTag({
			content: `
				* {
					transition: none !important;
					animation: none !important;
				}
			`,
		});
		if (options?.snapshot?.viewportSize) {
			await page.setViewportSize(options?.snapshot?.viewportSize);
		}
		if (options?.snapshot?.waitForTimeout) {
			await page.waitForTimeout(options?.snapshot?.waitForTimeout);
		}

		/**
		 * We would like to use a readable name for the snapshot file.
		 */
		const snapshotName = `snapshot-for-${route.replace(/(\/|\?|&|=)/g, '-')}`;

		const SNAPSHOT_OPTIONS = {
			...DEFAULT_SNAPSHOT_OPTIONS,
			...options?.snapshot?.options,
		};

		// Skip unnecessary normal tests
		if (options?.snapshot?.skip !== true) {
			await expect(page).toHaveScreenshot(`${snapshotName}.png`, SNAPSHOT_OPTIONS);
		}

		// Skip unnecessary zoom tests
		if (options?.snapshot?.zoom?.skip !== true) {
			await page.evaluate(() => {
				// eslint-disable-next-line no-undef
				document.body.style.zoom = '400%';
				// document.body.style.transform = 'scale(4)';
				// document.body.style.transformOrigin = 'top left';
				// document.body.style.width = '25vw';
			});
			await expect(page).toHaveScreenshot(`${snapshotName}-zoom.png`, {
				...SNAPSHOT_OPTIONS,
				...options?.snapshot?.zoom?.options,
			});
		}
	});
});
