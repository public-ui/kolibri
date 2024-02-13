import { Routes } from '../../shares/types';
import { TextareaAdjustHeight } from './adjust-height';
import { TextareaBasic } from './basic';
import { TextareaCounter } from './counter';
import { TextareaDisabled } from './disabled';
import { TextareaPlaceholder } from './placeholder';
import { TextareaReadOnly } from './readonly';
import { TextareaResize } from './resize';
import { TextareaRows } from './rows';

export const TEXTAREA_ROUTES: Routes = {
	textarea: {
		basic: TextareaBasic,
		'adjust-height': TextareaAdjustHeight,
		disabled: TextareaDisabled,
		placeholder: TextareaPlaceholder,
		readonly: TextareaReadOnly,
		resize: TextareaResize,
		rows: TextareaRows,
		'with-counter': TextareaCounter,
	},
};
