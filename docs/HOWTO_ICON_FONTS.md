# HOWTO: Bundle KoliBri Icon Fonts

KoliBri ships the [`kol-icon`](https://public-ui.github.io/components/icon/) component to render pictograms. The component expects a font-based icon set such as [Codicon](https://github.com/microsoft/vscode-codicons) to be available at runtime. If the font files are missing, `kol-icon` falls back to empty boxes.

This guide shows how to install and bundle the font assets that are published with `@public-ui/components`.

## 1. Install the assets

The icon fonts are part of the KoliBri component package. Ensure your project depends on it:

```bash
pnpm add @public-ui/components
# or
npm install @public-ui/components
```

After installation the font files live inside `node_modules/@public-ui/components/assets/codicons/`.

## 2. Import the CSS next to your global styles

The CSS file declares the `codicon` font-face and points to the matching `codicon.ttf` file. Import it once inside your application entry point or global stylesheet:

```ts
// main.ts / index.tsx
import '@public-ui/components/assets/codicons/codicon.css';
```

For bundlers that do not understand CSS imports, copy `codicon.css` and `codicon.ttf` into your public assets folder and load them manually in `index.html`:

```html
<link rel="stylesheet" href="/assets/codicons/codicon.css" />
```

Make sure the relative path inside `codicon.css` still points to the TTF file after copying.

## 3. Reference the icons from components

Use Codicon class names via the `_icons` property. Multiple icons can be provided by separating classes with a space:

```tsx
<KolButton _label="Save" _icons="codicon codicon-save" />
```

The first class (`codicon`) ensures the font family is applied, the second selects the glyph.

## 4. Serve the font file

Verify that your build pipeline copies `codicon.ttf` into the final distribution folder. Frameworks such as Next.js, Vite, and Angular CLI automatically include imported assets when the CSS file is referenced. For custom setups, add a build step that copies the font file alongside your compiled assets:

```bash
cp node_modules/@public-ui/components/assets/codicons/codicon.ttf dist/assets/codicons/
```

## 5. Test your setup

Load a page that renders `kol-icon` or any component using `_icons`. You should no longer see empty boxes. Browser developer tools let you check that the `codicon.ttf` file is requested successfully.

Keeping the CSS import in place ensures AI agents and developers alike ship the correct assets whenever `kol-icon` is used.
