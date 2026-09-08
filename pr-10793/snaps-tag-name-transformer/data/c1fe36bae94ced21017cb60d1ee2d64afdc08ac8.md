# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-snapshots.spec.js >> snapshot for button/icons
- Location: tests/theme-snapshots.spec.js:99:2

# Error details

```
Error: expect(locator).toHaveScreenshot(expected) failed

Locator: locator('[data-visual-block="basic-positions"]')
  774 pixels (ratio 0.03 of all image pixels) are different.

  Snapshot: button-icons--basic-positions.png

Call log:
  - Expect "soft toHaveScreenshot(button-icons--basic-positions.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - waiting for locator('[data-visual-block="basic-positions"]')
    - locator resolved to <div class="grid gap-4" data-visual-block="basic-positions">…</div>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - 774 pixels (ratio 0.03 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - waiting for locator('[data-visual-block="basic-positions"]')
    - locator resolved to <div class="grid gap-4" data-visual-block="basic-positions">…</div>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - captured a stable screenshot
  - 774 pixels (ratio 0.03 of all image pixels) are different.

```

```
Error: expect(locator).toHaveScreenshot(expected) failed

Locator: locator('[data-visual-block="multiple-positions"]')
  582 pixels (ratio 0.03 of all image pixels) are different.

  Snapshot: button-icons--multiple-positions.png

Call log:
  - Expect "soft toHaveScreenshot(button-icons--multiple-positions.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - waiting for locator('[data-visual-block="multiple-positions"]')
    - locator resolved to <div class="grid gap-4" data-visual-block="multiple-positions">…</div>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - 582 pixels (ratio 0.03 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - waiting for locator('[data-visual-block="multiple-positions"]')
    - locator resolved to <div class="grid gap-4" data-visual-block="multiple-positions">…</div>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - captured a stable screenshot
  - 582 pixels (ratio 0.03 of all image pixels) are different.

```

```
Error: expect(locator).toHaveScreenshot(expected) failed

Locator: locator('[data-visual-block="all-positions"]')
  337 pixels (ratio 0.03 of all image pixels) are different.

  Snapshot: button-icons--all-positions.png

Call log:
  - Expect "soft toHaveScreenshot(button-icons--all-positions.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - waiting for locator('[data-visual-block="all-positions"]')
    - locator resolved to <div class="grid gap-4" data-visual-block="all-positions">…</div>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - 337 pixels (ratio 0.03 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - waiting for locator('[data-visual-block="all-positions"]')
    - locator resolved to <div class="grid gap-4" data-visual-block="all-positions">…</div>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - captured a stable screenshot
  - 337 pixels (ratio 0.03 of all image pixels) are different.

```

```
Error: expect(locator).toHaveScreenshot(expected) failed

Locator: locator('[data-visual-block="icon-string"]')
  888 pixels (ratio 0.05 of all image pixels) are different.

  Snapshot: button-icons--icon-string.png

Call log:
  - Expect "soft toHaveScreenshot(button-icons--icon-string.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - waiting for locator('[data-visual-block="icon-string"]')
    - locator resolved to <div class="grid gap-4" data-visual-block="icon-string">…</div>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - 888 pixels (ratio 0.05 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - waiting for locator('[data-visual-block="icon-string"]')
    - locator resolved to <div class="grid gap-4" data-visual-block="icon-string">…</div>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - captured a stable screenshot
  - 888 pixels (ratio 0.05 of all image pixels) are different.

```

```
Error: expect(locator).toHaveScreenshot(expected) failed

Locator: locator('[data-visual-block="large-icon"]')
  3168 pixels (ratio 0.29 of all image pixels) are different.

  Snapshot: button-icons--large-icon.png

Call log:
  - Expect "soft toHaveScreenshot(button-icons--large-icon.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - waiting for locator('[data-visual-block="large-icon"]')
    - locator resolved to <div class="grid gap-4" data-visual-block="large-icon">…</div>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - 3168 pixels (ratio 0.29 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - waiting for locator('[data-visual-block="large-icon"]')
    - locator resolved to <div class="grid gap-4" data-visual-block="large-icon">…</div>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - captured a stable screenshot
  - 3168 pixels (ratio 0.29 of all image pixels) are different.

```

# Page snapshot

