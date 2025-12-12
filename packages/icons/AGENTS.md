# Agent Instructions

This package contains the icon font for [KoliBri web components](https://public-ui.github.io). In KoliBri we avoid slots to ensure component accessibility, therefore we primarily support font icons. This package converts SVG files to web fonts using [svgtofont](https://wangchujiang.com/svgtofont/).

Use `pnpm --filter @public-ui/icons build` to build the icon font or `pnpm start` to preview the icons locally.

> 🧹 **Formatting**: Follow the repo-wide "Format-first rule" in `/AGENTS.md`. Run `pnpm format` or `pnpm --filter @public-ui/icons format` before committing—no extra flags are needed.

## Package Structure

- `svg/` – Source SVG files for icons. Each SVG file becomes an icon in the font.
- `font/` – Generated web font files and CSS (created by build process, not committed).
- `index.html` – Preview page for all icons (useful during development).
- `package.json` – Package configuration including svgtofont settings.

## Configuration

The icon font is configured in `package.json`:

```json
{
	"svgtofont": {
		"fontName": "kolibri",
		"classNamePrefix": "kol-icon",
		"css": {
			"fileName": "style"
		}
	}
}
```

**Important settings:**

- `fontName: "kolibri"` – The generated font family name
- `classNamePrefix: "kol-icon"` – Prefix for all icon CSS classes (e.g., `.kol-icon-home`)
- `css.fileName: "style"` – Name of the generated CSS file

> ⚠️ Do not change these settings unless you understand the impact on all KoliBri components that depend on the icon font.

## Development Workflow

### Building the icon font

Build the font from SVG sources:

```bash
# From monorepo root
pnpm --filter @public-ui/icons build

# Or from this directory
pnpm build
```

The build process:

1. Reads all SVG files from `svg/` directory
2. Generates web font in multiple formats (TTF, WOFF, WOFF2, EOT, SVG)
3. Creates CSS files with icon class definitions
4. Outputs everything to `font/` directory

### Previewing icons

Start a local server to preview all icons:

```bash
# From monorepo root
pnpm --filter @public-ui/icons start

# Or from this directory
pnpm start
```

Then open `http://localhost:3000` in your browser to see the icon catalog.

### Adding new icons

1. Add your SVG file to the `svg/` directory
2. Name the file descriptively (e.g., `arrow-left.svg`, `user-profile.svg`)
3. Ensure the SVG meets the requirements (see below)
4. Run `pnpm build` to regenerate the font
5. The icon will be available as `.kol-icon-{filename}` (e.g., `.kol-icon-arrow-left`)

### SVG Requirements

For optimal results, SVG files should:

- **Single color**: Use black (`#000000`) or no color (stroke/fill will be set via CSS)
- **ViewBox**: Must have a `viewBox` attribute (typically `0 0 24 24`)
- **Simple paths**: Avoid complex features like gradients, patterns, or filters
- **Optimized**: Remove unnecessary metadata, comments, and whitespace
- **Consistent size**: All icons should use the same viewBox dimensions

**Example of a good SVG:**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
</svg>
```

### Testing in KoliBri Components

After building the font, test it with KoliBri components:

```tsx
// In a sample app
<kol-button _label="Home" _icon="home" />
<kol-icon _icon="user" />
```

## Coding Rules

### File Naming Conventions

- Use **kebab-case** for SVG filenames (e.g., `arrow-left.svg`, not `ArrowLeft.svg`)
- Use descriptive names that match the icon's purpose
- Avoid special characters and spaces in filenames
- Keep names concise but clear

### SVG Best Practices

- **Accessibility**: Icon names should be semantic (e.g., `close` not `x`, `menu` not `hamburger`)
- **Consistency**: Maintain visual consistency across all icons (same stroke width, similar style)
- **Optimization**: Run SVG files through an optimizer like SVGO before adding them
- **No embedded text**: Use paths only, not text elements

### Icon Versioning

When modifying existing icons:

- Consider the visual breaking change impact on consumers
- Document significant visual changes in commit messages
- Major visual changes should be discussed with the team first

## Build Artifacts

The `font/` directory is generated during build and contains:

- `kolibri.ttf` – TrueType font
- `kolibri.woff` – Web Open Font Format (legacy)
- `kolibri.woff2` – Web Open Font Format 2 (modern browsers)
- `kolibri.eot` – Embedded OpenType (IE11 support)
- `kolibri.svg` – SVG font (legacy fallback)
- `style.css` – CSS with icon classes and font-face declarations
- `index.html` – Preview page with all icons

**Note**: The `font/` directory is not committed to version control (it's in `.gitignore`). It's generated during build and included in the published npm package.

## Usage in Projects

After publishing, projects can use the icons:

```html
<!-- Include the stylesheet -->
<link rel="stylesheet" href="node_modules/@public-ui/icons/font/style.css" />

<!-- Use icons -->
<i class="kol-icon kol-icon-home"></i>
```

Or import in JavaScript/TypeScript:

```typescript
import '@public-ui/icons/font/style.css';
```

## Troubleshooting

### Build fails with "No SVG files found"

- Ensure SVG files are in the `svg/` directory
- Check that files have `.svg` extension

### Icons display as squares

- The font CSS is not loaded
- Check the stylesheet path in your HTML
- Verify the icon class name matches an existing icon

### Icons look distorted

- SVG viewBox might be incorrect
- Try standardizing all SVGs to `viewBox="0 0 24 24"`
- Ensure paths are properly closed

### New icon doesn't appear

- Rebuild the font: `pnpm build`
- Clear browser cache
- Verify the SVG filename is valid (no special characters)

## Related Documentation

- Main KoliBri docs: [public-ui.github.io](https://public-ui.github.io)
- Icon component: [public-ui.github.io/docs/components/icon](https://public-ui.github.io/docs/components/icon)
- svgtofont library: [wangchujiang.com/svgtofont](https://wangchujiang.com/svgtofont/)
- Monorepo agents guide: [/AGENTS.md](../../../AGENTS.md)

## Feedback

For questions, issues, or feature requests, please [open an issue on GitHub](https://github.com/public-ui/kolibri/issues).

## License

This project is licensed under the **EUPL-1.2** license. See [LICENSE](LICENSE) for details.
