import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { createApi } from '../../../../scripts/visual-review/github-api.mjs';

function response(body, { status = 200, link } = {}) {
	return {
		ok: status < 400,
		status,
		statusText: status < 400 ? 'OK' : 'Error',
		headers: { get: (name) => (name === 'link' ? (link ?? null) : null) },
		json: async () => body,
		text: async () => JSON.stringify(body),
	};
}

describe('github-api', () => {
	const original = globalThis.fetch;
	afterEach(() => {
		globalThis.fetch = original;
	});

	it('paginates bare arrays and total_count wrappers alike, following the Link header', async () => {
		const calls = [];
		globalThis.fetch = async (url, init) => {
			calls.push({ url, auth: init.headers.Authorization });
			if (url.endsWith('/issues/1/comments?per_page=100'))
				return response([{ id: 1 }], { link: '<https://api.github.com/repos/o/r/issues/1/comments?per_page=100&page=2>; rel="next"' });
			if (url.endsWith('page=2')) return response([{ id: 2 }]);
			if (url.includes('/actions/artifacts')) return response({ total_count: 2, artifacts: [{ id: 'a' }, { id: 'b' }] });
			if (url.includes('/jobs')) return response({ total_count: 1, jobs: [{ name: 'x' }] });
			throw new Error(`unexpected ${url}`);
		};
		const api = createApi({ token: 't' });
		assert.deepEqual(await api.paginate('repos/o/r/issues/1/comments'), [{ id: 1 }, { id: 2 }]);
		assert.deepEqual(await api.paginate('repos/o/r/actions/artifacts?name=x'), [{ id: 'a' }, { id: 'b' }]);
		assert.deepEqual(await api.paginate('repos/o/r/actions/runs/7/jobs'), [{ name: 'x' }]);
		assert.ok(calls.every((call) => call.auth === 'Bearer t'));
		assert.ok(calls[1].url.endsWith('page=2'), 'the Link header decides the next page');
	});

	it('throws with status and body on errors and returns null for 204', async () => {
		globalThis.fetch = async (url) => (url.endsWith('/statuses/x') ? response({}, { status: 204 }) : response({ message: 'nope' }, { status: 403 }));
		const api = createApi({ token: 't' });
		await assert.rejects(api.get('repos/o/r/forbidden'), /403 Error: \{"message":"nope"\}/);
		assert.equal(await api.post('repos/o/r/statuses/x', {}), null);
	});
});
