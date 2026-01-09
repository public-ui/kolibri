import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import semver from 'semver';

import { Configuration, Migrate } from '../../types';
import { logAndCreateError } from '../shares/reuse';
import { AbstractTask, ExecutionMode } from './abstract-task';

const MIN_VERSION_OF_PUBLIC_UI = '1.4.2';

/**
 * Displays a progress bar in the console.
 * @param {number} current Current progress
 * @param {number} total Total items
 * @param {string} title Optional title
 */
function displayProgressBar(current: number, total: number, title: string = ''): void {
	const barLength = 30;
	const percentage = total === 0 ? 0 : (current / total) * 100;
	const filledLength = Math.round((barLength * current) / total);
	const emptyLength = barLength - filledLength;

	const bar = chalk.green('█'.repeat(filledLength)) + chalk.gray('░'.repeat(emptyLength));
	const percentStr = percentage.toFixed(0).padStart(3, ' ');

	// Bestimme die maximale Ziffernzahl des totals
	const totalDigits = total.toString().length;
	const currentStr = current.toString().padStart(totalDigits, ' ');
	const taskStr = `${currentStr}/${total}`;

	const titleStr = title ? ` ${title}` : '';
	process.stdout.write(`\r${bar} ${percentStr}% [${taskStr}]${titleStr}`);
}

export class TaskRunner {
	private readonly tasks: Map<string, AbstractTask> = new Map();
	private baseDir: string = '/';
	private cliVersion: string = '0.0.0';
	private projectVersion: string = '0.0.0';
	private executionMode: ExecutionMode = 'immediate';
	private aggregatedCommands: Map<string, string[]> = new Map(); // taskId -> commands
	private readonly config: Configuration = {
		migrate: {
			tasks: {},
		},
	};
	private completedTasks: number = 0;

	public constructor(baseDir: string, cliVersion: string, projectVersion: string, config: Configuration) {
		this.setBaseDir(baseDir);
		this.setCliVersion(cliVersion);
		this.setProjectVersion(projectVersion);
		this.setConfig({ ...config }); // clone config
	}

	private setBaseDir(baseDir: string): void {
		if (!fs.existsSync(path.resolve(process.cwd(), baseDir))) {
			throw logAndCreateError(`Base directory "${baseDir}" does not exist`);
		}
		this.baseDir = baseDir;
	}

	private setCliVersion(version: string): void {
		if (semver.valid(version) === null) {
			throw logAndCreateError(`Invalid CLI version: ${version}`);
		}
		this.cliVersion = version;
	}

	public setProjectVersion(version: string): void {
		if (semver.valid(version) === null) {
			throw logAndCreateError(`Invalid project version: ${version}`);
		}
		if (this.projectVersion !== version) {
			this.projectVersion = version;
		}
	}

	public setExecutionMode(mode: ExecutionMode): void {
		this.executionMode = mode;
		this.tasks.forEach((task) => {
			task.setExecutionMode(mode);
		});
	}

	private setConfig(config: Configuration): void {
		if (config.migrate?.tasks) {
			this.config.migrate!.tasks = {
				...this.config.migrate!.tasks,
				...config.migrate?.tasks,
			};
		}
	}

	public registerTasks(tasks: AbstractTask[]): void {
		tasks.forEach((task) => {
			const taskDependencies = task.getTaskDependencies();
			if (taskDependencies.length > 0) {
				this.registerTasks(taskDependencies);
			}
			if (
				semver.gtr(this.projectVersion, task.getVersionRange(), {
					includePrerelease: true,
				})
			) {
				console.log(
					`Task "${task.getTitle()}" will be excluded. The current version (${
						this.projectVersion
					}) is greater than the task version range (${task.getVersionRange()}).`,
				);
				this.config.migrate!.tasks[task.getIdentifier()] = false;
			} else if (
				semver.ltr(this.cliVersion, task.getVersionRange(), {
					includePrerelease: true,
				})
			) {
				console.log(
					`Task "${task.getTitle()}" will be excluded. The target version (${
						this.cliVersion
					}) is lower than the task version range (${task.getVersionRange()}).`,
				);
				this.config.migrate!.tasks[task.getIdentifier()] = false;
			} else {
				this.tasks.set(task.getIdentifier(), task);
			}
		});
	}

	private registerTask(task: AbstractTask): void {
		this.registerTasks([task]);
	}

