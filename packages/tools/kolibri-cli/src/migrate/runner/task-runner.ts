import fs from 'fs';
import path from 'path';
import semver from 'semver';
import { AbstractTask } from './abstract-task';
import { Configuration } from '../../types';

export class TaskRunner {
	private readonly tasks: Map<string, AbstractTask> = new Map();
	private baseDir: string = '/';
	private cliVersion: string = '0.0.0';
	private projectVersion: string = '0.0.0';
	private openRun = true;
	private readonly config: Configuration = {
		migrate: {
			tasks: {},
		},
	};

	public constructor(baseDir: string, cliVersion: string, projectVersion: string, config: Configuration) {
		this.setBaseDir(baseDir);
		this.setCliVersion(cliVersion);
		this.setProjectVersion(projectVersion);
		this.setConfig(config);
	}

	private setBaseDir(baseDir: string): void {
		if (!fs.existsSync(path.resolve(process.cwd(), baseDir))) {
			throw new Error(`Base directory "${baseDir}" does not exist`);
		}
		this.baseDir = baseDir;
	}

	private setCliVersion(version: string): void {
		if (semver.valid(version) === null) {
			throw new Error(`Invalid CLI version: ${version}`);
		}
		this.cliVersion = version;
	}

	public setProjectVersion(version: string): void {
		if (semver.valid(version) === null) {
			throw new Error(`Invalid project version: ${version}`);
		}
		if (this.projectVersion !== version) {
			this.projectVersion = version;
			this.openRun = true;
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
			} else {
				this.tasks.set(task.getIdentifier(), task);
				this.openRun = true;
			}
		});
	}

	public registerTask(task: AbstractTask): void {
		this.registerTasks([task]);
	}

	private runTask(task: AbstractTask): void {
		if (this.config.migrate?.tasks[task.getIdentifier()] === false) {
			task.setStatus('skipped');
		} else {
			this.config.migrate!.tasks[task.getIdentifier()] = true;
			if (
				task.getStatus() === 'pending' &&
				semver.satisfies(this.projectVersion, task.getVersionRange(), {
					includePrerelease: true,
				})
			) {
				// task.setStatus('running'); only of the task is async
				task.run(this.baseDir);
				task.setStatus('done');
			}
		}
	}

	private dependentTaskRun(task: AbstractTask, dependentTasks: AbstractTask[]) {
		dependentTasks.forEach((dependentTask) => {
			this.dependentTaskRun(dependentTask, dependentTask.getDependentTasks());
		});
		if (dependentTasks.every((dependentTask) => dependentTask.getStatus() === 'done')) {
			this.runTask(task);
		}
	}

	public run(): void {
		this.tasks.forEach((task) => {
			this.dependentTaskRun(task, task.getDependentTasks());
		});
		this.openRun = false;
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
		return version;
	}

	public hasPendingTasks(): boolean {
		return this.openRun || semver.lt(this.getPendingMinVersion(), this.cliVersion);
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
				console.log(`- ${task.getTitle()}: ${task.getStatus()}`);
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
