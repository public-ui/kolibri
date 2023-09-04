import fs from 'fs';
import path from 'path';
import semver from 'semver';
import { AbstractTask } from './abstract-task';

export class TaskRunner {
	private readonly tasks: Map<string, AbstractTask> = new Map();
	private baseDir: string = '/';
	private cliVersion: string = '0.0.0';
	private projectVersion: string = '0.0.0';

	public constructor(baseDir: string, cliVersion: string, projectVersion: string) {
		this.setBaseDir(baseDir);
		this.setCliVersion(cliVersion);
		this.setProjectVersion(projectVersion);
	}

	private setBaseDir(baseDir: string): void {
		if (!fs.existsSync(path.resolve(process.cwd(), baseDir))) {
			throw new Error(`Base directory "${baseDir}" does not exist`);
		}
		this.baseDir = baseDir;
	}

	public setCliVersion(version: string): void {
		if (semver.valid(version) === null) {
			throw new Error(`Invalid CLI version: ${version}`);
		}
		this.cliVersion = version;
	}

	public setProjectVersion(version: string): void {
		if (semver.valid(version) === null) {
			throw new Error(`Invalid project version: ${version}`);
		}
		this.projectVersion = version;
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
				semver.satisfies(this.projectVersion, task.getVersionRange(), {
					includePrerelease: true,
				})
			) {
				task.run(this.baseDir);
			} else {
				console.log(
					`Task "${task.getTitle()}" was skipped. The current version (${
						this.projectVersion
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

	public printSummary(outline = false): {
		done: number;
		pending: number;
		total: number;
		nextVersion: string | null;
	} {
		let done = 0;
		let pending = 0;
		let minVersion: string = this.cliVersion;
		this.tasks.forEach((task) => {
			switch (task.getStatus()) {
				case 'done':
					done++;
					break;
				case 'pending':
					pending++;
					// eslint-disable-next-line no-case-declarations
					const taskMinVersion = semver.minVersion(task.getVersionRange())?.raw ?? this.cliVersion;
					if (semver.gt(minVersion, taskMinVersion)) {
						minVersion = taskMinVersion;
					}
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
			nextVersion: minVersion,
		};
	}
}
