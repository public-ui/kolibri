# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-snapshots.spec.js >> snapshot for input-color/basic?noColumns
- Location: tests/theme-snapshots.spec.js:82:2

# Error details

```
Error: A snapshot doesn't exist at /__w/kolibri/kolibri/packages/themes/kern/snapshots/theme-kern_v2/input-color-basic-noColumns--label-black-bg-firefox-linux.png, writing actual.
```

```
Error: A snapshot doesn't exist at /__w/kolibri/kolibri/packages/themes/kern/snapshots/theme-kern_v2/input-color-basic-noColumns--label-suggestions-error-firefox-linux.png, writing actual.
```

```
Error: A snapshot doesn't exist at /__w/kolibri/kolibri/packages/themes/kern/snapshots/theme-kern_v2/input-color-basic-noColumns--label-msg-info-firefox-linux.png, writing actual.
```

```
Error: A snapshot doesn't exist at /__w/kolibri/kolibri/packages/themes/kern/snapshots/theme-kern_v2/input-color-basic-noColumns--label-msg-warning-firefox-linux.png, writing actual.
```

```
Error: A snapshot doesn't exist at /__w/kolibri/kolibri/packages/themes/kern/snapshots/theme-kern_v2/input-color-basic-noColumns--label-msg-success-firefox-linux.png, writing actual.
```

```
Error: A snapshot doesn't exist at /__w/kolibri/kolibri/packages/themes/kern/snapshots/theme-kern_v2/input-color-basic-noColumns--label-msg-default-firefox-linux.png, writing actual.
```

```
Error: A snapshot doesn't exist at /__w/kolibri/kolibri/packages/themes/kern/snapshots/theme-kern_v2/input-color-basic-noColumns--label-hint-firefox-linux.png, writing actual.
```

```
Error: A snapshot doesn't exist at /__w/kolibri/kolibri/packages/themes/kern/snapshots/theme-kern_v2/input-color-basic-noColumns--label-disabled-firefox-linux.png, writing actual.
```

```
Error: A snapshot doesn't exist at /__w/kolibri/kolibri/packages/themes/kern/snapshots/theme-kern_v2/input-color-basic-noColumns--label-access-key-firefox-linux.png, writing actual.
```

```
Error: A snapshot doesn't exist at /__w/kolibri/kolibri/packages/themes/kern/snapshots/theme-kern_v2/input-color-basic-noColumns--label-short-key-firefox-linux.png, writing actual.
```

```
Error: A snapshot doesn't exist at /__w/kolibri/kolibri/packages/themes/kern/snapshots/theme-kern_v2/input-color-basic-noColumns--label-info-popover-firefox-linux.png, writing actual.
```

```
Error: A snapshot doesn't exist at /__w/kolibri/kolibri/packages/themes/kern/snapshots/theme-kern_v2/input-color-basic-noColumns--hide-label-suggestions-error-firefox-linux.png, writing actual.
```

# Page snapshot

