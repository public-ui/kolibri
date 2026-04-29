import type { Routes } from '../../shares/types';
import { InputTextAccessShortKey } from './access-short-key';
import { InputTextBackground } from './background-test';
import { InputTextBasic } from './basic';
import { InputTextCounter } from './counter';
import { InputTextDisabled } from './disabled';
import { InputTextExpertSlot } from './expert-slot';
import { InputTextOnInputOnChange } from './get-value';
import { InputTextHideLabel } from './hide-label';
import { InputTextHideMsg } from './hide-msg';
import { InputTextMessageTypes } from './message-types';
import { InputTextPattern } from './pattern';
import { InputTextPlaceholder } from './placeholder';
import { InputTextReadonly } from './readonly';
import { InputTextSelectRange } from './select-range';
import { InputTextSmartButton } from './smart-button';
import { InputTextFormatterDemo } from './text-formatter';

export const INPUT_TEXT_ROUTES: Routes = {
	'input-text': {
		basic: InputTextBasic,
		'get-value': InputTextOnInputOnChange,
		'message-types': InputTextMessageTypes,
		placeholder: InputTextPlaceholder,
		disabled: InputTextDisabled,
		readonly: InputTextReadonly,
		counter: InputTextCounter,
		'access-short-key': InputTextAccessShortKey,
		'hide-label': InputTextHideLabel,
		'hide-msg': InputTextHideMsg,
		'text-formatter': InputTextFormatterDemo,
		'smart-button': InputTextSmartButton,
		'expert-slot': InputTextExpertSlot,
		pattern: InputTextPattern,
		'select-range': InputTextSelectRange,
		background: InputTextBackground,
	},
};
