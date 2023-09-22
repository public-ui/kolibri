import child_process from 'node:child_process';
import { exec } from 'child_process';
import { Command, Option } from 'commander';
import fs from 'fs';
import path from 'path';

import { Configuration } from '../types';
import { TaskRunner } from './runner/task-runner';
import { testTasks } from './runner/tasks/test';
import { v1Tasks } from './runner/tasks/v1';
import {
	getContentOfProjectPkgJson,
	getPackageManagerInstallCommand,
	getVersionOfPublicUiComponents,
	getVersionOfPublicUiKoliBriCli,
	logAndCreateError,
	MODIFIED_FILES,
	setRemoveMode,
} from './shares/reuse';
import { REMOVE_MODE, RemoveMode } from './types';
import { commonTasks } from './runner/tasks';

type MigrateOption = {
	format: boolean;
	ignoreUncommittedChanges: boolean;
	removeMode: RemoveMode;
	testTasks: boolean;
};

/**
 * This function is used to register the migrate command.
 * @param {Command} program The program object to register the command
 */
export default function (program: Command): void {
	program
		.command('migrate')
		.description('This command migrates KoliBri code to the current version.')
		.argument('[string]', 'Source code folder to migrate', 'src')
		.addOption(new Option('--format', 'Try to format the modified files with prettier').default(true))
		.addOption(new Option('--ignore-uncommitted-changes', 'Allows execution with uncommitted changes').default(false))
		.addOption(new Option('--remove-mode <mode>', 'Prefix property name or delete property').choices(REMOVE_MODE).default('prefix'))
		.addOption(new Option('--test-tasks', 'Run additional test tasks').default(false).hideHelp())
		.action((baseDir: string, options: MigrateOption) => {
			exec('git status --porcelain', (err, stdout) => {
				if (err) {
					console.error(`exec error: ${err.message}`);
					return;
				}

				if (!options.ignoreUncommittedChanges && stdout) {
					throw logAndCreateError('There are uncommitted changes');
				}

				setRemoveMode(options.removeMode);

				const versionOfPublicUiComponents = getVersionOfPublicUiComponents();
				const versionOfPublicUiKoliBriCli = getVersionOfPublicUiKoliBriCli();

				console.log(`
Current version of @public-ui/components: ${versionOfPublicUiComponents}
Source folder to migrate: ${baseDir}
`);

				const configFile = path.resolve(process.cwd(), '.kolibri.config.json');
				let config: Configuration = {};
				if (fs.existsSync(configFile)) {
					try {
						config = JSON.parse(fs.readFileSync(configFile, 'utf8')) as Configuration;
					} catch (e) {
						// ignore
					}
				}

				const runner = new TaskRunner(baseDir, versionOfPublicUiKoliBriCli, versionOfPublicUiComponents, config);
				runner.registerTasks(commonTasks);
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
						let packageJson = getContentOfProjectPkgJson();
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
Status of all executed Tasks:`);

						const status = runner.getStatus(true);
						fs.writeFileSync(configFile, JSON.stringify(status.config, null, 2));

						console.log(`
Modified files: ${MODIFIED_FILES.size}`);
						MODIFIED_FILES.forEach((file) => {
							console.log(`- ${file}`);
						});

						if (options.format) {
							console.log(`
We try to format the modified files with prettier...`);
							try {
								child_process.execFileSync('npx', ['prettier', '-w', ...Array.from(MODIFIED_FILES)], {
									encoding: 'utf-8',
								});
								console.log(`Modified files have been formatted.`);
							} catch (e) {
								console.log(`Modified files could not be formatted. Please format them manually: npx prettier ${baseDir} -w`);
							}
							console.log();
						}

						console.log(`
After migrating the code, the formatting of the code may no longer be as desired. Therefore, reformat your code afterwards if necessary: npx prettier ${baseDir} -w

When migrating the labels, the text (innerText) is assigned 1 to 1 to the _label property. There could be the following situation, where manual corrections have to be made: _label={\`I am {count} years old.\`} -> _label={\`I am \${count} years old.\`} (add a $)

Afterwards, it may be that functions or themes have changed or are no longer included in newer major versions. This should be checked finally and corrected manually if necessary.

If something is wrong, the migration can be stopped with "git reset --hard HEAD~1" or by discarding the affected files. For more information, read the troubleshooting section in the README.`);
					}
				}

				const status = runner.getStatus();
				console.log(`
Execute ${status.total} registered tasks...`);
				runLoop();
			});
		});
}
