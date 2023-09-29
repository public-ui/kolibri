import { AbstractTask, TaskOptions } from '../../abstract-task';
import { ExecTask } from './ExecTask';

export class RemoveTask extends ExecTask {
	protected constructor(identifier: string, title: string, path: string, versionRange: string, dependentTasks?: AbstractTask[], options?: TaskOptions) {
		super(identifier, title, `npx rimraf "${path}"`, versionRange, dependentTasks, options);
	}

	public static getInstance(path: string, versionRange: string, dependentTasks: AbstractTask[] = [], options: TaskOptions = {}): RemoveTask {
		const identifier = `remove-${path}`;
		const title = `Remove ${path}.`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new RemoveTask(identifier, title, path, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as RemoveTask;
	}
}
