#!/usr/bin/env node
// Guardrail: package.json scripts must not reference a dependency package via a
// hardcoded relative `node_modules/<pkg>/...` path. Such paths only resolve in
// the pnpm workspace layout; they break once a package is consumed as a published
// dependency, where pnpm's isolated layout places dependencies as siblings in the
// flat .pnpm store rather than nested under the package. Use Node module
// resolution instead — e.g. the `kolibri-copy-assets` bin (packages/components/
// copy-assets.mjs) or require.resolve / import.meta.resolve.
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

// Matches reading INTO a package under node_modules: node_modules/<scope?>/<pkg>/...
const FORBIDDEN = /node_modules\/(@[\w.-]+\/)?[\w.-]+\//;

// Legitimate exceptions: internal, private (never published) build-only packages,
// whose scripts only ever run inside the workspace where the relative path resolves.
const ALLOW = [
	{ pkg: '@public-ui/icons', script: 'svg-fixer' },
	{ pkg: '@public-ui/ecl-icons', script: 'svg-fixer' },
];

function findPackageJsons(dir, out = []) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (entry.name === 'node_modules') continue;
		if (entry.name === '.template-cache') continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			findPackageJsons(full, out);
		} else if (entry.name === 'package.json') {
			out.push(full);
		}
	}
	return out;
}

const files = findPackageJsons('packages');
const violations = [];

for (const file of files) {
	let pkg;
	try {
		pkg = JSON.parse(readFileSync(file, 'utf8'));
	} catch {
		continue;
	}
	for (const [name, command] of Object.entries(pkg.scripts ?? {})) {
		if (typeof command !== 'string') continue;
		if (!FORBIDDEN.test(command)) continue;
		if (command.includes('node_modules/.bin/')) continue;
		if (ALLOW.some((entry) => entry.pkg === pkg.name && entry.script === name)) continue;
		violations.push({ file, name, command });
	}
}

if (violations.length > 0) {
	console.error('✖ Found package.json scripts that read from a hardcoded "node_modules/<pkg>/..." path.');
	console.error('  This breaks once the package is consumed as a published dependency (pnpm isolated layout).');
	console.error('  Resolve packages via Node instead — use the `kolibri-copy-assets` bin');
	console.error('  (packages/components/copy-assets.mjs) or require.resolve / import.meta.resolve.\n');
	for (const violation of violations) {
		console.error(`  ${violation.file}  [${violation.name}]`);
		console.error(`    ${violation.command}`);
	}
	process.exit(1);
}

console.log(`✔ No relative "node_modules/<pkg>" paths found in scripts of ${files.length} package.json files.`);
