import type { Routes } from '../../shares/types';
import { InputNumberBasic } from './basic';
import { InputNumberFeatureFlags } from './feature-flags';
import { InputNumberOnInputOnChange } from './get-value';
import { InputNumberNumberFormatter } from './number-formatter';

export const INPUT_NUMBER_ROUTES: Routes = {
	'input-number': {
		basic: InputNumberBasic,
		'feature-flags': InputNumberFeatureFlags,
		'get-value': InputNumberOnInputOnChange,
		'number-formatter': InputNumberNumberFormatter,
	},
};
