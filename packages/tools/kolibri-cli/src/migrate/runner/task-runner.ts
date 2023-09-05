import fs from 'fs';
import path from 'path';
import semver from 'semver';
import { AbstractTask } from './abstract-task';

export class TaskRunner {
	private readonly tasks: Map<string, AbstractTask> = new Map();
	private baseDir: string = '/';
	private cliVersion: string = '0.0.0';
	private projectVersion: string = '0.0.0';
	private openRun = true;

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
				this.openRun = true;
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
		};
	}
}
