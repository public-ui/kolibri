import{c as e,l as t,r as n,s as r}from"./index-ddT6yPtN-CTkJxMVm.js";import"./behavior-zIhB5oFQ-DdhQxlU8.js";import{d as i,n as a,t as o}from"./index-Bc4ENvYG.js";import{n as s,t as c}from"./dev.utils-kY9J_Fm1-CtBD0Xfc.js";import"./base-web-component--IgFgz37-CZuvR3uB.js";import{t as l}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import"./variant-quote-Gc0A8qsV-BSPF_t3D.js";import"./disabled-DKC-Met1-Z27F2-hK.js";import"./label-C9vjVnaf-T8rtiawL.js";import"./label-C0O-Kx87-eeYN6Jto.js";import{t as u}from"./clsx-COFh-Vc8-DWAop4cA.js";import"./Heading-mvnvpMTi-DCqN1M8_.js";import{n as d,r as f,t as p}from"./element-interaction-DkGO5I_0-CYEJb_Yf.js";import"./block-bem-qz-U17Vn-D4oJRPRj.js";import{t as m}from"./component-BjKcR-WL-giq_Ayqk.js";import"./component-CXZ65JNq-SCScsOdD.js";import{t as h}from"./i18n-CTjC8AeY-D2HWxztV.js";import"./component-CuYr0xKR-BtCJke0Y.js";import"./variant-class-name-9Lb1ovMF-BQlPoZWW.js";import"./component-BiYEzoS6-BYk_GaB9.js";import"./component-C42m4a4M-Cb2fl3dH.js";import"./component-C4AR8veX-CVFIGcTH.js";import"./component-CFAP1XDA-OfWJ9xMd.js";import"./align-DZjqP6rP-C8GqxSrC.js";import"./label-with-expert-slot-BsAteOda-BTgfapRO.js";import{n as g}from"./variant-B_RJsB4Z-mKLvKI1r.js";import{n as _,t as v}from"./short-key-Dyjf9B3n-CqcEw--R.js";import"./tooltip-align-Dp-n2Nbz-Chi9CqMC.js";import"./name-CnF-gOHj-CQCxIF91.js";import{t as y}from"./access-and-short-key-ijzCZfHm-Dx5Q-CAn.js";import"./behavior-Dinr41v_-B-gN1f-C.js";import{t as b}from"./component-D6zIczJ7-DrS5bys8.js";import{n as x}from"./api-Bqes1k55-Y7As4sb2.js";import{i as S,n as C,r as w,t as T}from"./base-web-component-Cmqm7i1U-sJD5NPFI.js";import{n as E,r as D}from"./adornments-DMmtEmwd-LJ4baUE-.js";import{t as O}from"./placeholder-6mgA__v8-DM1VqO_t.js";import{t as k}from"./required-Bthxak_P--gLf3TWz.js";import{t as A}from"./suggestions-8tLBIlbM-RBRhQSGW.js";import{t as j}from"./value-string-CKVPXmWh-x5Ej7hZd.js";import{t as M}from"./input-DiPieLnq-DKFtYOm2.js";import{t as N}from"./input-container-Vk4LYfG_-X5t265cb.js";var P={required:[...x.required,A],optional:[...x.optional,v,S,D,O,k,_,j,g]},F=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1790962193948"); /* IE9*/
  src: url("kolicons.eot?t=1790962193948#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1790962193948") format("woff2"), url("kolicons.woff?t=1790962193948") format("woff"), url("kolicons.ttf?t=1790962193948") format("truetype"), url("kolicons.svg?t=1790962193948#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-custom-suggestions-option {
    line-height: 1.5;
    white-space: normal;
    overflow-wrap: break-word;
    /* The \`not-allowed\` reset for disabled controls lives in \`kol-global\`, which loses to
       \`kol-component\` whatever the specificity (see \`_layer-order.scss\`). An unguarded pointer
       therefore wins and makes a dead option look selectable, focused or not. */
  }
  .kol-custom-suggestions-option:not(.kol-custom-suggestions-option--disabled) {
    cursor: pointer;
  }
  .kol-custom-suggestions-options-group--cursor-hidden .kol-custom-suggestions-option {
    cursor: none !important;
  }
  .kol-custom-suggestions-option--disabled, .kol-custom-suggestions-option--disabled * {
    cursor: not-allowed;
  }
  .kol-custom-suggestions-options-group {
    background-color: white;
    display: block;
    position: absolute;
    z-index: 2;
    max-height: calc(250 * 1rem / var(--kolibri-root-font-size, 16));
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
    list-style-type: none;
  }
  .kol-input-container:has(.kol-custom-suggestions-options-group--open) {
    z-index: 10;
  }
  .kol-custom-suggestions-toggle {
    display: flex;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: center;
    justify-content: center;
    cursor: default;
  }
  .kol-custom-suggestions-toggle.kol-custom-suggestions-toggle--disabled {
    cursor: not-allowed;
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
  .kol-input {
    background-color: transparent;
    width: 100%;
    min-width: var(--a11y-min-size);
  }
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-combobox__delete .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-combobox__delete :host {
    display: inline-block;
  }
  .kol-combobox__delete .kol-button {
    display: flex;
    height: 100%;
    min-height: var(--a11y-min-size);
    text-decoration-line: none;
    /* The interactive element is the flex container positioning the text, so it carries the
       box the root element used to be. The UA default underline sits on that element too,
       so suppressing \`text-decoration\` on the wrapper alone is not enough. */
  }
  .kol-combobox__delete .kol-button__interactive-element {
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
  .kol-combobox__delete .kol-button__interactive-element::before {
    content: "​";
  }
  .kol-combobox__delete .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-combobox__delete .kol-button {
    /* The tooltip wrapper holds only the absolutely positioned floating tooltip. In the legacy
       DOM it sat in a block flow and collapsed to zero height; as a flex/grid item it would
       stretch to the container height instead, adding phantom rows to the layout. */
  }
  .kol-combobox__delete .kol-button__tooltip {
    height: 0;
  }
  .kol-combobox__delete .kol-button--external-link > .kolicon-link-external::before {
    content: none;
  }
  .kol-combobox__delete .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {
    content: none;
  }
  .kol-combobox-toggle {
    min-height: 0;
    flex: 0;
    align-self: stretch;
  }
  .kol-combobox--open .kol-combobox-toggle {
    transform: rotate(180deg);
  }
}`,I=class extends T{constructor(e){super(),t(this,e),this.ctaRef=p(),this.translateDeleteSelection=h(`kol-delete-selection`),this.id=s(`combobox`),this.inputHasFocus=!1,this.isOpen=!1,this.blockSuggestionMouseOver=!1,this.hasValue=!1,this.toggleListbox=()=>{var e;if(this.getRenderProp(`disabled`)===!0)this.isOpen=!1;else if((e=this.ctaRef.el)==null||e.focus(),this.isOpen)this.isOpen=!1;else if(Array.isArray(this.filteredSuggestions)&&this.filteredSuggestions.length>0){this.isOpen=!0;let e=this.filteredSuggestions.findIndex(e=>e===this.getRenderProp(`value`));this.focusedIndex=e>=0?e:-1,this.focusOption(this.focusedIndex)}},this.handleComboboxInput=e=>{let t=e.target.value;this.setRenderProp(`value`,t),this._value=t,this.handleInput(e,t),this.setFilteredSuggestionsByQuery(t),this.focusedIndex=-1,e.stopImmediatePropagation()},this.handleComboboxChange=e=>{e.stopPropagation();let t=this.getRenderProp(`value`);this.handleChange(e,t),this.hasValue=!!t,this.formAssociation.setFormAssociatedValue(t)},this.handleInputBlur=e=>{this.handleFocusLeave(e)},this.stopClearButtonFocusEvent=e=>{e.stopPropagation()},this.handleDropdownKeyDown=e=>{e.key.length===1&&/[a-z0-9]/i.test(e.key)&&(this.isOpen=!0,this.focusSuggestionStartingWith(e.key))},this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._hasClearButton=!0,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this.initFormAssociation(`combobox`,this._name)}async getValue(){return this.getRenderProp(`value`)}async focus(e){}async click(){}componentWillLoad(){this.initRenderProps(P),this.setRenderProp(`value`,``),this.optionRefs=[],this._touched=this._touched===!0,this.watchAriaDetails(this._ariaDetails),this.watchName(this._name),this.watchSyncValueBySelector(this._syncValueBySelector),this.watchTouched(this._touched),this.watchAccessKey(this._accessKey),this.watchMsg(this._msg),this.watchDisabled(this._disabled),this.watchHideMsg(this._hideMsg),this.watchHideLabel(this._hideLabel),this.watchHint(this._hint),this.watchInfoPopover(this._infoPopover),this.watchLabel(this._label),this.watchShortKey(this._shortKey),this.watchOn(this._on),this.watchTooltipAlign(this._tooltipAlign),this.watchVariant(this._variant),this.watchIcons(this._icons),this.watchHasClearButton(this._hasClearButton),this.watchPlaceholder(this._placeholder),this.watchRequired(this._required),this.applySuggestions(this._suggestions),this.applyValue(this._value),this.hasValue=!!this.getRenderProp(`value`),this.filteredSuggestions=this.getRenderProp(`suggestions`)}disconnectedCallback(){this.destroyFormField()}getOptionCount(){return Array.isArray(this.filteredSuggestions)?this.filteredSuggestions.length:0}moveFocus(e){this.filteredSuggestions&&this.moveFocusWrapping(e)}focusFirstOption(){this.focusOption(0)}focusLastOption(){this.focusOption(this.filteredSuggestions?this.filteredSuggestions.length-1:0)}handleConfirmKey(e){if(!(this.clearButtonRef&&e.composedPath().includes(this.clearButtonRef))){if(e.key===` `){this.isOpen&&this.selectFocusedOption()&&(this.isOpen=!1,e.preventDefault());return}this.isOpen&&this.selectFocusedOption()?this.isOpen=!1:this.toggleListbox(),e.preventDefault()}}selectFocusedOption(){return this.filteredSuggestions&&this.focusedIndex>=0&&this.focusedIndex<this.filteredSuggestions.length?(this.selectOption(this.filteredSuggestions[this.focusedIndex]),!0):!1}focusSuggestionStartingWith(e){let t=e.toLowerCase(),n=Array.isArray(this.filteredSuggestions)&&this.filteredSuggestions.length>0&&this.filteredSuggestions.findIndex(e=>e.toLowerCase().startsWith(t));typeof n==`number`&&this.focusOption(n)}setFilteredSuggestionsByQuery(e){if(e===void 0)return;let t=this.getRenderProp(`suggestions`);e.trim()===``?this.filteredSuggestions=[...t]:(this.filteredSuggestions=Array.isArray(t)?t.filter(t=>t.toLowerCase().includes(e.trim().toLowerCase())):this.filteredSuggestions,this.isOpen=this.filteredSuggestions?.length===1&&this.filteredSuggestions[0]===e?!1:!!(this.filteredSuggestions&&this.filteredSuggestions.length>0))}selectOption(e){var t;let n=this.getRenderProp(`name`);this.handleInput(a(o.input,{name:n,value:e},this.ctaRef.el),e),this.handleChange(a(o.change,{name:n,value:e},this.ctaRef.el),e),this.hasValue=!!e,this.formAssociation.setFormAssociatedValue(e),this.filteredSuggestions=[...this.getRenderProp(`suggestions`)],this.setRenderProp(`value`,e),(t=this.ctaRef.el)==null||t.focus()}clearSelection(){var e;if(this.getRenderProp(`disabled`)===!0)return;(e=this.ctaRef.el)==null||e.focus(),this.focusedIndex=-1,this._value=``,this.setRenderProp(`value`,``),this.filteredSuggestions=[...this.getRenderProp(`suggestions`)],this.isOpen=!1;let t={name:this.getRenderProp(`name`),value:``};this.handleInput(a(o.input,t,this.ctaRef.el),``),this.handleChange(a(o.change,t,this.ctaRef.el),``),this.hasValue=!1,this.formAssociation.setFormAssociatedValue(``)}handleHostKeyDown(e){this.handleListboxKeyDown(e)}handleMouseEvent(){this.handleListboxMouseMove()}handleFocusIn(e){this.host?.contains(document.activeElement)&&!this.inputHasFocus&&this.handleFocus(e)}handleFocusOut(e){let t=e.relatedTarget,n=t&&(t===this.host||this.host?.contains(t));this.inputHasFocus&&!n&&(this.handleBlur(e),this.isOpen&&=!1)}getInputProps(){let{ariaDescribedBy:e,hasError:t}=this.getAria(),n=this.id,r=this.getRenderProp(`disabled`)===!0,i=this.getRenderProp(`accessKey`)||void 0,a=this.getRenderProp(`placeholder`),o=this.getRenderProp(`shortKey`)||void 0,s=this.getRenderProp(`hideLabel`),l=this.getRenderProp(`label`);return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({id:n,hideLabel:s,label:l,disabled:r,name:this.getRenderProp(`name`)||void 0},i?{accessKey:i}:{}),{value:this.getRenderProp(`value`),required:this.getRenderProp(`required`)}),a?{placeholder:a}:{}),{touched:this.getRenderProp(`touched`),msg:this.getRenderProp(`msg`)}),o?{"aria-keyshortcuts":o}:{}),{ref:this.ctaRef,class:`kol-combobox__input`,type:`text`,role:`combobox`,"aria-activedescendant":this.isOpen&&this.focusedIndex>=0?`option-${this.focusedIndex}`:void 0,"aria-autocomplete":`both`,"aria-controls":c(n,`listbox`),"aria-describedby":e.length>0?e.join(` `):void 0,"aria-expanded":this.isOpen?`true`:`false`,"aria-label":s&&typeof l==`string`?l:void 0,"aria-labelledby":c(n,`label`),autocapitalize:`off`,autocorrect:`off`,autocomplete:`off`,onBlur:this.handleInputBlur,onChange:this.handleComboboxChange,onClick:this.handleClick,onFocus:this.handleFocus,onInput:this.handleComboboxInput,onKeyDown:this.handleKeyDown,ariaDescribedBy:e,"aria-invalid":t?`true`:void 0})}renderOptions(){let t=this.getRenderProp(`value`);return Array.isArray(this.filteredSuggestions)&&this.filteredSuggestions.length>0&&this.filteredSuggestions.map((n,r)=>e(C,{disabled:!1,index:r,option:n,searchTerm:t,ref:e=>{e&&(this.optionRefs[r]=e)},selected:t===n,onClick:()=>{this.selectOption(n),this.toggleListbox(),this.isOpen=!1},onMouseOver:()=>{this.blockSuggestionMouseOver||this.focusOption(r)},onFocus:()=>{this.focusOption(r)}}))}render(){let t=this.getRenderProp(`disabled`)===!0,{startAdornment:r,endAdornment:a}=E({icons:this.getRenderProp(`icons`),disabled:t});return e(n,{key:`37a88f5f4c2fbe17c586b9e9018520b376005fa8`},e(b,Object.assign({key:`d46576e52bbaad3328828b15e4c70518d2fc316a`},this.getFormFieldProps({class:u(`kol-combobox`,{"has-value":this.hasValue,"kol-combobox--open":this.isOpen}),accessKey:this.getRenderProp(`accessKey`)||void 0,shortKey:this.getRenderProp(`shortKey`)||void 0,required:this.getRenderProp(`required`),variant:this.getRenderProp(`variant`)})),e(N,{key:`d7df77cae060e4d668fb6855b2e0feb362c2f357`,disabled:t,msg:this.getRenderProp(`msg`),touched:this.getRenderProp(`touched`),startAdornment:r,endAdornment:a},e(`div`,{key:`42e48a4616ac8109721663c79f992a4c015aaf02`,class:`kol-combobox__group`},e(M,Object.assign({key:`2c567effb35258c7c11cd99cc2341ade89474831`},this.getInputProps())),this.getRenderProp(`value`)&&this.getRenderProp(`hasClearButton`)&&e(i,{key:`2a3b983df7e56bed77f5ef0bc2d8fde0c991d4a3`,ref:e=>this.clearButtonRef=e,_icons:`kolicon-cross`,_label:this.translateDeleteSelection,_hideLabel:!0,_variant:`ghost`,_disabled:t,"data-testid":`combobox-delete`,class:`kol-combobox__delete`,hidden:t,onBlur:this.stopClearButtonFocusEvent,onFocus:this.stopClearButtonFocusEvent,_on:{onClick:()=>{this.clearSelection()}}}),e(`button`,{key:`acff9277f268cd5ae31f9530854335e244f797de`,type:`button`,tabIndex:-1,class:`kol-combobox-toggle`,onClick:this.toggleListbox,disabled:t,hidden:t},e(m,{key:`c0411c806058f4184340e90c14270b357f7ceff0`,icons:`kolicon-chevron-down`,label:``}))),e(w,{key:`0657d6f71a56f3f3a52d2477a1a8376ba2c33220`,blockSuggestionMouseOver:this.blockSuggestionMouseOver,onKeyDown:this.handleDropdownKeyDown,hidden:!this.isOpen||t,id:c(this.id,`listbox`)},this.renderOptions()))))}watchAccessKey(e){v.apply(e,e=>this.setRenderProp(`accessKey`,e)),y(e,this._shortKey)}watchAriaDetails(e){this.applyAriaDetails(e)}watchDisabled(e){this.applyDisabled(e)}watchHasClearButton(e){S.apply(e,e=>this.setRenderProp(`hasClearButton`,e))}watchHideMsg(e){this.applyHideMsg(e)}watchHideLabel(e){this.applyHideLabel(e)}watchHint(e){this.applyHint(e)}watchIcons(e){D.apply(e,e=>this.setRenderProp(`icons`,e))}watchInfoPopover(e){this.applyInfoPopover(e)}watchLabel(e){this.applyLabel(e)}watchMsg(e){this.applyMsg(e)}watchName(e){this.applyName(e)}watchOn(e){this.applyOn(e)}watchPlaceholder(e){O.apply(e,e=>this.setRenderProp(`placeholder`,e))}watchRequired(e){k.apply(e,e=>this.setRenderProp(`required`,e))}watchShortKey(e){_.apply(e,e=>this.setRenderProp(`shortKey`,e)),y(this._accessKey,e)}applySuggestions(e){A.apply(e,e=>this.setRenderProp(`suggestions`,e))}watchSuggestions(e){this.applySuggestions(e),this.filteredSuggestions=e,this.setFilteredSuggestionsByQuery(this._value)}watchSyncValueBySelector(e){this.applySyncValueBySelector(e)}watchTooltipAlign(e){this.applyTooltipAlign(e)}watchTouched(e){this.applyTouched(e)}applyValue(e){e!=null&&j.apply(e,e=>this.setRenderProp(`value`,e))}watchValue(e){this.applyValue(e),this.formAssociation.setFormAssociatedValue(e)}watchVariant(e){g.apply(e,e=>this.setRenderProp(`variant`,e))}get host(){return r(this)}static get watchers(){return{_accessKey:[`watchAccessKey`],_ariaDetails:[`watchAriaDetails`],_disabled:[`watchDisabled`],_hasClearButton:[`watchHasClearButton`],_hideMsg:[`watchHideMsg`],_hideLabel:[`watchHideLabel`],_hint:[`watchHint`],_icons:[`watchIcons`],_infoPopover:[`watchInfoPopover`],_label:[`watchLabel`],_msg:[`watchMsg`],_name:[`watchName`],_on:[`watchOn`],_placeholder:[`watchPlaceholder`],_required:[`watchRequired`],_shortKey:[`watchShortKey`],_suggestions:[`watchSuggestions`],_syncValueBySelector:[`watchSyncValueBySelector`],_tooltipAlign:[`watchTooltipAlign`],_touched:[`watchTouched`],_value:[`watchValue`],_variant:[`watchVariant`]}}};l([f(`ctaRef`)],I.prototype,`focus`,null),l([d(`ctaRef`)],I.prototype,`click`,null),I.style={default:F};export{I as kol_combobox};