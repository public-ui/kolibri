import { Routes } from '../../shares/types';

import { TextareaBasic } from './basic';

import { TextareaAdjustHeight } from './adjust-height';

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
	},
};
