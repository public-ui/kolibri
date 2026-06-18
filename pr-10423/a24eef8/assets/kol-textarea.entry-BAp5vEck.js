import{At as e,a as t,jt as n,o as r,s as i}from"./index-Dcf_6s25.js";import{n as a,t as o}from"./dev.utils-W9Q9EkQD-CO6xDJln.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-B5NKuJgN-po0fWuiR.js";import"./label-BT-6lb8r-DgasDdTd.js";import"./base-web-component-CArCAUxk-BJ4GTAy8.js";import"./base-controller-CXhqh4cR-BNzx0WwK.js";import{n as s,t as c}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as l}from"./clsx-COFh-Vc8-alQuJLqj.js";import"./component--kVItxH9-DNq-8sJW.js";import"./component-CBypoTPN-D-Sp439s.js";import"./component-rq1Vzq3l-Ba7Gm3yZ.js";import"./align-floating-elements-CqZdcuwL-DTzjb661.js";import"./align-DdWzcKWR-iEeQa-sp.js";import"./controller-CJs4fTO0-CKRy-td-.js";import"./Heading-BjXtppmV-RklUVIhi.js";import"./disabled-DzYBnXfG-7cCnKzzJ.js";import"./label-BiOix5de-LnEk_-i4.js";import"./element-focus-BQXzaLL9-oq1SsV6e.js";import{n as u,r as d,t as f}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./i18n-CFuSxM6N-B29rDU5-.js";import"./Alert-fNlqHwku-DpiJ1-1r.js";import"./icons-BfxrxChI-CH-w0yAk.js";import"./access-and-short-key-C7QS_Tel-DptgK_PD.js";import"./hide-label-jbOZNqJV-O1dsbozz.js";import"./tooltip-align-BZrIplzz-BPSpxnn5.js";import"./variant-class-name-B1jsQGPM-DtM_cGZa.js";import"./aria-labelledby-6-ki3akM-C6lJ0lQF.js";import"./aria-details-CG4GFq8t-KET9vtai.js";import"./associated.controller-4x11SU1V-ijFmYoaf.js";import{a as p,c as m,o as h,s as g,t as _}from"./FormFieldStateWrapper-DtrgCLRz-DRvZfuf-.js";import{n as v,t as y}from"./controller-icon-U-abwErp-B6ksgoyD.js";import{t as b}from"./placeholder-B4wceSsL-riltqVU6.js";import{t as x}from"./required-By197yB9-BukJXdpj.js";import{t as S}from"./read-only-DIC7Vhiy-DaVdckou.js";import{n as C,r as w,t as T}from"./max-length-behavior-CRJOkECl-64ffIjtg.js";import{t as E}from"./spell-check-CKvoSTJE-TehNbT_X.js";import{t as D}from"./rows-BwZCT-gJ-qaByxBPr.js";var O=[`vertical`,`none`],k=e=>typeof e==`string`&&O.includes(e),A=(e,t)=>{n(e,`_resize`,k,new Set(O),t,{defaultValue:`vertical`})},j=e=>{let{class:t,msg:n,touched:i,readonly:a,disabled:o,required:c,ariaDescribedBy:u,hideLabel:d,label:f}=e,g=s(e,[`class`,`msg`,`touched`,`readonly`,`disabled`,`required`,`ariaDescribedBy`,`hideLabel`,`label`]),_={"kol-textarea--disabled":!!o,"kol-textarea--required":!!c,"kol-textarea--touched":!!i,"kol-textarea--readonly":!!a,[`kol-textarea--${h(n)}`]:m(n,i)},v=Object.assign(Object.assign({class:l(`kol-textarea`,_,t),required:c,disabled:o,readonly:a},p({ariaDescribedBy:u,hideLabel:d,label:f})),g);return r(`textarea`,Object.assign({},v))};function M(e,t){let n=[...g(e).ariaDescribedBy,...t.ariaDescribedBy??[]],r=Object.assign(Object.assign({id:e._id,hideLabel:e._hideLabel,label:e._label,value:e._value,accessKey:e._accessKey,disabled:e._disabled,name:e._name,rows:e._rows,readonly:e._readOnly,required:e._required,placeholder:e._placeholder,touched:e._touched,msg:e._msg},t),{ariaDescribedBy:n});return`_maxLength`in e&&`_maxLengthBehavior`in e&&e._maxLengthBehavior===`hard`&&(r.maxLength=e._maxLength),`_shortKey`in e&&(r[`aria-keyshortcuts`]=e._shortKey),r}var N=e=>{var{state:t}=e,n=s(e,[`state`]);return r(j,Object.assign({},M(t,n)))},P=class extends v{constructor(e,t,n){super(e,t,n),this.afterSyncCharCounter=()=>{typeof this.component._value==`string`&&(this.component.state._currentLength=this.component._value.length,this.updateCurrentLengthDebounced(this.component._value.length))},this.component=e}validateHasCounter(e){T(this.component,e)}validateMaxLengthBehavior(e){w(this.component,e)}validateMaxLength(e){C(this.component,e,{hooks:{afterPatch:this.afterSyncCharCounter}})}validatePlaceholder(e){b(this.component,e)}validateReadOnly(e){S(this.component,e)}validateResize(e){A(this.component,e)}validateRequired(e){x(this.component,e)}validateRows(e){D(this.component,e)}validateSpellCheck(e){E(this.component,e)}validateValue(t){e(this.component,`_value`,t,{hooks:{afterPatch:this.afterSyncCharCounter}}),this.setFormAssociatedValue(this.component._value)}componentWillLoad(){super.componentWillLoad(),this.validateHasCounter(this.component._hasCounter),this.validateMaxLengthBehavior(this.component._maxLengthBehavior),this.validateMaxLength(this.component._maxLength),this.validatePlaceholder(this.component._placeholder),this.validateReadOnly(this.component._readOnly),this.validateRequired(this.component._required),this.validateResize(this.component._resize),this.validateRows(this.component._rows),this.validateSpellCheck(this.component._spellCheck),this.validateValue(this.component._value)}},F=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1781810961988"); /* IE9*/
  src: url("kolicons.eot?t=1781810961988#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1781810961988") format("woff2"), url("kolicons.woff?t=1781810961988") format("woff"), url("kolicons.ttf?t=1781810961988") format("truetype"), url("kolicons.svg?t=1781810961988#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-textarea {
    width: 100%;
  }
  .kol-textarea:focus {
    outline: none;
  }
}`,I=e=>{e.style.overflow=`hidden`;let t=e.rows,n=e.clientHeight/t;e.rows=1;let r=Math.round(e.scrollHeight/n);return e.rows=t,r},L=class{async getValue(){return this.ctaRef.el?.value}async focus(e){}async click(){}getFormFieldProps(){return{state:this.state,class:l(`kol-form-field-textarea`,{"kol-form-field--has-value":this.state._hasValue,"kol-form-field--has-counter":this.controller.hasSoftCharacterLimit()||this.controller.hasCounter()}),tooltipAlign:this._tooltipAlign,alert:this.showAsAlert()}}getTextAreaProps(){let e=typeof this.state._maxLength==`number`?[o(this.state._id,`character-limit-hint`)]:void 0;return Object.assign(Object.assign({ref:this.ctaRef,state:this.state,style:{resize:this.state._resize},ariaDescribedBy:e},this.controller.onFacade),{onInput:this.onInput,onFocus:e=>{this.controller.onFacade.onFocus(e),this.inputHasFocus=!0},onBlur:e=>{this.controller.onFacade.onBlur(e),this.inputHasFocus=!1}})}render(){return r(_,Object.assign({key:`24e29e18b88fe756f4cb2bd44044c95194042fad`},this.getFormFieldProps()),r(y,{key:`510945913640229aeff1d513917f74c3f69ccb78`,state:this.state},r(N,Object.assign({key:`2a712ce4f0865675d9ca762f1bf43be486952810`},this.getTextAreaProps()))))}validateAriaDetails(e){this.controller.validateAriaDetails(e)}constructor(e){i(this,e),this.ctaRef=f(),this._adjustHeight=!1,this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._hasCounter=!1,this._maxLengthBehavior=`hard`,this._readOnly=!1,this._resize=`vertical`,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this.state={_adjustHeight:!1,_currentLength:0,_currentLengthDebounced:0,_hasValue:!1,_hideMsg:!1,_id:a(`textarea`),_label:``,_resize:`vertical`},this.inputHasFocus=!1,this.onInput=e=>{this.ctaRef.el instanceof HTMLTextAreaElement&&(this._value=this.ctaRef.el.value,this.state._adjustHeight&&(this._rows=I(this.ctaRef.el)),this.controller.onFacade.onInput(e))},this.controller=new P(this,`textarea`,this.host)}showAsAlert(){return!!this.state._touched&&!this.inputHasFocus}validateAccessKey(e){this.controller.validateAccessKey(e)}validateAdjustHeight(e){this.controller.validateAdjustHeight(e)}validateDisabled(e){this.controller.validateDisabled(e)}validateHideMsg(e){this.controller.validateHideMsg(e)}validateHideLabel(e){this.controller.validateHideLabel(e)}validateHasCounter(e){this.controller.validateHasCounter(e)}validateHint(e){this.controller.validateHint(e)}validateIcons(e){this.controller.validateIcons(e)}validateLabel(e){this.controller.validateLabel(e)}validateMaxLength(e){this.controller.validateMaxLength(e)}validateMaxLengthBehavior(e){this.controller.validateMaxLengthBehavior(e)}validateMsg(e){this.controller.validateMsg(e)}validateName(e){this.controller.validateName(e)}validateOn(e){this.controller.validateOn(e)}validatePlaceholder(e){this.controller.validatePlaceholder(e)}validateReadOnly(e){this.controller.validateReadOnly(e)}validateResize(e){this.controller.validateResize(e)}validateRequired(e){this.controller.validateRequired(e)}validateRows(e){this.controller.validateRows(e)}validateShortKey(e){this.controller.validateShortKey(e)}validateSpellCheck(e){this.controller.validateSpellCheck(e)}validateSyncValueBySelector(e){this.controller.validateSyncValueBySelector(e)}validateTouched(e){this.controller.validateTouched(e)}validateValue(e){this.controller.validateValue(e)}validateVariant(e){this.controller.validateVariant(e)}componentDidLoad(){setTimeout(()=>{this._adjustHeight===!0&&this.ctaRef.el?this._rows=this.state?._rows&&this.state._rows>I(this.ctaRef.el)?this.state._rows:I(this.ctaRef.el):this._rows||=1})}componentWillLoad(){this.validateAriaDetails(this._ariaDetails),this._touched=this._touched===!0,this.controller.componentWillLoad(),this.state._hasValue=!!this.state._value,this.controller.addValueChangeListener(e=>this.state._hasValue=!!e)}get host(){return t(this)}static get watchers(){return{_ariaDetails:[`validateAriaDetails`],_accessKey:[`validateAccessKey`],_adjustHeight:[`validateAdjustHeight`],_disabled:[`validateDisabled`],_hideMsg:[`validateHideMsg`],_hideLabel:[`validateHideLabel`],_hasCounter:[`validateHasCounter`],_hint:[`validateHint`],_icons:[`validateIcons`],_label:[`validateLabel`],_maxLength:[`validateMaxLength`],_maxLengthBehavior:[`validateMaxLengthBehavior`],_msg:[`validateMsg`],_name:[`validateName`],_on:[`validateOn`],_placeholder:[`validatePlaceholder`],_readOnly:[`validateReadOnly`],_resize:[`validateResize`],_required:[`validateRequired`],_rows:[`validateRows`],_shortKey:[`validateShortKey`],_spellCheck:[`validateSpellCheck`],_syncValueBySelector:[`validateSyncValueBySelector`],_touched:[`validateTouched`],_value:[`validateValue`],_variant:[`validateVariant`]}}};c([d(`ctaRef`)],L.prototype,`focus`,null),c([u(`ctaRef`)],L.prototype,`click`,null),L.style={default:F};export{L as kol_textarea};