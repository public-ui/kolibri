/**
 * The reviewer comment – one pull-request comment per reviewer that carries the approvals as a
 * machine-readable block:
 *
 *   <!-- visual-review:v1
 *   {"approveAll":{"digest":"sha256:…"},
 *    "approvals":[{"item":"theme-default/button-basic--variants","hash":"sha256:…"}],
 *    "rejects":[],
 *    "notes":[{"item":"theme-kern/alert-basic--error","hash":"sha256:…","text":"1px border"}]}
 *   -->
 *   ✅ **Visual Review** – …human-readable summary…
 *
 * `item` is `<package>/<snapshot name>`, `hash` the content hash from report.json. Approvals bind to
 * hashes, not to commits: a push that leaves an approved screenshot untouched keeps its approval.
 * `approveAll.digest` approves the whole report whose digest matches – the way to approve hundreds of
 * changes (browser bump) without exceeding GitHub's comment size.
 *
 * A reviewer may edit the comment or post a new one – the status workflow counts only the newest
 * comment per reviewer (review-status.mjs).
 *
 * The review page (packages/tools/visual-tests/review-ui) writes this format; the status workflow
 * reads it. Keep both in sync.
 */
export const MARKER = 'visual-review:v1';
const BLOCK = /<!--\s*visual-review:v1\s*([\s\S]*?)-->/;
// `<package>/<snapshot name>` – names keep the case of the sample route (`…-noColumns--label`).
const ITEM_KEY = /^[a-z0-9-]+\/[A-Za-z0-9_-]+$/;
const HASH = /^sha256:[0-9a-f]{64}$/;

/** Parses the block of a comment body; `null` when the comment carries none or an invalid one. */
export function parseReviewComment(body) {
	const block = body?.match(BLOCK)?.[1];
	if (!block) return null;
	let data;
	try {
		data = JSON.parse(block);
	} catch {
		return null;
	}
	if (!data || typeof data !== 'object') return null;
	const entries = (list, withText = false) =>
		(Array.isArray(list) ? list : [])
			.filter((entry) => entry && typeof entry === 'object' && ITEM_KEY.test(entry.item ?? '') && (entry.hash === undefined || HASH.test(entry.hash)))
			.map((entry) => ({ item: entry.item, hash: entry.hash, ...(withText ? { text: String(entry.text ?? '').slice(0, 2000) } : {}) }));
	return {
		approveAll: HASH.test(data.approveAll?.digest ?? '') ? { digest: data.approveAll.digest } : undefined,
		approvals: entries(data.approvals),
		rejects: entries(data.rejects),
		notes: entries(data.notes, true),
	};
}

/** Human-readable comment with the block in front – what the review page posts. */
export function formatReviewComment(data, { pageUrl, summary }) {
	const block = JSON.stringify({
		approveAll: data.approveAll,
		approvals: data.approvals ?? [],
		rejects: data.rejects ?? [],
		notes: data.notes ?? [],
	});
	const lines = [`<!-- ${MARKER}`, block, '-->', `**Visual Review** – ${summary} ([review page](${pageUrl}))`];
	for (const reject of data.rejects ?? []) lines.push(`- ❌ \`${reject.item}\``);
	for (const note of data.notes ?? []) lines.push(`- 💬 \`${note.item}\`: ${note.text}`);
	return lines.join('\n');
}
