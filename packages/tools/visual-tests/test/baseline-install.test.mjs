import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { installBaseline } from '../../../../scripts/visual-review/install-baseline.mjs';
import { selectBaseline } from '../../../../scripts/visual-review/select-baseline.mjs';
import { resolvePackage } from '../../../../scripts/visual-review/snapshot-paths.mjs';

const IMAGE = 'mcr.microsoft.com/playwright:v1.60.0-noble';

function write(file, content) {
	fs.mkdirSync(path.dirname(file), { recursive: true });
	fs.writeFileSync(file, content);
}

function artifactFolder(root, name, { files = 2, image = IMAGE } = {}) {
	const dir = path.join(root, name);
	for (let i = 0; i < files; i += 1) write(path.join(dir, 'snapshots', 'theme-default', `a--${i}-firefox-linux.png`), `png-${i}`);
	write(path.join(dir, 'meta.json'), JSON.stringify({ sha: 'b'.repeat(40), ref: 'develop', image, files, digest: `sha256:${'1'.repeat(64)}` }));
	return dir;
}

describe('installBaseline', () => {
	let root;
	beforeEach(() => {
		root = fs.mkdtempSync(path.join(os.tmpdir(), 'install-baseline-'));
	});
	afterEach(() => fs.rmSync(root, { recursive: true, force: true }));

	it('copies the artifact into the snapshot folder and records the baseline', () => {
		const download = artifactFolder(root, 'download');
		write(path.join(root, 'packages/themes/default/snapshots/theme-default/stale-firefox-linux.png'), 'old');
		const result = installBaseline({
			pkg: resolvePackage('theme-default'),
			downloadDir: download,
			root,
			selection: { base: 'c'.repeat(40), branch: 'develop', fallback: null, distance: 0, artifactId: 7, image: IMAGE },
		});
		assert.equal(result.files, 2);
		assert.deepEqual(fs.readdirSync(path.join(root, 'packages/themes/default/snapshots/theme-default')).sort(), [
			'a--0-firefox-linux.png',
			'a--1-firefox-linux.png',
		]);
		const baseline = JSON.parse(fs.readFileSync(path.join(root, 'packages/themes/default/visual-report/baseline.json'), 'utf8'));
		assert.equal(baseline.sha, 'b'.repeat(40));
		assert.equal(baseline.base, 'c'.repeat(40));
		assert.equal(baseline.fallback, null);
		assert.equal(baseline.imageMismatch, false);
	});

	it('installs the owner baseline for a package that copies another theme and flags image mismatches', () => {
		const download = artifactFolder(root, 'nested/visual-baseline-theme-default', { image: 'mcr.microsoft.com/playwright:v1.61.0-noble' });
		installBaseline({
			pkg: resolvePackage('test-tag-name-transformer'),
			downloadDir: path.dirname(download),
			root,
			selection: { base: 'c'.repeat(40), branch: 'develop', fallback: 'ancestor', distance: 2, artifactId: 8, image: IMAGE },
		});
		assert.ok(fs.existsSync(path.join(root, 'packages/themes/default/snapshots/theme-default/a--0-firefox-linux.png')));
		const baseline = JSON.parse(fs.readFileSync(path.join(root, 'packages/test-tag-name-transformer/visual-report/baseline.json'), 'utf8'));
		assert.equal(baseline.fallback, 'ancestor');
		assert.equal(baseline.distance, 2);
		assert.equal(baseline.imageMismatch, true);
	});

	it('leaves a placeholder without a baseline and rejects inconsistent artifacts', () => {
		const none = installBaseline({
			pkg: resolvePackage('unstyled'),
			downloadDir: path.join(root, 'missing'),
			root,
			selection: { base: 'c'.repeat(40), branch: 'develop', fallback: 'none', distance: null, artifactId: null, image: IMAGE },
		});
		assert.equal(none.files, 0);
		assert.deepEqual(fs.readdirSync(path.join(root, 'packages/unstyled/snapshots/theme-unstyled')), ['.baseline-none']);
		assert.equal(JSON.parse(fs.readFileSync(path.join(root, 'packages/unstyled/visual-report/baseline.json'), 'utf8')).fallback, 'none');

		const download = artifactFolder(root, 'short', { files: 2 });
		fs.rmSync(path.join(download, 'snapshots/theme-default/a--1-firefox-linux.png'));
		assert.throws(
			() => installBaseline({ pkg: resolvePackage('theme-default'), downloadDir: download, root, selection: { fallback: null, image: IMAGE } }),
			/lists 2 files, 1 were extracted/,
		);
	});
});

describe('selectBaseline', () => {
	function fakeApi({ artifacts, history, runs = [] }) {
		return {
			get: async (p) => {
				if (p.includes('/commits?')) return history;
				if (p.includes('/actions/runs?')) return { workflow_runs: runs };
				throw new Error(`unexpected ${p}`);
			},
			paginate: async (p) => {
				if (p.includes('/actions/artifacts?name=visual-baseline-theme-default')) return artifacts;
				throw new Error(`unexpected ${p}`);
			},
		};
	}
	const artifact = (id, sha, created) => ({
		id,
		expired: false,
		created_at: created,
		workflow_run: { id: id * 10, head_sha: sha, head_branch: 'develop', head_repository_id: 1 },
	});

	it('takes the artifact of the base commit and resolves the owner for copying packages', async () => {
		const api = fakeApi({ artifacts: [artifact(1, 'base', '2026-09-01T00:00:00Z')], history: [{ sha: 'base' }, { sha: 'older' }] });
		const selection = await selectBaseline({
			api,
			repository: 'o/r',
			pkg: resolvePackage('test-tag-name-transformer'),
			base: 'base',
			branch: 'develop',
			repositoryId: 1,
			waitMinutes: 0,
		});
		assert.equal(selection.baselinePackage, 'theme-default');
		assert.equal(selection.artifactId, 1);
		assert.equal(selection.runId, 10);
		assert.equal(selection.distance, 0);
		assert.equal(selection.fallback, null);
	});

	it('falls back to an ancestor when the base commit has no artifact and no run is pending', async () => {
		const api = fakeApi({ artifacts: [artifact(2, 'older', '2026-09-01T00:00:00Z')], history: [{ sha: 'base' }, { sha: 'older' }] });
		const selection = await selectBaseline({
			api,
			repository: 'o/r',
			pkg: resolvePackage('theme-default'),
			base: 'base',
			branch: 'develop',
			repositoryId: 1,
			waitMinutes: 0,
		});
		assert.equal(selection.sha, 'older');
		assert.equal(selection.distance, 1);
		assert.equal(selection.fallback, 'ancestor');
	});

	it('reports none when nothing usable exists', async () => {
		const api = fakeApi({ artifacts: [], history: [] });
		const selection = await selectBaseline({
			api,
			repository: 'o/r',
			pkg: resolvePackage('theme-default'),
			base: 'base',
			branch: 'develop',
			repositoryId: 1,
			waitMinutes: 0,
		});
		assert.equal(selection.artifactId, null);
		assert.equal(selection.fallback, 'none');
	});
});
