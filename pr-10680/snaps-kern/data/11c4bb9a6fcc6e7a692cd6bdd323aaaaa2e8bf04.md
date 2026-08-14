# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-snapshots.spec.js >> snapshot for toast/configurator
- Location: tests/theme-snapshots.spec.js:29:2

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  191 pixels (ratio 0.01 of all image pixels) are different.

  Snapshot: snapshot-for-toast-configurator.png

Call log:
  - Expect "toHaveScreenshot(snapshot-for-toast-configurator.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 191 pixels (ratio 0.01 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - 191 pixels (ratio 0.01 of all image pixels) are different.

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - button "Close all notifications" [ref=e5] [cursor=pointer]:
      - generic [ref=e8]: Close all notifications
    - alert [ref=e10]:
      - generic [ref=e11]: Error
      - generic [ref=e12]: 
      - strong [ref=e13]: Toast with type 'error'
      - button "Close notification" [ref=e15] [cursor=pointer]:
        - generic [ref=e18]: 
      - generic [ref=e20]: Toasty
    - alert [ref=e22]:
      - generic [ref=e23]: Warning
      - generic [ref=e24]: 
      - strong [ref=e25]: Toast with type 'warning'
      - button "Close notification" [ref=e27] [cursor=pointer]:
        - generic [ref=e30]: 
      - generic [ref=e32]: Toasty
    - alert [ref=e34]:
      - generic [ref=e35]: Success
      - generic [ref=e36]: 
      - strong [ref=e37]: Toast with type 'success'
      - button "Close notification" [ref=e39] [cursor=pointer]:
        - generic [ref=e42]: 
      - generic [ref=e44]: Toasty
    - alert [ref=e46]:
      - generic [ref=e47]: Note
      - generic [ref=e48]: 
      - strong [ref=e49]: Toast with type 'info'
      - button "Close notification" [ref=e51] [cursor=pointer]:
        - generic [ref=e54]: 
      - generic [ref=e56]: Toasty
    - alert [ref=e58]:
      - generic [ref=e59]: Message
      - generic [ref=e60]: 
      - strong [ref=e61]: Toast with type 'default'
      - button "Close notification" [ref=e63] [cursor=pointer]:
        - generic [ref=e66]: 
      - generic [ref=e68]: Toasty
  - main [ref=e71]:
    - generic [ref=e74]:
      - generic [ref=e75]: Error
      - generic [ref=e76]: 
      - strong [ref=e77]: Component is DEPRECATED
      - generic [ref=e78]:
        - generic:
          - text: For more information, please refer
          - link "to the documentation Opens in new tab." [ref=e81] [cursor=pointer]:
            - /url: https://public-ui.github.io/en/docs/components/toaster
            - generic [ref=e84]: to the documentation
            - img "Opens in new tab." [ref=e85]: 
          - text: .
    - heading "toast configurator" [level=1] [ref=e86]
    - generic [ref=e87]:
      - group "Toast type" [ref=e89]:
        - generic [ref=e93] [cursor=pointer]: Toast type
        - generic [ref=e94]:
          - generic [ref=e95]:
            - radio "default" [checked] [ref=e98] [cursor=pointer]
            - generic [ref=e102] [cursor=pointer]: default
          - generic [ref=e103]:
            - radio "info" [ref=e106] [cursor=pointer]
            - generic [ref=e110] [cursor=pointer]: info
          - generic [ref=e111]:
            - radio "success" [ref=e114] [cursor=pointer]
            - generic [ref=e118] [cursor=pointer]: success
          - generic [ref=e119]:
            - radio "warning" [ref=e122] [cursor=pointer]
            - generic [ref=e126] [cursor=pointer]: warning
          - generic [ref=e127]:
            - radio "error" [ref=e130] [cursor=pointer]
            - generic [ref=e134] [cursor=pointer]: error
      - generic [ref=e135]:
        - button "Open default toast" [ref=e138] [cursor=pointer]:
          - generic [ref=e141]: Open default toast
        - button "Close all toasts" [ref=e144] [cursor=pointer]:
          - generic [ref=e147]: Close all toasts
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