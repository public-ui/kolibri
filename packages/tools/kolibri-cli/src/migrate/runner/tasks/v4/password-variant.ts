import { AbstractTask } from '../../abstract-task';
import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';
import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';
import { UpdatePropertyValueTask } from '../common/UpdatePropertyValueTask';

const RenameVariantPropTask: AbstractTask = RenamePropertyNameTask.getInstance('kol-input-password', '_variant', '_visibility-toggle', '^4');

const UpdateVisibilityToggleValueTrue: AbstractTask = UpdatePropertyValueTask.getInstance(
	'kol-input-password',
	'_visibility-toggle',
	'visibility-toggle',
	'true',
	'^4',
	[RenameVariantPropTask],
);

const UpdateVisibilityToggleValueFalse: AbstractTask = UpdatePropertyValueTask.getInstance(
	'kol-input-password',
	'_visibility-toggle',
	'default',
	'false',
	'^4',
	[RenameVariantPropTask],
);

export const RemoveVariantPropTask: AbstractTask = RemovePropertyNameTask.getInstance('kol-input-password', '_variant', '^4', [
	UpdateVisibilityToggleValueTrue,
	UpdateVisibilityToggleValueFalse,
]);

export const RenamePasswordVariantToVisibilityToggleTasks: AbstractTask[] = [
	RenameVariantPropTask,
	UpdateVisibilityToggleValueTrue,
	UpdateVisibilityToggleValueFalse,
	RemoveVariantPropTask,
];
