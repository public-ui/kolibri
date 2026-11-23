/**
 * Picks the size-baseline artifact that a pull-request run compares its artifact sizes against.
 *
 * The checked-out commit of a pull_request run is the merge of the pull request into its base
 * branch (`refs/pull/<n>/merge`), so the right baseline is the artifact of that tip – the first
 * parent of HEAD, computed by the "Size Baseline" workflow. When the base commit has no artifact
 * yet (its run is still going), the script waits for it; when it never will (expired, failed), it
 * falls back to the nearest ancestor that has one, then to the newest artifact of the base branch,
 * and finally to "none" (the pull request reports its sizes without comparison).
 *
 *   node scripts/size-baseline/select-baseline.mjs
 *
 * Outputs (for the following download-artifact step): artifact_id, run_id, sha, distance, fallback.
 */
import * as fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { chooseBaseline } from '../visual-review/baseline-artifacts.mjs';
import { createApi, repositoryFromEnv, setOutputs } from '../visual-review/github-api.mjs';
import { baseCommit } from '../visual-review/select-baseline.mjs';

const ARTIFACT_NAME = 'size-baseline';
const BASELINE_WORKFLOW = 'Size Baseline';
const ANCESTORS = 50;
const POLL_SECONDS = 30;

async function baselineRunInProgress(api, repository, sha) {
	const { workflow_runs: runs = [] } = await api.get(`repos/${repository}/actions/runs?head_sha=${sha}&per_page=20`);
	return runs.some((run) => run.name === BASELINE_WORKFLOW && (run.status === 'queued' || run.status === 'in_progress'));
}

export async function selectSizeBaseline({ api, repository, base, branch, repositoryId, waitMinutes = 10, log = console.log }) {
	const history = await api.get(`repos/${repository}/commits?sha=${base}&per_page=${ANCESTORS}`);
	const candidates = [...new Set([base, ...history.map((commit) => commit.sha)])];

	let artifacts = await api.paginate(`repos/${repository}/actions/artifacts?name=${ARTIFACT_NAME}`);
	let choice = chooseBaseline(artifacts, candidates, { branch, repositoryId });

	const deadline = Date.now() + waitMinutes * 60_000;
	while (choice.distance !== 0 && Date.now() < deadline && (await baselineRunInProgress(api, repository, base))) {
		log(`Baseline run for ${base.slice(0, 10)} still in progress – waiting ${POLL_SECONDS}s`);
		await new Promise((resolve) => setTimeout(resolve, POLL_SECONDS * 1000));
		artifacts = await api.paginate(`repos/${repository}/actions/artifacts?name=${ARTIFACT_NAME}`);
		choice = chooseBaseline(artifacts, candidates, { branch, repositoryId });
	}

	return {
		base,
		artifactId: choice.artifact?.id ?? null,
		runId: choice.artifact?.workflow_run?.id ?? null,
		sha: choice.sha,
		distance: choice.distance,
		fallback: choice.fallback,
	};
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	try {
		const event = process.env.GITHUB_EVENT_PATH ? JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')) : {};
		const selection = await selectSizeBaseline({
			api: createApi(),
			repository: repositoryFromEnv(),
			base: baseCommit(),
			branch: process.env.GITHUB_BASE_REF || process.env.GITHUB_REF_NAME,
			repositoryId: event.repository?.id,
			waitMinutes: Number(process.env.SIZE_BASELINE_WAIT_MINUTES ?? 10),
		});
		const summary = selection.artifactId
			? `artifact ${selection.artifactId} of ${selection.sha.slice(0, 10)} (${selection.fallback ?? `distance ${selection.distance}`})`
			: 'no baseline artifact – the sizes are reported without comparison';
		console.log(`base ${selection.base.slice(0, 10)} → ${summary}`);
		setOutputs({ artifact_id: selection.artifactId, run_id: selection.runId, sha: selection.sha, distance: selection.distance, fallback: selection.fallback });
	} catch (error) {
		console.error(`::error::${error.message}`);
		process.exit(1);
	}
}
