/**
 * Picks the baseline artifact a pull-request run compares against and records the choice.
 *
 * The checked-out commit of a pull_request run is the merge of the pull request into its base
 * branch (`refs/pull/<n>/merge`), so the tree under test already contains the base branch's tip.
 * The right baseline is therefore the artifact of that tip – the first parent of HEAD. When it has
 * none yet (its "Visual Baseline" run is still going), the script waits for it; when it never will
 * (expired, failed), it falls back to the nearest ancestor that has one, then to the newest
 * artifact of the base branch, and finally to "none" (every screenshot counts as added).
 *
 *   node scripts/visual-review/select-baseline.mjs <package>
 *
 * Outputs (for the following download-artifact step): artifact_id, run_id, sha, distance, fallback.
 * Writes <package>/visual-report/baseline-selection.json for install-baseline.mjs.
 */
import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { artifactName, chooseBaseline } from './baseline-artifacts.mjs';
import { createApi, repositoryFromEnv, setOutputs } from './github-api.mjs';
import { reportDir, resolvePackage } from './snapshot-paths.mjs';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
const BASELINE_WORKFLOW = 'Visual Baseline';
const ANCESTORS = 50;
const POLL_SECONDS = 30;

export const SELECTION_FILE = 'baseline-selection.json';

/** First parent of a merge commit, the commit itself otherwise – works in a depth-1 checkout. */
export function baseCommit(cwd = REPO_ROOT) {
	const raw = execFileSync('git', ['cat-file', '-p', 'HEAD'], { cwd, encoding: 'utf8' });
	const parents = raw
		.split('\n')
		.filter((line) => line.startsWith('parent '))
		.map((line) => line.slice(7).trim());
	if (parents.length > 1) return parents[0];
	return execFileSync('git', ['rev-parse', 'HEAD'], { cwd, encoding: 'utf8' }).trim();
}

async function baselineRunInProgress(api, repository, sha) {
	const { workflow_runs: runs = [] } = await api.get(`repos/${repository}/actions/runs?head_sha=${sha}&per_page=20`);
	return runs.some((run) => run.name === BASELINE_WORKFLOW && (run.status === 'queued' || run.status === 'in_progress'));
}

export async function selectBaseline({ api, repository, pkg, base, branch, repositoryId, waitMinutes = 10, log = console.log }) {
	const owner = pkg.baselineFrom ? resolvePackage(pkg.baselineFrom) : pkg;
	const name = artifactName(owner);
	const history = await api.get(`repos/${repository}/commits?sha=${base}&per_page=${ANCESTORS}`);
	const candidates = [...new Set([base, ...history.map((commit) => commit.sha)])];
	const options = { branch, repositoryId };

	let artifacts = await api.paginate(`repos/${repository}/actions/artifacts?name=${name}`);
	let choice = chooseBaseline(artifacts, candidates, options);

	const deadline = Date.now() + waitMinutes * 60_000;
	while (choice.distance !== 0 && Date.now() < deadline && (await baselineRunInProgress(api, repository, base))) {
		log(`Baseline run for ${base.slice(0, 10)} still in progress – waiting ${POLL_SECONDS}s`);
		await new Promise((resolve) => setTimeout(resolve, POLL_SECONDS * 1000));
		artifacts = await api.paginate(`repos/${repository}/actions/artifacts?name=${name}`);
		choice = chooseBaseline(artifacts, candidates, options);
	}

	return {
		package: pkg.name,
		baselinePackage: owner.name,
		base,
		branch,
		artifactId: choice.artifact?.id ?? null,
		runId: choice.artifact?.workflow_run?.id ?? null,
		sha: choice.sha,
		distance: choice.distance,
		fallback: choice.fallback,
		image: process.env.PLAYWRIGHT_IMAGE ?? null,
	};
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	try {
		const pkg = resolvePackage(process.argv[2] ?? '');
		const event = process.env.GITHUB_EVENT_PATH ? JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')) : {};
		const selection = await selectBaseline({
			api: createApi(),
			repository: repositoryFromEnv(),
			pkg,
			base: baseCommit(),
			branch: process.env.GITHUB_BASE_REF || process.env.GITHUB_REF_NAME,
			repositoryId: event.repository?.id,
			waitMinutes: Number(process.env.VISUAL_BASELINE_WAIT_MINUTES ?? 10),
		});
		const dir = path.join(REPO_ROOT, reportDir(pkg));
		fs.mkdirSync(dir, { recursive: true });
		fs.writeFileSync(path.join(dir, SELECTION_FILE), JSON.stringify(selection, null, '\t'));
		const summary = selection.artifactId
			? `artifact ${selection.artifactId} of ${selection.sha.slice(0, 10)} (${selection.fallback ?? `distance ${selection.distance}`})`
			: 'no baseline artifact – every screenshot counts as added';
		console.log(`${pkg.name}: base ${selection.base.slice(0, 10)} on ${selection.branch} → ${summary}`);
		setOutputs({ artifact_id: selection.artifactId, run_id: selection.runId, sha: selection.sha, distance: selection.distance, fallback: selection.fallback });
	} catch (error) {
		console.error(`::error::${error.message}`);
		process.exit(1);
	}
}
