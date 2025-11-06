import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { NpmRcAddRuleTask } from '../src/migrate/runner/tasks/common/NpmRcAddRuleTask';

describe('NpmRcAddRuleTask', () => {
	it('adds rule to .npmrc', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const cwd = process.cwd();
		process.chdir(tmpDir);

		const task = NpmRcAddRuleTask.getInstance('prefer-offline=true', '^1');
		task.run();

		process.chdir(cwd);
		const content = fs.readFileSync(path.join(tmpDir, '.npmrc'), 'utf8');
		assert.ok(content.includes('prefer-offline=true'));
	});
});
