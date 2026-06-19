# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-snapshots.spec.js >> snapshot for input-checkbox/basic?noColumns
- Location: tests/theme-snapshots.spec.js:29:2

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  Expected an image 500px by 3014px, received 500px by 3242px. 53150 pixels (ratio 0.04 of all image pixels) are different.

  Snapshot: snapshot-for-input-checkbox-basic-noColumns.png

Call log:
  - Expect "toHaveScreenshot(snapshot-for-input-checkbox-basic-noColumns.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 500px by 3014px, received 500px by 3242px. 53150 pixels (ratio 0.04 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - Expected an image 500px by 3014px, received 500px by 3242px. 53150 pixels (ratio 0.04 of all image pixels) are different.

```

# Page snapshot

```yaml
- main [ref=e4]:
  - heading "input-checkbox basic" [level=1] [ref=e5]
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
              - generic [ref=e24] [cursor=pointer]:
                - text: 
                - checkbox "Not selected" [ref=e25]
            - generic [ref=e29]:
              - generic [ref=e33] [cursor=pointer]: Indeterminate
              - generic [ref=e35] [cursor=pointer]:
                - generic: 
                - checkbox "Indeterminate" [checked=mixed] [ref=e36]
            - generic [ref=e40]:
              - generic [ref=e43] [cursor=pointer]:
                - generic [ref=e44]: Selected
                - generic [ref=e45]: A
              - generic [ref=e47] [cursor=pointer]:
                - generic: 
                - checkbox "Selected" [checked] [ref=e48]
            - generic [ref=e52]:
              - generic [ref=e56] [cursor=pointer]: With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals
              - generic [ref=e58] [cursor=pointer]:
                - generic: 
                - checkbox "With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals" [checked] [ref=e59]
            - generic [ref=e61]:
              - generic [ref=e63]:
                - generic [ref=e67]: Disabled
                - generic [ref=e69]:
                  - text: 
                  - checkbox "Disabled" [disabled] [ref=e70]
              - generic [ref=e71]: Hint text
            - generic [ref=e75]:
              - generic [ref=e79]: Checked and disabled
              - generic [ref=e81]:
                - generic: 
                - checkbox "Checked and disabled" [checked] [disabled] [ref=e82]
            - generic [ref=e86]:
              - generic [ref=e90]: Indeterminate and disabled
              - generic [ref=e92]:
                - generic: 
                - checkbox "Indeterminate and disabled" [checked=mixed] [disabled] [ref=e93]
            - generic [ref=e95]:
              - generic [ref=e97]:
                - generic [ref=e101] [cursor=pointer]: With error
                - generic [ref=e103] [cursor=pointer]:
                  - text: 
                  - checkbox "With error" [ref=e104]
              - alert [ref=e105]:
                - generic [ref=e106]:
                  - generic [ref=e107]: Error
                  - generic [ref=e108]: 
                  - generic [ref=e109]: I am an error message!
              - generic [ref=e110]: Hint text
            - generic [ref=e114]:
              - generic [ref=e117] [cursor=pointer]:
                - generic [ref=e118]: With access key
                - generic [ref=e119]: c
              - generic [ref=e121] [cursor=pointer]:
                - text: 
                - checkbox "With access key" [ref=e122]
            - generic [ref=e126]:
              - generic [ref=e129] [cursor=pointer]:
                - generic [ref=e130]: With short key
                - generic [ref=e131]: s
              - generic [ref=e133] [cursor=pointer]:
                - text: 
                - checkbox "With short key" [ref=e134]
        - group "Label align \"left\" without Label (hideLabel)" [ref=e135]:
          - generic [ref=e136]: Label align "left" without Label (hideLabel)
          - generic [ref=e137]:
            - generic [ref=e143] [cursor=pointer]:
              - text: 
              - checkbox "Not selected" [ref=e144]
            - generic [ref=e150] [cursor=pointer]:
              - generic: 
              - checkbox "Indeterminate" [checked=mixed] [ref=e151]
            - generic [ref=e157] [cursor=pointer]:
              - generic: 
              - checkbox "Selected" [checked] [ref=e158]
            - generic [ref=e164] [cursor=pointer]:
              - generic: 
              - checkbox "With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals" [checked] [ref=e165]
            - generic [ref=e167]:
              - generic [ref=e171]:
                - text: 
                - checkbox "Disabled" [disabled] [ref=e172]
              - generic [ref=e173]: Hint text
            - generic [ref=e179]:
              - generic: 
              - checkbox "Checked and disabled" [checked] [disabled] [ref=e180]
            - generic [ref=e186]:
              - generic: 
              - checkbox "Indeterminate and disabled" [checked=mixed] [disabled] [ref=e187]
            - generic [ref=e189]:
              - generic [ref=e193] [cursor=pointer]:
                - text: 
                - checkbox "With error" [ref=e194]
              - alert [ref=e195]:
                - generic [ref=e196]:
                  - generic [ref=e197]: Error
                  - generic [ref=e198]: 
                  - generic [ref=e199]: I am an error message!
              - generic [ref=e200]: Hint text
            - generic [ref=e206] [cursor=pointer]:
              - text: 
              - checkbox "With access key" [ref=e207]
            - generic [ref=e213] [cursor=pointer]:
              - text: 
              - checkbox "With short key" [ref=e214]
      - generic [ref=e215]:
        - group "Label align \"right\" with label" [ref=e216]:
          - generic [ref=e217]: Label align "right" with label
          - generic [ref=e218]:
            - generic [ref=e222]:
              - generic [ref=e224] [cursor=pointer]:
                - text: 
                - checkbox "Not selected" [ref=e225]
              - generic [ref=e229] [cursor=pointer]: Not selected
            - generic [ref=e233]:
              - generic [ref=e235] [cursor=pointer]:
                - generic: 
                - checkbox "Indeterminate" [checked=mixed] [ref=e236]
              - generic [ref=e240] [cursor=pointer]: Indeterminate
            - generic [ref=e244]:
              - generic [ref=e246] [cursor=pointer]:
                - generic: 
                - checkbox "Selected" [checked] [ref=e247]
              - generic [ref=e250] [cursor=pointer]:
                - generic [ref=e251]: Selected
                - generic [ref=e252]: A
            - generic [ref=e256]:
              - generic [ref=e258] [cursor=pointer]:
                - generic: 
                - checkbox "With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals" [checked] [ref=e259]
              - generic [ref=e263] [cursor=pointer]: With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals
            - generic [ref=e265]:
              - generic [ref=e267]:
                - generic [ref=e269]:
                  - text: 
                  - checkbox "Disabled" [disabled] [ref=e270]
                - generic [ref=e274]: Disabled
              - generic [ref=e275]: Hint text
            - generic [ref=e279]:
              - generic [ref=e281]:
                - generic: 
                - checkbox "Checked and disabled" [checked] [disabled] [ref=e282]
              - generic [ref=e286]: Checked and disabled
            - generic [ref=e290]:
              - generic [ref=e292]:
                - generic: 
                - checkbox "Indeterminate and disabled" [checked=mixed] [disabled] [ref=e293]
              - generic [ref=e297]: Indeterminate and disabled
            - generic [ref=e299]:
              - generic [ref=e301]:
                - generic [ref=e303] [cursor=pointer]:
                  - text: 
                  - checkbox "With error" [ref=e304]
                - generic [ref=e308] [cursor=pointer]: With error
              - alert [ref=e309]:
                - generic [ref=e310]:
                  - generic [ref=e311]: Error
                  - generic [ref=e312]: 
                  - generic [ref=e313]: I am an error message!
              - generic [ref=e314]: Hint text
            - generic [ref=e318]:
              - generic [ref=e320] [cursor=pointer]:
                - text: 
                - checkbox "With access key" [ref=e321]
              - generic [ref=e324] [cursor=pointer]:
                - generic [ref=e325]: With access key
                - generic [ref=e326]: c
            - generic [ref=e330]:
              - generic [ref=e332] [cursor=pointer]:
                - text: 
                - checkbox "With short key" [ref=e333]
              - generic [ref=e336] [cursor=pointer]:
                - generic [ref=e337]: With short key
                - generic [ref=e338]: s
        - group "Label align \"right\" without Label (hideLabel)" [ref=e339]:
          - generic [ref=e340]: Label align "right" without Label (hideLabel)
          - generic [ref=e341]:
            - generic [ref=e347] [cursor=pointer]:
              - text: 
              - checkbox "Not selected" [ref=e348]
            - generic [ref=e354] [cursor=pointer]:
              - generic: 
              - checkbox "Indeterminate" [checked=mixed] [ref=e355]
            - generic [ref=e361] [cursor=pointer]:
              - generic: 
              - checkbox "Selected" [checked] [ref=e362]
            - generic [ref=e368] [cursor=pointer]:
              - generic: 
              - checkbox "With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals With a very long label and upheavals" [checked] [ref=e369]
            - generic [ref=e371]:
              - generic [ref=e375]:
                - text: 
                - checkbox "Disabled" [disabled] [ref=e376]
              - generic [ref=e377]: Hint text
            - generic [ref=e383]:
              - generic: 
              - checkbox "Checked and disabled" [checked] [disabled] [ref=e384]
            - generic [ref=e390]:
              - generic: 
              - checkbox "Indeterminate and disabled" [checked=mixed] [disabled] [ref=e391]
            - generic [ref=e393]:
              - generic [ref=e397] [cursor=pointer]:
                - text: 
                - checkbox "With error" [ref=e398]
              - alert [ref=e399]:
                - generic [ref=e400]:
                  - generic [ref=e401]: Error
                  - generic [ref=e402]: 
                  - generic [ref=e403]: I am an error message!
              - generic [ref=e404]: Hint text
            - generic [ref=e410] [cursor=pointer]:
              - text: 
              - checkbox "With access key" [ref=e411]
            - generic [ref=e417] [cursor=pointer]:
              - text: 
              - checkbox "With short key" [ref=e418]
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