/**
 * Single source of truth for where the visual-test packages keep their snapshots and reports.
 *
 * The folder below `snapshots/` is derived from the theme's export name (THEME_EXPORT in the package's
 * `test` script, lower-cased by playwright.config.js), which cannot be guessed from the directory name
 * (`desy` → `theme-desyv11`, `kern` → `theme-kern_v2`). The test in
 * packages/tools/visual-tests/test/snapshot-paths.test.mjs keeps this table in sync with the scripts.
 *
 * `test-tag-name-transformer` has no baseline of its own: its `prepare:snapshots` script copies the
 * default theme's folder before every run.
 */
export const PACKAGES = [
	{ name: 'theme-bwst', dir: 'packages/themes/bwst', themeDir: 'theme-bwst' },
	{ name: 'theme-default', dir: 'packages/themes/default', themeDir: 'theme-default' },
	{ name: 'theme-desy', dir: 'packages/themes/desy', themeDir: 'theme-desyv11' },
	{ name: 'theme-ecl', dir: 'packages/themes/ecl', themeDir: 'theme-ecl_ec' },
	{ name: 'theme-kern', dir: 'packages/themes/kern', themeDir: 'theme-kern_v2' },
	{ name: 'unstyled', dir: 'packages/unstyled', themeDir: 'theme-unstyled' },
	{ name: 'test-tag-name-transformer', dir: 'packages/test-tag-name-transformer', themeDir: 'theme-default', baselineFrom: 'theme-default' },
];

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
