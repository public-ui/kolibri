[German version](./CONTRIBUTING.md)

## Important Git configuration for openCode.de

To avoid push problems with large repositories to openCode.de, please set the following local settings:

```bash
git config pack.packSizeLimit 5m
git config pack.window 0
git config pack.threads 1
```

These settings help prevent errors when pushing large commits.

Thank you for your interest in contributing to this project! This guide will help you get started.

# Contributing to the `KoliBri` theme `KERN UX-Standard`

Thank you for your interest in contributing to this project! This guide helps you get started.

## Set up the development environment

### Prerequisites

- Node.js 22+ and npm
- Git

### Setup

```bash
# Clone repository
git clone https://gitlab.opencode.de/kern-ux/kern-developer-kit.git
cd kern-developer-kit

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Start development (theme watch & sample app)
npm start
```

The start command combines `rollup --watch` with a local example based on `@public-ui/sample-react`. This lets you inspect the styles in the context of an application while the theme is rebuilt continuously.

When you are done, validate the result with the snapshot tests and check in updated reference snapshots if required:

```bash
npm test             # Check snapshots
npm run test-update  # Update reference snapshots
```

## Understand the architecture

### CSS layer structure

This theme uses CSS cascade layers for predictable styling:

```scss
// Layer order (lowest to highest specificity)
@layer kol-theme-global; // Global theme styles
@layer kol-theme-component; // Component-specific styles
```

### File organisation

```text
src/
├── components/              # Component styles (@layer kol-theme-component)
│   ├── button.scss
│   ├── input.scss
│   └── ...
├── global.scss              # Global theme styles (@layer kol-theme-global)
├── global/                  # Additional global styles (e.g. icons)
├── kern/                    # Local KERN tokens & utilities
├── mixins/                  # Sass mixins and utilities (no layers)
├── globals.d.ts             # TypeScript declarations for SCSS modules
└── index.ts                 # Theme entry point (exports `KERN_V2`)
```

**IMPORTANT**: The project relies on `@kern-ux/native` wherever possible. Because some tokens are not yet consumable from the package, the local files in `src/kern/` remain part of the theme.

## Styling rules

### Layer enforcement

Custom Stylelint rules ensure correct layer usage:

1. **Component files** (`src/components/*.scss`) **MUST** use `@layer kol-theme-component`
2. **Global file** (`src/global.scss`) **MUST** use `@layer kol-theme-global`
3. **Utility files** (mixins, helpers) **MUST NOT** use layers
4. Only the allowed layer names may be used: `kol-theme-global`, `kol-theme-component`

### Web component encapsulation

**IMPORTANT**: Theme files **MUST** use `:host` instead of `:root` to respect Web Component encapsulation:

```scss
// ✅ Correct: :host for web component styling
@layer kol-theme-global {
	:host {
		--font-family: var(--kern-font-family);
		background-color: white;
		color: black;
	}
}

// ❌ Wrong: :root bypasses Web Component encapsulation
@layer kol-theme-global {
	:root {
		--font-family: var(--kern-font-family); // Triggers lint error
	}
}
```

**Reason**: `:root` selectors bypass the Shadow DOM encapsulation of web components and can clash with host page styles. `:host` keeps the styling isolated inside the component.

### Example usage

```scss
// ✅ Correct: Component file with layer
// src/components/button.scss
@layer kol-theme-component {
	.button {
		background: var(--kern-color-primary);
		border-radius: var(--kern-border-radius);
	}
}

// ✅ Correct: Global file with layer and :host
// src/global.scss
@layer kol-theme-global {
	:host {
		--font-family: var(--kern-font-family);
	}
}

// ✅ Correct: Utility file without layer
// src/mixins/typography.scss
@mixin kern-heading-style {
	font-family: var(--kern-font-family);
	font-weight: bold;
}

// ❌ Wrong: Component file without layer
// src/components/button.scss
.button {
	background: red; // Triggers lint error
}
```

## Custom Stylelint rules

### Rule overview

| Rule                                      | Purpose                                     | Applies to              |
| ----------------------------------------- | ------------------------------------------- | ----------------------- |
| `kolibri/require-component-layer`         | Enforces `@layer kol-theme-component` usage | `src/components/*.scss` |
| `kolibri/require-global-layer`            | Enforces `@layer kol-theme-global` usage    | `src/global.scss`       |
| `kolibri/no-layer-in-non-component-files` | Prevents layer usage in utility files       | All other SCSS files    |
| `kolibri/layer-name-convention`           | Warns about non-standard layer names        | All files               |
| `kolibri/no-root-selector`                | Prevents `:root` in favour of `:host`       | `src/**/*.scss`         |

