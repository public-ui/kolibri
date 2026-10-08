import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { formatReviewComment } from '../../../../scripts/visual-review/review-comment.mjs';
import { computeStatus } from '../../../../scripts/visual-review/review-status.mjs';
import { collectReviews, listPullReviews } from '../../../../scripts/visual-review/update-review.mjs';

const REPO = 'public-ui/kolibri';
const H = (n) => `sha256:${String(n).repeat(64)}`;
const ITEM = 'theme-default/a--x';

function body(data) {
	return formatReviewComment({ approvals: [], rejects: [], notes: [], ...data }, { pageUrl: 'https://example.test/?pr=1', summary: 'x' });
}

const APPROVE = body({ approvals: [{ item: ITEM, hash: H(1) }] });
const REJECT = body({ rejects: [{ item: ITEM, hash: H(1) }] });

function review(login, text, { state = 'COMMENTED', submittedAt = '2026-09-08T12:00:00Z', lastEditedAt = null, type = 'User' } = {}) {
	return { author: { __typename: type, login }, body: text, state, submittedAt, lastEditedAt };
}

/** Answers the reviews query page by page and the permission lookup from `roles`. */
function fakeApi({ pages = [[]], roles = {} } = {}) {
	const calls = { graphql: [], permission: [] };
	return {
		calls,
		graphql: async (query, variables) => {
			calls.graphql.push(variables);
			const index = variables.after === null ? 0 : Number(variables.after);
			const hasNextPage = index + 1 < pages.length;
			return {
				repository: { pullRequest: { reviews: { pageInfo: { hasNextPage, endCursor: hasNextPage ? String(index + 1) : null }, nodes: pages[index] } } },
			};
		},
		get: async (path) => {
			const login = path.match(/collaborators\/([^/]+)\/permission$/)?.[1];
			if (!login) throw new Error(`unexpected request ${path}`);
			calls.permission.push(login);
			if (!(login in roles)) throw new Error('404');
			return { role_name: roles[login] };
		},
	};
}

const REPORT = {
	pr: 1,
	head: 'abc',
	digest: H(9),
	packages: [
		{
			package: 'theme-default',
			summary: { unchanged: 0, changed: 1, added: 0, removed: 0, error: 0 },
			items: [{ name: 'a--x', status: 'changed', hash: H(1) }],
			errors: [],
		},
	],
};

describe('listPullReviews', () => {
	it('reads every page and passes owner, name and number to the query', async () => {
		const api = fakeApi({ pages: [[review('alice', APPROVE)], [review('bob', REJECT)]] });
		const sources = await listPullReviews(api, REPO, 7);
		assert.deepEqual(
			sources.map((source) => source.login),
			['alice', 'bob'],
		);
		assert.deepEqual(api.calls.graphql, [
			{ owner: 'public-ui', name: 'kolibri', pr: 7, after: null },
			{ owner: 'public-ui', name: 'kolibri', pr: 7, after: '1' },
		]);
	});

	it('skips pending and dismissed reviews and those of deleted accounts, and dates a review by its last edit', async () => {
		const api = fakeApi({
			pages: [
				[
					review('alice', APPROVE, { state: 'APPROVED', lastEditedAt: '2026-09-08T13:00:00Z' }),
					review('bob', REJECT, { state: 'CHANGES_REQUESTED' }),
					review('carol', APPROVE, { state: 'DISMISSED' }),
					review('dave', APPROVE, { state: 'PENDING', submittedAt: null }),
					{ ...review('ghost', APPROVE), author: null },
					review('copilot', APPROVE, { type: 'Bot' }),
				],
			],
		});
		assert.deepEqual(await listPullReviews(api, REPO, 7), [
			{ login: 'alice', isBot: false, body: APPROVE, updatedAt: '2026-09-08T13:00:00Z' },
			{ login: 'bob', isBot: false, body: REJECT, updatedAt: '2026-09-08T12:00:00Z' },
			{ login: 'copilot', isBot: true, body: APPROVE, updatedAt: '2026-09-08T12:00:00Z' },
		]);
	});
});

describe('collectReviews', () => {
	it('parses the block of comments and review texts alike, ignores bots and looks up each role once', async () => {
		const api = fakeApi({ roles: { alice: 'write', bob: 'read' } });
		const reviews = await collectReviews(api, REPO, [
			{ login: 'alice', isBot: false, body: APPROVE, updatedAt: '2026-09-08T12:00:00Z' },
			{ login: 'alice', isBot: false, body: REJECT, updatedAt: '2026-09-08T12:30:00Z' },
			{ login: 'alice', isBot: false, body: 'looks good to me', updatedAt: '2026-09-08T12:40:00Z' },
			{ login: 'bob', isBot: false, body: APPROVE, updatedAt: '2026-09-08T12:10:00Z' },
			{ login: 'github-actions[bot]', isBot: true, body: APPROVE, updatedAt: '2026-09-08T12:20:00Z' },
			{ login: 'mallory', isBot: false, body: APPROVE, updatedAt: '2026-09-08T12:50:00Z' },
		]);
		assert.deepEqual(
			reviews.map(({ author, role, updatedAt }) => ({ author, role, updatedAt })),
			[
				{ author: 'alice', role: 'write', updatedAt: '2026-09-08T12:00:00Z' },
				{ author: 'alice', role: 'write', updatedAt: '2026-09-08T12:30:00Z' },
				{ author: 'bob', role: 'read', updatedAt: '2026-09-08T12:10:00Z' },
				{ author: 'mallory', role: 'none', updatedAt: '2026-09-08T12:50:00Z' },
			],
		);
		assert.deepEqual(api.calls.permission, ['alice', 'bob', 'mallory']);
	});

	it('lets the newest verdict of a reviewer win, whether it is a comment or a review text', async () => {
		const comment = (text, updatedAt) => ({ login: 'alice', isBot: false, body: text, updatedAt });
		const status = async (commentSource, reviews) => {
			const api = fakeApi({ pages: [reviews], roles: { alice: 'write' } });
			return computeStatus(REPORT, await collectReviews(api, REPO, [commentSource, ...(await listPullReviews(api, REPO, 1))])).state;
		};

		assert.equal(await status(comment(REJECT, '2026-09-08T11:00:00Z'), [review('alice', APPROVE)]), 'success', 'a later review replaces the comment');
		assert.equal(await status(comment(REJECT, '2026-09-08T13:00:00Z'), [review('alice', APPROVE)]), 'failure', 'a later comment replaces the review');
		assert.equal(
			await status(comment(REJECT, '2026-09-08T13:00:00Z'), [review('alice', APPROVE, { lastEditedAt: '2026-09-08T14:00:00Z' })]),
			'success',
			'an edited older review can be the newest verdict',
		);
		assert.equal(
			await status(comment(REJECT, '2026-09-08T11:00:00Z'), [review('alice', APPROVE, { state: 'DISMISSED' })]),
			'failure',
			'a dismissed review does not count',
		);
	});
});
