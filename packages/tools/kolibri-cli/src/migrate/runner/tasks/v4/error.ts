import { AbstractTask } from '../../abstract-task';
import { RefactorPropertyErrorToMsg } from '../common/RefactorPropertyErrorToMsg';

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

export const RefactorErrorToMsgTasks: AbstractTask[] = INPUT_COMPONENTS.map((componentName) => RefactorPropertyErrorToMsg.getInstance(componentName, '^4'));
