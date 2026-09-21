# KoliBri – Presentation App

[![npm](https://img.shields.io/npm/v/@public-ui/presentation)](https://www.npmjs.com/package/@public-ui/presentation)
[![license](https://img.shields.io/npm/l/@public-ui/presentation)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

Presentation shell for the KoliBri React sample app. It ships the sample experience from `@public-ui/sample-react` but adds switches to inject other themes (local or remote) for demos, visual checks, and regression testing. Built with **Vite**.

## What this package adds

- Uses the sample app UI while letting you load an alternative theme modules.
- Optional theme CSS injection for assets like font-face declarations.
- Tweak helpers for quick experiments: tag name transformer, translation overrides, and theme patching toggles.

## Folder structure

- `src/main.ts` – Vite entry; imports UnoCSS, base styles, and optional `THEME_CSS` file.
- `src/react.main.tsx` – boots the sample app, registers components, and wires theme injection/toggles.
- `src/@shared` – shared utilities used by the presentation shell.

## Run locally

```powershell
# From repo root
pnpm i --ignore-scripts
pnpm -r build

cd packages/samples/presentation
pnpm prepare:components; pnpm prepare:themes
pnpm start
```

`pnpm start` opens the Vite dev server with the default theme set bundled in `@public-ui/themes`.

## Injecting a different theme

Set `THEME_MODULE` to the ESM bundle you want to use and optionally `THEME_EXPORT` to the named export that exposes the theme (defaults to `default`). `THEME_CSS` can point to an extra stylesheet (e.g., custom fonts).

```powershell
$env:THEME_MODULE="/public/assets/custom-theme/dist/index.es.js"
$env:THEME_EXPORT="DEFAULT"  # optional
$env:THEME_CSS="/public/assets/custom-theme/fonts.css"  # optional
pnpm start
```

On Windows the leading slash is required for the dynamic import; `main.ts` handles this automatically.

You can also add static entries to the sample theme selector by editing the `customThemes` list passed to `<App />` in `src/react.main.tsx`.

## Color scheme

The Sidebar carries a **Color scheme** select next to the theme select, with three states:

- **Auto** removes the app's own `color-scheme` override again, so the `:root { color-scheme: light dark }` of this app applies and the operating system decides.
- **Light** and **Dark** set `color-scheme` on `<html>` and win over the operating system.

`color-scheme` is an inherited CSS property, so the choice reaches the page and every KoliBri component alike — the themes declare none of their own. The choice takes effect without a reload and is remembered in `localStorage`. `#<route>?colorScheme=dark` opens a route in a given scheme right away and wins over the remembered value without overwriting it, which makes it easy to share a link. The parameter combines with `hideMenus` and `visualBlocks`.

Only `@public-ui/theme-default` ships a dark palette so far. With any other theme selected, the select shows a hint saying so.

## Runtime toggles

You can enable the dev helpers via environment variables or hash query parameters (e.g., `#?enableThemePatching`).

- `ENABLE_THEME_PATCHING` – apply small CSS patches through `KoliBriDevHelper`.
- `ENABLE_I18N_OVERWRITING` – add demo translations on top of built-in locales.
- `ENABLE_TAG_NAME_TRANSFORMER` – append `-sample` to custom element tag names to avoid collisions.

Example (PowerShell):

```powershell
$env:ENABLE_THEME_PATCHING="true"; pnpm start
```

## Notes

- `pnpm start` builds the workspace dependencies first (`build:deps`), so it never serves a stale theme package. `pnpm serve` skips that step on purpose: it is what `serve.sh` of a theme package calls while that package's own `rollup --watch` already owns its `dist`.

- Keep theme modules built before injecting them; use `pnpm --filter @public-ui/themes build` if you are working on a local theme.
- Assets are copied into `public/assets` via `pnpm prepare:components` and `pnpm prepare:themes`.
