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

| Token                     | Default value                                                                | Meaning                      |
| ------------------------- | ---------------------------------------------------------------------------- | ---------------------------- |
| `--border-radius`         | `var(--kolibri-border-radius, 5px)`                                          | Default border radius        |
| `--font-family`           | `var(--kolibri-font-family, Verdana, Arial, Calibri, Helvetica, sans-serif)` | Default font                 |
| `--font-size`             | `var(--kolibri-font-size, #{to-rem(16)})`                                    | Base font size               |
| `--spacing`               | `var(--kolibri-spacing, #{to-rem(4)})`                                       | Standard spacing             |
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

## More Information

- [Documentation](https://public-ui.github.io)
- [Issues](https://github.com/public-ui/kolibri/issues)
- [Pull Requests](https://github.com/public-ui/kolibri/pulls)
