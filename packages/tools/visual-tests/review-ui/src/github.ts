/* GitHub REST calls the page makes itself – only with a token the reviewer entered. Without one the
   page reads nothing from the API (60 requests per hour per IP would not survive a team behind a proxy). */
import { parseReviewComment } from './review-comment';
import type { ReviewDraft } from './types';

const API = 'https://api.github.com';

export interface Comment {
	id: number;
	body: string;
	user: { login: string; type: string };
	updated_at: string;
}

async function request<T>(token: string, method: string, path: string, body?: unknown): Promise<T> {
	const response = await fetch(`${API}/${path}`, {
		method,
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/vnd.github+json',
			'X-GitHub-Api-Version': '2022-11-28',
			...(body ? { 'Content-Type': 'application/json' } : {}),
		},
		body: body ? JSON.stringify(body) : undefined,
	});
	if (!response.ok) {
		throw new Error(`${method} ${path}: ${response.status} ${response.statusText}`);
	}
	return (await response.json()) as T;
}

export async function getLogin(token: string): Promise<string> {
	const user = await request<{ login: string }>(token, 'GET', 'user');
	return user.login;
}

export async function listComments(token: string, repository: string, pr: number): Promise<Comment[]> {
	const comments: Comment[] = [];
	for (let page = 1; page < 20; page += 1) {
		const batch = await request<Comment[]>(token, 'GET', `repos/${repository}/issues/${pr}/comments?per_page=100&page=${page}`);
		comments.push(...batch);
		if (batch.length < 100) break;
	}
	return comments;
}

export function findOwnReview(comments: Comment[], login: string): { comment: Comment; draft: ReviewDraft } | null {
	for (const comment of comments) {
		if (comment.user.login !== login) continue;
		const draft = parseReviewComment(comment.body);
		if (draft) return { comment, draft };
	}
	return null;
}

export async function saveReview(token: string, repository: string, pr: number, body: string, existingId: number | null): Promise<void> {
	if (existingId) {
		await request(token, 'PATCH', `repos/${repository}/issues/comments/${existingId}`, { body });
	} else {
		await request(token, 'POST', `repos/${repository}/issues/${pr}/comments`, { body });
	}
}
