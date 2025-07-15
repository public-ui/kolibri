import chalk from 'chalk';
import { exec } from 'child_process';
import { Command, Option } from 'commander';
import fs from 'fs';
import child_process from 'node:child_process';
import path from 'path';
import semver from 'semver';

import { Configuration } from '../types';
import { TaskRunner } from './runner/task-runner';
import { commonTasks } from './runner/tasks';
import { testTasks } from './runner/tasks/test';
import { v1Tasks } from './runner/tasks/v1';
import { v2Tasks } from './runner/tasks/v2';
import { v3Tasks } from './runner/tasks/v3';
import { getAssetTasks } from './runner/tasks/v1/assets';
import {
	getContentOfProjectPkgJson,
	getPackageManagerCommand,
	getVersionOfPublicUiComponents,
	getVersionOfPublicUiKoliBriCli,
	logAndCreateError,
	MODIFIED_FILES,
	POST_MESSAGES,
	setRemoveMode,
} from './shares/reuse';
import { REMOVE_MODE, RemoveMode } from './types';

type MigrateOption = {
	format: boolean;
	ignoreGreaterVersion: boolean;
	ignoreUncommittedChanges: boolean;
	overwriteCurrentVersion: string;
	overwriteTargetVersion: string;
	removeMode: RemoveMode;
	testTasks: boolean;
};
const currentVersionOfPublicUi = getVersionOfPublicUiComponents();
const targetVersionOfPublicUi = getVersionOfPublicUiKoliBriCli();

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
		.addOption(
			new Option('--overwrite-current-version <version>', 'Migrate from this current version instead of the installed version of KoliBri').default(
				currentVersionOfPublicUi,
			),
		)
		.addOption(
			new Option('--overwrite-target-version <version>', 'Migrate to this target version instead of the version of the CLI').default(targetVersionOfPublicUi),
		)
		.addOption(new Option('--ignore-greater-version', 'Allows execution with greater versions').default(false))
		.addOption(new Option('--ignore-uncommitted-changes', 'Allows execution with uncommitted changes').default(false))
		.addOption(new Option('--remove-mode <mode>', 'Prefix property name or delete property').choices(REMOVE_MODE).default('prefix'))
		.addOption(new Option('--test-tasks', 'Run additional test tasks').default(false).hideHelp())
		.action((baseDir: string, options: MigrateOption) => {
			exec('git status --porcelain', (err, stdout) => {
				if (err) {
					console.error(`exec error: ${err.message}`);
					return;
				}

				if (!semver.valid(options.overwriteCurrentVersion)) {
					throw logAndCreateError('Please specify a valid version for the --overwrite-current-version option.');
				}

				if (!semver.valid(options.overwriteTargetVersion)) {
					throw logAndCreateError('Please specify a valid version for the --overwrite-target-version option.');
				}

				if (!baseDir) {
					throw logAndCreateError('Please specify the source code folder to migrate.');
				}

				if (!options.ignoreUncommittedChanges && stdout) {
					throw logAndCreateError('There are uncommitted changes', 'If you want to ignore this, use the --ignore-uncommitted-changes option.');
				}

				setRemoveMode(options.removeMode);

				console.log(`
Current version of @public-ui/*: ${options.overwriteCurrentVersion}
Target version of @public-ui/*: ${options.overwriteTargetVersion}
Source folder to migrate: ${baseDir}
`);

				if (!options.ignoreGreaterVersion && semver.lt(options.overwriteTargetVersion, options.overwriteCurrentVersion)) {
					throw logAndCreateError(
						'Your current version of @public-ui/components is greater than the version of @public-ui/kolibri-cli. Please update @public-ui/kolibri-cli or force the migration with --ignore-greater-version.',
					);
				}

				const configFile = path.resolve(process.cwd(), '.kolibri.config.json');
				let config: Configuration = {};
				if (fs.existsSync(configFile)) {
					try {
						config = JSON.parse(fs.readFileSync(configFile, 'utf8')) as Configuration;
					} catch (e) {
						// ignore
					}
				}

				const runner = new TaskRunner(baseDir, options.overwriteTargetVersion, options.overwriteCurrentVersion, config);
				runner.registerTasks(commonTasks);
				runner.registerTasks(v1Tasks);
				runner.registerTasks(v2Tasks);
				runner.registerTasks(v3Tasks);
				runner.registerTasks(getAssetTasks(baseDir));

				if (options.testTasks) {
					runner.registerTasks(testTasks);
				}

				let version = options.overwriteCurrentVersion;

				/**
				 * Creates a replacer function for the package.json file.
				 * @param {string} version Version to set
				 * @returns {string} The replacer function
				 */
				function createVersionReplacer(version: string) {
					return (...args: string[]) => {
						if (args[1] === '@public-ui/kolibri-cli') {
							return `"${args[1]}": "${args[2]}"`;
						}
						return `"${args[1]}": "${version}"`;
					};
				}

				/**
				 * Sets the version of the @public-ui/* packages in the package.json file.
				 * @param {string} version Version to set
				 * @param {Function} cb Callback function
				 */
				function setVersionOfPublicUiPackages(version: string, cb: () => void) {
					let packageJson = getContentOfProjectPkgJson();
					packageJson = packageJson.replace(/"(@public-ui\/[^"]+)":\s*"(.*)"/g, createVersionReplacer(version));
					fs.writeFileSync(path.resolve(process.cwd(), 'package.json'), packageJson);
					runner.setProjectVersion(version);
					console.log(`- Update @public-ui/* to version ${version}`);
					exec(getPackageManagerCommand('install'), (err) => {
						if (err) {
							console.error(`exec error: ${err.message}`);
							return;
						}
						cb();
					});
				}

				/**
				 * Runs the task runner in a loop until all tasks are completed.
				 */
				function runLoop() {
					runner.run();
					if (version !== runner.getPendingMinVersion()) {
						// Tasks
						version = runner.getPendingMinVersion();
						setVersionOfPublicUiPackages(version, runLoop);
					} else if (semver.lt(version, options.overwriteTargetVersion)) {
						// CLI
						version = options.overwriteTargetVersion;
						setVersionOfPublicUiPackages(version, finish);
					} else if (semver.lt(version, options.overwriteCurrentVersion)) {
						// Components
						version = options.overwriteCurrentVersion;
						setVersionOfPublicUiPackages(version, finish);
					} else {
						finish();
					}
				}

				/**
				 * Prints the status of the task runner and the modified files.
				 */
				function finish() {
					console.log(`
Status of all executed Tasks:`);

					const status = runner.getStatus(true);

					// Merge config with current config of Runner
					config = {
						migrate: {
							tasks: {
								...status.config.migrate?.tasks,
								...config.migrate?.tasks,
							},
						},
					};

					fs.writeFileSync(configFile, JSON.stringify(config, null, 2));

					console.log(`
Modified files: ${MODIFIED_FILES.size}`);
					MODIFIED_FILES.forEach((file) => {
						console.log(`- ${file}`);
					});

					if (MODIFIED_FILES.size > 0 && options.format) {
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

					console.log(
						chalk.cyan(`
${chalk.bold.bgCyan(`The migration is complete.`)} Please check the modified files and commit them if necessary.`),
					);

					if (POST_MESSAGES.size > 0) {
						console.log(`
${chalk.bold.bgYellow(`Additional information:`)}`);
						POST_MESSAGES.forEach((message) => {
							switch (message.type) {
								case 'error':
									console.log(chalk.red(`- ${message.message}`));
									break;
								case 'warn':
									console.log(chalk.yellow(`- ${message.message}`));
									break;
								default:
									console.log(chalk.blue(`- ${message.message}`));
									break;
							}
						});
					}

					console.log(
						chalk.magenta(`
Despite the best possible preparation of migration steps, we will certainly not be able to fully migrate every individual source code in the project. After running the migration tool, please see where you may still need to help yourself and feel free to provide feedback on what we can improve.

After all the changes are made, the modified files are formatted using Prettier.

When migrating the labels, the text (innerText) is assigned 1 to 1 to the _label property. There could be the following situation, where manual corrections have to be made: ${chalk.italic.white(
							`_label={\`I am {count} years old.\`}`,
						)} -> ${chalk.italic.white(`_label={\`I am \${count} years old.\`}`)} (add a $)

Afterwards, it may be that functions or themes have changed or are no longer included in newer major versions. This should be checked finally and corrected manually if necessary.

If something is wrong, the migration can be reverted with ${chalk.italic.white(
							`git reset --hard HEAD~1`,
						)} or by discarding the affected files. For more information, read the troubleshooting section in the README.`),
					);
				}

				const status = runner.getStatus();
				console.log(`
Execute ${status.total} registered tasks...`);
				runLoop();
			});
		});
}
