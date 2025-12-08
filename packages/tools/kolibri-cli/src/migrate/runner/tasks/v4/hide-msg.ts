import { AbstractTask } from '../../abstract-task';
import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';

const TAGS = [
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

export const HideErrorToHideMsgTasks: AbstractTask[] = TAGS.map((tag) => RenamePropertyNameTask.getInstance(tag, '_hide-error', '_hide-msg', '^4'));
