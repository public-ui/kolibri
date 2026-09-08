import { expect, test } from '@playwright/test';
import { SNAPSHOT_ANNOTATION, routeToSnapshotName } from '../src/visual-reporter.js';
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
 * through the whole page. Routes that should deliberately be captured as a whole page (overlays,
 * composition tests) set `snapshot.forceFullPage` in sample-app.routes.js. A route without blocks and
 * without `forceFullPage` fails the test – every new sample must declare its blocks explicitly.
 */
const BLOCK_SELECTOR = '[data-visual-block]';
const BLOCK_ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/; // kebab-case
const MAX_BLOCK_ID_LENGTH = 30; // keeps snapshot file paths safely below the Windows path limit

/**
 * Blocks that set SampleBlock's `narrow` prop are captured a second time at 320 px viewport width to
 * guard the reflow behaviour required by WCAG 1.4.10 – the successor of the former 400 % zoom pass,
 * which produced one whole-page screenshot per route and was switched off on 150 of 158 routes.
 * The opt-in deliberately lives on the block instead of the route: only the sample itself knows
 * whether narrow width changes its layout.
 */
const NARROW_SELECTOR = '[data-visual-block][data-visual-narrow]';
/**
 * 320 × 256 CSS pixels is the viewport WCAG 1.4.10 asks content to reflow into. The height must be a
 * real value: with `height: 0` components that size themselves from the viewport collapse to zero
 * height (KolTable does so in the default and bwst themes) and the block becomes uncapturable.
 * Element screenshots capture the whole block even when it is far taller than the viewport, so the
 * small height costs no coverage.
 */
const NARROW_VIEWPORT = { width: 320, height: 256 };
const BLOCK_VISIBLE_TIMEOUT = 10000;

/**
 * Captures one screenshot and announces it to the visual reporter. Every screenshot of this spec must go
 * through here (guarded by a test in test/visual-reporter.test.mjs):
 *
 * - `expect.soft`: a mismatch is a review case, not a reason to abort the route, so the remaining blocks
 *   are still captured and the report lists every changed block of a route at once. Retries stay at the
 *   global setting – a differing route re-renders on retry, but so does a block that was slow to appear.
 * - the annotation: a passing comparison leaves no attachment behind, so it is the only signal that the
 *   snapshot was compared at all – without it the reporter could not tell an unchanged block from a
 *   removed one.
 */
async function captureSnapshot(target, fileName, options) {
	await expect.soft(target).toHaveScreenshot(fileName, options);
	test.info().annotations.push({ type: SNAPSHOT_ANNOTATION, description: fileName });
}

/** Reads the `data-visual-block` ids of all elements matching `selector`, in document order. */
async function readBlockIds(page, selector) {
	return page.$$eval(selector, (elements) => elements.map((element) => element.getAttribute('data-visual-block')));
}

/** Captures one element screenshot per block id and fails on blocks that stay invisible or zero-sized. */
async function captureBlocks(page, route, blockIds, snapshotName, suffix, options) {
	for (const blockId of blockIds) {
		const block = page.locator(`[data-visual-block="${blockId}"]`);
		try {
			/* Playwright's `visible` requires a non-empty bounding box, so this covers zero-size blocks
			   as well. Waiting instead of measuring once matters after a viewport change: components can
			   report a zero height for a moment while they re-layout. */
			await block.waitFor({ state: 'visible', timeout: BLOCK_VISIBLE_TIMEOUT });
		} catch {
			throw new Error(
				`Route "${route}": data-visual-block "${blockId}" is not visible or has zero size${suffix ? ` at ${NARROW_VIEWPORT.width}px viewport width` : ''}`,
			);
		}
		await captureSnapshot(block, `${snapshotName}--${blockId}${suffix}.png`, options);
	}
}

ROUTES.forEach((options, route) => {
	// Skip unnecessary snapshot tests
	if (options?.snapshot?.skip === true) {
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
		if (options?.snapshot?.emulateMedia) {
			await page.emulateMedia(options.snapshot.emulateMedia);
		}

		/* A readable file name, e.g. `button-basic` for `button/basic` – the reporter derives the same name from
		   the test title to match baseline files, so both sides share the one function. */
		const snapshotName = routeToSnapshotName(route);

		const SNAPSHOT_OPTIONS = {
			...DEFAULT_SNAPSHOT_OPTIONS,
			...options?.snapshot?.options,
		};
		const { fullPage: _fullPage, ...ELEMENT_SNAPSHOT_OPTIONS } = SNAPSHOT_OPTIONS; // fullPage is not allowed for element screenshots

		if (options?.snapshot?.forceFullPage === true) {
			await captureSnapshot(page, `${snapshotName}.png`, SNAPSHOT_OPTIONS);
			return; // Whole-page routes have no blocks, so there is nothing to capture at narrow width either.
		}

		const blockIds = await readBlockIds(page, BLOCK_SELECTOR);

		if (blockIds.length === 0) {
			throw new Error(
				`Route "${route}": no data-visual-block containers found. Mark the sample's variant blocks with data-visual-block (see SampleBlock) or set snapshot.forceFullPage in sample-app.routes.js.`,
			);
		}

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

		await captureBlocks(page, route, blockIds, snapshotName, '', ELEMENT_SNAPSHOT_OPTIONS);

		// Reflow pass – runs last because it changes the viewport for the rest of the test.
		const narrowBlockIds = await readBlockIds(page, NARROW_SELECTOR);
		if (narrowBlockIds.length > 0) {
			await page.setViewportSize(NARROW_VIEWPORT);
			await captureBlocks(page, route, narrowBlockIds, snapshotName, `-${NARROW_VIEWPORT.width}`, ELEMENT_SNAPSHOT_OPTIONS);
		}
	});
});
