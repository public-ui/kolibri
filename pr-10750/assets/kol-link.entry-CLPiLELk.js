import{a as e,o as t,r as n,s as r}from"./index-DiB1rt3M.js";import{i}from"./dev.utils-A9MRsgGn-B_F1yQaM.js";import"./base-web-component--IgFgz37-CZuvR3uB.js";import{t as a}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import"./label-ZH747kkB-BysO6wyZ.js";import{r as o}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-CLh45UCk-vb4EHkDY.js";import"./i18n-Cmt851J--DZL6m-OQ.js";import"./component-CFj3Bexm-DtZetqVU.js";import"./label-s1pae7YC-4876dPWD.js";import"./variant-quote-BAFdbnIf-kllL6B1e.js";import"./component-CRnCniDf-DO7jdUxO.js";import"./align-DBGYeCKM-B8QphO-V.js";import"./component-BmwViiIW-heJKa1p5.js";import"./align-floating-elements-DRG1e3y5-B2f0fbTr.js";import"./behavior-BEgsUF3a-CJI36woR.js";import"./label-with-expert-slot-1YjWiXRp-QMC6jBcJ.js";import"./variant-class-name-D7x6_3bV-Be-n0azK.js";import"./component-CdsTEYyd-B5ir9a2u.js";import{t as s}from"./access-and-short-key-ijzCZfHm-Dx5Q-CAn.js";import"./href-D4yxlbfj-nbzDQTaM.js";import{t as c}from"./base-UfhnYJi4-C5WroYXg.js";var l=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1789065332942"); /* IE9*/
  src: url("kolicons.eot?t=1789065332942#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1789065332942") format("woff2"), url("kolicons.woff?t=1789065332942") format("woff"), url("kolicons.ttf?t=1789065332942") format("truetype"), url("kolicons.svg?t=1789065332942#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-link {
    display: inline-flex;
    max-width: fit-content;
  }
  .kol-link--standalone {
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: stretch;
    /* The interactive element is the flex container positioning the text — it must
       stretch its content so the text pill keeps the full standalone height. */
  }
  .kol-link--standalone .kol-link__interactive-element {
    align-items: stretch;
  }
  .kol-link--standalone .kol-link__text {
    display: inline-flex;
    flex: 1 1 100%;
    place-items: center;
  }
  .kol-link__interactive-element {
    display: inline-flex;
    flex: 1;
    align-items: baseline;
    place-items: center;
    text-align: left;
    text-decoration-line: none;
  }
  .kol-link__interactive-element:focus:not([aria-disabled], [disabled]) .kol-span__label, .kol-link__interactive-element:hover:not([aria-disabled], [disabled]) .kol-span__label {
    text-decoration-thickness: 0.2em;
  }
  .kol-link .kol-span__label {
    text-decoration-line: underline;
  }
  .kol-link__icon {
    display: inline-flex;
  }
}`,u=class extends c{constructor(e){super(),r(this,e),this.ariaCurrent=``,this.ariaDescriptionId=i(),this.expertSlot=!1,this._disabled=!1,this._hideLabel=!1,this._inline=!0,this._tooltipAlign=`right`}componentWillLoad(){this.initLinkRenderProps(),this.watchAccessKey(this._accessKey),this.watchAriaControls(this._ariaControls),this.watchAriaCurrentValue(this._ariaCurrentValue),this.watchAriaDescription(this._ariaDescription),this.watchAriaExpanded(this._ariaExpanded),this.watchDisabled(this._disabled),this.watchDownload(this._download),this.watchHideLabel(this._hideLabel),this.watchHref(this._href),this.watchIcons(this._icons),this.watchInline(this._inline),this.watchLabel(this._label),this.watchOn(this._on),this.watchShortKey(this._shortKey),this.watchTarget(this._target),this.watchTooltipAlign(this._tooltipAlign),this.watchVariant(this._variant),s(this._accessKey,this._shortKey),this.initLinkBehaviors()}componentDidRender(){this.syncTooltipListeners()}disconnectedCallback(){this.destroyLinkBehaviors()}async focus(e){}render(){return t(n,{key:`c0e844a3073284fb40b185e662654e6a1f94d118`},this.renderLinkFC())}watchAccessKey(e){this.applyAccessKey(e)}watchAriaCurrentValue(e){this.applyAriaCurrentValue(e)}watchAriaControls(e){this.applyAriaControls(e)}watchAriaDescription(e){this.applyAriaDescription(e)}watchAriaExpanded(e){this.applyAriaExpanded(e)}watchDisabled(e){this.applyDisabled(e)}watchDownload(e){this.applyDownload(e)}watchHideLabel(e){this.applyHideLabel(e)}watchHref(e){this.applyHref(e)}watchIcons(e){this.applyIcons(e)}watchInline(e){this.applyInline(e)}watchLabel(e){this.applyLabel(e)}watchOn(e){this.applyOn(e)}watchShortKey(e){this.applyShortKey(e)}watchTarget(e){this.applyTarget(e)}watchTooltipAlign(e){this.applyTooltipAlign(e)}watchVariant(e){this.applyVariant(e)}get host(){return e(this)}static get watchers(){return{_accessKey:[`watchAccessKey`],_ariaCurrentValue:[`watchAriaCurrentValue`],_ariaControls:[`watchAriaControls`],_ariaDescription:[`watchAriaDescription`],_ariaExpanded:[`watchAriaExpanded`],_disabled:[`watchDisabled`],_download:[`watchDownload`],_hideLabel:[`watchHideLabel`],_href:[`watchHref`],_icons:[`watchIcons`],_inline:[`watchInline`],_label:[`watchLabel`],_on:[`watchOn`],_shortKey:[`watchShortKey`],_target:[`watchTarget`],_tooltipAlign:[`watchTooltipAlign`],_variant:[`watchVariant`]}}};a([o(`ctaRef`)],u.prototype,`focus`,null),u.style={default:l};export{u as kol_link};