import { AbstractTask, TaskOptions } from '../../abstract-task';
import { GenericRenameSlotNameTask } from './GenericRenameSlotNameTask';

export class RenameSlotNameTask extends GenericRenameSlotNameTask {
	protected constructor(
		identifier: string,
		tag: string,
		oldSlotName: string,
		newSlotName: string,
		versionRange: string,
		dependentTasks?: AbstractTask[],
		options?: TaskOptions,
	) {
		super(
			identifier,
			`Rename slot "${oldSlotName}" to "${newSlotName}" of "${tag}" component`,
			tag,
			oldSlotName,
			newSlotName,
			'slot',
			versionRange,
			dependentTasks,
			options,
		);
	}

	public static getInstance(
		tag: string,
		oldSlotName: string,
		newSlotName: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): RenameSlotNameTask {
		const identifier = `${tag}-rename-slot-${oldSlotName}-to-${newSlotName}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new RenameSlotNameTask(identifier, tag, oldSlotName, newSlotName, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as RenameSlotNameTask;
	}
}
