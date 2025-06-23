# Public UI - KERN-Theme

[![npm](https://img.shields.io/npm/v/@public-ui/theme-kern)](https://www.npmjs.com/package/@public-ui/components)
[![license](https://img.shields.io/npm/l/@public-ui/theme-kern)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/theme-kern)](https://www.npmjs.com/package/@public-ui/theme-kern)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/theme-kern)](https://bundlephobia.com/result?p=@public-ui/theme-kern)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

This is the KERN theme for the [Public UI web component library](https://public-ui.github.io). You can customize this theme by using `css variables` or by creating a new theme.

## Integration in React

```tsx
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { KERN } from '@public-ui/theme-kern';

register(KERN, defineCustomElements).then(() => {
	ReactDOM.createRoot(document.getElementById('root')!).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
});
```

## Full documentation

👉 [https://public-ui.github.io](https://public-ui.github.io)

## Usage

The KERN theme is token based and works with minimal adjustments. It already contains all necessary styling and can
be customized with design tokens using _CSS Custom Properties_.

### Variables

| Variable                          | Default value                                    | Meaning                                |
| --------------------------------- | ------------------------------------------------ | -------------------------------------- |
| `--kolibri-border-radius`         | `5px`                                            | Border radius for rounded elements     |
| `--kolibri-font-family`           | `Verdana, Arial, Calibri, Helvetica, sans-serif` | Default font family                    |
| `--kolibri-font-size`             | `16px`                                           | Base font size                         |
| `--kolibri-spacing`               | `0.25rem`                                        | Base spacing between elements          |
| `--kolibri-border-width`          | `1px`                                            | Border width                           |
| `--kolibri-color-primary`         | `#004b76`                                        | Primary color                          |
| `--kolibri-color-primary-variant` | `#0077b6`                                        | Alternative primary color              |
| `--kolibri-color-secondary`       | `#ccebf7`                                        | Secondary color                        |
| `--kolibri-color-danger`          | `#c0003c`                                        | Color for errors and dangerous actions |
| `--kolibri-color-warning`         | `#c44931`                                        | Warning color                          |
| `--kolibri-color-success`         | `#005c45`                                        | Success color                          |
| `--kolibri-color-subtle`          | `#576164`                                        | Subtle accent color for borders        |
| `--kolibri-color-light`           | `#ffffff`                                        | Light background color                 |
| `--kolibri-color-text`            | `#202020`                                        | Text color                             |
| `--kolibri-color-mute`            | `#f2f3f4`                                        | Color for disabled elements            |
| `--kolibri-color-mute-variant`    | `#bec5c9`                                        | Alternate disabled color               |

### Usage

Import and register the theme:

```js
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { KERN } from '@public-ui/theme-kern';

register(KERN, defineCustomElements);
```

For more details and options see [Getting started](https://public-ui.github.io/docs/get-started/first-steps#einbinden-in-ein-bestehendes-projekt).

To adjust the design tokens, create a simple stylesheet that overrides the desired custom properties. You do not need to set every property—only those you want to change. Example:

```css
:root {
	--kolibri-border-radius: 3px;
	--kolibri-font-size: 18px;
	--kolibri-spacing: 0.3rem;
	--kolibri-color-primary: #cc006e;
	--kolibri-color-primary-variant: #ff64b9;
}
```

## Design Tokens

The following tokens are defined in `src/global.scss` and serve as the base for colors, fonts, and spacing across all components.

| Token                     | Default value                                                                | Meaning                      |
| ------------------------- | ---------------------------------------------------------------------------- | ---------------------------- |
| `--border-radius`         | `var(--kolibri-border-radius, 5px)`                                          | Default border radius        |
| `--font-family`           | `var(--kolibri-font-family, Verdana, Arial, Calibri, Helvetica, sans-serif)` | Default font                 |
| `--font-size`             | `var(--kolibri-font-size, #{rem(16)})`                                       | Base font size               |
| `--spacing`               | `var(--kolibri-spacing, #{rem(4)})`                                          | Standard spacing             |
| `--border-width`          | `var(--kolibri-border-width, 1px)`                                           | Border width                 |
| `--color-primary`         | `var(--kolibri-color-primary, #004b76)`                                      | Primary accent color         |
| `--color-primary-variant` | `var(--kolibri-color-primary-variant, #0077b6)`                              | Variant of the primary color |
| `--color-secondary`       | `var(--kolibri-color-secondary, #ccebf7)`                                    | Secondary color              |
| `--color-danger`          | `var(--kolibri-color-danger, #b4003c)`                                       | Error color                  |
| `--color-warning`         | `var(--kolibri-color-warning, #c44931)`                                      | Warning color                |
| `--color-success`         | `var(--kolibri-color-success, #005c45)`                                      | Success color                |
| `--color-subtle`          | `var(--kolibri-color-subtle, #576164)`                                       | Subtle lines and borders     |
| `--color-light`           | `var(--kolibri-color-light, #ffffff)`                                        | Light surface color          |
| `--color-text`            | `var(--kolibri-color-text, #202020)`                                         | Standard text color          |
| `--color-mute`            | `var(--kolibri-color-mute, #f2f3f4)`                                         | Muted color                  |
| `--color-mute-variant`    | `var(--kolibri-color-mute-variant, #bec5c9)`                                 | Alternate muted color        |
