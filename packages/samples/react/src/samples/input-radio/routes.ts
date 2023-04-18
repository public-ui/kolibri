import { Routes } from '../../shares/types';

import { InputRadioBasic } from './basic';

import { InputRadioSelect } from './select';

export const INPUT_RADIO_ROUTES: Routes = {
	'input-radio': {
		basic: InputRadioBasic,
		select: InputRadioSelect,
	},
};