```yaml
- main [ref=e4]:
  - heading "input-color basic" [level=1] [ref=e5]
  - generic [ref=e7]:
    - paragraph [ref=e8]: Form fields marked with an asterisk (*) are mandatory.
    - generic [ref=e10]:
      - generic [ref=e11]:
        - heading "Color" [level=2] [ref=e13]: Color
        - generic [ref=e14]:
          - generic [ref=e18]:
            - generic [ref=e22] [cursor=pointer]: Color (Black background test)
            - generic [ref=e24]:
              - generic [ref=e26]: 
              - generic [ref=e28]:
                - textbox [ref=e29] [cursor=pointer]: "#f08080"
                - textbox "Color (Black background test)" [ref=e30] [cursor=pointer]: "#f08080"
          - generic [ref=e34]:
            - generic [ref=e38] [cursor=pointer]: Color with error
            - generic [ref=e42]:
              - textbox [ref=e43] [cursor=pointer]: "#000000"
              - textbox "Color with error" [ref=e44] [cursor=pointer]: "#000000"
            - alert [ref=e45]:
              - generic [ref=e46]: Error
              - generic [ref=e47]: 
              - generic [ref=e48]: I am an error message!
          - generic [ref=e52]:
            - generic [ref=e56] [cursor=pointer]: Color
            - generic [ref=e60]:
              - textbox [ref=e61] [cursor=pointer]: "#000000"
              - textbox "Color" [ref=e62] [cursor=pointer]: "#000000"
            - alert [ref=e63]:
              - generic [ref=e64]: Note
              - generic [ref=e65]: 
              - generic [ref=e66]: Just a hint message.
          - generic [ref=e70]:
            - generic [ref=e74] [cursor=pointer]: Color
            - generic [ref=e78]:
              - textbox [ref=e79] [cursor=pointer]: "#000000"
              - textbox "Color" [ref=e80] [cursor=pointer]: "#000000"
            - alert [ref=e81]:
              - generic [ref=e82]: Warning
              - generic [ref=e83]: 
              - generic [ref=e84]: Small warning
          - generic [ref=e88]:
            - generic [ref=e92] [cursor=pointer]: Color
            - generic [ref=e96]:
              - textbox [ref=e97] [cursor=pointer]: "#000000"
              - textbox "Color" [ref=e98] [cursor=pointer]: "#000000"
            - alert [ref=e99]:
              - generic [ref=e100]: Success
              - generic [ref=e101]: 
              - generic [ref=e102]: Success message
          - generic [ref=e106]:
            - generic [ref=e110] [cursor=pointer]: Color
            - generic [ref=e114]:
              - textbox [ref=e115] [cursor=pointer]: "#000000"
              - textbox "Color" [ref=e116] [cursor=pointer]: "#000000"
            - alert [ref=e117]:
              - generic [ref=e118]: Message
              - generic [ref=e119]: 
              - generic [ref=e120]: Default message
          - generic [ref=e124]:
            - generic [ref=e127] [cursor=pointer]:
              - generic [ref=e128]: Color with hint
              - generic [ref=e129]: C
            - generic [ref=e133]:
              - textbox [ref=e134] [cursor=pointer]: "#f08080"
              - textbox "Color with hint" [ref=e135] [cursor=pointer]: "#f08080"
            - generic [ref=e136]: Hint text
          - generic [ref=e140]:
            - generic [ref=e144]: Color (Disabled)
            - generic [ref=e148]:
              - textbox [disabled] [ref=e149]: "#f08080"
              - textbox "Color (Disabled)" [disabled] [ref=e150]: "#f08080"
          - generic [ref=e154]:
            - generic [ref=e157] [cursor=pointer]:
              - generic [ref=e158]: With access key
              - generic [ref=e159]: c
            - generic [ref=e163]:
              - textbox [ref=e164] [cursor=pointer]: "#000000"
              - textbox "With access key" [ref=e165] [cursor=pointer]: "#000000"
          - generic [ref=e169]:
            - generic [ref=e172] [cursor=pointer]:
              - generic [ref=e173]: With short key
              - generic [ref=e174]: s
            - generic [ref=e178]:
              - textbox [ref=e179] [cursor=pointer]: "#000000"
              - textbox "With short key" [ref=e180] [cursor=pointer]: "#000000"
          - generic [ref=e184]:
            - generic [ref=e185] [cursor=pointer]:
              - generic [ref=e188]: With short popover
              - button "hint" [ref=e191]:
                - generic [ref=e194]: 
            - generic [ref=e198]:
              - textbox [ref=e199] [cursor=pointer]: "#000000"
              - textbox "With short popover hint" [ref=e200] [cursor=pointer]: "#000000"
      - generic [ref=e201]:
        - heading "Color (hideLabel)" [level=2] [ref=e203]: Color (hideLabel)
        - generic [ref=e204]:
          - generic [ref=e210]:
            - generic [ref=e212]: 
            - generic [ref=e214]:
              - textbox [ref=e215] [cursor=pointer]: "#f08080"
              - textbox "Color (Black background test)" [ref=e216] [cursor=pointer]: "#f08080"
          - generic [ref=e220]:
            - generic [ref=e224]:
              - textbox [ref=e225] [cursor=pointer]: "#000000"
              - textbox "Color with error" [ref=e226] [cursor=pointer]: "#000000"
            - alert [ref=e227]:
              - generic [ref=e228]: Error
              - generic [ref=e229]: 
              - generic [ref=e230]: I am an error message!
          - generic [ref=e234]:
            - generic [ref=e238]:
              - textbox [ref=e239] [cursor=pointer]: "#000000"
              - textbox "Color" [ref=e240] [cursor=pointer]: "#000000"
            - alert [ref=e241]:
              - generic [ref=e242]: Note
              - generic [ref=e243]: 
              - generic [ref=e244]: Just a hint message.
          - generic [ref=e248]:
            - generic [ref=e252]:
              - textbox [ref=e253] [cursor=pointer]: "#000000"
              - textbox "Color" [ref=e254] [cursor=pointer]: "#000000"
            - alert [ref=e255]:
              - generic [ref=e256]: Warning
              - generic [ref=e257]: 
              - generic [ref=e258]: Small warning
          - generic [ref=e262]:
            - generic [ref=e266]:
              - textbox [ref=e267] [cursor=pointer]: "#000000"
              - textbox "Color" [ref=e268] [cursor=pointer]: "#000000"
            - alert [ref=e269]:
              - generic [ref=e270]: Success
              - generic [ref=e271]: 
              - generic [ref=e272]: Success message
          - generic [ref=e276]:
            - generic [ref=e280]:
              - textbox [ref=e281] [cursor=pointer]: "#000000"
              - textbox "Color" [ref=e282] [cursor=pointer]: "#000000"
            - alert [ref=e283]:
              - generic [ref=e284]: Message
              - generic [ref=e285]: 
              - generic [ref=e286]: Default message
          - generic [ref=e290]:
            - generic [ref=e294]:
              - textbox [ref=e295] [cursor=pointer]: "#f08080"
              - textbox "Color with hint" [ref=e296] [cursor=pointer]: "#f08080"
            - generic [ref=e297]: Hint text
          - generic [ref=e305]:
            - textbox [disabled] [ref=e306]: "#f08080"
            - textbox "Color (Disabled)" [disabled] [ref=e307]: "#f08080"
          - generic [ref=e315]:
            - textbox [ref=e316] [cursor=pointer]: "#000000"
            - textbox "With access key" [ref=e317] [cursor=pointer]: "#000000"
          - generic [ref=e325]:
            - textbox [ref=e326] [cursor=pointer]: "#000000"
            - textbox "With short key" [ref=e327] [cursor=pointer]: "#000000"
          - generic [ref=e331]:
            - text: 
            - generic [ref=e335]:
              - textbox [ref=e336] [cursor=pointer]: "#000000"
              - textbox "With short popover" [ref=e337] [cursor=pointer]: "#000000"
```

