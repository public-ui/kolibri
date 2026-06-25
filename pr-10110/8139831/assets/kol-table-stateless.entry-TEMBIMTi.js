import{a as e,j as t,o as n,s as r}from"./index-BYMCFgVO.js";import{t as i}from"./aria-labelledby-6-ki3akM-C6lJ0lQF.js";import{t as a}from"./aria-labelledby-mJ17Cl5c-DJQldXI5.js";var o=`@charset "UTF-8";
@layer kol-component {
  :host {
    display: block;
  }
}
/* forward the rem function */
@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1782397489094"); /* IE9*/
  src: url("kolicons.eot?t=1782397489094#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1782397489094") format("woff2"), url("kolicons.woff?t=1782397489094") format("woff"), url("kolicons.ttf?t=1782397489094") format("truetype"), url("kolicons.svg?t=1782397489094#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-table-settings__columns-container {
    max-height: calc(200 * 1rem / var(--kolibri-root-font-size, 16));
    overflow: auto;
  }
  .kol-table-settings__columns {
    display: grid;
    align-items: center;
    grid-auto-rows: min-content;
    grid-template-columns: min-content minmax(max-content, 1fr) calc(140 * 1rem / var(--kolibri-root-font-size, 16)) auto auto;
  }
  .kol-table-settings__column {
    display: contents;
  }
  .kol-table .kol-alert .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-table .kol-alert :host {
    display: inline-block;
  }
  .kol-table .kol-alert .kol-button {
    display: flex;
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-table .kol-alert .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-table .kol-alert .kol-button__button, .kol-table .kol-alert .kol-button__anchor {
    /* The user agent styles of <button> do not inherit font and color. */
    color: inherit;
    display: flex;
    min-height: var(--a11y-min-size);
    flex: 1;
    align-items: stretch;
    font: inherit;
    text-decoration-line: none;
  }
  .kol-table .kol-alert .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-table .kol-alert {
    display: grid;
  }
  .kol-table .kol-alert__container {
    display: flex;
    place-items: center;
  }
  .kol-table .kol-alert__container-content {
    flex-grow: 1;
  }
  .kol-table .kol-alert__closer {
    /* Visible with forced colors */
    outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));
  }
  .kol-table .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-table :host {
    display: inline-block;
  }
  .kol-table .kol-button {
    display: flex;
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-table .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-table .kol-button__button, .kol-table .kol-button__anchor {
    /* The user agent styles of <button> do not inherit font and color. */
    color: inherit;
    display: flex;
    min-height: var(--a11y-min-size);
    flex: 1;
    align-items: stretch;
    font: inherit;
    text-decoration-line: none;
  }
  .kol-table .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-table .kol-popover-button__popover {
    margin: 0;
    padding: 0;
    border: 0;
  }
  .kol-table .kol-popover-button--inline, .kol-table .kol-popover-button--inline .kol-button__button {
    display: inline;
    min-width: 0;
    min-height: 1em;
  }
  .kol-table .kol-popover {
    opacity: 0;
    transition: 0.2s ease-out opacity;
  }
  .kol-table .kol-popover-button--open + .kol-popover {
    opacity: 1;
  }
  .kol-table .kol-icon {
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
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-table__cell--actions .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-table__cell--actions .kol-button__button, .kol-table__cell--actions .kol-button__anchor {
    /* The user agent styles of <button> do not inherit font and color. */
    color: inherit;
    display: flex;
    min-height: var(--a11y-min-size);
    flex: 1;
    align-items: stretch;
    font: inherit;
    text-decoration-line: none;
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
  .kol-table__cell--actions .kol-link__anchor, .kol-table__cell--actions .kol-link__button {
    display: inline-flex;
    flex: 1;
    align-items: baseline;
    place-items: center;
    text-align: left;
    text-decoration-line: none;
  }
  .kol-table__cell--actions .kol-link__anchor .kol-span__label, .kol-table__cell--actions .kol-link__button .kol-span__label {
    text-decoration-line: underline;
  }
  .kol-table__cell--actions .kol-link__anchor:focus:not([aria-disabled], [disabled]) .kol-span__label, .kol-table__cell--actions .kol-link__anchor:hover:not([aria-disabled], [disabled]) .kol-span__label, .kol-table__cell--actions .kol-link__button:focus:not([aria-disabled], [disabled]) .kol-span__label, .kol-table__cell--actions .kol-link__button:hover:not([aria-disabled], [disabled]) .kol-span__label {
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
}`,s=class{constructor(e){r(this,e),this.resolvedElements=[]}validateAriaLabelledby(e){this.syncExternalLabel(e)}syncExternalLabel(e){this.resolvedElements=a(this,this.host,this.internals,e)}componentWillLoad(){this.internals=i(this.host),this.syncExternalLabel(this._ariaLabelledby)}componentDidLoad(){this.resolvedElements.length||this.syncExternalLabel(this._ariaLabelledby)}render(){return n(t,{key:`4b6a656b4332e8304e79183b3efe515da90169f4`,externalLabelElements:this.resolvedElements,_data:this._data,_dataFoot:this._dataFoot,_fixedCols:this._fixedCols,_headerCells:this._headerCells,_label:this._label,_on:this._on,_selection:this._selection,_hasSettingsMenu:this._hasSettingsMenu,_variant:this._variant})}get host(){return e(this)}static get watchers(){return{_ariaLabelledby:[`validateAriaLabelledby`]}}};s.style={default:o};export{s as kol_table_stateless};