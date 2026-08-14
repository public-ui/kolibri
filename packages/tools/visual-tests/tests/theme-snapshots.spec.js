import { expect, test } from '@playwright/test';
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
	timeout: 10000,
};

/**
 * Sample views mark their variant blocks with a `data-visual-block` attribute (see SampleBlock in
 * @public-ui/sample-react). Each block is captured as an individual element screenshot instead of one
 * full-page screenshot per route: a change only affects the block's own snapshot instead of cascading
 * through the whole page. Routes without blocks fall back to a full-page screenshot; routes that should
 * deliberately be captured as a whole page set `snapshot.forceFullPage` in sample-app.routes.js.
 */
const BLOCK_SELECTOR = '[data-visual-block]';
const BLOCK_ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/; // kebab-case
const MAX_BLOCK_ID_LENGTH = 30; // keeps snapshot file paths safely below the Windows path limit

ROUTES.forEach((options, route) => {
	// Skip unnecessary snapshot tests
	if (options?.snapshot?.skip === true && options?.snapshot?.zoom?.skip === true) {
		return;
	}
	test(`snapshot for ${route}`, async ({ page }) => {
		const hideMenusParam = `${route.includes('?') ? '&' : '?'}hideMenus`;
		await page.goto(`/#${route}${hideMenusParam}`);
		await page.waitForLoadState('networkidle');
		await page.waitForSelector('.loading', { state: 'hidden' });
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
			const forceFullPage = options?.snapshot?.forceFullPage === true;
			const blockIds = forceFullPage
				? []
				: await page.$$eval(BLOCK_SELECTOR, (elements) => elements.map((element) => element.getAttribute('data-visual-block')));

			if (blockIds.length > 0) {
				const seenBlockIds = new Set();
				for (const blockId of blockIds) {
					if (!blockId || !BLOCK_ID_PATTERN.test(blockId) || blockId.length > MAX_BLOCK_ID_LENGTH) {
						throw new Error(`Route "${route}": invalid data-visual-block id "${blockId}" (must be kebab-case, max. ${MAX_BLOCK_ID_LENGTH} characters)`);
					}
					if (seenBlockIds.has(blockId)) {
						throw new Error(`Route "${route}": duplicate data-visual-block id "${blockId}"`);
					}
					seenBlockIds.add(blockId);
				}

				const { fullPage: _fullPage, ...ELEMENT_SNAPSHOT_OPTIONS } = SNAPSHOT_OPTIONS; // fullPage is not allowed for element screenshots
				for (const blockId of blockIds) {
					const block = page.locator(`[data-visual-block="${blockId}"]`);
					const boundingBox = await block.boundingBox();
					if (!boundingBox || boundingBox.width === 0 || boundingBox.height === 0) {
						throw new Error(`Route "${route}": data-visual-block "${blockId}" is not visible or has zero size`);
					}
					await expect(block).toHaveScreenshot(`${snapshotName}--${blockId}.png`, ELEMENT_SNAPSHOT_OPTIONS);
				}
			} else {
				await expect(page).toHaveScreenshot(`${snapshotName}.png`, SNAPSHOT_OPTIONS);
			}
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
