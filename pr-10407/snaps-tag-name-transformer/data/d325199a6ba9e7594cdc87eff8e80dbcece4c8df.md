# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-snapshots.spec.js >> snapshot for link/basic
- Location: tests/theme-snapshots.spec.js:29:2

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  Expected an image 800px by 546px, received 106px by 1417px. 13648 pixels (ratio 0.02 of all image pixels) are different.

  Snapshot: snapshot-for-link-basic.png

Call log:
  - Expect "toHaveScreenshot(snapshot-for-link-basic.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 800px by 546px, received 106px by 1417px. 13648 pixels (ratio 0.02 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - Expected an image 800px by 546px, received 106px by 1417px. 13648 pixels (ratio 0.02 of all image pixels) are different.

```

# Page snapshot

```yaml
- main [ref=e1]:
  - heading "link basic" [level=1] [ref=e2]
  - generic:
    - link "Simple Link" [ref=e5] [cursor=pointer]:
      - /url: "#/back-page"
      - generic [ref=e8]: Simple Link
    - link "Simple Link (disabled)" [disabled] [ref=e11]:
      - /url: "#/back-page"
      - generic [ref=e14]: Simple Link (disabled)
    - link "Icon Link" [ref=e17] [cursor=pointer]:
      - /url: "#/back-page"
      - generic [ref=e20]: 
    - link "Icon Link (disabled)" [disabled] [ref=e23]:
      - /url: "#/back-page"
      - generic [ref=e26]: 
    - paragraph [ref=e27]:
      - text: In this paragraph, a link is inserted that contains no additional attributes.
      - link "Simple Link" [ref=e30] [cursor=pointer]:
        - /url: "#/back-page"
        - generic [ref=e33]: Simple Link
      - text: It is rendered by default as a
      - strong [ref=e34]: inline element
      - text: .
    - paragraph [ref=e35]:
      - text: In this paragraph, a link is inserted that is rendered as an inline-block element.
      - link "Simple Link" [ref=e38] [cursor=pointer]:
        - /url: "#/back-page"
        - generic [ref=e40]:
          - generic [ref=e41]: Simple Link
          - generic [ref=e42]: S
      - text: . This allows you to assign width, height, and other properties to it using CSS styles.
      - text: After that, there is a link that is rendered as a block element.
      - link "Simple Link" [ref=e45] [cursor=pointer]:
        - /url: "#/back-page"
        - generic [ref=e48]: Simple Link
      - text: ", therefore, I span the entire width of the parent element, causing a line break."
    - link "Special Variant Link" [ref=e51] [cursor=pointer]:
      - /url: "#/back-page"
      - generic [ref=e54]: Special Variant Link
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