# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-snapshots.spec.js >> snapshot for button/disabled
- Location: tests/theme-snapshots.spec.js:29:2

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  Expected an image 800px by 240px, received 800px by 252px. 10405 pixels (ratio 0.06 of all image pixels) are different.

  Snapshot: snapshot-for-button-disabled.png

Call log:
  - Expect "toHaveScreenshot(snapshot-for-button-disabled.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 800px by 240px, received 800px by 252px. 10405 pixels (ratio 0.06 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - Expected an image 800px by 240px, received 800px by 252px. 10405 pixels (ratio 0.06 of all image pixels) are different.

```

# Page snapshot

```yaml
- main [ref=e4]:
  - heading "button disabled" [level=1] [ref=e5]
  - generic [ref=e6]:
    - generic [ref=e7]:
      - heading "Disabled Buttons" [level=2] [ref=e9]: Disabled Buttons
      - generic [ref=e10]:
        - button "Primary" [disabled] [ref=e13]:
          - generic [ref=e15]:
            - generic [ref=e16]: 
            - generic [ref=e17]: Primary
        - button "Secondary" [disabled] [ref=e20]:
          - generic [ref=e22]:
            - generic [ref=e23]: 
            - generic [ref=e24]: Secondary
        - button "Tertiary" [disabled] [ref=e27]:
          - generic [ref=e29]:
            - generic [ref=e30]: 
            - generic [ref=e31]: Tertiary
        - button "Normal" [disabled] [ref=e34]:
          - generic [ref=e36]:
            - generic [ref=e37]: 
            - generic [ref=e38]: Normal
        - button "Danger" [disabled] [ref=e41]:
          - generic [ref=e43]:
            - generic [ref=e44]: 
            - generic [ref=e45]: Danger
        - button "Ghost" [disabled] [ref=e48]:
          - generic [ref=e50]:
            - generic [ref=e51]: 
            - generic [ref=e52]: Ghost
    - generic [ref=e53]:
      - 'heading "Comparison: Enabled vs Disabled" [level=2] [ref=e55]': "Comparison: Enabled vs Disabled"
      - generic [ref=e56]:
        - button "Enabled" [ref=e59] [cursor=pointer]:
          - generic [ref=e61]:
            - generic [ref=e62]: 
            - generic [ref=e63]: Enabled
        - button "Disabled" [disabled] [ref=e66]:
          - generic [ref=e68]:
            - generic [ref=e69]: 
            - generic [ref=e70]: Disabled
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | import { ROUTES } from './sample-app.routes.js';
  3  | 
  4  | // https://playwright.dev/docs/emulation
  5  | test.use({
  6  | 	colorScheme: 'light',
  7  | 	locale: 'de-DE',
  8  | 	isMobile: false,
  9  | 	timezoneId: 'Europe/Berlin',
  10 | 	viewport: {
  11 | 		width: 800,
  12 | 		height: 0,
  13 | 	},
  14 | });
  15 | 
  16 | const DEFAULT_SNAPSHOT_OPTIONS = {
  17 | 	animations: 'disabled',
  18 | 	fullPage: true,
  19 | 	maxDiffPixelRatio: 0,
  20 | 	scale: 'css', // 'css' or 'device'
  21 | 	timeout: 10000,
  22 | };
  23 | 
  24 | ROUTES.forEach((options, route) => {
  25 | 	// Skip unnecessary snapshot tests
  26 | 	if (options?.snapshot?.skip === true && options?.snapshot?.zoom?.skip === true) {
  27 | 		return;
  28 | 	}
  29 | 	test(`snapshot for ${route}`, async ({ page }) => {
  30 | 		const hideMenusParam = `${route.includes('?') ? '&' : '?'}hideMenus`;
  31 | 		await page.goto(`/#${route}${hideMenusParam}`);
  32 | 		await page.waitForLoadState('networkidle');
  33 | 		await page.waitForSelector('.loading', { state: 'hidden' });
  34 | 		await page.addStyleTag({
  35 | 			content: `
  36 | 				* {
  37 | 					transition: none !important;
  38 | 					animation: none !important;
  39 | 				}
  40 | 			`,
  41 | 		});
  42 | 		if (options?.snapshot?.viewportSize) {
  43 | 			await page.setViewportSize(options?.snapshot?.viewportSize);
  44 | 		}
  45 | 		if (options?.snapshot?.waitForTimeout) {
  46 | 			await page.waitForTimeout(options?.snapshot?.waitForTimeout);
  47 | 		}
  48 | 
  49 | 		/**
  50 | 		 * We would like to use a readable name for the snapshot file.
  51 | 		 */
  52 | 		const snapshotName = `snapshot-for-${route.replace(/(\/|\?|&|=)/g, '-')}`;
  53 | 
  54 | 		const SNAPSHOT_OPTIONS = {
  55 | 			...DEFAULT_SNAPSHOT_OPTIONS,
  56 | 			...options?.snapshot?.options,
  57 | 		};
  58 | 
  59 | 		// Skip unnecessary normal tests
  60 | 		if (options?.snapshot?.skip !== true) {
> 61 | 			await expect(page).toHaveScreenshot(`${snapshotName}.png`, SNAPSHOT_OPTIONS);
     |                       ^ Error: expect(page).toHaveScreenshot(expected) failed
  62 | 		}
  63 | 
  64 | 		// Skip unnecessary zoom tests
  65 | 		if (options?.snapshot?.zoom?.skip !== true) {
  66 | 			await page.evaluate(() => {
  67 | 				// eslint-disable-next-line no-undef
  68 | 				document.body.style.zoom = '400%';
  69 | 				// document.body.style.transform = 'scale(4)';
  70 | 				// document.body.style.transformOrigin = 'top left';
  71 | 				// document.body.style.width = '25vw';
  72 | 			});
  73 | 			await expect(page).toHaveScreenshot(`${snapshotName}-zoom.png`, {
  74 | 				...SNAPSHOT_OPTIONS,
  75 | 				...options?.snapshot?.zoom?.options,
  76 | 			});
  77 | 		}
  78 | 	});
  79 | });
  80 | 
```