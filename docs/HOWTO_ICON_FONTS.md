# HOWTO: Bundle KoliBri Icon Fonts

KoliBri ships the [`kol-icon`](https://public-ui.github.io/components/icon/) component to render pictograms. Starting with **v4**, KoliBri includes its own font-based icon set called **KolIcons**. Previously, this relied on [Codicon](https://github.com/microsoft/vscode-codicons).

This guide shows how to install and bundle the KolIcons font assets that are published with `@public-ui/components`.

> **Migration from v3 to v4:** If you're upgrading from v3, see [BREAKING_CHANGES.v4.md](./BREAKING_CHANGES.v4.md#kolicons-instead-of-codicons) for migration details.

## 1. Install the assets

The KolIcons font files are part of the KoliBri component package. Ensure your project depends on it:

```bash
pnpm add @public-ui/components
# or
npm install @public-ui/components
```

After installation, the font files live inside `node_modules/@public-ui/components/assets/kolicons/`.

## 2. Import the CSS in your application

The CSS file declares the `kolicon` font-face and points to the matching `kolicons.ttf` file. Import it once inside your application entry point or global stylesheet:

```ts
// main.ts / index.tsx
import '@public-ui/components/assets/kolicons/style.css';
```

For bundlers that do not understand CSS imports, copy `style.css` and `kolicons.ttf` into your public assets folder and load them manually in `index.html`:

```html
<link rel="stylesheet" href="/assets/kolicons/style.css" />
```

Make sure the relative path inside `style.css` still points to the TTF file after copying.

## 3. Reference the icons from components

Use KolIcon class names via the `_icons` property. Multiple icons can be provided by separating classes with a space:

```tsx
<KolButton _label="Save" _icons="kolicon kolicon-save" />
<KolIcon _icon="kolicon kolicon-check" />
```

The first class (`kolicon`) ensures the font family is applied, the second selects the glyph.

### Available Icon Names

View the complete list of available KolIcons in the [KolIcons directory](https://github.com/public-ui/kolibri/tree/develop/packages/components/src/assets/kolicons). Icon names follow the pattern `kolicon-{name}`.

## 4. Serve the font file

Verify that your build pipeline copies `kolicons.ttf` into the final distribution folder. Frameworks such as Next.js, Vite, and Angular CLI automatically include imported assets when the CSS file is referenced. For custom setups, add a build step that copies the font file alongside your compiled assets:

```bash
cp node_modules/@public-ui/components/assets/kolicons/kolicons.ttf dist/assets/kolicons/
```

## 5. Test your setup

Load a page that renders `kol-icon` or any component using `_icons`. You should no longer see empty boxes. Browser developer tools let you check that the `kolicons.ttf` file is requested successfully.

Keeping the CSS import in place ensures AI agents and developers alike ship the correct assets whenever `kol-icon` is used.

## Using Codicons (Optional Legacy Support)

If your application still uses Codicons from an earlier version, you can optionally load both fonts:

```ts
import '@public-ui/components/assets/kolicons/style.css';
import '@public-ui/components/assets/codicons/codicon.css';
```

However, we recommend migrating all Codicons to KolIcons for consistency and reduced bundle size.

## Using Third-Party Icon Fonts of the Themes (Optional Peer Dependencies)

Some themes style icons (and text) with third-party fonts. The theme packages declare them as
**optional peer dependencies**: they are not installed automatically by npm, and the bundled copies
in the theme assets keep working unchanged. When your application uses one of these fonts, install
the package and import its CSS once at document level instead of copying the bundled font folders
into your public assets. The glyph classes are identical, and so are the `@font-face` declarations
of the icon fonts:

| Theme                         | Font                  | Install + Import                                                                                     |
| ----------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------- |
| `theme-default`               | Font Awesome 6        | `pnpm add @fortawesome/fontawesome-free` + `import '@fortawesome/fontawesome-free/css/all.min.css';` |
| `theme-default`, `theme-desy` | Codicons              | `pnpm add @vscode/codicons` + `import '@vscode/codicons/dist/codicon.css';`                          |
| `theme-bwst`                  | Font Awesome 6        | `pnpm add @fortawesome/fontawesome-free` + `import '@fortawesome/fontawesome-free/css/all.min.css';` |
| `theme-bwst`                  | Noto Sans (text font) | `pnpm add @fontsource/noto-sans` + `import '@fontsource/noto-sans/400.css';` and `700.css`           |
| `theme-kern`                  | Fira Sans (text font) | `pnpm add @fontsource/fira-sans` + `import '@fontsource/fira-sans/400.css';` … `700.css`             |

The text font imports register their standard family names: `Noto Sans` and `Fira Sans`. `theme-bwst`
keeps referencing its bundled `Noto Sans Regular` until v5, so importing Noto Sans does not change
bwst's rendering — the bundled copy stays the font of that theme for now.

The icon fonts that KoliBri packages ship themselves are importable the same way, through the
packages' `./assets/*` exports:

| Package      | Font                        | Import                                                                     |
| ------------ | --------------------------- | -------------------------------------------------------------------------- |
| every theme  | KolIcons                    | `import '@public-ui/components/assets/kolicons/style.css';`                |
| `theme-ecl`  | ECL Icons (theme-specific)  | `import '@public-ui/theme-ecl/assets/ecl-icons/style.css';`                |
| `theme-desy` | Desy Icons (theme-specific) | `import '@public-ui/theme-desy/assets/desy-icons/style.css';`              |
| `theme-kern` | Material Symbols subset     | `import '@public-ui/theme-kern/assets/material-symbols-subset/style.css';` |

No icon font needs to be copied into a public assets folder — the bundler resolves the font files
of the imported CSS on its own.

Prefer the package imports for new code: **version 5 removes the bundled copies** from the theme
assets (see [BREAKING_CHANGES.v5.md](./BREAKING_CHANGES.v5.md)), where the import above becomes the
only supported way. Loading the bundled font files from your public assets folder keeps working
throughout v4.
