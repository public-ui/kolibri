import { KoliBri } from '@public-ui/schema';
import abbrCss from '../../bzst-v2/src/components/abbr.scss';
import accordionCss from '../../bzst-v2/src/components/accordion.scss';
import alertCss from '../../bzst-v2/src/components/alert.scss';
import badgeCss from '../../bzst-v2/src/components/badge.scss';
import breadcrumbCss from '../../bzst-v2/src/components/breadcrumb.scss';
import buttonCss from '../../bzst-v2/src/components/button.scss';
import buttonGroupCss from '../../bzst-v2/src/components/button-group.scss';
import buttonLinkCss from '../../bzst-v2/src/components/button-link.scss';
import cardCss from '../../bzst-v2/src/components/card.scss';
import detailsCss from '../../bzst-v2/src/components/details.scss';
import globalCss from './global.scss';
import headingCss from '../../bzst-v2/src/components/heading.scss';
import iconCss from '../../bzst-v2/src/components/icon.scss';
import indentedTextCss from '../../bzst-v2/src/components/indented-text.scss';
import inputCheckboxCss from '../../bzst-v2/src/components/input-checkbox.scss';
import inputColorCss from '../../bzst-v2/src/components/input-color.scss';
import inputDateCss from '../../bzst-v2/src/components/input-date.scss';
import inputEmailCss from '../../bzst-v2/src/components/input-email.scss';
import inputFileCss from '../../bzst-v2/src/components/input-file.scss';
import inputNumberCss from '../../bzst-v2/src/components/input-number.scss';
import inputPasswordCss from '../../bzst-v2/src/components/input-password.scss';
import inputRadioCss from '../../bzst-v2/src/components/input-radio.scss';
import inputRangeCss from '../../bzst-v2/src/components/input-range.scss';
import inputTextCss from '../../bzst-v2/src/components/input-text.scss';
import linkButtonCss from '../../bzst-v2/src/components/link-button.scss';
import linkCss from '../../bzst-v2/src/components/link.scss';
import linkGroupCss from '../../bzst-v2/src/components/link-group.scss';
import modalCss from '../../bzst-v2/src/components/modal.scss';
import navCss from '../../bzst-v2/src/components/nav.scss';
import paginationCss from '../../bzst-v2/src/components/pagination.scss';
import progressCss from '../../bzst-v2/src/components/progress.scss';
import selectCss from '../../bzst-v2/src/components/select.scss';
import skipNavCss from '../../bzst-v2/src/components/skip-nav.scss';
import spinCss from '../../bzst-v2/src/components/spin.scss';
import tableCss from '../../bzst-v2/src/components/table.scss';
import tabsCss from '../../bzst-v2/src/components/tabs.scss';
import textareaCss from '../../bzst-v2/src/components/textarea.scss';
import toastContainerCss from '../../bzst-v2/src/components/toast-container.scss';
import tooltipCss from '../../bzst-v2/src/components/tooltip.scss';

// Bundeszentralamt für Steuern
export const BZSt = KoliBri.createTheme('bzst', {
	GLOBAL: globalCss,
	'KOL-ABBR': abbrCss,
	'KOL-ACCORDION': accordionCss,
	'KOL-ALERT': alertCss,
	'KOL-BADGE': badgeCss,
	'KOL-BREADCRUMB': breadcrumbCss,
	'KOL-BUTTON': buttonCss,
	'KOL-BUTTON-GROUP': buttonGroupCss,
	'KOL-BUTTON-LINK': buttonLinkCss,
	'KOL-CARD': cardCss,
	'KOL-DETAILS': detailsCss,
	'KOL-HEADING': headingCss,
	'KOL-ICON': iconCss,
	'KOL-INDENTED-TEXT': indentedTextCss,
	'KOL-INPUT-CHECKBOX': inputCheckboxCss,
	'KOL-INPUT-COLOR': inputColorCss,
	'KOL-INPUT-DATE': inputDateCss,
	'KOL-INPUT-EMAIL': inputEmailCss,
	'KOL-INPUT-FILE': inputFileCss,
	'KOL-INPUT-NUMBER': inputNumberCss,
	'KOL-INPUT-PASSWORD': inputPasswordCss,
	'KOL-INPUT-RADIO': inputRadioCss,
	'KOL-INPUT-RANGE': inputRangeCss,
	'KOL-INPUT-TEXT': inputTextCss,
	'KOL-LINK': linkCss,
	'KOL-LINK-BUTTON': linkButtonCss,
	'KOL-LINK-GROUP': linkGroupCss,
	'KOL-MODAL': modalCss,
	'KOL-NAV': navCss,
	'KOL-PAGINATION': paginationCss,
	'KOL-PROGRESS': progressCss,
	'KOL-SELECT': selectCss,
	'KOL-SKIP-NAV': skipNavCss,
	'KOL-SPIN': spinCss,
	'KOL-TABLE': tableCss,
	'KOL-TABS': tabsCss,
	'KOL-TEXTAREA': textareaCss,
	'KOL-TOAST-CONTAINER': toastContainerCss,
	'KOL-TOOLTIP': tooltipCss,
});
