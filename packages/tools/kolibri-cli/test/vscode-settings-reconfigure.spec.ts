import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { VsCodeSettingsReconfigureTask } from '../src/migrate/runner/tasks/common/VsCodeSettingsReconfigureTask';

describe('VsCodeSettingsReconfigureTask', () => {
	it('writes key value to .vscode/settings.json', () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const cwd = process.cwd();
		process.chdir(tmpDir);

		try {
			const task = VsCodeSettingsReconfigureTask.getInstance('editor.tabSize', 2, '^1');
			task.run();

			const content = JSON.parse(fs.readFileSync(path.join(tmpDir, '.vscode', 'settings.json'), 'utf8'));
			assert.equal(content['editor.tabSize'], 2);
		} finally {
			process.chdir(cwd);
		}
	});
});
