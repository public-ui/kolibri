import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { CI_IGNORED_PATHS, isIgnoredByCi, resolveContext } from '../../../../scripts/visual-review/resolve-context.mjs';

const REPO = 'public-ui/kolibri';

function fakeApi(routes) {
	const lookup = (path) => {
		const entry = Object.entries(routes).find(([prefix]) => path.startsWith(prefix));
		if (!entry) throw new Error(`unexpected request ${path}`);
		return entry[1];
	};
	return { get: async (path) => lookup(path), paginate: async (path) => lookup(path) };
}

const OPEN_PULL = { number: 42, state: 'open', head: { sha: 'head1' }, base: { repo: { full_name: REPO } } };

describe('isIgnoredByCi', () => {
	it('mirrors the paths-ignore list of ci.yml', () => {
		assert.deepEqual(CI_IGNORED_PATHS, [
			'*.md',
			'**/*.md',
			'docs/**',
			'LICENSE',
			'.github/ISSUE_TEMPLATE/**',
			'.github/PULL_REQUEST_TEMPLATE/**',
			'renovate.json',
			'publiccode.yml',
			'.vscode/**',
			'license-reports/**',
			'*.jpg',
			'*.png',
			'*.svg',
		]);
		assert.ok(isIgnoredByCi('README.md'));
		assert.ok(isIgnoredByCi('docs/arc42/01.md'));
		assert.ok(isIgnoredByCi('LICENSE'));
		assert.ok(isIgnoredByCi('.github/ISSUE_TEMPLATE/bug.yml'));
		// `*.md` stops at the root, `**/*.md` covers everything below it – both are needed because
		// globToRegExp turns `**/*.md` into a pattern that always expects a slash.
		assert.ok(isIgnoredByCi('packages/components/README.md'));
		assert.ok(isIgnoredByCi('renovate.json'));
		assert.ok(isIgnoredByCi('license-reports/components.csv'));
		assert.ok(isIgnoredByCi('kolibri.logo.svg'));
		assert.equal(isIgnoredByCi('packages/themes/default/src/x.ts'), false);
		assert.equal(isIgnoredByCi('docs-site/index.ts'), false);
		// Everything that can change what gets built has to keep triggering the pipeline.
		assert.equal(isIgnoredByCi('package.json'), false);
		assert.equal(isIgnoredByCi('pnpm-lock.yaml'), false);
		assert.equal(isIgnoredByCi('packages/components/package.json'), false);
		assert.equal(isIgnoredByCi('packages/components/src/icon.svg'), false);
	});
});

describe('resolveContext', () => {
	it('publishes a completed pull-request run with visual jobs', async () => {
		const api = fakeApi({
			'repos/public-ui/kolibri/commits/head1/pulls': [OPEN_PULL],
			'repos/public-ui/kolibri/actions/runs/7/jobs': [
				{ name: 'visual-tests (theme-default)', conclusion: 'success' },
				{ name: 'build-and-check', conclusion: 'success' },
			],
		});
		const context = await resolveContext({
			eventName: 'workflow_run',
			event: { workflow_run: { id: 7, event: 'pull_request', conclusion: 'failure', head_sha: 'head1' } },
			api,
			repository: REPO,
		});
		assert.deepEqual(context, { mode: 'publish', pr: 42, head: 'head1', runId: 7, reason: 'CI run 7 completed' });
	});

	it('reports success when the visual jobs were skipped and skips runs without a pull request', async () => {
		const skippedApi = fakeApi({
			'repos/public-ui/kolibri/commits/head1/pulls': [OPEN_PULL],
			'repos/public-ui/kolibri/actions/runs/7/jobs': [{ name: 'visual-tests (theme-default)', conclusion: 'skipped' }],
		});
		const event = { workflow_run: { id: 7, event: 'pull_request', conclusion: 'success', head_sha: 'head1' } };
		assert.equal((await resolveContext({ eventName: 'workflow_run', event, api: skippedApi, repository: REPO })).mode, 'no-visual');

		const noPull = fakeApi({ 'repos/public-ui/kolibri/commits/head1/pulls': [{ ...OPEN_PULL, state: 'closed' }] });
		assert.equal((await resolveContext({ eventName: 'workflow_run', event, api: noPull, repository: REPO })).mode, 'skip');

		const push = { workflow_run: { id: 7, event: 'push', conclusion: 'success', head_sha: 'head1' } };
		assert.equal((await resolveContext({ eventName: 'workflow_run', event: push, api: noPull, repository: REPO })).mode, 'skip');

		const cancelled = { workflow_run: { id: 7, event: 'pull_request', conclusion: 'cancelled', head_sha: 'head1' } };
		assert.equal((await resolveContext({ eventName: 'workflow_run', event: cancelled, api: noPull, repository: REPO })).mode, 'skip');
	});

	it('recomputes the status for human comments on open pull requests only', async () => {
		const api = fakeApi({ 'repos/public-ui/kolibri/pulls/42': OPEN_PULL });
		const human = { action: 'created', issue: { number: 42, pull_request: {} }, comment: { user: { login: 'alice', type: 'User' } } };
		assert.deepEqual(await resolveContext({ eventName: 'issue_comment', event: human, api, repository: REPO }), {
			mode: 'status',
			pr: 42,
			head: 'head1',
			runId: null,
			reason: 'comment created by alice',
		});
		const bot = { ...human, comment: { user: { login: 'github-actions[bot]', type: 'Bot' } } };
		assert.equal((await resolveContext({ eventName: 'issue_comment', event: bot, api, repository: REPO })).mode, 'skip');
		const issue = { ...human, issue: { number: 42 } };
		assert.equal((await resolveContext({ eventName: 'issue_comment', event: issue, api, repository: REPO })).mode, 'skip');
	});

	it('marks a fresh push pending, unless only ignored files changed', async () => {
		const event = { action: 'synchronize', pull_request: { number: 42, head: { sha: 'head2' } } };
		const code = fakeApi({ 'repos/public-ui/kolibri/pulls/42/files': [{ filename: 'README.md' }, { filename: 'packages/x/y.ts' }] });
		assert.equal((await resolveContext({ eventName: 'pull_request_target', event, api: code, repository: REPO })).mode, 'pending');
		const docs = fakeApi({ 'repos/public-ui/kolibri/pulls/42/files': [{ filename: 'README.md' }, { filename: 'docs/a.md' }] });
		const context = await resolveContext({ eventName: 'pull_request_target', event, api: docs, repository: REPO });
		assert.equal(context.mode, 'docs-only');
		assert.equal(context.head, 'head2');
	});
});
