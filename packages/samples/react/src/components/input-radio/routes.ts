import type { Routes } from '../../shares/types';
import { InputRadioBasic } from './basic';
import { InputRadioHorizontal } from './horizontal';
import { InputRadioObjectValue } from './objectValue';
import { InputRadioOnInputOnChange } from './on-input-on-change';

export const INPUT_RADIO_ROUTES: Routes = {
	'input-radio': {
		'on-input-on-change': InputRadioOnInputOnChange,
		basic: InputRadioBasic,
		horizontal: InputRadioHorizontal,
		object: InputRadioObjectValue,
	},
};
