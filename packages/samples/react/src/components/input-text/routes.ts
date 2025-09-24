import { Routes } from '../../shares/types';
import { InputTextBasic } from './basic';
import { InputTextHideMsg } from './hide-msg';
import { InputTextFormatterDemo } from './text-formatter';
import { InputTextSmartButton } from './smart-button';
import { InputTextExpertSlot } from './expert-slot';

export const INPUT_TEXT_ROUTES: Routes = {
	'input-text': {
		basic: InputTextBasic,
		'hide-msg': InputTextHideMsg,
		'text-formatter': InputTextFormatterDemo,
		'smart-button': InputTextSmartButton,
		'expert-slot': InputTextExpertSlot,
	},
};