### Rule details

These rules guarantee:

- **100% CSS coverage** – ALL CSS must live in the appropriate layers
- **No exceptions** – variables, selectors, declarations, at-rules are all validated
- **Clear separation** – components vs. global vs. utility styling
- **Maintainability** – predictable cascade behaviour

## Development workflow

### Add new component styles

1. Create a component file in `src/components/`:

```scss
// src/components/new-component.scss
@layer kol-theme-component {
	.new-component {
		// Your styles here
	}
}
```

2. Build and test:

```bash
npm run build
npm run lint
npm test
```

### Change global styles

Edit `src/global.scss` inside the global layer:

```scss
@layer kol-theme-global {
	:host {
		// Global theme variables and styles
	}
}
```

### Create utilities

Add utilities in `src/mixins/` **without** layers:

```scss
// src/mixins/my-utility.scss
@mixin my-utility {
	// Utility styles (no @layer needed)
}
```

## Build process

### Development build

```bash
npm run dev    # Watch mode with hot reload
npm start      # Development server
```

### Production build

```bash
npm run build  # Optimised production build
```

### Build output

- `assets/` – static assets and fonts
- `dist/` – compiled CSS files

## Testing

### Visual regression tests

```bash
npm test             # Run visual tests
npm run test-update  # Update visual snapshots
```

#### Assets and visual tests

Visual tests require correctly loaded assets (fonts and icons) to produce meaningful screenshots:

- **inject-assets.css** – central asset injection file with `@import` statements for:
  - `assets/material-symbols-subset/style.css` – reduced Material Icons set
  - `assets/fira-sans-v17-latin/style.css` – Fira Sans font family (400–700)

The visual tests set `THEME_CSS=$(pwd)/inject-assets.css` to load this file into the sample application.

**Important**: Without the proper assets the visual tests would appear “changed”, because fallback fonts or missing icons would be used.

### Code quality

```bash
npm run lint     # Stylelint + ESLint
npm run format   # Prettier formatting
```

## Before committing

Always run the complete validation workflow:

```bash
npm run build   # Ensure a clean build
npm run format  # Fix formatting
npm run lint    # Check code quality
npm test        # Validate visual tests
```

## Releases and changelog (SemVer)

This repository maintains [CHANGELOG.md](CHANGELOG.md) and the package version automatically using **Conventional Commits** and **Semantic Versioning**.

### Commit messages (Conventional Commits)

Use one of these patterns:

- `fix: ...` → patch release
- `feat: ...` → minor release
- `feat!: ...` or `BREAKING CHANGE: ...` (footer) → major release

### Create a release commit + tag

Run one of the release commands (they update `package.json` and [CHANGELOG.md](CHANGELOG.md), then create a git commit and tag):

```bash
npm run release        # recommended bump based on commit history
npm run release:patch  # force patch bump
npm run release:minor  # force minor bump
npm run release:major  # force major bump
```

Preview without changing files:

```bash
npm run release:dry
```

Push the release commit and tag:

```bash
git push --follow-tags
```

**CI note**: pushing a tag like `v2.5.0` triggers the tag-based publish pipeline.

## Code style

- Use **tabs** for indentation (Markdown files use spaces)
- Line length: **160 characters**
- Single quotes in SCSS/CSS
- Follow the BEM naming convention for CSS classes
- Use semantic variable names

## Layer guidelines

1. **Never bypass layer rules** – all CSS must live in the correct layers
2. **Component isolation** – component styles affect only their component
3. **Global restraint** – global layer only for theme-wide variables and host styles
4. **No layer mixing** – don’t mix layered and non-layered CSS in the same file
5. **Respect KERN UX standards** – never modify files in `src/kern/`, only consume their variables

## KERN UX integration rules

- **`@kern-ux/native` package** – official KERN UX standards as external dependency
- **CSS import** – use `@import '@kern-ux/native/dist/kern.css'` for the KERN base
- **KERN variables** – use `var(--kern-*)` CSS custom properties in theme styles
- **Package updates** – update KERN UX standards with `npm update @kern-ux/native`
- **Local additions** – extra tokens from `src/kern/` remain active until the package covers them fully
- **CSS-centric** – the package is optimised for CSS distribution, not granular Sass imports

