import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { artifactName, chooseBaseline, newestArtifact, selectArtifact, usableArtifacts } from '../../../../scripts/visual-review/baseline-artifacts.mjs';

function artifact(id, { sha, branch = 'develop', repo = 1, created = '2026-09-01T00:00:00Z', expired = false } = {}) {
	return {
		id,
		name: 'visual-baseline-theme-default',
		expired,
		created_at: created,
		workflow_run: { id: id * 10, head_sha: sha, head_branch: branch, head_repository_id: repo, repository_id: 1 },
	};
}

const ARTIFACTS = [
	artifact(1, { sha: 'aaa', created: '2026-09-03T00:00:00Z' }),
	artifact(2, { sha: 'bbb', created: '2026-09-02T00:00:00Z' }),
	artifact(3, { sha: 'bbb', created: '2026-09-02T06:00:00Z' }),
	artifact(4, { sha: 'ccc', created: '2026-09-01T00:00:00Z', expired: true }),
	artifact(5, { sha: 'ddd', branch: 'main', created: '2026-09-04T00:00:00Z' }),
	artifact(6, { sha: 'eee', repo: 99, created: '2026-09-05T00:00:00Z' }),
];

describe('baseline-artifacts', () => {
	it('names artifacts after the package', () => {
		assert.equal(artifactName({ name: 'theme-desy' }), 'visual-baseline-theme-desy');
	});

	it('drops expired artifacts, other branches and forks', () => {
		const ids = usableArtifacts(ARTIFACTS, { branch: 'develop', repositoryId: 1 }).map((a) => a.id);
		assert.deepEqual(ids, [1, 2, 3]);
		assert.deepEqual(
			usableArtifacts(ARTIFACTS, { branch: 'main' }).map((a) => a.id),
			[5],
		);
		assert.deepEqual(
			usableArtifacts(ARTIFACTS).map((a) => a.id),
			[1, 2, 3, 5, 6],
			'no filter besides expiry',
		);
	});

	it('prefers the nearest candidate commit and the newest run for it', () => {
		const selected = selectArtifact(ARTIFACTS, ['ccc', 'bbb', 'aaa'], { branch: 'develop', repositoryId: 1 });
		assert.equal(selected.sha, 'bbb', 'ccc is expired, bbb is the next candidate');
		assert.equal(selected.distance, 1);
		assert.equal(selected.artifact.id, 3, 'newest of the two bbb artifacts');
	});

	it('returns null when no candidate has an artifact', () => {
		assert.equal(selectArtifact(ARTIFACTS, ['zzz', 'ccc'], { branch: 'develop' }), null);
		assert.equal(selectArtifact(ARTIFACTS, [], { branch: 'develop' }), null);
	});

	it('chooses the base commit, an ancestor, the newest artifact or none – in that order', () => {
		const options = { branch: 'develop', repositoryId: 1 };
		assert.deepEqual((({ artifact, ...rest }) => ({ id: artifact.id, ...rest }))(chooseBaseline(ARTIFACTS, ['aaa', 'bbb'], options)), {
			id: 1,
			sha: 'aaa',
			distance: 0,
			fallback: null,
		});
		assert.deepEqual((({ artifact, ...rest }) => ({ id: artifact.id, ...rest }))(chooseBaseline(ARTIFACTS, ['zzz', 'bbb'], options)), {
			id: 3,
			sha: 'bbb',
			distance: 1,
			fallback: 'ancestor',
		});
		assert.deepEqual((({ artifact, ...rest }) => ({ id: artifact.id, ...rest }))(chooseBaseline(ARTIFACTS, ['zzz'], options)), {
			id: 1,
			sha: 'aaa',
			distance: null,
			fallback: 'latest',
		});
		assert.deepEqual(chooseBaseline(ARTIFACTS, ['zzz'], { branch: 'release/9' }), { artifact: null, sha: null, distance: null, fallback: 'none' });
	});

	it('falls back to the newest usable artifact', () => {
		assert.equal(newestArtifact(ARTIFACTS, { branch: 'develop', repositoryId: 1 }).id, 1);
		assert.equal(newestArtifact(ARTIFACTS, { branch: 'release/3' }), null);
	});
});
