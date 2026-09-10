/**
 * Works out what the "Visual Review" workflow has to do for the event that triggered it:
 *
 *   publish    a CI run of a pull request finished → download its reports, publish, compute the status
 *   no-visual  the CI run skipped the visual tests → nothing to review, status success
 *   status     a reviewer comment changed → recompute the status from the published report
 *   pending    a pull request was pushed → status pending until its CI run finishes
 *   docs-only  the push touched only files ci.yml ignores → CI never runs, status success
 *   skip       nothing to do (bot comment, closed pull request, cancelled run, …)
 *
 * Outputs: mode, pr, head, run_id, reason.
 */
import * as fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { createApi, repositoryFromEnv, setOutputs } from './github-api.mjs';

/** Mirrors `paths-ignore` of the pull_request trigger in .github/workflows/ci.yml – keep in sync. */
export const CI_IGNORED_PATHS = [
	'*.md',
	'**/*.md',
	'docs/**',
	'LICENSE',
	'.github/ISSUE_TEMPLATE/**',
	'.github/PULL_REQUEST_TEMPLATE/**',
	'renovate.json',
	'publiccode.yml',
	'.vscode/**',
	'license-reports/**',
	'*.jpg',
	'*.png',
	'*.svg',
];
const VISUAL_JOB = /^visual-tests \(/;

function globToRegExp(glob) {
	const source = glob
		.split('**')
		.map((part) => part.split('*').map(escapeRegExp).join('[^/]*'))
		.join('.*');
	return new RegExp(`^${source}$`);
}

const IGNORED = CI_IGNORED_PATHS.map(globToRegExp);

export function isIgnoredByCi(file) {
	return IGNORED.some((pattern) => pattern.test(file));
}

export async function resolveContext({ eventName, event, api, repository }) {
	const skip = (reason) => ({ mode: 'skip', pr: null, head: null, runId: null, reason });

	switch (eventName) {
		case 'workflow_run': {
			const run = event.workflow_run;
			if (run.event !== 'pull_request') return skip(`run of a ${run.event} event`);
			if (run.conclusion === 'cancelled') return skip('run was cancelled');
			const pulls = await api.get(`repos/${repository}/commits/${run.head_sha}/pulls`);
			const pull = pulls.find((candidate) => candidate.state === 'open' && candidate.base.repo.full_name === repository && candidate.head.sha === run.head_sha);
			if (!pull) return skip(`no open pull request for ${run.head_sha}`);
			const jobs = await api.paginate(`repos/${repository}/actions/runs/${run.id}/jobs`);
			const visual = jobs.filter((job) => VISUAL_JOB.test(job.name));
			if (visual.length === 0 || visual.every((job) => job.conclusion === 'skipped')) {
				return { mode: 'no-visual', pr: pull.number, head: run.head_sha, runId: run.id, reason: 'visual tests did not run' };
			}
			return { mode: 'publish', pr: pull.number, head: run.head_sha, runId: run.id, reason: `CI run ${run.id} completed` };
		}
		case 'issue_comment': {
			if (!event.issue?.pull_request) return skip('comment on an issue');
			if (event.comment?.user?.type === 'Bot') return skip('bot comment');
			const pull = await api.get(`repos/${repository}/pulls/${event.issue.number}`);
			if (pull.state !== 'open') return skip('pull request is closed');
			return { mode: 'status', pr: pull.number, head: pull.head.sha, runId: null, reason: `comment ${event.action} by ${event.comment.user.login}` };
		}
		case 'pull_request_target': {
			const pull = event.pull_request;
			const files = await api.paginate(`repos/${repository}/pulls/${pull.number}/files`);
			const docsOnly = files.length > 0 && files.every((file) => isIgnoredByCi(file.filename));
			return { mode: docsOnly ? 'docs-only' : 'pending', pr: pull.number, head: pull.head.sha, runId: null, reason: `pull request ${event.action}` };
		}
		case 'workflow_dispatch': {
			const number = Number(event.inputs?.pr);
			if (!number) return skip('no pull request number given');
			const pull = await api.get(`repos/${repository}/pulls/${number}`);
			if (pull.state !== 'open') return skip('pull request is closed');
			return { mode: 'status', pr: pull.number, head: pull.head.sha, runId: null, reason: 'manual run' };
		}
		default:
			return skip(`unsupported event ${eventName}`);
	}
}

function escapeRegExp(text) {
	return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	try {
		const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
		const context = await resolveContext({ eventName: process.env.GITHUB_EVENT_NAME, event, api: createApi(), repository: repositoryFromEnv() });
		setOutputs({ mode: context.mode, pr: context.pr, head: context.head, run_id: context.runId, reason: context.reason });
	} catch (error) {
		console.error(`::error::${error.message}`);
		process.exit(1);
	}
}
