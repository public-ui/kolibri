import type { Routes } from '../../shares/types';
import { InputCheckboxBasic } from './basic';
import { InputCheckboxButton } from './button';
import { InputCheckboxOnInputOnChange } from './on-input-on-change';
import { InputCheckboxSwitch } from './switch';

export const INPUT_CHECKBOX_ROUTES: Routes = {
	'input-checkbox': {
		'on-input-on-change': InputCheckboxOnInputOnChange,
		basic: InputCheckboxBasic,
		switch: InputCheckboxSwitch,
		button: InputCheckboxButton,
	},
};
