import { AbstractTask, TaskOptions } from '../../abstract-task';
import { GenericRenameTagNameTask } from './GenericRenameTagNameTask';

export class RenameTagNameTask extends GenericRenameTagNameTask {
	public static getInstance(
		oldTagName: string,
		newTagName: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): RenameTagNameTask {
		const identifier = `rename-tag-name-${oldTagName}-to-${newTagName}`;
		if (!this.instances.has(identifier)) {
			this.instances?.set(
				identifier,
				new RenameTagNameTask(
					identifier,
					`Rename tag name "${oldTagName}" to "${newTagName}" component`,
					oldTagName,
					newTagName,
					versionRange,
					dependentTasks,
					options,
				),
			);
		}
		return this.instances.get(identifier) as RenameTagNameTask;
	}
}
