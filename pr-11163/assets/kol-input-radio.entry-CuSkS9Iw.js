import{c as e,l as t,r as n,s as r}from"./index-DV_vNR-B-DxIQzfGg.js";import{n as i}from"./behavior-5nsC32-N-CYkZq2OV.js";import{i as a}from"./index-DAnB1tWP.js";import{n as o,t as s}from"./dev.utils-DgQPAJ26-CZEaaHnG.js";import{t as c}from"./base-web-component--IgFgz37-CZuvR3uB.js";import{n as l}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{i as u}from"./variant-quote-DmzRsnzD-CAdq5bdv.js";import"./disabled-B26LJHxI-DWSN0qt-.js";import"./label-Dy-7YmYn-CXC15mFA.js";import"./label-BPihMGVv-RVoCzK_G.js";import{t as d}from"./clsx-COFh-Vc8-DWAop4cA.js";import"./Heading-rq3v16Pi-D398QkQl.js";import{n as f,t as p}from"./element-focus-Cp994Rrk-BCxGGpIg.js";import{n as m,t as h}from"./element-click-CCljCb-a-Bw1_18r4.js";import"./block-bem-gun2P2cG-CYlIbYa4.js";import"./component-DJmrMcFg-Bo10kFIE.js";import"./component-Ds0CcgaQ-Cu6CLLxZ.js";import"./i18n-BLDJ1L3N-Tutis4l3.js";import{t as g}from"./component-Darm8SYF-CL9VjUfh.js";import"./component-Czx6mtYU-Dig-eTX9.js";import"./component-B7WJagf9-C1i4m2BF.js";import"./component-CPn0ol8Q-D1r7oGrX.js";import"./component-CttRGYdK-l0XXWrST.js";import"./align-CzS4vEuu-BJ_gyPy-.js";import"./label-with-expert-slot-BFL5oAGR-D3-bs2jD.js";import{n as _}from"./variant-MtBnQQId-jC8ONb8v.js";import"./tooltip-align-BwjjZ873-DYs4Cd_w.js";import"./name-DvtPSLMe-C8Ft1L3S.js";import"./behavior-ai6VR4ZM-O-SwPPDA.js";import{n as v}from"./controller-DpLkFTNm-DHeKUFlT.js";import{i as y,o as b,t as x}from"./component-uAvXCCc6-E4UfbfGK.js";import{n as S,t as C}from"./api-Jj3KTuZt-C88cFlZW.js";import{t as w}from"./required-B0U5CrLr-DcS_egyx.js";import{t as T}from"./input-BgUZVtv8-BfFYqgP-.js";import{n as E,t as D}from"./field-control-DzkDny3E-r1-sOcvM.js";import{n as O,t as k}from"./options-B0rBHetL-BwxiS_20.js";import{n as A}from"./radio-options-CubzKUEy-DPxdDaMF.js";import{t as j}from"./orientation-D1m1Opl4-IJXE2-4U.js";var M=u(`orientation`,`vertical`,j),N=u(`value`,null,e=>Array.isArray(e)?e[0]:e),P=a.forBlock(`kol-input-radio`),F=t=>{var{class:n,inputProps:r}=t,i=l(t,[`class`,`inputProps`]);let{class:a}=r,o=l(r,[`class`]);return e(g,Object.assign({component:`label`,block:`kol-input-radio`,modifiers:Object.assign({checked:!!r.checked,disabled:!!r.disabled,required:!!r.required,touched:!!r.touched},b(r.msg,r.touched)?{[y(r.msg)]:!0}:{}),class:n},i),e(T,Object.assign({class:d(P(`input`),a)},o,{type:`radio`})))},I={required:[...S.required],optional:[...S.optional,A,M,N,w,_]},L=`@charset "UTF-8";
/* forward the rem function */
/*
 * Guards an interaction rule (\`:hover\`, \`:active\`, \`:focus…\`) against the disabled state.
 *
 * Two shapes are needed because the disabled marker sits on different elements: a native control
 * carries \`disabled\`, an anchor or summary carries \`aria-disabled\`, and a BEM wrapper carries a
 * \`--disabled\` modifier while its inner control carries the attribute.
 */
/* Wrapper variant: asks the interactive element inside, which is where the attribute lives. */
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
* 6. kol-forced-colors - Defaults for forced colors and high contrast modes
* 7. kol-theme-forced-colors - Theme-specific styles for forced colors and high contrast modes
*/
@layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;
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
/*
 * This file contains all rules for forced-colors and highcontrast modes
 * https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/system-color to see all color keywords the browsers are providing
 */
@layer kol-forced-colors {
  @media (forced-colors: active) {
    .kol-button__text {
      color: ButtonText;
      background-color: ButtonFace;
      border: 2px solid ButtonBorder;
    }
    .kol-button--disabled .kol-button__text {
      color: GrayText;
      border-color: GrayText;
    }
    /*
     * Forced colors drop author colors, so the only way a disabled control still reads as
     * disabled is the \`GrayText\` system color. \`kol-button\` had it; the controls whose disabled
     * state is \`aria-disabled\` (anchor, summary) and the native form controls did not.
     */
    .kol-link__interactive-element[aria-disabled=true],
    .kol-accordion__heading[aria-disabled=true],
    .kol-details__heading[aria-disabled=true] {
      color: GrayText;
    }
    .kol-link__interactive-element[aria-disabled=true] .kol-icon,
    .kol-link__interactive-element[aria-disabled=true] .kol-span__label,
    .kol-accordion__heading[aria-disabled=true] .kol-icon,
    .kol-accordion__heading[aria-disabled=true] .kol-span__label,
    .kol-details__heading[aria-disabled=true] .kol-icon,
    .kol-details__heading[aria-disabled=true] .kol-span__label {
      color: GrayText;
    }
    input:disabled,
    select:disabled,
    textarea:disabled {
      color: GrayText;
      border-color: GrayText;
    }
    .kol-card,
    .kol-dialog,
    .kol-modal,
    .kol-drawer {
      color: CanvasText;
      background-color: Canvas;
      border: 1px solid ButtonBorder;
    }
    .kol-pagination__button--selected .kol-button {
      opacity: 1;
    }
    .kol-pagination__button--selected .kol-button__text {
      color: SelectedItemText;
      background-color: SelectedItem;
    }
    /* focus styles */
    .kol-button__interactive-element:focus-visible,
    .kol-link__interactive-element:focus-visible {
      outline: 2px solid Highlight;
      outline-offset: 2px;
    }
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
  src: url("kolicons.eot?t=1790969078222"); /* IE9*/
  src: url("kolicons.eot?t=1790969078222#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1790969078222") format("woff2"), url("kolicons.woff?t=1790969078222") format("woff"), url("kolicons.ttf?t=1790969078222") format("truetype"), url("kolicons.svg?t=1790969078222#kolicons") format("svg"); /* iOS 4.1- */
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
  .kolicon-pin-pinned::before {
    content: "\\ea15";
  }
  .kolicon-pin-unpinned::before {
    content: "\\ea16";
  }
  .kolicon-plus::before {
    content: "\\ea17";
  }
  .kolicon-settings::before {
    content: "\\ea18";
  }
  .kolicon-sort-asc::before {
    content: "\\ea19";
  }
  .kolicon-sort-desc::before {
    content: "\\ea1a";
  }
  .kolicon-sort-neutral::before {
    content: "\\ea1b";
  }
  .kolicon-up::before {
    content: "\\ea1c";
  }
  .kolicon-version::before {
    content: "\\ea1d";
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
 * Button styles for a skeleton block whose interactive element sits inside the BEM root:
 * \`kol-button\` renders \`<div class="kol-button"><button class="kol-button__interactive-element">\`,
 * \`kol-link\` renders \`<div class="kol-link"><a class="kol-link__interactive-element">\`.
 *
 * Overlaps with \`kol-button-wc-box-styles\` below: both target the block class itself and disagree
 * on \`display\` and \`text-align\`. A stylesheet that includes both therefore depends on order or
 * specificity — today that only happens where the caller nests one of them (e.g. \`_alert.mixin\`
 * nests this one under \`.kol-alert\`, which wins). Include only one per block unless the nesting
 * makes the winner explicit.
 */
/*
 * Minimal box replication for trees that do not include \`kol-button-styles\` but render
 * \`kol-button-wc\` (transitional light-DOM output). Before the skeleton migration the button
 * element itself carried the \`kol-button\` class, so the \`kol-global\` reset
 * (\`background\`, \`width\`, \`margin\`, \`padding\`, \`border\`) and the a11y layer \`min-height\`/
 * \`min-width\` applied to it, on top of the UA \`inline-block\`. The wrapper div now carries the
 * class but receives none of that automatically, so this mixin replicates the exact outer box,
 * while the inner \`kol-button__interactive-element\` degrades to a plain block container to avoid
 * the inline-level baseline gap the UA \`inline-block\` would add below it.
 *
 * Mutually exclusive with \`kol-button-styles\` above — see the collision note there.
 */
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
    text-decoration-line: none;
    /* The interactive element is the flex container positioning the text, so it carries the
       box the root element used to be. The UA default underline sits on that element too,
       so suppressing \`text-decoration\` on the wrapper alone is not enough. */
  }
  .kol-alert .kol-button__interactive-element {
    display: flex;
    flex: 1;
    text-align: left;
    text-decoration-line: none;
    /* A flex container only exposes a baseline if it has an in-flow text box to derive one
       from; without it the surrounding inline formatting context falls back to the bottom
       margin edge and everything after the element shifts by 1px. The zero-width space
       supplies that box. Measured, not assumed: removing it turns \`popover-button/inline\`
       and \`input-file/basic\` red against the develop baseline (the box grows 179→180px). */
  }
  .kol-alert .kol-button__interactive-element::before {
    content: "​";
  }
  .kol-alert .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-alert .kol-button {
    /* The tooltip wrapper holds only the absolutely positioned floating tooltip. In the legacy
       DOM it sat in a block flow and collapsed to zero height; as a flex/grid item it would
       stretch to the container height instead, adding phantom rows to the layout. */
  }
  .kol-alert .kol-button__tooltip {
    height: 0;
  }
  .kol-alert .kol-button--external-link > .kolicon-link-external::before {
    content: none;
  }
  .kol-alert .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {
    content: none;
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
  .kol-field-control {
    display: grid;
    min-height: var(--a11y-min-size);
    align-items: center;
    justify-content: left;
    grid-template-areas: "input label";
    grid-template-columns: auto 1fr;
    grid-template-rows: auto;
  }
  .kol-field-control:has(.kol-field-control__hint) {
    grid-template-areas: "input label" "hint hint";
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
  }
  .kol-field-control--label-align-left:not(.kol-field-control--hide-label) {
    grid-template-areas: "label input";
    grid-template-columns: 1fr auto;
    grid-template-rows: auto;
  }
  .kol-field-control--label-align-left:not(.kol-field-control--hide-label):has(.kol-field-control__hint) {
    grid-template-areas: "label input" "hint hint";
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
  }
  .kol-field-control__input {
    display: flex;
    min-height: var(--a11y-min-size);
    align-items: center;
    grid-area: input;
  }
  .kol-field-control__label {
    display: flex;
    min-height: var(--a11y-min-size);
    flex-grow: 1;
    align-items: center;
    cursor: pointer;
    grid-area: label;
  }
  .kol-field-control__label--visually-hidden {
    display: none;
    height: 0;
    margin: 0;
    padding: 0;
    visibility: hidden;
  }
  .kol-field-control__label-text {
    flex-flow: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .kol-field-control__hint {
    grid-area: hint;
  }
  .kol-field-control--disabled .kol-field-control__label {
    cursor: not-allowed;
  }
  .kol-field-control--required .kol-field-control__label-text:has(.kol-span__slot[hidden])::after,
  .kol-field-control--required .kol-field-control .kol-tooltip__content .kol-span__label::after {
    content: "*"/"";
  }
  .kol-form-field .kol-popover-button {
    /*
     * The predecessor rendered this box as an unstyled (inline) custom element host; keep the
     * inline display so the flow layout around the embedded button stays unchanged.
     */
    display: inline;
  }
  .kol-form-field .kol-popover-button__popover {
    margin: 0;
    padding: 0;
    border: 0;
  }
  .kol-form-field .kol-popover-button--open .kol-button__tooltip {
    display: none;
  }
  .kol-form-field .kol-popover-button--inline {
    display: inline-block;
    /* The size exemption has to cover both the BEM root div and the inner interactive element:
       the a11y layer pins every \`button\` to 44×44, so the inner \`kol-button__interactive-element\`
       needs the override as well — the root alone used to be the button before the skeleton migration. */
  }
  .kol-form-field .kol-popover-button--inline .kol-button,
  .kol-form-field .kol-popover-button--inline .kol-button .kol-button__interactive-element {
    min-width: 0;
    min-height: 1em;
  }
  .kol-form-field .kol-popover {
    opacity: 0;
    transition: 0.2s ease-out opacity;
  }
  .kol-form-field .kol-popover-button--open .kol-popover-button__popover {
    opacity: 1;
  }
  .kol-form-field {
    display: grid;
  }
  .kol-form-field:not(.kol-form-field--disabled) .kol-form-field__label {
    cursor: pointer;
  }
  .kol-form-field__label {
    display: flex;
  }
  .kol-form-field__label-text {
    flex-flow: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .kol-form-field--required .kol-form-field__label-text:has(.kol-span__slot[hidden]) .kol-span__label::after,
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
    place-items: center;
  }
  .kol-form-field {
    --border-width: 2px;
    --input-size: 1.5em;
  }
  .kol-form-field__label {
    display: contents;
  }
  .kol-form-field__label-text {
    display: ruby;
  }
  .kol-form-field__input {
    display: flex;
    flex-direction: column;
  }
  .kol-form-field__input--orientation-horizontal {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
  }
  .kol-form-field--disabled {
    opacity: unset;
  }
  .kol-input-radio {
    display: flex;
    position: relative;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .kol-input-radio__input {
    border-style: solid;
    border-radius: 100%;
    display: flex;
    width: var(--input-size);
    min-width: var(--input-size);
    height: var(--input-size);
    min-height: var(--input-size);
    margin: 0;
    padding: 0;
    border-width: var(--border-width);
    appearance: none;
    cursor: pointer;
  }
  .kol-input-radio__input:before {
    border-radius: 100%;
    width: calc(var(--input-size) / 2);
    height: calc(var(--input-size) / 2);
    margin: auto;
    content: "";
  }
  .kol-input-radio__input:checked:before {
    background-color: black;
  }
  @media (forced-colors: active) {
    .kol-input-radio__input:checked:before {
      /* Give it a visible background in forced colors mode */
      background-color: selectedItem !important;
    }
  }
  .kol-input-radio__input:disabled {
    cursor: not-allowed;
  }
  .kol-input-radio--disabled {
    cursor: not-allowed;
  }
}`,R=class extends C{constructor(e){super(),t(this,e),this.id=o(`input-radio`),this.inputHasFocus=!1,this.inputRefs=new Map,this.keyOptionMap=new Map,this.optionTooltips=new Map,this.setSelectedInputRef=e=>{this.inputRef=e},this.setOptionInputRef=e=>t=>{t?this.inputRefs.set(e,t):this.inputRefs.delete(e)},this.handleRadioInput=e=>{let t=this.getOptionOfEvent(e);t!==void 0&&this.handleInput(e,t.value)},this.handleRadioChange=e=>{let t=this.getOptionOfEvent(e);t!==void 0&&(this.handleChange(e,t.value),this._value=t.value)},this.handleRadioKeyDown=e=>{this.handleKeyDown(e),(e.code===`Enter`||e.code===`NumpadEnter`)&&v({form:this.host})},this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._orientation=`vertical`,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this._value=null,this.initFormAssociation(`radio`,this._name)}async getValue(){return this._value}async focus(e){let t=this.getFocusableInput();return p(this.host,()=>f(t,e))}async click(){return h(this.host,async()=>m(this.inputRef))}getFocusableInput(){let e=this.getRenderProp(`options`),t=!!this.getRenderProp(`disabled`),n=this.getRenderProp(`value`),r=e.findIndex(e=>e.value===n&&!t&&!e.disabled);if(r!==-1){let e=this.inputRefs.get(r);if(e)return e}let i=e.findIndex(e=>!t&&!e.disabled);if(i!==-1)return this.inputRefs.get(i)}componentWillLoad(){this.initRenderProps(I),this._touched=this._touched===!0,this.watchAriaDetails(this._ariaDetails),this.watchName(this._name),this.watchSyncValueBySelector(this._syncValueBySelector),this.watchTouched(this._touched),this.watchMsg(this._msg),this.watchDisabled(this._disabled),this.watchHideMsg(this._hideMsg),this.watchHideLabel(this._hideLabel),this.watchHint(this._hint),this.watchInfoPopover(this._infoPopover),this.watchLabel(this._label),this.watchOn(this._on),this.watchTooltipAlign(this._tooltipAlign),this.watchVariant(this._variant),this.watchRequired(this._required),this.watchOrientation(this._orientation),this.watchOptions(this._options),this.watchValue(this._value)}disconnectedCallback(){this.destroyFormField(),this.optionTooltips.forEach(e=>e.destroy()),this.optionTooltips.clear()}getOptionOfEvent(e){return e.target instanceof HTMLInputElement?this.keyOptionMap.get(e.target.value):void 0}getOptionTooltipRefs(e,t){let n=this.optionTooltips.get(e);E({hideLabel:this.getRenderProp(`hideLabel`),label:t})?(n||(n=new i(c.stateLess),n.componentWillLoad({label:``}),this.optionTooltips.set(e,n)),n.watchAlign(this.getRenderProp(`tooltipAlign`)),n.watchBadgeText(``),n.watchId(s(e,`label`)),n.watchLabel(t)):n&&=(n.destroy(),this.optionTooltips.delete(e),void 0);let r=n;return{refInput:e=>{r&&e&&(r.initContext(e),r.syncListeners(void 0,e,!0))},refTooltip:e=>{r?.setTooltipElementRef(e)}}}isOptionDisabled(e){return!!this.getRenderProp(`disabled`)||!!e.disabled}getInputProps(e,t,n,r){let{hasError:i}=this.getAria(),a=this.getRenderProp(`hideLabel`);return{id:t,hideLabel:a,label:this.getRenderProp(`label`),value:`-${n}`,disabled:this.isOptionDisabled(e),name:this.getRenderProp(`name`)||this.id,required:this.getRenderProp(`required`),touched:this.getRenderProp(`touched`),msg:this.getRenderProp(`msg`),ref:e=>{this.setOptionInputRef(n)(e),r&&this.setSelectedInputRef(e)},"aria-label":a&&typeof e.label==`string`?e.label:void 0,type:`radio`,checked:r,onBlur:this.handleBlur,onChange:this.handleRadioChange,onFocus:this.handleFocus,onInput:this.handleRadioInput,onKeyDown:this.handleRadioKeyDown,"aria-invalid":i?`true`:void 0}}renderOption(t,n){let r=s(this.id,String(n)),i=this.getRenderProp(`value`)===t.value,a=t.label;return e(D,Object.assign({key:r,id:r,label:a,hint:t.hint,hideLabel:this.getRenderProp(`hideLabel`),tooltipAlign:this.getRenderProp(`tooltipAlign`),disabled:this.isOptionDisabled(t),msg:this.getRenderProp(`msg`),touched:this.getRenderProp(`touched`),required:!1,labelProps:{showBadge:!1}},this.getOptionTooltipRefs(r,a)),e(F,{inputProps:this.getInputProps(t,r,n,i)}))}render(){let{ariaDescribedBy:t}=this.getAria();return e(n,{key:`fcded14f51b362b74a2b28c324beacc5c29b7519`},e(x,Object.assign({key:`48e536a933f89c9b2182bee5272225e25f4a8b42`},this.getFormFieldProps({class:`kol-form-field--radio`,required:this.getRenderProp(`required`),variant:this.getRenderProp(`variant`),renderNoTooltip:!0}),{component:`fieldset`,orientation:this.getRenderProp(`orientation`),hideLabel:!1,ariaDescribedBy:t.length>0?t.join(` `):void 0}),this.getRenderProp(`options`).map((e,t)=>this.renderOption(e,t))))}watchAriaDetails(e){this.applyAriaDetails(e)}watchDisabled(e){this.applyDisabled(e)}watchHideMsg(e){this.applyHideMsg(e)}watchHideLabel(e){this.applyHideLabel(e)}watchHint(e){this.applyHint(e)}watchInfoPopover(e){this.applyInfoPopover(e)}watchLabel(e){this.applyLabel(e)}watchMsg(e){this.applyMsg(e)}watchName(e){this.applyName(e)}watchOn(e){this.applyOn(e)}watchOptions(e){A.apply(e,e=>{this.setRenderProp(`options`,e),e.length>0&&(this.keyOptionMap.clear(),k(this.keyOptionMap,O(e)))})}watchOrientation(e){M.apply(e,e=>this.setRenderProp(`orientation`,e))}watchRequired(e){w.apply(e,e=>this.setRenderProp(`required`,e))}watchSyncValueBySelector(e){this.applySyncValueBySelector(e)}watchTooltipAlign(e){this.applyTooltipAlign(e)}watchTouched(e){this.applyTouched(e)}watchValue(e){e==null?this.setRenderProp(`value`,e):N.apply(e,e=>this.setRenderProp(`value`,e)),this.formAssociation.setFormAssociatedValue(this.getRenderProp(`value`))}watchVariant(e){_.apply(e,e=>this.setRenderProp(`variant`,e))}get host(){return r(this)}static get watchers(){return{_ariaDetails:[`watchAriaDetails`],_disabled:[`watchDisabled`],_hideMsg:[`watchHideMsg`],_hideLabel:[`watchHideLabel`],_hint:[`watchHint`],_infoPopover:[`watchInfoPopover`],_label:[`watchLabel`],_msg:[`watchMsg`],_name:[`watchName`],_on:[`watchOn`],_options:[`watchOptions`],_orientation:[`watchOrientation`],_required:[`watchRequired`],_syncValueBySelector:[`watchSyncValueBySelector`],_tooltipAlign:[`watchTooltipAlign`],_touched:[`watchTouched`],_value:[`watchValue`],_variant:[`watchVariant`]}}};R.style={default:L};export{R as kol_input_radio};