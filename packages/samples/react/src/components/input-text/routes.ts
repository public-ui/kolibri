import { Routes } from '../../shares/types';
import { InputTextBasic } from './basic';
import { InputTextExpertSlot } from './expert-slot';
import { InputTextHideMsg } from './hide-msg';
import { InputTextPattern } from './pattern';
import { InputTextSelectRange } from './select-range';
import { InputTextSmartButton } from './smart-button';
import { InputTextFormatterDemo } from './text-formatter';

export const INPUT_TEXT_ROUTES: Routes = {
	'input-text': {
		basic: InputTextBasic,
		'expert-slot': InputTextExpertSlot,
		'hide-msg': InputTextHideMsg,
		pattern: InputTextPattern,
		'select-range': InputTextSelectRange,
		'smart-button': InputTextSmartButton,
		'text-formatter': InputTextFormatterDemo,
	},
};
