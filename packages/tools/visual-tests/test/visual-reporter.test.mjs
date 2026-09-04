import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import VisualReporter, { SNAPSHOT_ANNOTATION, SPEC_FILE, routeToSnapshotName } from '../src/visual-reporter.js';

const PLATFORM = process.platform;
const SUFFIX = `-firefox-${PLATFORM}.png`;
const SPEC_PATH = path.join('tests', SPEC_FILE);
const CONFIG = { updateSnapshots: 'missing', projects: [{ name: 'firefox' }] };
const SUITE = { suites: [{ project: () => ({ name: 'firefox' }) }] };

/** A PNG header that declares `width` × `height` pixels – all the reporter reads from an image. */
function png(width, height, salt = '') {
	const header = Buffer.alloc(24);
	Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(header, 0);
	header.writeUInt32BE(13, 8);
	header.write('IHDR', 12, 'latin1');
	header.writeUInt32BE(width, 16);
	header.writeUInt32BE(height, 20);
	return Buffer.concat([header, Buffer.from(`payload-${salt}`)]);
}

function write(file, content) {
	fs.mkdirSync(path.dirname(file), { recursive: true });
	fs.writeFileSync(file, content);
	return file;
}

function fakeTest(route, extra = {}) {
	return { id: route, title: `snapshot for ${route}`, location: { file: SPEC_PATH }, annotations: [], ...extra };
}

function fakeResult(extra = {}) {
	return { retry: 0, status: 'passed', errors: [], attachments: [], annotations: [], ...extra };
}

function annotation(fileName) {
	return { type: SNAPSHOT_ANNOTATION, description: fileName };
}

function attachment(name, file) {
	return { name, contentType: 'image/png', path: file };
}

describe('routeToSnapshotName', () => {
	it('mirrors the file naming of the spec and never produces the block separator', () => {
		assert.equal(routeToSnapshotName('button/variants?x=1&y=2'), 'button-variants-x-1-y-2');
		assert.equal(routeToSnapshotName('table/basic/?sort='), 'table-basic-sort-');
		assert.doesNotMatch(routeToSnapshotName('a//b?=c'), /--/);
	});
});

