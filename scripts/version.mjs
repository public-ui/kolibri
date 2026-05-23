#!/usr/bin/env node
/**
 * Replaces `lerna version` for bumping all non-private workspace packages to the same version.
 *
 * Usage:
 *   node scripts/version.mjs <increment> [--preid=<label>] [--no-push]
 *
 * increment: major | minor | patch | premajor | preminor | prepatch | prerelease
 * --preid:   pre-release identifier, e.g. rc, beta, alpha, or a git SHA
 * --no-push: skip `git push` after committing (used for dev-tag releases)
 */

import { readFileSync, writeFileSync, globSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

// --- parse args ---

const VALID_INCREMENTS = new Set(['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease']);

const args = process.argv.slice(2);
const increment = args.find((a) => !a.startsWith('-'));
const preidArg = args.find((a) => a.startsWith('--preid='));
const preid = preidArg ? preidArg.split('=')[1] : undefined;
const noPush = args.includes('--no-push');

if (!increment) {
	console.error('Usage: node scripts/version.mjs <increment> [--preid=<label>] [--no-push]');
	process.exit(1);
}

if (!VALID_INCREMENTS.has(increment)) {
	console.error(`Invalid increment: "${increment}". Valid: ${[...VALID_INCREMENTS].join(', ')}`);
	process.exit(1);
}

// --- find workspace packages ---

/**
 * Reads pnpm-workspace.yaml and returns all non-private workspace packages
 * directly from the file system, without requiring an installed node_modules.
 */
function getWorkspacePackages() {
	const workspaceYaml = readFileSync(join(ROOT, 'pnpm-workspace.yaml'), 'utf8');
	const patterns = [...workspaceYaml.matchAll(/^\s+-\s+(.+)$/gm)].map((m) => m[1].trim());
	const packages = [];
	for (const pattern of patterns) {
		const pkgJsonPaths = globSync(join(ROOT, pattern, 'package.json'));
		for (const pkgJsonPath of pkgJsonPaths) {
			const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));
			if (pkgJson.name && !pkgJson.private) {
				packages.push({ name: pkgJson.name, version: pkgJson.version, path: dirname(pkgJsonPath) });
			}
		}
	}
	return packages;
}

const publicPkgs = getWorkspacePackages();

if (publicPkgs.length === 0) {
	console.error('No public workspace packages found.');
	process.exit(1);
}

// All public packages must match the root version (fixed versioning, root is SSOT)
const rootVersion = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version;
const drifted = publicPkgs.filter((p) => p.version !== rootVersion);
if (drifted.length > 0) {
	console.error(`Package version drift detected (root is ${rootVersion}):`);
	for (const p of drifted) console.error(`  ${p.name}: ${p.version}`);
	console.error('Fix the version drift manually before running this script.');
	process.exit(1);
}

// Bump the root version via pnpm's built-in semver (triggers the `version` lifecycle which
// updates publiccode.yml). The lifecycle runs after the version is written to package.json.
const versionArgs = ['version', increment, '--no-git-tag-version'];
if (preid) versionArgs.push(`--preid=${preid}`);
execSync(`pnpm ${versionArgs.join(' ')}`, { cwd: ROOT, stdio: 'inherit' });

const newVersion = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version;
console.log(`Bumped ${rootVersion} → ${newVersion} across ${publicPkgs.length} packages`);

// --- update package.json files ---

for (const pkg of publicPkgs) {
	const pkgJsonPath = join(pkg.path, 'package.json');
	const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));
	pkgJson.version = newVersion;
	writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, '\t') + '\n');
	console.log(`  updated ${pkg.name}`);
}

// --- update lockfile ---

execSync('pnpm install --lockfile-only', { cwd: ROOT, stdio: 'inherit' });

// --- git commit + tag ---

const run = (cmd) => execSync(cmd, { cwd: ROOT, stdio: 'inherit' });

run('git add -u');
run(`git commit -m "chore: release ${newVersion}"`);
run(`git tag -a "${newVersion}" -m "chore: release ${newVersion}"`);

if (!noPush) {
	run('git push --follow-tags');
}

console.log(`\nDone! Version ${newVersion} committed and tagged.`);
