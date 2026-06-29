import{D as e,Tt as t,Y as n,a as r,d as i,f as a,ft as o,j as s,kt as c,mt as l,o as u,q as d,r as f,s as p,xt as m}from"./index-_kOwltdh.js";import{r as h}from"./label-BRWfnFOs-qERYq4kj.js";import{t as g}from"./i18n-Apwu2-qw-CGfUrMKq.js";import{t as _}from"./aria-labelledby-6-ki3akM-C6lJ0lQF.js";import{t as v}from"./aria-labelledby-mJ17Cl5c-d2MoQ4P9.js";import{a as y,i as b,n as x,o as S,s as C,t as w}from"./table-selection-5GZ5QkoT-BxClA5E_.js";import{t as T}from"./keyboard-DNd73LVa-BCj4IeP3.js";var E=(e,n,r={})=>{t(e,`_allowMultiSort`,n,Object.assign({defaultValue:!1},r))},D=[`top`,`bottom`,`both`],O=(e,t)=>{c(e,`_paginationPosition`,e=>typeof e==`string`&&D.includes(e),new Set([`PaginationPositionPropType {${D.join(`, `)}`]),t,{defaultValue:`bottom`})},k=`@charset "UTF-8";
@layer kol-component {
  :host {
    display: block;
  }
}
/* forward the rem function */
@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1782731029826"); /* IE9*/
  src: url("kolicons.eot?t=1782731029826#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1782731029826") format("woff2"), url("kolicons.woff?t=1782731029826") format("woff"), url("kolicons.ttf?t=1782731029826") format("truetype"), url("kolicons.svg?t=1782731029826#kolicons") format("svg"); /* iOS 4.1- */
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
    color: black;
    background-color: white;
    /*
     * Verdana is an accessible font that can be used without requiring additional loading time.
     */
    font-family: Verdana;
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
  a,
  button {
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
    color: inherit;
    display: flex;
    min-height: var(--a11y-min-size);
    flex: 1;
    align-items: stretch;
    /* The user agent styles of <button> do not inherit font and color. */
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
    color: inherit;
    display: flex;
    min-height: var(--a11y-min-size);
    flex: 1;
    align-items: stretch;
    /* The user agent styles of <button> do not inherit font and color. */
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
    color: inherit;
    display: flex;
    min-height: var(--a11y-min-size);
    flex: 1;
    align-items: stretch;
    /* The user agent styles of <button> do not inherit font and color. */
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
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-alert .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-alert .kol-button__button, .kol-alert .kol-button__anchor {
    color: inherit;
    display: flex;
    min-height: var(--a11y-min-size);
    flex: 1;
    align-items: stretch;
    /* The user agent styles of <button> do not inherit font and color. */
    font: inherit;
    text-decoration-line: none;
  }
  .kol-alert .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-alert {
    display: grid;
  }
  .kol-alert__container {
    display: flex;
    place-items: center;
  }
  .kol-alert__container-content {
    flex-grow: 1;
  }
  .kol-alert__closer {
    /* Visible with forced colors */
    outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));
  }
  .kol-form-field {
    display: grid;
  }
  .kol-form-field:not(.kol-form-field--disabled) .kol-form-field__label {
    cursor: pointer;
  }
  .kol-form-field__label-text {
    flex-flow: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .kol-form-field--required .kol-form-field__label-text:has(.kol-span__slot[hidden])::after,
  .kol-form-field--required .kol-form-field .kol-tooltip__content .kol-span__label::after {
    content: "*"/"";
  }
  .kol-input-container {
    background-color: transparent;
    display: grid;
    position: relative;
    width: 100%;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: center;
    grid-template-columns: 1fr;
  }
  .kol-input-container:has(> .kol-input-container__adornment--start) {
    grid-template-columns: auto 1fr auto;
  }
  .kol-input-container__container {
    position: relative;
    z-index: 1;
  }
  .kol-input-container__adornment {
    display: flex;
    align-items: center;
  }
  .kol-input-container__adornment .kol-icon {
    display: grid;
    min-height: var(--a11y-min-size);
    place-items: center;
  }
  .kol-select {
    background-color: transparent;
    width: 100%;
    padding: 0;
  }
  .kol-select:not(:disabled) {
    cursor: pointer;
  }
  .kol-select:not([multiple], [size]) {
    height: 2.75em;
  }
  .kol-select:focus {
    outline: none;
  }
  .kol-select__option:checked::before {
    content: "✓ ";
  }
  .kol-select[multiple] option {
    display: flex;
    min-height: var(--a11y-min-size);
    align-items: center;
  }
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-pagination {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    container: paging/inline-size;
  }
  .kol-pagination__navigation-list {
    display: inline-flex;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
    align-items: center;
    list-style: none;
  }
  .kol-pagination__separator:before {
    content: "•••";
  }
  .kol-pagination__page-size-select .kol-form-field-select {
    align-items: center;
    grid-template-columns: 1fr max-content;
  }
  @container paging (width < 600px) {
    .kol-pagination:has(.kol-pagination__button--first) li:has(.kol-pagination__button--numbers),
    .kol-pagination:has(.kol-pagination__button--first) li:has(.kol-pagination__separator) {
      display: none;
    }
  }
}`,A=[10,20,50,100],j=e=>e===!0||e===``||typeof e==`object`&&!!e,M=class{constructor(e){p(this,e),this.resolvedElements=[],this.catchRef=e=>{this.tableWcRef=e},this.sortData=[],this.showPagination=!1,this.pageStartSlice=0,this.pageEndSlice=10,this.disableSort=!1,this._paginationPosition=`bottom`,this.state={_allowMultiSort:!1,_fixedCols:[0,0],_data:[],_dataFoot:[],_headers:{horizontal:[],vertical:[]},_label:``,_pagination:{_page:1,_pageSize:10,_max:0},_sortedData:[],_paginationPosition:`bottom`,_hasSettingsMenu:!1},this.handlePagination={onClick:(e,t)=>{typeof this.state._pagination._on?.onClick==`function`&&this.state._pagination._on.onClick(e,t),m(this,`_pagination`,Object.assign(Object.assign({},this.state._pagination),{_page:t}))},onChangePage:(e,t)=>{typeof this.state._pagination._on?.onChangePage==`function`&&this.state._pagination._on.onChangePage(e,t),m(this,`_pagination`,Object.assign(Object.assign({},this.state._pagination),{_page:t}))},onChangePageSize:(e,t)=>{typeof this.state._pagination._on?.onChangePageSize==`function`&&this.state._pagination._on.onChangePageSize(e,t),m(this,`_pagination`,Object.assign(Object.assign({},this.state._pagination),{_pageSize:t})),m(this,`_pageSize`,t)}},this.onSelectionChange=e=>{e.stopPropagation()},this.updateSortedData=()=>{if(this.disableSort){m(this,`_sortedData`,this.state._data);return}let e=[...this.state._data];this.sortData.length>0&&e.sort((e,t)=>{for(let n=0;n<this.sortData.length;n++){let r=this.sortData[n],i=r.compareFn(e,t,r.direction);if(i!==0)return r.direction===`ASC`?i:-i}return 0}),m(this,`_sortedData`,e)},this.handleChangeHeaderCells=e=>{this.adjustedHeaderCells=e}}validateAriaLabelledby(e){this.syncExternalLabel(e)}syncExternalLabel(e){this.resolvedElements=v(this,this.host,this.internals,e)}validateAllowMultiSort(e){E(this,e,{defaultValue:!1})}validateData(e){b(this,e,{afterPatch:()=>{setTimeout(this.updateSortedData)}})}validateDataFoot(e){y(this,e,{afterPatch:()=>{setTimeout(this.updateSortedData)}})}validateFixedCols(e){w(this,e)}validatePaginationPosition(e){O(this,e)}validateHasSettingsMenu(e){x(this,e)}changeCellSort(e){if(e.type===void 0||e.type==="default"){if(typeof e.compareFn!=`function`)return;!this.state._allowMultiSort&&e.key!==this.sortData[0]?.key&&(this.sortData=[]);let t=this.sortData.findIndex(t=>t.key===e.key);if(t>=0){let e=this.sortData[t];switch(e.direction){case`ASC`:e.direction=`DESC`;break;case`DESC`:this.sortData.splice(t,1);break;default:e.direction=`ASC`;break}}else e.key&&this.sortData.push({label:e.label,key:e.key,compareFn:e.compareFn,direction:`ASC`});this.updateSortedData()}}initializeSortFromHeaders(e){var t,n;let r=!1,i=e=>{this.sortData=[],e.forEach(e=>{if(e.type!==void 0&&e.type!=="default")return;if(typeof e.compareFn==`function`&&!e.key){d(`[KolTableStateful] A sortable column requires the 'key' property.`);return}let t=e.key;if(!t)return;let n=e.sortDirection;(n===`ASC`||n===`DESC`)&&typeof e.compareFn==`function`&&((this.state._allowMultiSort||this.sortData.length===0)&&this.sortData.push({label:e.label,key:t,compareFn:e.compareFn,direction:n}),r=!0)})};return(t=e.horizontal)==null||t.forEach(i),(n=e.vertical)==null||n.forEach(i),r}validateHeaders(e){n(e,()=>{o(e,()=>{try{e=l(e)}catch{}c(this,`_headers`,e=>typeof e==`object`&&!!e,new Set([`KoliBriTableHeaders`]),e,{hooks:{beforePatch:e=>{let t=e;this.headerKeysChanged(this.state._headers,t)&&(this.adjustedHeaderCells=void 0),this.initializeSortFromHeaders(t)&&setTimeout(()=>this.updateSortedData()),t.horizontal&&t.vertical&&t.horizontal?.length>0&&t.vertical?.length>0&&(this.disableSort=!0,d(`Table: You can not sort the table data, if horizontal and vertical headers are defined at the same time. (https://github.com/public-ui/kolibri/issues/2372)`))}}})})})}validateLabel(e){h(this,e,{required:!0})}validateSelection(e){S(this,e)}validateOn(e){C(this,e)}validatePagination(e){try{e=l(e)}catch{}this.showPagination=j(e),c(this,`_pagination`,j,new Set([`boolean`,`KoliBriTablePagination`]),e,{defaultValue:{_page:1,_pageSize:10,_max:0}})}componentDidLoad(){var e;(e=this.tableWcRef)==null||e.addEventListener(i.selectionChange,this.onSelectionChange),this.resolvedElements.length||this.syncExternalLabel(this._ariaLabelledby)}disconnectedCallback(){var e;(e=this.tableWcRef)==null||e.removeEventListener(i.selectionChange,this.onSelectionChange)}componentWillLoad(){this.internals=_(this.host),this.syncExternalLabel(this._ariaLabelledby),this.validateAllowMultiSort(this._allowMultiSort),this.validateData(this._data),this.validateDataFoot(this._dataFoot),this.validateFixedCols(this._fixedCols),this.validateHeaders(this._headers),this.validateLabel(this._label),this.validateOn(this._on),this.validatePagination(this._pagination),this.validatePaginationPosition(this._paginationPosition),this.validateSelection(this._selection),this.validateHasSettingsMenu(this._hasSettingsMenu)}selectDisplayedData(e,t,n){return typeof t==`number`&&t>0&&typeof n==`number`&&n>0?(this.pageStartSlice=t*(n-1),this.pageEndSlice=t*n>e.length?e.length:t*n,e.slice(this.pageStartSlice,this.pageEndSlice)):(this.pageStartSlice=0,this.pageEndSlice=e.length,e)}renderPagination(t){let n=g(`kol-table-pagination-label`,{placeholders:{label:`${this.state._label} (${g(`kol-pagination-position-${t}`)})`}});return u(`div`,{class:`kol-table-stateful__pagination kol-table-stateful__pagination--${this.state._paginationPosition}`},u(`div`,{class:`kol-table-stateful__pagination-wrapper`},u(e,{_boundaryCount:this.state._pagination._boundaryCount,_customClass:this.state._pagination._customClass,_hasButtons:this.state._pagination._hasButtons,_on:this.handlePagination,_page:this.state._pagination._page,_pageSize:this.state._pagination._pageSize,_pageSizeOptions:this.state._pagination._pageSizeOptions||A,_siblingCount:this.state._pagination._siblingCount,_tooltipAlign:`bottom`,_max:this.state._pagination._max||this.state._data.length,_label:n})))}getHeaderCellSortState(e){if(!(e.type!==void 0&&e.type!=="default")&&!this.disableSort&&typeof e.compareFn==`function`){if(e.key){let t=this.sortData.find(t=>t.key===e.key);if(t?.direction)return t.direction}return`NOS`}}getHeaderCellSortOrder(e){if(!(e.type!==void 0&&e.type!=="default")&&!this.disableSort&&this.state._allowMultiSort&&typeof e.compareFn==`function`&&e.key){let t=this.sortData.findIndex(t=>t.key===e.key);if(t>=0)return t+1}}handleSort({key:e}){let t=this.state._headers.horizontal??[],n=this.state._headers.vertical??[],r=[];for(let e of t)Array.isArray(e)&&r.push(...e);for(let e of n)Array.isArray(e)&&r.push(...e);let i=r.find(t=>t.key===e);i&&this.changeCellSort(i)}getSelectedData(e){let t=this.state._selection;if(t){let n=t.keyPropertyName??`id`,r=new Set(e.map(String)),i=this.state._sortedData.filter(e=>r.has(String(e[n])));if(n)return i}return null}handleSelectionChange(e,t){let n=this.state._selection;n&&(this.state=Object.assign(Object.assign({},this.state),{_selection:Object.assign(Object.assign({},n),{selectedKeys:t})}));let r=this.getSelectedData(t);typeof this.state._on?.[T.onSelectionChange]==`function`&&this.state._on[T.onSelectionChange](e,r),this.host&&a(this.host,i.selectionChange,r)}async getSelection(){let e=this.state._selection?.selectedKeys||[];return this.getSelectedData(e)}async resetSort(){this.initializeSortFromHeaders(this.state._headers),this.updateSortedData()}headerKeysChanged(e,t){let n=e=>[...e.horizontal?.flatMap(e=>e.map(e=>e?.key).filter(e=>!!e))??[],...e.vertical?.flatMap(e=>e.map(e=>e?.key).filter(e=>!!e))??[]],r=n(e),i=n(t);return r.length!==i.length||r.some((e,t)=>e!==i[t])}mergeAdjustedHeaderCells(e){var t;let n=new Map;return(t=this.state._headers.horizontal)==null||t.forEach(e=>e.forEach(e=>{e?.key&&n.set(e.key,e)})),e.map(e=>e.map(e=>{let t=e?.key?n.get(e.key):void 0;if(!t)return e;let r=Object.assign({},t);return e.visible!==void 0&&(r.visible=e.visible),e.width!==void 0&&(r.width=e.width),e.hidable!==void 0&&(r.hidable=e.hidable),e.sortable!==void 0&&(r.sortable=e.sortable),e.resizable!==void 0&&(r.resizable=e.resizable),r}))}buildHeaderCells(){let e=e=>e&&Object.assign(Object.assign({},e),{sortDirection:this.getHeaderCellSortState(e),sortOrder:this.getHeaderCellSortOrder(e)});return{horizontal:(this.adjustedHeaderCells?.horizontal?this.mergeAdjustedHeaderCells(this.adjustedHeaderCells.horizontal):this.state._headers.horizontal)?.map(t=>t.map(e))??[],vertical:this.state._headers.vertical?.map(t=>t.map(e))??[]}}render(){let e=this.selectDisplayedData(this.state._sortedData,this.showPagination?this.state._pagination?._pageSize??10:this.state._sortedData.length,this.state._pagination._page||1),t=this._paginationPosition===`top`||this._paginationPosition===`both`?this.renderPagination(`top`):null,n=this._paginationPosition===`bottom`||this._paginationPosition===`both`?this.renderPagination(`bottom`):null,r=this.buildHeaderCells();return u(f,{key:`664ef96edade6554e948f47d78f11eeaacedb21a`,class:`kol-table-stateful`},this.pageEndSlice>0&&this.showPagination&&t,u(s,{key:`76337e74f6bc1ec3cb8f625b5cbacdacf29a0cb3`,externalLabelElements:this.resolvedElements,ref:this.catchRef,_data:e,_fixedCols:this._fixedCols,_headerCells:r,_label:this.state._label,_dataFoot:this.state._dataFoot,_on:{onSort:(e,t)=>{this.handleSort(t)},onSelectionChange:(e,t)=>{this.handleSelectionChange(e,t)},onChangeHeaderCells:(e,t)=>{this.handleChangeHeaderCells(t)}},_selection:this.state._selection,_hasSettingsMenu:this.state._hasSettingsMenu,_variant:this._variant}),this.pageEndSlice>0&&this.showPagination&&n)}get host(){return r(this)}static get watchers(){return{_ariaLabelledby:[`validateAriaLabelledby`],_allowMultiSort:[`validateAllowMultiSort`],_data:[`validateData`],_dataFoot:[`validateDataFoot`],_fixedCols:[`validateFixedCols`],_paginationPosition:[`validatePaginationPosition`],_hasSettingsMenu:[`validateHasSettingsMenu`],_headers:[`validateHeaders`],_label:[`validateLabel`],_selection:[`validateSelection`],_on:[`validateOn`],_pagination:[`validatePagination`]}}};M.style={default:k};export{M as kol_table_stateful};