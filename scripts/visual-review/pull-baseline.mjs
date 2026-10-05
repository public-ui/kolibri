/**
 * Downloads the current visual baseline from GitHub into the local snapshot folders, so
 * `pnpm --filter @public-ui/<package> test` compares against the same files the CI uses.
 *
 *   pnpm snapshots:pull                        # every package, newest baseline of develop
 *   pnpm snapshots:pull theme-default unstyled # selected packages
 *   pnpm snapshots:pull --branch release/3     # baseline of another base branch
 *   pnpm snapshots:pull --sha <commit>         # baseline of one specific base commit
 *
 * Requires the GitHub CLI (`gh auth login`). The artifacts are produced by the "Visual Baseline"
 * workflow for every push to develop, main and release/*; `test:update:docker` remains the way to
 * generate them locally.
 */
import { spawnSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { META_FILE, artifactName, newestArtifact, selectArtifact } from './baseline-artifacts.mjs';
import { BASELINE_PACKAGES, reportDir, resolvePackage, snapshotDir } from './snapshot-paths.mjs';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));

function parseArgs(argv) {
	const options = { packages: [], branch: 'develop', sha: null };
	for (let i = 0; i < argv.length; i += 1) {
		const arg = argv[i];
		if (arg === '--branch') options.branch = argv[++i];
		else if (arg === '--sha') options.sha = argv[++i];
		else if (arg.startsWith('--')) throw new Error(`Unknown option ${arg}`);
		else options.packages.push(resolvePackage(arg));
	}
	if (options.packages.length === 0) options.packages = BASELINE_PACKAGES;
	for (const pkg of options.packages) {
		if (pkg.baselineFrom) throw new Error(`${pkg.name} has no baseline of its own – pull ${pkg.baselineFrom} instead.`);
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
function listArtifacts(repo, pkg) {
	return gh(['api', '-X', 'GET', `repos/${repo}/actions/artifacts`, '-f', `name=${artifactName(pkg)}`, '-F', 'per_page=100']).artifacts ?? [];
}

function resolveSha(repo, sha) {
	return gh(['api', `repos/${repo}/commits/${sha}`, '--jq', '.sha'], { json: false }).trim();
}

function pull(repo, pkg, options) {
	const artifacts = listArtifacts(repo, pkg);
	const filter = { branch: options.branch };
	let chosen;
	if (options.sha) {
		const selected = selectArtifact(artifacts, [resolveSha(repo, options.sha)], filter);
		if (!selected) throw new Error(`${pkg.name}: no baseline artifact for ${options.sha} on ${options.branch} among the newest ${artifacts.length}.`);
		chosen = selected.artifact;
	} else {
		chosen = newestArtifact(artifacts, filter);
		if (!chosen) throw new Error(`${pkg.name}: no baseline artifact on ${options.branch} – has the "Visual Baseline" workflow run there yet?`);
	}

	const download = fs.mkdtempSync(path.join(os.tmpdir(), 'visual-baseline-'));
	try {
		gh(['run', 'download', String(chosen.workflow_run.id), '--repo', repo, '--name', chosen.name, '--dir', download], { json: false });
		const meta = JSON.parse(fs.readFileSync(path.join(download, META_FILE), 'utf8'));
		const source = path.join(download, 'snapshots', pkg.themeDir);
		const target = path.join(REPO_ROOT, snapshotDir(pkg));
		fs.rmSync(target, { recursive: true, force: true });
		fs.cpSync(source, target, { recursive: true });
		// The reporter picks this up and records which baseline the next comparison ran against.
		const reportFolder = path.join(REPO_ROOT, reportDir(pkg));
		fs.mkdirSync(reportFolder, { recursive: true });
		fs.writeFileSync(path.join(reportFolder, 'baseline.json'), JSON.stringify(meta, null, '\t'));
		console.log(`${pkg.name}: ${meta.files} snapshots from ${meta.ref}@${meta.sha.slice(0, 10)} (${meta.createdAt}) → ${snapshotDir(pkg)}`);
	} finally {
		fs.rmSync(download, { recursive: true, force: true });
	}
}

try {
	const options = parseArgs(process.argv.slice(2));
	const repo = repository();
	for (const pkg of options.packages) {
		pull(repo, pkg, options);
	}
} catch (error) {
	console.error(error.message);
	process.exit(1);
}
