export let KolAbbr = 'kol-abbr' as const;
export let KolAccordion = 'kol-accordion' as const;
export let KolAlert = 'kol-alert' as const;
export let KolAlertWc = 'kol-alert-wc' as const;
export let KolAvatar = 'kol-avatar' as const;
export let KolAvatarWc = 'kol-avatar-wc' as const;
export let KolBadge = 'kol-badge' as const;
export let KolBreadcrumb = 'kol-breadcrumb' as const;
export let KolButton = 'kol-button' as const;
export let KolButtonWc = 'kol-button-wc' as const;
export let KolButtonGroup = 'kol-button-group' as const;
export let KolButtonGroupWc = 'kol-button-group-wc' as const;
export let KolButtonLink = 'kol-button-link' as const;
export let KolCard = 'kol-card' as const;
export let KolDetails = 'kol-details' as const;
export let KolForm = 'kol-form' as const;
export let KolHeading = 'kol-heading' as const;
export let KolHeadingWc = 'kol-heading-wc' as const;
export let KolIcon = 'kol-icon' as const;
export let KolImage = 'kol-image' as const;
export let KolIndentedText = 'kol-indented-text' as const;
export let KolInput = 'kol-input' as const;
export let KolInputCheckbox = 'kol-input-checkbox' as const;
export let KolInputColor = 'kol-input-color' as const;
export let KolInputDate = 'kol-input-date' as const;
export let KolInputEmail = 'kol-input-email' as const;
export let KolInputFile = 'kol-input-file' as const;
export let KolInputNumber = 'kol-input-number' as const;
export let KolInputPassword = 'kol-input-password' as const;
export let KolInputRadio = 'kol-input-radio' as const;
export let KolInputRange = 'kol-input-range' as const;
export let KolInputText = 'kol-input-text' as const;
export let KolKolibri = 'kol-kolibri' as const;
export let KolLink = 'kol-link' as const;
export let KolLinkWc = 'kol-link-wc' as const;
export let KolLinkButton = 'kol-link-button' as const;
export let KolLinkGroup = 'kol-link-group' as const;
export let KolLogo = 'kol-logo' as const;
export let KolModal = 'kol-modal' as const;
export let KolNav = 'kol-nav' as const;
export let KolPagination = 'kol-pagination' as const;
export let KolPopoverWc = 'kol-popover-wc' as const;
export let KolProgress = 'kol-progress' as const;
export let KolQuote = 'kol-quote' as const;
export let KolSelect = 'kol-select' as const;
export let KolSkipNav = 'kol-skip-nav' as const;
export let KolSpan = 'kol-span' as const;
export let KolSpanWc = 'kol-span-wc' as const;
export let KolSpin = 'kol-spin' as const;
export let KolSplitButton = 'kol-split-button' as const;
export let KolSymbol = 'kol-symbol' as const;
export let KolTable = 'kol-table' as const;
export let KolTabs = 'kol-tabs' as const;
export let KolTextarea = 'kol-textarea' as const;
export let KolToastContainer = 'kol-toast-container' as const;
export let KolTooltipWc = 'kol-tooltip-wc' as const;
export let KolTree = 'kol-tree' as const;
export let KolTreeItem = 'kol-tree-item' as const;
export let KolTreeItemWc = 'kol-tree-item-wc' as const;
export let KolTreeWc = 'kol-tree-wc' as const;
export let KolVersion = 'kol-version' as const;

