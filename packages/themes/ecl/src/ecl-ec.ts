import { KoliBri } from '@public-ui/components';
import globalCss from './global-ec.scss';
import accordionCss from './components/ecl-ec/accordion.scss';
import alertCss from './components/ecl-ec/alert.scss';
import avatarCss from './components/ecl-ec/avatar.scss';
import badgeCss from './components/ecl-ec/badge.scss';
import breadcrumbCss from './components/ecl-ec/breadcrumb.scss';
import buttonCss from './components/ecl-ec/button.scss';
import buttonGroupCss from './components/ecl-ec/button-group.scss';
import buttonLinkCss from './components/ecl-ec/button-link.scss';
import cardCss from './components/ecl-ec/card.scss';
import ComboboxCss from './components/ecl-ec/combobox.scss';
import detailsCss from './components/ecl-ec/details.scss';
import drawerCss from './components/ecl-ec/drawer.scss';
import headingCss from './components/ecl-ec/heading.scss';
import iconCss from './components/ecl-ec/icon.scss';
import indentedTextCss from './components/ecl-ec/indented-text.scss';
import inputCheckboxCss from './components/ecl-ec/input-checkbox.scss';
import inputColorCss from './components/ecl-ec/input-color.scss';
import inputDateCss from './components/ecl-ec/input-date.scss';
import inputEmailCss from './components/ecl-ec/input-email.scss';
import inputFileCss from './components/ecl-ec/input-file.scss';
import inputNumberCss from './components/ecl-ec/input-number.scss';
import inputPasswordCss from './components/ecl-ec/input-password.scss';
import inputRadioCss from './components/ecl-ec/input-radio.scss';
import inputRangeCss from './components/ecl-ec/input-range.scss';
import inputTextCss from './components/ecl-ec/input-text.scss';
import linkButtonCss from './components/ecl-ec/link-button.scss';
import kolibriCss from './components/ecl-ec/kolibri.scss';
import linkCss from './components/ecl-ec/link.scss';
import navCss from './components/ecl-ec/nav.scss';
import paginationCss from './components/ecl-ec/pagination.scss';
import progressCss from './components/ecl-ec/progress.scss';
import selectCss from './components/ecl-ec/select.scss';
import skipNavCss from './components/ecl-ec/skip-nav.scss';
import spinCss from './components/ecl-ec/spin.scss';
import splitButtonCss from './components/ecl-ec/split-button.scss';
import tableStatefulCss from './components/ecl-ec/table-stateful.scss';
import tableStatelessCss from './components/ecl-ec/table-stateless.scss';
import tabsCss from './components/ecl-ec/tabs.scss';
import textareaCss from './components/ecl-ec/textarea.scss';
import toastContainerCss from './components/ecl-ec/toast-container.scss';
import toolbarCss from './components/ecl-ec/toolbar.scss';

// Europa Component Library - European Commission | https://ec.europa.eu/component-library/ec/
export const ECL_EC = KoliBri.createTheme('ecl-ec', {
	GLOBAL: globalCss,
	'KOL-HEADING': headingCss,
	'KOL-ACCORDION': accordionCss,
	'KOL-INDENTED-TEXT': indentedTextCss,
	'KOL-BUTTON': buttonCss,
	'KOL-LINK-BUTTON': linkButtonCss,
	'KOL-BADGE': badgeCss,
	'KOL-ALERT': alertCss,
	'KOL-AVATAR': avatarCss,
	'KOL-TABS': tabsCss,
	'KOL-LINK': linkCss,
	'KOL-BUTTON-LINK': buttonLinkCss,
	'KOL-BREADCRUMB': breadcrumbCss,
	'KOL-DETAILS': detailsCss,
	'KOL-DRAWER': drawerCss,
	'KOL-PROGRESS': progressCss,
	'KOL-SPIN': spinCss,
	'KOL-PAGINATION': paginationCss,
	'KOL-INPUT-CHECKBOX': inputCheckboxCss,
	'KOL-INPUT-COLOR': inputColorCss,
	'KOL-CARD': cardCss,
	'KOL-COMBOBOX': ComboboxCss,
	'KOL-BUTTON-GROUP': buttonGroupCss,
	'KOL-INPUT-RADIO': inputRadioCss,
	'KOL-INPUT-RANGE': inputRangeCss,
	'KOL-INPUT-TEXT': inputTextCss,
	'KOL-KOLIBRI': kolibriCss,
	'KOL-INPUT-PASSWORD': inputPasswordCss,
	'KOL-INPUT-NUMBER': inputNumberCss,
	'KOL-INPUT-DATE': inputDateCss,
	'KOL-INPUT-EMAIL': inputEmailCss,
	'KOL-INPUT-FILE': inputFileCss,
	'KOL-SELECT': selectCss,
	'KOL-TEXTAREA': textareaCss,
	'KOL-ICON': iconCss,
	'KOL-TABLE-STATEFUL': tableStatefulCss,
	'KOL-TABLE-STATELESS': tableStatelessCss,
	'KOL-NAV': navCss,
	'KOL-SKIP-NAV': skipNavCss,
	'KOL-SPLIT-BUTTON': splitButtonCss,
	'KOL-TOAST-CONTAINER': toastContainerCss,
	'KOL-TOOLBAR': toolbarCss,
});
