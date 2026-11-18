import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Identifies the one size gate comment of a pull request, which every CI run updates in place.
 */
export const MARKER = '<!-- size-gate -->';

/**
 * GitHub rejects comments above 65,536 characters; every report gets an equal share below that.
 */
const MAX_BODY = 60_000;

const HEADLINE = {
	failure: '❌ **The size gate failed.** Reduce the growth or accept it with `pnpm size:update` and give the reason in the pull request.',
	skipped: '⚠️ **The size gate did not run**, because an earlier CI step failed.',
	success: '✅ **All artifacts are within their baseline.**',
};

/**
 * Builds the comment body from the `size-report/report.md` of each package directory.
 * `outcome` is the outcome of the CI step `Size gate` (`success`, `failure`, `cancelled`, `skipped`).
 */
export function renderPrComment({ outcome, packageDirs, repoUrl, runUrl, sha }) {
	const reports = packageDirs.map((dir) => join(dir, 'size-report', 'report.md')).filter((path) => existsSync(path));
	const share = Math.floor(MAX_BODY / Math.max(reports.length, 1));
	const sections = reports.map((path) => {
		const markdown = readFileSync(path, 'utf8').trim();
		return markdown.length > share ? `${markdown.slice(0, share)}\n\n… truncated, see the CI artifact \`size-report\`.` : markdown;
	});
	const headline = HEADLINE[outcome] ?? `⚠️ **The size gate ended with \`${outcome}\`.**`;
	const footer = `<sub>Commit \`${String(sha).slice(0, 10)}\` · [CI run and artifact \`size-report\` with the treemaps](${runUrl}) · [docs/SIZE_GATE.md](${repoUrl}/blob/${sha}/docs/SIZE_GATE.md)</sub>`;
	return [MARKER, '# 📦 Size gate', headline, ...sections, footer].join('\n\n');
}

/**
 * Creates the size gate comment of a pull request or updates the existing one, so the pull request
 * carries exactly one comment with the current status. `github` and `context` are the objects of
 * `actions/github-script`.
 */
export async function upsertPrComment({ body, context, github }) {
	const { owner, repo } = context.repo;
	const issue_number = context.payload.pull_request.number;
	const comments = await github.paginate(github.rest.issues.listComments, { issue_number, owner, repo });
	const existing = comments.find((comment) => comment.body?.startsWith(MARKER));
	if (existing) {
		await github.rest.issues.updateComment({ body, comment_id: existing.id, owner, repo });
		return { action: 'updated', id: existing.id };
	}
	const created = await github.rest.issues.createComment({ body, issue_number, owner, repo });
	return { action: 'created', id: created.data.id };
}
