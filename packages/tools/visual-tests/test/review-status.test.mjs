import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { formatReviewComment, parseReviewComment } from '../../../../scripts/visual-review/review-comment.mjs';
import { computeStatus } from '../../../../scripts/visual-review/review-status.mjs';

const H = (n) => `sha256:${String(n).repeat(64)}`;

function report({ items = [], errors = [] } = {}) {
	return {
		pr: 1,
		head: 'abc',
		digest: H(9),
		packages: [
			{
				package: 'theme-default',
				summary: {
					unchanged: items.filter((i) => i.status === 'unchanged').length,
					changed: items.filter((i) => i.status === 'changed').length,
					added: items.filter((i) => i.status === 'added').length,
					removed: items.filter((i) => i.status === 'removed').length,
					error: items.filter((i) => i.status === 'error').length,
				},
				items,
				errors,
			},
		],
	};
}

const CHANGES = [
	{ name: 'a--x', status: 'changed', hash: H(1) },
	{ name: 'a--y', status: 'added', hash: H(2) },
	{ name: 'b--z', status: 'removed', hash: H(3) },
	{ name: 'c--ok', status: 'unchanged', hash: H(4) },
];

function review(author, role, data) {
	return { author, role, data: { approvals: [], rejects: [], notes: [], ...data }, updatedAt: '2026-09-04T10:00:00Z' };
}

describe('computeStatus', () => {
	it('is green without visual changes', () => {
		const result = computeStatus(report({ items: [{ name: 'c--ok', status: 'unchanged', hash: H(4) }] }), []);
		assert.equal(result.state, 'success');
		assert.equal(result.description, 'No visual changes');
		assert.deepEqual(result.status.items, {});
	});

	it('is pending while changes wait for approval', () => {
		const result = computeStatus(report({ items: CHANGES }), []);
		assert.equal(result.state, 'pending');
		assert.equal(result.description, '1 changed, 1 added, 1 removed – 0 of 3 approved, review pending');
		assert.deepEqual(Object.keys(result.status.items), ['theme-default/a--x', 'theme-default/a--y', 'theme-default/b--z']);
		assert.equal(result.status.counts.open, 3);
	});

	it('approves items by hash and the whole report by digest, but only for writers', () => {
		const partial = computeStatus(report({ items: CHANGES }), [review('alice', 'write', { approvals: [{ item: 'theme-default/a--x', hash: H(1) }] })]);
		assert.equal(partial.state, 'pending');
		assert.equal(partial.status.items['theme-default/a--x'].state, 'approved');
		assert.equal(partial.status.items['theme-default/a--x'].by, 'alice');
		assert.equal(partial.status.counts.approved, 1);

		const stale = computeStatus(report({ items: CHANGES }), [review('alice', 'write', { approvals: [{ item: 'theme-default/a--x', hash: H(5) }] })]);
		assert.equal(stale.status.items['theme-default/a--x'].state, 'open', 'a changed screenshot invalidates the approval');

		const all = computeStatus(report({ items: CHANGES }), [review('alice', 'maintain', { approveAll: { digest: H(9) } })]);
		assert.equal(all.state, 'success');
		assert.equal(all.description, '3 visual changes approved by alice');

		const reader = computeStatus(report({ items: CHANGES }), [review('mallory', 'read', { approveAll: { digest: H(9) } })]);
		assert.equal(reader.state, 'pending');
		assert.deepEqual(reader.status.reviewers, []);

		const otherDigest = computeStatus(report({ items: CHANGES }), [review('alice', 'write', { approveAll: { digest: H(8) } })]);
		assert.equal(otherDigest.state, 'pending', 'approveAll of an older report does not carry over');
	});

	it('lets a rejection win over an approval and collects notes', () => {
		const result = computeStatus(report({ items: CHANGES }), [
			review('alice', 'write', { approveAll: { digest: H(9) } }),
			review('bob', 'admin', { rejects: [{ item: 'theme-default/a--y', hash: H(2) }], notes: [{ item: 'theme-default/a--y', hash: H(2), text: 'too dark' }] }),
		]);
		assert.equal(result.state, 'failure');
		assert.equal(result.description, '1 of 3 visual changes rejected');
		assert.equal(result.status.items['theme-default/a--y'].state, 'rejected');
		assert.equal(result.status.items['theme-default/a--y'].by, 'bob');
		assert.deepEqual(result.status.items['theme-default/a--y'].notes, [{ by: 'bob', text: 'too dark' }]);
		assert.deepEqual(result.status.reviewers, ['alice', 'bob']);
	});

	it('counts only the newest comment of a reviewer', () => {
		const reject = { ...review('bob', 'write', { rejects: [{ item: 'theme-default/a--y', hash: H(2) }] }), updatedAt: '2026-09-08T12:06:00Z' };
		const approve = { ...review('bob', 'write', { approvals: [{ item: 'theme-default/a--y', hash: H(2) }] }), updatedAt: '2026-09-08T12:22:00Z' };
		const alice = review('alice', 'write', { approveAll: { digest: H(9) } });

		const later = computeStatus(report({ items: CHANGES }), [alice, reject, approve]);
		assert.equal(later.state, 'success', 'the newer comment replaces the rejection');
		assert.equal(later.status.items['theme-default/a--y'].state, 'approved');

		const edited = computeStatus(report({ items: CHANGES }), [
			alice,
			{ ...approve, updatedAt: '2026-09-08T12:00:00Z' },
			{ ...reject, updatedAt: '2026-09-08T12:30:00Z' },
		]);
		assert.equal(edited.state, 'failure', 'an edited older comment can be the newest one');
		assert.deepEqual(later.status.reviewers, ['alice', 'bob']);
	});

	it('fails on routes that could not be compared', () => {
		const result = computeStatus(
			report({ items: [{ name: 'a--x', status: 'error', hash: H(1), message: 'boom' }], errors: [{ route: 'a', message: 'boom' }] }),
			[review('alice', 'write', { approveAll: { digest: H(9) } })],
		);
		assert.equal(result.state, 'failure');
		assert.match(result.description, /1 route\(s\) failed/);
	});
});

