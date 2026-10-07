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

/** The text of a submitted pull-request review. */
interface Review {
	body: string;
	login: string;
	updatedAt: string;
}

interface ReviewsPage {
	data?: {
		repository: {
			pullRequest: {
				reviews: {
					pageInfo: { hasNextPage: boolean; endCursor: string | null };
					nodes: { author: { login: string } | null; body: string; state: string; submittedAt: string | null; lastEditedAt: string | null }[];
				};
			};
		};
	};
	errors?: { message: string }[];
}

/* Mirror of the query in scripts/visual-review/update-review.mjs – the status workflow reads the same reviews. Keep both in sync. */
const REVIEWS_QUERY = `query ($owner: String!, $name: String!, $pr: Int!, $after: String) {
	repository(owner: $owner, name: $name) {
		pullRequest(number: $pr) {
			reviews(first: 100, after: $after) {
				pageInfo { hasNextPage endCursor }
				nodes { author { login } body state submittedAt lastEditedAt }
			}
		}
	}
}`;
// A pending review is not submitted yet; dismissing a review withdraws it.
const IGNORED_REVIEW_STATES = new Set(['DISMISSED', 'PENDING']);

/** GraphQL instead of REST, because only GraphQL tells when the text of a review was edited. */
export async function listReviews(token: string, repository: string, pr: number): Promise<Review[]> {
	const [owner, name] = repository.split('/');
	const reviews: Review[] = [];
	let after: string | null = null;
	for (let page = 1; page < 20; page += 1) {
		const result: ReviewsPage = await request<ReviewsPage>(token, 'POST', 'graphql', { query: REVIEWS_QUERY, variables: { owner, name, pr, after } });
		if (!result.data || (result.errors?.length ?? 0) > 0) {
			throw new Error(`GraphQL: ${result.errors?.map((error) => error.message).join('; ') ?? 'no data'}`);
		}
		const { nodes, pageInfo } = result.data.repository.pullRequest.reviews;
		for (const node of nodes) {
			if (IGNORED_REVIEW_STATES.has(node.state) || !node.author) continue;
			reviews.push({ body: node.body, login: node.author.login, updatedAt: node.lastEditedAt ?? node.submittedAt ?? '' });
		}
		if (!pageInfo.hasNextPage) break;
		after = pageInfo.endCursor;
	}
	return reviews;
}

/**
 * The reviewer's newest verdict among their comments and review texts – the one the status workflow
 * counts. `commentId` is set when that verdict is a comment the page can edit; a review text is
 * superseded by a new comment instead.
 */
export function findOwnReview(comments: Comment[], reviews: Review[], login: string): { commentId: number | null; draft: ReviewDraft } | null {
	const candidates = [
		...comments
			.filter((comment) => comment.user.login === login)
			.map((comment) => ({ body: comment.body, commentId: comment.id, updatedAt: comment.updated_at })),
		...reviews.filter((review) => review.login === login).map((review) => ({ body: review.body, commentId: null, updatedAt: review.updatedAt })),
	];
	let newest: { commentId: number | null; draft: ReviewDraft; updatedAt: string } | null = null;
	for (const candidate of candidates) {
		const draft = parseReviewComment(candidate.body);
		if (!draft) continue;
		if (!newest || Date.parse(candidate.updatedAt) >= Date.parse(newest.updatedAt))
			newest = { commentId: candidate.commentId, draft, updatedAt: candidate.updatedAt };
	}
	return newest && { commentId: newest.commentId, draft: newest.draft };
}

export async function saveReview(token: string, repository: string, pr: number, body: string, existingId: number | null): Promise<void> {
	if (existingId) {
		await request(token, 'PATCH', `repos/${repository}/issues/comments/${existingId}`, { body });
	} else {
		await request(token, 'POST', `repos/${repository}/issues/${pr}/comments`, { body });
	}
}
