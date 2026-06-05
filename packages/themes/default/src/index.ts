import { KoliBri, type KoliBriFeatureFlags } from '@public-ui/components';
import abbrCss from './components/abbr.scss';
import accordionCss from './components/accordion.scss';
import alertCss from './components/alert.scss';
import badgeCss from './components/badge.scss';
import breadcrumbCss from './components/breadcrumb.scss';
import buttonLinkCss from './components/button-link.scss';
import buttonCss from './components/button.scss';
import cardCss from './components/card.scss';
import comboboxCss from './components/combobox.scss';
import detailsCss from './components/details.scss';
import dialogCss from './components/dialog.scss';
import drawerCss from './components/drawer.scss';
import formCss from './components/form.scss';
import headingCss from './components/heading.scss';
import iconCss from './components/icon.scss';
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
import meterCss from './components/meter.scss';
import navCss from './components/nav.scss';
import paginationCss from './components/pagination.scss';
import popoverButtonCss from './components/popover-button.scss';
import progressCss from './components/progress.scss';
import quoteCss from './components/quote.scss';
import selectCss from './components/select.scss';
import singleSelect from './components/single-select.scss';
import skipNavCss from './components/skip-nav.scss';
import splitButtonCss from './components/split-button.scss';
import tableStatefulCss from './components/table-stateful.scss';
import tableStatelessCss from './components/table-stateless.scss';
import tabsCss from './components/tabs.scss';
import textareaCss from './components/textarea.scss';
import toastContainerCss from './components/toast-container.scss';
import toolbarCss from './components/toolbar.scss';
import treeItemCss from './components/tree-item.scss';
import treeCss from './components/tree.scss';
import globalCss from './global.scss';

export const DEFAULT = KoliBri.createTheme('default', {
	GLOBAL: globalCss,
	'KOL-ABBR': abbrCss,
	'KOL-ACCORDION': accordionCss,
	'KOL-ALERT': alertCss,
	'KOL-BADGE': badgeCss,
	'KOL-BREADCRUMB': breadcrumbCss,
	'KOL-BUTTON': buttonCss,
	'KOL-BUTTON-LINK': buttonLinkCss,
	'KOL-CARD': cardCss,
	'KOL-COMBOBOX': comboboxCss,
	'KOL-DETAILS': detailsCss,
	'KOL-DIALOG': dialogCss,
	'KOL-DRAWER': drawerCss,
	'KOL-FORM': formCss,
	'KOL-HEADING': headingCss,
	'KOL-ICON': iconCss,
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
	'KOL-METER': meterCss,
	'KOL-NAV': navCss,
	'KOL-PAGINATION': paginationCss,
	'KOL-POPOVER-BUTTON': popoverButtonCss,
	'KOL-PROGRESS': progressCss,
	'KOL-QUOTE': quoteCss,
	'KOL-SELECT': selectCss,
	'KOL-SINGLE-SELECT': singleSelect,
	'KOL-SKIP-NAV': skipNavCss,
	'KOL-SPLIT-BUTTON': splitButtonCss,
	'KOL-TABLE-STATEFUL': tableStatefulCss,
	'KOL-TABLE-STATELESS': tableStatelessCss,
	'KOL-TABS': tabsCss,
	'KOL-TEXTAREA': textareaCss,
	'KOL-TOAST-CONTAINER': toastContainerCss,
	'KOL-TOOLBAR': toolbarCss,
	'KOL-TREE': treeCss,
	'KOL-TREE-ITEM': treeItemCss,
});

/**
 * Recommended KoliBriFeatureFlags for the Default theme.
 * Pass this as the first argument to mergeFeatureFlags() in bootstrap() so every app using this theme
 * starts from the same baseline, with per-app overrides applied on top.
 *
 * @example
 * import { mergeFeatureFlags } from '@public-ui/components';
 * import { DEFAULT_FEATURE_FLAGS } from '@public-ui/themes';
 * bootstrap(themes, loaders, { features: mergeFeatureFlags(DEFAULT_FEATURE_FLAGS, appOverrides) });
 */
export const DEFAULT_FEATURE_FLAGS: KoliBriFeatureFlags = {
	inputNumberButtons: 'show',
};
