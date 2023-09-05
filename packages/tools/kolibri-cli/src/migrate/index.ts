import { exec } from 'child_process';
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { TaskRunner } from './runner/task-runner';
import { testTasks } from './runner/tasks/test';
import { v1Tasks } from './runner/tasks/v1';
import { getPackageManagerInstallCommand, readPackageJson, readPackageString } from './shares/reuse';

type Option = 'testTasks';

/**
 * This function is used to register the migrate command.
 * @param {Command} program The program object to register the command
 */
export default function (program: Command): void {
	program
		.command('migrate')
		.description('This command migrates KoliBri code to the current version.')
		.argument('<string>', 'Source code folder to migrate')
		.option('--test-tasks', 'Run additional test tasks', false)
		.action((baseDir: string, options: Record<Option, boolean>) => {
			exec('git status --porcelain', (err, stdout) => {
				if (err) {
					console.error(`exec error: ${err.message}`);
					return;
				}

				// if (stdout) {
				// 	throw new Error('There are uncommitted changes');
				// }

				const versionOfPublicUiKoliBriCli = readPackageJson(path.resolve(__dirname, '..', '..')).version;
				const versionOfPublicUiComponents = readPackageJson(path.resolve(process.cwd(), 'node_modules/@public-ui/components')).version;

				console.log(`
Current version of @public-ui/components: ${versionOfPublicUiComponents}
Source folder to migrate: ${baseDir}`);

				const runner = new TaskRunner(baseDir, versionOfPublicUiKoliBriCli, versionOfPublicUiComponents);
				runner.registerTasks(v1Tasks);

				if (options.testTasks) {
					runner.registerTasks(testTasks);
				}

				let version = versionOfPublicUiComponents;

				/**
				 * Runs the task runner in a loop until all tasks are completed.
				 */
				function runLoop() {
					runner.run();
					if (version !== runner.getPendingMinVersion()) {
						version = runner.getPendingMinVersion();
						let packageJson = readPackageString(path.resolve(process.cwd()));
						packageJson = packageJson.replace(/"(@public-ui\/[^"]+)":\s*".*"/g, `"$1": "${version}"`);
						fs.writeFileSync(path.resolve(process.cwd(), 'package.json'), packageJson);
						runner.setProjectVersion(version);

						console.log(`- Update @public-ui/* to version ${version}`);
						exec(getPackageManagerInstallCommand(), (err) => {
							if (err) {
								console.error(`exec error: ${err.message}`);
								return;
							}
							runLoop();
						});
					} else {
						console.log(`
Task status:`);
						runner.getStatus(true);

						console.log(`
After the code migration has gone through, the code formatting may no longer
be as desired. Therefore, please reformat your code afterwards if necessary.

Afterwards, it may be that functions or themes in newer major versions have
changed or are no longer included. This should be checked finally and corrected
manually if necessary.

Is anything wrong, you can reset the migration with "git reset --hard HEAD~1".
`);
					}
				}

				const status = runner.getStatus();
				console.log(`
Running ${status.total} tasks...`);
				runLoop();
			});
		});
}
