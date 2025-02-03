import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';
import { RefactorPropertyErrorToMsg } from '../common/RefactorPropertyErrorToMsg';
import { AbstractTask } from '../../abstract-task';

const INPUT_COMPONENTS = [
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
	'kol-select',
	'kol-single-select',
	'kol-textarea',
];

export const AllInputTasks: AbstractTask[] = INPUT_COMPONENTS.flatMap((componentName) => [
	RemovePropertyNameTask.getInstance(componentName, '_alert', '>=2 <4'),
	RefactorPropertyErrorToMsg.getInstance(componentName, '>=2 <4'),
]);
