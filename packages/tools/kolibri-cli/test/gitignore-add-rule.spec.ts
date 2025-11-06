import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { GitIgnoreAddRuleTask } from '../src/migrate/runner/tasks/common/GitIgnoreAddRuleTask';

describe('GitIgnoreAddRuleTask', () => {
	it('adds rule to .gitignore', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const cwd = process.cwd();
		process.chdir(tmpDir);

		const task = GitIgnoreAddRuleTask.getInstance('dist', '^1');
		task.run();

		process.chdir(cwd);
		const content = fs.readFileSync(path.join(tmpDir, '.gitignore'), 'utf8');
		assert.ok(content.includes('dist'));
	});
});
