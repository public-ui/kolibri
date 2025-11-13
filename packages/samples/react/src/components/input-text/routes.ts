import { Routes } from '../../shares/types';
import { InputTextBasic } from './basic';
import { InputTextExpertSlot } from './expert-slot';
import { InputTextHideMsg } from './hide-msg';
import { InputTextSelectRange } from './select-range';
import { InputTextSmartButton } from './smart-button';
import { InputTextFormatterDemo } from './text-formatter';

export const INPUT_TEXT_ROUTES: Routes = {
	'input-text': {
		basic: InputTextBasic,
		'hide-msg': InputTextHideMsg,
		'text-formatter': InputTextFormatterDemo,
		'smart-button': InputTextSmartButton,
		'expert-slot': InputTextExpertSlot,
		'select-range': InputTextSelectRange,
	},
};
