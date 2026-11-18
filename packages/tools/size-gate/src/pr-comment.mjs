import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { formatBytes } from './sizes.mjs';

/**
 * Identifies the one size gate comment of a pull request, which every CI run updates in place.
 */
export const MARKER = '<!-- size-gate -->';

/**
 * A metric change below this many bytes is noise for a reviewer; the job summary still lists it.
 */
const NOTICE_BYTES = 1024;

/**
 * Number of metrics per package the comment lists; the job summary has all of them.
 */
const MAX_ROWS = 5;

const STATUS = { fail: '❌', improved: '✅', new: '🆕', ok: '➖' };

function notableRows(result) {
	return result.rows
		.filter((row) => row.status === 'fail' || row.status === 'new' || Math.abs(row.current - (row.base ?? row.current)) >= NOTICE_BYTES)
		.sort((a, b) => Number(b.status === 'fail') - Number(a.status === 'fail') || Math.abs(b.current - (b.base ?? 0)) - Math.abs(a.current - (a.base ?? 0)));
}

function rowLine(row) {
	const unit = row.field === 'gzip' ? '' : ` ${row.field}`;
	if (row.base === null) {
		return `- \`${row.id}\`: new, ${formatBytes(row.current)}${unit} ${STATUS.new}`;
	}
	const diff = row.current - row.base;
	const percent = row.base === 0 ? 0 : (diff / row.base) * 100;
	const sign = diff > 0 ? '+' : '';
	return `- \`${row.id}\`: ${formatBytes(row.base)} → ${formatBytes(row.current)}${unit} (${sign}${formatBytes(diff)}, ${sign}${percent.toFixed(1)} %) ${STATUS[row.status]}`;
}

function readResults(packageDirs) {
	return packageDirs
		.map((dir) => join(dir, 'size-report', 'report.json'))
		.filter((path) => existsSync(path))
		.map((path) => {
			const { name, result } = JSON.parse(readFileSync(path, 'utf8'));
			return { name, result };
		});
}

/**
 * Builds the body of the size gate comment from the `size-report/report.json` of each package directory.
 * `outcome` is the outcome of the CI step `Size gate` (`success`, `failure`, `cancelled`, `skipped`).
 *
 * The comment lists only failed metrics, new metrics and changes of at least `NOTICE_BYTES`.
 * `notable` is false when there is nothing to list: then the gate passed without a relevant change,
 * and an existing comment shrinks to one line while no new comment is created.
 */
export function renderPrComment({ outcome, packageDirs, runUrl, sha }) {
	const footer = `<sub>Commit \`${String(sha).slice(0, 10)}\` · [job summary with all metrics](${runUrl})</sub>`;
	if (outcome !== 'success' && outcome !== 'failure') {
		return { body: [MARKER, `⚠️ **Size gate did not run**, because an earlier CI step failed.`, footer].join('\n\n'), notable: false };
	}

	const sections = readResults(packageDirs)
		.map(({ name, result }) => ({ name, passed: result.passed, rows: notableRows(result) }))
		.filter((section) => !section.passed || section.rows.length > 0)
		.map(({ name, passed, rows }) => {
			const more = rows.length > MAX_ROWS ? [`- … ${rows.length - MAX_ROWS} more in the job summary`] : [];
			return [`**\`${name}\`** ${passed ? '✅' : '❌'}`, ...rows.slice(0, MAX_ROWS).map(rowLine), ...more].join('\n');
		});

	if (outcome === 'success' && sections.length === 0) {
		return { body: [MARKER, '✅ **Size gate:** all artifacts are within their baseline, no notable change.', footer].join('\n\n'), notable: false };
	}

	const headline =
		outcome === 'failure'
			? '❌ **Size gate failed.** Reduce the growth, or accept it with `pnpm size:update` and give the reason in the pull request.'
			: '📦 **Size gate passed** with notable changes.';
	return { body: [MARKER, headline, ...sections, footer].join('\n\n'), notable: true };
}

/**
 * Keeps exactly one size gate comment on a pull request. An existing comment is always updated, so it
 * never shows a stale status; a new one is only created when `create` is true. `github` and `context`
 * are the objects of `actions/github-script`.
 */
export async function upsertPrComment({ body, context, create, github }) {
	const { owner, repo } = context.repo;
	const issue_number = context.payload.pull_request.number;
	const comments = await github.paginate(github.rest.issues.listComments, { issue_number, owner, repo });
	const existing = comments.find((comment) => comment.body?.startsWith(MARKER));
	if (existing) {
		await github.rest.issues.updateComment({ body, comment_id: existing.id, owner, repo });
		return { action: 'updated', id: existing.id };
	}
	if (!create) {
		return { action: 'skipped', id: null };
	}
	const created = await github.rest.issues.createComment({ body, issue_number, owner, repo });
	return { action: 'created', id: created.data.id };
}
