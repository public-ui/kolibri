/*
 * The Kol*Tag constants keep their default `kol-*` value permanently. Tag name transformation is
 * delegated to the native Stencil runtime (`setTagTransformer`/`transformTag`): internal rendering
 * through `h()` resolves the tags at render time, and code that addresses tags directly
 * (`document.createElement`, `closest`, `querySelector`, `tagName` comparisons) resolves them
 * through `transformTag`.
 */
export const KolAbbrTag = 'kol-abbr';
export const KolAccordionTag = 'kol-accordion';
export const KolAlertTag = 'kol-alert';
export const KolAvatarTag = 'kol-avatar';
export const KolBadgeTag = 'kol-badge';
export const KolBreadcrumbTag = 'kol-breadcrumb';
export const KolButtonLinkTag = 'kol-button-link';
export const KolButtonTag = 'kol-button';
export const KolCardTag = 'kol-card';
export const KolComboboxTag = 'kol-combobox';
export const KolDetailsTag = 'kol-details';
export const KolDialogTag = 'kol-dialog';
export const KolDrawerTag = 'kol-drawer';
export const KolFormTag = 'kol-form';
export const KolHeadingTag = 'kol-heading';
export const KolIconTag = 'kol-icon';
export const KolImageTag = 'kol-image';
export const KolInputCheckboxTag = 'kol-input-checkbox';
export const KolInputColorTag = 'kol-input-color';
export const KolInputDateTag = 'kol-input-date';
export const KolInputEmailTag = 'kol-input-email';
export const KolInputFileTag = 'kol-input-file';
export const KolInputNumberTag = 'kol-input-number';
export const KolInputPasswordTag = 'kol-input-password';
export const KolInputRadioTag = 'kol-input-radio';
export const KolInputRangeTag = 'kol-input-range';
export const KolInputTag = 'kol-input';
export const KolInputTextTag = 'kol-input-text';
export const KolKolibriTag = 'kol-kolibri';
export const KolLinkButtonTag = 'kol-link-button';
export const KolLinkTag = 'kol-link';
export const KolMeterTag = 'kol-meter';
export const KolModalTag = 'kol-modal';
export const KolNavTag = 'kol-nav';
export const KolPaginationTag = 'kol-pagination';
export const KolPopoverButtonTag = 'kol-popover-button';
export const KolProgressTag = 'kol-progress';
export const KolQuoteTag = 'kol-quote';
export const KolSelectTag = 'kol-select';
export const KolSingleSelectTag = 'kol-single-select';
export const KolSkipNavTag = 'kol-skip-nav';
export const KolSpinTag = 'kol-spin';
export const KolSplitButtonTag = 'kol-split-button';
export const KolTableStatefulTag = 'kol-table-stateful';
export const KolTableStatelessTag = 'kol-table-stateless';
export const KolTabsTag = 'kol-tabs';
export const KolTextareaTag = 'kol-textarea';
export const KolToastContainerTag = 'kol-toast-container';
export const KolToolbarTag = 'kol-toolbar';
export const KolTreeItemTag = 'kol-tree-item';
export const KolTreeTag = 'kol-tree';
export const KolVersionTag = 'kol-version';