describe('theme-snapshots.spec.js', () => {
	const source = fs.readFileSync(fileURLToPath(new URL(`../tests/${SPEC_FILE}`, import.meta.url)), 'utf8');

	it('captures every screenshot through captureSnapshot, which announces it to the reporter', () => {
		const calls = source.match(/toHaveScreenshot\(/g) ?? [];
		assert.equal(calls.length, 1, 'toHaveScreenshot must only be called inside captureSnapshot');
		const helper = source.match(/async function captureSnapshot\([^)]*\) \{([\s\S]*?)\n\}/)?.[1] ?? '';
		assert.match(helper, /expect\.soft\([^)]*\)\.toHaveScreenshot\(/);
		assert.match(helper, /annotations\.push\(\{ type: SNAPSHOT_ANNOTATION/);
	});

	it('names snapshot files with the function the reporter uses', () => {
		assert.match(source, /import \{[^}]*routeToSnapshotName[^}]*\} from '\.\.\/src\/visual-reporter\.js'/);
		assert.match(source, /const snapshotName = routeToSnapshotName\(route\);/);
		assert.doesNotMatch(source, /route\.replace\(/);
	});
});

describe('VisualReporter', () => {
	let root;
	let packageDir;
	let baselineDir;
	let outputDir;
	let testResults;

	function createReporter() {
		return new VisualReporter({ outputDir, snapshotDir: path.join(packageDir, 'snapshots'), themeDir: 'theme-default', packageDir });
	}

	function readReport() {
		return JSON.parse(fs.readFileSync(path.join(outputDir, 'report.json'), 'utf8'));
	}

	beforeEach(() => {
		root = fs.mkdtempSync(path.join(os.tmpdir(), 'visual-reporter-'));
		packageDir = path.join(root, 'default');
		baselineDir = path.join(packageDir, 'snapshots', 'theme-default');
		outputDir = path.join(packageDir, 'visual-report');
		testResults = path.join(packageDir, 'test-results');
		write(path.join(packageDir, 'package.json'), JSON.stringify({ name: '@public-ui/theme-default' }));
		write(path.join(baselineDir, `a-basic--one${SUFFIX}`), png(4, 3, 'one'));
		write(path.join(baselineDir, `a-basic--two${SUFFIX}`), png(4, 3, 'two'));
		write(path.join(baselineDir, `a-basic--three${SUFFIX}`), png(4, 3, 'three'));
		write(path.join(baselineDir, `b-gone--x${SUFFIX}`), png(4, 3, 'gone'));
		write(path.join(baselineDir, `c-broken--y${SUFFIX}`), png(4, 3, 'broken'));
		write(path.join(baselineDir, `a-basic--one-firefox-otheros.png`), png(4, 3, 'foreign'));
	});

	afterEach(() => {
		fs.rmSync(root, { recursive: true, force: true });
	});

	it('classifies changed, added, unchanged and removed snapshots from attachments and the baseline listing', () => {
		const reporter = createReporter();
		reporter.onBegin(CONFIG, SUITE);

		// Playwright writes missing snapshots into the baseline folder while the run is in progress.
		write(path.join(baselineDir, `a-basic--new${SUFFIX}`), png(4, 3, 'new-expected'));
		const twoActual = write(path.join(testResults, 'a-basic--two-actual.png'), png(4, 4, 'two-actual'));
		const twoDiff = write(path.join(testResults, 'a-basic--two-diff.png'), png(4, 4, 'two-diff'));
		const threeActual = write(path.join(testResults, 'a-basic--three-actual.png'), png(4, 3, 'three-actual'));
		const newActual = write(path.join(testResults, 'a-basic--new-actual.png'), png(4, 3, 'new-actual'));

		reporter.onTestEnd(
			fakeTest('a/basic', {
				annotations: [annotation('a-basic--one.png'), annotation('a-basic--two.png'), annotation('a-basic--three.png'), annotation('a-basic--new.png')],
			}),
			fakeResult({
				status: 'failed',
				errors: [
					{
						message:
							'\u001b[31mScreenshot comparison failed:\u001b[39m\n\n  Expected an image 4px by 3px, received 4px by 4px. 4 pixels (ratio 0.25 of all image pixels) are different.\n\n  Snapshot: a-basic--two.png\n',
					},
					// A future Playwright may reword its message – the item still counts as changed, only without numbers.
					{ message: `Screenshot mismatch for ${path.join(baselineDir, `a-basic--three${SUFFIX}`)}` },
					{ message: `A snapshot doesn't exist at ${path.join(baselineDir, `a-basic--new${SUFFIX}`)}, writing actual.` },
				],
				attachments: [
					attachment('a-basic--two-expected.png', path.join(baselineDir, `a-basic--two${SUFFIX}`)),
					attachment('a-basic--two-actual.png', twoActual),
					attachment('a-basic--two-diff.png', twoDiff),
					attachment('a-basic--three-expected.png', path.join(baselineDir, `a-basic--three${SUFFIX}`)),
					attachment('a-basic--three-actual.png', threeActual),
					attachment('a-basic--new-expected.png', path.join(baselineDir, `a-basic--new${SUFFIX}`)),
					attachment('a-basic--new-actual.png', newActual),
				],
			}),
		);
		reporter.onTestEnd(fakeTest('c/broken', { annotations: [annotation('c-broken--y.png')] }), fakeResult());
		reporter.onTestEnd(fakeTest('d/skipped'), fakeResult({ status: 'skipped' }));
		reporter.onEnd();

		const report = readReport();
		assert.equal(report.schema, 1);
		assert.equal(report.mode, 'compare');
		assert.equal(report.package, 'theme-default');
		assert.deepEqual(report.projects, ['firefox']);
		assert.equal(report.baseline.dir, 'snapshots/theme-default');
		assert.equal(report.baseline.files, 5, 'files of other platforms and files written during the run are not baseline');
		assert.deepEqual(report.summary, { unchanged: 2, changed: 2, added: 1, removed: 1, error: 0 });
		assert.deepEqual(report.errors, []);
		assert.match(report.digest, /^sha256:[0-9a-f]{64}$/);

		const byName = Object.fromEntries(report.items.map((item) => [item.name, item]));
		assert.deepEqual(Object.keys(byName), ['a-basic--new', 'a-basic--one', 'a-basic--three', 'a-basic--two', 'b-gone--x', 'c-broken--y']);

		assert.equal(byName['a-basic--one'].status, 'unchanged');
		assert.equal(byName['c-broken--y'].status, 'unchanged');

		const changed = byName['a-basic--two'];
		assert.equal(changed.status, 'changed');
		assert.equal(changed.route, 'a/basic');
		assert.deepEqual(changed.sizeMismatch, { expected: [4, 3], actual: [4, 4] });
		assert.equal(changed.diffPixels, 4);
		assert.equal(changed.diffRatio, 0.25, 'ratio over the padded 4×4 comparison canvas');
		assert.equal(changed.expected, 'theme-default/a-basic--two.expected.png');
		assert.equal(changed.actual, 'theme-default/a-basic--two.actual.png');
		assert.equal(changed.diff, 'theme-default/a-basic--two.diff.png');
		assert.ok(fs.existsSync(path.join(outputDir, changed.diff)));
		assert.ok(fs.readFileSync(path.join(outputDir, changed.actual)).equals(fs.readFileSync(twoActual)));

		const reworded = byName['a-basic--three'];
		assert.equal(reworded.status, 'changed');
		assert.equal(reworded.diffPixels, undefined);
		assert.equal(reworded.diff, undefined);
		assert.equal(reworded.expected, 'theme-default/a-basic--three.expected.png');

		const added = byName['a-basic--new'];
		assert.equal(added.status, 'added');
		assert.equal(added.actual, 'theme-default/a-basic--new.actual.png');
		assert.equal(added.expected, undefined);

		const removed = byName['b-gone--x'];
		assert.equal(removed.status, 'removed');
		assert.equal(removed.route, 'b-gone');
		assert.equal(removed.expected, 'theme-default/b-gone--x.expected.png');
		assert.ok(fs.existsSync(path.join(outputDir, removed.expected)));

		for (const item of report.items) assert.match(item.hash, /^sha256:[0-9a-f]{64}$/);
		assert.notEqual(changed.hash, byName['a-basic--one'].hash);
	});

	it('computes the ratio from the actual image when the sizes match', () => {
		const reporter = createReporter();
		reporter.onBegin(CONFIG, SUITE);
		const twoActual = write(path.join(testResults, 'a-basic--two-actual.png'), png(4, 3, 'two-actual'));
		reporter.onTestEnd(
			fakeTest('a/basic', { annotations: [annotation('a-basic--one.png'), annotation('a-basic--two.png'), annotation('a-basic--three.png')] }),
			fakeResult({
				status: 'failed',
				errors: [{ message: 'Screenshot comparison failed:\n\n  3 pixels (ratio 0.25 of all image pixels) are different.\n\n  Snapshot: a-basic--two.png\n' }],
				attachments: [
					attachment('a-basic--two-expected.png', path.join(baselineDir, `a-basic--two${SUFFIX}`)),
					attachment('a-basic--two-actual.png', twoActual),
				],
			}),
		);
		reporter.onEnd();
		const changed = readReport().items.find((item) => item.name === 'a-basic--two');
		assert.equal(changed.diffPixels, 3);
		assert.equal(changed.diffRatio, 0.25);
		assert.equal(changed.sizeMismatch, undefined);
	});

	it('marks the baseline of a failed route as error instead of removed and keeps every hard error', () => {
		const reporter = createReporter();
		reporter.onBegin(CONFIG, SUITE);
		reporter.onTestEnd(
			fakeTest('a/basic', { annotations: [annotation('a-basic--one.png'), annotation('a-basic--two.png'), annotation('a-basic--three.png')] }),
			fakeResult(),
		);
		reporter.onTestEnd(
			fakeTest('c/broken'),
			fakeResult({
				status: 'failed',
				errors: [
					{ message: '\u001b[31mError: Route "c/broken": no data-visual-block containers found.\u001b[39m\n    at …' },
					{ message: 'Error: second problem' },
				],
			}),
		);
		reporter.onEnd();

		const report = readReport();
		assert.deepEqual(report.summary, { unchanged: 3, changed: 0, added: 0, removed: 1, error: 1 });
		const broken = report.items.find((item) => item.name === 'c-broken--y');
		assert.equal(broken.status, 'error');
		assert.equal(broken.message, 'Error: Route "c/broken": no data-visual-block containers found.');
		assert.deepEqual(report.errors, [
			{ test: 'snapshot for c/broken', route: 'c/broken', message: 'Error: Route "c/broken": no data-visual-block containers found.' },
			{ test: 'snapshot for c/broken', route: 'c/broken', message: 'Error: second problem' },
		]);
	});

	it('only counts the last attempt of a retried test', () => {
		const reporter = createReporter();
		reporter.onBegin(CONFIG, SUITE);
		reporter.onTestEnd(
			fakeTest('a/basic', { annotations: [annotation('a-basic--one.png'), annotation('a-basic--two.png'), annotation('a-basic--three.png')] }),
			fakeResult(),
		);
		reporter.onTestEnd(fakeTest('c/broken'), fakeResult({ status: 'timedOut', errors: [{ message: 'Test timeout of 15000ms exceeded.' }] }));
		reporter.onTestEnd(fakeTest('c/broken', { annotations: [annotation('c-broken--y.png')] }), fakeResult({ retry: 1 }));
		reporter.onEnd();

		const report = readReport();
		assert.deepEqual(report.summary, { unchanged: 4, changed: 0, added: 0, removed: 1, error: 0 });
		assert.deepEqual(report.errors, []);
	});

	it('ignores tests of other spec files, whatever their title', () => {
		const reporter = createReporter();
		reporter.onBegin(CONFIG, SUITE);
		reporter.onTestEnd(
			{ id: 'other', title: 'snapshot for a/basic', location: { file: path.join('tests', 'other.spec.js') }, annotations: [annotation('a-basic--one.png')] },
			fakeResult({ status: 'failed', errors: [{ message: 'unrelated' }] }),
		);
		reporter.onEnd();
		const report = readReport();
		assert.deepEqual(report.errors, []);
		assert.equal(report.summary.removed, 5, 'no snapshot test ran, so every baseline file counts as removed');
	});

	it('refuses to run for more than one Playwright project', () => {
		const reporter = createReporter();
		const twoProjects = { suites: [{ project: () => ({ name: 'firefox' }) }, { project: () => ({ name: 'chrome' }) }] };
		assert.throws(() => reporter.onBegin(CONFIG, twoProjects), /exactly one Playwright project.*firefox, chrome/);
	});

	it('writes a manifest of the generated files in update mode', () => {
		const reporter = createReporter();
		reporter.onBegin({ ...CONFIG, updateSnapshots: 'changed' }, SUITE);
		fs.rmSync(path.join(baselineDir, `b-gone--x${SUFFIX}`));
		write(path.join(baselineDir, `a-basic--new${SUFFIX}`), png(4, 3, 'new'));
		write(path.join(baselineDir, `a-basic--newer${SUFFIX}`), png(4, 3, 'newer'));
		reporter.onEnd();

		const report = readReport();
		assert.equal(report.mode, 'update');
		assert.deepEqual(report.summary, { baseline: 6 });
		assert.equal(report.baseline.files, 6, 'describes the folder after the run, like the items');
		assert.deepEqual(
			report.items.map((item) => item.name),
			['a-basic--new', 'a-basic--newer', 'a-basic--one', 'a-basic--three', 'a-basic--two', 'c-broken--y'],
		);
		assert.ok(report.items.every((item) => item.status === 'baseline'));
		assert.match(report.digest, /^sha256:[0-9a-f]{64}$/);
	});

	it('keeps baseline.json written by the baseline download and starts from an empty output folder', () => {
		write(path.join(outputDir, 'baseline.json'), JSON.stringify({ sha: 'abc' }));
		write(path.join(outputDir, 'stale.txt'), 'old');
		const reporter = createReporter();
		reporter.onBegin(CONFIG, SUITE);
		reporter.onEnd();

		assert.equal(fs.existsSync(path.join(outputDir, 'stale.txt')), false);
		assert.deepEqual(readReport().baseline.meta, { sha: 'abc' });
	});
});
