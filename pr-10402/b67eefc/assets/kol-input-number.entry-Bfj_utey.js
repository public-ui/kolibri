import{a as e,m as t,o as n,s as r}from"./index-CcZkV93W.js";import{n as i}from"./dev.utils-Dmb_SvCG-DGnKRsz9.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-rW24VVe4-DaduqZEc.js";import"./variant-quote-CzAiT5yX-77Tus-f1.js";import{t as a}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as o}from"./clsx-COFh-Vc8-alQuJLqj.js";import{t as s}from"./component-Cyve-WN_-xQmWB5sG.js";import"./component-CXsKiPA_-D6muGqgg.js";import"./component-BvH_TpvQ-DPFePzrL.js";import"./align-floating-elements-DwqJV_lT-CupjEFE5.js";import"./align-CmftpO30-DW9Yb-kU.js";import"./label-Di21OWPa-FmnFmmzl.js";import"./base-controller-CXhqh4cR-BNzx0WwK.js";import"./controller-eQqeCy73-DChG7DJ9.js";import"./label-RJS8RHnZ-CSL0RHn7.js";import"./Heading-DgNRlM7v-_z97vbNe.js";import"./element-focus-CRwW4N4R-Cv74ka6W.js";import{n as c,r as l,t as u}from"./element-interaction-Bv-mPSBn-4Bg3OLEQ.js";import"./disabled-H7AU-f6D-NcFsu4XB.js";import"./i18n-CAP8MuX--CWRbBrPj.js";import"./Alert-H-OcsxpW-DW9EhdCK.js";import"./icons-DSC70NUz-DTTMOGe4.js";import"./access-and-short-key-DXlGyMZX-BUxnEGLO.js";import{n as d}from"./controller-DeuMBWcc-UtrP1COd.js";import"./associated.controller-Dz-MmUjW-DpCJwOgM.js";import"./hide-label-CXncuc70-P-Fql3tk.js";import"./tooltip-align-CzfB4STj-BKa2OU8m.js";import"./variant-class-name-BEv65n6p-BduT_XaK.js";import{t as f}from"./FormFieldStateWrapper-9eDy6DEq-COarfiAI.js";import{n as p,t as m}from"./controller-icon-KK-Ff4ED-D6tFfd3_.js";import"./Input-Bc7ZJMii-CWnggEtl.js";import{t as h}from"./InputStateWrapper-BMx4F2aT-DuoHKmqb.js";import{t as g}from"./placeholder-Cllkccw3-CqyJ1_5j.js";import{t as _}from"./required-I-Lj6RG--CfUtjUfo.js";import{t as v}from"./suggestions--Ndxt92z-DjBmM5yT.js";import{t as y}from"./auto-complete-CJQ4bUXh-B7UMdSlX.js";import{t as b}from"./read-only-DudO8pW8-DJsbdjGA.js";var x=class extends p{constructor(e,t,n){super(e,t,n),this.component=e}validateAutoComplete(e){y(this.component,e)}validateSuggestions(e){v(this.component,e)}validateMax(e){this.validateNumber(`_max`,e)}validateMin(e){this.validateNumber(`_min`,e)}validatePlaceholder(e){g(this.component,e)}validateReadOnly(e){b(this.component,e)}validateRequired(e){_(this.component,e)}validateStep(e){this.validateNumber(`_step`,e)}validateValue(e){this.validateNumber(`_value`,e),this.setFormAssociatedValue(this.component.state._value)}componentWillLoad(){super.componentWillLoad(),this.validateAutoComplete(this.component._autoComplete),this.validateMax(this.component._max),this.validateMin(this.component._min),this.validateSuggestions(this.component._suggestions),this.validatePlaceholder(this.component._placeholder),this.validateReadOnly(this.component._readOnly),this.validateRequired(this.component._required),this.validateStep(this.component._step),this.validateValue(this.component._value)}},S=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1781591364708"); /* IE9*/
  src: url("kolicons.eot?t=1781591364708#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1781591364708") format("woff2"), url("kolicons.woff?t=1781591364708") format("woff"), url("kolicons.ttf?t=1781591364708") format("truetype"), url("kolicons.svg?t=1781591364708#kolicons") format("svg"); /* iOS 4.1- */
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
}`,C=class{async getValue(){return this.remapValue(this.state._value)}async focus(){}async click(){}setInitialValueType(e){this.controller.isNumberString(e)?this._initialValueType=`NumberString`:typeof e==`number`&&!isNaN(e)?this._initialValueType=`number`:this._initialValueType=`null`}remapValue(e){return e==null?null:this._initialValueType===`NumberString`?String(e):e}getFormFieldProps(){return{state:this.state,class:o(`kol-input-number`,`number`,{"has-value":this.state._hasValue}),tooltipAlign:this._tooltipAlign,alert:this.showAsAlert()}}getInputProps(){return Object.assign(Object.assign({ref:this.ctaRef,state:this.state,type:`number`},this.controller.onFacade),{onInput:this.onInput,onChange:this.onChange,onKeyDown:this.onKeyDown,onFocus:e=>{e.relatedTarget?.classList.contains(`kol-input-number__step-button`)||(this.controller.onFacade.onFocus(e),this.inputHasFocus=!0)},onBlur:e=>{e.relatedTarget?.classList.contains(`kol-input-number__step-button`)||(this.controller.onFacade.onBlur(e),this.inputHasFocus=!1)}})}getStepUpButton(){return this._disabled||this._readOnly||t(`inputNumberButtons`)===`hide`?null:n(`button`,{type:`button`,tabIndex:-1,class:`kol-input-number__step-button kol-input-number__step-button-up kol-input-container__smart-button`,"data-testid":`kol-input-number-step-up`,onClick:e=>{var t,n;(t=this.ctaRef.el)==null||t.stepUp();let r=this.ctaRef.el?.value;this._value=this.remapValue(r===``?null:Number(r)),this.controller.onFacade.onInput(e,!0,this._value),this.controller.onFacade.onChange(e,this._value),(n=this.ctaRef.el)==null||n.focus()},disabled:this._disabled||this._readOnly},n(s,{icons:`kolicon-plus`,label:``}))}getStepDownButton(){return this._disabled||this._readOnly||t(`inputNumberButtons`)===`hide`?null:n(`button`,{type:`button`,tabIndex:-1,class:`kol-input-number__step-button kol-input-number__step-button-down kol-input-container__smart-button`,"data-testid":`kol-input-number-step-down`,onClick:e=>{var t,n;(t=this.ctaRef.el)==null||t.stepDown();let r=this.ctaRef.el?.value;this._value=this.remapValue(r===``?null:Number(r)),this.controller.onFacade.onInput(e,!0,this._value),this.controller.onFacade.onChange(e,this._value),(n=this.ctaRef.el)==null||n.focus()},disabled:this._disabled||this._readOnly},n(s,{icons:`kolicon-minus`,label:``}))}render(){return n(f,Object.assign({key:`086a28bde88ecebfaef16e2c7eed8b0d7d1229e9`},this.getFormFieldProps()),n(m,{key:`b34412f5bedd7d933bdc2e30385266a446b44e2e`,state:this.state,startAdornment:this.getStepDownButton(),endAdornment:this.getStepUpButton()},n(h,Object.assign({key:`5a0153226914a8e8a34a6b5af42178f348979981`},this.getInputProps()))))}constructor(e){r(this,e),this.ctaRef=u(),this.onInput=e=>{let t=this.ctaRef.el?.value;this._value=this.remapValue(t===``?null:Number(t)),this.controller.onFacade.onInput(e,!0,this._value)},this.onChange=e=>{let t=this.ctaRef.el?.value,n=this.remapValue(t===``?null:Number(t));this.controller.onFacade.onChange(e,n)},this.onKeyDown=e=>{this.controller.onFacade.onKeyDown(e),(e.code===`Enter`||e.code===`NumpadEnter`)&&d({form:this.host})},this._autoComplete=`off`,this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._readOnly=!1,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this.state={_hasValue:!1,_hideMsg:!1,_id:i(`input-number`),_label:``,_suggestions:[]},this._initialValueType=`null`,this.inputHasFocus=!1,this.controller=new x(this,`number`,this.host)}showAsAlert(){return!!this.state._touched&&!this.inputHasFocus}validateAccessKey(e){this.controller.validateAccessKey(e)}validateAutoComplete(e){this.controller.validateAutoComplete(e)}validateDisabled(e){this.controller.validateDisabled(e)}validateHideMsg(e){this.controller.validateHideMsg(e)}validateHideLabel(e){this.controller.validateHideLabel(e)}validateHint(e){this.controller.validateHint(e)}validateIcons(e){this.controller.validateIcons(e)}validateLabel(e){this.controller.validateLabel(e)}validateMax(e){this.controller.validateMax(e)}validateMin(e){this.controller.validateMin(e)}validateMsg(e){this.controller.validateMsg(e)}validateName(e){this.controller.validateName(e)}validateOn(e){this.controller.validateOn(e)}validatePlaceholder(e){this.controller.validatePlaceholder(e)}validateReadOnly(e){this.controller.validateReadOnly(e)}validateRequired(e){this.controller.validateRequired(e)}validateShortKey(e){this.controller.validateShortKey(e)}validateSmartButton(e){this.controller.validateSmartButton(e)}validateSuggestions(e){this.controller.validateSuggestions(e)}validateStep(e){this.controller.validateStep(e)}validateSyncValueBySelector(e){this.controller.validateSyncValueBySelector(e)}validateTouched(e){this.controller.validateTouched(e)}validateValue(e){this.controller.validateValue(e),e!=null&&this.setInitialValueType(e)}validateVariant(e){this.controller.validateVariant(e)}componentWillLoad(){this._value!==void 0&&this.setInitialValueType(this._value),this._touched=this._touched===!0,this.controller.componentWillLoad(),this.state._hasValue=!!this.state._value,this.controller.addValueChangeListener(e=>this.state._hasValue=!!e)}get host(){return e(this)}static get watchers(){return{_accessKey:[`validateAccessKey`],_autoComplete:[`validateAutoComplete`],_disabled:[`validateDisabled`],_hideMsg:[`validateHideMsg`],_hideLabel:[`validateHideLabel`],_hint:[`validateHint`],_icons:[`validateIcons`],_label:[`validateLabel`],_max:[`validateMax`],_min:[`validateMin`],_msg:[`validateMsg`],_name:[`validateName`],_on:[`validateOn`],_placeholder:[`validatePlaceholder`],_readOnly:[`validateReadOnly`],_required:[`validateRequired`],_shortKey:[`validateShortKey`],_smartButton:[`validateSmartButton`],_suggestions:[`validateSuggestions`],_step:[`validateStep`],_syncValueBySelector:[`validateSyncValueBySelector`],_touched:[`validateTouched`],_value:[`validateValue`],_variant:[`validateVariant`]}}};a([l(`ctaRef`)],C.prototype,`focus`,null),a([c(`ctaRef`)],C.prototype,`click`,null),C.style={default:S};export{C as kol_input_number};
//# sourceMappingURL=kol-input-number.entry-Bfj_utey.js.map