	private runTask(task: AbstractTask): void {
		if (this.config.migrate?.tasks[task.getIdentifier()] === false) {
			task.setStatus('skipped');
		} else {
			(this.config.migrate as unknown as Migrate).tasks[task.getIdentifier()] = true;

			const isProjectVersionGreater = semver.gtr(this.projectVersion, task.getVersionRange(), {
				includePrerelease: true,
			});
			const isCliVersionLower = semver.ltr(this.cliVersion, task.getVersionRange(), {
				includePrerelease: true,
			});

			if (task.getStatus() === 'pending' && !isProjectVersionGreater && !isCliVersionLower) {
				// task.setStatus('running'); only of the task is async
				if (!this.tasks.has(task.getIdentifier())) {
					this.registerTask(task);
				}
				task.run(this.baseDir);

				// Collect commands if in batch mode
				if (this.executionMode === 'batch') {
					this.aggregateCommandsFromTask(task);
				}

				task.setStatus('done');
			}
		}
	}

	private dependentTaskRun(task: AbstractTask, taskDependencies: AbstractTask[]) {
		taskDependencies.forEach((dependentTask) => {
			this.dependentTaskRun(dependentTask, dependentTask.getTaskDependencies());
		});
		if (taskDependencies.length === 0 || taskDependencies.every((dependentTask) => dependentTask.getStatus() === 'done')) {
			displayProgressBar(this.completedTasks, this.tasks.size, task.getTitle());
			this.runTask(task);
			this.completedTasks++;
		}
	}

	public run(): void {
		this.completedTasks = 0;
		this.aggregatedCommands.clear();

		displayProgressBar(0, this.tasks.size);

		this.tasks.forEach((task) => {
			this.dependentTaskRun(task, task.getTaskDependencies());
		});

		displayProgressBar(this.tasks.size, this.tasks.size);

		if (this.tasks.size > 0) {
			console.log(); // New line after progress bar
		}

		// If in batch mode, collect and execute all commands at the end
		if (this.executionMode === 'batch') {
			this.executeAggregatedCommands();
		}
	}

	private aggregateCommandsFromTask(task: AbstractTask): void {
		// HandleDependencyTask has prepareExecutables method
		if ('prepareExecutables' in task && typeof (task as { prepareExecutables?: () => string[] }).prepareExecutables === 'function') {
			const taskWithPrepare = task as { prepareExecutables: () => string[] };
			const commands: string[] = taskWithPrepare.prepareExecutables();
			if (commands.length > 0) {
				this.aggregatedCommands.set(task.getIdentifier(), commands);
			}
		}
	}

	private executeAggregatedCommands(): void {
		const allCommands: string[] = [];

		this.aggregatedCommands.forEach((commands) => {
			allCommands.push(...commands);
		});

		if (allCommands.length === 0) {
			return;
		}

		console.log('\nExecuting aggregated dependency commands...');
		allCommands.forEach((command) => {
			try {
				console.log(`  Running: ${command}`);
				execSync(command, {
					encoding: 'utf8',
					stdio: 'inherit',
				});
			} catch (error) {
				console.warn(`Warning: Failed to execute command: ${command}`, error);
			}
		});
	}

	public getPendingMinVersion(): string {
		let version: string = this.cliVersion;
		this.tasks.forEach((task) => {
			if (task.getStatus() === 'pending') {
				const minVersion = semver.minVersion(task.getVersionRange())?.raw ?? this.cliVersion;
				if (semver.gt(version, minVersion)) {
					version = minVersion;
				}
			}
		});
		return semver.maxSatisfying([version], `>=${MIN_VERSION_OF_PUBLIC_UI}`) ?? MIN_VERSION_OF_PUBLIC_UI;
	}

	public getStatus(outline = false): {
		done: number;
		pending: number;
		total: number;
		nextVersion: string | null;
		config: Configuration;
	} {
		let done = 0;
		let pending = 0;
		this.tasks.forEach((task) => {
			switch (task.getStatus()) {
				case 'done':
					done++;
					break;
				case 'pending':
					pending++;
					break;
			}
			if (outline) {
				const status = task.getStatus();
				console.log(`- ${task.getTitle()}:`, status === 'done' ? chalk.green(status) : chalk.yellow(status));
			}
		});
		return {
			done: done,
			pending: pending,
			total: this.tasks.size,
			nextVersion: this.getPendingMinVersion(),
			config: this.config,
		};
	}
}
