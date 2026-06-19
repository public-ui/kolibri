# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-snapshots.spec.js >> snapshot for table/with-footer
- Location: tests/theme-snapshots.spec.js:29:2

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  24663 pixels (ratio 0.09 of all image pixels) are different.

  Snapshot: snapshot-for-table-with-footer.png

Call log:
  - Expect "toHaveScreenshot(snapshot-for-table-with-footer.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 24663 pixels (ratio 0.09 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - 24663 pixels (ratio 0.09 of all image pixels) are different.

```

# Page snapshot

```yaml
- main [ref=e4]:
  - heading "table with-footer" [level=1] [ref=e5]
  - table "Business hours" [ref=e10]:
    - caption [ref=e11]: Business hours
    - rowgroup [ref=e12]:
      - row "District Monday Tuesday Wednesday Thursday Friday" [ref=e13]:
        - columnheader "District" [ref=e14]
        - columnheader "Monday" [ref=e15]
        - columnheader "Tuesday" [ref=e16]
        - columnheader "Wednesday" [ref=e17]
        - columnheader "Thursday" [ref=e18]
        - columnheader "Friday" [ref=e19]
    - rowgroup [ref=e20]:
      - row "Center 08:00 08:00 10:00 11:00 08:00" [ref=e21]:
        - cell "Center" [ref=e22]
        - cell "08:00" [ref=e23]
        - cell "08:00" [ref=e24]
        - cell "10:00" [ref=e25]
        - cell "11:00" [ref=e26]
        - cell "08:00" [ref=e27]
      - row "Tiergarten 08:00 08:00 10:00 11:00 08:00" [ref=e28]:
        - cell "Tiergarten" [ref=e29]
        - cell "08:00" [ref=e30]
        - cell "08:00" [ref=e31]
        - cell "10:00" [ref=e32]
        - cell "11:00" [ref=e33]
        - cell "08:00" [ref=e34]
      - row "Maxvorstadt 08:00 08:00 10:00 11:00 08:00" [ref=e35]:
        - cell "Maxvorstadt" [ref=e36]
        - cell "08:00" [ref=e37]
        - cell "08:00" [ref=e38]
        - cell "10:00" [ref=e39]
        - cell "11:00" [ref=e40]
        - cell "08:00" [ref=e41]
    - rowgroup [ref=e42]:
      - row "Lunch break from 11 to 14 o'clock" [ref=e43]:
        - cell [ref=e44]
        - cell [ref=e45]
        - cell "Lunch break from 11 to 14 o'clock" [ref=e46]
        - cell [ref=e47]
        - cell [ref=e48]
        - cell [ref=e49]
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