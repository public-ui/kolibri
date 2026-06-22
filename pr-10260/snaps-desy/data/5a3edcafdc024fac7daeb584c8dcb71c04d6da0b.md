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

  Expected an image 500px by 1932px, received 500px by 2012px. 72596 pixels (ratio 0.08 of all image pixels) are different.

  Snapshot: snapshot-for-input-password-basic-noColumns.png

Call log:
  - Expect "toHaveScreenshot(snapshot-for-input-password-basic-noColumns.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 500px by 1932px, received 500px by 2012px. 72596 pixels (ratio 0.08 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - Expected an image 500px by 1932px, received 500px by 2012px. 72596 pixels (ratio 0.08 of all image pixels) are different.

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
              - generic [ref=e37]: 
              - textbox "Passwort" [ref=e39]:
                - /placeholder: Mit Icons
              - generic [ref=e41]: 
            - alert [ref=e43]:
              - generic [ref=e44]:
                - generic [ref=e45]: Error
                - generic [ref=e46]: 
                - generic [ref=e48]: I am an error message!
            - generic [ref=e49]: I am a hint.
          - generic [ref=e51]:
            - generic [ref=e55] [cursor=pointer]: Passwort
            - textbox "Passwort" [ref=e59]
            - alert [ref=e61]:
              - generic [ref=e62]:
                - generic [ref=e63]: Note
                - generic [ref=e64]: 
                - generic [ref=e66]: Just a hint
          - generic [ref=e68]:
            - generic [ref=e72] [cursor=pointer]: Passwort
            - textbox "Passwort" [ref=e76]
            - alert [ref=e78]:
              - generic [ref=e79]:
                - generic [ref=e80]: Warning
                - generic [ref=e81]: 
                - generic [ref=e83]: Small warning
          - generic [ref=e85]:
            - generic [ref=e89] [cursor=pointer]: Passwort
            - textbox "Passwort" [ref=e93]
            - alert [ref=e95]:
              - generic [ref=e96]:
                - generic [ref=e97]: Success
                - generic [ref=e98]: 
                - generic [ref=e100]: Success message
          - generic [ref=e102]:
            - generic [ref=e106] [cursor=pointer]: Passwort
            - textbox "Passwort" [ref=e110]
            - alert [ref=e112]:
              - generic [ref=e113]:
                - generic [ref=e114]: Message
                - text: 
                - generic [ref=e116]: Default message
          - generic [ref=e118]:
            - generic [ref=e122]: Passwort (Disabled)
            - textbox "Passwort (Disabled)" [disabled] [ref=e126]
            - alert [ref=e128]:
              - generic [ref=e129]:
                - generic [ref=e130]: Error
                - generic [ref=e131]: 
                - generic [ref=e133]: I am an error message!
          - generic [ref=e135]:
            - generic [ref=e139] [cursor=pointer]: Passwort (Readonly)
            - textbox "Passwort (Readonly)" [ref=e143]
          - generic [ref=e146]:
            - generic [ref=e149] [cursor=pointer]:
              - generic [ref=e150]: With access key
              - generic [ref=e151]: c
            - textbox "With access key" [ref=e155]
          - generic [ref=e158]:
            - generic [ref=e161] [cursor=pointer]:
              - generic [ref=e162]: With short key
              - generic [ref=e163]: s
            - textbox "With short key" [ref=e167]
      - group "Password (hideLabel)" [ref=e169]:
        - generic [ref=e170]: Password (hideLabel)
        - generic [ref=e171]:
          - textbox "Passwort (Black background test)" [ref=e178]
          - generic [ref=e181]:
            - generic [ref=e183]:
              - generic [ref=e185]: 
              - textbox "Passwort" [ref=e187]:
                - /placeholder: Mit Icons
              - generic [ref=e189]: 
            - alert [ref=e191]:
              - generic [ref=e192]:
                - generic [ref=e193]: Error
                - generic [ref=e194]: 
                - generic [ref=e196]: I am an error message!
            - generic [ref=e197]: I am a hint.
          - generic [ref=e199]:
            - textbox "Passwort" [ref=e203]
            - alert [ref=e205]:
              - generic [ref=e206]:
                - generic [ref=e207]: Note
                - generic [ref=e208]: 
                - generic [ref=e210]: Just a hint
          - generic [ref=e212]:
            - textbox "Passwort" [ref=e216]
            - alert [ref=e218]:
              - generic [ref=e219]:
                - generic [ref=e220]: Warning
                - generic [ref=e221]: 
                - generic [ref=e223]: Small warning
          - generic [ref=e225]:
            - textbox "Passwort" [ref=e229]
            - alert [ref=e231]:
              - generic [ref=e232]:
                - generic [ref=e233]: Success
                - generic [ref=e234]: 
                - generic [ref=e236]: Success message
          - generic [ref=e238]:
            - textbox "Passwort" [ref=e242]
            - alert [ref=e244]:
              - generic [ref=e245]:
                - generic [ref=e246]: Message
                - text: 
                - generic [ref=e248]: Default message
          - generic [ref=e250]:
            - textbox "Passwort (Disabled)" [disabled] [ref=e254]
            - alert [ref=e256]:
              - generic [ref=e257]:
                - generic [ref=e258]: Error
                - generic [ref=e259]: 
                - generic [ref=e261]: I am an error message!
          - textbox "Passwort (Readonly)" [ref=e267]
          - textbox "With access key" [ref=e274]
          - textbox "With short key" [ref=e281]
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