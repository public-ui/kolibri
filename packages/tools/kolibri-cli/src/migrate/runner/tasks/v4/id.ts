import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';
import { AbstractTask } from '../../abstract-task';

const ID_COMPONENTS = [
	'kol-button',
	'kol-button-link',
	'kol-combobox',
	'kol-input-checkbox',
	'kol-input-color',
	'kol-input-date',
	'kol-input-email',
	'kol-input-file',
	'kol-input-number',
	'kol-input-password',
	'kol-input-radio',
	'kol-input-range',
	'kol-input-text',
	'kol-popover-button',
	'kol-select',
	'kol-single-select',
	'kol-split-button',
	'kol-textarea',
	'kol-tooltip',
];

export const RemoveIdPropTasks: AbstractTask[] = ID_COMPONENTS.map((componentName) => RemovePropertyNameTask.getInstance(componentName, '_id', '^4'));
