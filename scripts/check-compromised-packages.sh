#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOCKFILE="${SCRIPT_DIR}/../pnpm-lock.yaml"

node - <<'NODE' "$LOCKFILE"
const fs = require('fs');
const lockfilePath = process.argv[2];
const content = fs.readFileSync(lockfilePath, 'utf8');
const compromised = [
  'debug@4.4.2',
  'chalk@5.6.1'
];
const found = compromised.filter(pkg => content.includes(pkg));
if (found.length) {
  console.error(`Found compromised packages in pnpm-lock.yaml: ${found.join(', ')}`);
  process.exit(1);
}
NODE

echo "No compromised packages found."
