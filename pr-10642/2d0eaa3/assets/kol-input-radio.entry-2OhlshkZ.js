import{a as e,o as t,s as n}from"./index-g0nlQi03.js";import{n as r,t as i}from"./dev.utils-BUt19n2f-BF-7RwtV.js";import"./base-web-component-BT6jbe_v-Vp21XLG3.js";import{n as a}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as o}from"./clsx-COFh-Vc8-alQuJLqj.js";import"./Heading-BGEnUxXW-CseXDpZe.js";import"./disabled-jKlKAF7J-C7UKDwDn.js";import"./label-Dwxm-V_h-Dl-Vld9v.js";import{i as s,n as c,r as l,t as u}from"./element-focus-BQXzaLL9-oq1SsV6e.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-Cpy0t9-X-w9x1p8by.js";import"./i18n-D8kFHvIt-JEWSsX2W.js";import"./component-Cam6i5s--CjyDOyju.js";import"./Alert-DSjZwkeY-BNSAKO25.js";import"./label-BGcJjCR_-dWrNrEgK.js";import"./variant-quote-CZ5CemUm-CdZsI56l.js";import"./component-BYL32eGP-DG7v1P5P.js";import"./access-and-short-key-VGm6CSC--Vti_Zzcw.js";import"./hide-label-C_IKiUpx-CYtHJO11.js";import"./align-CCcqVV8A-DyNFL8yC.js";import"./tooltip-align-B40m4aqW-ruQde04u.js";import"./variant-class-name-BCVDdbOR-CX5AkevK.js";import"./component-B3ZP1CAm-C-w283G1.js";import"./align-floating-elements-8q78rXbD-CcLARn5N.js";import"./controller-Bt_GTg1G-CtbMGhYV.js";import{n as d}from"./controller-SZD-7scL-B__TzI8t.js";import"./aria-details-WJh-R8i2-BSho6EUs.js";import"./associated.controller-D4Xnuy8v-CvsY6Dgb.js";import{c as f,o as p,s as m,t as h}from"./FormFieldStateWrapper-RlGPuh3D-BYJElpYj.js";import{t as g}from"./Input-D7Sr5v5L-CQ0sBeR0.js";import"./required-Jalqrrjz-CDNxgYZ1.js";import"./orientation-CveWosyb-DmUNOmjK.js";import{n as _}from"./controller-DAbmzo4D-Dc6ua1xi.js";import{t as v}from"./FieldControlStateWrapper-Cq9U6QTl-DdneTlsL.js";var y=e=>{var{class:n}=e,r=a(e,[`class`]);return t(g,Object.assign({class:o(`kol-input-radio__input`,n)},r,{type:`radio`}))},b=e=>{var{class:n,inputProps:r}=e,i=a(e,[`class`,`inputProps`]);let s={"kol-input-radio--checked":r?.checked,"kol-input-radio--disabled":!!r?.disabled,"kol-input-radio--required":!!r?.required,"kol-input-radio--touched":!!r?.touched,[`kol-input-radio--${p(r?.msg)}`]:!!f(r?.msg,r?.touched)};return t(`label`,Object.assign({class:o(`kol-input-radio`,s,n)},i),t(y,Object.assign({},r)))};function x(e,t={}){let{hasError:n}=m(e),r={id:e._id,hideLabel:e._hideLabel,label:e._label,value:e._value,disabled:e._disabled,name:e._name};return`_required`in e&&(r.required=e._required),`_touched`in e&&(r.touched=e._touched),`_msg`in e&&(r.msg=e._msg),Object.assign(Object.assign(Object.assign({},r),t),{"aria-invalid":n?`true`:void 0})}var S=e=>{var{state:n,inputProps:r}=e,i=a(e,[`state`,`inputProps`]);return t(b,Object.assign({inputProps:x(n,r)},i))},C=`@charset "UTF-8";
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
*/
@layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component;
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
  src: url("kolicons.eot?t=1785963997539"); /* IE9*/
  src: url("kolicons.eot?t=1785963997539#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1785963997539") format("woff2"), url("kolicons.woff?t=1785963997539") format("woff"), url("kolicons.ttf?t=1785963997539") format("truetype"), url("kolicons.svg?t=1785963997539#kolicons") format("svg"); /* iOS 4.1- */
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
    height: 100%;
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
    place-items: center;
  }
  .kol-form-field {
    --border-width: 2px;
    --input-size: 1.5em;
  }
  .kol-form-field__label {
    display: contents;
  }
  .kol-form-field__label-text {
    display: ruby;
  }
  .kol-form-field__input {
    display: flex;
    flex-direction: column;
  }
  .kol-form-field__input--orientation-horizontal {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
  }
  .kol-form-field--disabled {
    opacity: unset;
  }
  .kol-input-radio {
    display: flex;
    position: relative;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .kol-input-radio__input {
    border-style: solid;
    border-radius: 100%;
    display: flex;
    width: var(--input-size);
    min-width: var(--input-size);
    height: var(--input-size);
    min-height: var(--input-size);
    margin: 0;
    padding: 0;
    border-width: var(--border-width);
    appearance: none;
    cursor: pointer;
  }
  .kol-input-radio__input:before {
    border-radius: 100%;
    width: calc(var(--input-size) / 2);
    height: calc(var(--input-size) / 2);
    margin: auto;
    content: "";
  }
  .kol-input-radio__input:checked:before {
    background-color: black;
  }
  @media (forced-colors: active) {
    .kol-input-radio__input:checked:before {
      /* Give it a visible background in forced colors mode */
      background-color: selectedItem !important;
    }
  }
  .kol-input-radio__input:disabled {
    cursor: not-allowed;
  }
  .kol-input-radio--disabled {
    cursor: not-allowed;
  }
}`,w=class{async getValue(){return this._value}async focus(e){let t=this.getFocusableInput();return c(this.host,()=>s(t,e))}async click(){return u(this.host,async()=>l(this.inputRef))}getFocusableInput(){let e=this.state._options,t=!!this.state._disabled,n=e.findIndex(e=>e.value===this.state._value&&!t&&!e.disabled);if(n!==-1){let e=this.inputRefs.get(n);if(e)return e}let r=e.findIndex(e=>!t&&!e.disabled);if(r!==-1)return this.inputRefs.get(r)}getFormFieldProps(){return{state:this.state,component:`fieldset`,disabled:!!this.state._disabled,class:o(`kol-form-field--radio`),formFieldLabelProps:{component:`legend`,class:`kol-form-field__label--legend`},formFieldInputProps:{class:`kol-form-field__input--orientation-${this.state._orientation}`},tooltipAlign:this._tooltipAlign,alert:this.showAsAlert(),hideLabel:!1}}render(){return t(h,Object.assign({key:`18fe76de71cf3eb35886aca3cfdf4acb7b163eb2`},this.getFormFieldProps()),this.state._options.map((e,t)=>this.renderOption(e,t)))}calculateDisabled(e){return!!this.state._disabled||!!e.disabled}getOptionProps(e,t){return{state:this.state,id:t,hint:e.hint,label:e.label,required:!1,fieldControlLabelProps:{showBadge:!1},disabled:this.calculateDisabled(e)}}getInputProps(e,t,n,r){return{state:this.state,inputProps:Object.assign(Object.assign({id:t,ref:e=>{this.setInputRefByIndex(n)(e),r&&this.setInputRef(e)},"aria-label":this.state._hideLabel&&typeof e.label==`string`?e.label:void 0,type:`radio`,name:this.state._name||this.state._id,value:`-${n}`,checked:r,disabled:this.calculateDisabled(e)},this.controller.onFacade),{onChange:this.onChange,onClick:void 0,onInput:this.onInput,onKeyDown:this.onKeyDown.bind(this),onFocus:e=>{this.controller.onFacade.onFocus(e),this.inputHasFocus=!0},onBlur:e=>{this.controller.onFacade.onBlur(e),this.inputHasFocus=!1}})}}renderOption(e,n){let r=i(this.state._id,String(n)),a=this.state._value===e.value;return t(v,Object.assign({key:r},this.getOptionProps(e,r)),t(S,Object.assign({},this.getInputProps(e,r,n,a))))}constructor(e){n(this,e),this.inputRefs=new Map,this.setInputRef=e=>{this.inputRef=e},this.setInputRefByIndex=e=>t=>{t?this.inputRefs.set(e,t):this.inputRefs.delete(e)},this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._orientation=`vertical`,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this._value=null,this.state={_hideMsg:!1,_id:r(`input-radio`),_label:``,_options:[],_orientation:`vertical`},this.inputHasFocus=!1,this.onInput=e=>{if(e.target instanceof HTMLInputElement){let t=this.controller.getOptionByKey(e.target.value);t!==void 0&&this.controller.onFacade.onInput(e,!0,t.value)}},this.onChange=e=>{if(e.target instanceof HTMLInputElement){let t=this.controller.getOptionByKey(e.target.value);t!==void 0&&(this.controller.onFacade.onChange(e,t.value),this._value=t.value)}},this.onKeyDown=e=>{this.controller.onFacade.onKeyDown(e),(e.code===`Enter`||e.code===`NumpadEnter`)&&d({form:this.host})},this.controller=new _(this,`radio`,this.host)}showAsAlert(){return!!this.state._touched&&!this.inputHasFocus}validateTooltipAlign(e){this.controller.validateTooltipAlign(e)}validateAriaDetails(e){this.controller.validateAriaDetails(e)}validateDisabled(e){this.controller.validateDisabled(e)}validateHideLabel(e){this.controller.validateHideLabel(e)}validateHideMsg(e){this.controller.validateHideMsg(e)}validateHint(e){this.controller.validateHint(e)}validateLabel(e){this.controller.validateLabel(e)}validateMsg(e){this.controller.validateMsg(e)}validateName(e){this.controller.validateName(e)}validateOn(e){this.controller.validateOn(e)}validateOptions(e){this.controller.validateOptions(e)}validateOrientation(e){this.controller.validateOrientation(e)}validateRequired(e){this.controller.validateRequired(e)}validateSyncValueBySelector(e){this.controller.validateSyncValueBySelector(e)}validateTouched(e){this.controller.validateTouched(e)}validateValue(e){this.controller.validateValue(e)}validateVariant(e){this.controller.validateVariant(e)}componentWillLoad(){this._touched=this._touched===!0,this.validateAriaDetails(this._ariaDetails),this.controller.componentWillLoad()}get host(){return e(this)}static get watchers(){return{_tooltipAlign:[`validateTooltipAlign`],_ariaDetails:[`validateAriaDetails`],_disabled:[`validateDisabled`],_hideLabel:[`validateHideLabel`],_hideMsg:[`validateHideMsg`],_hint:[`validateHint`],_label:[`validateLabel`],_msg:[`validateMsg`],_name:[`validateName`],_on:[`validateOn`],_options:[`validateOptions`],_orientation:[`validateOrientation`],_required:[`validateRequired`],_syncValueBySelector:[`validateSyncValueBySelector`],_touched:[`validateTouched`],_value:[`validateValue`],_variant:[`validateVariant`]}}};w.style={default:C};export{w as kol_input_radio};