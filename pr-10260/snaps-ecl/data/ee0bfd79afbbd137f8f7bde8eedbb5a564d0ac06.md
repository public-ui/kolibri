# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-snapshots.spec.js >> snapshot for input-password/basic?noColumns
- Location: tests/theme-snapshots.spec.js:29:2

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  Expected an image 500px by 2095px, received 500px by 2255px. 73715 pixels (ratio 0.07 of all image pixels) are different.

  Snapshot: snapshot-for-input-password-basic-noColumns.png

Call log:
  - Expect "toHaveScreenshot(snapshot-for-input-password-basic-noColumns.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 500px by 2095px, received 500px by 2255px. 73715 pixels (ratio 0.07 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - Expected an image 500px by 2095px, received 500px by 2255px. 73715 pixels (ratio 0.07 of all image pixels) are different.

```

# Page snapshot

```yaml
- main [ref=e4]:
  - heading "input-password basic" [level=1] [ref=e5]
  - generic [ref=e7]:
    - paragraph [ref=e8]:
      - generic [ref=e9]: Form fields marked with an asterisk (*) are mandatory.
    - generic [ref=e11]:
      - group "Password" [ref=e12]:
        - generic [ref=e13]: Password
        - generic [ref=e14]:
          - generic [ref=e17]:
            - generic [ref=e21] [cursor=pointer]: Passwort (Black background test)
            - textbox "Passwort (Black background test)" [ref=e25]
          - generic [ref=e28]:
            - generic [ref=e31] [cursor=pointer]:
              - generic [ref=e32]: Passwort
              - generic [ref=e33]: P
            - generic [ref=e35]:
              - generic [ref=e37]: 
              - textbox "Passwort" [ref=e39]:
                - /placeholder: Mit Icons
              - generic [ref=e41]: 
            - alert [ref=e43]:
              - generic [ref=e44]:
                - generic [ref=e45]: Error
                - generic [ref=e46]: 
                - generic [ref=e47]: I am an error message!
            - generic [ref=e48]: I am a hint.
          - generic [ref=e50]:
            - generic [ref=e54] [cursor=pointer]: Passwort
            - textbox "Passwort" [ref=e58]
            - alert [ref=e60]:
              - generic [ref=e61]:
                - generic [ref=e62]: Note
                - generic [ref=e63]: 
                - generic [ref=e64]: Just a hint
          - generic [ref=e66]:
            - generic [ref=e70] [cursor=pointer]: Passwort
            - textbox "Passwort" [ref=e74]
            - alert [ref=e76]:
              - generic [ref=e77]:
                - generic [ref=e78]: Warning
                - generic [ref=e79]: 
                - generic [ref=e80]: Small warning
          - generic [ref=e82]:
            - generic [ref=e86] [cursor=pointer]: Passwort
            - textbox "Passwort" [ref=e90]
            - alert [ref=e92]:
              - generic [ref=e93]:
                - generic [ref=e94]: Success
                - generic [ref=e95]: 
                - generic [ref=e96]: Success message
          - generic [ref=e98]:
            - generic [ref=e102] [cursor=pointer]: Passwort
            - textbox "Passwort" [ref=e106]
            - alert [ref=e108]:
              - generic [ref=e109]:
                - generic [ref=e110]: Message
                - generic [ref=e111]: 
                - generic [ref=e112]: Default message
          - generic [ref=e114]:
            - generic [ref=e118]: Passwort (Disabled)
            - textbox "Passwort (Disabled)" [disabled] [ref=e122]
            - alert [ref=e124]:
              - generic [ref=e125]:
                - generic [ref=e126]: Error
                - generic [ref=e127]: 
                - generic [ref=e128]: I am an error message!
          - generic [ref=e130]:
            - generic [ref=e134] [cursor=pointer]: Passwort (Readonly)
            - textbox "Passwort (Readonly)" [ref=e138]
          - generic [ref=e141]:
            - generic [ref=e144] [cursor=pointer]:
              - generic [ref=e145]: With access key
              - generic [ref=e146]: c
            - textbox "With access key" [ref=e150]
          - generic [ref=e153]:
            - generic [ref=e156] [cursor=pointer]:
              - generic [ref=e157]: With short key
              - generic [ref=e158]: s
            - textbox "With short key" [ref=e162]
      - group "Password (hideLabel)" [ref=e164]:
        - generic [ref=e165]: Password (hideLabel)
        - generic [ref=e166]:
          - textbox "Passwort (Black background test)" [ref=e173]
          - generic [ref=e176]:
            - generic [ref=e178]:
              - generic [ref=e180]: 
              - textbox "Passwort" [ref=e182]:
                - /placeholder: Mit Icons
              - generic [ref=e184]: 
            - alert [ref=e186]:
              - generic [ref=e187]:
                - generic [ref=e188]: Error
                - generic [ref=e189]: 
                - generic [ref=e190]: I am an error message!
            - generic [ref=e191]: I am a hint.
          - generic [ref=e193]:
            - textbox "Passwort" [ref=e197]
            - alert [ref=e199]:
              - generic [ref=e200]:
                - generic [ref=e201]: Note
                - generic [ref=e202]: 
                - generic [ref=e203]: Just a hint
          - generic [ref=e205]:
            - textbox "Passwort" [ref=e209]
            - alert [ref=e211]:
              - generic [ref=e212]:
                - generic [ref=e213]: Warning
                - generic [ref=e214]: 
                - generic [ref=e215]: Small warning
          - generic [ref=e217]:
            - textbox "Passwort" [ref=e221]
            - alert [ref=e223]:
              - generic [ref=e224]:
                - generic [ref=e225]: Success
                - generic [ref=e226]: 
                - generic [ref=e227]: Success message
          - generic [ref=e229]:
            - textbox "Passwort" [ref=e233]
            - alert [ref=e235]:
              - generic [ref=e236]:
                - generic [ref=e237]: Message
                - generic [ref=e238]: 
                - generic [ref=e239]: Default message
          - generic [ref=e241]:
            - textbox "Passwort (Disabled)" [disabled] [ref=e245]
            - alert [ref=e247]:
              - generic [ref=e248]:
                - generic [ref=e249]: Error
                - generic [ref=e250]: 
                - generic [ref=e251]: I am an error message!
          - textbox "Passwort (Readonly)" [ref=e257]
          - textbox "With access key" [ref=e264]
          - textbox "With short key" [ref=e271]
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