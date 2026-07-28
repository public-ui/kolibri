# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-snapshots.spec.js >> snapshot for scenarios/same-height-of-all-interactive-elements
- Location: tests/theme-snapshots.spec.js:29:2

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  Expected an image 800px by 392px, received 206px by 978px. 22282 pixels (ratio 0.03 of all image pixels) are different.

  Snapshot: snapshot-for-scenarios-same-height-of-all-interactive-elements.png

Call log:
  - Expect "toHaveScreenshot(snapshot-for-scenarios-same-height-of-all-interactive-elements.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 800px by 392px, received 206px by 978px. 22282 pixels (ratio 0.03 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - Expected an image 800px by 392px, received 206px by 978px. 22282 pixels (ratio 0.03 of all image pixels) are different.

```

# Page snapshot

```yaml
- main [ref=e1]:
  - heading "scenarios same-height-of-all-interactive-elements" [level=1] [ref=e2]
  - generic:
    - button "Button" [ref=e4] [cursor=pointer]:
      - generic [ref=e6]:
        - generic [ref=e7]: 
        - generic [ref=e8]: Button
    - button "Button" [ref=e10] [cursor=pointer]:
      - generic [ref=e11]: 
    - generic:
      - generic:
        - link "Link-Button":
          - /url: "#"
          - generic [ref=e15] [cursor=pointer]:
            - generic [ref=e16]: 
            - generic [ref=e17]: Link-Button
    - generic:
      - generic:
        - link "Link-Button":
          - /url: "#"
          - generic [ref=e18] [cursor=pointer]: 
    - generic [ref=e22]:
      - generic [ref=e23]: 
      - generic [ref=e26]:
        - combobox "Combobox" [ref=e27]
        - button [ref=e28] [cursor=pointer]:
          - generic [ref=e29]: 
    - generic [ref=e31]:
      - generic [ref=e32]: 
      - generic [ref=e35]:
        - textbox [ref=e36] [cursor=pointer]: "#000000"
        - textbox "Input-Color" [ref=e37] [cursor=pointer]: "#000000"
    - generic [ref=e39]:
      - generic [ref=e40]: 
      - generic [ref=e42]:
        - generic: Choose a file or drop it here...
        - button "Input-File" [ref=e43] [cursor=pointer]
        - button "Browse" [ref=e45] [cursor=pointer]
    - generic [ref=e50]:
      - generic [ref=e51]: 
      - textbox "Input-Date" [ref=e54]
    - generic [ref=e56]:
      - generic [ref=e57]: 
      - textbox "Input-Email" [ref=e60]
    - generic [ref=e62]:
      - generic [ref=e63]:
        - button [ref=e64] [cursor=pointer]:
          - generic [ref=e65]: 
        - generic [ref=e66]: 
      - spinbutton "Input-Number" [ref=e68]
      - button [ref=e70] [cursor=pointer]:
        - generic [ref=e71]: 
    - generic [ref=e73]:
      - generic [ref=e74]: 
      - textbox "Input-Password" [ref=e77]
    - generic [ref=e79]:
      - generic [ref=e80]: 
      - generic [ref=e83]:
        - slider [ref=e84]: "50"
        - spinbutton "Input-Range" [ref=e85]: "50"
    - generic [ref=e87]:
      - generic [ref=e88]: 
      - textbox "Input-Text" [ref=e91]
    - generic [ref=e93]:
      - generic [ref=e94]: 
      - generic [ref=e96]:
        - combobox "Select" [ref=e98] [cursor=pointer]
        - text: 
    - generic [ref=e100]:
      - generic [ref=e101]: 
      - generic [ref=e104]:
        - combobox "Single Select" [ref=e105]
        - generic [ref=e106] [cursor=pointer]: 
    - generic [ref=e108]:
      - generic [ref=e109]: 
      - generic:
        - textbox "Textarea"
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