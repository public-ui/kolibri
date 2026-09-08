/**
 * Selection rules for baseline artifacts – shared by the local `pull-baseline.mjs` and the CI
 * download. Pure functions over the artifact objects the GitHub REST API returns
 * (`GET /repos/{owner}/{repo}/actions/artifacts?name=…`), so they can be tested without network.
 */
export const ARTIFACT_PREFIX = 'visual-baseline-';
export const META_FILE = 'meta.json';

export function artifactName(pkg) {
	return `${ARTIFACT_PREFIX}${pkg.name}`;
}

/**
 * Keeps only artifacts that can serve as baseline: not expired, produced on `branch` (when given)
 * and – unless `repositoryId` is unknown – by a push to this repository rather than to a fork whose
 * branch happens to carry the same name.
 */
export function usableArtifacts(artifacts, { branch, repositoryId } = {}) {
	return artifacts.filter((artifact) => {
		if (artifact.expired) return false;
		const run = artifact.workflow_run ?? {};
		if (branch && run.head_branch !== branch) return false;
		if (repositoryId !== undefined && run.head_repository_id !== undefined && run.head_repository_id !== repositoryId) return false;
		return true;
	});
}

/**
 * Picks the artifact of the first commit in `candidates` (nearest first) that has one. Several runs
 * for the same commit (re-runs, schedule) resolve to the newest artifact. Returns `null` when no
 * candidate has an artifact.
 */
export function selectArtifact(artifacts, candidates, options = {}) {
	const usable = usableArtifacts(artifacts, options);
	for (const [distance, sha] of candidates.entries()) {
		const matching = usable.filter((artifact) => artifact.workflow_run?.head_sha === sha);
		if (matching.length > 0) {
			return { artifact: newest(matching), sha, distance };
		}
	}
	return null;
}

/** The most recently created usable artifact – the fallback when no candidate commit has one. */
export function newestArtifact(artifacts, options = {}) {
	const usable = usableArtifacts(artifacts, options);
	return usable.length > 0 ? newest(usable) : null;
}

/**
 * The full decision: nearest candidate commit with an artifact (fallback `null` for the base commit
 * itself, `ancestor` for an older one), else the newest usable artifact (`latest`), else `none`.
 */
export function chooseBaseline(artifacts, candidates, options = {}) {
	// A candidate is an ancestor of the tree under test, so its artifact is the right baseline no matter
	// which branch built it – a pull request against a feature branch still finds the develop commits
	// below it. Only the "latest" fallback is bound to the base branch. Forks stay excluded.
	const selected = selectArtifact(artifacts, candidates, { repositoryId: options.repositoryId });
	if (selected) {
		return { artifact: selected.artifact, sha: selected.sha, distance: selected.distance, fallback: selected.distance === 0 ? null : 'ancestor' };
	}
	const latest = newestArtifact(artifacts, options);
	if (latest) {
		return { artifact: latest, sha: latest.workflow_run?.head_sha ?? null, distance: null, fallback: 'latest' };
	}
	return { artifact: null, sha: null, distance: null, fallback: 'none' };
}

function newest(artifacts) {
	return [...artifacts].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))[0];
}
