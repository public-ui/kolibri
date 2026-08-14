# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-snapshots.spec.js >> snapshot for input-checkbox/button?noColumns
- Location: tests/theme-snapshots.spec.js:29:2

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  300 pixels (ratio 0.01 of all image pixels) are different.

  Snapshot: snapshot-for-input-checkbox-button-noColumns.png

Call log:
  - Expect "toHaveScreenshot(snapshot-for-input-checkbox-button-noColumns.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 300 pixels (ratio 0.01 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - 300 pixels (ratio 0.01 of all image pixels) are different.

```

# Page snapshot

```yaml
- main [ref=e4]:
  - heading "input-checkbox button" [level=1] [ref=e5]
  - generic [ref=e7]:
    - paragraph [ref=e8]:
      - generic [ref=e9]: Form fields marked with an asterisk (*) are mandatory.
    - generic [ref=e10]:
      - generic [ref=e11]:
        - group "Label align \"left\" with label" [ref=e12]:
          - generic [ref=e13]: Label align "left" with label
          - generic [ref=e14]:
            - generic [ref=e18]:
              - generic [ref=e22] [cursor=pointer]: Not selected
              - generic [ref=e23]:
                - generic:
                  - generic: 
                  - checkbox "Not selected" [ref=e24] [cursor=pointer]
            - generic [ref=e28]:
              - generic [ref=e32] [cursor=pointer]: Indeterminate
              - generic [ref=e33]:
                - generic:
                  - generic: 
                  - checkbox "Indeterminate" [checked=mixed] [ref=e34] [cursor=pointer]
            - generic [ref=e38]:
              - generic [ref=e41] [cursor=pointer]:
                - generic [ref=e42]: Selected
                - generic [ref=e43]: A
              - generic [ref=e44]:
                - generic:
                  - generic: 
                  - checkbox "Selected" [checked] [ref=e45] [cursor=pointer]
            - generic [ref=e49]:
              - generic [ref=e53] [cursor=pointer]: With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals
              - generic [ref=e54]:
                - generic:
                  - generic: 
                  - checkbox "With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals" [checked] [ref=e55] [cursor=pointer]
            - generic [ref=e57]:
              - generic [ref=e59]:
                - generic [ref=e63]: Disabled
                - generic [ref=e64]:
                  - generic:
                    - generic: 
                    - checkbox "Disabled" [disabled] [ref=e65]
              - generic [ref=e66]: Hint text
            - generic [ref=e70]:
              - generic [ref=e74]: Checked and disabled
              - generic [ref=e75]:
                - generic:
                  - generic: 
                  - checkbox "Checked and disabled" [checked] [disabled] [ref=e76]
            - generic [ref=e80]:
              - generic [ref=e84]: Indeterminate and disabled
              - generic [ref=e85]:
                - generic:
                  - generic: 
                  - checkbox "Indeterminate and disabled" [checked=mixed] [disabled] [ref=e86]
            - generic [ref=e88]:
              - generic [ref=e90]:
                - generic [ref=e94] [cursor=pointer]: With error
                - generic [ref=e95]:
                  - generic:
                    - generic: 
                    - checkbox "With error" [ref=e96] [cursor=pointer]
              - alert [ref=e97]:
                - generic [ref=e98]: Error
                - generic [ref=e99]: 
                - generic [ref=e100]: I am an error message!
              - generic [ref=e101]: Hint text
            - generic [ref=e105]:
              - generic [ref=e108] [cursor=pointer]:
                - generic [ref=e109]: With access key
                - generic [ref=e110]: c
              - generic [ref=e111]:
                - generic:
                  - generic: 
                  - checkbox "With access key" [ref=e112] [cursor=pointer]
            - generic [ref=e116]:
              - generic [ref=e119] [cursor=pointer]:
                - generic [ref=e120]: With short key
                - generic [ref=e121]: s
              - generic [ref=e122]:
                - generic:
                  - generic: 
                  - checkbox "With short key" [ref=e123] [cursor=pointer]
            - generic [ref=e127]:
              - generic [ref=e131] [cursor=pointer]:
                - generic: Expert Slot & required
              - generic [ref=e132]:
                - generic:
                  - generic: 
                  - checkbox "Expert Slot & required" [ref=e133] [cursor=pointer]
        - group "Label align \"left\" without Label (hideLabel)" [ref=e134]:
          - generic [ref=e135]: Label align "left" without Label (hideLabel)
          - generic [ref=e136]:
            - generic [ref=e141]:
              - generic:
                - generic: 
                - checkbox "Not selected" [ref=e142] [cursor=pointer]
            - generic [ref=e147]:
              - generic:
                - generic: 
                - checkbox "Indeterminate" [checked=mixed] [ref=e148] [cursor=pointer]
            - generic [ref=e153]:
              - generic:
                - generic: 
                - checkbox "Selected" [checked] [ref=e154] [cursor=pointer]
            - generic [ref=e159]:
              - generic:
                - generic: 
                - checkbox "With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals" [checked] [ref=e160] [cursor=pointer]
            - generic [ref=e162]:
              - generic [ref=e165]:
                - generic:
                  - generic: 
                  - checkbox "Disabled" [disabled] [ref=e166]
              - generic [ref=e167]: Hint text
            - generic [ref=e172]:
              - generic:
                - generic: 
                - checkbox "Checked and disabled" [checked] [disabled] [ref=e173]
            - generic [ref=e178]:
              - generic:
                - generic: 
                - checkbox "Indeterminate and disabled" [checked=mixed] [disabled] [ref=e179]
            - generic [ref=e181]:
              - generic [ref=e184]:
                - generic:
                  - generic: 
                  - checkbox "With error" [ref=e185] [cursor=pointer]
              - alert [ref=e186]:
                - generic [ref=e187]: Error
                - generic [ref=e188]: 
                - generic [ref=e189]: I am an error message!
              - generic [ref=e190]: Hint text
            - generic [ref=e195]:
              - generic:
                - generic: 
                - checkbox "With access key" [ref=e196] [cursor=pointer]
            - generic [ref=e201]:
              - generic:
                - generic: 
                - checkbox "With short key" [ref=e202] [cursor=pointer]
            - generic [ref=e207]:
              - generic:
                - generic: 
                - checkbox "Expert Slot & required" [ref=e208] [cursor=pointer]
      - generic [ref=e209]:
        - group "Label align \"right\" with label" [ref=e210]:
          - generic [ref=e211]: Label align "right" with label
          - generic [ref=e212]:
            - generic [ref=e216]:
              - generic [ref=e217]:
                - generic:
                  - generic: 
                  - checkbox "Not selected" [ref=e218] [cursor=pointer]
              - generic [ref=e222] [cursor=pointer]: Not selected
            - generic [ref=e226]:
              - generic [ref=e227]:
                - generic:
                  - generic: 
                  - checkbox "Indeterminate" [checked=mixed] [ref=e228] [cursor=pointer]
              - generic [ref=e232] [cursor=pointer]: Indeterminate
            - generic [ref=e236]:
              - generic [ref=e237]:
                - generic:
                  - generic: 
                  - checkbox "Selected" [checked] [ref=e238] [cursor=pointer]
              - generic [ref=e241] [cursor=pointer]:
                - generic [ref=e242]: Selected
                - generic [ref=e243]: A
            - generic [ref=e247]:
              - generic [ref=e248]:
                - generic:
                  - generic: 
                  - checkbox "With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals" [checked] [ref=e249] [cursor=pointer]
              - generic [ref=e253] [cursor=pointer]: With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals
            - generic [ref=e255]:
              - generic [ref=e257]:
                - generic [ref=e258]:
                  - generic:
                    - generic: 
                    - checkbox "Disabled" [disabled] [ref=e259]
                - generic [ref=e263]: Disabled
              - generic [ref=e264]: Hint text
            - generic [ref=e268]:
              - generic [ref=e269]:
                - generic:
                  - generic: 
                  - checkbox "Checked and disabled" [checked] [disabled] [ref=e270]
              - generic [ref=e274]: Checked and disabled
            - generic [ref=e278]:
              - generic [ref=e279]:
                - generic:
                  - generic: 
                  - checkbox "Indeterminate and disabled" [checked=mixed] [disabled] [ref=e280]
              - generic [ref=e284]: Indeterminate and disabled
            - generic [ref=e286]:
              - generic [ref=e288]:
                - generic [ref=e289]:
                  - generic:
                    - generic: 
                    - checkbox "With error" [ref=e290] [cursor=pointer]
                - generic [ref=e294] [cursor=pointer]: With error
              - alert [ref=e295]:
                - generic [ref=e296]: Error
                - generic [ref=e297]: 
                - generic [ref=e298]: I am an error message!
              - generic [ref=e299]: Hint text
            - generic [ref=e303]:
              - generic [ref=e304]:
                - generic:
                  - generic: 
                  - checkbox "With access key" [ref=e305] [cursor=pointer]
              - generic [ref=e308] [cursor=pointer]:
                - generic [ref=e309]: With access key
                - generic [ref=e310]: c
            - generic [ref=e314]:
              - generic [ref=e315]:
                - generic:
                  - generic: 
                  - checkbox "With short key" [ref=e316] [cursor=pointer]
              - generic [ref=e319] [cursor=pointer]:
                - generic [ref=e320]: With short key
                - generic [ref=e321]: s
            - generic [ref=e325]:
              - generic [ref=e326]:
                - generic:
                  - generic: 
                  - checkbox "Expert Slot & required" [ref=e327] [cursor=pointer]
              - generic [ref=e331] [cursor=pointer]:
                - generic: Expert Slot & required
        - group "Label align \"right\" without Label (hideLabel)" [ref=e332]:
          - generic [ref=e333]: Label align "right" without Label (hideLabel)
          - generic [ref=e334]:
            - generic [ref=e339]:
              - generic:
                - generic: 
                - checkbox "Not selected" [ref=e340] [cursor=pointer]
            - generic [ref=e345]:
              - generic:
                - generic: 
                - checkbox "Indeterminate" [checked=mixed] [ref=e346] [cursor=pointer]
            - generic [ref=e351]:
              - generic:
                - generic: 
                - checkbox "Selected" [checked] [ref=e352] [cursor=pointer]
            - generic [ref=e357]:
              - generic:
                - generic: 
                - checkbox "With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals" [checked] [ref=e358] [cursor=pointer]
            - generic [ref=e360]:
              - generic [ref=e363]:
                - generic:
                  - generic: 
                  - checkbox "Disabled" [disabled] [ref=e364]
              - generic [ref=e365]: Hint text
            - generic [ref=e370]:
              - generic:
                - generic: 
                - checkbox "Checked and disabled" [checked] [disabled] [ref=e371]
            - generic [ref=e376]:
              - generic:
                - generic: 
                - checkbox "Indeterminate and disabled" [checked=mixed] [disabled] [ref=e377]
            - generic [ref=e379]:
              - generic [ref=e382]:
                - generic:
                  - generic: 
                  - checkbox "With error" [ref=e383] [cursor=pointer]
              - alert [ref=e384]:
                - generic [ref=e385]: Error
                - generic [ref=e386]: 
                - generic [ref=e387]: I am an error message!
              - generic [ref=e388]: Hint text
            - generic [ref=e393]:
              - generic:
                - generic: 
                - checkbox "With access key" [ref=e394] [cursor=pointer]
            - generic [ref=e399]:
              - generic:
                - generic: 
                - checkbox "With short key" [ref=e400] [cursor=pointer]
            - generic [ref=e405]:
              - generic:
                - generic: 
                - checkbox "Expert Slot & required" [ref=e406] [cursor=pointer]
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