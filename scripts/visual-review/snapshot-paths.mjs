/**
 * Where the visual-test packages keep their snapshots and reports – discovered from the packages
 * themselves, so a new theme package needs no registration here.
 *
 * A package takes part when its `test` script runs `kolibri-visual-test` (directly, or via an
 * `npm-run-all2` delegate as the ecl theme does). The folder below `snapshots/` is derived from the
 * script's THEME_EXPORT the same way playwright.config.js does (`DesyV11` → `theme-desyv11`); it cannot
 * be guessed from the directory name. A package whose `prepare:snapshots` copies another theme's
 * folder (test-tag-name-transformer) has no baseline of its own – `baselineFrom` names the owner.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
const SCAN_DIRS = ['packages', 'packages/themes'];

function readPackageJson(dir) {
	try {
		return JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
	} catch {
		return null;
	}
}

/** The script `test` ends up running, if it is a visual test. */
function visualTestScript(scripts = {}) {
	let script = scripts.test;
	const delegate = script?.match(/^npm-run-all2 (\S+)$/);
	if (delegate) script = scripts[delegate[1]];
	return script?.includes('kolibri-visual-test') ? script : null;
}

export function discoverPackages(root = REPO_ROOT) {
	const found = [];
	for (const scanDir of SCAN_DIRS) {
		const absolute = path.join(root, scanDir);
		if (!fs.existsSync(absolute)) continue;
		for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
			if (!entry.isDirectory()) continue;
			const dir = `${scanDir}/${entry.name}`;
			const pkg = readPackageJson(path.join(root, dir));
			const script = pkg && visualTestScript(pkg.scripts);
			if (!script) continue;
			const themeExport = script.match(/THEME_EXPORT=(\S+)/)?.[1] ?? 'default';
			const copiedFrom = pkg.scripts['prepare:snapshots']?.match(/\.\.\/themes\/([^/\s"']+)\/snapshots/)?.[1];
			found.push({
				name: pkg.name.replace(/^@public-ui\//, ''),
				dir,
				themeDir: `theme-${themeExport.toLocaleLowerCase()}`,
				copiedFromDir: copiedFrom ? `packages/themes/${copiedFrom}` : undefined,
			});
		}
	}
	return found
		.map(({ copiedFromDir, ...pkg }) => {
			if (!copiedFromDir) return pkg;
			const owner = found.find((candidate) => candidate.dir === copiedFromDir);
			if (!owner) throw new Error(`${pkg.name} copies its snapshots from ${copiedFromDir}, which has no visual tests.`);
			return { ...pkg, baselineFrom: owner.name };
		})
		.sort((a, b) => a.name.localeCompare(b.name));
}

export const PACKAGES = discoverPackages();

/** Packages that publish a baseline artifact (everything that generates its own snapshots). */
export const BASELINE_PACKAGES = PACKAGES.filter((pkg) => !pkg.baselineFrom);

export function resolvePackage(name) {
	const pkg = PACKAGES.find((candidate) => candidate.name === name);
	if (!pkg) {
		throw new Error(`Unknown visual-test package "${name}". Known: ${PACKAGES.map((candidate) => candidate.name).join(', ')}`);
	}
	return pkg;
}

/** Repo-relative folder holding the baseline PNGs, e.g. `packages/themes/desy/snapshots/theme-desyv11`. */
export function snapshotDir(pkg) {
	return `${pkg.dir}/snapshots/${pkg.themeDir}`;
}

/** Repo-relative folder the visual reporter writes to. */
export function reportDir(pkg) {
	return `${pkg.dir}/visual-report`;
}
