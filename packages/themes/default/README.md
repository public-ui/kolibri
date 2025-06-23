# Public UI - Default-Theme

[![npm](https://img.shields.io/npm/v/@public-ui/theme-default)](https://www.npmjs.com/package/@public-ui/components)
[![license](https://img.shields.io/npm/l/@public-ui/theme-default)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/theme-default)](https://www.npmjs.com/package/@public-ui/theme-default)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/theme-default)](https://bundlephobia.com/result?p=@public-ui/theme-default)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

This is the default theme for the [Public UI web component library](https://public-ui.github.io). You can customize this theme by using `css variables` or by creating a new theme.

## Integration in React

```tsx
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { DEFAULT } from '@public-ui/theme-default';

register(DEFAULT, defineCustomElements).then(() => {
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

The default theme is token based and works out of the box. Customize it through design tokens defined as _CSS custom properties_.

### Tokens

| Variable                          | Default value                                    | Description                            |
| --------------------------------- | ------------------------------------------------ | -------------------------------------- |
| `--kolibri-border-radius`         | `5px`                                            | Border radius for rounded elements     |
| `--kolibri-font-family`           | `Verdana, Arial, Calibri, Helvetica, sans-serif` | Default font family                    |
| `--kolibri-font-size`             | `16px`                                           | Base font size                         |
| `--kolibri-spacing`               | `0.25rem`                                        | Spacing between elements               |
| `--kolibri-border-width`          | `1px`                                            | Default border width                   |
| `--kolibri-color-primary`         | `#004b76`                                        | Primary color                          |
| `--kolibri-color-primary-variant` | `#0077b6`                                        | Variant of the primary color           |
| `--kolibri-color-secondary`       | `#ccebf7`                                        | Secondary color                        |
| `--kolibri-color-danger`          | `#c0003c`                                        | Color for errors and dangerous actions |
| `--kolibri-color-warning`         | `#c44931`                                        | Color for warnings                     |
| `--kolibri-color-success`         | `#005c45`                                        | Color for success messages             |
| `--kolibri-color-subtle`          | `#576164`                                        | Subtle accent color                    |
| `--kolibri-color-light`           | `#ffffff`                                        | Light color for backgrounds            |
| `--kolibri-color-text`            | `#202020`                                        | Text color                             |
| `--kolibri-color-mute`            | `#f2f3f4`                                        | Color for disabled elements            |
| `--kolibri-color-mute-variant`    | `#bec5c9`                                        | Alternate disabled color               |

### Example

Import and register the theme:

```js
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { DEFAULT } from '@public-ui/theme-default';

register(DEFAULT, defineCustomElements);
```

For more details and a complete token list see the [documentation](https://public-ui.github.io/docs/get-started/first-steps#einbinden-in-ein-bestehendes-projekt).

Override the tokens in a simple stylesheet. Only specify the properties you want
to change. Example:

```css
:root {
	--kolibri-border-radius: 3px;
	--kolibri-font-size: 18px;
	--kolibri-spacing: 0.3rem;
	--kolibri-color-primary: #cc006e;
	--kolibri-color-primary-variant: #ff64b9;
}
```
