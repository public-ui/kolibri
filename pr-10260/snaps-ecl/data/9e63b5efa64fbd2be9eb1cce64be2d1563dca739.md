# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-snapshots.spec.js >> snapshot for single-select/basic?noColumns
- Location: tests/theme-snapshots.spec.js:29:2

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  Expected an image 500px by 1703px, received 500px by 1847px. 49541 pixels (ratio 0.06 of all image pixels) are different.

  Snapshot: snapshot-for-single-select-basic-noColumns.png

Call log:
  - Expect "toHaveScreenshot(snapshot-for-single-select-basic-noColumns.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 500px by 1703px, received 500px by 1847px. 49541 pixels (ratio 0.06 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - Expected an image 500px by 1703px, received 500px by 1847px. 49541 pixels (ratio 0.06 of all image pixels) are different.

```

# Page snapshot

```yaml
- main [ref=e4]:
  - heading "single-select basic" [level=1] [ref=e5]
  - generic [ref=e7]:
    - paragraph [ref=e8]:
      - generic [ref=e9]: Form fields marked with an asterisk (*) are mandatory.
    - generic [ref=e11]:
      - group "Text" [ref=e12]:
        - generic [ref=e13]: Text
        - generic [ref=e14]:
          - generic [ref=e16]:
            - generic [ref=e20] [cursor=pointer]: Label
            - generic [ref=e24]:
              - combobox "Label" [ref=e25]: Deutschland
              - button "Delete selection" [ref=e27] [cursor=pointer]:
                - generic [ref=e30]: 
              - generic [ref=e31] [cursor=pointer]: 
            - generic [ref=e33]: I am a hint.
          - generic [ref=e35]:
            - generic [ref=e39]: Disabled
            - generic [ref=e43]:
              - combobox "Disabled" [disabled] [ref=e44]: Deutschland
              - text: 
              - generic [ref=e45]: 
          - generic [ref=e48]:
            - generic [ref=e52] [cursor=pointer]: Label
            - generic [ref=e56]:
              - combobox "Label" [ref=e57]
              - generic [ref=e58] [cursor=pointer]: 
            - alert [ref=e60]:
              - generic [ref=e61]:
                - generic [ref=e62]: Error
                - generic [ref=e63]: 
                - generic [ref=e64]: I am an error message!
          - generic [ref=e66]:
            - generic [ref=e69] [cursor=pointer]:
              - generic [ref=e70]: With access key
              - generic [ref=e71]: c
            - generic [ref=e75]:
              - combobox "With access key" [ref=e76]: Deutschland
              - button "Delete selection" [ref=e78] [cursor=pointer]:
                - generic [ref=e81]: 
              - generic [ref=e82] [cursor=pointer]: 
          - generic [ref=e85]:
            - generic [ref=e88] [cursor=pointer]:
              - generic [ref=e89]: With short key
              - generic [ref=e90]: s
            - generic [ref=e94]:
              - combobox "With short key" [ref=e95]: Deutschland
              - button "Delete selection" [ref=e97] [cursor=pointer]:
                - generic [ref=e100]: 
              - generic [ref=e101] [cursor=pointer]: 
          - generic [ref=e104]:
            - generic [ref=e108] [cursor=pointer]: With long labels
            - generic [ref=e112]:
              - combobox "With long labels" [ref=e113]
              - generic [ref=e114] [cursor=pointer]: 
          - generic [ref=e117]:
            - generic [ref=e121] [cursor=pointer]: With hidden clear button
            - generic [ref=e125]:
              - combobox "With hidden clear button" [ref=e126]: Deutschland
              - generic [ref=e127] [cursor=pointer]: 
          - generic [ref=e130]:
            - generic [ref=e134] [cursor=pointer]: "Boolean option values (Issue #9122)"
            - generic [ref=e138]:
              - 'combobox "Boolean option values (Issue #9122)" [ref=e139]': "False"
              - button "Delete selection" [ref=e141] [cursor=pointer]:
                - generic [ref=e144]: 
              - generic [ref=e145] [cursor=pointer]: 
          - generic [ref=e148]:
            - generic [ref=e152] [cursor=pointer]: With disabled options
            - generic [ref=e156]:
              - combobox "With disabled options" [ref=e157]: Berlin
              - button "Delete selection" [ref=e159] [cursor=pointer]:
                - generic [ref=e162]: 
              - generic [ref=e163] [cursor=pointer]: 
            - generic [ref=e165]: I am a hint.
      - group "Text (hideLabel)" [ref=e166]:
        - generic [ref=e167]: Text (hideLabel)
        - generic [ref=e168]:
          - generic [ref=e170]:
            - generic [ref=e174]:
              - combobox "Label" [ref=e175]: Deutschland
              - button "Delete selection" [ref=e177] [cursor=pointer]:
                - generic [ref=e180]: 
              - generic [ref=e181] [cursor=pointer]: 
            - generic [ref=e183]: I am a hint.
          - generic [ref=e189]:
            - combobox "Disabled" [disabled] [ref=e190]: Deutschland
            - text: 
            - generic [ref=e191]: 
          - generic [ref=e194]:
            - generic [ref=e198]:
              - combobox "Label" [ref=e199]
              - generic [ref=e200] [cursor=pointer]: 
            - alert [ref=e202]:
              - generic [ref=e203]:
                - generic [ref=e204]: Error
                - generic [ref=e205]: 
                - generic [ref=e206]: I am an error message!
          - generic [ref=e212]:
            - combobox "With access key" [ref=e213]: Deutschland
            - button "Delete selection" [ref=e215] [cursor=pointer]:
              - generic [ref=e218]: 
            - generic [ref=e219] [cursor=pointer]: 
          - generic [ref=e226]:
            - combobox "With short key" [ref=e227]: Deutschland
            - button "Delete selection" [ref=e229] [cursor=pointer]:
              - generic [ref=e232]: 
            - generic [ref=e233] [cursor=pointer]: 
          - generic [ref=e240]:
            - combobox "With long labels" [ref=e241]
            - generic [ref=e242] [cursor=pointer]: 
          - generic [ref=e249]:
            - combobox "With hidden clear button" [ref=e250]: Deutschland
            - generic [ref=e251] [cursor=pointer]: 
          - generic [ref=e258]:
            - 'combobox "Boolean option values (Issue #9122)" [ref=e259]': "False"
            - button "Delete selection" [ref=e261] [cursor=pointer]:
              - generic [ref=e264]: 
            - generic [ref=e265] [cursor=pointer]: 
          - generic [ref=e268]:
            - generic [ref=e272]:
              - combobox "With disabled options" [ref=e273]: Berlin
              - button "Delete selection" [ref=e275] [cursor=pointer]:
                - generic [ref=e278]: 
              - generic [ref=e279] [cursor=pointer]: 
            - generic [ref=e281]: I am a hint.
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