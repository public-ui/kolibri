import { ABBR_ROUTES } from '../components/abbr/routes';
import { ACCORDION_ROUTES } from '../components/accordion/routes';
import { ALERT_ROUTES } from '../components/alert/routes';
import { AVATAR_ROUTES } from '../components/avatar/routes';
import { BADGE_ROUTES } from '../components/badge/routes';
import { BREADCRUMB_ROUTES } from '../components/breadcrumb/routes';
import { BUTTON_GROUP_ROUTES } from '../components/button-group/routes';
import { BUTTON_LINK_ROUTES } from '../components/button-link/routes';
import { BUTTON_ROUTES } from '../components/button/routes';
import { CARD_ROUTES } from '../components/card/routes';
import { DETAILS_ROUTES } from '../components/details/routes';
import { DRAWER_ROUTES } from '../components/drawer/routes';
import { FORM_ROUTES } from '../components/form/routes';
import { HANDOUT_ROUTES } from '../components/handout/routes';
import { HEADING_ROUTES } from '../components/heading/routes';
import { ICON_ROUTES } from '../components/icon/routes';
import { IMAGE_ROUTES } from '../components/image/routes';
import { INDENTED_ROUTES } from '../components/indented-text/routes';
import { INPUT_CHECKBOX_ROUTES } from '../components/input-checkbox/routes';
import { INPUT_COLOR_ROUTES } from '../components/input-color/routes';
import { INPUT_DATE_ROUTES } from '../components/input-date/routes';
import { INPUT_EMAIL_ROUTES } from '../components/input-email/routes';
import { INPUT_FILE_ROUTES } from '../components/input-file/routes';
import { INPUT_NUMBER_ROUTES } from '../components/input-number/routes';
import { INPUT_PASSWORD_ROUTES } from '../components/input-password/routes';
import { INPUT_RADIO_ROUTES } from '../components/input-radio/routes';
import { INPUT_RANGE_ROUTES } from '../components/input-range/routes';
import { INPUT_TEXT_ROUTES } from '../components/input-text/routes';
import { KOLIBRI_ROUTES } from '../components/kolibri/routes';
import { LINK_BUTTON_ROUTES } from '../components/link-button/routes';
import { LINK_GROUP_ROUTES } from '../components/link-group/routes';
import { LINK_ROUTES } from '../components/link/routes';
import { MODAL_ROUTES } from '../components/modal/routes';
import { NAV_ROUTES } from '../components/nav/routes';
import { PAGINATION_ROUTES } from '../components/pagination/routes';
import { PROGRESS_ROUTES } from '../components/progress/routes';
import { QUOTE_ROUTES } from '../components/quote/routes';
import { SELECT_ROUTES } from '../components/select/routes';
import { SKIP_NAV_ROUTES } from '../components/skip-nav/routes';
import { SPIN_ROUTES } from '../components/spin/routes';
import { SPLIT_BUTTON_ROUTES } from '../components/split-button/routes';
import { TABLE_ROUTES } from '../components/table/routes';
import { TABS_ROUTES } from '../components/tabs/routes';
import { TEXTAREA_ROUTES } from '../components/textarea/routes';
import { TOAST_ROUTES } from '../components/toast/routes';
import { TOOLBAR_ROUTES } from '../components/toolbar/routes';
import { VERSION_ROUTES } from '../components/version/routes';
import { SCENARIO_ROUTES } from '../scenarios/routes';
import { Routes } from './types';
import { TREE_ROUTES } from '../components/tree/routes';
import { COMBOBOX_ROUTES } from '../components/combobox/routes';
import { SINGLE_SELECT_ROUTES } from '../components/single-select/routes';

export const ROUTES: Routes = {
	...HANDOUT_ROUTES,
	...ABBR_ROUTES,
	...ACCORDION_ROUTES,
	...ALERT_ROUTES,
	...AVATAR_ROUTES,
	...BADGE_ROUTES,
	...BREADCRUMB_ROUTES,
	...BUTTON_GROUP_ROUTES,
	...BUTTON_LINK_ROUTES,
	...BUTTON_ROUTES,
	...CARD_ROUTES,
	...COMBOBOX_ROUTES,
	...DETAILS_ROUTES,
	...DRAWER_ROUTES,
	...FORM_ROUTES,
	...HEADING_ROUTES,
	...ICON_ROUTES,
	...IMAGE_ROUTES,
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
	...KOLIBRI_ROUTES,
	...LINK_BUTTON_ROUTES,
	...LINK_GROUP_ROUTES,
	...LINK_ROUTES,
	...MODAL_ROUTES,
	...NAV_ROUTES,
	...PAGINATION_ROUTES,
	...PROGRESS_ROUTES,
	...QUOTE_ROUTES,
	...SELECT_ROUTES,
	...SELECT_ROUTES,
	...SKIP_NAV_ROUTES,
	...SPIN_ROUTES,
	...SINGLE_SELECT_ROUTES,
	...SPLIT_BUTTON_ROUTES,
	...TABLE_ROUTES,
	...TABS_ROUTES,
	...TEXTAREA_ROUTES,
	...TOAST_ROUTES,
	...TOOLBAR_ROUTES,
	...TREE_ROUTES,
	...VERSION_ROUTES,
	...SCENARIO_ROUTES,
};
