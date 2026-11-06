import { expect, test } from '@playwright/test';
import { ROUTES } from './sample-app.routes.js';

// https://playwright.dev/docs/emulation
test.use({
	colorScheme: 'light',
	locale: 'de-DE',
	isMobile: false,
	timezoneId: 'Europe/Berlin',
	/* The height must be a real value: with `height: 0`, Firefox gives full-width blocks no size and
	   the document collapses to its narrowest intrinsic width. A real height lets the layout render
	   normally, while the screenshots clip to the page content so the viewport height does not leak
	   into the captured image. */
	viewport: {
		width: 800,
		height: 400,
	},
});

const DEFAULT_SNAPSHOT_OPTIONS = {
	animations: 'disabled',
	fullPage: true,
	maxDiffPixelRatio: 0,
	scale: 'css', // 'css' or 'device'
	timeout: 10000,
};

/**
 * Clips the screenshot to the page content: the document is at least as tall as the viewport, while
 * the body only extends as far as its content renders. Clipping from the document origin with the
 * viewport width keeps the captured geometry identical to a full-page capture, whose height and
 * width the document only grew beyond when the content itself demanded it.
 */
async function contentClip(page) {
	const bodyBoundingBox = await page.locator('body').boundingBox();
	return {
		x: 0,
		y: 0,
		width: page.viewportSize().width,
		height: Math.ceil(bodyBoundingBox.y + bodyBoundingBox.height),
	};
}

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
			await expect(page).toHaveScreenshot(`${snapshotName}.png`, {
				...SNAPSHOT_OPTIONS,
				clip: await contentClip(page),
			});
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
				clip: await contentClip(page),
			});
		}
	});
});
