/**
 * Sets the `Visual Review` commit status of a pull request and keeps the bot comment current.
 *
 *   node scripts/visual-review/update-review.mjs --mode publish|status --pr <n> --head <sha> --report <report.json> --status-out <status.json> --page-url <url>
 *   node scripts/visual-review/update-review.mjs --mode pending|docs-only|no-visual|failed --pr <n> --head <sha> --page-url <url>
 *
 * publish/status: reads the reviewers' comments and the texts of their reviews, checks their
 * repository permission, computes the status (review-status.mjs), writes status.json next to the
 * report and upserts the summary comment.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createApi, repositoryFromEnv } from './github-api.mjs';
import { parseReviewComment } from './review-comment.mjs';
import { computeStatus } from './review-status.mjs';

export const STATUS_CONTEXT = 'Visual Review';
export const COMMENT_MARKER = '<!-- visual-review -->';

const EARLY_STATES = {
	pending: { state: 'pending', description: 'Waiting for the visual tests' },
	'docs-only': { state: 'success', description: 'No visual-relevant changes' },
	'no-visual': { state: 'success', description: 'Visual tests were skipped for this change' },
	// The workflow itself broke (invalid report, download error, …) – say so instead of leaving "pending" forever.
	failed: { state: 'error', description: 'The Visual Review workflow failed – see its run' },
};

export async function updateReview({ api, repository, mode, pr, head, reportFile, statusOut, pageUrl }) {
	// A failed publish points at its workflow run instead of the review page.
	const targetUrl = mode === 'failed' ? pageUrl : `${pageUrl}?pr=${pr}`;
	if (EARLY_STATES[mode]) {
		await setCommitStatus(api, repository, head, { ...EARLY_STATES[mode], targetUrl });
		return EARLY_STATES[mode];
	}

	const report = JSON.parse(fs.readFileSync(reportFile, 'utf8'));
	const comments = await api.paginate(`repos/${repository}/issues/${pr}/comments`);
	const reviews = await collectReviews(api, repository, [...comments.map(commentSource), ...(await listPullReviews(api, repository, pr))]);
	const result = computeStatus(report, reviews);

	fs.mkdirSync(path.dirname(statusOut), { recursive: true });
	fs.writeFileSync(statusOut, JSON.stringify(result.status, null, '\t'));
	// The status belongs to the commit the report describes. After a new push the published report can
	// still be the previous one; the new head keeps the "pending" set on push until its own run publishes.
	await setCommitStatus(api, repository, report.head ?? head, { state: result.state, description: result.description, targetUrl });
	await upsertComment(api, repository, pr, comments, buildComment(report, result, targetUrl));
	return result;
}

/** A pull-request comment in the shape `collectReviews` reads. */
function commentSource(comment) {
	return { login: comment.user?.login, isBot: comment.user?.type === 'Bot', body: comment.body, updatedAt: comment.updated_at };
}

const REVIEWS_QUERY = `query ($owner: String!, $name: String!, $pr: Int!, $after: String) {
	repository(owner: $owner, name: $name) {
		pullRequest(number: $pr) {
			reviews(first: 100, after: $after) {
				pageInfo { hasNextPage endCursor }
				nodes { author { __typename login } body state submittedAt lastEditedAt }
			}
		}
	}
}`;
// A pending review is not submitted yet; dismissing a review withdraws it.
const IGNORED_REVIEW_STATES = new Set(['DISMISSED', 'PENDING']);

/**
 * The submitted reviews of a pull request in the shape `collectReviews` reads. GraphQL instead of
 * REST, because only GraphQL tells when the text of a review was edited – which decides whether it
 * is the newest verdict of its author.
 */
export async function listPullReviews(api, repository, pr) {
	const [owner, name] = repository.split('/');
	const sources = [];
	let after = null;
	do {
		const data = await api.graphql(REVIEWS_QUERY, { owner, name, pr, after });
		const reviews = data.repository.pullRequest.reviews;
		for (const review of reviews.nodes) {
			if (IGNORED_REVIEW_STATES.has(review.state) || !review.author) continue;
			sources.push({
				login: review.author.login,
				isBot: review.author.__typename === 'Bot',
				body: review.body,
				updatedAt: review.lastEditedAt ?? review.submittedAt,
			});
		}
		after = reviews.pageInfo.hasNextPage ? reviews.pageInfo.endCursor : null;
	} while (after);
	return sources;
}

/**
 * @param sources [{ login, isBot, body, updatedAt }] – pull-request comments and review texts alike
 */
