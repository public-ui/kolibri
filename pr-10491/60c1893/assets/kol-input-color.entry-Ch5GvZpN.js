import{a as e,jt as t,o as n,s as r}from"./index-kuJX54Zs.js";import{n as i,t as a}from"./dev.utils-JsUkUKLF-D_xZWVtD.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-iLdS6AQE-01lClF8y.js";import"./label-BwPy2Jd4-TKcbhfgV.js";import"./base-web-component-BCIMb9gN-BzZGsCJL.js";import"./base-controller-CXhqh4cR-BNzx0WwK.js";import{t as o}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import"./clsx-COFh-Vc8-alQuJLqj.js";import"./component-Cs0XGawJ-DCr8ybyY.js";import"./component-zND7vT6D-DqQzyPMF.js";import"./component-BRDkSTlQ-37IxPyQN.js";import"./align-floating-elements-Xqbu3THH-olJEazHN.js";import"./align-BdqBkiyq-B8a4y24M.js";import"./controller-BUTW5QfH-BIn7OaO8.js";import"./Heading-BMhJ1aE8-BGv7EA3o.js";import"./disabled-DfW4ft-F-Oaz5-wTB.js";import"./label-We78Dt9U-jmFa7czV.js";import"./element-focus-BQXzaLL9-oq1SsV6e.js";import{n as s,r as c,t as l}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./i18n-CcjZRTxD-wtlg_EkO.js";import"./Alert-CDMIORKT-ClaHalLU.js";import"./icons-BGkS8g2K-DKoWe_Ko.js";import"./access-and-short-key-DzjVTrop-CwFmhjWi.js";import"./hide-label-BDwvU6I8-CLPuhPFe.js";import"./tooltip-align-LkJ2mgrc-BQIIR-5E.js";import"./variant-class-name-D8tvX7Qv-DakPSwyP.js";import"./aria-labelledby-6-ki3akM-C6lJ0lQF.js";import"./aria-details-Ddidnfeo-CKIYp9NX.js";import"./associated.controller-yo_yku-m-D4Kvfl5T.js";import{t as u}from"./FormFieldStateWrapper-CzAJHBpQ-XY44oL4Q.js";import{n as d,t as f}from"./controller-icon-56ZCmjmo-Dl9HSyfo.js";import"./Input-DriVWOdX-CHeSA4Ep.js";import{t as p}from"./InputStateWrapper-C3m_HOWP-C95tE4Z5.js";import{t as m}from"./suggestions-D4UUoZGS-DWjKPuxk.js";import{t as h}from"./auto-complete-CyU7zRoT-JwEfyQ5D.js";var g=class extends d{constructor(e,t,n){super(e,t,n),this.component=e}validateAutoComplete(e){h(this.component,e)}validateSuggestions(e){m(this.component,e)}validateValue(e){t(this.component,`_value`,e),this.setFormAssociatedValue(this.component.state._value)}componentWillLoad(){super.componentWillLoad(),this.validateAutoComplete(this.component._autoComplete),this.validateSuggestions(this.component._suggestions),this.validateValue(this.component._value)}},_=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1783918413701"); /* IE9*/
  src: url("kolicons.eot?t=1783918413701#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1783918413701") format("woff2"), url("kolicons.woff?t=1783918413701") format("woff"), url("kolicons.ttf?t=1783918413701") format("truetype"), url("kolicons.svg?t=1783918413701#kolicons") format("svg"); /* iOS 4.1- */
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
    min-height: var(--a11y-min-size);
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-alert .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
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
  .kol-input {
    background-color: transparent;
    width: 100%;
    min-width: var(--a11y-min-size);
  }
  .kol-input:focus {
    outline: none;
  }
  .kol-input-color__input--color {
    flex: 1 1 min-content;
  }
  .kol-input-color__input--text {
    flex: 0 0 calc(86 * 1rem / var(--kolibri-root-font-size, 16));
  }
  .kol-input-color__inputs-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .kol-input {
    cursor: pointer;
  }
  .kol-input:disabled {
    cursor: not-allowed;
  }
}`,v=class{async getValue(){return this.ctaRef.el?.value}async focus(e){}async click(){}get hasSuggestions(){return Array.isArray(this.state._suggestions)&&this.state._suggestions.length>0}getFormFieldProps(){return{state:this.state,class:`kol-input-color`,tooltipAlign:this._tooltipAlign,alert:this.showAsAlert()}}getInputColorProps(){return Object.assign(Object.assign({},this.getGenericInputProps()),{ref:this.setColorRef,type:`color`,name:this.state._name?`${this.state._name}-color`:void 0,list:this.hasSuggestions?a(this.state._id,`list`):void 0,id:void 0,"aria-hidden":`true`,tabIndex:-1,onInput:this.onColorInput})}getInputTextProps(){return Object.assign(Object.assign({},this.getGenericInputProps()),{ref:this.ctaRef,type:`text`,name:this.state._name?`${this.state._name}-text`:void 0,list:this.hasSuggestions?a(this.state._id,`list`):void 0,onInput:this.onTextInput})}getGenericInputProps(){return Object.assign(Object.assign({state:Object.assign(Object.assign({},this.state),{_suggestions:[]})},this.controller.onFacade),{onBlur:this.onBlur,onFocus:this.onFocus})}render(){return n(u,Object.assign({key:`1820310cf40b91e5a8e0c6ef843a5df1b2f2f491`},this.getFormFieldProps()),n(f,{key:`4f2ebd57878fe5754b6ec99a08c749ba36f97bb5`,state:this.state,class:`kol-input-color__inputs-wrapper`},n(`div`,{key:`6769fd4c2e758a5fc27736abbfb5dc8f2a18d368`,class:`kol-input-color__inputs-wrapper`},n(p,Object.assign({key:`4625bea3279a0c4e35da9080b92e9ef2077f69bf`,class:`kol-input-color__input kol-input-color__input--color`},this.getInputColorProps())),n(p,Object.assign({key:`60d489cdd2c0bbfb29a56a25ecea2dc7d5fb3bcf`,class:`kol-input-color__input kol-input-color__input--text`},this.getInputTextProps())))))}constructor(e){r(this,e),this.ctaRef=l(),this.setColorRef=e=>{this.refInputColor=e},this.onBlur=e=>{this.controller.onFacade.onBlur(e),this.inputHasFocus=!1},this.onFocus=e=>{this.controller.onFacade.onFocus(e),this.inputHasFocus=!0},this.onColorInput=e=>{let t=e.target.value;this.state._value=t,this.ctaRef.el&&(this.ctaRef.el.value=t),this.controller.onFacade.onInput(e)},this.onTextInput=e=>{let t=e.target.value;t.startsWith(`#`)||(t=`#${t}`),this._value=t,this.refInputColor&&(this.refInputColor.value=t),this.controller.onFacade.onInput(e)},this._autoComplete=`off`,this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._tooltipAlign=`top`,this._touched=!1,this.state={_hideMsg:!1,_id:i(`input-color`),_label:``,_suggestions:[]},this.inputHasFocus=!1,this.controller=new g(this,`color`,this.host)}showAsAlert(){return!!this.state._touched&&!this.inputHasFocus}validateAccessKey(e){this.controller.validateAccessKey(e)}validateAriaDetails(e){this.controller.validateAriaDetails(e)}validateAutoComplete(e){this.controller.validateAutoComplete(e)}validateDisabled(e){this.controller.validateDisabled(e)}validateHideMsg(e){this.controller.validateHideMsg(e)}validateHideLabel(e){this.controller.validateHideLabel(e)}validateHint(e){this.controller.validateHint(e)}validateIcons(e){this.controller.validateIcons(e)}validateLabel(e){this.controller.validateLabel(e)}validateMsg(e){this.controller.validateMsg(e)}validateName(e){this.controller.validateName(e)}validateOn(e){this.controller.validateOn(e)}validateShortKey(e){this.controller.validateShortKey(e)}validateSmartButton(e){this.controller.validateSmartButton(e)}validateSuggestions(e){this.controller.validateSuggestions(e)}validateSyncValueBySelector(e){this.controller.validateSyncValueBySelector(e)}validateTouched(e){this.controller.validateTouched(e)}validateValue(e){this.controller.validateValue(e)}validateVariant(e){this.controller.validateVariant(e)}componentDidLoad(){!this._value&&this.refInputColor&&(this._value=this.refInputColor.value)}componentWillLoad(){this._touched=this._touched===!0,this.validateAriaDetails(this._ariaDetails),this.controller.componentWillLoad()}get host(){return e(this)}static get watchers(){return{_accessKey:[`validateAccessKey`],_ariaDetails:[`validateAriaDetails`],_autoComplete:[`validateAutoComplete`],_disabled:[`validateDisabled`],_hideMsg:[`validateHideMsg`],_hideLabel:[`validateHideLabel`],_hint:[`validateHint`],_icons:[`validateIcons`],_label:[`validateLabel`],_msg:[`validateMsg`],_name:[`validateName`],_on:[`validateOn`],_shortKey:[`validateShortKey`],_smartButton:[`validateSmartButton`],_suggestions:[`validateSuggestions`],_syncValueBySelector:[`validateSyncValueBySelector`],_touched:[`validateTouched`],_value:[`validateValue`],_variant:[`validateVariant`]}}};o([c(`ctaRef`)],v.prototype,`focus`,null),o([s(`ctaRef`)],v.prototype,`click`,null),v.style={default:_};export{v as kol_input_color};