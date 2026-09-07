/**
 * Minimal GitHub REST client for the visual-review scripts – node's fetch, no dependency.
 * Pagination follows the `Link: <…>; rel="next"` header.
 */
import * as fs from 'node:fs';

export function createApi({ token = process.env.GITHUB_TOKEN, baseUrl = process.env.GITHUB_API_URL ?? 'https://api.github.com' } = {}) {
	if (!token) throw new Error('GITHUB_TOKEN is required');

	async function request(method, path, { body, accept = 'application/vnd.github+json' } = {}) {
		const url = path.startsWith('http') ? path : `${baseUrl}/${path.replace(/^\//, '')}`;
		const response = await fetch(url, {
			method,
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: accept,
				'X-GitHub-Api-Version': '2022-11-28',
				...(body ? { 'Content-Type': 'application/json' } : {}),
			},
			body: body ? JSON.stringify(body) : undefined,
		});
		if (!response.ok) {
			throw new Error(`${method} ${url} → ${response.status} ${response.statusText}: ${(await response.text()).slice(0, 500)}`);
		}
		return response;
	}

	async function json(method, path, options) {
		const response = await request(method, path, options);
		return response.status === 204 ? null : response.json();
	}

	async function paginate(path) {
		const items = [];
		let next = path.includes('per_page=') ? path : `${path}${path.includes('?') ? '&' : '?'}per_page=100`;
		while (next) {
			const response = await request('GET', next);
			const page = await response.json();
			items.push(...(Array.isArray(page) ? page : []));
			next = response.headers.get('link')?.match(/<([^>]+)>;\s*rel="next"/)?.[1] ?? null;
		}
		return items;
	}

	return {
		get: (path) => json('GET', path),
		post: (path, body) => json('POST', path, { body }),
		patch: (path, body) => json('PATCH', path, { body }),
		paginate,
	};
}

/** `owner/repo` of the current workflow run. */
export function repositoryFromEnv() {
	const repository = process.env.GITHUB_REPOSITORY;
	if (!repository) throw new Error('GITHUB_REPOSITORY is not set');
	return repository;
}

/** Appends `name=value` lines to $GITHUB_OUTPUT when running in Actions, always echoes them. */
export function setOutputs(outputs) {
	const lines = Object.entries(outputs).map(([name, value]) => `${name}=${value ?? ''}`);
	console.log(lines.join('\n'));
	if (process.env.GITHUB_OUTPUT) {
		fs.appendFileSync(process.env.GITHUB_OUTPUT, `${lines.join('\n')}\n`);
	}
}
