# Public UI - Icon Font

[![npm](https://img.shields.io/npm/v/@public-ui/icons)](https://www.npmjs.com/package/@public-ui/icons)
[![license](https://img.shields.io/npm/l/@public-ui/icons)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/icons)](https://www.npmjs.com/package/@public-ui/icons)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/icons)](https://bundlephobia.com/result?p=@public-ui/icons)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

Icon font package for [KoliBri web components](https://public-ui.github.io). This package contains the complete icon set as a scalable font, providing high-quality icons that work across all browsers and devices.

## Installation

Add the package to your project with [pnpm](https://pnpm.io):

```bash
pnpm add @public-ui/icons
```

or with npm:

```bash
npm install @public-ui/icons
```

or with yarn:

```bash
yarn add @public-ui/icons
```

## Usage

### Basic usage

Include the icon font stylesheet in your HTML:

```html
<link rel="stylesheet" href="node_modules/@public-ui/icons/font/style.css" />
```

Then use icons with the CSS class syntax:

```html
<i class="kolicon-check"></i>
<i class="kolicon-alert-info"></i>
<i class="kolicon-eye"></i>
```

### With KoliBri components

The icon font is automatically available when using KoliBri components with the `_icon` property:

```html
<kol-button _label="Home" _icon="home"></kol-button> <kol-link _label="Profile" _icon="user" _href="/profile"></kol-link>
```

### In JavaScript/TypeScript

```typescript
import '@public-ui/icons/font/style.css';

// Icons are now available via CSS classes
```

### In CSS/SCSS

You can also import the stylesheet directly in your styles:

```css
@import '@public-ui/icons/font/style.css';
```

## Available icons

For a complete list of available icons, browse the `svg/` directory or visit the [KoliBri documentation](https://public-ui.github.io/docs/components/icon).

## Development

### Building the font

Generate the icon font from SVG source files:

```bash
pnpm build
```

This command:

1. Reads all SVG files from the `svg/` directory
2. Fixes them (flattens everything to one path, minimizes, removes unessecary definitions)
3. Outputs the fixed svgs in `svg-fixed/` directory
4. Generates a web font (TTF, WOFF, WOFF2, EOT, SVG) from the fixed svgs
5. Creates CSS files with icon class definitions
6. Outputs everything to the `font/` directory

### Preview locally

Start a local development server to preview the icons:

```bash
pnpm start
```

Then open your browser at the URL shown in the terminal (typically <http://localhost:3000>) to see the icon catalog.

### Adding new icons

1. Add your SVG file to the `svg/` directory
2. Run `pnpm build` to regenerate the font
3. The icon will be available as `.kolicon-{filename}`

### SVG requirements

We use [oslllo-svg-fixer](https://github.com/oslllo/svg-fixer) to convert all SVGs to paths.
Everything that is colored black will part of the path.

## Font technical details

The generated font includes:

- **Font name**: `kolicons`
- **Class prefix**: `kolicon-`
- **Formats**: TTF, WOFF, WOFF2, EOT, SVG
- **Base size**: Inherits from parent element
- **Color**: Inherits from `color` property (customizable via CSS)

## Browser support

The icon font works in all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

Legacy IE11 is supported via the included EOT font format.

## Accessibility

When using icon fonts for meaningful content (not decorative):

```html
<!-- Good: Icon with label -->
<kol-button _label="Save document" _icon="save"></kol-button>

<!-- Good: Standalone icon with aria-label -->
<button aria-label="Close dialog">
	<i class="kolicon-kolibri" aria-hidden="true"></i>
</button>
```

Always ensure icons that convey information have appropriate text alternatives for screen readers.

## Full documentation

👉 <https://public-ui.github.io>

## Contributing

Contributions are welcome! If you'd like to add new icons or improve existing ones:

1. Fork the repository
2. Add/modify SVG files in the `svg/` directory
3. Test the generated font locally
4. Submit a pull request

For more details, see the [Contributing Guide](../../../CONTRIBUTING.md).

## License

This project is licensed under the **EUPL-1.2** license. See [LICENSE](./LICENSE) for details.
