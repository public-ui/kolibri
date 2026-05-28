#!/usr/bin/env bash
# Wraps pnpm publish: tolerates "already exists" errors, fails on everything else.
# For dev builds, removes the dist-tag after publishing so the version exists
# on npm but is not reachable via any tag.
set -euo pipefail

TAG_VALUE=""
PREV=""
for arg in "$@"; do
  [ "$PREV" = "--tag" ] && TAG_VALUE="$arg"
  PREV="$arg"
done

OUTPUT=$(pnpm publish "$@" 2>&1)
EXIT_CODE=$?
echo "$OUTPUT"

if [ $EXIT_CODE -ne 0 ]; then
  echo "$OUTPUT" | grep -qE "already exists|previously published|E409|409 Conflict|EPUBLISHCONFLICT" \
    && echo "⚠️ Publish skipped – package already exists" \
    || exit 1
fi

if [ "$TAG_VALUE" = "dev" ] && [ "$EXIT_CODE" = "0" ]; then
  PKG=$(node -p "require('./package.json').name")
  npm dist-tag rm "$PKG" dev 2>/dev/null && echo "🗑️ Removed 'dev' dist-tag from $PKG" || true
fi
