import { Routes } from '../../shares/types';
import { InputCheckboxBasic } from './basic';
import { InputCheckboxButton } from './button';
import { InputCheckboxSwitch } from './switch';
import { InputCheckboxBasicLabelAlign } from './basic-label-align';
import { InputCheckboxSwitchLabelAlign } from './switch-label-align';
import { InputCheckboxButtonLabelAlign } from './button-label-align';

export const INPUT_CHECKBOX_ROUTES: Routes = {
	'input-checkbox': {
		basic: InputCheckboxBasic,
		'basic-label-align': InputCheckboxBasicLabelAlign,
		switch: InputCheckboxSwitch,
		'switch-label-align': InputCheckboxSwitchLabelAlign,
		button: InputCheckboxButton,
		'button-label-align': InputCheckboxButtonLabelAlign,
	},
};
