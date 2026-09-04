import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { BASELINE_PACKAGES, PACKAGES, reportDir, resolvePackage, snapshotDir } from '../../../../scripts/visual-review/snapshot-paths.mjs';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('../../../..', import.meta.url)));

/** THEME_EXPORT of the script that `test` ends up running (ecl delegates via npm-run-all2). */
function themeExportOf(scripts) {
	let script = scripts.test;
	const delegate = script.match(/^npm-run-all2 (\S+)$/);
	if (delegate) script = scripts[delegate[1]];
	return script.match(/THEME_EXPORT=(\S+)/)[1];
}

describe('snapshot-paths', () => {
	it('lists every package with a visual test script exactly once', () => {
		const names = PACKAGES.map((pkg) => pkg.name);
		assert.deepEqual(names, [...new Set(names)]);
		for (const pkg of PACKAGES) {
			const scripts = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, pkg.dir, 'package.json'), 'utf8')).scripts;
			assert.match(scripts.test, /kolibri-visual-test|npm-run-all2/, `${pkg.name} has no visual test script`);
		}
	});

	it('derives the theme folder from THEME_EXPORT the same way playwright.config.js does', () => {
		for (const pkg of PACKAGES) {
			const scripts = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, pkg.dir, 'package.json'), 'utf8')).scripts;
			assert.equal(pkg.themeDir, `theme-${themeExportOf(scripts).toLocaleLowerCase()}`, pkg.name);
		}
	});

	it('marks packages without their own baseline', () => {
		assert.deepEqual(
			PACKAGES.filter((pkg) => pkg.baselineFrom).map((pkg) => pkg.name),
			['test-tag-name-transformer'],
		);
		assert.equal(BASELINE_PACKAGES.length, PACKAGES.length - 1);
		assert.ok(PACKAGES.some((pkg) => pkg.name === resolvePackage('test-tag-name-transformer').baselineFrom));
	});

	it('resolves folders', () => {
		assert.equal(snapshotDir(resolvePackage('theme-desy')), 'packages/themes/desy/snapshots/theme-desyv11');
		assert.equal(reportDir(resolvePackage('unstyled')), 'packages/unstyled/visual-report');
		assert.throws(() => resolvePackage('nope'), /Unknown visual-test package/);
	});
});
