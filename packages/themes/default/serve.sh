#! /usr/bin/env bash
set -e

THEME_DIR="$(cd "$(dirname "$0")" && pwd)"

export THEME_MODULE="$THEME_DIR/dist"
export THEME_EXPORT=$1
export THEME_CSS="$THEME_DIR/inject-assets.css"

# The presentation app is the host: it reads THEME_MODULE / THEME_EXPORT / THEME_CSS and mounts the
# sample app with only that one theme registered. Its `serve` script deliberately skips the
# dependency build, because `pnpm start` of this package runs `rollup -c --watch` alongside and owns
# the theme's dist.
cd "$THEME_DIR/../../samples/presentation"
pnpm serve
