import { Routes } from '../../shares/types';
import { TextareaAdjustHeight } from './adjust-height';
import { TextareaBasic } from './basic';
import { TextareaCounter } from './counter';
import { TextareaResize } from './resize';
import { TextareaRows } from './rows';

export const TEXTAREA_ROUTES: Routes = {
	textarea: {
		basic: TextareaBasic,
		'adjust-height': TextareaAdjustHeight,
		resize: TextareaResize,
		rows: TextareaRows,
		'with-counter': TextareaCounter,
	},
};
