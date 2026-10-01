import{c as e,o as t,r as n,s as r}from"./index-DoSJ-Gvj-CYOaFPK4.js";import"./behavior-BhBxAvt5-xZYUNMQR.js";import"./index-5PI105fI.js";import{n as i}from"./dev.utils-DaBrNORr-M-uiKlr8.js";import{t as a}from"./base-web-component--IgFgz37-CZuvR3uB.js";import{n as o,t as s}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{_ as c,f as l,i as u,o as d,y as f}from"./variant-quote-Cuubd2oS-BeICi_a6.js";import"./disabled-CojzC4_Y-CRM1KCbN.js";import"./label-CeTSiwZp-BS_tbKZ0.js";import"./label-DwrSZniq-DbwVjYeu.js";import{t as p}from"./clsx-COFh-Vc8-DWAop4cA.js";import"./Heading-B8GqnxaG-noYIPZNS.js";import{n as m,r as h,t as g}from"./element-interaction-DkGO5I_0-CYEJb_Yf.js";import{t as _}from"./block-bem-DXhBMAv_-c5rJ1r_F.js";import"./component-gGgKYzDU-DvlhTibs.js";import"./component-DiYb-uG1-ClH6R-Ha.js";import"./i18n-D2_tokqe-CjWtLRci.js";import"./component-guyF0SVd-JKxScHZh.js";import"./component-D4bMu1b0-BLTgMOGK.js";import"./component-C2iCTO9d-CqCJ51wa.js";import"./component-B8cIfeYE-CmmOis-4.js";import"./component-YRLAuWA--CtsuxM73.js";import"./align-Coi3MuR6-BSDo1Abj.js";import"./label-with-expert-slot-Drr-eT_y-CFTwkST3.js";import{n as v}from"./variant-DjntMFfM-BPBjmGxE.js";import{r as y,t as b}from"./tooltip-align-CJkgtGcL-BSlb6jBG.js";import"./name-BU_3z1AF-BguwJ1Su.js";import{t as x}from"./access-and-short-key-ijzCZfHm-Dx5Q-CAn.js";import"./behavior-Jdq0GIfp-CoaK1W89.js";import{a as S,s as C,t as w}from"./component-Chg7219m-dzoC93Uy.js";import{t as T}from"./aria-D1foCRLl-nbkAFuw3.js";import"./icon-button-BUhQe6bR-CaJf-lZt.js";import{t as E}from"./input-container-BHhfzt_a-lBDxO4G8.js";import{i as D,n as O,r as k,t as A}from"./api-PM8ncYnc-BYCVASPz.js";import{t as j}from"./value-string-CFdisxu9-XnaPGD-S.js";import{n as M,r as N,t as P}from"./required-BDGXG7_o-4gyUgpmI.js";import{t as F}from"./behavior-C2mN88gn-Vg3E_9wg.js";import{t as I}from"./spell-check-RXPWhYV7-D0aJ37AI.js";var L=[`vertical`,`none`],R=u(`adjustHeight`,!1,l);function z(e){let t=f(e);if(d(t,L))return t;throw Error(`Invalid resize option: ${t}`)}var B=u(`resize`,`vertical`,z),V=u(`rows`,void 0,c,e=>e===void 0||e>=1),H=e=>{let{class:t,msg:n,touched:i,readonly:a,disabled:s,required:c,ariaDescribedBy:l,hideLabel:u,label:d}=e,f=o(e,[`class`,`msg`,`touched`,`readonly`,`disabled`,`required`,`ariaDescribedBy`,`hideLabel`,`label`]),m=Object.assign(Object.assign({class:p(_(`kol-textarea`)(Object.assign({disabled:!!s,required:!!c,touched:!!i,readonly:!!a},C(n,i)?{[S(n)]:!0}:{})),t),required:c,disabled:s,readonly:a},T({ariaDescribedBy:l,hideLabel:u,label:d})),f);return r(`textarea`,Object.assign({},m))},U={required:[...O.required],optional:[...O.optional,b,R,D,P,M,N,B,V,y,I,j,v]},W=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1790845896098"); /* IE9*/
  src: url("kolicons.eot?t=1790845896098#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1790845896098") format("woff2"), url("kolicons.woff?t=1790845896098") format("woff"), url("kolicons.ttf?t=1790845896098") format("truetype"), url("kolicons.svg?t=1790845896098#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-button {
    background-color: transparent;
    display: inline-block;
    width: 100%;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    margin: 0;
    padding: 0;
    /* The user-agent stylesheet centers text on \`button\`, but not on \`div\`. The wrapper now
       carries the class, so that UA default has to be restated here for the inner content to
       sit where it did when the button element itself was the class carrier. */
    text-align: center;
    /* Replicate the reset the real button received: width stays at the initial \`medium\`, only
       the style becomes \`none\`. Consumer rules that flip e.g. \`border-bottom-style\` back to
       \`solid\` (tabs) must therefore target the inner button (see the \`__interactive-element\`
       override below), because Firefox vertically centers button content inside the content box,
       which shrinks by the border — exactly as it did when the real button carried these rules. */
  }
  .kol-button__interactive-element {
    border-style: none;
    display: block;
    border-width: medium;
    /* The UA pins \`text-align: center\` and (in Firefox) \`font-weight: 400\` directly on every
       \`button\`, which would beat any alignment or font styling inherited through the wrapper
       (e.g. nav's \`text-align: left\`, or a bold active entry that used to apply to the button
       element itself). Inheriting all three restores the old flow. */
    font-weight: inherit;
    font-style: inherit;
    text-align: inherit;
  }
  .kol-button {
    /* See kol-button-styles: the tooltip wrapper must stay zero-height, also when the wrapper
       div is a flex or grid item (e.g. nav entry rows). */
  }
  .kol-button__tooltip {
    height: 0;
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
  .kol-textarea {
    width: 100%;
  }
}`,G=class extends A{constructor(t){super(),e(this,t),this.ctaRef=g(),this.counter=new F(a.stateLess),this.hasValue=!1,this.id=i(`textarea`),this.inputHasFocus=!1,this.handleTextareaInput=e=>{this.ctaRef.el instanceof HTMLTextAreaElement&&(this._value=this.ctaRef.el.value,this.getRenderProp(`adjustHeight`)&&(this._rows=this.increaseTextareaHeight(this.ctaRef.el)),this.handleInput(e))},this.handleTextareaChange=e=>{this.handleChange(e),this.hasValue=!!e.target.value},this.handleTextareaFocus=e=>{this.handleFocus(e),this.counter.retriggerAria(this._value?.length??0)},this.handleTextareaKeyDown=e=>{this.handleKeyDown(e),this.counter.handleKeyDown(e,this.ctaRef.el?.value.length??0)},this._adjustHeight=!1,this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._hasCounter=!1,this._maxLengthBehavior=`hard`,this._readOnly=!1,this._resize=`vertical`,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this.initFormAssociation(`textarea`,this._name)}async getValue(){return this.ctaRef.el?.value}async focus(e){}async click(){}componentWillLoad(){this.initRenderProps(U),this.watchAriaDetails(this._ariaDetails),this._touched=this._touched===!0,this.watchName(this._name),this.watchSyncValueBySelector(this._syncValueBySelector),this.watchTouched(this._touched),this.watchAccessKey(this._accessKey),this.watchAdjustHeight(this._adjustHeight),this.watchMsg(this._msg),this.watchDisabled(this._disabled),this.watchHideMsg(this._hideMsg),this.watchHideLabel(this._hideLabel),this.watchHint(this._hint),this.watchInfoPopover(this._infoPopover),this.watchLabel(this._label),this.watchShortKey(this._shortKey),this.watchOn(this._on),this.watchTooltipAlign(this._tooltipAlign),this.watchVariant(this._variant),this.watchIcons(this._icons),this.watchHasCounter(this._hasCounter),this.watchMaxLengthBehavior(this._maxLengthBehavior),this.counter.watchMaxLength(this._maxLength),this.watchPlaceholder(this._placeholder),this.watchReadOnly(this._readOnly),this.watchRequired(this._required),this.watchResize(this._resize),this.watchRows(this._rows),this.watchSpellCheck(this._spellCheck),this.applyValue(this._value),this.hasValue=!!this.getRenderProp(`value`)}componentDidLoad(){(this.counter.hasCounter()||this.counter.hasSoftLimit())&&this.counter.updateImmediate(this._value?.length??0),setTimeout(()=>{this._adjustHeight===!0&&this.ctaRef.el?this._rows=this.increaseTextareaHeight(this.ctaRef.el):this._rows||=1})}disconnectedCallback(){this.destroyFormField(),this.counter.destroy()}increaseTextareaHeight(e){e.style.overflow=`hidden`,e.style.padding=`0`;let t=e.rows,n=e.clientHeight/t;e.rows=1;let r=Math.round(e.scrollHeight/n);e.rows=t,e.style.padding=``;let i=this.getRenderProp(`rows`);return i&&i>r?i:r}getTextareaProps(){let e=this.id,t=this.getRenderProp(`shortKey`),n=this.counter.getMaxLengthAttribute(),r=this.counter.getCharacterLimitHintId(e),{ariaDescribedBy:i,hasError:a}=this.getAria();return Object.assign(Object.assign({id:e,hideLabel:this.getRenderProp(`hideLabel`),label:this.getRenderProp(`label`),value:this.getRenderProp(`value`),accessKey:this.getRenderProp(`accessKey`)||void 0,disabled:this.getRenderProp(`disabled`),name:this.getRenderProp(`name`)||void 0,rows:this.getRenderProp(`rows`),readonly:this.getRenderProp(`readOnly`),required:this.getRenderProp(`required`),placeholder:this.getRenderProp(`placeholder`),touched:this.getRenderProp(`touched`),msg:this.getRenderProp(`msg`),ref:this.ctaRef,style:{resize:this.getRenderProp(`resize`)},onBlur:this.handleBlur,onChange:this.handleTextareaChange,onClick:this.handleClick,onFocus:this.handleTextareaFocus,onInput:this.handleTextareaInput,onKeyDown:this.handleTextareaKeyDown,ariaDescribedBy:r?[...i,r]:i,"aria-invalid":a?`true`:void 0},n===void 0?{}:{maxLength:n}),t?{"aria-keyshortcuts":t}:{})}render(){let e=this.getRenderProp(`disabled`),{startAdornment:t,endAdornment:i}=k({icons:this.getRenderProp(`icons`),disabled:e});return r(n,{key:`48f8ef3781c7ab174e16180987ed8e3e99f3eb49`},r(w,Object.assign({key:`d463c01243b9dec124404067d5b839cd61a255b9`},this.getFormFieldProps({class:p(`kol-form-field-textarea`,{"kol-form-field--has-value":this.hasValue,"kol-form-field--has-counter":this.counter.hasSoftLimit()||this.counter.hasCounter()}),accessKey:this.getRenderProp(`accessKey`)||void 0,shortKey:this.getRenderProp(`shortKey`)||void 0,variant:this.getRenderProp(`variant`),required:this.getRenderProp(`required`),readOnly:this.getRenderProp(`readOnly`),maxLength:this.counter.getRenderProp(`maxLength`),counter:this.counter.getCounterProps()})),r(E,{key:`57616b94a5b4379143e48eaf2ee35c54a04606ec`,disabled:e,msg:this.getRenderProp(`msg`),touched:this.getRenderProp(`touched`),startAdornment:t,endAdornment:i},r(H,Object.assign({key:`24dbc035af6954789db533bb3f625977e939e57b`},this.getTextareaProps())))))}watchAccessKey(e){b.apply(e,e=>this.setRenderProp(`accessKey`,e)),x(e,this._shortKey)}watchAdjustHeight(e){R.apply(e,e=>this.setRenderProp(`adjustHeight`,e))}watchAriaDetails(e){this.applyAriaDetails(e)}watchDisabled(e){this.applyDisabled(e)}watchHasCounter(e){this.counter.watchHasCounter(e)}watchHideMsg(e){this.applyHideMsg(e)}watchHideLabel(e){this.applyHideLabel(e)}watchHint(e){this.applyHint(e)}watchIcons(e){D.apply(e,e=>this.setRenderProp(`icons`,e))}watchInfoPopover(e){this.applyInfoPopover(e)}watchLabel(e){this.applyLabel(e)}watchMaxLength(e){this.counter.watchMaxLength(e),this.counter.updateImmediate(this._value?.length??0)}watchMaxLengthBehavior(e){this.counter.watchMaxLengthBehavior(e)}watchMsg(e){this.applyMsg(e)}watchName(e){this.applyName(e)}watchOn(e){this.applyOn(e)}watchPlaceholder(e){P.apply(e,e=>this.setRenderProp(`placeholder`,e))}watchReadOnly(e){M.apply(e,e=>this.setRenderProp(`readOnly`,e))}watchRequired(e){N.apply(e,e=>this.setRenderProp(`required`,e))}watchResize(e){B.apply(e,e=>this.setRenderProp(`resize`,e))}watchRows(e){V.apply(e,e=>this.setRenderProp(`rows`,e))}watchShortKey(e){y.apply(e,e=>this.setRenderProp(`shortKey`,e)),x(this._accessKey,e)}watchSpellCheck(e){I.apply(e,e=>this.setRenderProp(`spellCheck`,e))}watchSyncValueBySelector(e){this.applySyncValueBySelector(e)}watchTooltipAlign(e){this.applyTooltipAlign(e)}watchTouched(e){this.applyTouched(e)}watchValue(e){this.applyValue(e),this.counter.update(e?.length??0)}watchVariant(e){v.apply(e,e=>this.setRenderProp(`variant`,e))}applyValue(e){j.apply(e,e=>this.setRenderProp(`value`,e)),this.formAssociation.setFormAssociatedValue(this.getRenderProp(`value`))}get host(){return t(this)}static get watchers(){return{_accessKey:[`watchAccessKey`],_adjustHeight:[`watchAdjustHeight`],_ariaDetails:[`watchAriaDetails`],_disabled:[`watchDisabled`],_hasCounter:[`watchHasCounter`],_hideMsg:[`watchHideMsg`],_hideLabel:[`watchHideLabel`],_hint:[`watchHint`],_icons:[`watchIcons`],_infoPopover:[`watchInfoPopover`],_label:[`watchLabel`],_maxLength:[`watchMaxLength`],_maxLengthBehavior:[`watchMaxLengthBehavior`],_msg:[`watchMsg`],_name:[`watchName`],_on:[`watchOn`],_placeholder:[`watchPlaceholder`],_readOnly:[`watchReadOnly`],_required:[`watchRequired`],_resize:[`watchResize`],_rows:[`watchRows`],_shortKey:[`watchShortKey`],_spellCheck:[`watchSpellCheck`],_syncValueBySelector:[`watchSyncValueBySelector`],_tooltipAlign:[`watchTooltipAlign`],_touched:[`watchTouched`],_value:[`watchValue`],_variant:[`watchVariant`]}}};s([h(`ctaRef`)],G.prototype,`focus`,null),s([m(`ctaRef`)],G.prototype,`click`,null),G.style={default:W};export{G as kol_textarea};