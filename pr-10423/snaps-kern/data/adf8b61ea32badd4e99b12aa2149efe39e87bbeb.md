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

  Expected an image 500px by 3349px, received 500px by 3577px. 52926 pixels (ratio 0.03 of all image pixels) are different.

  Snapshot: snapshot-for-input-checkbox-button-noColumns.png

Call log:
  - Expect "toHaveScreenshot(snapshot-for-input-checkbox-button-noColumns.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 500px by 3349px, received 500px by 3577px. 52926 pixels (ratio 0.03 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - Expected an image 500px by 3349px, received 500px by 3577px. 52926 pixels (ratio 0.03 of all image pixels) are different.

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
                - generic [ref=e98]:
                  - generic [ref=e99]: Error
                  - generic [ref=e100]: 
                  - generic [ref=e102]: I am an error message!
              - generic [ref=e103]: Hint text
            - generic [ref=e107]:
              - generic [ref=e110] [cursor=pointer]:
                - generic [ref=e111]: With access key
                - generic [ref=e112]: c
              - generic [ref=e113]:
                - generic:
                  - generic: 
                  - checkbox "With access key" [ref=e114] [cursor=pointer]
            - generic [ref=e118]:
              - generic [ref=e121] [cursor=pointer]:
                - generic [ref=e122]: With short key
                - generic [ref=e123]: s
              - generic [ref=e124]:
                - generic:
                  - generic: 
                  - checkbox "With short key" [ref=e125] [cursor=pointer]
        - group "Label align \"left\" without Label (hideLabel)" [ref=e126]:
          - generic [ref=e127]: Label align "left" without Label (hideLabel)
          - generic [ref=e128]:
            - generic [ref=e133]:
              - generic:
                - generic: 
                - checkbox "Not selected" [ref=e134] [cursor=pointer]
            - generic [ref=e139]:
              - generic:
                - generic: 
                - checkbox "Indeterminate" [checked=mixed] [ref=e140] [cursor=pointer]
            - generic [ref=e145]:
              - generic:
                - generic: 
                - checkbox "Selected" [checked] [ref=e146] [cursor=pointer]
            - generic [ref=e151]:
              - generic:
                - generic: 
                - checkbox "With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals" [checked] [ref=e152] [cursor=pointer]
            - generic [ref=e154]:
              - generic [ref=e157]:
                - generic:
                  - generic: 
                  - checkbox "Disabled" [disabled] [ref=e158]
              - generic [ref=e159]: Hint text
            - generic [ref=e164]:
              - generic:
                - generic: 
                - checkbox "Checked and disabled" [checked] [disabled] [ref=e165]
            - generic [ref=e170]:
              - generic:
                - generic: 
                - checkbox "Indeterminate and disabled" [checked=mixed] [disabled] [ref=e171]
            - generic [ref=e173]:
              - generic [ref=e176]:
                - generic:
                  - generic: 
                  - checkbox "With error" [ref=e177] [cursor=pointer]
              - alert [ref=e178]:
                - generic [ref=e179]:
                  - generic [ref=e180]: Error
                  - generic [ref=e181]: 
                  - generic [ref=e183]: I am an error message!
              - generic [ref=e184]: Hint text
            - generic [ref=e189]:
              - generic:
                - generic: 
                - checkbox "With access key" [ref=e190] [cursor=pointer]
            - generic [ref=e195]:
              - generic:
                - generic: 
                - checkbox "With short key" [ref=e196] [cursor=pointer]
      - generic [ref=e197]:
        - group "Label align \"right\" with label" [ref=e198]:
          - generic [ref=e199]: Label align "right" with label
          - generic [ref=e200]:
            - generic [ref=e204]:
              - generic [ref=e205]:
                - generic:
                  - generic: 
                  - checkbox "Not selected" [ref=e206] [cursor=pointer]
              - generic [ref=e210] [cursor=pointer]: Not selected
            - generic [ref=e214]:
              - generic [ref=e215]:
                - generic:
                  - generic: 
                  - checkbox "Indeterminate" [checked=mixed] [ref=e216] [cursor=pointer]
              - generic [ref=e220] [cursor=pointer]: Indeterminate
            - generic [ref=e224]:
              - generic [ref=e225]:
                - generic:
                  - generic: 
                  - checkbox "Selected" [checked] [ref=e226] [cursor=pointer]
              - generic [ref=e229] [cursor=pointer]:
                - generic [ref=e230]: Selected
                - generic [ref=e231]: A
            - generic [ref=e235]:
              - generic [ref=e236]:
                - generic:
                  - generic: 
                  - checkbox "With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals" [checked] [ref=e237] [cursor=pointer]
              - generic [ref=e241] [cursor=pointer]: With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals
            - generic [ref=e243]:
              - generic [ref=e245]:
                - generic [ref=e246]:
                  - generic:
                    - generic: 
                    - checkbox "Disabled" [disabled] [ref=e247]
                - generic [ref=e251]: Disabled
              - generic [ref=e252]: Hint text
            - generic [ref=e256]:
              - generic [ref=e257]:
                - generic:
                  - generic: 
                  - checkbox "Checked and disabled" [checked] [disabled] [ref=e258]
              - generic [ref=e262]: Checked and disabled
            - generic [ref=e266]:
              - generic [ref=e267]:
                - generic:
                  - generic: 
                  - checkbox "Indeterminate and disabled" [checked=mixed] [disabled] [ref=e268]
              - generic [ref=e272]: Indeterminate and disabled
            - generic [ref=e274]:
              - generic [ref=e276]:
                - generic [ref=e277]:
                  - generic:
                    - generic: 
                    - checkbox "With error" [ref=e278] [cursor=pointer]
                - generic [ref=e282] [cursor=pointer]: With error
              - alert [ref=e283]:
                - generic [ref=e284]:
                  - generic [ref=e285]: Error
                  - generic [ref=e286]: 
                  - generic [ref=e288]: I am an error message!
              - generic [ref=e289]: Hint text
            - generic [ref=e293]:
              - generic [ref=e294]:
                - generic:
                  - generic: 
                  - checkbox "With access key" [ref=e295] [cursor=pointer]
              - generic [ref=e298] [cursor=pointer]:
                - generic [ref=e299]: With access key
                - generic [ref=e300]: c
            - generic [ref=e304]:
              - generic [ref=e305]:
                - generic:
                  - generic: 
                  - checkbox "With short key" [ref=e306] [cursor=pointer]
              - generic [ref=e309] [cursor=pointer]:
                - generic [ref=e310]: With short key
                - generic [ref=e311]: s
        - group "Label align \"right\" without Label (hideLabel)" [ref=e312]:
          - generic [ref=e313]: Label align "right" without Label (hideLabel)
          - generic [ref=e314]:
            - generic [ref=e319]:
              - generic:
                - generic: 
                - checkbox "Not selected" [ref=e320] [cursor=pointer]
            - generic [ref=e325]:
              - generic:
                - generic: 
                - checkbox "Indeterminate" [checked=mixed] [ref=e326] [cursor=pointer]
            - generic [ref=e331]:
              - generic:
                - generic: 
                - checkbox "Selected" [checked] [ref=e332] [cursor=pointer]
            - generic [ref=e337]:
              - generic:
                - generic: 
                - checkbox "With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals" [checked] [ref=e338] [cursor=pointer]
            - generic [ref=e340]:
              - generic [ref=e343]:
                - generic:
                  - generic: 
                  - checkbox "Disabled" [disabled] [ref=e344]
              - generic [ref=e345]: Hint text
            - generic [ref=e350]:
              - generic:
                - generic: 
                - checkbox "Checked and disabled" [checked] [disabled] [ref=e351]
            - generic [ref=e356]:
              - generic:
                - generic: 
                - checkbox "Indeterminate and disabled" [checked=mixed] [disabled] [ref=e357]
            - generic [ref=e359]:
              - generic [ref=e362]:
                - generic:
                  - generic: 
                  - checkbox "With error" [ref=e363] [cursor=pointer]
              - alert [ref=e364]:
                - generic [ref=e365]:
                  - generic [ref=e366]: Error
                  - generic [ref=e367]: 
                  - generic [ref=e369]: I am an error message!
              - generic [ref=e370]: Hint text
            - generic [ref=e375]:
              - generic:
                - generic: 
                - checkbox "With access key" [ref=e376] [cursor=pointer]
            - generic [ref=e381]:
              - generic:
                - generic: 
                - checkbox "With short key" [ref=e382] [cursor=pointer]
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