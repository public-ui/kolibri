import{A as e,a as t,o as n,s as r}from"./index-Co7NsTo2.js";import{t as i}from"./aria-labelledby-6-ki3akM-C6lJ0lQF.js";import{t as a}from"./aria-labelledby-bKQGdIef-Dzy4UkXK.js";var o=`@charset "UTF-8";
/*
* This file defines the layer order for all CSS layers used in KoliBri.
* The order is important as it determines the cascade priority.
*
* Layer order (lowest to highest priority):
* 1. kol-a11y - Accessibility defaults and requirements
* 2. kol-global - Global component styles and resets
* 3. kol-component - Component-specific styles
* 4. kol-theme-global - Theme-specific global styles
* 5. kol-theme-component - Theme-specific component styles
*/
@layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component;
/* forward the rem function */
/*
 * This file contains all rules for accessibility.
 */
@layer kol-a11y {
  :host {
    /*
     * Minimum size of interactive elements.
     *
     * The \`max(…, 44px)\` floor guarantees the WCAG 2.5.5 (AAA) target size of 44px:
     * \`to-rem(44)\` runs the value through a \`calc()\` rem round-trip which can lose
     * sub-pixel precision and resolve to e.g. 43.99px depending on the browser's
     * rounding, dropping just below the required minimum.
     */
    --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);
    /*
     * No element should be used without verifying the contrast ratio of its background and font colors.
     * By initially setting the background color to white and the font color to black,
     * the contrast ratio is ensured and explicit adjustment is forced.
     */
    --kol-a11y-font-color: black;
    --kol-a11y-background-color: white;
    color: var(--kol-a11y-font-color);
    background-color: var(--kol-a11y-background-color);
    /*
     * Verdana is an accessible font that can be used without requiring additional loading time.
     */
    --kol-a11y-font-family: Verdana;
    font-family: var(--kol-a11y-font-family);
    /*
     * Letter spacing is required for all texts.
     */
    letter-spacing: inherit;
    /*
     * Word spacing is required for all texts.
     */
    word-spacing: inherit;
    /*
     * Text should be aligned left by default to provide a predictable starting point.
     */
    text-align: left;
  }
  * {
    /*
     * This rule enables the word dividing for all texts. That is important for high zoom levels.
     */
    hyphens: auto;
    /*
     * This rule enables the word dividing for all texts. That is important for high zoom levels.
     */
    word-break: break-word;
  }
  /*
   * All interactive elements should have a minimum size of to-rem(44).
   */
  /* input:not([type='checkbox'], [type='radio'], [type='range']), */
  /* option, */
  /* select, */
  /* textarea, */
  button,
  .kol-input .input {
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
  }
  /*
   * Some interactive elements should not inherit the font-family and font-size.
   */
  a,
  button,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  input,
  option,
  select,
  textarea {
    /*
     * All elements should inherit the text color from his parent element.
     */
    color: inherit;
    /*
     * All elements should inherit the font family from his parent element.
     */
    font-family: inherit;
    /*
     * All elements should inherit the font size from his parent element.
     */
    font-size: inherit;
    /*
     * Letter spacing is required for all texts.
     */
    letter-spacing: inherit;
    /*
     * Word spacing is required for all texts.
     */
    word-spacing: inherit;
  }
  /**
  * Sometimes we need the semantic element for accessibility reasons,
  * but we don't want to show it.
  *
  * - https://www.a11yproject.com/posts/how-to-hide-content/
  */
  .visually-hidden {
    position: fixed;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    overflow: hidden;
    white-space: nowrap;
    clip-path: inset(50%);
  }
}
@layer kol-global {
  /*
   * Dieses CSS stellt sicher, dass der Standard-Style
   * von A und Button resettet werden.
   */
  :is(a, button) {
    background-color: transparent;
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    /* 100% needed for custom width from outside */
  }
  /*
   * Ensure elements with hidden attribute to be actually not visible
   * @see https://meowni.ca/hidden.is.a.lie.html
   */
  [hidden] {
    display: none !important;
  }
  .badge-text-hint {
    color: black;
    background-color: white;
  }
}
@layer kol-global {
  :host {
    /*
     * The max-width is needed to prevent the table from overflowing the
     * parent node, if the table is wider than the parent node.
     */
    max-width: 100%;
    font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
  }
  * {
    /*
     * We prefer to box-sizing: border-box for all elements.
     */
    box-sizing: border-box;
  }
  .kol-span {
    /* KolSpan is a layout component with icons in all directions and a label text in the middle. */
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    /* The sub span in KolSpan is the horizontal span with icon left and right and the label text in the middle. */
  }
  .kol-span__container {
    display: flex;
    align-items: center;
  }
  a,
  button {
    cursor: pointer;
  }
  .kol-span .kol-span__label--hide-label .kol-span__label {
    display: none;
  }
  /* Reset browser agent style. */
  button:disabled {
    color: unset;
  }
  .disabled label,
  .disabled:focus-within label,
  [aria-disabled=true],
  [aria-disabled=true]:focus,
  [disabled],
  [disabled]:focus {
    outline: none;
    cursor: not-allowed;
  }
  [aria-disabled=true]:focus .kol-span,
  [disabled]:focus .kol-span {
    outline: none !important;
  }
  .hastooltip {
    z-index: 900 !important;
  }
}
@layer kol-component {
  :host {
    display: block;
  }
}
@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1786337766155"); /* IE9*/
  src: url("kolicons.eot?t=1786337766155#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1786337766155") format("woff2"), url("kolicons.woff?t=1786337766155") format("woff"), url("kolicons.ttf?t=1786337766155") format("truetype"), url("kolicons.svg?t=1786337766155#kolicons") format("svg"); /* iOS 4.1- */
}
@layer kol-component {
  [class^=kolicon-], [class*=" kolicon-"] {
    font-family: "kolicons";
    font-style: normal;
    font-weight: 400;
    line-height: 1em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .kolicon-alert-error::before {
    content: "\\ea01";
  }
  .kolicon-alert-info::before {
    content: "\\ea02";
  }
  .kolicon-alert-success::before {
    content: "\\ea03";
  }
  .kolicon-alert-warning::before {
    content: "\\ea04";
  }
  .kolicon-check::before {
    content: "\\ea05";
  }
  .kolicon-chevron-double-left::before {
    content: "\\ea06";
  }
  .kolicon-chevron-double-right::before {
    content: "\\ea07";
  }
  .kolicon-chevron-down::before {
    content: "\\ea08";
  }
  .kolicon-chevron-left::before {
    content: "\\ea09";
  }
  .kolicon-chevron-right::before {
    content: "\\ea0a";
  }
  .kolicon-chevron-up::before {
    content: "\\ea0b";
  }
  .kolicon-cogwheel::before {
    content: "\\ea0c";
  }
  .kolicon-cross::before {
    content: "\\ea0d";
  }
  .kolicon-eye-closed::before {
    content: "\\ea0e";
  }
  .kolicon-eye::before {
    content: "\\ea0f";
  }
  .kolicon-house::before {
    content: "\\ea10";
  }
  .kolicon-kolibri::before {
    content: "\\ea11";
  }
  .kolicon-link-external::before {
    content: "\\ea12";
  }
  .kolicon-link::before {
    content: "\\ea13";
  }
  .kolicon-minus::before {
    content: "\\ea14";
  }
  .kolicon-plus::before {
    content: "\\ea15";
  }
  .kolicon-settings::before {
    content: "\\ea16";
  }
  .kolicon-sort-asc::before {
    content: "\\ea17";
  }
  .kolicon-sort-desc::before {
    content: "\\ea18";
  }
  .kolicon-sort-neutral::before {
    content: "\\ea19";
  }
  .kolicon-up::before {
    content: "\\ea1a";
  }
  .kolicon-version::before {
    content: "\\ea1b";
  }
}
@layer kol-component {
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-tooltip {
    display: contents;
  }
  .kol-tooltip__floating {
    opacity: 0;
    display: none;
    position: fixed;
    /* Avoid layout interference - see https://floating-ui.com/docs/computePosition */
    top: 0;
    left: 0;
    /* Can be used to specify the tooltip-width from the outside. Unset by default.  */
    width: var(--kol-tooltip-width, max-content);
    min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));
    max-width: 90vw;
    max-height: 90vh;
    animation-direction: normal;
    /* Can be used to specify the animation duration from the outside. 250ms by default. */
    animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
  }
  .kol-tooltip__floating.hide {
    animation-name: hideTooltip;
  }
  .kol-tooltip__floating.show {
    animation-name: showTooltip;
  }
  .kol-tooltip__arrow {
    transform: rotate(45deg);
    color: black;
    background-color: white;
    position: absolute;
    z-index: 999;
    width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));
    height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));
  }
  .kol-tooltip__content {
    color: black;
    background-color: white;
    position: relative;
    z-index: 1000;
  }
  @keyframes hideTooltip {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      display: none;
    }
  }
  @keyframes showTooltip {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
@layer kol-component {
  .kol-alert .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-alert :host {
    display: inline-block;
  }
  .kol-alert .kol-button {
    display: flex;
    height: 100%;
    min-height: var(--a11y-min-size);
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-alert .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-alert .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-alert {
    display: grid;
    grid-template-areas: "icon heading close" "icon content close";
    grid-template-columns: min-content 1fr min-content;
    grid-template-rows: min-content min-content;
  }
  .kol-alert__icon {
    grid-area: icon;
  }
  .kol-alert__heading {
    grid-area: heading;
  }
  .kol-alert__closer {
    /* Visible with forced colors */
    outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));
    grid-area: close;
  }
  .kol-alert__content {
    grid-area: content;
  }
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  :host {
    display: inline-block;
  }
  .kol-button {
    display: flex;
    height: 100%;
    min-height: var(--a11y-min-size);
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-popover-button__popover {
    margin: 0;
    padding: 0;
    border: 0;
  }
  .kol-popover-button--inline .kol-popover-button__button {
    display: inline;
  }
  .kol-popover {
    opacity: 0;
    transition: 0.2s ease-out opacity;
  }
  .kol-popover-button--open + .kol-popover {
    opacity: 1;
  }
  .kol-table-settings {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
  .kol-table-settings .kol-popover-button__popover {
    background: white;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-radius: calc(8 * 1rem / var(--kolibri-root-font-size, 16));
    border: 1px solid black;
  }
  .kol-table-settings__columns {
    display: grid;
    max-height: calc(200 * 1rem / var(--kolibri-root-font-size, 16));
    overflow: auto;
    grid-auto-rows: min-content;
    grid-template-columns: min-content minmax(max-content, 1fr) calc(140 * 1rem / var(--kolibri-root-font-size, 16)) auto auto;
  }
  .kol-table-settings__column {
    display: grid;
    align-items: center;
    grid-template-columns: subgrid;
    grid-column: 1/6;
  }
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-table {
    --kol-table-selection-col-width: var(--a11y-min-size);
    display: block;
    position: relative;
    max-width: 100%;
  }
  .kol-table:has(.kol-table__focus-element:focus) .kol-table__scroll-container {
    /* @see https://remysharp.com/til/css/focus-ring-default-styles */
    outline: 5px auto Highlight;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: 2px;
  }
  .kol-table__scroll-container {
    overflow-x: auto;
    overflow-y: hidden;
  }
  .kol-table__table {
    table-layout: fixed;
  }
  .kol-table__caption {
    min-height: var(--a11y-min-size);
    text-align: start;
  }
  kol-table-settings-wc:not(:has(~ .kol-table__scroll-container .kol-table__caption)) {
    display: block;
    min-height: var(--a11y-min-size);
  }
  .kol-table__sort-button .kol-button {
    color: inherit;
  }
  .kol-table__sort {
    display: inline-flex;
    align-items: center;
  }
  .kol-table__sort-order {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .kol-table__body {
    text-align: left;
  }
  .kol-table__body .kol-button__text {
    justify-items: start;
  }
  .kol-table__cell--align-left {
    text-align: left;
  }
  .kol-table__cell--align-left .kol-button__text {
    align-items: start;
  }
  .kol-table__cell--align-center {
    text-align: center;
  }
  .kol-table__cell--align-center .kol-button__text {
    align-items: center;
  }
  .kol-table__cell--align-right {
    text-align: right;
  }
  .kol-table__cell--align-right .kol-button__text {
    align-items: end;
  }
  .kol-table__cell--selection {
    background-color: white;
    position: sticky !important;
    left: 0;
    z-index: 2;
    width: var(--kol-table-selection-col-width, auto);
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    white-space: nowrap;
  }
  .kol-table__cell--actions {
    white-space: nowrap;
  }
  .kol-table__cell--actions .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-table__cell--actions :host {
    display: inline-block;
  }
  .kol-table__cell--actions .kol-button {
    display: flex;
    height: 100%;
    min-height: var(--a11y-min-size);
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-table__cell--actions .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-table__cell--actions .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-table__cell--actions .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-table__cell--actions :host {
    display: inline-block;
  }
  .kol-table__cell--actions .kol-link {
    display: inline-flex;
    max-width: fit-content;
    align-items: baseline;
    place-items: center;
    text-align: left;
    text-decoration-line: none;
  }
  .kol-table__cell--actions .kol-link--standalone {
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: stretch;
  }
  .kol-table__cell--actions .kol-link--standalone .kol-link__text {
    display: inline-flex;
    flex: 1 1 100%;
    place-items: center;
  }
  .kol-table__cell--actions .kol-link .kol-span__label {
    text-decoration-line: underline;
  }
  .kol-table__cell--actions .kol-link:focus:not([aria-disabled], [disabled]) .kol-span__label, .kol-table__cell--actions .kol-link:hover:not([aria-disabled], [disabled]) .kol-span__label {
    text-decoration-thickness: 0.2em;
  }
  .kol-table__cell--actions .kol-link__icon {
    display: inline-flex;
  }
  .kol-table__cell--sticky-left, .kol-table__cell--sticky-right {
    background-color: white;
    position: sticky !important;
    z-index: 1;
  }
  .kol-table__cell--sticky-left:nth-last-child(1 of .kol-table__cell--sticky-left) {
    border-right: 2px solid black;
  }
  .kol-table__cell--sticky-right:nth-child(1 of .kol-table__cell--sticky-left) {
    border-left: 2px solid black;
  }
  .kol-table__cell-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .kol-table__spacer {
    display: none;
  }
  .kol-table__selection {
    position: relative;
  }
  .kol-table__selection-label {
    display: flex;
    position: relative;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .kol-table__selection--disabled {
    cursor: not-allowed;
  }
  .kol-table__selection-icon {
    display: block;
    position: absolute;
    inset: auto;
    z-index: 1;
  }
  .kol-table__selection-input {
    border-style: solid;
    margin: 0;
    appearance: none;
    cursor: pointer;
  }
  .kol-table__selection-input:disabled {
    cursor: not-allowed;
  }
  .kol-table__selection-input:before {
    content: "";
  }
  .kol-table__selection-input--checkbox {
    background-color: white;
    display: flex;
    position: relative;
    min-width: calc(var(--a11y-min-size) / 2);
    min-height: calc(var(--a11y-min-size) / 2);
    border-width: 2px;
    align-items: center;
    justify-content: center;
    line-height: 1.5;
  }
  .kol-table__selection-input--radio {
    border-radius: 100%;
    display: flex;
    width: 1.5em;
    min-width: 1.5em;
    height: 1.5em;
    min-height: 1.5em;
    padding: 0;
    border-width: 2px;
  }
  .kol-table__selection-input--radio:before {
    border-radius: 100%;
    width: 0.75em;
    height: 0.75em;
    margin: auto;
  }
  .kol-table__selection-input--radio:checked:before {
    background-color: black;
  }
  @media (forced-colors: active) {
    .kol-table__selection-input--radio:checked:before {
      /* Give it a visible background in forced colors mode */
      background-color: selectedItem !important;
    }
  }
}`,s=class{constructor(e){r(this,e),this.resolvedElements=[]}validateAriaLabelledby(e){this.syncExternalLabel(e)}syncExternalLabel(e){this.resolvedElements=a(this,this.host,this.internals,e)}componentWillLoad(){this.internals=i(this.host),this.syncExternalLabel(this._ariaLabelledby)}componentDidLoad(){this.resolvedElements.length||this.syncExternalLabel(this._ariaLabelledby)}render(){return n(e,{key:`7115f32bb9375fc5d4158bef05eded091fa77091`,externalLabelElements:this.resolvedElements,_data:this._data,_dataFoot:this._dataFoot,_fixedCols:this._fixedCols,_headerCells:this._headerCells,_label:this._label,_on:this._on,_selection:this._selection,_hasSettingsMenu:this._hasSettingsMenu,_variant:this._variant})}get host(){return t(this)}static get watchers(){return{_ariaLabelledby:[`validateAriaLabelledby`]}}};s.style={default:o};export{s as kol_table_stateless};