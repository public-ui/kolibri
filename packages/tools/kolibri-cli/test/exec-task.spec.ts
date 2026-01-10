import assert from 'node:assert';
import { ExecTask } from '../src/migrate/runner/tasks/common/ExecTask';

describe('ExecTask', () => {
	it('executes given command', () => {
		const cp = require('child_process');
		const original = cp.execSync;
		let called = '';
		(cp as any).execSync = (cmd: string) => {
			called = cmd;
			return Buffer.from('');
		};

		const task = ExecTask.getInstance('echo "works"', '^1');
		task.run();

		(cp as any).execSync = original;
		assert.strictEqual(called, 'echo "works"');
	});

	it('adds --ignore-lockfile flag for pnpm install', () => {
		const cp = require('child_process');
		const original = cp.execSync;
		let called = '';
		(cp as any).execSync = (cmd: string) => {
			called = cmd;
			return Buffer.from('');
		};

		const task = ExecTask.getInstance('pnpm install --verbose', '^4');
		task.run();

		(cp as any).execSync = original;
		assert.strictEqual(called, 'pnpm install --verbose --ignore-lockfile');
	});

	it('does not modify non-pnpm install commands', () => {
		const cp = require('child_process');
		const original = cp.execSync;
		let called = '';
		(cp as any).execSync = (cmd: string) => {
			called = cmd;
			return Buffer.from('');
		};

		const task = ExecTask.getInstance('npm install --save-dev typescript', '^4');
		task.run();

		(cp as any).execSync = original;
		assert.strictEqual(called, 'npm install --save-dev typescript');
	});
});
