import { Routes } from '../../shares/types';
import { InputCheckboxBasic } from './basic';
import { InputCheckboxAlignLeft } from './align-left';
import { InputCheckboxButton } from './button';
import { InputCheckboxHideLabel } from './hide-label';
import { InputCheckboxSwitch } from './switch';

export const INPUT_CHECKBOX_ROUTES: Routes = {
	'input-checkbox': {
		basic: InputCheckboxBasic,
		'align-left': InputCheckboxAlignLeft,
		'hide-label': InputCheckboxHideLabel,
		switch: InputCheckboxSwitch,
		button: InputCheckboxButton,
	},
};
