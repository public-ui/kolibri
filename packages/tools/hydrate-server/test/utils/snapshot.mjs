import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const shouldUpdateSnapshots = () => {
	const value = process.env.SNAPSHOT_UPDATE?.toLowerCase();
	return value === '1' || value === 'true' || value === 'yes';
};

const serialize = (data) => `${JSON.stringify(data, null, 2)}\n`;

export const createSnapshotMatcher = (moduleUrl) => {
	const testDirectory = dirname(fileURLToPath(moduleUrl));
	const snapshotsDirectory = join(testDirectory, '__snapshots__');

	return async (snapshotName, data) => {
		const snapshotPath = join(snapshotsDirectory, `${snapshotName}.json`);

		try {
			const existing = JSON.parse(await readFile(snapshotPath, 'utf8'));

			if (shouldUpdateSnapshots()) {
				await mkdir(snapshotsDirectory, { recursive: true });
				await writeFile(snapshotPath, serialize(data));
				return;
			}

			assert.deepStrictEqual(data, existing);
		} catch (error) {
			if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
				if (shouldUpdateSnapshots()) {
					await mkdir(snapshotsDirectory, { recursive: true });
					await writeFile(snapshotPath, serialize(data));
					return;
				}

				throw new Error(`Snapshot "${snapshotName}" is missing. Run with SNAPSHOT_UPDATE=1 to create it.`);
			}

			throw error;
		}
	};
};
