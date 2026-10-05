/* Mirror of scripts/visual-review/review-comment.mjs – the format the status workflow reads. Keep both in sync. */
import type { ReviewDraft } from './types';

const MARKER = 'visual-review:v1';
const BLOCK = /<!--\s*visual-review:v1\s*([\s\S]*?)-->/;
// `<package>/<snapshot name>` – names keep the case of the sample route (`…-noColumns--label`).
const ITEM_KEY = /^[a-z0-9-]+\/[A-Za-z0-9_-]+$/;
const HASH = /^sha256:[0-9a-f]{64}$/;

export function emptyDraft(): ReviewDraft {
	return { approvals: [], rejects: [], notes: [] };
}

export function parseReviewComment(body: string | null | undefined): ReviewDraft | null {
	const block = body?.match(BLOCK)?.[1];
	if (!block) return null;
	let data: Record<string, unknown>;
	try {
		data = JSON.parse(block) as Record<string, unknown>;
	} catch {
		return null;
	}
	if (!data || typeof data !== 'object') return null;
	const entries = (list: unknown) =>
		(Array.isArray(list) ? list : [])
			.filter((entry): entry is { item: string; hash?: string; text?: unknown } => {
				return Boolean(entry) && typeof entry === 'object' && ITEM_KEY.test(String((entry as { item?: unknown }).item ?? ''));
			})
			.filter((entry) => entry.hash === undefined || HASH.test(entry.hash));
	const approveAll = data.approveAll as { digest?: string } | undefined;
	return {
		approveAll: HASH.test(approveAll?.digest ?? '') ? { digest: approveAll!.digest! } : undefined,
		approvals: entries(data.approvals).map(({ item, hash }) => ({ item, hash: hash! })),
		rejects: entries(data.rejects).map(({ item, hash }) => ({ item, hash: hash! })),
		notes: entries(data.notes).map(({ item, hash, text }) => ({ item, hash, text: String(text ?? '').slice(0, 2000) })),
	};
}

export function formatReviewComment(draft: ReviewDraft, pageUrl: string, summary: string): string {
	const block = JSON.stringify({ approveAll: draft.approveAll, approvals: draft.approvals, rejects: draft.rejects, notes: draft.notes });
	const lines = [`<!-- ${MARKER}`, block, '-->', `**Visual Review** – ${summary} ([review page](${pageUrl}))`];
	for (const reject of draft.rejects) lines.push(`- ❌ \`${reject.item}\``);
	for (const note of draft.notes) lines.push(`- 💬 \`${note.item}\`: ${note.text}`);
	return lines.join('\n');
}

export function summarize(draft: ReviewDraft): string {
	const parts: string[] = [];
	if (draft.approveAll) parts.push('all changes approved');
	else if (draft.approvals.length > 0) parts.push(`${draft.approvals.length} approved`);
	if (draft.rejects.length > 0) parts.push(`${draft.rejects.length} rejected`);
	if (draft.notes.length > 0) parts.push(`${draft.notes.length} note${draft.notes.length === 1 ? '' : 's'}`);
	return parts.length > 0 ? parts.join(', ') : 'no decisions yet';
}
