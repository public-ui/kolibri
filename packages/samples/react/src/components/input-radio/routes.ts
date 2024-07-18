import { Routes } from '../../shares/types';
import { InputRadioBasic } from './basic';
import { InputRadioHorizontal } from './horizontal';
import { InputRadioObjectValue } from './objectValue';

export const INPUT_RADIO_ROUTES: Routes = {
	'input-radio': {
		basic: InputRadioBasic,
		horizontal: InputRadioHorizontal,
		object: InputRadioObjectValue,
	},
};
