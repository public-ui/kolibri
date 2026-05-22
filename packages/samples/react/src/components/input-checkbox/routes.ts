import type { Routes } from '../../shares/types';
import { InputCheckboxBasic } from './basic';
import { InputCheckboxButton } from './button';
import { InputCheckboxFocusEvents } from './focus-events';
import { InputCheckboxOnInputOnChange } from './get-value';
import { InputCheckboxSwitch } from './switch';

export const INPUT_CHECKBOX_ROUTES: Routes = {
	'input-checkbox': {
		basic: InputCheckboxBasic,
		'get-value': InputCheckboxOnInputOnChange,
		'focus-events': InputCheckboxFocusEvents,
		switch: InputCheckboxSwitch,
		button: InputCheckboxButton,
	},
};
