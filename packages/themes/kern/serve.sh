#! /usr/bin/env bash
set -e

THEME_DIR="$(cd "$(dirname "$0")" && pwd)"

export THEME_MODULE="$THEME_DIR/dist"
export THEME_EXPORT=$1
export THEME_CSS="$THEME_DIR/inject-assets.css"

# The foreign fonts are peer dependencies and are not part of the theme assets. Copy them from
# node_modules so inject-assets.css can serve them (see BREAKING_CHANGES.v5.md).
mkdir -p "$THEME_DIR/assets/peer-fonts"
cp -R "$THEME_DIR/node_modules/@fontsource/fira-sans/." "$THEME_DIR/assets/peer-fonts/fira-sans/"

# The presentation app is the host: it reads THEME_MODULE / THEME_EXPORT / THEME_CSS and mounts the
# sample app with only that one theme registered. `serve` is plain Vite without opening a browser;
# `pnpm preview` of this package runs it next to `rollup -c --watch`, which owns the theme's dist.
cd "$THEME_DIR/../../samples/presentation"
pnpm serve
