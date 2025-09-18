import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { Command } from 'commander';
import generateScss from '../src/generate-scss';
import info from '../src/info';
import migrate from '../src/migrate';
import { getRemoveMode, setRemoveMode } from '../src/migrate/shares/reuse';
import { TaskRunner } from '../src/migrate/runner/task-runner';

describe('CLI interface', function () {
	this.timeout(5000);
	it('runs generate-scss command', async () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		const cwd = process.cwd();
		process.chdir(tmpDir);

		const typedBem = require('typed-bem/scss');
		const original = typedBem.generateBemScssFile;
		const calls: Array<{ name: string; options?: any }> = [];
		typedBem.generateBemScssFile = (_: unknown, name: string, options?: any) => {
			calls.push({ name, options });
		};

		const program = new Command();
		generateScss(program);
		await program.parseAsync(['node', 'cli', 'generate-scss', 'alert', 'icon']);

		typedBem.generateBemScssFile = original;
		process.chdir(cwd);

		// Verify that both components were called with default layer option
		assert.strictEqual(calls.length, 2);
		assert.strictEqual(calls[0].name, 'alert');
		assert.strictEqual(calls[1].name, 'icon');
		// Both should have layer option set to 'kol-theme-component' (default)
		assert.deepStrictEqual(calls[0].options, { layer: 'kol-theme-component' });
		assert.deepStrictEqual(calls[1].options, { layer: 'kol-theme-component' });
	});

	it('runs info command', async () => {
		const program = new Command();
		info(program);
		let output = '';
		const original = console.log;
		console.log = (str: string) => {
			output += str;
		};
		await program.parseAsync(['node', 'cli', 'info']);
		console.log = original;
		assert.ok(output.includes('Operating System'));
	});

	it('runs migrate command with options', async () => {
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kolibri-cli-'));
		fs.writeFileSync(
			path.join(tmpDir, 'package.json'),
			JSON.stringify({ dependencies: { '@public-ui/components': '0.0.0' }, devDependencies: { '@public-ui/kolibri-cli': '0.0.0' } }),
		);
		fs.writeFileSync(path.join(tmpDir, 'pnpm-lock.yaml'), '');
		const cwd = process.cwd();

		try {
			process.chdir(tmpDir);

			const childProc = require('child_process');
			const execOrig = childProc.exec;
			(childProc as any).exec = (_: string, cb: (err: null, out: string) => void) => cb(null, '');

			let runCalled = false;
			const runOrig = TaskRunner.prototype.run;
			TaskRunner.prototype.run = function () {
				runCalled = true;
			};
			const getStatusOrig = TaskRunner.prototype.getStatus;
			TaskRunner.prototype.getStatus = () => ({ total: 0, done: 0, pending: 0, nextVersion: '0.0.0', config: { migrate: { tasks: {} } } });
			const getPendingOrig = TaskRunner.prototype.getPendingMinVersion;
			TaskRunner.prototype.getPendingMinVersion = () => '0.0.0';

			const program = new Command();
			migrate(program);
			await program.parseAsync([
				'node',
				'cli',
				'migrate',
				'.',
				'--ignore-uncommitted-changes',
				'--overwrite-current-version',
				'0.0.0',
				'--overwrite-target-version',
				'0.0.0',
				'--remove-mode',
				'delete',
				'--test-tasks',
			]);

			(childProc as any).exec = execOrig;
			TaskRunner.prototype.run = runOrig;
			TaskRunner.prototype.getStatus = getStatusOrig;
			TaskRunner.prototype.getPendingMinVersion = getPendingOrig;

			assert.ok(runCalled);
			assert.equal(getRemoveMode(), 'delete');
			setRemoveMode('prefix');
		} finally {
			// Always restore working directory
			process.chdir(cwd);
		}
	});
});