describe('review comment format', () => {
	it('round-trips through format and parse', () => {
		const data = {
			approveAll: { digest: H(9) },
			approvals: [{ item: 'theme-default/a--x', hash: H(1) }],
			rejects: [{ item: 'theme-kern/b--y', hash: H(2) }],
			notes: [{ item: 'theme-kern/b--y', hash: H(2), text: 'border too thin' }],
		};
		const body = formatReviewComment(data, { pageUrl: 'https://example.test/?pr=1', summary: '1 approved' });
		assert.match(body, /^<!-- visual-review:v1\n/);
		assert.match(body, /\[review page\]\(https:\/\/example\.test\/\?pr=1\)/);
		assert.deepEqual(parseReviewComment(body), data);
	});

	it('keeps item keys with upper-case snapshot names', () => {
		const item = 'theme-default/input-color-basic-noColumns--label-hint';
		const parsed = parseReviewComment(formatReviewComment({ approvals: [{ item, hash: H(1) }], rejects: [], notes: [] }, 'https://x', 'ok'));
		assert.deepEqual(parsed.approvals, [{ item, hash: H(1) }]);
	});

	it('ignores comments without a block, broken JSON and malformed entries', () => {
		assert.equal(parseReviewComment('just a comment'), null);
		assert.equal(parseReviewComment('<!-- visual-review:v1\n{not json\n-->'), null);
		const parsed = parseReviewComment(
			`<!-- visual-review:v1\n${JSON.stringify({
				approveAll: { digest: 'nope' },
				approvals: [
					{ item: '../etc', hash: H(1) },
					{ item: 'theme-default/a--x', hash: 'bad' },
					{ item: 'theme-default/a--x', hash: H(1) },
				],
				notes: [{ item: 'theme-default/a--x', text: 'x'.repeat(3000) }],
			})}\n-->`,
		);
		assert.equal(parsed.approveAll, undefined);
		assert.deepEqual(parsed.approvals, [{ item: 'theme-default/a--x', hash: H(1) }]);
		assert.equal(parsed.notes[0].text.length, 2000);
	});
});
