import{c as e,l as t,r as n,s as r}from"./index-DV_vNR-B-ou129cK2.js";import"./behavior-5nsC32-N-BhhwPmaN.js";import{i}from"./index-B8D35PSy.js";import{n as a}from"./dev.utils-DgQPAJ26-Dax34oEa.js";import"./base-web-component--IgFgz37-CZuvR3uB.js";import{n as o,t as s}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{d as c,i as l,v as u}from"./variant-quote-DmzRsnzD-qdeqz0BX.js";import"./disabled-B26LJHxI-tvA9sH8g.js";import"./label-Dy-7YmYn-Cax3n-TN.js";import"./label-BPihMGVv-BJK8b7in.js";import{t as d}from"./clsx-COFh-Vc8-DWAop4cA.js";import"./Heading-rq3v16Pi-vOt-68NS.js";import{n as f,r as p,t as m}from"./element-interaction-DkGO5I_0-CYEJb_Yf.js";import"./block-bem-gun2P2cG-RNW_vASM.js";import{t as h}from"./component-DJmrMcFg-Dai7KHvQ.js";import"./component-Ds0CcgaQ-DpMH6V7Q.js";import"./i18n-BLDJ1L3N-B6UqqOpa.js";import{t as g}from"./component-Darm8SYF-De8tYMjs.js";import"./component-Czx6mtYU-C3b-lSDa.js";import"./component-B7WJagf9-Djn84kRY.js";import"./component-CPn0ol8Q-p2-8XCRp.js";import"./component-CttRGYdK-D3vbYowm.js";import"./align-CzS4vEuu-anxNjF2G.js";import"./label-with-expert-slot-BFL5oAGR-DJn4L3FO.js";import{n as _,t as v}from"./short-key-B8GWVFoF-DazT-m-d.js";import"./tooltip-align-BwjjZ873-Dqb-9BTl.js";import"./name-DvtPSLMe-BGA31Ngg.js";import{t as y}from"./access-and-short-key-ijzCZfHm-Dx5Q-CAn.js";import"./behavior-ai6VR4ZM-CMsvti-8.js";import{n as b}from"./controller-DpLkFTNm-DgZzLZzC.js";import{i as x,o as S,t as C}from"./component-uAvXCCc6-LAthw_QG.js";import{n as w,t as T}from"./api-Jj3KTuZt-5pqlRa4a.js";import{t as E}from"./required-B0U5CrLr-BTs0kOk2.js";import{t as D}from"./input-BgUZVtv8-p8IG4wsO.js";import{t as O}from"./field-control-DzkDny3E-BaLKsw8N.js";var k=[`button`,`default`,`switch`],A=l(`value`,!0,e=>e),j=l(`checked`,!1,c),M=[`checked`,`indeterminate`,`unchecked`],N=e=>typeof e==`string`&&e.length>0,P=l(`icons`,{checked:`kolicon-check`,indeterminate:`kolicon-minus`,unchecked:`kolicon-cross`},e=>{if(typeof e==`object`&&e&&M.some(t=>N(e[t])))return e;throw Error(`Expected an object with at least one icon class of checked, indeterminate or unchecked`)}),F=l(`indeterminate`,!1,c),I=[`left`,`right`],L=l(`labelAlign`,`right`,e=>{let t=u(e);if(I.includes(t))return t;throw Error(`Invalid label alignment: ${t}`)}),R=l(`variant`,`default`,e=>{let t=u(e);if(k.includes(t))return t;throw Error(`Invalid checkbox variant: ${t}`)}),z=i.forBlock(`kol-checkbox`),B=t=>{var{class:n,variant:r=`default`,icon:i,inputProps:a}=t,s=o(t,[`class`,`variant`,`icon`,`inputProps`]);let{class:c}=a,l=o(a,[`class`]);return e(g,Object.assign({component:`label`,block:`kol-checkbox`,modifiers:Object.assign({"variant-button":r===`button`,"variant-default":r==="default","variant-switch":r===`switch`,checked:!!a.checked,indeterminate:!!a.indeterminate,disabled:!!a.disabled,required:!!a.required,touched:!!a.touched},S(a.msg,a.touched)?{[x(a.msg)]:!0}:{}),class:n},s),e(h,{label:``,icons:i,class:z(`icon`)}),e(D,Object.assign({class:d(z(`input`),c)},l,{type:`checkbox`})))},V={required:[...w.required],optional:[...w.optional,v,A,j,P,F,L,E,_,R]},H=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1790931369243"); /* IE9*/
  src: url("kolicons.eot?t=1790931369243#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1790931369243") format("woff2"), url("kolicons.woff?t=1790931369243") format("woff"), url("kolicons.ttf?t=1790931369243") format("truetype"), url("kolicons.svg?t=1790931369243#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-form-field {
    display: grid;
  }
  .kol-form-field__label-text {
    display: ruby;
  }
  .kol-checkbox {
    display: flex;
    position: relative;
    align-items: center;
    cursor: pointer;
  }
  .kol-checkbox--disabled {
    cursor: not-allowed;
  }
  .kol-checkbox .kol-input {
    background-color: white;
    border-style: solid;
    margin: 0;
    border-width: 2px;
    appearance: none;
    cursor: inherit;
  }
  .kol-checkbox .kol-input:before {
    content: "";
  }
  /**
   * Variant: Checkbox
   */
  .kol-checkbox--variant-default {
    position: relative;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    justify-content: center;
  }
  .kol-checkbox--variant-default .kol-icon {
    display: none;
    position: absolute;
    inset: auto;
    z-index: 1;
    pointer-events: none;
  }
  .kol-checkbox--variant-default .kol-input {
    width: calc(22 * 1rem / var(--kolibri-root-font-size, 16));
    height: calc(22 * 1rem / var(--kolibri-root-font-size, 16));
  }
  .kol-checkbox--variant-default.kol-checkbox--checked .kol-icon, .kol-checkbox--variant-default.kol-checkbox--indeterminate .kol-icon {
    display: block;
  }
  /**
   * Variant: Switch
   */
  .kol-checkbox--variant-switch {
    position: relative;
  }
  .kol-checkbox--variant-switch .kol-input {
    display: inline-block;
    position: relative;
    width: 3.2em;
    min-width: 3.2em;
    height: 1.7em;
  }
  .kol-checkbox--variant-switch .kol-input::before {
    background-color: black;
    position: absolute;
    top: calc(0.25em - 2 * 1rem / var(--kolibri-root-font-size, 16));
    left: calc(0.25em - 2 * 1rem / var(--kolibri-root-font-size, 16));
    width: 1.2em;
    height: 1.2em;
    transition: 0.5s;
  }
  .kol-checkbox--variant-switch .kol-input:checked::before {
    transform: translateX(1.5em);
  }
  .kol-checkbox--variant-switch .kol-input:indeterminate::before {
    transform: translateX(0.75em);
  }
  .kol-checkbox--variant-switch .kol-icon {
    transform: translate(0, -50%);
    color: black;
    display: flex;
    position: absolute;
    top: 50%;
    left: calc(4 * 1rem / var(--kolibri-root-font-size, 16));
    z-index: 1;
    width: 1.2em;
    height: 1.2em;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
  }
  .kol-checkbox--variant-switch.kol-checkbox--checked .kol-icon {
    transform: translate(1.5em, -50%);
  }
  .kol-checkbox--variant-switch.kol-checkbox--indeterminate .kol-icon {
    transform: translate(0.75em, -50%);
  }
  /**
   * Variant: Button
   */
  .kol-checkbox--variant-button {
    min-width: var(--a11y-min-size);
  }
  .kol-checkbox--variant-button .kol-icon {
    display: flex;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: center;
    justify-content: center;
  }
}`,U=class extends T{constructor(e){super(),t(this,e),this.ctaRef=m(),this.id=a(`input-checkbox`),this.inputHasFocus=!1,this.handleCheckboxInput=e=>{this._checked=!this._checked,this._indeterminate=!1,this.handleInput(e,this.getModelValue())},this.handleCheckboxChange=e=>{this.handleChange(e,this.getModelValue())},this.handleCheckboxKeyDown=e=>{this.handleKeyDown(e),(e.code===`Enter`||e.code===`NumpadEnter`)&&b({form:this.host})},this.handleCheckboxBlur=e=>{this._disabled||this.handleBlur(e)},this.handleLabelMouseDown=e=>{this.inputHasFocus&&e.preventDefault()},this.handleCheckboxMouseDown=e=>{this.inputHasFocus&&!(e.target instanceof HTMLInputElement)&&e.preventDefault()},this._checked=!1,this._hideMsg=!1,this._disabled=!1,this._hideLabel=!1,this._hint=``,this._labelAlign=`right`,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this._value=!0,this._variant=`default`,this.initFormAssociation(`checkbox`,this._name)}getModelValue(){return this._checked?this.getRenderProp(`value`):null}syncFormAssociatedValue(){this.formAssociation.setFormAssociatedValue(this.getModelValue())}async getValue(){return this.getModelValue()}async focus(e){}async click(){}componentWillLoad(){this.initRenderProps(V),this._touched=this._touched===!0,this.watchAriaDetails(this._ariaDetails),this.watchName(this._name),this.watchSyncValueBySelector(this._syncValueBySelector),this.watchTouched(this._touched),this.watchAccessKey(this._accessKey),this.watchMsg(this._msg),this.watchDisabled(this._disabled),this.watchHideMsg(this._hideMsg),this.watchHideLabel(this._hideLabel),this.watchHint(this._hint),this.watchInfoPopover(this._infoPopover),this.watchLabel(this._label),this.watchShortKey(this._shortKey),this.watchOn(this._on),this.watchTooltipAlign(this._tooltipAlign),this.watchRequired(this._required),this.watchChecked(this._checked),this.watchIcons(this._icons),this.watchIndeterminate(this._indeterminate),this.watchValue(this._value),this.watchVariant(this._variant),this.watchLabelAlign(this._labelAlign)}disconnectedCallback(){this.destroyFormField()}getIcon(){let e=this.getRenderProp(`icons`);return this.getRenderProp(`indeterminate`)?e.indeterminate:this.getRenderProp(`checked`)?e.checked:e.unchecked}getInputProps(){let e=this.getRenderProp(`shortKey`),{ariaDescribedBy:t,hasError:n}=this.getAria();return Object.assign(Object.assign({id:this.id,hideLabel:this.getRenderProp(`hideLabel`),label:this.getRenderProp(`label`),value:this.getRenderProp(`value`),accessKey:this.getRenderProp(`accessKey`)||void 0,disabled:this.getRenderProp(`disabled`),name:this._name===void 0||this._name===null?void 0:this.getRenderProp(`name`),ariaDescribedBy:t,required:this.getRenderProp(`required`),checked:this.getRenderProp(`checked`),indeterminate:this.getRenderProp(`indeterminate`),touched:this.getRenderProp(`touched`),msg:this.getRenderProp(`msg`)},e?{"aria-keyshortcuts":e}:{}),{class:d({"visually-hidden":this.getRenderProp(`variant`)===`button`}),ref:this.ctaRef,onBlur:this.handleCheckboxBlur,onChange:this.handleCheckboxChange,onFocus:this.handleFocus,onInput:this.handleCheckboxInput,onKeyDown:this.handleCheckboxKeyDown,"aria-invalid":n?`true`:void 0})}render(){let t=this.getRenderProp(`checked`),r=this.getRenderProp(`indeterminate`),i=this.getRenderProp(`variant`),a=this.getRenderProp(`accessKey`)||void 0,o=this.getRenderProp(`shortKey`)||void 0,s=this.getRenderProp(`required`);return e(n,{key:`f9e84b9fea49a1197db81b16d879cb5d2b236fc7`},e(C,Object.assign({key:`20574caada05ea3c8edae122069acad8c149bd12`},this.getFormFieldProps({class:d(`kol-input-checkbox`,{"kol-input-checkbox--checked":t,"kol-input-checkbox--indeterminate":r,[`kol-input-checkbox--variant-${i}`]:!0,[`kol-input-checkbox--label-align-${this.getRenderProp(`labelAlign`)}`]:!0}),accessKey:a,shortKey:o,required:s,renderNoLabel:!0,renderNoTooltip:!0})),e(O,Object.assign({key:`6d611ba9d3b2eb6e4d20b19667caa5badd0c54b2`,class:d(`kol-input-checkbox__field-control`,{"kol-input-checkbox__field-control--checked":t,"kol-input-checkbox__field-control--indeterminate":r,[`kol-input-checkbox__field-control--variant-${i}`]:!0}),id:this.id,label:this.getRenderProp(`label`),hint:this.getRenderProp(`hint`),hideLabel:this.getRenderProp(`hideLabel`),labelAlign:this.getRenderProp(`labelAlign`),infoPopover:this.getRenderProp(`infoPopover`),accessKey:a,shortKey:o,tooltipAlign:this.getRenderProp(`tooltipAlign`),disabled:this.getRenderProp(`disabled`),msg:this.getRenderProp(`msg`),touched:this.getRenderProp(`touched`),required:s,renderNoHint:!0,labelProps:{onMouseDown:this.handleLabelMouseDown}},this.getLabelTooltipRefs()),e(B,{key:`3cae869d1b24bb6e36bc352c32efc6e468eab301`,variant:i,icon:this.getIcon(),onMouseDown:this.handleCheckboxMouseDown,inputProps:this.getInputProps()}))))}watchAccessKey(e){v.apply(e,e=>this.setRenderProp(`accessKey`,e)),y(e,this._shortKey)}watchAriaDetails(e){this.applyAriaDetails(e)}watchChecked(e){j.apply(e,e=>this.setRenderProp(`checked`,e)),this.syncFormAssociatedValue()}watchDisabled(e){this.applyDisabled(e)}watchHideMsg(e){this.applyHideMsg(e)}watchHideLabel(e){this.applyHideLabel(e)}watchHint(e){this.applyHint(e)}watchIcons(e){P.apply(e,e=>this.setRenderProp(`icons`,Object.assign(Object.assign({},this.getRenderProp(`icons`)),e)))}watchIndeterminate(e){F.apply(e,e=>this.setRenderProp(`indeterminate`,e))}watchInfoPopover(e){this.applyInfoPopover(e)}watchLabel(e){this.applyLabel(e)}watchLabelAlign(e){L.apply(e,e=>this.setRenderProp(`labelAlign`,e))}watchMsg(e){this.applyMsg(e)}watchName(e){this.applyName(e)}watchOn(e){this.applyOn(e)}watchRequired(e){E.apply(e,e=>this.setRenderProp(`required`,e))}watchShortKey(e){_.apply(e,e=>this.setRenderProp(`shortKey`,e)),y(this._accessKey,e)}watchSyncValueBySelector(e){this.applySyncValueBySelector(e)}watchTooltipAlign(e){this.applyTooltipAlign(e)}watchTouched(e){this.applyTouched(e)}watchValue(e){e==null?this.setRenderProp(`value`,e):A.apply(e,e=>this.setRenderProp(`value`,e)),this.syncFormAssociatedValue()}watchVariant(e){R.apply(e,e=>this.setRenderProp(`variant`,e))}get host(){return r(this)}static get watchers(){return{_accessKey:[`watchAccessKey`],_ariaDetails:[`watchAriaDetails`],_checked:[`watchChecked`],_disabled:[`watchDisabled`],_hideMsg:[`watchHideMsg`],_hideLabel:[`watchHideLabel`],_hint:[`watchHint`],_icons:[`watchIcons`],_indeterminate:[`watchIndeterminate`],_infoPopover:[`watchInfoPopover`],_label:[`watchLabel`],_labelAlign:[`watchLabelAlign`],_msg:[`watchMsg`],_name:[`watchName`],_on:[`watchOn`],_required:[`watchRequired`],_shortKey:[`watchShortKey`],_syncValueBySelector:[`watchSyncValueBySelector`],_tooltipAlign:[`watchTooltipAlign`],_touched:[`watchTouched`],_value:[`watchValue`],_variant:[`watchVariant`]}}};s([p(`ctaRef`)],U.prototype,`focus`,null),s([f(`ctaRef`)],U.prototype,`click`,null),U.style={default:H};export{U as kol_input_checkbox};