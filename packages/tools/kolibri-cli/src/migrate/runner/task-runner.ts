import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import semver from 'semver';

import { Configuration, Migrate } from '../../types';
import { logAndCreateError } from '../shares/reuse';
import { AbstractTask } from './abstract-task';

const MIN_VERSION_OF_PUBLIC_UI = '1.4.2';

export class TaskRunner {
	private readonly tasks: Map<string, AbstractTask> = new Map();
	private baseDir: string = '/';
	private cliVersion: string = '0.0.0';
	private projectVersion: string = '0.0.0';
	private readonly config: Configuration = {
		migrate: {
			tasks: {},
		},
	};

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
			if (
				task.getStatus() === 'pending' &&
				semver.satisfies(this.projectVersion, task.getVersionRange(), {
					includePrerelease: true,
				})
			) {
				// task.setStatus('running'); only of the task is async
				if (!this.tasks.has(task.getIdentifier())) {
					this.registerTask(task);
				}
				task.run(this.baseDir);
				task.setStatus('done');
			}
		}
	}

	private dependentTaskRun(task: AbstractTask, taskDependencies: AbstractTask[]) {
		taskDependencies.forEach((dependentTask) => {
			this.dependentTaskRun(dependentTask, dependentTask.getTaskDependencies());
		});
		if (taskDependencies.every((dependentTask) => dependentTask.getStatus() === 'done')) {
			this.runTask(task);
		}
	}

	public run(): void {
		this.tasks.forEach((task) => {
			this.dependentTaskRun(task, task.getTaskDependencies());
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
