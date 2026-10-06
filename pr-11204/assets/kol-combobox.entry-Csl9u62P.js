import{c as e,l as t,r as n,s as r}from"./index-DXG61PlX-oPC2a0hO.js";import"./behavior-aNGR_hkQ-DFdtKO0T.js";import{i,n as a,t as o}from"./index-CEhMmoKL.js";import{n as s,t as c}from"./dev.utils-BWjXNME2-CsEe--Un.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./base-web-component-2jzKhlYV-Bz0fKl7D.js";import"./label-D_5G63V--BR_-yv6W.js";import{t as l}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as u}from"./clsx-COFh-Vc8-DWAop4cA.js";import"./block-bem-DHE7Xg7m-Q9vyFj1m.js";import"./component-Po7UFT_P-b2rT4E30.js";import{t as d}from"./component-C9_3aEKc-CLKkp1OV.js";import"./component-BwiT2gX6-D0tGUl-L.js";import"./component-DugKNZOL-DUKzhVTr.js";import"./align-FU0PY1XC-BroQDHee.js";import"./disabled-qI1diFW3-BJLOD7yh.js";import"./Heading-C9TN5tHz-DAiVITwL.js";import{i as f,n as p,t as m}from"./element-interaction-Cy9tx3Sx-BTUWCd5A.js";import{t as h}from"./i18n-DAit3kRh-CtYqCsGA.js";import"./component-c5P3GTKF-fzNlaYZN.js";import{t as g}from"./component-S21H57Gr-Dv9VJCRJ.js";import"./component-uIrdbrGY-CC-8286x.js";import"./label-with-expert-slot-BYCLBK8K-BKWTx3x-.js";import{l as _,p as v,t as y}from"./variant-CQAKX6m_-DjdX68Yc.js";import"./name-Bn6J3kwt-CBHvnIlQ.js";import"./api-DqJdvUVY-CJMn1zs9.js";import"./resolve-props-OVp9lC75-16Si4e8M.js";import{t as b}from"./access-and-short-key-ijzCZfHm-Dx5Q-CAn.js";import"./behavior-Dovrk0fI-BtLJUfQ9.js";import"./controller-DYtWV8-L-DWobwrnP.js";import{t as x}from"./item-DTDPq_nM-JcrTA5wz.js";import"./component-CT9H0_pw-DI2rm477.js";import"./item-BUUlLRAG-DPa-K9zU.js";import{a as S,n as C}from"./api-Dj2-uqww-CyrcyYXU.js";import{a as w,i as T,n as E,r as D,t as O}from"./group-B7Npb0Ma-CBoIWEYP.js";import{n as k,r as A,t as j}from"./input-container-BZ3bspoi-CAB6Qh-F.js";import{t as M}from"./placeholder-BkNdetM8-BRWdfbXX.js";import{t as N}from"./required-190o4fGz-B1IPt4rQ.js";import{t as P}from"./suggestions-CHBaIeFE-CupBILFR.js";import{t as F}from"./value-string-D6yU9GwJ-BQILWk10.js";import{t as I}from"./input-DngP-0kg-VjBpW2R7.js";var L={required:[...S.required,P],optional:[...S.optional,y,w,A,M,N,_,F,v]},R=i.forBlock(`kol-combobox`)(`delete`),z=i.forBlock(`kol-combobox-toggle`)(),B=({disabled:t,handleClick:n})=>e(`button`,{type:`button`,tabIndex:-1,class:z,onClick:n,disabled:t,hidden:t},e(d,{icons:`kolicon-chevron-down`,label:``})),V=`@charset "UTF-8";
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
    .kol-modal {
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
  src: url("kolicons.eot?t=1791273478142"); /* IE9*/
  src: url("kolicons.eot?t=1791273478142#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1791273478142") format("woff2"), url("kolicons.woff?t=1791273478142") format("woff"), url("kolicons.ttf?t=1791273478142") format("truetype"), url("kolicons.svg?t=1791273478142#kolicons") format("svg"); /* iOS 4.1- */
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
 * Overlaps with \`kol-embedded-button-box-styles\` below: both target the block class itself and disagree
 * on \`display\` and \`text-align\`. A stylesheet that includes both therefore depends on order or
 * specificity — today that only happens where the caller nests one of them (e.g. \`_alert.mixin\`
 * nests this one under \`.kol-alert\`, which wins). Include only one per block unless the nesting
 * makes the winner explicit.
 */
/*
 * Minimal box replication for shadow trees that render \`ButtonFC\` without including
 * \`kol-button-styles\`. The \`kol-global\` reset (\`background\`, \`width\`, \`margin\`, \`padding\`,
 * \`border\`) and the a11y layer \`min-height\`/\`min-width\` apply to the native button, on top of the
 * UA \`inline-block\`, but not to the \`div\` root that carries the \`kol-button\` class. This mixin
 * replicates that outer box on the root, while the inner \`kol-button__interactive-element\` degrades
 * to a plain block container to avoid the inline-level baseline gap the UA \`inline-block\` would add
 * below it.
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
  .kol-combobox {
    /* Scoped to the group that holds the clear button: the info popover in the label renders a \`.kol-button\` as well. */
  }
  .kol-combobox__group .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-combobox__group :host {
    display: inline-block;
  }
  .kol-combobox__group .kol-button {
    display: flex;
    height: 100%;
    min-height: var(--a11y-min-size);
    text-decoration-line: none;
    /* The interactive element is the flex container positioning the text, so it carries the
       box the root element used to be. The UA default underline sits on that element too,
       so suppressing \`text-decoration\` on the wrapper alone is not enough. */
  }
  .kol-combobox__group .kol-button__interactive-element {
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
  .kol-combobox__group .kol-button__interactive-element::before {
    content: "​";
  }
  .kol-combobox__group .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-combobox__group .kol-button {
    /* The tooltip wrapper holds only the absolutely positioned floating tooltip. In the legacy
       DOM it sat in a block flow and collapsed to zero height; as a flex/grid item it would
       stretch to the container height instead, adding phantom rows to the layout. */
  }
  .kol-combobox__group .kol-button__tooltip {
    height: 0;
  }
  .kol-combobox__group .kol-button--external-link > .kolicon-link-external::before {
    content: none;
  }
  .kol-combobox__group .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {
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
}`,H=class extends O{constructor(e){super(),t(this,e),this.ctaRef=m(),this.clearButton=x(()=>this.host),this.translateDeleteSelection=h(`kol-delete-selection`),this.id=s(`combobox`),this.infoPopoverOpen=!1,this.inputHasFocus=!1,this.isOpen=!1,this.blockSuggestionMouseOver=!1,this.hasValue=!1,this.toggleListbox=()=>{var e;if(this.getRenderProp(`disabled`)===!0)this.isOpen=!1;else if((e=this.ctaRef.el)==null||e.focus(),this.isOpen)this.isOpen=!1;else if(Array.isArray(this.filteredSuggestions)&&this.filteredSuggestions.length>0){this.isOpen=!0;let e=this.filteredSuggestions.findIndex(e=>e===this.getRenderProp(`value`));this.focusedIndex=e>=0?e:-1,this.focusOption(this.focusedIndex)}},this.handleComboboxInput=e=>{let t=e.target.value;this.setRenderProp(`value`,t),this._value=t,this.handleInput(e,t),this.setFilteredSuggestionsByQuery(t),this.focusedIndex=-1,e.stopImmediatePropagation()},this.handleComboboxChange=e=>{e.stopPropagation();let t=this.getRenderProp(`value`);this.handleChange(e,t),this.hasValue=!!t,this.formAssociation.setFormAssociatedValue(t)},this.handleInputBlur=e=>{this.handleFocusLeave(e)},this.stopClearButtonFocusEvent=e=>{e.stopPropagation()},this.handleDropdownKeyDown=e=>{e.key.length===1&&/[a-z0-9]/i.test(e.key)&&(this.isOpen=!0,this.focusSuggestionStartingWith(e.key))},this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._hasClearButton=!0,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this.initFormAssociation(`combobox`,this._name)}async getValue(){return this.getRenderProp(`value`)}async focus(e){}async click(){}componentWillLoad(){this.initRenderProps(L),this.setRenderProp(`value`,``),this.optionRefs=[],this._touched=this._touched===!0,this.watchAriaDetails(this._ariaDetails),this.watchName(this._name),this.watchSyncValueBySelector(this._syncValueBySelector),this.watchTouched(this._touched),this.watchAccessKey(this._accessKey),this.watchMsg(this._msg),this.watchDisabled(this._disabled),this.watchHideMsg(this._hideMsg),this.watchHideLabel(this._hideLabel),this.watchHint(this._hint),this.watchInfoPopover(this._infoPopover),this.watchLabel(this._label),this.watchShortKey(this._shortKey),this.watchOn(this._on),this.watchTooltipAlign(this._tooltipAlign),this.watchVariant(this._variant),this.watchIcons(this._icons),this.watchHasClearButton(this._hasClearButton),this.watchPlaceholder(this._placeholder),this.watchRequired(this._required),this.applySuggestions(this._suggestions),this.applyValue(this._value),this.hasValue=!!this.getRenderProp(`value`),this.filteredSuggestions=this.getRenderProp(`suggestions`)}componentDidRender(){this.syncFormField(),this.clearButton.syncListeners()}disconnectedCallback(){this.clearButton.destroy(),this.destroyFormField()}getOptionCount(){return Array.isArray(this.filteredSuggestions)?this.filteredSuggestions.length:0}moveFocus(e){this.filteredSuggestions&&this.moveFocusWrapping(e)}focusFirstOption(){this.focusOption(0)}focusLastOption(){this.focusOption(this.filteredSuggestions?this.filteredSuggestions.length-1:0)}handleConfirmKey(e){let t=this.clearButton.getRootElement();if(!(t&&e.composedPath().includes(t))){if(e.key===` `){this.isOpen&&this.selectFocusedOption()&&(this.isOpen=!1,e.preventDefault());return}this.isOpen&&this.selectFocusedOption()?this.isOpen=!1:this.toggleListbox(),e.preventDefault()}}selectFocusedOption(){return this.filteredSuggestions&&this.focusedIndex>=0&&this.focusedIndex<this.filteredSuggestions.length?(this.selectOption(this.filteredSuggestions[this.focusedIndex]),!0):!1}focusSuggestionStartingWith(e){let t=e.toLowerCase(),n=Array.isArray(this.filteredSuggestions)&&this.filteredSuggestions.length>0&&this.filteredSuggestions.findIndex(e=>e.toLowerCase().startsWith(t));typeof n==`number`&&this.focusOption(n)}setFilteredSuggestionsByQuery(e){if(e===void 0)return;let t=this.getRenderProp(`suggestions`);e.trim()===``?this.filteredSuggestions=[...t]:(this.filteredSuggestions=Array.isArray(t)?t.filter(t=>t.toLowerCase().includes(e.trim().toLowerCase())):this.filteredSuggestions,this.isOpen=this.filteredSuggestions?.length===1&&this.filteredSuggestions[0]===e?!1:!!(this.filteredSuggestions&&this.filteredSuggestions.length>0))}selectOption(e){var t;let n=this.getRenderProp(`name`);this.handleInput(a(o.input,{name:n,value:e},this.ctaRef.el),e),this.handleChange(a(o.change,{name:n,value:e},this.ctaRef.el),e),this.hasValue=!!e,this.formAssociation.setFormAssociatedValue(e),this.filteredSuggestions=[...this.getRenderProp(`suggestions`)],this.setRenderProp(`value`,e),(t=this.ctaRef.el)==null||t.focus()}clearSelection(){var e;if(this.getRenderProp(`disabled`)===!0)return;(e=this.ctaRef.el)==null||e.focus(),this.focusedIndex=-1,this._value=``,this.setRenderProp(`value`,``),this.filteredSuggestions=[...this.getRenderProp(`suggestions`)],this.isOpen=!1;let t={name:this.getRenderProp(`name`),value:``};this.handleInput(a(o.input,t,this.ctaRef.el),``),this.handleChange(a(o.change,t,this.ctaRef.el),``),this.hasValue=!1,this.formAssociation.setFormAssociatedValue(``)}handleHostKeyDown(e){this.handleListboxKeyDown(e)}handleMouseEvent(){this.handleListboxMouseMove()}handleFocusIn(e){this.host?.contains(document.activeElement)&&!this.inputHasFocus&&this.handleFocus(e)}handleFocusOut(e){let t=e.relatedTarget,n=t&&(t===this.host||this.host?.contains(t));this.inputHasFocus&&!n&&(this.handleBlur(e),this.isOpen&&=!1)}getInputProps(){let{ariaDescribedBy:e,hasError:t}=this.getAria(),n=this.id,r=this.getRenderProp(`disabled`)===!0,i=this.getRenderProp(`accessKey`)||void 0,a=this.getRenderProp(`placeholder`),o=this.getRenderProp(`shortKey`)||void 0,s=this.getRenderProp(`hideLabel`),l=this.getRenderProp(`label`);return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({id:n,hideLabel:s,label:l,disabled:r,name:this.getRenderProp(`name`)||void 0},i?{accessKey:i}:{}),{value:this.getRenderProp(`value`),required:this.getRenderProp(`required`)}),a?{placeholder:a}:{}),{touched:this.getRenderProp(`touched`),msg:this.getRenderProp(`msg`)}),o?{"aria-keyshortcuts":o}:{}),{ref:this.ctaRef,class:`kol-combobox__input`,type:`text`,role:`combobox`,"aria-activedescendant":this.isOpen&&this.focusedIndex>=0?`option-${this.focusedIndex}`:void 0,"aria-autocomplete":`both`,"aria-controls":c(n,`listbox`),"aria-describedby":e.length>0?e.join(` `):void 0,"aria-expanded":this.isOpen?`true`:`false`,"aria-label":s&&typeof l==`string`?l:void 0,"aria-labelledby":c(n,`label`),autocapitalize:`off`,autocorrect:`off`,autocomplete:`off`,onBlur:this.handleInputBlur,onChange:this.handleComboboxChange,onClick:this.handleClick,onFocus:this.handleFocus,onInput:this.handleComboboxInput,onKeyDown:this.handleKeyDown,ariaDescribedBy:e,"aria-invalid":t?`true`:void 0})}renderOptions(){let t=this.getRenderProp(`value`);return Array.isArray(this.filteredSuggestions)&&this.filteredSuggestions.length>0&&this.filteredSuggestions.map((n,r)=>e(E,{disabled:!1,index:r,option:n,searchTerm:t,ref:e=>{e&&(this.optionRefs[r]=e)},selected:t===n,onClick:()=>{this.selectOption(n),this.toggleListbox(),this.isOpen=!1},onMouseOver:()=>{this.blockSuggestionMouseOver||this.focusOption(r)},onFocus:()=>{this.focusOption(r)}}))}render(){let t=this.getRenderProp(`disabled`)===!0,{startAdornment:r,endAdornment:i}=k({icons:this.getRenderProp(`icons`)});return e(n,{key:`a3b8a5b0e0b9b3a33b325222eb0e5aaa53f6896f`},e(C,Object.assign({key:`2a3b36c0d399a8c903f4e11cb79b734d5ad85e5d`},this.getFormFieldProps({class:u(`kol-combobox`,{"has-value":this.hasValue,"kol-combobox--open":this.isOpen}),accessKey:this.getRenderProp(`accessKey`)||void 0,shortKey:this.getRenderProp(`shortKey`)||void 0,required:this.getRenderProp(`required`),variant:this.getRenderProp(`variant`)})),e(j,{key:`4920e001c754874fdaa38cf981818ca05a158de1`,disabled:t,msg:this.getRenderProp(`msg`),touched:this.getRenderProp(`touched`),startAdornment:r,endAdornment:i},e(T,{key:`79b64bdd4b29c6e3b7b30afd343b7765ffb32f24`,block:`kol-combobox`},e(I,Object.assign({key:`d7be272c75c4da7c09704f7ffc368be344f5ec08`},this.getInputProps())),this.getRenderProp(`value`)&&this.getRenderProp(`hasClearButton`)&&e(g,Object.assign({key:`f56de655e619f478f645eff94cf51cf6ebadcc08`},this.clearButton.getFcProps({_icons:`kolicon-cross`,_label:this.translateDeleteSelection,_hideLabel:!0,_variant:`ghost`,_disabled:t,_on:{onClick:()=>{this.clearSelection()}}},{class:R,"data-testid":`combobox-delete`,hidden:t,onBlur:this.stopClearButtonFocusEvent,onFocus:this.stopClearButtonFocusEvent}))),e(B,{key:`e86ccd7227de8007d1fc08a8137d7af506f014e9`,disabled:t,handleClick:this.toggleListbox})),e(D,{key:`6afa01029db156738bd4402c7761fd3597dadb26`,blockSuggestionMouseOver:this.blockSuggestionMouseOver,onKeyDown:this.handleDropdownKeyDown,hidden:!this.isOpen||t,id:c(this.id,`listbox`)},this.renderOptions()))))}watchAccessKey(e){y.apply(e,e=>this.setRenderProp(`accessKey`,e)),b(e,this._shortKey)}watchAriaDetails(e){this.applyAriaDetails(e)}watchDisabled(e){this.applyDisabled(e)}watchHasClearButton(e){w.apply(e,e=>this.setRenderProp(`hasClearButton`,e))}watchHideMsg(e){this.applyHideMsg(e)}watchHideLabel(e){this.applyHideLabel(e)}watchHint(e){this.applyHint(e)}watchIcons(e){A.apply(e,e=>this.setRenderProp(`icons`,e))}watchInfoPopover(e){this.applyInfoPopover(e)}watchLabel(e){this.applyLabel(e)}watchMsg(e){this.applyMsg(e)}watchName(e){this.applyName(e)}watchOn(e){this.applyOn(e)}watchPlaceholder(e){M.apply(e,e=>this.setRenderProp(`placeholder`,e))}watchRequired(e){N.apply(e,e=>this.setRenderProp(`required`,e))}watchShortKey(e){_.apply(e,e=>this.setRenderProp(`shortKey`,e)),b(this._accessKey,e)}applySuggestions(e){P.apply(e,e=>this.setRenderProp(`suggestions`,e))}watchSuggestions(e){this.applySuggestions(e),this.filteredSuggestions=e,this.setFilteredSuggestionsByQuery(this._value)}watchSyncValueBySelector(e){this.applySyncValueBySelector(e)}watchTooltipAlign(e){this.applyTooltipAlign(e)}watchTouched(e){this.applyTouched(e)}applyValue(e){e!=null&&F.apply(e,e=>this.setRenderProp(`value`,e))}watchValue(e){this.applyValue(e),this.formAssociation.setFormAssociatedValue(e)}watchVariant(e){v.apply(e,e=>this.setRenderProp(`variant`,e))}get host(){return r(this)}static get watchers(){return{_accessKey:[`watchAccessKey`],_ariaDetails:[`watchAriaDetails`],_disabled:[`watchDisabled`],_hasClearButton:[`watchHasClearButton`],_hideMsg:[`watchHideMsg`],_hideLabel:[`watchHideLabel`],_hint:[`watchHint`],_icons:[`watchIcons`],_infoPopover:[`watchInfoPopover`],_label:[`watchLabel`],_msg:[`watchMsg`],_name:[`watchName`],_on:[`watchOn`],_placeholder:[`watchPlaceholder`],_required:[`watchRequired`],_shortKey:[`watchShortKey`],_suggestions:[`watchSuggestions`],_syncValueBySelector:[`watchSyncValueBySelector`],_tooltipAlign:[`watchTooltipAlign`],_touched:[`watchTouched`],_value:[`watchValue`],_variant:[`watchVariant`]}}};l([f(`ctaRef`)],H.prototype,`focus`,null),l([p(`ctaRef`)],H.prototype,`click`,null),H.style={default:V};export{H as kol_combobox};