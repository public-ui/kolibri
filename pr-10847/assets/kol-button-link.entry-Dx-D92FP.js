import{a as e,o as t,r as n,s as r}from"./index-DnfxAFMW.js";import{i}from"./dev.utils-A9MRsgGn-CjQi-Gfh.js";import"./base-web-component--IgFgz37-CZuvR3uB.js";import{t as a}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import"./label-ZH747kkB-BsPcbvz8.js";import{n as o,r as s}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-CLh45UCk-DQunsIAo.js";import"./component-CFj3Bexm-4tYS7WQd.js";import"./label-s1pae7YC-dnKBtZjr.js";import"./variant-quote-BAFdbnIf-Bcsu5EmQ.js";import"./component-CRnCniDf-BrZL1TeG.js";import"./align-DBGYeCKM-CIsVMbw9.js";import"./component-BmwViiIW-CyDul3pN.js";import"./align-floating-elements-DRG1e3y5-CaPJ8FAv.js";import"./behavior-BEgsUF3a-BTTXppb4.js";import"./label-with-expert-slot-1YjWiXRp-CcB-fwhs.js";import"./name-A0pMzQn_-DKgqeyv8.js";import"./variant-class-name-D7x6_3bV-BQ01Is73.js";import"./component-CdsTEYyd-BHRDd83v.js";import"./controller-B-Fnijar-DEWwF-ls.js";import"./aria-details-Et-v7Zkc-DMegIhei.js";import"./associated.controller-Uk_mQZxg-CVJoaGpA.js";import{t as c}from"./base-f-ZBxh8o-p1uYB_hp.js";var l=`@charset "UTF-8";
/* forward the rem function */
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
@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1789064908803"); /* IE9*/
  src: url("kolicons.eot?t=1789064908803#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1789064908803") format("woff2"), url("kolicons.woff?t=1789064908803") format("woff"), url("kolicons.ttf?t=1789064908803") format("truetype"), url("kolicons.svg?t=1789064908803#kolicons") format("svg"); /* iOS 4.1- */
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
 * Link styles for a skeleton block whose interactive element sits inside the BEM root:
 * \`kol-link\` renders \`<div class="kol-link"><a class="kol-link__interactive-element">\`,
 * \`kol-button\` renders \`<div class="kol-button"><button class="kol-button__interactive-element">\`.
 */
@layer kol-component {
  /* The button DOM now has its own interactive element (\`kol-button__interactive-element\`), so the shared link
     mixin scopes the alignment declarations there — the same element they applied to before, when
     the button itself carried the \`kol-button\` class. The former root-level compensation block is
     therefore gone. */
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
    display: inline-flex;
    max-width: fit-content;
  }
  .kol-button--standalone {
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: stretch;
    /* The interactive element is the flex container positioning the text — it must
       stretch its content so the text pill keeps the full standalone height. */
  }
  .kol-button--standalone .kol-button__interactive-element {
    align-items: stretch;
  }
  .kol-button--standalone .kol-button__text {
    display: inline-flex;
    flex: 1 1 100%;
    place-items: center;
  }
  .kol-button__interactive-element {
    display: inline-flex;
    flex: 1;
    align-items: baseline;
    place-items: center;
    text-align: left;
    text-decoration-line: none;
  }
  .kol-button__interactive-element:focus:not([aria-disabled], [disabled]) .kol-span__label, .kol-button__interactive-element:hover:not([aria-disabled], [disabled]) .kol-span__label {
    text-decoration-thickness: 0.2em;
  }
  .kol-button .kol-span__label {
    text-decoration-line: underline;
  }
  .kol-button__icon {
    display: inline-flex;
  }
  .kol-button--inline {
    min-width: unset;
    min-height: unset;
  }
  .kol-button--inline .kol-button__interactive-element {
    min-width: unset;
    min-height: unset;
  }
}`,u=class extends c{constructor(e){super(),r(this,e),this.ariaDescriptionId=i(),this._disabled=!1,this._hideLabel=!1,this._inline=!0,this._tooltipAlign=`top`,this._type=`button`,this.initFormAssociation()}componentWillLoad(){this.initButtonRenderProps(),this.watchAccessKey(this._accessKey),this.watchAriaControls(this._ariaControls),this.watchAriaDescription(this._ariaDescription),this.watchAriaExpanded(this._ariaExpanded),this.watchAriaSelected(this._ariaSelected),this.watchDisabled(this._disabled),this.watchHideLabel(this._hideLabel),this.watchIcons(this._icons),this.watchInline(this._inline),this.watchLabel(this._label),this.watchName(this._name),this.watchOn(this._on),this.watchShortKey(this._shortKey),this.watchSyncValueBySelector(this._syncValueBySelector),this.watchTooltipAlign(this._tooltipAlign),this.watchType(this._type),this.watchValue(this._value),this.watchVariant(this._variant),this.initTooltipBehavior()}componentDidRender(){this.syncTooltipListeners()}disconnectedCallback(){this.destroyTooltipBehavior()}async getValue(){return this._value}async focus(e){}async click(){}render(){return t(n,{key:`b2f48c237f0c7e86e17cf099b995411300c05960`},this.renderButtonFC())}watchAccessKey(e){this.applyAccessKey(e,this._shortKey)}watchAriaControls(e){this.applyAriaControls(e)}watchAriaDescription(e){this.applyAriaDescription(e)}watchAriaExpanded(e){this.applyAriaExpanded(e)}watchAriaSelected(e){this.applyAriaSelected(e)}watchDisabled(e){this.applyDisabled(e)}watchHideLabel(e){this.applyHideLabel(e)}watchIcons(e){this.applyIcons(e)}watchInline(e){this.applyInline(e)}watchLabel(e){this.applyLabel(e)}watchName(e){this.applyName(e)}watchOn(e){this.applyOn(e)}watchRole(){}watchShortKey(e){this.applyShortKey(e,this._accessKey)}watchSyncValueBySelector(e){this.applySyncValueBySelector(e)}watchTooltipAlign(e){this.applyTooltipAlign(e)}watchType(e){this.applyType(e)}watchValue(e){this.applyValue(e)}watchVariant(e){this.applyVariant(e)}get host(){return e(this)}static get watchers(){return{_accessKey:[`watchAccessKey`],_ariaControls:[`watchAriaControls`],_ariaDescription:[`watchAriaDescription`],_ariaExpanded:[`watchAriaExpanded`],_ariaSelected:[`watchAriaSelected`],_disabled:[`watchDisabled`],_hideLabel:[`watchHideLabel`],_icons:[`watchIcons`],_inline:[`watchInline`],_label:[`watchLabel`],_name:[`watchName`],_on:[`watchOn`],_role:[`watchRole`],_shortKey:[`watchShortKey`],_syncValueBySelector:[`watchSyncValueBySelector`],_tooltipAlign:[`watchTooltipAlign`],_type:[`watchType`],_value:[`watchValue`],_variant:[`watchVariant`]}}};a([s(`ctaRef`)],u.prototype,`focus`,null),a([o(`ctaRef`)],u.prototype,`click`,null),u.style={default:l};export{u as kol_button_link};