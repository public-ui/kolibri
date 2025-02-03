import { AbstractTask, TaskOptions } from '../../abstract-task';
import { GenericUpdatePropertyValueTask } from './GenericUpdatePropertyValueTask';

export class UpdatePropertyValueTask extends GenericUpdatePropertyValueTask {
	public static getInstance(
		tag: string,
		property: string,
		oldValue: string,
		newValue: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): UpdatePropertyValueTask {
		const identifier = `${tag}-update-property-${property}-value-${oldValue}-to-${newValue}`;
		if (!this.instances.has(identifier)) {
			this.instances?.set(
				identifier,
				new UpdatePropertyValueTask(
					identifier,
					`Upade property "${property}" value from "${oldValue}" to "${newValue}" of "${tag}" component`,
					tag,
					property,
					oldValue,
					newValue,
					versionRange,
					dependentTasks,
					options,
				),
			);
		}
		return this.instances.get(identifier) as UpdatePropertyValueTask;
	}
}