```yaml
- main [ref=e4]:
  - heading "button icons" [level=1] [ref=e5]
  - generic [ref=e6]:
    - generic [ref=e7]:
      - heading "Basic Icon Positions" [level=2] [ref=e9]: Basic Icon Positions
      - generic [ref=e11]:
        - button "Icon Left" [ref=e14] [cursor=pointer]:
          - generic [ref=e16]:
            - generic [ref=e17]: 
            - generic [ref=e18]: Icon Left
        - button "Icon Right" [ref=e21] [cursor=pointer]:
          - generic [ref=e23]:
            - generic [ref=e24]: Icon Right
            - generic [ref=e25]: 
        - button "Icon Top" [ref=e28] [cursor=pointer]:
          - generic [ref=e29]:
            - generic [ref=e30]: 
            - generic [ref=e32]: Icon Top
        - button "Icon Bottom" [ref=e35] [cursor=pointer]:
          - generic [ref=e36]:
            - generic [ref=e38]: Icon Bottom
            - generic [ref=e39]: 
    - generic [ref=e40]:
      - heading "Multiple Icon Positions" [level=2] [ref=e42]: Multiple Icon Positions
      - generic [ref=e44]:
        - button "Left & Right" [ref=e47] [cursor=pointer]:
          - generic [ref=e49]:
            - generic [ref=e50]: 
            - generic [ref=e51]: Left & Right
            - generic [ref=e52]: 
        - button "Top & Bottom" [ref=e55] [cursor=pointer]:
          - generic [ref=e56]:
            - generic [ref=e57]: 
            - generic [ref=e59]: Top & Bottom
            - generic [ref=e60]: 
    - generic [ref=e61]:
      - heading "All Icon Positions" [level=2] [ref=e63]: All Icon Positions
      - button "All Directions" [ref=e68] [cursor=pointer]:
        - generic [ref=e69]:
          - generic [ref=e70]: 
          - generic [ref=e71]:
            - generic [ref=e72]: 
            - generic [ref=e73]: All Directions
            - generic [ref=e74]: 
          - generic [ref=e75]: 
    - generic [ref=e76]:
      - heading "Simple Icon String" [level=2] [ref=e78]: Simple Icon String
      - generic [ref=e80]:
        - button "Home Icon" [ref=e83] [cursor=pointer]:
          - generic [ref=e85]:
            - generic [ref=e86]: 
            - generic [ref=e87]: Home Icon
        - button "Heart Icon" [ref=e90] [cursor=pointer]:
          - generic [ref=e92]:
            - generic [ref=e93]: 
            - generic [ref=e94]: Heart Icon
        - button "Trash Icon" [ref=e97] [cursor=pointer]:
          - generic [ref=e99]:
            - generic [ref=e100]: 
            - generic [ref=e101]: Trash Icon
    - generic [ref=e102]:
      - heading "Large Icon on Top" [level=2] [ref=e104]: Large Icon on Top
      - button "Home" [ref=e109] [cursor=pointer]:
        - generic [ref=e110]:
          - generic [ref=e111]: 
          - generic [ref=e113]: Home
```

# Test source

