import type { Routes } from '../../shares/types';
import { TextareaAdjustHeight } from './adjust-height';
import { TextareaBasic } from './basic';
import { TextareaOnInputOnChange } from './on-input-on-change';
import { TextareaResize } from './resize';
import { TextareaRows } from './rows';
import { TextareaWithCounter } from './with-counter';

export const TEXTAREA_ROUTES: Routes = {
	textarea: {
		'on-input-on-change': TextareaOnInputOnChange,
		basic: TextareaBasic,
		'adjust-height': TextareaAdjustHeight,
		resize: TextareaResize,
		rows: TextareaRows,
		'with-counter': TextareaWithCounter,
	},
};
