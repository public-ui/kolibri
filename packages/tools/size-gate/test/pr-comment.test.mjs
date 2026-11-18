import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { MARKER, renderPrComment, upsertPrComment } from '../src/pr-comment.mjs';
import { renderMarkdown } from '../src/report-md.mjs';

const root = mkdtempSync(join(tmpdir(), 'size-gate-comment-'));
after(() => rmSync(root, { force: true, recursive: true }));

let counter = 0;
function packageDir(name, rows, passed = true) {
	const dir = join(root, `p${counter++}`);
	mkdirSync(join(dir, 'size-report'), { recursive: true });
	if (rows) {
		writeFileSync(join(dir, 'size-report', 'report.json'), JSON.stringify({ name, result: { passed, rows } }));
	}
	return dir;
}

const row = (id, base, current, status = 'ok', field = 'gzip') => ({ base, current, field, id, status });
const options = { runUrl: 'https://example.test/run/1', sha: '0123456789abcdef' };

test('says in one line that nothing notable changed', () => {
	const { body, notable } = renderPrComment({
		...options,
		outcome: 'success',
		packageDirs: [packageDir('a', [row('core', 10_000, 10_500), row('total', 50_000, 50_006)])],
	});
	assert.equal(notable, false);
	assert.ok(body.startsWith(MARKER));
	assert.match(body, /no notable change/);
	assert.doesNotMatch(body, /`core`/);
	assert.match(body, /`0123456789`/);
});

test('lists only notable metrics, at most five per package', () => {
	const rows = [
		row('core', 100_000, 105_000, 'fail'),
		row('entry:new', null, 3_000, 'new'),
		row('total', 500_000, 502_000),
		row('entry:x', 4_000, 4_100),
		...['a', 'b', 'c', 'd'].map((id) => row(`entry:${id}`, 10_000, 12_000)),
	];
	const { body, notable } = renderPrComment({
		...options,
		outcome: 'failure',
		packageDirs: [packageDir('@public-ui/components', rows, false), packageDir('@public-ui/theme-default', [row('total', 1, 1)])],
	});

	assert.equal(notable, true);
	assert.match(body, /Size gate failed/);
	assert.match(body, /\*\*`@public-ui\/components`\*\* ❌/);
	assert.match(body, /- `core`: 97\.7 KB → 102\.5 KB \(\+4\.9 KB, \+5\.0 %\) ❌/);
	assert.match(body, /- `entry:new`: new, 2\.9 KB 🆕/);
	assert.doesNotMatch(body, /entry:x/);
	assert.match(body, /… 2 more in the job summary/);
	assert.doesNotMatch(body, /theme-default/);
});

test('reports a gate that did not run without listing metrics', () => {
	const { body, notable } = renderPrComment({ ...options, outcome: 'skipped', packageDirs: [packageDir('a')] });
	assert.equal(notable, false);
	assert.match(body, /did not run/);
});

function fakeGithub(comments) {
	const calls = [];
	return {
		calls,
		github: {
			paginate: async () => comments,
			rest: {
				issues: {
					createComment: async (args) => {
						calls.push(['create', args]);
						return { data: { id: 99 } };
					},
					listComments: () => undefined,
					updateComment: async (args) => {
						calls.push(['update', args]);
					},
				},
			},
		},
	};
}

const context = { payload: { pull_request: { number: 7 } }, repo: { owner: 'o', repo: 'r' } };

test('always updates the existing size gate comment', async () => {
	const { calls, github } = fakeGithub([
		{ body: 'other', id: 1 },
		{ body: `${MARKER}\nold`, id: 2 },
	]);
	assert.deepEqual(await upsertPrComment({ body: 'new', context, create: false, github }), { action: 'updated', id: 2 });
	assert.deepEqual(calls, [['update', { body: 'new', comment_id: 2, owner: 'o', repo: 'r' }]]);
});

test('creates a comment only when asked to', async () => {
	const skipped = fakeGithub([{ body: null, id: 1 }]);
	assert.deepEqual(await upsertPrComment({ body: 'new', context, create: false, github: skipped.github }), { action: 'skipped', id: null });
	assert.deepEqual(skipped.calls, []);

	const created = fakeGithub([]);
	assert.deepEqual(await upsertPrComment({ body: 'new', context, create: true, github: created.github }), { action: 'created', id: 99 });
});

const result = { failures: [], improvements: [], passed: true, rows: [], tolerance: { bytes: 1024, percent: 2 }, warnings: [] };
const candidateReport = { candidates: [{ action: 'a\\|b', impactGzip: 1, kind: 'k', subject: '.x[a|b]' }], sourceMaps: true };

test('escapes backslashes and pipes in table cells of the analysis', () => {
	const markdown = renderMarkdown({ mode: 'analysis', name: 'p', report: candidateReport, result });
	assert.match(markdown, /\| \.x\[a\\\|b\] \|/);
	assert.match(markdown, /\| a\\\\\\\|b \|/);
});

test('leaves the restructuring candidates out of the gate report', () => {
	const markdown = renderMarkdown({ name: 'p', report: { ...candidateReport, sourceMaps: false }, result });
	assert.doesNotMatch(markdown, /Restructuring candidates|No source maps/);
	assert.match(markdown, /Size Analysis/);
});
