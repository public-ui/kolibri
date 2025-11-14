import { Routes } from '../../../shares/types';
import { ButtonStoryAccessKey } from './access-key';
import { ButtonStoryAriaDescription } from './aria-description';
import { ButtonStoryBase } from './base';
import { ButtonStoryBaselined } from './baselined';
import { ButtonStoryDisabled } from './disabled';
import { ButtonStoryExpertSlot } from './expert-slot';
import { ButtonStoryHideLabel } from './hide-label';
import { ButtonStoryIcons } from './icons';
import { ButtonStoryRowReverseTooltip } from './row-reverse-tooltip';
import { ButtonStoryShortKey } from './short-key';
import { ButtonStoryVariants } from './variants';
import { ButtonStoryWidth } from './width';

export const BUTTON_STORY_ROUTES: Routes = {
	base: ButtonStoryBase,
	variants: ButtonStoryVariants,
	disabled: ButtonStoryDisabled,
	'hide-label': ButtonStoryHideLabel,
	icons: ButtonStoryIcons,
	width: ButtonStoryWidth,
	'access-key': ButtonStoryAccessKey,
	'aria-description': ButtonStoryAriaDescription,
	baselined: ButtonStoryBaselined,
	'short-key': ButtonStoryShortKey,
	'expert-slot': ButtonStoryExpertSlot,
	'row-reverse-tooltip': ButtonStoryRowReverseTooltip,
};
