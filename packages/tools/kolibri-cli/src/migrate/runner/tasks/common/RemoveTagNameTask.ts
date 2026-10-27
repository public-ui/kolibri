import { AbstractTask, TaskOptions } from '../../abstract-task';
import { GenericRemoveTagNameTask } from './GenericRemoveTagNameTask';

export class RemoveTagNameTask extends GenericRemoveTagNameTask {
	public static getInstance(oldTagName: string, versionRange: string, dependentTasks: AbstractTask[] = [], options: TaskOptions = {}): RemoveTagNameTask {
		const identifier = `remove-tag-name-${oldTagName}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(
				identifier,
				new RemoveTagNameTask(identifier, `Remove tag name "${oldTagName}" component`, oldTagName, versionRange, dependentTasks, options),
			);
		}
		return this.instances.get(identifier) as RemoveTagNameTask;
	}
}
