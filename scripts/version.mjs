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

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

// --- semver bump (no external deps) ---

function bumpVersion(current, increment, preid) {
	const dashIdx = current.indexOf('-');
	const releaseStr = dashIdx >= 0 ? current.slice(0, dashIdx) : current;
	const preStr = dashIdx >= 0 ? current.slice(dashIdx + 1) : null;
	const [major, minor, patch] = releaseStr.split('.').map(Number);

	switch (increment) {
		case 'major':
			return `${major + 1}.0.0`;
		case 'minor':
			return `${major}.${minor + 1}.0`;
		case 'patch':
			return `${major}.${minor}.${patch + 1}`;
		case 'premajor': {
			const base = `${major + 1}.0.0`;
			return preid ? `${base}-${preid}.0` : `${base}-0`;
		}
		case 'preminor': {
			const base = `${major}.${minor + 1}.0`;
			return preid ? `${base}-${preid}.0` : `${base}-0`;
		}
		case 'prepatch': {
			const base = `${major}.${minor}.${patch + 1}`;
			return preid ? `${base}-${preid}.0` : `${base}-0`;
		}
		case 'prerelease': {
			if (preStr) {
				const parts = preStr.split('.');
				const lastNum = parseInt(parts[parts.length - 1], 10);
				if (!isNaN(lastNum)) {
					if (preid && parts[0] !== preid) {
						return `${releaseStr}-${preid}.0`;
					}
					parts[parts.length - 1] = String(lastNum + 1);
					return `${releaseStr}-${parts.join('.')}`;
				}
			}
			const base = `${major}.${minor}.${patch + 1}`;
			return preid ? `${base}-${preid}.0` : `${base}-0`;
		}
		default:
			throw new Error(`Unknown increment: "${increment}". Valid: major, minor, patch, premajor, preminor, prepatch, prerelease`);
	}
}

// --- parse args ---

const args = process.argv.slice(2);
const increment = args.find((a) => !a.startsWith('-'));
const preidArg = args.find((a) => a.startsWith('--preid='));
const preid = preidArg ? preidArg.split('=')[1] : undefined;
const noPush = args.includes('--no-push');

if (!increment) {
	console.error('Usage: node scripts/version.mjs <increment> [--preid=<label>] [--no-push]');
	process.exit(1);
}

// --- find workspace packages ---

const pkgs = JSON.parse(execSync('pnpm ls --recursive --json --depth 0', { cwd: ROOT }).toString());

// Skip the root (no name) and private packages
const publicPkgs = pkgs.filter((p) => p.name && !p.private);

if (publicPkgs.length === 0) {
	console.error('No public workspace packages found.');
	process.exit(1);
}

// All public packages must share the same version (fixed versioning)
const currentVersion = publicPkgs[0].version;
const newVersion = bumpVersion(currentVersion, increment, preid || undefined);

console.log(`Bumping ${currentVersion} → ${newVersion} across ${publicPkgs.length} packages`);

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

run('git add -A');
run(`git commit -m "chore: release ${newVersion}"`);
run(`git tag "${newVersion}"`);

if (!noPush) {
	run('git push');
	run(`git push origin "${newVersion}"`);
}

console.log(`\nDone! Version ${newVersion} committed and tagged.`);
