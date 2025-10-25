import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { TsConfigReconfigureTask } from '../src/migrate/runner/tasks/common/TsConfigReconfigureTask';

describe('TsConfigReconfigureTask', () => {
	it('writes values into tsconfig.json', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const cwd = process.cwd();
		process.chdir(tmpDir);
		fs.writeFileSync('tsconfig.json', '{}');

		const task = TsConfigReconfigureTask.getInstance('compilerOptions', { compilerOptions: { target: 'ESNext' } }, '^1');
		task.run();

		process.chdir(cwd);
		const config = JSON.parse(fs.readFileSync(path.join(tmpDir, 'tsconfig.json'), 'utf8'));
		assert.equal(config.compilerOptions.target, 'ESNext');
	});
});