```ts
  1   | import { expect, test } from '@playwright/test';
  2   | import { SNAPSHOT_ANNOTATION, routeToSnapshotName } from '../src/visual-reporter.js';
  3   | import { ROUTES } from './sample-app.routes.js';
  4   | 
  5   | // https://playwright.dev/docs/emulation
  6   | test.use({
  7   | 	colorScheme: 'light',
  8   | 	locale: 'de-DE',
  9   | 	isMobile: false,
  10  | 	timezoneId: 'Europe/Berlin',
  11  | 	viewport: {
  12  | 		width: 800,
  13  | 		height: 0,
  14  | 	},
  15  | });
  16  | 
  17  | const DEFAULT_SNAPSHOT_OPTIONS = {
  18  | 	animations: 'disabled',
  19  | 	fullPage: true,
  20  | 	maxDiffPixelRatio: 0,
  21  | 	scale: 'css', // 'css' or 'device'
  22  | 	timeout: 10000,
  23  | };
  24  | 
  25  | /**
  26  |  * Sample views mark their variant blocks with a `data-visual-block` attribute (see SampleBlock in
  27  |  * @public-ui/sample-react). Each block is captured as an individual element screenshot instead of one
  28  |  * full-page screenshot per route: a change only affects the block's own snapshot instead of cascading
  29  |  * through the whole page. Routes that should deliberately be captured as a whole page (overlays,
  30  |  * composition tests) set `snapshot.forceFullPage` in sample-app.routes.js. A route without blocks and
  31  |  * without `forceFullPage` fails the test – every new sample must declare its blocks explicitly.
  32  |  */
  33  | const BLOCK_SELECTOR = '[data-visual-block]';
  34  | const BLOCK_ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/; // kebab-case
  35  | const MAX_BLOCK_ID_LENGTH = 30; // keeps snapshot file paths safely below the Windows path limit
  36  | 
  37  | /**
  38  |  * Blocks that set SampleBlock's `narrow` prop are captured a second time at 320 px viewport width to
  39  |  * guard the reflow behaviour required by WCAG 1.4.10 – the successor of the former 400 % zoom pass,
  40  |  * which produced one whole-page screenshot per route and was switched off on 150 of 158 routes.
  41  |  * The opt-in deliberately lives on the block instead of the route: only the sample itself knows
  42  |  * whether narrow width changes its layout.
  43  |  */
  44  | const NARROW_SELECTOR = '[data-visual-block][data-visual-narrow]';
  45  | /**
  46  |  * 320 × 256 CSS pixels is the viewport WCAG 1.4.10 asks content to reflow into. The height must be a
  47  |  * real value: with `height: 0` components that size themselves from the viewport collapse to zero
  48  |  * height (KolTable does so in the default and bwst themes) and the block becomes uncapturable.
  49  |  * Element screenshots capture the whole block even when it is far taller than the viewport, so the
  50  |  * small height costs no coverage.
  51  |  */
  52  | const NARROW_VIEWPORT = { width: 320, height: 256 };
  53  | const BLOCK_VISIBLE_TIMEOUT = 10000;
  54  | 
  55  | /**
  56  |  * Captures one screenshot and announces it to the visual reporter. Every screenshot of this spec must go
  57  |  * through here (guarded by a test in test/visual-reporter.test.mjs):
  58  |  *
  59  |  * - `expect.soft`: a mismatch is a review case, not a reason to abort the route, so the remaining blocks
  60  |  *   are still captured and the report lists every changed block of a route at once. Retries stay at the
  61  |  *   global setting – a differing route re-renders on retry, but so does a block that was slow to appear.
  62  |  * - the annotation: a passing comparison leaves no attachment behind, so it is the only signal that the
  63  |  *   snapshot was compared at all – without it the reporter could not tell an unchanged block from a
  64  |  *   removed one.
  65  |  */
  66  | async function captureSnapshot(target, fileName, options) {
> 67  | 	await expect.soft(target).toHaveScreenshot(fileName, options);
      |                            ^ Error: expect(locator).toHaveScreenshot(expected) failed
  68  | 	test.info().annotations.push({ type: SNAPSHOT_ANNOTATION, description: fileName });
  69  | }
  70  | 
  71  | /** Reads the `data-visual-block` ids of all elements matching `selector`, in document order. */
  72  | async function readBlockIds(page, selector) {
  73  | 	return page.$$eval(selector, (elements) => elements.map((element) => element.getAttribute('data-visual-block')));
  74  | }
  75  | 
  76  | /** Captures one element screenshot per block id and fails on blocks that stay invisible or zero-sized. */
  77  | async function captureBlocks(page, route, blockIds, snapshotName, suffix, options) {
  78  | 	for (const blockId of blockIds) {
  79  | 		const block = page.locator(`[data-visual-block="${blockId}"]`);
  80  | 		try {
  81  | 			/* Playwright's `visible` requires a non-empty bounding box, so this covers zero-size blocks
  82  | 			   as well. Waiting instead of measuring once matters after a viewport change: components can
  83  | 			   report a zero height for a moment while they re-layout. */
  84  | 			await block.waitFor({ state: 'visible', timeout: BLOCK_VISIBLE_TIMEOUT });
  85  | 		} catch {
  86  | 			throw new Error(
  87  | 				`Route "${route}": data-visual-block "${blockId}" is not visible or has zero size${suffix ? ` at ${NARROW_VIEWPORT.width}px viewport width` : ''}`,
  88  | 			);
  89  | 		}
  90  | 		await captureSnapshot(block, `${snapshotName}--${blockId}${suffix}.png`, options);
  91  | 	}
  92  | }
  93  | 
  94  | ROUTES.forEach((options, route) => {
  95  | 	// Skip unnecessary snapshot tests
  96  | 	if (options?.snapshot?.skip === true) {
  97  | 		return;
  98  | 	}
  99  | 	test(`snapshot for ${route}`, async ({ page }) => {
  100 | 		const hideMenusParam = `${route.includes('?') ? '&' : '?'}hideMenus`;
  101 | 		await page.goto(`/#${route}${hideMenusParam}`);
  102 | 		await page.waitForLoadState('networkidle');
  103 | 		await page.waitForSelector('.loading', { state: 'hidden' });
  104 | 		await page.addStyleTag({
  105 | 			content: `
  106 | 				* {
  107 | 					transition: none !important;
  108 | 					animation: none !important;
  109 | 				}
  110 | 			`,
  111 | 		});
  112 | 		if (options?.snapshot?.viewportSize) {
  113 | 			await page.setViewportSize(options?.snapshot?.viewportSize);
  114 | 		}
  115 | 		if (options?.snapshot?.waitForTimeout) {
  116 | 			await page.waitForTimeout(options?.snapshot?.waitForTimeout);
  117 | 		}
  118 | 		if (options?.snapshot?.emulateMedia) {
  119 | 			await page.emulateMedia(options.snapshot.emulateMedia);
  120 | 		}
  121 | 
  122 | 		/* A readable file name, e.g. `button-basic` for `button/basic` – the reporter derives the same name from
  123 | 		   the test title to match baseline files, so both sides share the one function. */
  124 | 		const snapshotName = routeToSnapshotName(route);
  125 | 
  126 | 		const SNAPSHOT_OPTIONS = {
  127 | 			...DEFAULT_SNAPSHOT_OPTIONS,
  128 | 			...options?.snapshot?.options,
  129 | 		};
  130 | 		const { fullPage: _fullPage, ...ELEMENT_SNAPSHOT_OPTIONS } = SNAPSHOT_OPTIONS; // fullPage is not allowed for element screenshots
  131 | 
  132 | 		if (options?.snapshot?.forceFullPage === true) {
  133 | 			await captureSnapshot(page, `${snapshotName}.png`, SNAPSHOT_OPTIONS);
  134 | 			return; // Whole-page routes have no blocks, so there is nothing to capture at narrow width either.
  135 | 		}
  136 | 
  137 | 		const blockIds = await readBlockIds(page, BLOCK_SELECTOR);
  138 | 
  139 | 		if (blockIds.length === 0) {
  140 | 			throw new Error(
  141 | 				`Route "${route}": no data-visual-block containers found. Mark the sample's variant blocks with data-visual-block (see SampleBlock) or set snapshot.forceFullPage in sample-app.routes.js.`,
  142 | 			);
  143 | 		}
  144 | 
  145 | 		const seenBlockIds = new Set();
  146 | 		for (const blockId of blockIds) {
  147 | 			if (!blockId || !BLOCK_ID_PATTERN.test(blockId) || blockId.length > MAX_BLOCK_ID_LENGTH) {
  148 | 				throw new Error(`Route "${route}": invalid data-visual-block id "${blockId}" (must be kebab-case, max. ${MAX_BLOCK_ID_LENGTH} characters)`);
  149 | 			}
  150 | 			if (seenBlockIds.has(blockId)) {
  151 | 				throw new Error(`Route "${route}": duplicate data-visual-block id "${blockId}"`);
  152 | 			}
  153 | 			seenBlockIds.add(blockId);
  154 | 		}
  155 | 
  156 | 		await captureBlocks(page, route, blockIds, snapshotName, '', ELEMENT_SNAPSHOT_OPTIONS);
  157 | 
  158 | 		// Reflow pass – runs last because it changes the viewport for the rest of the test.
  159 | 		const narrowBlockIds = await readBlockIds(page, NARROW_SELECTOR);
  160 | 		if (narrowBlockIds.length > 0) {
  161 | 			await page.setViewportSize(NARROW_VIEWPORT);
  162 | 			await captureBlocks(page, route, narrowBlockIds, snapshotName, `-${NARROW_VIEWPORT.width}`, ELEMENT_SNAPSHOT_OPTIONS);
  163 | 		}
  164 | 	});
  165 | });
  166 | 
```