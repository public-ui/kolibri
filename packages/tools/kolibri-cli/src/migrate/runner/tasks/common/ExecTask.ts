import { execSync } from 'child_process';
import { AbstractTask, TaskOptions } from '../../abstract-task';

export class ExecTask extends AbstractTask {
	protected constructor(
		identifier: string,
		title: string,
		private readonly command: string,
		versionRange: string,
		dependentTasks?: AbstractTask[],
		options?: TaskOptions,
	) {
		super(identifier, title, [], versionRange, dependentTasks, options);
	}

	public static getInstance(command: string, versionRange: string, dependentTasks: AbstractTask[] = [], options: TaskOptions = {}): ExecTask {
		const identifier = `exec-${command}`;
		const title = `Exec ${command}.`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new ExecTask(identifier, title, command, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as ExecTask;
	}

	public run(): void {
		try {
			execSync(this.command, {
				encoding: 'utf8',
			});
		} catch (error) {
			console.warn(error);
		}
	}
}
