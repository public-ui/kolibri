import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { MARKER, renderPrComment, upsertPrComment } from '../src/pr-comment.mjs';
import { renderMarkdown } from '../src/report-md.mjs';

const root = mkdtempSync(join(tmpdir(), 'size-gate-comment-'));
after(() => rmSync(root, { force: true, recursive: true }));

function packageDir(name, markdown) {
	const dir = join(root, name);
	mkdirSync(join(dir, 'size-report'), { recursive: true });
	if (markdown !== undefined) {
		writeFileSync(join(dir, 'size-report', 'report.md'), markdown);
	}
	return dir;
}

test('combines the reports of all packages under one marker', () => {
	const body = renderPrComment({
		outcome: 'success',
		packageDirs: [packageDir('a', '## a passed\n'), packageDir('b', '## b passed\n'), packageDir('c')],
		repoUrl: 'https://example.test/o/r',
		runUrl: 'https://example.test/run/1',
		sha: '0123456789abcdef',
	});

	assert.ok(body.startsWith(MARKER));
	assert.match(body, /All artifacts are within their baseline/);
	assert.match(body, /## a passed\n\n## b passed/);
	assert.match(body, /`0123456789`/);
	assert.match(body, /https:\/\/example\.test\/run\/1/);
	assert.match(body, /https:\/\/example\.test\/o\/r\/blob\/0123456789abcdef\/docs\/SIZE_GATE\.md/);
});

test('says why no report exists', () => {
	const body = renderPrComment({ outcome: 'skipped', packageDirs: [packageDir('d')], runUrl: 'u', sha: 's' });
	assert.match(body, /did not run/);
});

test('truncates a report that would exceed the comment limit', () => {
	const body = renderPrComment({ outcome: 'failure', packageDirs: [packageDir('e', 'x'.repeat(70_000))], runUrl: 'u', sha: 's' });
	assert.ok(body.length < 65_536);
	assert.match(body, /truncated/);
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

test('updates the existing size gate comment', async () => {
	const { calls, github } = fakeGithub([
		{ body: 'other', id: 1 },
		{ body: `${MARKER}\nold`, id: 2 },
	]);
	assert.deepEqual(await upsertPrComment({ body: 'new', context, github }), { action: 'updated', id: 2 });
	assert.deepEqual(calls, [['update', { body: 'new', comment_id: 2, owner: 'o', repo: 'r' }]]);
});

test('creates the comment when none exists', async () => {
	const { calls, github } = fakeGithub([{ body: null, id: 1 }]);
	assert.deepEqual(await upsertPrComment({ body: 'new', context, github }), { action: 'created', id: 99 });
	assert.equal(calls[0][0], 'create');
});

test('escapes backslashes and pipes in table cells', () => {
	const markdown = renderMarkdown({
		name: 'p',
		report: { candidates: [{ action: 'a\\|b', impactGzip: 1, kind: 'k', subject: '.x[a|b]' }], sourceMaps: true },
		result: { failures: [], improvements: [], passed: true, rows: [], tolerance: { bytes: 1024, percent: 2 }, warnings: [] },
	});
	assert.match(markdown, /\| \.x\[a\\\|b\] \|/);
	assert.match(markdown, /\| a\\\\\\\|b \|/);
});
