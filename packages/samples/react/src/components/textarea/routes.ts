import type { Routes } from '../../shares/types';
import { TextareaAdjustHeight } from './adjust-height';
import { TextareaBasic } from './basic';
import { TextareaOnInputOnChange } from './get-value';
import { TextareaResize } from './resize';
import { TextareaRows } from './rows';
import { TextareaWithCounter } from './with-counter';

export const TEXTAREA_ROUTES: Routes = {
	textarea: {
		basic: TextareaBasic,
		'get-value': TextareaOnInputOnChange,
		'adjust-height': TextareaAdjustHeight,
		resize: TextareaResize,
		rows: TextareaRows,
		'with-counter': TextareaWithCounter,
	},
};
