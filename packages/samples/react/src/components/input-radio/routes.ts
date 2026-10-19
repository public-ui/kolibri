import type { Routes } from '../../shares/types';
import { InputRadioBasic } from './basic';
import { InputRadioOnInputOnChange } from './get-value';
import { InputRadioHorizontal } from './horizontal';
import { InputRadioObjectValue } from './objectValue';
import { InputRadioOptionValues } from './option-values';

export const INPUT_RADIO_ROUTES: Routes = {
	'input-radio': {
		basic: InputRadioBasic,
		'get-value': InputRadioOnInputOnChange,
		horizontal: InputRadioHorizontal,
		object: InputRadioObjectValue,
		'option-values': InputRadioOptionValues,
	},
};
