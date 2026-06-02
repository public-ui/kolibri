import type { Routes } from '../../shares/types';
import { ButtonAccessKey } from './access-key';
import { ButtonAriaDescription } from './aria-description';
import { ButtonBaselined } from './baselined';
import { ButtonBasic } from './basic';
import { ButtonDisabled } from './disabled';
import { ButtonExpertSlot } from './expert-slot';
import { ButtonFocusOptions } from './focus-options';
import { ButtonHideLabel } from './hide-label';
import { ButtonIcons } from './icons';
import { ButtonRowReverseTooltip } from './row-reverse-tooltip';
import { ButtonShortKey } from './short-key';
import { ButtonSpinner } from './spinner';
import { ButtonVariants } from './variants';
import { ButtonWidth } from './width';

export const BUTTON_ROUTES: Routes = {
	button: {
		basic: ButtonBasic,
		variants: ButtonVariants,
		disabled: ButtonDisabled,
		'hide-label': ButtonHideLabel,
		icons: ButtonIcons,
		spinner: ButtonSpinner,
		width: ButtonWidth,
		'access-key': ButtonAccessKey,
		'aria-description': ButtonAriaDescription,
		baselined: ButtonBaselined,
		'short-key': ButtonShortKey,
		'expert-slot': ButtonExpertSlot,
		'row-reverse-tooltip': ButtonRowReverseTooltip,
		'focus-options': ButtonFocusOptions,
	},
};
