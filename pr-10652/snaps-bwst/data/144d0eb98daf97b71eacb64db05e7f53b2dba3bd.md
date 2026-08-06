# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-snapshots.spec.js >> snapshot for tree/basic/home
- Location: tests/theme-snapshots.spec.js:29:2

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  538 pixels (ratio 0.01 of all image pixels) are different.

  Snapshot: snapshot-for-tree-basic-home.png

Call log:
  - Expect "toHaveScreenshot(snapshot-for-tree-basic-home.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 538 pixels (ratio 0.01 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - 538 pixels (ratio 0.01 of all image pixels) are different.

```

# Page snapshot

```yaml
- main [ref=e4]:
  - heading "tree basic home" [level=1] [ref=e5]
  - navigation "Sitemap" [ref=e8]:
    - tree "Sitemap" [ref=e9]:
      - generic:
        - listitem [ref=e12]:
          - treeitem "1 Home" [ref=e15] [cursor=pointer]:
            - generic [ref=e21]: 1 Home
        - listitem [ref=e24]:
          - treeitem "2 About (open initially)" [expanded] [ref=e27] [cursor=pointer]:
            - generic [ref=e31]:
              - generic [ref=e33]: 
              - generic [ref=e34]: 2 About (open initially)
          - group [ref=e35]:
            - generic:
              - listitem [ref=e38]:
                - treeitem "2.0 Legal" [ref=e41] [cursor=pointer]:
                  - generic [ref=e47]: 2.0 Legal
              - listitem [ref=e50]:
                - treeitem "2.1 Team" [ref=e53] [cursor=pointer]:
                  - generic [ref=e57]:
                    - generic [ref=e59]: 
                    - generic [ref=e60]: 2.1 Team
                - generic: 
        - listitem [ref=e63]:
          - treeitem "3. Products" [ref=e66] [cursor=pointer]:
            - generic [ref=e70]:
              - generic [ref=e72]: 
              - generic [ref=e73]: 3. Products
          - generic: 
          - generic: 
  - paragraph [ref=e74]: "Current tree item: home"
  - generic [ref=e75]:
    - button "Change label for '1 Home'" [ref=e78] [cursor=pointer]:
      - generic [ref=e81]: Change label for '1 Home'
    - button "Toggle '2.1.2.2 Pets'" [ref=e84] [cursor=pointer]:
      - generic [ref=e87]: Toggle '2.1.2.2 Pets'
    - button "Toggle '2.2.1 Europe' (two levels at once)" [ref=e90] [cursor=pointer]:
      - generic [ref=e93]: Toggle '2.2.1 Europe' (two levels at once)
    - button "Toggle '3. Products'" [ref=e96] [cursor=pointer]:
      - generic [ref=e99]: Toggle '3. Products'
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