## Configuration files

| File                 | Purpose                                        |
| -------------------- | ---------------------------------------------- |
| `.stylelintrc.json`  | Stylelint configuration with custom rules      |
| `eslint.config.js`   | ESLint configuration for JavaScript/TypeScript |
| `rollup.config.js`   | Build configuration                            |
| `prettier.config.js` | Code formatting rules                          |
| `stylelint-rules/`   | Custom Stylelint rule implementations          |

## Kern Design System integration

### Design tokens

**KERN design standards are provided via the `@kern-ux/native` package:**

```scss
// Import the KERN CSS base
@import '@kern-ux/native/dist/kern.css';
```

**Key architectural decision**: the `@kern-ux/native` package is primarily designed for CSS distribution, not granular Sass imports. Therefore the complete KERN CSS base is included as a CSS import.

### Using the KERN UX standards

```scss
// ✅ Correct: use KERN CSS variables in theme components
@layer kol-theme-component {
	.button {
		background: var(--kern-color-primary); // Use KERN variable
		border-radius: var(--kern-border-radius); // Use KERN variable
		font-family: var(--kern-font-family); // Use KERN variable
	}
}

// ✅ Correct: import KERN CSS as base
@import '@kern-ux/native/dist/kern.css';

// ❌ Not available: granular Sass imports (package limitation)
// @use '@kern-ux/native/src/scss/core/tokens' as kern-tokens; // Not supported
```

**Interaction between `src/kern/` and `@kern-ux/native`:**

- `@kern-ux/native` supplies the standard KERN variables via CSS import
- `src/kern/` contains additional tokens and workarounds that the package does not yet provide
- Keep local tokens lightweight and document deviations for a future migration
- CSS custom properties (`--kern-*`) remain usable without changes

### Typography

The KERN typography system is supplied via the CSS base from `@kern-ux/native`:

- Font families and weights
- Heading styles and hierarchy
- Text sizes and spacing

### Colour system

```scss
// KERN colour tokens (use only, do not modify!)
--kern-color-primary: #0073e6;
--kern-color-secondary: #6c757d;
--kern-color-success: #28a745;
--kern-color-warning: #ffc107;
--kern-color-danger: #dc3545;
```

## Troubleshooting

### Common issues

**Stylelint layer errors:**

```
CSS rule "selector" must be inside @layer kol-theme-component
```

→ Wrap all CSS in the correct layer for the file location.

**Build errors:**

```bash
npm run clean  # Clear dist and cache
npm install    # Reinstall dependencies
npm run build  # Rebuild
```

**Visual test errors:**

```bash
npm run test-update  # Update snapshots when changes are intentional
```

### Getting help

1. Review the [KERN UX-Standard](https://gitlab.opencode.de/kern-ux)
2. Inspect existing component implementations in `src/components/`
3. Check the custom Stylelint rules in `stylelint-rules/`
4. Run `npm run lint` for detailed error messages

### Service worker cache issues in Chrome

**Problem:** assets are not updated even though “Disable cache” is enabled. Chrome keeps loading old versions, even after a hard reload.

**Cause:** A **Service Worker** in Chrome is likely interfering. The DevTools “Disable cache” checkbox only affects the **HTTP cache**, not the **Cache Storage** of a Service Worker. The SW will keep serving stale assets.

#### Immediate solution

1. **DevTools → Application → Service Workers**
   - Click **Unregister**
   - Optional: enable **Update on reload**
2. **Application → Clear storage**
   - Check all boxes (“Unregister service workers”, “Cache storage”, “IndexedDB”, …)
   - Click **Clear site data**
3. **Reload** (preferably right-click the reload button → **Empty cache and hard reload**)

#### Prevent permanently

- **Disable the Service Worker:** in `main.tsx`/`index.tsx` ensure the SW is **not registered**:

  ```javascript
  // Use serviceWorker.unregister()
  // or remove registerServiceWorker
  ```

- **Production only:** register the Service Worker only in production builds:

  ```javascript
  if (process.env.NODE_ENV === 'production') {
  	// Register Service Worker only in production
  }
  ```

- **Set cache headers correctly:**
  - `index.html` gets `Cache-Control: no-store`
  - Hashed files (`*.js`, `*.css`) may be cached

- **DevTools settings:** in Chrome DevTools (Application → Service Workers) enable **“Bypass for network”** or **“Update on reload”** during development
