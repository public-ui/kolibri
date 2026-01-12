import assert from 'node:assert';
import { HandleDependencyTask } from '../src/migrate/runner/tasks/common/HandleDependencyTask';

describe('HandleDependencyTask', () => {
	it('prepares package manager commands with dependencies', () => {
		const task = HandleDependencyTask.getInstance('add', { lodash: '1.0.0' }, { mocha: '2.0.0' }, '^1');
		const commands = task.prepareExecutables();

		assert.ok(commands.length === 2, 'Should have 2 commands');
		assert.ok(commands[0].includes('add'), 'First command should include add');
		assert.ok(commands[0].includes('lodash@1.0.0'), 'First command should include lodash version');
		assert.ok(commands[1].includes('-D'), 'Second command should include -D for devDependencies');
		assert.ok(commands[1].includes('mocha'), 'Second command should include mocha');
	});

	it('executeImmediate runs commands synchronously', () => {
		const childProc = require('child_process');
		const original = childProc.execSync;
		let commands: string[] = [];
		(childProc as any).execSync = (cmd: string) => {
			commands.push(cmd);
			return Buffer.from('');
		};

		const task = HandleDependencyTask.getInstance('add', { axios: '1.0.0' }, {}, '^1');
		task.executeImmediate();

		(childProc as any).execSync = original;
		assert.ok(commands.length > 0, 'Should have executed commands');
		assert.ok(commands[0].includes('add'), 'Command should include add');
	});
});
