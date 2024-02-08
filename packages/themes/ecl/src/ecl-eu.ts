import { KoliBri } from '@public-ui/schema';
import globalCss from './global-eu.scss';
import accordionCss from './components/ecl-eu/accordion.scss';
import alertCss from './components/ecl-eu/alert.scss';
import badgeCss from './components/ecl-eu/badge.scss';
import buttonCss from './components/ecl-eu/button.scss';
import buttonGroupCss from './components/ecl-eu/button-group.scss';
import buttonLinkCss from './components/ecl-eu/button-link.scss';
import cardCss from './components/ecl-eu/card.scss';
import headingCss from './components/ecl-eu/heading.scss';
import indentedTextCss from './components/ecl-eu/indented-text.scss';
import inputCheckboxCss from './components/ecl-eu/input-checkbox.scss';
import inputColorCss from './components/ecl-eu/input-color.scss';
import inputDateCss from './components/ecl-eu/input-date.scss';
import inputEmailCss from './components/ecl-eu/input-email.scss';
import inputFileCss from './components/ecl-eu/input-file.scss';
import inputNumberCss from './components/ecl-eu/input-number.scss';
import inputPasswordCss from './components/ecl-eu/input-password.scss';
import inputRadioCss from './components/ecl-eu/input-radio.scss';
import inputRangeCss from './components/ecl-eu/input-range.scss';
import inputTextCss from './components/ecl-eu/input-text.scss';
import linkButtonCss from './components/ecl-eu/link-button.scss';
import linkCss from './components/ecl-eu/link.scss';
import navCss from './components/ecl-eu/nav.scss';
import paginationCss from './components/ecl-eu/pagination.scss';
import selectCss from './components/ecl-eu/select.scss';
import spinCss from './components/ecl-eu/spin.scss';
import skipNavCss from './components/ecl-eu/skip-nav.scss';
import splitButtonCss from './components/ecl-eu/split-button.scss';
import tableCss from './components/ecl-eu/table.scss';
import tabsCss from './components/ecl-eu/tabs.scss';
import textareaCss from './components/ecl-eu/textarea.scss';
import toastContainerCss from './components/ecl-eu/toast-container.scss';
import toastCss from './components/ecl-eu/toast.scss';

// Europa Component Library - European Union | https://ec.europa.eu/component-library/eu/
export const ECL_EU = KoliBri.createTheme('ecl-eu', {
	GLOBAL: globalCss,
	'KOL-HEADING': headingCss,
	'KOL-ACCORDION': accordionCss,
	'KOL-INDENTED-TEXT': indentedTextCss,
	'KOL-BUTTON': buttonCss,
	'KOL-LINK-BUTTON': linkButtonCss,
	'KOL-BUTTON-GROUP': buttonGroupCss,
	'KOL-PAGINATION': paginationCss,
	'KOL-NAV': navCss,
	'KOL-BADGE': badgeCss,
	'KOL-ALERT': alertCss,
	'KOL-CARD': cardCss,
	'KOL-INPUT-CHECKBOX': inputCheckboxCss,
	'KOL-INPUT-COLOR': inputColorCss,
	'KOL-INPUT-FILE': inputFileCss,
	'KOL-INPUT-EMAIL': inputEmailCss,
	'KOL-INPUT-NUMBER': inputNumberCss,
	'KOL-INPUT-DATE': inputDateCss,
	'KOL-INPUT-PASSWORD': inputPasswordCss,
	'KOL-INPUT-TEXT': inputTextCss,
	'KOL-SELECT': selectCss,
	'KOL-TEXTAREA': textareaCss,
	'KOL-TABLE': tableCss,
	'KOL-TABS': tabsCss,
	'KOL-LINK': linkCss,
	'KOL-BUTTON-LINK': buttonLinkCss,
	'KOL-SPIN': spinCss,
	'KOL-INPUT-RADIO': inputRadioCss,
	'KOL-INPUT-RANGE': inputRangeCss,
	'KOL-SKIP-NAV': skipNavCss,
	'KOL-SPLIT-BUTTON': splitButtonCss,
	'KOL-TOAST-CONTAINER': toastContainerCss,
	'KOL-TOAST': toastCss,
});
