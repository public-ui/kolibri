import { KoliBri } from '@public-ui/schema';
import globalCss from './global.css';
import abbrCss from './components/abbr.css';
import accordionCss from './components/accordion.css';
import alertCss from './components/alert.css';
import badgeCss from './components/badge.css';
import breadcrumbCss from './components/breadcrumb.css';
import buttonCss from './components/button.css';
import buttonGroupCss from './components/button-group.css';
import buttonLinkCss from './components/button-link.css';
import cardCss from './components/card.css';
import detailsCss from './components/details.css';
import headingCss from './components/heading.css';
import iconCss from './components/icon.css';
import indentedTextCss from './components/indented-text.css';
import inputCheckboxCss from './components/input-checkbox.css';
import inputColorCss from './components/input-color.css';
import inputDateCss from './components/input-date.css';
import inputEmailCss from './components/input-email.css';
import inputFileCss from './components/input-file.css';
import inputNumberCss from './components/input-number.css';
import inputPasswordCss from './components/input-password.css';
import inputRadioCss from './components/input-radio.css';
import inputRangeCss from './components/input-range.css';
import inputTextCss from './components/input-text.css';
import linkButtonCss from './components/link-button.css';
import linkCss from './components/link.css';
import modalCss from './components/modal.css';
import navCss from './components/nav.css';
import paginationCss from './components/pagination.css';
import progressCss from './components/progress.css';
import selectCss from './components/select.css';
import skipNavCss from './components/skip-nav.css';
import splitButtonCss from './components/split-button.css';
import tableCss from './components/table.css';
import tabsCss from './components/tabs.css';
import textareaCss from './components/textarea.css';
import toastContainerCss from './components/toast-container.css';

export const DEFAULT = KoliBri.createTheme('default', {
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
	'KOL-HEADING': headingCss,
	'KOL-BADGE': badgeCss,
	'KOL-BUTTON-GROUP': buttonGroupCss,
	'KOL-INDENTED-TEXT': indentedTextCss,
	'KOL-LINK': linkCss,
	'KOL-DETAILS': detailsCss,
	'KOL-PROGRESS': progressCss,
	'KOL-SELECT': selectCss,
	'KOL-INPUT-COLOR': inputColorCss,
	'KOL-ACCORDION': accordionCss,
	'KOL-TABLE': tableCss,
	'KOL-NAV': navCss,
	'KOL-CARD': cardCss,
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
});
