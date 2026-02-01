import type { Routes } from '../../shares/types';
import { ButtonAccessKey } from './access-key';
import { ButtonAriaDescription } from './aria-description';
import { ButtonBaselined } from './baselined';
import { ButtonBasic } from './basic';
import { ButtonExpertSlot } from './expert-slot';
import { ButtonIcons } from './icons';
import { ButtonRowReverseTooltip } from './row-reverse-tooltip';
import { ButtonShortKey } from './short-key';
import { ButtonWidth } from './width';

export const BUTTON_ROUTES: Routes = {
	button: {
		basic: ButtonBasic,
		icons: ButtonIcons,
		width: ButtonWidth,
		'access-key': ButtonAccessKey,
		'aria-description': ButtonAriaDescription,
		baselined: ButtonBaselined,
		'short-key': ButtonShortKey,
		'expert-slot': ButtonExpertSlot,
		'row-reverse-tooltip': ButtonRowReverseTooltip,
	},
};
