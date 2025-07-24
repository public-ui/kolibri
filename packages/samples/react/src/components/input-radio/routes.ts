import { Routes } from '../../shares/types';
import { InputRadioBasic } from './basic';
import { InputRadioHideLabel } from './hide-label';
import { InputRadioHorizontal } from './horizontal';
import { InputRadioObjectValue } from './objectValue';

export const INPUT_RADIO_ROUTES: Routes = {
	'input-radio': {
		basic: InputRadioBasic,
		'hide-label': InputRadioHideLabel,
		horizontal: InputRadioHorizontal,
		object: InputRadioObjectValue,
	},
};