# Test source

```ts
  1   | import { expect, test } from '@playwright/test';
  2   | import { ROUTES } from './sample-app.routes.js';
  3   | 
  4   | // https://playwright.dev/docs/emulation
  5   | test.use({
  6   | 	colorScheme: 'light',
  7   | 	locale: 'de-DE',
  8   | 	isMobile: false,
  9   | 	timezoneId: 'Europe/Berlin',
  10  | 	viewport: {
  11  | 		width: 800,
  12  | 		height: 0,
  13  | 	},
  14  | });
  15  | 
  16  | const DEFAULT_SNAPSHOT_OPTIONS = {
  17  | 	animations: 'disabled',
  18  | 	fullPage: true,
  19  | 	maxDiffPixelRatio: 0,
  20  | 	scale: 'css', // 'css' or 'device'
  21  | 	timeout: 10000,
  22  | };
  23  | 
  24  | /**
  25  |  * Sample views mark their variant blocks with a `data-visual-block` attribute (see SampleBlock in
  26  |  * @public-ui/sample-react). Each block is captured as an individual element screenshot instead of one
  27  |  * full-page screenshot per route: a change only affects the block's own snapshot instead of cascading
  28  |  * through the whole page. Routes that should deliberately be captured as a whole page (overlays,
  29  |  * composition tests) set `snapshot.forceFullPage` in sample-app.routes.js. A route without blocks and
  30  |  * without `forceFullPage` fails the test – every new sample must declare its blocks explicitly.
  31  |  */
  32  | const BLOCK_SELECTOR = '[data-visual-block]';
  33  | const BLOCK_ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/; // kebab-case
  34  | const MAX_BLOCK_ID_LENGTH = 30; // keeps snapshot file paths safely below the Windows path limit
  35  | 
  36  | /**
  37  |  * Blocks that set SampleBlock's `narrow` prop are captured a second time at 320 px viewport width to
  38  |  * guard the reflow behaviour required by WCAG 1.4.10 – the successor of the former 400 % zoom pass,
  39  |  * which produced one whole-page screenshot per route and was switched off on 150 of 158 routes.
  40  |  * The opt-in deliberately lives on the block instead of the route: only the sample itself knows
  41  |  * whether narrow width changes its layout.
  42  |  */
  43  | const NARROW_SELECTOR = '[data-visual-block][data-visual-narrow]';
  44  | /**
  45  |  * 320 × 256 CSS pixels is the viewport WCAG 1.4.10 asks content to reflow into. The height must be a
  46  |  * real value: with `height: 0` components that size themselves from the viewport collapse to zero
  47  |  * height (KolTable does so in the default and bwst themes) and the block becomes uncapturable.
  48  |  * Element screenshots capture the whole block even when it is far taller than the viewport, so the
  49  |  * small height costs no coverage.
  50  |  */
  51  | const NARROW_VIEWPORT = { width: 320, height: 256 };
  52  | const BLOCK_VISIBLE_TIMEOUT = 10000;
  53  | 
  54  | /** Reads the `data-visual-block` ids of all elements matching `selector`, in document order. */
  55  | async function readBlockIds(page, selector) {
  56  | 	return page.$$eval(selector, (elements) => elements.map((element) => element.getAttribute('data-visual-block')));
  57  | }
  58  | 
  59  | /** Captures one element screenshot per block id and fails on blocks that stay invisible or zero-sized. */
  60  | async function captureBlocks(page, route, blockIds, snapshotName, suffix, options) {
  61  | 	for (const blockId of blockIds) {
  62  | 		const block = page.locator(`[data-visual-block="${blockId}"]`);
  63  | 		try {
  64  | 			/* Playwright's `visible` requires a non-empty bounding box, so this covers zero-size blocks
  65  | 			   as well. Waiting instead of measuring once matters after a viewport change: components can
  66  | 			   report a zero height for a moment while they re-layout. */
  67  | 			await block.waitFor({ state: 'visible', timeout: BLOCK_VISIBLE_TIMEOUT });
  68  | 		} catch {
  69  | 			throw new Error(
  70  | 				`Route "${route}": data-visual-block "${blockId}" is not visible or has zero size${suffix ? ` at ${NARROW_VIEWPORT.width}px viewport width` : ''}`,
  71  | 			);
  72  | 		}
> 73  | 		await expect(block).toHaveScreenshot(`${snapshotName}--${blockId}${suffix}.png`, options);
      |   ^ Error: A snapshot doesn't exist at /__w/kolibri/kolibri/packages/themes/kern/snapshots/theme-kern_v2/input-color-basic-noColumns--hide-label-suggestions-error-firefox-linux.png, writing actual.
  74  | 	}
  75  | }
  76  | 
  77  | ROUTES.forEach((options, route) => {
  78  | 	// Skip unnecessary snapshot tests
  79  | 	if (options?.snapshot?.skip === true) {
  80  | 		return;
  81  | 	}
  82  | 	test(`snapshot for ${route}`, async ({ page }) => {
  83  | 		const hideMenusParam = `${route.includes('?') ? '&' : '?'}hideMenus`;
  84  | 		await page.goto(`/#${route}${hideMenusParam}`);
  85  | 		await page.waitForLoadState('networkidle');
  86  | 		await page.waitForSelector('.loading', { state: 'hidden' });
  87  | 		await page.addStyleTag({
  88  | 			content: `
  89  | 				* {
  90  | 					transition: none !important;
  91  | 					animation: none !important;
  92  | 				}
  93  | 			`,
  94  | 		});
  95  | 		if (options?.snapshot?.viewportSize) {
  96  | 			await page.setViewportSize(options?.snapshot?.viewportSize);
  97  | 		}
  98  | 		if (options?.snapshot?.waitForTimeout) {
  99  | 			await page.waitForTimeout(options?.snapshot?.waitForTimeout);
  100 | 		}
  101 | 
  102 | 		/**
  103 | 		 * We would like to use a readable name for the snapshot file, e.g. `button-basic` for `button/basic`.
  104 | 		 */
  105 | 		const snapshotName = route.replace(/(\/|\?|&|=)/g, '-');
  106 | 
  107 | 		const SNAPSHOT_OPTIONS = {
  108 | 			...DEFAULT_SNAPSHOT_OPTIONS,
  109 | 			...options?.snapshot?.options,
  110 | 		};
  111 | 		const { fullPage: _fullPage, ...ELEMENT_SNAPSHOT_OPTIONS } = SNAPSHOT_OPTIONS; // fullPage is not allowed for element screenshots
  112 | 
  113 | 		if (options?.snapshot?.forceFullPage === true) {
  114 | 			await expect(page).toHaveScreenshot(`${snapshotName}.png`, SNAPSHOT_OPTIONS);
  115 | 			return; // Whole-page routes have no blocks, so there is nothing to capture at narrow width either.
  116 | 		}
  117 | 
  118 | 		const blockIds = await readBlockIds(page, BLOCK_SELECTOR);
  119 | 
  120 | 		if (blockIds.length === 0) {
  121 | 			throw new Error(
  122 | 				`Route "${route}": no data-visual-block containers found. Mark the sample's variant blocks with data-visual-block (see SampleBlock) or set snapshot.forceFullPage in sample-app.routes.js.`,
  123 | 			);
  124 | 		}
  125 | 
  126 | 		const seenBlockIds = new Set();
  127 | 		for (const blockId of blockIds) {
  128 | 			if (!blockId || !BLOCK_ID_PATTERN.test(blockId) || blockId.length > MAX_BLOCK_ID_LENGTH) {
  129 | 				throw new Error(`Route "${route}": invalid data-visual-block id "${blockId}" (must be kebab-case, max. ${MAX_BLOCK_ID_LENGTH} characters)`);
  130 | 			}
  131 | 			if (seenBlockIds.has(blockId)) {
  132 | 				throw new Error(`Route "${route}": duplicate data-visual-block id "${blockId}"`);
  133 | 			}
  134 | 			seenBlockIds.add(blockId);
  135 | 		}
  136 | 
  137 | 		await captureBlocks(page, route, blockIds, snapshotName, '', ELEMENT_SNAPSHOT_OPTIONS);
  138 | 
  139 | 		// Reflow pass – runs last because it changes the viewport for the rest of the test.
  140 | 		const narrowBlockIds = await readBlockIds(page, NARROW_SELECTOR);
  141 | 		if (narrowBlockIds.length > 0) {
  142 | 			await page.setViewportSize(NARROW_VIEWPORT);
  143 | 			await captureBlocks(page, route, narrowBlockIds, snapshotName, `-${NARROW_VIEWPORT.width}`, ELEMENT_SNAPSHOT_OPTIONS);
  144 | 		}
  145 | 	});
  146 | });
  147 | 
```