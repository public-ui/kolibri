/**
 * Downloads the current size baseline from GitHub and installs it as the packages'
 * size-baseline.json, so `pnpm size` compares against the same baseline the CI uses.
 *
 *   pnpm size:pull                       # newest baseline of develop
 *   pnpm size:pull --branch release/4    # baseline of another base branch
 *   pnpm size:pull --sha <commit>        # baseline of one specific base commit
 *
 * Requires the GitHub CLI (`gh auth login`). The artifact is produced by the "Size Baseline"
 * workflow for every push to develop, main and release/*; `pnpm size:update` remains the way to
 * generate a baseline from a local build.
 */
import { spawnSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { newestArtifact, selectArtifact } from '../visual-review/baseline-artifacts.mjs';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
const ARTIFACT_NAME = 'size-baseline';
const WORKFLOW = 'Size Baseline';
const TARGETS = [
	{ file: 'components.json', name: '@public-ui/components', dir: 'packages/components' },
	{ file: 'theme-default.json', name: '@public-ui/theme-default', dir: 'packages/themes/default' },
];

function parseArgs(argv) {
	const options = { branch: 'develop', sha: null };
	for (let i = 0; i < argv.length; i += 1) {
		const arg = argv[i];
		if (arg === '--branch') options.branch = argv[++i];
		else if (arg === '--sha') options.sha = argv[++i];
		else if (arg.startsWith('--')) throw new Error(`Unknown option ${arg}`);
		else throw new Error(`Unexpected argument ${arg} – the artifact contains every package.`);
	}
	if (options.sha && !/^[0-9a-f]{7,40}$/.test(options.sha)) throw new Error(`--sha expects a commit hash, got "${options.sha}"`);
	return options;
}

function gh(args, { json = true } = {}) {
	// No shell: query strings contain `&`, and gh.exe resolves through PATH without one.
	const result = spawnSync('gh', args, { encoding: 'utf8', shell: false, windowsHide: true });
	if (result.error) throw new Error(`Cannot run the GitHub CLI (gh): ${result.error.message}`);
	if (result.status !== 0) throw new Error(`gh ${args.join(' ')} failed:\n${result.stderr}`);
	return json ? JSON.parse(result.stdout) : result.stdout;
}

function repository() {
	if (process.env.KOLIBRI_REPO) return process.env.KOLIBRI_REPO;
	return gh(['repo', 'view', '--json', 'nameWithOwner', '--jq', '.nameWithOwner'], { json: false }).trim();
}

/** Newest 100 artifacts of that name – enough for the recent history of a base branch. */
function listArtifacts(repo) {
	return gh(['api', '-X', 'GET', `repos/${repo}/actions/artifacts`, '-f', `name=${ARTIFACT_NAME}`, '-F', 'per_page=100']).artifacts ?? [];
}

function resolveSha(repo, sha) {
	return gh(['api', `repos/${repo}/commits/${sha}`, '--jq', '.sha'], { json: false }).trim();
}

function pull(repo, options) {
	const artifacts = listArtifacts(repo);
	const filter = { branch: options.branch };
	let chosen;
	if (options.sha) {
		const selected = selectArtifact(artifacts, [resolveSha(repo, options.sha)], filter);
		if (!selected) throw new Error(`No baseline artifact for ${options.sha} on ${options.branch} among the newest ${artifacts.length}.`);
		chosen = selected.artifact;
	} else {
		chosen = newestArtifact(artifacts, filter);
		if (!chosen) throw new Error(`No baseline artifact on ${options.branch} – has the "${WORKFLOW}" workflow run there yet?`);
	}

	const sha = chosen.workflow_run?.head_sha ?? '';
	const meta = { branch: options.branch, createdAt: chosen.created_at, sha };
	const download = fs.mkdtempSync(path.join(os.tmpdir(), `${ARTIFACT_NAME}-`));
	try {
		gh(['run', 'download', String(chosen.workflow_run.id), '--repo', repo, '--name', chosen.name, '--dir', download], { json: false });
		for (const target of TARGETS) {
			fs.cpSync(path.join(download, target.file), path.join(REPO_ROOT, target.dir, 'size-baseline.json'));
			// The report picks this up and records which baseline the next comparison ran against.
			const reportFolder = path.join(REPO_ROOT, target.dir, 'size-report');
			fs.mkdirSync(reportFolder, { recursive: true });
			fs.writeFileSync(path.join(reportFolder, 'baseline.json'), JSON.stringify(meta, null, '\t'));
			console.log(`${target.name}: baseline of ${options.branch}@${sha.slice(0, 10)} → ${target.dir}/size-baseline.json`);
		}
	} finally {
		fs.rmSync(download, { recursive: true, force: true });
	}
}

try {
	pull(repository(), parseArgs(process.argv.slice(2)));
} catch (error) {
	console.error(error.message);
	process.exit(1);
}
