# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-snapshots.spec.js >> snapshot for input-number/basic?noColumns
- Location: tests/theme-snapshots.spec.js:29:2

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  Expected an image 500px by 1852px, received 500px by 1858px. 80909 pixels (ratio 0.09 of all image pixels) are different.

  Snapshot: snapshot-for-input-number-basic-noColumns.png

Call log:
  - Expect "toHaveScreenshot(snapshot-for-input-number-basic-noColumns.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 500px by 1852px, received 500px by 1858px. 80909 pixels (ratio 0.09 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - Expected an image 500px by 1852px, received 500px by 1858px. 80909 pixels (ratio 0.09 of all image pixels) are different.

```

# Page snapshot

```yaml
- main [ref=e4]:
  - heading "input-number basic" [level=1] [ref=e5]
  - generic [ref=e7]:
    - paragraph [ref=e8]:
      - generic [ref=e9]: Form fields marked with an asterisk (*) are mandatory.
    - generic [ref=e11]:
      - group "Number" [ref=e12]:
        - generic [ref=e13]: Number
        - generic [ref=e14]:
          - generic [ref=e17]:
            - generic [ref=e21] [cursor=pointer]: Number input (Black background test)
            - generic [ref=e23]:
              - button [ref=e25] [cursor=pointer]:
                - generic [ref=e26]: 
              - spinbutton "Number input (Black background test)" [ref=e28]: "123"
              - button [ref=e30] [cursor=pointer]:
                - generic [ref=e31]: 
          - generic [ref=e33]:
            - generic [ref=e37] [cursor=pointer]: Number input
            - generic [ref=e39]:
              - generic [ref=e40]:
                - button [ref=e41] [cursor=pointer]:
                  - generic [ref=e42]: 
                - generic [ref=e43]: 
              - spinbutton "Number input" [ref=e45]
              - generic [ref=e46]:
                - generic [ref=e47]: 
                - button [ref=e48] [cursor=pointer]:
                  - generic [ref=e49]: 
            - alert [ref=e50]:
              - generic [ref=e51]: Error
              - generic [ref=e52]: 
              - text: I am an error message!
          - generic [ref=e54]:
            - generic [ref=e58] [cursor=pointer]: Number input
            - generic [ref=e60]:
              - button [ref=e62] [cursor=pointer]:
                - generic [ref=e63]: 
              - spinbutton "Number input" [ref=e65]: "123"
              - button [ref=e67] [cursor=pointer]:
                - generic [ref=e68]: 
            - alert [ref=e69]:
              - generic [ref=e70]: Error
              - generic [ref=e71]: 
              - text: I am an error message!
          - generic [ref=e73]:
            - generic [ref=e77] [cursor=pointer]: Number input
            - generic [ref=e79]:
              - button [ref=e81] [cursor=pointer]:
                - generic [ref=e82]: 
              - spinbutton "Number input" [ref=e84]: "123"
              - button [ref=e86] [cursor=pointer]:
                - generic [ref=e87]: 
            - alert [ref=e88]:
              - generic [ref=e89]: Warning
              - generic [ref=e90]: 
              - text: I am an error message!
          - generic [ref=e92]:
            - generic [ref=e96] [cursor=pointer]: Number input
            - generic [ref=e98]:
              - button [ref=e100] [cursor=pointer]:
                - generic [ref=e101]: 
              - spinbutton "Number input" [ref=e103]: "123"
              - button [ref=e105] [cursor=pointer]:
                - generic [ref=e106]: 
            - alert [ref=e107]:
              - generic [ref=e108]: Note
              - generic [ref=e109]: 
              - text: I am an error message!
          - generic [ref=e111]:
            - generic [ref=e115] [cursor=pointer]: Number input
            - generic [ref=e117]:
              - button [ref=e119] [cursor=pointer]:
                - generic [ref=e120]: 
              - spinbutton "Number input" [ref=e122]: "123"
              - button [ref=e124] [cursor=pointer]:
                - generic [ref=e125]: 
            - alert [ref=e126]:
              - generic [ref=e127]: Success
              - generic [ref=e128]: 
              - text: I am an error message!
          - generic [ref=e130]:
            - generic [ref=e133] [cursor=pointer]:
              - generic [ref=e134]: Number input (-10 to 10 in steps of 2)
              - generic [ref=e135]: Z
            - generic [ref=e137]:
              - button [ref=e139] [cursor=pointer]:
                - generic [ref=e140]: 
              - spinbutton "Number input (-10 to 10 in steps of 2)" [ref=e142]
              - button [ref=e144] [cursor=pointer]:
                - generic [ref=e145]: 
          - generic [ref=e147]:
            - generic [ref=e151] [cursor=pointer]: Number input (Readonly)
            - spinbutton "Number input (Readonly)" [ref=e155]: "123"
          - generic [ref=e157]:
            - generic [ref=e161]: Number input (Disabled)
            - spinbutton "Number input (Disabled)" [disabled] [ref=e165]: "123"
          - generic [ref=e167]:
            - generic [ref=e170] [cursor=pointer]:
              - generic [ref=e171]: With access key
              - generic [ref=e172]: c
            - generic [ref=e174]:
              - button [ref=e176] [cursor=pointer]:
                - generic [ref=e177]: 
              - spinbutton "With access key" [ref=e179]
              - button [ref=e181] [cursor=pointer]:
                - generic [ref=e182]: 
          - generic [ref=e184]:
            - generic [ref=e187] [cursor=pointer]:
              - generic [ref=e188]: With short key
              - generic [ref=e189]: s
            - generic [ref=e191]:
              - button [ref=e193] [cursor=pointer]:
                - generic [ref=e194]: 
              - spinbutton "With short key" [ref=e196]
              - button [ref=e198] [cursor=pointer]:
                - generic [ref=e199]: 
      - group "Number (hideLabel)" [ref=e200]:
        - generic [ref=e201]: Number (hideLabel)
        - generic [ref=e202]:
          - generic [ref=e207]:
            - button [ref=e209] [cursor=pointer]:
              - generic [ref=e210]: 
            - spinbutton "Number input (Black background test)" [ref=e212]: "123"
            - button [ref=e214] [cursor=pointer]:
              - generic [ref=e215]: 
          - generic [ref=e217]:
            - generic [ref=e219]:
              - generic [ref=e220]:
                - button [ref=e221] [cursor=pointer]:
                  - generic [ref=e222]: 
                - generic [ref=e223]: 
              - spinbutton "Number input" [ref=e225]
              - generic [ref=e226]:
                - generic [ref=e227]: 
                - button [ref=e228] [cursor=pointer]:
                  - generic [ref=e229]: 
            - alert [ref=e230]:
              - generic [ref=e231]: Error
              - generic [ref=e232]: 
              - text: I am an error message!
          - generic [ref=e234]:
            - generic [ref=e236]:
              - button [ref=e238] [cursor=pointer]:
                - generic [ref=e239]: 
              - spinbutton "Number input" [ref=e241]: "123"
              - button [ref=e243] [cursor=pointer]:
                - generic [ref=e244]: 
            - alert [ref=e245]:
              - generic [ref=e246]: Error
              - generic [ref=e247]: 
              - text: I am an error message!
          - generic [ref=e249]:
            - generic [ref=e251]:
              - button [ref=e253] [cursor=pointer]:
                - generic [ref=e254]: 
              - spinbutton "Number input" [ref=e256]: "123"
              - button [ref=e258] [cursor=pointer]:
                - generic [ref=e259]: 
            - alert [ref=e260]:
              - generic [ref=e261]: Warning
              - generic [ref=e262]: 
              - text: I am an error message!
          - generic [ref=e264]:
            - generic [ref=e266]:
              - button [ref=e268] [cursor=pointer]:
                - generic [ref=e269]: 
              - spinbutton "Number input" [ref=e271]: "123"
              - button [ref=e273] [cursor=pointer]:
                - generic [ref=e274]: 
            - alert [ref=e275]:
              - generic [ref=e276]: Note
              - generic [ref=e277]: 
              - text: I am an error message!
          - generic [ref=e279]:
            - generic [ref=e281]:
              - button [ref=e283] [cursor=pointer]:
                - generic [ref=e284]: 
              - spinbutton "Number input" [ref=e286]: "123"
              - button [ref=e288] [cursor=pointer]:
                - generic [ref=e289]: 
            - alert [ref=e290]:
              - generic [ref=e291]: Success
              - generic [ref=e292]: 
              - text: I am an error message!
          - generic [ref=e296]:
            - button [ref=e298] [cursor=pointer]:
              - generic [ref=e299]: 
            - spinbutton "Number input (-10 to 10 in steps of 2)" [ref=e301]
            - button [ref=e303] [cursor=pointer]:
              - generic [ref=e304]: 
          - spinbutton "Number input (Readonly)" [ref=e310]: "123"
          - spinbutton "Number input (Disabled)" [disabled] [ref=e316]: "123"
          - generic [ref=e320]:
            - button [ref=e322] [cursor=pointer]:
              - generic [ref=e323]: 
            - spinbutton "With access key" [ref=e325]
            - button [ref=e327] [cursor=pointer]:
              - generic [ref=e328]: 
          - generic [ref=e332]:
            - button [ref=e334] [cursor=pointer]:
              - generic [ref=e335]: 
            - spinbutton "With short key" [ref=e337]
            - button [ref=e339] [cursor=pointer]:
              - generic [ref=e340]: 
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