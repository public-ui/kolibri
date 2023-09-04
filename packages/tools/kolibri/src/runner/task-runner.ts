import fs from 'fs';
import path from 'path';
import semver from 'semver';
import { AbstractTask } from './abstract-task';

export class TaskRunner {
	private readonly tasks: Map<string, AbstractTask> = new Map();
	private baseDir: string = '/';
	private version: string = '0.0.0';

	public constructor(baseDir: string, version: string) {
		this.setBaseDir(baseDir);
		this.setVersion(version);
	}

	private setBaseDir(baseDir: string): void {
		if (!fs.existsSync(path.resolve(process.cwd(), baseDir))) {
			throw new Error(`Base directory "${baseDir}" does not exist`);
		}
		this.baseDir = baseDir;
	}

	public setVersion(version: string): void {
		if (semver.valid(version) === null) {
			throw new Error(`Invalid semver version: ${version}`);
		}
		this.version = version;
	}

	public registerTasks(tasks: AbstractTask[]): void {
		tasks.forEach((task) => {
			if (
				semver.gtr(this.version, task.getVersionRange(), {
					includePrerelease: true,
				})
			) {
				console.log(
					`Task "${task.getTitle()}" will be excluded. The current version (${
						this.version
					}) is greater than the task version range (${task.getVersionRange()}).`,
				);
			} else {
				this.tasks.set(task.getIdentifier(), task);
			}
		});
	}

	public registerTask(task: AbstractTask): void {
		this.registerTasks([task]);
	}

	private runTask(task: AbstractTask): void {
		if (task.getStatus() === 'pending') {
			if (
				semver.satisfies(this.version, task.getVersionRange(), {
					includePrerelease: true,
				})
			) {
				task.run(this.baseDir);
			} else {
				console.log(
					`Task "${task.getTitle()}" was skipped. The current version (${
						this.version
					}) does not satisfies with the task version range (${task.getVersionRange()}).`,
				);
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
		console.log(`
Running ${this.tasks.size} tasks...`);
		this.tasks.forEach((task) => {
			this.dependentTaskRun(task, task.getDependentTasks());
		});
	}

	public printSummary(): {
		done: number;
		pending: number;
		total: number;
		nextVersion: string | null;
	} {
		console.log(`
Summary:`);
		let done = 0;
		let pending = 0;
		let minVersion: string | null = null;
		this.tasks.forEach((task) => {
			switch (task.getStatus()) {
				case 'done':
					done++;
					break;
				case 'pending':
					pending++;
					if (minVersion === null) {
						minVersion = semver.minVersion(task.getVersionRange())?.raw as string;
					}
					// eslint-disable-next-line no-case-declarations
					const taskMinVersion: string = semver.minVersion(task.getVersionRange())?.raw as string;
					if (semver.gt(minVersion, taskMinVersion)) {
						minVersion = taskMinVersion;
					}
					break;
			}
			console.log(`- ${task.getTitle()}: ${task.getStatus()}`);
		});
		return {
			done: done,
			pending: pending,
			total: this.tasks.size,
			nextVersion: minVersion,
		};
	}
}
