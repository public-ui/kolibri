import assert from 'node:assert';
import { HandleDependencyTask } from '../src/migrate/runner/tasks/common/HandleDependencyTask';

describe('HandleDependencyTask', () => {
	it('calls package manager with dependencies', async () => {
		const childProc = require('child_process');
		const original = childProc.execSync;
		let commands: string[] = [];
		(childProc as any).execSync = (cmd: string) => {
			commands.push(cmd);
			return Buffer.from('');
		};

		const task = HandleDependencyTask.getInstance('add', { lodash: '1.0.0' }, { mocha: '2.0.0' }, '^1');
		task.run();

		(childProc as any).execSync = original;
		assert.ok(commands[0].includes('add')); // first call
		assert.ok(commands[1].includes('-D'));
	});
});
