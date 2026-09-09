# KoliBri - React Sample App

[![npm](https://img.shields.io/npm/v/@public-ui/sample-react)](https://www.npmjs.com/package/@public-ui/components)
[![license](https://img.shields.io/npm/l/@public-ui/sample-react)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/sample-react)](https://www.npmjs.com/package/@public-ui/sample-react)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/sample-react)](https://bundlephobia.com/result?p=@public-ui/sample-react)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

## Motivation

This app demonstrates all KoliBri components in a small React project.

Live example: <https://develop--kolibri-public-ui.netlify.app>

The sample is built with **Vite** for fast development and production builds.

## Folder structure

- `src/react.main.tsx` – bootstraps the app and sets up theming
- `src/components` – component demos organized by folder
- `src/scenarios` – cross component scenarios
- `src/shares` – shared utilities

## Color scheme

The Sidebar carries a **Color scheme** select with the states Auto, Light and Dark. Auto leaves `--kolibri-color-scheme` unset so the operating system decides; the other two win over it. The choice applies without a reload and is remembered in `localStorage`, and `?colorScheme=dark` on a route sets it from a link.

The mechanics live in `src/shares/colorScheme.ts` and `src/hooks/useColorScheme.ts`, modelled on the visual block outline next to them. Because this package is mounted by both the presentation app and the visual-test host app, the select appears in both.

## Installation and usage

```bash
git clone git@github.com:public-ui/kolibri.git
cd kolibri
pnpm install
pnpm -r build
cd packages/samples/react
pnpm start
```

Run `pnpm start` from this directory to launch the development server.
