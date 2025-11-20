import { Routes } from '../../shares/types';
import { InputTextBasic } from './basic';
import { InputTextMessageTypes } from './message-types';
import { InputTextPlaceholder } from './placeholder';
import { InputTextDisabled } from './disabled';
import { InputTextReadonly } from './readonly';
import { InputTextAccessShortKey } from './access-short-key';
import { InputTextHideMsg } from './hide-msg';
import { InputTextFormatterDemo } from './text-formatter';
import { InputTextSmartButton } from './smart-button';
import { InputTextExpertSlot } from './expert-slot';
import { InputTextSelectRange } from './select-range';

export const INPUT_TEXT_ROUTES: Routes = {
	'input-text': {
		basic: InputTextBasic,
		'message-types': InputTextMessageTypes,
		placeholder: InputTextPlaceholder,
		disabled: InputTextDisabled,
		readonly: InputTextReadonly,
		'access-short-key': InputTextAccessShortKey,
		'hide-msg': InputTextHideMsg,
		'text-formatter': InputTextFormatterDemo,
		'smart-button': InputTextSmartButton,
		'expert-slot': InputTextExpertSlot,
		'select-range': InputTextSelectRange,
	},
};