export const setCustomTagNames = (transformTagName: (tagName: string) => string) => {
	KolAbbr = transformTagName(KolAbbr as string) as 'kol-abbr';
	KolAccordion = transformTagName(KolAccordion as string) as 'kol-accordion';
	KolAlert = transformTagName(KolAlert as string) as 'kol-alert';
	KolAlertWc = transformTagName(KolAlertWc as string) as 'kol-alert-wc';
	KolAvatar = transformTagName(KolAvatar as string) as 'kol-avatar';
	KolAvatarWc = transformTagName(KolAvatarWc as string) as 'kol-avatar-wc';
	KolBadge = transformTagName(KolBadge as string) as 'kol-badge';
	KolBreadcrumb = transformTagName(KolBreadcrumb as string) as 'kol-breadcrumb';
	KolButton = transformTagName(KolButton as string) as 'kol-button';
	KolButtonWc = transformTagName(KolButtonWc as string) as 'kol-button-wc';
	KolButtonGroup = transformTagName(KolButtonGroup as string) as 'kol-button-group';
	KolButtonGroupWc = transformTagName(KolButtonGroupWc as string) as 'kol-button-group-wc';
	KolButtonLink = transformTagName(KolButtonLink as string) as 'kol-button-link';
	KolCard = transformTagName(KolCard as string) as 'kol-card';
	KolDetails = transformTagName(KolDetails as string) as 'kol-details';
	KolForm = transformTagName(KolForm as string) as 'kol-form';
	KolHeading = transformTagName(KolHeading as string) as 'kol-heading';
	KolHeadingWc = transformTagName(KolHeadingWc as string) as 'kol-heading-wc';
	KolIcon = transformTagName(KolIcon as string) as 'kol-icon';
	KolImage = transformTagName(KolImage as string) as 'kol-image';
	KolIndentedText = transformTagName(KolIndentedText as string) as 'kol-indented-text';
	KolInput = transformTagName(KolInput as string) as 'kol-input';
	KolInputCheckbox = transformTagName(KolInputCheckbox as string) as 'kol-input-checkbox';
	KolInputColor = transformTagName(KolInputColor as string) as 'kol-input-color';
	KolInputDate = transformTagName(KolInputDate as string) as 'kol-input-date';
	KolInputEmail = transformTagName(KolInputEmail as string) as 'kol-input-email';
	KolInputFile = transformTagName(KolInputFile as string) as 'kol-input-file';
	KolInputNumber = transformTagName(KolInputNumber as string) as 'kol-input-number';
	KolInputPassword = transformTagName(KolInputPassword as string) as 'kol-input-password';
	KolInputRadio = transformTagName(KolInputRadio as string) as 'kol-input-radio';
	KolInputRange = transformTagName(KolInputRange as string) as 'kol-input-range';
	KolInputText = transformTagName(KolInputText as string) as 'kol-input-text';
	KolKolibri = transformTagName(KolKolibri as string) as 'kol-kolibri';
	KolLink = transformTagName(KolLink as string) as 'kol-link';
	KolLinkWc = transformTagName(KolLinkWc as string) as 'kol-link-wc';
	KolLinkButton = transformTagName(KolLinkButton as string) as 'kol-link-button';
	KolLinkGroup = transformTagName(KolLinkGroup as string) as 'kol-link-group';
	KolLogo = transformTagName(KolLogo as string) as 'kol-logo';
	KolModal = transformTagName(KolModal as string) as 'kol-modal';
	KolNav = transformTagName(KolNav as string) as 'kol-nav';
	KolPagination = transformTagName(KolPagination as string) as 'kol-pagination';
	KolPopoverWc = transformTagName(KolPopoverWc as string) as 'kol-popover-wc';
	KolProgress = transformTagName(KolProgress as string) as 'kol-progress';
	KolQuote = transformTagName(KolQuote as string) as 'kol-quote';
	KolSelect = transformTagName(KolSelect as string) as 'kol-select';
	KolSkipNav = transformTagName(KolSkipNav as string) as 'kol-skip-nav';
	KolSpan = transformTagName(KolSpan as string) as 'kol-span';
	KolSpanWc = transformTagName(KolSpanWc as string) as 'kol-span-wc';
	KolSpin = transformTagName(KolSpin as string) as 'kol-spin';
	KolSplitButton = transformTagName(KolSplitButton as string) as 'kol-split-button';
	KolSymbol = transformTagName(KolSymbol as string) as 'kol-symbol';
	KolTable = transformTagName(KolTable as string) as 'kol-table';
	KolTabs = transformTagName(KolTabs as string) as 'kol-tabs';
	KolTextarea = transformTagName(KolTextarea as string) as 'kol-textarea';
	KolToastContainer = transformTagName(KolToastContainer as string) as 'kol-toast-container';
	KolTooltipWc = transformTagName(KolTooltipWc as string) as 'kol-tooltip-wc';
	KolTree = transformTagName(KolTree as string) as 'kol-tree';
	KolTreeItem = transformTagName(KolTreeItem as string) as 'kol-tree-item';
	KolTreeItemWc = transformTagName(KolTreeItemWc as string) as 'kol-tree-item-wc';
	KolTreeWc = transformTagName(KolTreeWc as string) as 'kol-tree-wc';
	KolVersion = transformTagName(KolVersion as string) as 'kol-version';
};
