import { Routes } from '../../shares/types';
import { InputRadioBasic } from './basic';
import { InputRadioHorizontal } from './horizontal';
import { InputRadioSelect } from './select';
import { InputRadioObjectValue } from './objectValue';

export const INPUT_RADIO_ROUTES: Routes = {
	'input-radio': {
		basic: InputRadioBasic,
		horizontal: InputRadioHorizontal,
		select: InputRadioSelect,
		object: InputRadioObjectValue,
	},
};
