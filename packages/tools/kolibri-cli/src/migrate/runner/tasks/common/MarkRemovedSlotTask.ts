import { AbstractTask, TaskOptions } from '../../abstract-task';
import { GenericRenameSlotNameTask } from './GenericRenameSlotNameTask';

export class MarkRemovedSlotTask extends GenericRenameSlotNameTask {
	protected constructor(identifier: string, tag: string, slotName: string, versionRange: string, dependentTasks?: AbstractTask[], options?: TaskOptions) {
		super(
			identifier,
			`Mark removed slot "${slotName}" of "${tag}" component`,
			tag,
			slotName,
			`${slotName}`,
			'data-removed-slot',
			versionRange,
			dependentTasks,
			options,
		);
	}

	public static getInstance(
		tag: string,
		slotName: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): MarkRemovedSlotTask {
		const identifier = `${tag}-mark-removed-slot-${slotName}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new MarkRemovedSlotTask(identifier, tag, slotName, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as MarkRemovedSlotTask;
	}
}
