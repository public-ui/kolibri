#!/usr/bin/env bash
# Wraps pnpm publish: tolerates "already exists" errors, fails on everything else.
set -euo pipefail

OUTPUT=$(pnpm publish "$@" 2>&1)
EXIT_CODE=$?
echo "$OUTPUT"

if [ $EXIT_CODE -ne 0 ]; then
  echo "$OUTPUT" | grep -qE "already exists|previously published|E409|409 Conflict|EPUBLISHCONFLICT" \
    && echo "⚠️ Publish skipped – package already exists" \
    || exit 1
fi
