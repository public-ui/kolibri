import { AbstractTask } from '../../abstract-task';
import { AbstractMapPropertyValueToBooleanTask, BooleanPropertyValueMapping } from '../common/AbstractMapPropertyValueToBooleanTask';
import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';
import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';

const RenameVariantPropTask: AbstractTask = RenamePropertyNameTask.getInstance('kol-input-password', '_variant', '_visibility-toggle', '^4');

class MapVisibilityToggleTask extends AbstractMapPropertyValueToBooleanTask {
	private static readonly mappings: BooleanPropertyValueMapping[] = [
		{ fromValue: 'default', result: 'remove' },
		{ fromValue: 'visibility-toggle', result: 'true' },
	];

	private constructor(identifier: string, versionRange: string, dependentTasks: AbstractTask[] = []) {
		super(
			identifier,
			'Map password variant values to visibility-toggle boolean semantics',
			'kol-input-password',
			'_visibility-toggle',
			'_visibility-toggle',
			MapVisibilityToggleTask.mappings,
			versionRange,
			dependentTasks,
			false,
		);
	}

	public static getInstance(versionRange: string, dependentTasks: AbstractTask[] = []): MapVisibilityToggleTask {
		const identifier = 'kol-input-password-map-variant-to-visibility-toggle';
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new MapVisibilityToggleTask(identifier, versionRange, dependentTasks));
		}
		return this.instances.get(identifier) as MapVisibilityToggleTask;
	}
}

const MapVisibilityToggle: AbstractTask = MapVisibilityToggleTask.getInstance('^4', [RenameVariantPropTask]);

const RemoveVariantPropTask: AbstractTask = RemovePropertyNameTask.getInstance('kol-input-password', '_variant', '^4', [MapVisibilityToggle]);

export const RenamePasswordVariantToVisibilityToggleTasks: AbstractTask[] = [RenameVariantPropTask, MapVisibilityToggle, RemoveVariantPropTask];
