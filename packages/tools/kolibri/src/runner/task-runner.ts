import fs from 'fs';
import path from 'path';
import semver from 'semver';
import { AbstractTask } from './abstract-task';

export class TaskRunner {
	private readonly tasks: Map<string, AbstractTask> = new Map();

	public constructor(
		private readonly baseDir: string,
		private version: string,
	) {
		if (!fs.existsSync(path.resolve(process.cwd(), baseDir))) {
			throw new Error(`Base directory "${baseDir}" does not exist`);
		}
		if (semver.valid(version) === null) {
			throw new Error(`Invalid semver version: ${version}`);
		}
	}

	public registerTasks(tasks: AbstractTask[]): void {
		tasks.forEach((task) => {
			if (semver.gtr(this.version, task.getVersionRange())) {
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
			if (semver.satisfies(this.version, task.getVersionRange())) {
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

	public printSummary(): [number, number, number] {
		console.log(`
Summary:`);
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
			console.log(`- ${task.getTitle()}: ${task.getStatus()}`);
		});
		return [done, pending, this.tasks.size];
	}
}
