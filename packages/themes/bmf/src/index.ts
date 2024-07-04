import { KoliBri } from '@public-ui/components';
import globalCss from './global.scss';
import abbrCss from './components/abbr.scss';
import accordionCss from './components/accordion.scss';
import alertCss from './components/alert.scss';
import avatarCss from './components/avatar.scss';
import badgeCss from './components/badge.scss';
import breadcrumbCss from './components/breadcrumb.scss';
import buttonCss from './components/button.scss';
import buttonGroupCss from './components/button-group.scss';
import buttonLinkCss from './components/button-link.scss';
import cardCss from './components/card.scss';
import ComboboxCss from './components/combobox.scss';
import detailsCss from './components/details.scss';
import drawerCss from './components/drawer.scss';
import headingCss from './components/heading.scss';
import iconCss from './components/icon.scss';
import indentedTextCss from './components/indented-text.scss';
import inputCheckboxCss from './components/input-checkbox.scss';
import inputColorCss from './components/input-color.scss';
import inputDateCss from './components/input-date.scss';
import inputEmailCss from './components/input-email.scss';
import inputFileCss from './components/input-file.scss';
import inputNumberCss from './components/input-number.scss';
import inputPasswordCss from './components/input-password.scss';
import inputRadioCss from './components/input-radio.scss';
import inputRangeCss from './components/input-range.scss';
import inputTextCss from './components/input-text.scss';
import linkButtonCss from './components/link-button.scss';
import linkCss from './components/link.scss';
import modalCss from './components/modal.scss';
import navCss from './components/nav.scss';
import paginationCss from './components/pagination.scss';
import progressCss from './components/progress.scss';
import selectCss from './components/select.scss';
import singleSelectCss from './components/single-select.scss';
import skipNavCss from './components/skip-nav.scss';
import splitButtonCss from './components/split-button.scss';
import spinCss from './components/spin.scss';
import tableStatefulCss from './components/table-stateful.scss';
import tableStatelessCss from './components/table-stateless.scss';
import tabsCss from './components/tabs.scss';
import textareaCss from './components/textarea.scss';
import toastContainerCss from './components/toast-container.scss';
import toolbarCss from './components/toolbar.scss';

export const BMF = KoliBri.createTheme('bmf', {
	GLOBAL: globalCss,
	'KOL-BUTTON': buttonCss,
	'KOL-INPUT-TEXT': inputTextCss,
	'KOL-INPUT-PASSWORD': inputPasswordCss,
	'KOL-INPUT-NUMBER': inputNumberCss,
	'KOL-INPUT-DATE': inputDateCss,
	'KOL-INPUT-EMAIL': inputEmailCss,
	'KOL-INPUT-FILE': inputFileCss,
	'KOL-TEXTAREA': textareaCss,
	'KOL-ALERT': alertCss,
	'KOL-AVATAR': avatarCss,
	'KOL-HEADING': headingCss,
	'KOL-BADGE': badgeCss,
	'KOL-BUTTON-GROUP': buttonGroupCss,
	'KOL-INDENTED-TEXT': indentedTextCss,
	'KOL-LINK': linkCss,
	'KOL-DETAILS': detailsCss,
	'KOL-DRAWER': drawerCss,
	'KOL-PROGRESS': progressCss,
	'KOL-SELECT': selectCss,
	'KOL-SINGLE-SELECT': singleSelectCss,
	'KOL-INPUT-COLOR': inputColorCss,
	'KOL-ACCORDION': accordionCss,
	'KOL-TABLE-STATEFUL': tableStatefulCss,
	'KOL-TABLE-STATELESS': tableStatelessCss,
	'KOL-NAV': navCss,
	'KOL-CARD': cardCss,
	'KOL-COMBOBOX': ComboboxCss,
	'KOL-INPUT-CHECKBOX': inputCheckboxCss,
	'KOL-INPUT-RADIO': inputRadioCss,
	'KOL-TOAST-CONTAINER': toastContainerCss,
	'KOL-TABS': tabsCss,
	'KOL-PAGINATION': paginationCss,
	'KOL-INPUT-RANGE': inputRangeCss,
	'KOL-LINK-BUTTON': linkButtonCss,
	'KOL-BUTTON-LINK': buttonLinkCss,
	'KOL-ABBR': abbrCss,
	'KOL-BREADCRUMB': breadcrumbCss,
	'KOL-MODAL': modalCss,
	'KOL-ICON': iconCss,
	'KOL-SKIP-NAV': skipNavCss,
	'KOL-SPLIT-BUTTON': splitButtonCss,
	'KOL-SPIN': spinCss,
	'KOL-TOOLBAR': toolbarCss,
});
