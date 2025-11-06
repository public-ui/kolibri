import fs from 'fs';
import assert from 'node:assert';
import os from 'os';
import path from 'path';
import { RemoveTask } from '../src/migrate/runner/tasks/common/RemoveTask';

describe('RemoveTask', () => {
	it('executes rimraf command', async () => {
		const childProc = require('child_process');
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const filePath = path.join(tmpDir, 'to-remove.txt');
		fs.writeFileSync(filePath, 'data');

		const original = childProc.execSync;
		let executed = '';
		(childProc as any).execSync = (cmd: string) => {
			executed = cmd;
			fs.rmSync(filePath, { force: true });
			return Buffer.from('');
		};

		const task = RemoveTask.getInstance(filePath, '^1');
		task.run();
		(childProc as any).execSync = original;

		assert.ok(!fs.existsSync(filePath));
		assert.ok(executed.includes('rimraf'));
	});
});
