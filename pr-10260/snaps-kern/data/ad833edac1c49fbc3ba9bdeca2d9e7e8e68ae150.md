# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-snapshots.spec.js >> snapshot for input-date/basic?noColumns
- Location: tests/theme-snapshots.spec.js:29:2

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  Expected an image 500px by 4235px, received 500px by 4715px. 135200 pixels (ratio 0.06 of all image pixels) are different.

  Snapshot: snapshot-for-input-date-basic-noColumns.png

Call log:
  - Expect "toHaveScreenshot(snapshot-for-input-date-basic-noColumns.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 500px by 4235px, received 500px by 4715px. 135200 pixels (ratio 0.06 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - Expected an image 500px by 4235px, received 500px by 4715px. 135200 pixels (ratio 0.06 of all image pixels) are different.

```

# Page snapshot

```yaml
- main [ref=e4]:
  - heading "input-date basic" [level=1] [ref=e5]
  - generic [ref=e7]:
    - paragraph [ref=e8]:
      - generic [ref=e9]: Form fields marked with an asterisk (*) are mandatory.
    - generic [ref=e11]:
      - group "Date" [ref=e12]:
        - generic [ref=e13]: Date
        - generic [ref=e14]:
          - generic [ref=e17]:
            - generic [ref=e21] [cursor=pointer]: Date input (Black background test)
            - textbox "Date input (Black background test)" [ref=e25]
          - generic [ref=e28]:
            - generic [ref=e32] [cursor=pointer]: Local-Datetime (Standard)
            - textbox "Local-Datetime (Standard)" [ref=e36]
          - generic [ref=e39]:
            - generic [ref=e43] [cursor=pointer]: Local datetime (with seconds)
            - textbox "Local datetime (with seconds)" [ref=e47]
            - alert [ref=e49]:
              - generic [ref=e50]:
                - generic [ref=e51]: Error
                - generic [ref=e52]: 
                - generic [ref=e54]: I am an error message!
            - generic [ref=e55]: I am a hint.
          - generic [ref=e57]:
            - generic [ref=e61] [cursor=pointer]: Date
            - textbox "Date" [ref=e65]
            - alert [ref=e67]:
              - generic [ref=e68]:
                - generic [ref=e69]: Note
                - generic [ref=e70]: 
                - generic [ref=e72]: Just a hint
          - generic [ref=e74]:
            - generic [ref=e78] [cursor=pointer]: Date
            - textbox "Date" [ref=e82]
            - alert [ref=e84]:
              - generic [ref=e85]:
                - generic [ref=e86]: Warning
                - generic [ref=e87]: 
                - generic [ref=e89]: Small warning
          - generic [ref=e91]:
            - generic [ref=e95] [cursor=pointer]: Date
            - textbox "Date" [ref=e99]
            - alert [ref=e101]:
              - generic [ref=e102]:
                - generic [ref=e103]: Success
                - generic [ref=e104]: 
                - generic [ref=e106]: Success message
          - generic [ref=e108]:
            - generic [ref=e112] [cursor=pointer]: Date
            - textbox "Date" [ref=e116]
            - alert [ref=e118]:
              - generic [ref=e119]:
                - generic [ref=e120]: Message
                - generic [ref=e121]: 
                - generic [ref=e123]: Default message
          - generic [ref=e125]:
            - generic [ref=e129] [cursor=pointer]: Month
            - textbox "Month" [ref=e133]
          - generic [ref=e136]:
            - generic [ref=e139] [cursor=pointer]:
              - generic [ref=e140]: Week
              - generic [ref=e141]: W
            - textbox "Week" [ref=e145]
          - generic [ref=e148]:
            - generic [ref=e152] [cursor=pointer]: Time (standard)
            - textbox "Time (standard)" [ref=e156]
          - generic [ref=e159]:
            - generic [ref=e163] [cursor=pointer]: Time (with seconds)
            - textbox "Time (with seconds)" [ref=e167]
          - generic [ref=e170]:
            - generic [ref=e174] [cursor=pointer]: Date input (read-only)
            - textbox "Date input (read-only)" [ref=e178]
          - generic [ref=e181]:
            - generic [ref=e185]: Date input (Disabled)
            - textbox "Date input (Disabled)" [disabled] [ref=e189]
          - generic [ref=e192]:
            - generic [ref=e195] [cursor=pointer]:
              - generic [ref=e196]: With access key
              - generic [ref=e197]: s
            - textbox "With access key" [ref=e201]
          - generic [ref=e204]:
            - generic [ref=e207] [cursor=pointer]:
              - generic [ref=e208]: With short key
              - generic [ref=e209]: s
            - textbox "With short key" [ref=e213]
      - group "Date (hideLabel)" [ref=e215]:
        - generic [ref=e216]: Date (hideLabel)
        - generic [ref=e217]:
          - textbox "Date input (Black background test)" [ref=e224]
          - textbox "Local-Datetime (Standard)" [ref=e231]
          - generic [ref=e234]:
            - textbox "Local datetime (with seconds)" [ref=e238]
            - alert [ref=e240]:
              - generic [ref=e241]:
                - generic [ref=e242]: Error
                - generic [ref=e243]: 
                - generic [ref=e245]: I am an error message!
            - generic [ref=e246]: I am a hint.
          - generic [ref=e248]:
            - textbox "Date" [ref=e252]
            - alert [ref=e254]:
              - generic [ref=e255]:
                - generic [ref=e256]: Note
                - generic [ref=e257]: 
                - generic [ref=e259]: Just a hint
          - generic [ref=e261]:
            - textbox "Date" [ref=e265]
            - alert [ref=e267]:
              - generic [ref=e268]:
                - generic [ref=e269]: Warning
                - generic [ref=e270]: 
                - generic [ref=e272]: Small warning
          - generic [ref=e274]:
            - textbox "Date" [ref=e278]
            - alert [ref=e280]:
              - generic [ref=e281]:
                - generic [ref=e282]: Success
                - generic [ref=e283]: 
                - generic [ref=e285]: Success message
          - generic [ref=e287]:
            - textbox "Date" [ref=e291]
            - alert [ref=e293]:
              - generic [ref=e294]:
                - generic [ref=e295]: Message
                - generic [ref=e296]: 
                - generic [ref=e298]: Default message
          - textbox "Month" [ref=e304]
          - textbox "Week" [ref=e311]
          - textbox "Time (standard)" [ref=e318]
          - textbox "Time (with seconds)" [ref=e325]
          - textbox "Date input (read-only)" [ref=e332]
          - textbox "Date input (Disabled)" [disabled] [ref=e339]
          - textbox "With access key" [ref=e346]
          - textbox "With short key" [ref=e353]
      - group "Date (with min/max)" [ref=e355]:
        - generic [ref=e356]: Date (with min/max)
        - generic [ref=e357]:
          - generic [ref=e359]:
            - generic [ref=e363] [cursor=pointer]: Date with Iso
            - textbox "Date with Iso" [ref=e367]
          - generic [ref=e370]:
            - generic [ref=e374] [cursor=pointer]: Date with Date
            - textbox "Date with Date" [ref=e378]
          - generic [ref=e381]:
            - generic [ref=e385] [cursor=pointer]: Time with Iso
            - textbox "Time with Iso" [ref=e389]
          - generic [ref=e392]:
            - generic [ref=e396] [cursor=pointer]: Time with Date
            - textbox "Time with Date" [ref=e400]
          - generic [ref=e403]:
            - generic [ref=e407] [cursor=pointer]: DayTime with Iso
            - textbox "DayTime with Iso" [ref=e411]
          - generic [ref=e414]:
            - generic [ref=e418] [cursor=pointer]: DayTime with Date
            - textbox "DayTime with Date" [ref=e422]
          - generic [ref=e425]:
            - generic [ref=e429] [cursor=pointer]: Week with Iso
            - textbox "Week with Iso" [ref=e433]
          - generic [ref=e436]:
            - generic [ref=e440] [cursor=pointer]: Week with Date
            - textbox "Week with Date" [ref=e444]
          - generic [ref=e447]:
            - generic [ref=e451] [cursor=pointer]: Month with Iso
            - textbox "Month with Iso" [ref=e455]
          - generic [ref=e458]:
            - generic [ref=e462] [cursor=pointer]: Month with Date
            - textbox "Month with Date" [ref=e466]
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