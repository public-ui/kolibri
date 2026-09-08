import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { mergeReports } from '../../../../scripts/visual-review/merge-reports.mjs';

const H = (n) => `sha256:${String(n).repeat(64)}`;

function write(file, content) {
	fs.mkdirSync(path.dirname(file), { recursive: true });
	fs.writeFileSync(file, content);
}

function artifact(downloadDir, pkg, report, images = []) {
	const dir = path.join(downloadDir, `visual-review-${pkg}`);
	write(
		path.join(dir, 'report.json'),
		JSON.stringify({ schema: 1, mode: 'compare', package: pkg, themeDir: `theme-${pkg}`, baseline: { files: 2, meta: null }, errors: [], ...report }),
	);
	for (const image of images) write(path.join(dir, pkg, image), `png-${image}`);
	return dir;
}

describe('mergeReports', () => {
	let root;
	let downloadDir;
	let outDir;

	beforeEach(() => {
		root = fs.mkdtempSync(path.join(os.tmpdir(), 'merge-reports-'));
		downloadDir = path.join(root, 'downloads');
		outDir = path.join(root, 'out');
		fs.mkdirSync(downloadDir);
	});

	afterEach(() => fs.rmSync(root, { recursive: true, force: true }));

	it('merges the packages, copies only referenced images and aggregates the summary', () => {
		artifact(
			downloadDir,
			'theme-default',
			{
				summary: { unchanged: 1, changed: 1, added: 0, removed: 0, error: 0 },
				digest: H(1),
				items: [
					{ name: 'a--x', route: 'a', status: 'unchanged', hash: H(2) },
					{
						name: 'a--y',
						route: 'a',
						status: 'changed',
						hash: H(3),
						diffPixels: 4,
						diffRatio: 0.5,
						expected: 'theme-default/a--y.expected.png',
						actual: 'theme-default/a--y.actual.png',
						diff: 'theme-default/a--y.diff.png',
					},
				],
			},
			['a--y.expected.png', 'a--y.actual.png', 'a--y.diff.png', 'stray.png'],
		);
		artifact(
			downloadDir,
			'unstyled',
			{
				summary: { unchanged: 0, changed: 0, added: 0, removed: 1, error: 0 },
				digest: H(4),
				baseline: {
					files: 1,
					meta: {
						sha: 'f'.repeat(40),
						ref: 'develop',
						runId: 7,
						image: 'img',
						playwright: '1.60.0',
						createdAt: 'now',
						digest: H(5),
						fallback: null,
						distance: 0,
						imageMismatch: false,
					},
				},
				items: [{ name: 'b', route: 'b', status: 'removed', hash: H(6), expected: 'unstyled/b.expected.png' }],
			},
			['b.expected.png'],
		);
		fs.mkdirSync(path.join(downloadDir, 'other-artifact'));

		const merged = mergeReports(downloadDir, outDir, { pr: 12, head: 'abc', repository: 'o/r', runId: 99 });

		assert.equal(merged.pr, 12);
		assert.deepEqual(merged.summary, { unchanged: 1, changed: 1, added: 0, removed: 1, error: 0 });
		assert.deepEqual(
			merged.packages.map((pkg) => pkg.package),
			['theme-default', 'unstyled'],
		);
		assert.match(merged.digest, /^sha256:[0-9a-f]{64}$/);
		assert.equal(merged.baseline.sha, 'f'.repeat(40));
		assert.equal(merged.baseline.consistent, true);
		assert.equal(merged.packages[0].items[1].diffRatio, 0.5);
		assert.ok(fs.existsSync(path.join(outDir, 'theme-default', 'a--y.diff.png')));
		assert.ok(fs.existsSync(path.join(outDir, 'unstyled', 'b.expected.png')));
		assert.equal(fs.existsSync(path.join(outDir, 'theme-default', 'stray.png')), false, 'unreferenced files are not published');
		assert.deepEqual(JSON.parse(fs.readFileSync(path.join(outDir, 'report.json'), 'utf8')).summary, merged.summary);
	});

	it('rejects reports that point outside their own folder or lie about themselves', () => {
		const base = { summary: { unchanged: 0, changed: 1, added: 0, removed: 0, error: 0 }, digest: H(1) };
		const cases = [
			{ items: [{ name: 'a--x', status: 'changed', hash: H(1), actual: '../../secret.png' }] },
			{ items: [{ name: 'a--x', status: 'changed', hash: H(1), actual: 'theme-default/a--x.actual.png' }], missing: true },
			{ items: [{ name: 'Bad Name', status: 'changed', hash: H(1) }] },
			{ items: [{ name: 'a--x', status: 'weird', hash: H(1) }] },
			{ items: [{ name: 'a--x', status: 'changed', hash: 'nope' }] },
			{ items: [{ name: 'a--x', status: 'unchanged', hash: H(1) }] },
			{ package: 'not/ok', items: [] },
			{ mode: 'update', items: [] },
		];
		for (const [index, testCase] of cases.entries()) {
			const dir = path.join(downloadDir, `case-${index}`);
			fs.mkdirSync(dir);
			const { missing, ...report } = testCase;
			artifact(dir, 'theme-default', { ...base, ...report }, missing ? [] : ['a--x.actual.png']);
			assert.throws(() => mergeReports(dir, path.join(outDir, String(index)), { pr: 1, head: 'x' }), `case ${index} must be rejected`);
		}
	});

	it('accepts the names the spec produces: route segments in either case plus the block id', () => {
		const names = ['combobox-basic-noColumns--hide-label-error', 'input-checkbox-basic-noColumns', 'button-basic--variants-320', 'abbr_basic--x'];
		artifact(downloadDir, 'theme-default', {
			summary: { unchanged: names.length, changed: 0, added: 0, removed: 0, error: 0 },
			digest: H(1),
			items: names.map((name) => ({ name, status: 'unchanged', hash: H(2) })),
		});
		assert.deepEqual(
			mergeReports(downloadDir, outDir, { pr: 1, head: 'x' }).packages[0].items.map((item) => item.name),
			names,
		);
	});

	it('fails without artifacts', () => {
		assert.throws(() => mergeReports(downloadDir, outDir, { pr: 1, head: 'x' }), /No visual-review-\* artifacts/);
	});
});
