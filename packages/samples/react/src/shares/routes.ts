import { ABBR_ROUTES } from '../samples/abbr/routes';
import { ACCORDION_ROUTES } from '../samples/accordion/routes';
import { ALERT_ROUTES } from '../samples/alert/routes';
import { BADGE_ROUTES } from '../samples/badge/routes';
import { BREADCRUMB_ROUTES } from '../samples/breadcrumb/routes';
import { BUTTON_GROUP_ROUTES } from '../samples/button-group/routes';
import { BUTTON_LINK_ROUTES } from '../samples/button-link/routes';
import { BUTTON_ROUTES } from '../samples/button/routes';
import { CARD_ROUTES } from '../samples/card/routes';
import { DETAILS_ROUTES } from '../samples/details/routes';
import { FORM_ROUTES } from '../samples/form/routes';
import { HANDOUT_ROUTES } from '../samples/handout/routes';
import { HEADING_ROUTES } from '../samples/heading/routes';
import { ICON_ROUTES } from '../samples/icon/routes';
import { INDENTED_ROUTES } from '../samples/indented-text/routes';
import { INPUT_CHECKBOX_ROUTES } from '../samples/input-checkbox/routes';
import { INPUT_COLOR_ROUTES } from '../samples/input-color/routes';
import { INPUT_DATE_ROUTES } from '../samples/input-date/routes';
import { INPUT_EMAIL_ROUTES } from '../samples/input-email/routes';
import { INPUT_FILE_ROUTES } from '../samples/input-file/routes';
import { INPUT_NUMBER_ROUTES } from '../samples/input-number/routes';
import { INPUT_PASSWORD_ROUTES } from '../samples/input-password/routes';
import { INPUT_RADIO_ROUTES } from '../samples/input-radio/routes';
import { INPUT_RANGE_ROUTES } from '../samples/input-range/routes';
import { INPUT_TEXT_ROUTES } from '../samples/input-text/routes';
import { LINK_BUTTON_ROUTES } from '../samples/link-button/routes';
import { LINK_GROUP_ROUTES } from '../samples/link-group/routes';
import { LINK_ROUTES } from '../samples/link/routes';
import { NAV_ROUTES } from '../samples/nav/routes';
import { PAGINATION_ROUTES } from '../samples/pagination/routes';
import { POPOVER_ROUTES } from '../samples/popover/routes';
import { PROGRESS_ROUTES } from '../samples/progress/routes';
import { SELECT_ROUTES } from '../samples/select/routes';
import { SKIP_NAV_ROUTES } from '../samples/skip-nav/routes';
import { SPIN_ROUTES } from '../samples/spin/routes';
import { SPLIT_BUTTON_ROUTES } from '../samples/split-button/routes';
import { TABLE_ROUTES } from '../samples/table/routes';
import { TEXTAREA_ROUTES } from '../samples/textarea/routes';
import { TOAST_ROUTES } from '../samples/toast/routes';
import { TOOLTIP_ROUTES } from '../samples/tooltip/routes';
import { VERSION_ROUTES } from '../samples/version/routes';
import { Routes } from './types';

export const ROUTES: Routes = {
	...HANDOUT_ROUTES,
	...ABBR_ROUTES,
	...ACCORDION_ROUTES,
	...ALERT_ROUTES,
	...BADGE_ROUTES,
	...BREADCRUMB_ROUTES,
	...BUTTON_ROUTES,
	...BUTTON_LINK_ROUTES,
	...BUTTON_GROUP_ROUTES,
	...CARD_ROUTES,
	...DETAILS_ROUTES,
	...FORM_ROUTES,
	...HEADING_ROUTES,
	...ICON_ROUTES,
	...INDENTED_ROUTES,
	...INPUT_CHECKBOX_ROUTES,
	...INPUT_COLOR_ROUTES,
	...INPUT_DATE_ROUTES,
	...INPUT_EMAIL_ROUTES,
	...INPUT_FILE_ROUTES,
	...INPUT_NUMBER_ROUTES,
	...INPUT_PASSWORD_ROUTES,
	...INPUT_RADIO_ROUTES,
	...INPUT_RANGE_ROUTES,
	...INPUT_TEXT_ROUTES,
	...LINK_ROUTES,
	...LINK_BUTTON_ROUTES,
	...LINK_GROUP_ROUTES,
	...NAV_ROUTES,
	...PAGINATION_ROUTES,
	...POPOVER_ROUTES,
	...PROGRESS_ROUTES,
	...SELECT_ROUTES,
	...SELECT_ROUTES,
	...SKIP_NAV_ROUTES,
	...SPIN_ROUTES,
	...SPLIT_BUTTON_ROUTES,
	...TABLE_ROUTES,
	...TEXTAREA_ROUTES,
	...TOAST_ROUTES,
	...TOOLTIP_ROUTES,
	...VERSION_ROUTES,
};
