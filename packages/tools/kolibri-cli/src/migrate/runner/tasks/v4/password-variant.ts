import { AbstractTask } from '../../abstract-task';
import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';
import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';
import { UpdatePropertyValueTask } from '../common/UpdatePropertyValueTask';

const RenameVariantPropTask: AbstractTask = RenamePropertyNameTask.getInstance('kol-input-password', '_variant', '_visibilityToggle', '^4');

const UpdateVisibilityToggleValueTrue: AbstractTask = UpdatePropertyValueTask.getInstance(
	'kol-input-password',
	'_visibilityToggle',
	'visibility-toggle',
	'true',
	'^4',
	[RenameVariantPropTask],
);

const UpdateVisibilityToggleValueFalse: AbstractTask = UpdatePropertyValueTask.getInstance(
	'kol-input-password',
	'_visibilityToggle',
	'default',
	'false',
	'^4',
	[RenameVariantPropTask],
);

const RemoveIdPropTasks: AbstractTask = RemovePropertyNameTask.getInstance('kol-input-password', '_variant', '^4', [
	UpdateVisibilityToggleValueTrue,
	UpdateVisibilityToggleValueFalse,
]);

export const RenamePasswordVariantToVisibilityToggle: AbstractTask[] = [
	RenameVariantPropTask,
	UpdateVisibilityToggleValueTrue,
	UpdateVisibilityToggleValueFalse,
	RemoveIdPropTasks,
];
