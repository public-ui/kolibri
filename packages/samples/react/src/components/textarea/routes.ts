import { Routes } from '../../shares/types';

import { TextareaBasic } from './basic';

import { TextareaAdjustHeight } from './adjust-height';

import { TextareaResize } from './resize';

import { TextareaRows } from './rows';
import { TextareaCounter } from './counter';

export const TEXTAREA_ROUTES: Routes = {
	textarea: {
		basic: TextareaBasic,
		'adjust-height': TextareaAdjustHeight,
		resize: TextareaResize,
		rows: TextareaRows,
		'with-counter': TextareaCounter,
	},
};
