import { Routes } from '../../shares/types';
import { InputTextBasic } from './basic';
import { InputTextHideErrors } from './hide-errors';
import { InputTextFormatterDemo } from './text-formatter';
import { InputTextSmartButton } from './smart-button';
import { AccessAndShortKey } from './access-and-short-key';

export const INPUT_TEXT_ROUTES: Routes = {
	'input-text': {
		basic: InputTextBasic,
		'hide-errors': InputTextHideErrors,
		'text-formatter': InputTextFormatterDemo,
		'smart-button': InputTextSmartButton,
		'access-and-short-key': AccessAndShortKey,
	},
};
