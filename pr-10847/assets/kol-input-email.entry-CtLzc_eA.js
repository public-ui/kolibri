import{a as e,o as t,s as n}from"./index-DvoLHFlN.js";import{n as r,t as i}from"./dev.utils-A9MRsgGn-D-6Mgm0B.js";import"./base-web-component--IgFgz37-CZuvR3uB.js";import{t as a}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as o}from"./clsx-COFh-Vc8-DWAop4cA.js";import"./Heading-Dw2CkQ2C-On-RQ4Aa.js";import"./disabled-DHab6EOc-BE1ux0Uk.js";import"./label-ZH747kkB-B8hrrqFp.js";import{n as s,r as c,t as l}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-CLh45UCk-DFoI_7pQ.js";import"./i18n-Cmt851J--CO_-BUz4.js";import"./component-CFj3Bexm-prw-D5-l.js";import"./Alert-BN1F-zDS-Dv9lA3rr.js";import"./label-s1pae7YC-BeU0Rw9m.js";import"./variant-quote-BAFdbnIf-BQuOlJrl.js";import"./component-CRnCniDf-DFXcHJrd.js";import"./icons-CbRjDakd-C0lwARun.js";import"./align-DBGYeCKM-B-_bcLVe.js";import"./align-floating-elements-DRG1e3y5-C8ilrxMI.js";import"./behavior-BEgsUF3a-DA2HlYYO.js";import"./variant-class-name-D7x6_3bV-CcBei3ZR.js";import"./component-CdsTEYyd-CPGtZoQg.js";import{n as u}from"./controller-B-Fnijar-CTbQuPLk.js";import"./aria-details-Et-v7Zkc-DlPa-6cV.js";import"./associated.controller-Uk_mQZxg-gOcoHG3P.js";import"./hide-label-Dopnspe7-AiG4uuCv.js";import"./tooltip-align-DjUwle2i-DXVADFww.js";import{t as d}from"./FormFieldStateWrapper-mcjCnTLP-DJb_GLbm.js";import{t as f}from"./controller-icon-BYtyQBar-ffj-8bm9.js";import"./Input-Df0eMQ34-8mOXHYSl.js";import{t as p}from"./InputStateWrapper-b8eVEL5Y-CgZBDwuE.js";import"./placeholder-Bd5ftTco-Co-_7n-l.js";import"./required-BRwq1Cvq-JiqBXS5_.js";import"./suggestions-D-rGe2A0-Cm1mCxRo.js";import"./auto-complete-DPgh67Y6-DvonKG6x.js";import"./read-only-BTvlY0k1-B_7Y00HP.js";import{i as m,t as h}from"./counter-dom-updater-CvrPV1MB-CSP0REtg.js";import{t as g}from"./multiple-BOk9V6as-OelK84Hz.js";import"./spell-check-CYXabOkZ-B2D7VOwD.js";import"./controller-TvgBd-wE-Zmx7vqLy.js";import{n as _}from"./controller-DvNxSy5d-qU5U-NdI.js";var v=class extends _{constructor(e,t,n){super(e,t,n),this.component=e}validateMultiple(e){g(this.component,e)}validateMaxLengthBehavior(e){m(this.component,e)}componentWillLoad(){super.componentWillLoad(),this.validateMaxLengthBehavior(this.component._maxLengthBehavior),this.validateMultiple(this.component._multiple)}},y=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1789063956206"); /* IE9*/
  src: url("kolicons.eot?t=1789063956206#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1789063956206") format("woff2"), url("kolicons.woff?t=1789063956206") format("woff"), url("kolicons.ttf?t=1789063956206") format("truetype"), url("kolicons.svg?t=1789063956206#kolicons") format("svg"); /* iOS 4.1- */
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
  }
  .kol-form-field .kol-popover-button--inline__button {
    display: inline;
  }
  .kol-form-field .kol-popover-button--inline {
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
  .kol-form-field .kol-popover-button--open + .kol-popover {
    opacity: 1;
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
}`,b=class{async getValue(){return this.ctaRef.el?.value}async focus(e){}async click(){}getFormFieldProps(){return{state:this.state,class:o(`kol-input-email`,`email`,{"has-value":this.state._hasValue,"kol-form-field--has-counter":this.controller.hasSoftCharacterLimit()||this.controller.hasCounter()}),tooltipAlign:this._tooltipAlign,alert:this.showAsAlert(),counterRefs:{visualRef:this.counterUpdater.setVisualRef,ariaRef:this.counterUpdater.setAriaRef},infoPopover:this._infoPopover}}getInputProps(){let e=typeof this.state._maxLength==`number`&&!this.controller.hasCounter()?[i(this.state._id,`character-limit-hint`)]:void 0;return Object.assign(Object.assign({ref:this.ctaRef,state:this.state,type:`email`,ariaDescribedBy:e},this.controller.onFacade),{onInput:this.onInput,onKeyDown:this.onKeyDown,onFocus:e=>{this.controller.onFacade.onFocus(e),this.inputHasFocus=!0,this.counterUpdater.retriggerAria(this._value?.length??0,this.state._maxLength,this.state._maxLengthBehavior??`hard`)},onBlur:e=>{this.controller.onFacade.onBlur(e),this.inputHasFocus=!1}})}render(){return t(d,Object.assign({key:`e58a99398800a52272ac6090480cfd3518741286`},this.getFormFieldProps()),t(f,{key:`a45e099240282b895202a4ca2f8afa8a9106a4fc`,state:this.state},t(p,Object.assign({key:`ebc3b56f01c132b9e705d4456ddab2c47064ef0d`},this.getInputProps()))))}constructor(e){n(this,e),this.ctaRef=l(),this.counterUpdater=new h,this.onKeyDown=e=>{this.controller.onFacade.onKeyDown(e),this.counterUpdater.handleKeyDown(e,this.ctaRef.el?.value.length??0,this.state._maxLength,this.state._maxLengthBehavior??`hard`),(e.code===`Enter`||e.code===`NumpadEnter`)&&u({form:this.host})},this.onInput=e=>{this._value=e.target.value,this.controller.onFacade.onInput(e)},this._autoComplete=`off`,this._hasCounter=!1,this._maxLengthBehavior=`hard`,this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._multiple=!1,this._readOnly=!1,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this.state={_hasValue:!1,_hideMsg:!1,_id:r(`input-email`),_label:``,_suggestions:[]},this.inputHasFocus=!1,this.controller=new v(this,`email`,this.host)}showAsAlert(){return!!this.state._touched&&!this.inputHasFocus}validateAccessKey(e){this.controller.validateAccessKey(e)}validateAriaDetails(e){this.controller.validateAriaDetails(e)}validateAutoComplete(e){this.controller.validateAutoComplete(e)}validateDisabled(e){this.controller.validateDisabled(e)}validateHideMsg(e){this.controller.validateHideMsg(e)}validateHideLabel(e){this.controller.validateHideLabel(e)}validateHasCounter(e){this.controller.validateHasCounter(e)}validateHint(e){this.controller.validateHint(e)}validateIcons(e){this.controller.validateIcons(e)}validateLabel(e){this.controller.validateLabel(e)}validateMaxLength(e){this.controller.validateMaxLength(e),this.counterUpdater.updateImmediate(this._value?.length??0,this.state._maxLength,this.state._maxLengthBehavior??`hard`)}validateMsg(e){this.controller.validateMsg(e)}validateMultiple(e){this.controller.validateMultiple(e)}validateName(e){this.controller.validateName(e)}validateOn(e){this.controller.validateOn(e)}validatePattern(e){this.controller.validatePattern(e)}validatePlaceholder(e){this.controller.validatePlaceholder(e)}validateReadOnly(e){this.controller.validateReadOnly(e)}validateRequired(e){this.controller.validateRequired(e)}validateShortKey(e){this.controller.validateShortKey(e)}validateSuggestions(e){this.controller.validateSuggestions(e)}validateSmartButton(e){this.controller.validateSmartButton(e)}validateSyncValueBySelector(e){this.controller.validateSyncValueBySelector(e)}validateTouched(e){this.controller.validateTouched(e)}validateValue(e){this.controller.validateValue(e),this.counterUpdater.update(e?.length??0,this.state._maxLength,this.state._maxLengthBehavior??`hard`)}validateMaxLengthBehavior(e){this.controller.validateMaxLengthBehavior(e)}validateVariant(e){this.controller.validateVariant(e)}componentDidLoad(){(this.controller.hasCounter()||this.controller.hasSoftCharacterLimit())&&this.counterUpdater.updateImmediate(this._value?.length??0,this.state._maxLength,this.state._maxLengthBehavior??`hard`)}disconnectedCallback(){this.counterUpdater.destroy()}componentWillLoad(){this._touched=this._touched===!0,this.validateAriaDetails(this._ariaDetails),this.controller.componentWillLoad(),this.state._hasValue=!!this.state._value,this.controller.addValueChangeListener(e=>this.state._hasValue=!!e)}get host(){return e(this)}static get watchers(){return{_accessKey:[`validateAccessKey`],_ariaDetails:[`validateAriaDetails`],_autoComplete:[`validateAutoComplete`],_disabled:[`validateDisabled`],_hideMsg:[`validateHideMsg`],_hideLabel:[`validateHideLabel`],_hasCounter:[`validateHasCounter`],_hint:[`validateHint`],_icons:[`validateIcons`],_label:[`validateLabel`],_maxLength:[`validateMaxLength`],_msg:[`validateMsg`],_multiple:[`validateMultiple`],_name:[`validateName`],_on:[`validateOn`],_pattern:[`validatePattern`],_placeholder:[`validatePlaceholder`],_readOnly:[`validateReadOnly`],_required:[`validateRequired`],_shortKey:[`validateShortKey`],_suggestions:[`validateSuggestions`],_smartButton:[`validateSmartButton`],_syncValueBySelector:[`validateSyncValueBySelector`],_touched:[`validateTouched`],_value:[`validateValue`],_maxLengthBehavior:[`validateMaxLengthBehavior`],_variant:[`validateVariant`]}}};a([c(`ctaRef`)],b.prototype,`focus`,null),a([s(`ctaRef`)],b.prototype,`click`,null),b.style={default:y};export{b as kol_input_email};