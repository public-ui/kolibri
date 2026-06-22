import{a as e,o as t,s as n}from"./index-Ctgs24_X.js";import{n as r}from"./dev.utils-W9Q9EkQD-DmgShw-8.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-B5NKuJgN-CV-zzIGq.js";import"./label-BT-6lb8r-D1RhUsP5.js";import"./base-web-component-CArCAUxk-BRkQnWXU.js";import"./base-controller-CXhqh4cR-BNzx0WwK.js";import{t as i}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as a}from"./clsx-COFh-Vc8-alQuJLqj.js";import{t as o}from"./component--kVItxH9-BqWKT_7S.js";import"./component-CBypoTPN-CX01MHSA.js";import"./component-rq1Vzq3l-AFNIieD0.js";import"./align-floating-elements-CqZdcuwL-Dfa6KVKk.js";import"./align-DdWzcKWR-3CdomLgw.js";import"./controller-CJs4fTO0-vJrYswlk.js";import"./Heading-BjXtppmV-BgWmoYRv.js";import"./disabled-DzYBnXfG-CrLDHpIk.js";import"./label-BiOix5de-BnZENt5Z.js";import"./element-focus-BQXzaLL9-oq1SsV6e.js";import{n as s,r as c,t as l}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./i18n-CFuSxM6N-D-EG6REn.js";import"./Alert-fNlqHwku-DO3lY_7N.js";import"./icons-BfxrxChI-i1jbbCtG.js";import"./access-and-short-key-C7QS_Tel-BgwfUsZn.js";import"./hide-label-jbOZNqJV-DdlmV6m5.js";import"./tooltip-align-BZrIplzz-Cv5VOJV8.js";import"./variant-class-name-B1jsQGPM-ZgU_nRcQ.js";import{n as u}from"./controller-B21n_zqt-BmFF7SPP.js";import"./aria-labelledby-6-ki3akM-C6lJ0lQF.js";import"./aria-details-CG4GFq8t-DsrGk4dH.js";import"./associated.controller-4x11SU1V-ChaR2Ict.js";import{t as d}from"./FormFieldStateWrapper-DtrgCLRz-DJdihPKs.js";import{n as f,t as p}from"./controller-icon-U-abwErp-D1zllAjO.js";import"./Input-D5CL-1xG-UgRiFuww.js";import{t as m}from"./InputStateWrapper-DNCSa5jy-D9Eg8td-.js";import{t as h}from"./placeholder-B4wceSsL-BVVsuUIj.js";import{t as g}from"./required-By197yB9-CHGslePW.js";import{t as _}from"./suggestions-C2o-U3UR-BtYl3Rjy.js";import{t as v}from"./auto-complete-p-8iouPy-Rc8nCxEx.js";import{t as y}from"./read-only-DIC7Vhiy-DUxpJL_U.js";var b=class extends f{constructor(e,t,n){super(e,t,n),this.component=e}validateAutoComplete(e){v(this.component,e)}validateSuggestions(e){_(this.component,e)}validateMax(e){this.validateNumber(`_max`,e)}validateMin(e){this.validateNumber(`_min`,e)}validatePlaceholder(e){h(this.component,e)}validateReadOnly(e){y(this.component,e)}validateRequired(e){g(this.component,e)}validateStep(e){this.validateNumber(`_step`,e)}validateValue(e){this.validateNumber(`_value`,e),this.setFormAssociatedValue(this.component.state._value)}componentWillLoad(){super.componentWillLoad(),this.validateAutoComplete(this.component._autoComplete),this.validateMax(this.component._max),this.validateMin(this.component._min),this.validateSuggestions(this.component._suggestions),this.validatePlaceholder(this.component._placeholder),this.validateReadOnly(this.component._readOnly),this.validateRequired(this.component._required),this.validateStep(this.component._step),this.validateValue(this.component._value)}},x=`@charset "UTF-8";
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
     */
    --a11y-min-size: calc(44 * 1rem / var(--kolibri-root-font-size, 16));
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
  src: url("kolicons.eot?t=1782139555038"); /* IE9*/
  src: url("kolicons.eot?t=1782139555038#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1782139555038") format("woff2"), url("kolicons.woff?t=1782139555038") format("woff"), url("kolicons.ttf?t=1782139555038") format("truetype"), url("kolicons.svg?t=1782139555038#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-form-field--required .kol-tooltip__content .kol-span__label::after {
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
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-input-number input {
    appearance: textfield;
    text-align: right;
  }
  .kol-input-number input::-webkit-inner-spin-button {
    display: none;
  }
}`,S=class{async getValue(){return this.remapValue(this.state._value)}async focus(e){}async click(){}setInitialValueType(e){this.controller.isNumberString(e)?this._initialValueType=`NumberString`:typeof e==`number`&&!isNaN(e)?this._initialValueType=`number`:this._initialValueType=`null`}remapValue(e){return e==null?null:this._initialValueType===`NumberString`?String(e):e}getFormFieldProps(){return{state:this.state,class:a(`kol-input-number`,`number`,{"has-value":this.state._hasValue}),tooltipAlign:this._tooltipAlign,alert:this.showAsAlert()}}getInputProps(){return Object.assign(Object.assign({ref:this.ctaRef,state:this.state,type:`number`},this.controller.onFacade),{onInput:this.onInput,onChange:this.onChange,onKeyDown:this.onKeyDown,onFocus:e=>{e.relatedTarget?.classList.contains(`kol-input-number__step-button`)||(this.controller.onFacade.onFocus(e),this.inputHasFocus=!0)},onBlur:e=>{e.relatedTarget?.classList.contains(`kol-input-number__step-button`)||(this.controller.onFacade.onBlur(e),this.inputHasFocus=!1)}})}getStepUpButton(){return this._disabled||this._readOnly?null:t(`button`,{type:`button`,tabIndex:-1,class:`kol-input-number__step-button kol-input-number__step-button-up kol-input-container__smart-button`,"data-testid":`kol-input-number-step-up`,onClick:e=>{var t,n;(t=this.ctaRef.el)==null||t.stepUp();let r=this.ctaRef.el?.value;this._value=this.remapValue(r===``?null:Number(r)),this.controller.onFacade.onInput(e,!0,this._value),this.controller.onFacade.onChange(e,this._value),(n=this.ctaRef.el)==null||n.focus()},disabled:this._disabled||this._readOnly},t(o,{icons:`kolicon-plus`,label:``}))}getStepDownButton(){return this._disabled||this._readOnly?null:t(`button`,{type:`button`,tabIndex:-1,class:`kol-input-number__step-button kol-input-number__step-button-down kol-input-container__smart-button`,"data-testid":`kol-input-number-step-down`,onClick:e=>{var t,n;(t=this.ctaRef.el)==null||t.stepDown();let r=this.ctaRef.el?.value;this._value=this.remapValue(r===``?null:Number(r)),this.controller.onFacade.onInput(e,!0,this._value),this.controller.onFacade.onChange(e,this._value),(n=this.ctaRef.el)==null||n.focus()},disabled:this._disabled||this._readOnly},t(o,{icons:`kolicon-minus`,label:``}))}render(){return t(d,Object.assign({key:`bb90a49f448fbe879f577dd497eef5312d4cb046`},this.getFormFieldProps()),t(p,{key:`bb898c6d9d52185c11a2e4e60412ffc44033291f`,state:this.state,startAdornment:this.getStepDownButton(),endAdornment:this.getStepUpButton()},t(m,Object.assign({key:`2652645d3824f6126e4c38780fb8cd5214c9f0df`},this.getInputProps()))))}constructor(e){n(this,e),this.ctaRef=l(),this.onInput=e=>{let t=this.ctaRef.el?.value;this._value=this.remapValue(t===``?null:Number(t)),this.controller.onFacade.onInput(e,!0,this._value)},this.onChange=e=>{let t=this.ctaRef.el?.value,n=this.remapValue(t===``?null:Number(t));this.controller.onFacade.onChange(e,n)},this.onKeyDown=e=>{this.controller.onFacade.onKeyDown(e),(e.code===`Enter`||e.code===`NumpadEnter`)&&u({form:this.host})},this._autoComplete=`off`,this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._readOnly=!1,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this.state={_hasValue:!1,_hideMsg:!1,_id:r(`input-number`),_label:``,_suggestions:[]},this._initialValueType=`null`,this.inputHasFocus=!1,this.controller=new b(this,`number`,this.host)}showAsAlert(){return!!this.state._touched&&!this.inputHasFocus}validateAccessKey(e){this.controller.validateAccessKey(e)}validateAriaDetails(e){this.controller.validateAriaDetails(e)}validateAutoComplete(e){this.controller.validateAutoComplete(e)}validateDisabled(e){this.controller.validateDisabled(e)}validateHideMsg(e){this.controller.validateHideMsg(e)}validateHideLabel(e){this.controller.validateHideLabel(e)}validateHint(e){this.controller.validateHint(e)}validateIcons(e){this.controller.validateIcons(e)}validateLabel(e){this.controller.validateLabel(e)}validateMax(e){this.controller.validateMax(e)}validateMin(e){this.controller.validateMin(e)}validateMsg(e){this.controller.validateMsg(e)}validateName(e){this.controller.validateName(e)}validateOn(e){this.controller.validateOn(e)}validatePlaceholder(e){this.controller.validatePlaceholder(e)}validateReadOnly(e){this.controller.validateReadOnly(e)}validateRequired(e){this.controller.validateRequired(e)}validateShortKey(e){this.controller.validateShortKey(e)}validateSmartButton(e){this.controller.validateSmartButton(e)}validateSuggestions(e){this.controller.validateSuggestions(e)}validateStep(e){this.controller.validateStep(e)}validateSyncValueBySelector(e){this.controller.validateSyncValueBySelector(e)}validateTouched(e){this.controller.validateTouched(e)}validateValue(e){this.controller.validateValue(e),e!=null&&this.setInitialValueType(e)}validateVariant(e){this.controller.validateVariant(e)}componentWillLoad(){this._value!==void 0&&this.setInitialValueType(this._value),this._touched=this._touched===!0,this.validateAriaDetails(this._ariaDetails),this.controller.componentWillLoad(),this.state._hasValue=!!this.state._value,this.controller.addValueChangeListener(e=>this.state._hasValue=!!e)}get host(){return e(this)}static get watchers(){return{_accessKey:[`validateAccessKey`],_ariaDetails:[`validateAriaDetails`],_autoComplete:[`validateAutoComplete`],_disabled:[`validateDisabled`],_hideMsg:[`validateHideMsg`],_hideLabel:[`validateHideLabel`],_hint:[`validateHint`],_icons:[`validateIcons`],_label:[`validateLabel`],_max:[`validateMax`],_min:[`validateMin`],_msg:[`validateMsg`],_name:[`validateName`],_on:[`validateOn`],_placeholder:[`validatePlaceholder`],_readOnly:[`validateReadOnly`],_required:[`validateRequired`],_shortKey:[`validateShortKey`],_smartButton:[`validateSmartButton`],_suggestions:[`validateSuggestions`],_step:[`validateStep`],_syncValueBySelector:[`validateSyncValueBySelector`],_touched:[`validateTouched`],_value:[`validateValue`],_variant:[`validateVariant`]}}};i([c(`ctaRef`)],S.prototype,`focus`,null),i([s(`ctaRef`)],S.prototype,`click`,null),S.style={default:x};export{S as kol_input_number};