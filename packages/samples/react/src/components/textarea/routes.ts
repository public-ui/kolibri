import { Routes } from '../../shares/types';
import { TextareaAdjustHeight } from './adjust-height';
import { TextareaBasic } from './basic';
import { TextareaHideLabel } from './hide-label';
import { TextareaWithCounter } from './with-counter';
import { TextareaResize } from './resize';
import { TextareaRows } from './rows';

export const TEXTAREA_ROUTES: Routes = {
	textarea: {
		basic: TextareaBasic,
		'hide-label': TextareaHideLabel,
		'adjust-height': TextareaAdjustHeight,
		resize: TextareaResize,
		rows: TextareaRows,
		'with-counter': TextareaWithCounter,
	},
};
