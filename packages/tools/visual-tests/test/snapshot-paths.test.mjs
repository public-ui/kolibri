import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { describe, it } from 'node:test';
import { BASELINE_PACKAGES, PACKAGES, discoverPackages, reportDir, resolvePackage, snapshotDir } from '../../../../scripts/visual-review/snapshot-paths.mjs';

function writePackage(root, dir, pkg) {
	fs.mkdirSync(path.join(root, dir), { recursive: true });
	fs.writeFileSync(path.join(root, dir, 'package.json'), JSON.stringify(pkg));
}

describe('snapshot-paths', () => {
	it('discovers every package of this repository that runs the visual tests', () => {
		assert.deepEqual(
			PACKAGES.map((pkg) => `${pkg.name} ${pkg.dir} ${pkg.themeDir}${pkg.baselineFrom ? ` (baseline of ${pkg.baselineFrom})` : ''}`),
			[
				'test-tag-name-transformer packages/test-tag-name-transformer theme-default (baseline of theme-default)',
				'theme-bwst packages/themes/bwst theme-bwst',
				'theme-default packages/themes/default theme-default',
				'theme-desy packages/themes/desy theme-desyv11',
				'theme-ecl packages/themes/ecl theme-ecl_ec',
				'theme-kern packages/themes/kern theme-kern_v2',
				'unstyled packages/unstyled theme-unstyled',
			],
		);
		assert.deepEqual(
			BASELINE_PACKAGES.map((pkg) => pkg.name),
			PACKAGES.filter((pkg) => !pkg.baselineFrom).map((pkg) => pkg.name),
		);
	});

	it('derives the theme folder from THEME_EXPORT and the baseline owner from prepare:snapshots', () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), 'snapshot-paths-'));
		try {
			writePackage(root, 'packages/themes/foo', { name: '@public-ui/theme-foo', scripts: { test: 'cross-env THEME_EXPORT=FooV2 kolibri-visual-test' } });
			writePackage(root, 'packages/themes/bar', {
				name: '@public-ui/theme-bar',
				scripts: { test: 'npm-run-all2 test:theme:bar-a', 'test:theme:bar-a': 'cross-env THEME_EXPORT=BAR_A kolibri-visual-test' },
			});
			writePackage(root, 'packages/copycat', {
				name: '@public-ui/copycat',
				scripts: { 'prepare:snapshots': 'cpy "../themes/foo/snapshots" ./ --dot', test: 'cross-env THEME_EXPORT=FooV2 kolibri-visual-test' },
			});
			writePackage(root, 'packages/plain', { name: '@public-ui/plain', scripts: { test: 'vitest' } });
			writePackage(root, 'packages/themes', { name: '@public-ui/themes', scripts: { test: 'pnpm -r test' } });

			assert.deepEqual(discoverPackages(root), [
				{ name: 'copycat', dir: 'packages/copycat', themeDir: 'theme-foov2', baselineFrom: 'theme-foo' },
				{ name: 'theme-bar', dir: 'packages/themes/bar', themeDir: 'theme-bar_a' },
				{ name: 'theme-foo', dir: 'packages/themes/foo', themeDir: 'theme-foov2' },
			]);
		} finally {
			fs.rmSync(root, { recursive: true, force: true });
		}
	});

	it('refuses a copier whose source has no visual tests', () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), 'snapshot-paths-'));
		try {
			writePackage(root, 'packages/copycat', {
				name: '@public-ui/copycat',
				scripts: { 'prepare:snapshots': 'cpy "../themes/gone/snapshots" ./ --dot', test: 'kolibri-visual-test' },
			});
			assert.throws(() => discoverPackages(root), /copies its snapshots from packages\/themes\/gone/);
		} finally {
			fs.rmSync(root, { recursive: true, force: true });
		}
	});

	it('resolves folders', () => {
		assert.equal(snapshotDir(resolvePackage('theme-desy')), 'packages/themes/desy/snapshots/theme-desyv11');
		assert.equal(reportDir(resolvePackage('unstyled')), 'packages/unstyled/visual-report');
		assert.throws(() => resolvePackage('nope'), /Unknown visual-test package/);
	});
});
