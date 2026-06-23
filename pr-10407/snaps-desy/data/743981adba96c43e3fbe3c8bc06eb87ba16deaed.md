# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-snapshots.spec.js >> snapshot for alert/card-msg
- Location: tests/theme-snapshots.spec.js:29:2

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  Expected an image 800px by 1916px, received 139px by 20677px. 227046 pixels (ratio 0.02 of all image pixels) are different.

  Snapshot: snapshot-for-alert-card-msg.png

Call log:
  - Expect "toHaveScreenshot(snapshot-for-alert-card-msg.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 800px by 1916px, received 139px by 20677px. 227046 pixels (ratio 0.02 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - Expected an image 800px by 1916px, received 139px by 20677px. 227046 pixels (ratio 0.02 of all image pixels) are different.

```

# Page snapshot

```yaml
- main [ref=e1]:
  - heading "alert card-msg" [level=1] [ref=e2]
  - generic:
    - generic:
      - generic [ref=e5]:
        - generic [ref=e6]:
          - generic [ref=e7]: Message
          - text: 
          - heading "This is the headline level 1 of the alert." [level=1] [ref=e9]
        - generic [ref=e10]:
          - generic: This is the text of the alert.
      - generic [ref=e13]:
        - generic:
          - generic [ref=e14]: Message
          - text: 
        - generic [ref=e15]:
          - generic: In this alert, only the text without the heading is used.
      - generic [ref=e18]:
        - generic [ref=e19]:
          - generic [ref=e20]: Message
          - text: 
          - heading "This is the headline level 1 of the alert." [level=1] [ref=e22]
          - button "Close notification" [ref=e24] [cursor=pointer]:
            - generic [ref=e27]: 
        - generic [ref=e28]:
          - generic: This is the text of the alert. With close button.
      - generic [ref=e31]:
        - generic:
          - generic [ref=e32]: Message
          - text: 
          - button "Close notification" [ref=e34] [cursor=pointer]:
            - generic [ref=e37]: 
        - generic [ref=e38]:
          - generic: In this alert, only the text without the heading is used. With close button.
      - generic [ref=e41]:
        - generic [ref=e42]:
          - generic [ref=e43]: Error
          - generic [ref=e44]: 
          - heading "This is the headline level 2 of the alert." [level=2] [ref=e46]
        - generic [ref=e47]:
          - generic: This is the text of the alert.
      - generic [ref=e50]:
        - generic [ref=e51]:
          - generic [ref=e52]: Error
          - generic [ref=e53]: 
        - generic [ref=e54]:
          - generic: In this alert, only the text without the heading is used.
      - generic [ref=e57]:
        - generic [ref=e58]:
          - generic [ref=e59]: Error
          - generic [ref=e60]: 
          - heading "This is the headline level 2 of the alert." [level=2] [ref=e62]
          - button "Close notification" [ref=e64] [cursor=pointer]:
            - generic [ref=e67]: 
        - generic [ref=e68]:
          - generic: This is the text of the alert. With close button.
      - generic [ref=e71]:
        - generic [ref=e72]:
          - generic [ref=e73]: Error
          - generic [ref=e74]: 
          - button "Close notification" [ref=e76] [cursor=pointer]:
            - generic [ref=e79]: 
        - generic [ref=e80]:
          - generic: In this alert, only the text without the heading is used. With close button.
      - generic [ref=e83]:
        - generic [ref=e84]:
          - generic [ref=e85]: Note
          - generic [ref=e86]: 
          - heading "This is the headline level 3 of the alert." [level=3] [ref=e88]
        - generic [ref=e89]:
          - generic: This is the text of the alert.
      - generic [ref=e92]:
        - generic [ref=e93]:
          - generic [ref=e94]: Note
          - generic [ref=e95]: 
        - generic [ref=e96]:
          - generic: In this alert, only the text without the heading is used.
      - generic [ref=e99]:
        - generic [ref=e100]:
          - generic [ref=e101]: Note
          - generic [ref=e102]: 
          - heading "This is the headline level 3 of the alert." [level=3] [ref=e104]
          - button "Close notification" [ref=e106] [cursor=pointer]:
            - generic [ref=e109]: 
        - generic [ref=e110]:
          - generic: This is the text of the alert. With close button.
      - generic [ref=e113]:
        - generic [ref=e114]:
          - generic [ref=e115]: Note
          - generic [ref=e116]: 
          - button "Close notification" [ref=e118] [cursor=pointer]:
            - generic [ref=e121]: 
        - generic [ref=e122]:
          - generic: In this alert, only the text without the heading is used. With close button.
      - generic [ref=e125]:
        - generic [ref=e126]:
          - generic [ref=e127]: Success
          - generic [ref=e128]: 
          - heading "This is the headline level 4 of the alert." [level=4] [ref=e130]
        - generic [ref=e131]:
          - generic: This is the text of the alert.
      - generic [ref=e134]:
        - generic [ref=e135]:
          - generic [ref=e136]: Success
          - generic [ref=e137]: 
        - generic [ref=e138]:
          - generic: In this alert, only the text without the heading is used.
      - generic [ref=e141]:
        - generic [ref=e142]:
          - generic [ref=e143]: Success
          - generic [ref=e144]: 
          - heading "This is the headline level 4 of the alert." [level=4] [ref=e146]
          - button "Close notification" [ref=e148] [cursor=pointer]:
            - generic [ref=e151]: 
        - generic [ref=e152]:
          - generic: This is the text of the alert. With close button.
      - generic [ref=e155]:
        - generic [ref=e156]:
          - generic [ref=e157]: Success
          - generic [ref=e158]: 
          - button "Close notification" [ref=e160] [cursor=pointer]:
            - generic [ref=e163]: 
        - generic [ref=e164]:
          - generic: In this alert, only the text without the heading is used. With close button.
      - generic [ref=e167]:
        - generic [ref=e168]:
          - generic [ref=e169]: Warning
          - generic [ref=e170]: 
          - heading "This is the headline level 5 of the alert." [level=5] [ref=e172]
        - generic [ref=e173]:
          - generic: This is the text of the alert.
      - generic [ref=e176]:
        - generic [ref=e177]:
          - generic [ref=e178]: Warning
          - generic [ref=e179]: 
        - generic [ref=e180]:
          - generic: In this alert, only the text without the heading is used.
      - generic [ref=e183]:
        - generic [ref=e184]:
          - generic [ref=e185]: Warning
          - generic [ref=e186]: 
          - heading "This is the headline level 5 of the alert." [level=5] [ref=e188]
          - button "Close notification" [ref=e190] [cursor=pointer]:
            - generic [ref=e193]: 
        - generic [ref=e194]:
          - generic: This is the text of the alert. With close button.
      - generic [ref=e197]:
        - generic [ref=e198]:
          - generic [ref=e199]: Warning
          - generic [ref=e200]: 
          - button "Close notification" [ref=e202] [cursor=pointer]:
            - generic [ref=e205]: 
        - generic [ref=e206]:
          - generic: In this alert, only the text without the heading is used. With close button.
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