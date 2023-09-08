import { AbstractTask, TaskOptions } from '../../abstract-task';
import { GenericRenamePropertyTask } from './GenericRenamePropertyTask';

export class RenamePropertyNameTask extends GenericRenamePropertyTask {
	public static getInstance(
		tag: string,
		oldProperty: string,
		newProperty: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): RenamePropertyNameTask {
		const identifier = `${tag}-rename-property-${oldProperty}-to-${newProperty}`;
		if (!this.instances.has(identifier)) {
			this.instances?.set(
				identifier,
				new RenamePropertyNameTask(
					identifier,
					`Rename property "${oldProperty}" to "${newProperty}" of "${tag}" component`,
					tag,
					oldProperty,
					newProperty,
					versionRange,
					dependentTasks,
					options,
				),
			);
		}
		return this.instances.get(identifier) as RenamePropertyNameTask;
	}
}
