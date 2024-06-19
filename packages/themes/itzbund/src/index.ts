import { KoliBri } from '@public-ui/components';
import globalCss from './global.scss';
import accordionCss from './components/accordion.scss';
import alertCss from './components/alert.scss';
import badgeCss from './components/badge.scss';
import breadcrumbCss from './components/breadcrumb.scss';
import buttonCss from './components/button.scss';
import buttonGroupCss from './components/button-group.scss';
import buttonLinkCss from './components/button-link.scss';
import cardCss from './components/card.scss';
import ComboboxCss from './components/combobox.scss';
import headingCss from './components/heading.scss';
import indentedTextCss from './components/indented-text.scss';
import inputCheckboxCss from './components/input-checkbox.scss';
import inputColorCss from './components/input-color.scss';
import inputDateCss from './components/input-date.scss';
import inputEmailCss from './components/input-email.scss';
import inputFileCss from './components/input-file.scss';
import inputNumberCss from './components/input-number.scss';
import inputPasswordCss from './components/input-password.scss';
import inputRadioCss from './components/input-radio.scss';
import inputTextCss from './components/input-text.scss';
import linkButtonCss from './components/link-button.scss';
import linkCss from './components/link.scss';
import navCss from './components/nav.scss';
import paginationCss from './components/pagination.scss';
import progressCss from './components/progress.scss';
import selectCss from './components/select.scss';
import singleSelectCss from './components/single-select.scss';
import skipNavCss from './components/skip-nav.scss';
import spinCss from './components/spin.scss';
import splitButtonCss from './components/split-button.scss';
import tableStatefulCss from './components/table-stateful.scss';
import tableStatelessCss from './components/table-stateless.scss';
import tabsCss from './components/tabs.scss';
import textareaCss from './components/textarea.scss';
import toastContainerCss from './components/toast-container.scss';
import toolbarCss from './components/toolbar.scss';

// Informationstechnikzentrum Bund
export const ITZBund = KoliBri.createTheme('itzbund', {
	GLOBAL: globalCss,
	'KOL-BUTTON': buttonCss,
	'KOL-BUTTON-GROUP': buttonGroupCss,
	'KOL-LINK-BUTTON': linkButtonCss,
	'KOL-PAGINATION': paginationCss,
	'KOL-BUTTON-LINK': buttonLinkCss,
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
	'KOL-INDENTED-TEXT': indentedTextCss,
	'KOL-LINK': linkCss,
	'KOL-BREADCRUMB': breadcrumbCss,
	'KOL-SPIN': spinCss,
	'KOL-SINGLE-SELECT': singleSelectCss,
	'KOL-PROGRESS': progressCss,
	'KOL-SELECT': selectCss,
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
	'KOL-SKIP-NAV': skipNavCss,
	'KOL-SPLIT-BUTTON': splitButtonCss,
	'KOL-TOOLBAR': toolbarCss,
});
