[German version](./README.md)

# KERN UX standard theme for KoliBri

A custom theme for the accessible component library [KoliBri](https://github.com/public-ui/kolibri) that implements the KERN UX design system.

## Why use KoliBri for KERN?

**Accessibility matters.** But getting every detail right is hard.

KoliBri makes it easier:

- **Accessible out of the box** – all components are built with accessibility in mind
- **Well tested** – accessibility has been reviewed by experts
- **Easy to use** – you don’t have to implement everything yourself
- **KERN design** – this theme provides the official KERN look & feel

**What this means for you:**

- Less implementation effort
- Confidence that the result is accessible
- More time for core features
- Automatic KERN styling

KERN uses KoliBri because the components are “headless”. Accessibility is already solved – this theme simply adds the KERN design.

## Installation

```bash
npm install @kern-ux-public-ui/theme-kolibri @public-ui/components
```

### Copy assets

The theme package and the KoliBri components ship important assets (fonts and icons) that must be copied into your project. For a cross-platform solution we recommend the `cpy-cli` package:

```bash
npm install --save-dev cpy-cli
```

Then create npm scripts in your `package.json`:

```json
{
	"scripts": {
		"postinstall": "npm run copy-assets",
		"copy-assets": "npm run copy-kern-assets && npm run copy-kolibri-assets",
		"copy-kern-assets": "cpy 'node_modules/@kern-ux-public-ui/theme-kolibri/assets/**' 'public/assets/theme' --parents",
		"copy-kolibri-assets": "cpy 'node_modules/@public-ui/components/assets/**' 'public/assets/theme' --parents"
	}
}
```

**Important:** add the theme asset folder to your `.gitignore`, because the files are copied automatically on every `npm install`:

```gitignore
# Theme assets (copied automatically)
public/assets/theme/
```

### Include assets

After copying the assets you need to include them in your application:

#### Option 1: include via HTML

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>KERN UX Theme Demo</title>

		<!-- KERN theme assets -->
		<link rel="stylesheet" href="/assets/theme/material-symbols-subset/style.css" />
		<link rel="stylesheet" href="/assets/theme/fira-sans-v17-latin/style.css" />

		<!-- KoliBri assets (if required) -->
		<link rel="stylesheet" href="/assets/theme/codicon.css" />
	</head>
	<body>
		<!-- Your KoliBri components -->
	</body>
</html>
```

#### Option 2: include via SCSS/CSS

```scss
// In your main.scss or styles.scss
@import url('/assets/theme/material-symbols-subset/style.css');
@import url('/assets/theme/fira-sans-v17-latin/style.css');

// KoliBri assets (if required)
@import url('/assets/theme/codicon.css');
```

## Usage

```typescript
import { register } from '@public-ui/components';
import { KERN_V2 } from '@kern-ux-public-ui/theme-kolibri';
import { defineCustomElements } from '@public-ui/components/loader';

register(KERN_V2, defineCustomElements)
	.then(() => {
		// KERN theme "kern-v2" and
		// KoliBri components are ready
	})
	.catch(console.warn);
```

## Features

- 🎨 **KERN Design System** – official KERN styling guidelines
- ♿ **Accessible** – WCAG compliant styles with proper contrast ratios
- 📱 **Responsive** – mobile-first styling
- 🔧 **CSS layers** – modern layer architecture for maintainability

## Theming notes

When using adaptive styles, global CSS custom properties can collide with application properties. Prefer `SASS` variables for internal calculations and expose only clearly prefixed CSS properties.

## Development

### HTML usage

After installation you can use the KoliBri components with the KERN theme directly in HTML:

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>KERN UX Theme Demo</title>
	</head>
	<body>
		<kol-button _label="KERN Button"></kol-button>
		<kol-input-text _label="Name" _placeholder="Your name"></kol-input-text>
		<kol-card _headline="KERN Card"> Content of the card with KERN styling </kol-card>

		<script type="module">
			import { register } from '@public-ui/components';
			import { KERN_V2 } from '@kern-ux-public-ui/theme-kolibri';
			import { defineCustomElements } from '@public-ui/components/loader';

			register(KERN_V2, defineCustomElements)
				.then(() => {
					console.log('KERN theme "kern-v2" loaded successfully');
				})
				.catch(console.warn);
		</script>
	</body>
</html>
```

## Releases & changelog (SemVer)

This repository follows **Semantic Versioning** and maintains release notes automatically in [CHANGELOG.md](CHANGELOG.md).

- Commit messages follow **Conventional Commits** (e.g. `fix: ...`, `feat: ...`, `feat!: ...` / `BREAKING CHANGE: ...`).
- For releases/changelog updates:
  - Preview: `npm run release:dry`
  - Create release: `npm run release` (creates a commit + tag `vX.Y.Z`)

## Support

If you run into issues during development or the build process, take a look at [CONTRIBUTING.en.md](./CONTRIBUTING.en.md) for detailed troubleshooting guidance.

## License

This project is licensed under the [European Union Public Licence (EUPL) v1.2](https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12). The EUPL is an open-source licence developed by the European Commission and is compatible with other well-known open-source licences.

## Related projects

- [KERN UX standard](https://www.kern-ux.de)
- [KoliBri – the accessible HTML standard](https://public-ui.github.io/)