export async function collectReviews(api, repository, sources) {
	const roles = new Map();
	const reviews = [];
	for (const source of sources) {
		if (source.isBot) continue;
		const data = parseReviewComment(source.body);
		if (!data) continue;
		const login = source.login;
		if (!roles.has(login)) {
			roles.set(
				login,
				await api
					.get(`repos/${repository}/collaborators/${login}/permission`)
					.then((permission) => permission.role_name ?? permission.permission ?? 'none')
					.catch(() => 'none'),
			);
		}
		reviews.push({ author: login, role: roles.get(login), data, updatedAt: source.updatedAt });
	}
	return reviews;
}

async function setCommitStatus(api, repository, sha, { state, description, targetUrl }) {
	await api.post(`repos/${repository}/statuses/${sha}`, { state, description, context: STATUS_CONTEXT, target_url: targetUrl });
	console.log(`${STATUS_CONTEXT} on ${sha.slice(0, 10)}: ${state} – ${description}`);
}

async function upsertComment(api, repository, pr, comments, body) {
	const existing = comments.find((comment) => comment.body?.includes(COMMENT_MARKER));
	if (existing) {
		if (existing.body === body) return;
		await api.patch(`repos/${repository}/issues/comments/${existing.id}`, { body });
	} else {
		await api.post(`repos/${repository}/issues/${pr}/comments`, { body });
	}
}

const STATE_ICON = { success: '✅', pending: '🟡', failure: '❌' };

export function buildComment(report, result, targetUrl) {
	const lines = [COMMENT_MARKER, '## 📸 Visual Review', '', `${STATE_ICON[result.state]} **${result.description}**`, ''];
	lines.push('| Package | unchanged | changed | added | removed | error |', '| --- | --: | --: | --: | --: | --: |');
	for (const pkg of report.packages) {
		const { summary } = pkg;
		lines.push(`| \`${pkg.package}\` | ${summary.unchanged} | ${summary.changed} | ${summary.added} | ${summary.removed} | ${summary.error} |`);
	}
	lines.push('');
	if (report.baseline?.sha) {
		const extra = [report.baseline.fallback ? `fallback: ${report.baseline.fallback}` : null, report.baseline.imageMismatch ? 'Playwright image differs' : null]
			.filter(Boolean)
			.join(', ');
		lines.push(`Baseline: \`${report.baseline.sha.slice(0, 10)}\` (${report.baseline.ref})${extra ? ` – ${extra}` : ''}`, '');
	}
	const failed = report.packages.flatMap((pkg) => pkg.errors.map((error) => `- \`${pkg.package}\` ${error.route}: ${error.message}`));
	if (failed.length > 0) {
		lines.push('Routes that could not be compared:', ...failed.slice(0, 20), '');
	}
	const other = report.packages.flatMap((pkg) =>
		(pkg.otherFailures ?? []).map((failure) => `- \`${pkg.package}\` ${failure.file} – ${failure.test}: ${failure.message}`),
	);
	if (other.length > 0) {
		lines.push('Other tests that failed in the same run (they fail the CI job, not this review):', ...other.slice(0, 20), '');
	}
	lines.push(`[Open the review page](${targetUrl}) to inspect the differences and approve them.`);
	if (result.status?.counts?.changes > 0) {
		lines.push('', `Approvals: ${result.status.counts.approved} approved, ${result.status.counts.open} open, ${result.status.counts.rejected} rejected.`);
	}
	lines.push('', `Commit: \`${report.head.slice(0, 10)}\``);
	return lines.join('\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	const options = {};
	const args = process.argv.slice(2);
	for (let i = 0; i < args.length; i += 2) options[args[i].replace(/^--/, '')] = args[i + 1];
	const mode = options.mode;
	if (!mode || !options.pr || !options.head || !options['page-url'] || (!EARLY_STATES[mode] && (!options.report || !options['status-out']))) {
		console.error('Usage: node update-review.mjs --mode <mode> --pr <n> --head <sha> --page-url <url> [--report <file> --status-out <file>]');
		process.exit(2);
	}
	try {
		await updateReview({
			api: createApi(),
			repository: repositoryFromEnv(),
			mode,
			pr: Number(options.pr),
			head: options.head,
			reportFile: options.report,
			statusOut: options['status-out'],
			pageUrl: options['page-url'],
		});
	} catch (error) {
		console.error(`::error::${error.message}`);
		process.exit(1);
	}
}
