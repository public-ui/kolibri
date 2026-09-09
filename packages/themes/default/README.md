# Public UI – Default Theme

[![npm](https://img.shields.io/npm/v/@public-ui/theme-default)](https://www.npmjs.com/package/@public-ui/theme-default)
[![license](https://img.shields.io/npm/l/@public-ui/theme-default)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/theme-default)](https://www.npmjs.com/package/@public-ui/theme-default)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/theme-default)](https://bundlephobia.com/result?p=@public-ui/theme-default)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

The Default Theme is the standard theme of the [Public UI Web Component Library](https://public-ui.github.io) and can be customized using CSS Custom Properties (Design Tokens).

## Installation & Integration

```bash
npm install @public-ui/components @public-ui/theme-default
```

**React-Beispiel:**

```tsx
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { DEFAULT } from '@public-ui/theme-default';

register(DEFAULT, defineCustomElements).then(() => {
	ReactDOM.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
});
```

For more details: [Getting started](https://public-ui.github.io/docs/get-started/first-steps)

## Contributing to the Theme

Want to improve or customize the Default Theme? Here’s how:

1. **Install pnpm**
   - [pnpm](https://pnpm.io/) is required for development. Install pnpm globally if you don’t have it yet:

     ```bash
     npm install -g pnpm
     ```

2. **Fork the repository**
   - Click [Fork](https://github.com/public-ui/kolibri) on GitHub to create your own fork.

3. **Local setup**
   - Clone your fork:

     ```bash
     git clone https://github.com/<YOUR_GITHUB_USER>/kolibri.git
     cd kolibri/lib/packages/themes/default
     ```

   - Install dependencies in the monorepo root:

     ```bash
     pnpm i
     pnpm build
     ```

4. **Start development**
   - Switch to the theme directory and start the watch mode:

     ```bash
     cd kolibri/lib/packages/themes/default
     pnpm start
     ```

   - Edit the files in `src/` as needed.

5. **Commit & Pull Request**
   - Commit your changes and push them to your fork:

     ```bash
     git add .
     git commit -m "feat(theme-default): <your change>"
     git push origin <your-branch>
     ```

   - Create a Pull Request at <https://github.com/public-ui/kolibri/compare>

**Notes:**

- Please follow the [Contributing Guidelines](../../../CONTRIBUTING.md).
- Always run `pnpm format` and `pnpm lint` before committing.
- For larger changes, feel free to open an [issue](https://github.com/public-ui/kolibri/issues/new) first.

## Design Tokens

The following tokens are defined in `src/global.scss` and serve as the base for colors, fonts, and spacing across all components. You can override them via CSS:

| Token                     | Overridable with                  | Light                                 | Dark                                  | Meaning                                      |
| ------------------------- | --------------------------------- | ------------------------------------- | ------------------------------------- | -------------------------------------------- |
| `--border-radius`         | `--kolibri-border-radius`         | `5px`                                 | `5px`                                 | Default border radius                        |
| `--inner-border-radius`   | `--kolibri-border-radius`         | `4px`                                 | `4px`                                 | Border radius of nested elements             |
| `--font-family`           | `--kolibri-font-family`           | `Verdana, …`                          | `Verdana, …`                          | Default font                                 |
| `--font-size`             | `--kolibri-font-size`             | `1rem`                                | `1rem`                                | Base font size                               |
| `--spacing`               | `--kolibri-spacing`               | `0.25rem`                             | `0.25rem`                             | Standard spacing                             |
| `--border-width`          | `--kolibri-border-width`          | `1px`                                 | `1px`                                 | Border width                                 |
| `--color-primary`         | `--kolibri-color-primary`         | `#003a5c`                             | `#86c5ea`                             | Primary accent color                         |
| `--color-primary-variant` | `--kolibri-color-primary-variant` | `#005a8f`                             | `#b6dff6`                             | Hover and focus variant of the primary color |
| `--color-secondary`       | `--kolibri-color-secondary`       | `#ccebf7`                             | `#193743`                             | Secondary color                              |
| `--color-danger`          | `--kolibri-color-danger`          | `#ad003a`                             | `#f391b1`                             | Error color                                  |
| `--color-warning`         | `--kolibri-color-warning`         | `#c44931`                             | `#f29988`                             | Warning color                                |
| `--color-success`         | `--kolibri-color-success`         | `#005c45`                             | `#69d3b9`                             | Success color                                |
| `--color-subtle`          | `--kolibri-color-subtle`          | `#576164`                             | `#a1acaf`                             | Subtle lines, borders and secondary text     |
| `--color-light`           | `--kolibri-color-light`           | `#ffffff`                             | `#1c2021`                             | Surface, and the color used _on_ an accent   |
| `--color-text`            | `--kolibri-color-text`            | `#202020`                             | `#e9ebec`                             | Standard text color                          |
| `--color-mute`            | `--kolibri-color-mute`            | `#f2f3f4`                             | `#272c2f`                             | Muted surface                                |
| `--color-mute-variant`    | `--kolibri-color-mute-variant`    | `#bec5c9`                             | `#41494e`                             | Dividers and alternate muted surface         |
| `--color-visited`         | `--kolibri-color-visited`         | `#551a8b`                             | `#c39de7`                             | Visited link                                 |
| `--color-ink`             | `--kolibri-color-ink`             | `#000000`                             | `#e9ebec`                             | Maximum contrast foreground                  |
| `--color-shadow`          | `--kolibri-color-shadow`          | `rgb(8 35 48 / .24)`                  | `rgb(0 0 0 / .6)`                     | Ambient elevation shadow                     |
| `--color-shadow-inverse`  | `--kolibri-color-shadow-inverse`  | `rgb(255 255 255 / .24)`              | `rgb(8 35 48 / .24)`                  | The same, cast on an accent surface          |
| `--color-shadow-contrast` | `--kolibri-color-shadow-contrast` | `--color-subtle` mixed 80% with black | `--color-subtle` mixed 80% with white | Shadow used as a 3:1 border                  |

`--color-light` is not "white". It is the surface _and_ the color placed on an accent: in dark mode the surface becomes dark and the accents become light tints, so both roles flip together and a light-blue primary automatically carries dark text.

To adjust the design tokens, create a stylesheet that overrides the desired custom properties. Example:

```css
:root {
	--kolibri-border-radius: 3px;
	--kolibri-font-size: 18px;
	--kolibri-spacing: 0.3rem;
	--kolibri-color-primary: #cc006e;
	--kolibri-color-primary-variant: #ff64b9;
}
```

A single value like this applies in **both** color schemes. To give a token a different value per scheme, write the two-branch form yourself:

```css
:root {
	--kolibri-color-primary: light-dark(#cc006e, #ff9ad4);
}
```

## Dark mode

The theme ships one palette per color scheme. Every color token resolves through the CSS `light-dark()` function, which reads the `color-scheme` in effect at the element it is used on:

```scss
--color-text: var(--kolibri-color-text, light-dark(#202020, #e9ebec));
```

**The application owns `color-scheme`, the components consume it implicitly.** The theme declares no `color-scheme` of its own. Since `color-scheme` is an inherited CSS property and inheritance follows the flat tree, every component picks up whatever the document sets around it — the page and the components in it can never disagree, and there is no KoliBri specific API involved:

```css
:root {
	color-scheme: light dark; /* follow the operating system */
}

.night {
	color-scheme: dark; /* force this subtree, KoliBri components included */
}
```

A declaration on any element applies to that element's whole subtree, nested shadow roots included, so an inner container flips only itself.

**Dark mode is opt-in.** An application that declares nothing keeps `color-scheme: normal` and stays light, whatever the operating system says. That is the standard CSS default, and it means adding this theme version changes nothing for an existing application until it asks for it. One line switches it on, and the bundled document stylesheet is exactly that line plus the page colors and two convenience selectors:

```html
<link rel="stylesheet" href="node_modules/@public-ui/theme-default/color-scheme.css" />

<html data-kol-color-scheme="dark">
	<!-- or: <html class="kol-color-scheme-dark">, or your own `color-scheme: dark` -->
</html>
```

An application that already manages `color-scheme` itself does not need the file at all.

One limitation: `kol-spin`'s cycle variant animates its arc through `@keyframes` color stops in the base layer of `@public-ui/components`. A theme cannot override an animation's own color stops, so that arc stays dark in dark mode. Its static ring and the dot variant do follow the scheme.

The presentation app (`packages/samples/presentation`) is a live example: its Sidebar carries a Color scheme select with the states Auto, Light and Dark.

Browser support follows `light-dark()`: Chrome 123, Edge 123, Safari 17.5, Firefox 120.

## More Information

- [Documentation](https://public-ui.github.io)
- [Issues](https://github.com/public-ui/kolibri/issues)
- [Pull Requests](https://github.com/public-ui/kolibri/pulls)
