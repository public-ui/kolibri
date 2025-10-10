# KoliBri - Themes

[![npm](https://img.shields.io/npm/v/@public-ui/themes)](https://www.npmjs.com/package/@public-ui/components)
[![license](https://img.shields.io/npm/l/@public-ui/themes)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/themes)](https://www.npmjs.com/package/@public-ui/themes)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/themes)](https://bundlephobia.com/result?p=@public-ui/themes)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

The **Themes** module contains numerous themes (style guides) for the component library. They can be loaded in combination with the Components module.

You can read more about **modularization** in the [architecture concept](https://public-ui.github.io/docs/concepts/architecture).

More about the **project** can be found in the [documentation](https://public-ui.github.io/docs).

## Installation

You can install the KoliBri themes with `npm`, `pnpm` or `yarn`:

```bash
npm i @public-ui/themes
pnpm i @public-ui/themes
yarn add @public-ui/themes
```

## Usage

Register the themes like this:

```tsx
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { DEFAULT, ECL_EC, ECL_EU } from '@public-ui/themes';

register(
	DEFAULT,
	// or provide an array to register multiple themes:
	// [DEFAULT, ECL_EC, ECL_EU]
	defineCustomElements,
)
	.then(() => {
		/* KoliBri ready */
	})
	.catch((error) => {
		/* Handle errors */
	});
```

Override theme tokens in your own stylesheet as needed. The [default theme README](./default/README.md) lists all available variables.

## NVDA-gestützte Visualtests

Die Screenreader-Szenarien laufen innerhalb der visuellen Regressionstests und benötigen eine vorbereitete Windows-Umgebung.

### Voraussetzungen

- Nutze die bereitgestellten Skripte wie `pnpm run test:screen-reader` bzw. `pnpm run test-update:screen-reader`. Sie setzen `THEME_MODULE`, `THEME_EXPORT` und `KOLIBRI_SCREEN_READER=1` automatisch und führen `kolibri-visual-test` mit dem passenden `@screen-reader`-Filter aus.
- Installiere und konfiguriere NVDA über [`@guidepup/setup`](https://www.npmjs.com/package/@guidepup/setup); automatisierte Abläufe funktionieren nur unter Windows.

### Tests starten

1. Öffne eine Windows-Shell im Theme-Verzeichnis oder verwende `pnpm --filter <dein-theme> …` im Monorepo-Stamm.
2. Führe die Screenreader-Szenarien mit `pnpm run test:screen-reader` aus. In Kombination mit `pnpm --filter` kannst du dies auch direkt aus dem Monorepo-Stamm tun, z. B. `pnpm --filter @public-ui/theme-default run test:screen-reader`.
3. Für alle Themes gleichzeitig steht `pnpm run test-all:screen-reader` im Paket `@public-ui/themes` bereit.

### Snapshots pflegen

- Beim ersten Durchlauf legt das Tool ein `snapshots`-Verzeichnis an; committe die generierten Referenzen.
- Aktualisiere geänderte Referenzen über `pnpm run test-update:screen-reader` (bzw. `pnpm run test-update-all:screen-reader` im Workspace).

## Important settings

### Usage of pnpm

We use **pnpm** as package manager and there is a tiny typing issue with the default typescript setup.

**What do we know?**

This seems to be a general issue:

- <https://github.com/microsoft/TypeScript/issues/29221>
- <https://github.com/microsoft/TypeScript/issues/48212>

**Solution:**

We must activate the specific option `preserveSymlinks` in the `tsconfig.json` file.

```json
  ...
  "preserveSymlinks": true,
  ...
```
