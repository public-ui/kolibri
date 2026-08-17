import{a as e,o as t,s as n}from"./index-DQa01HLF.js";import{n as r,t as i}from"./dev.utils-VBoUDs60-BkEVUHTR.js";import"./base-web-component-BT6jbe_v-Vp21XLG3.js";import{t as a}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as o}from"./clsx-COFh-Vc8-DWAop4cA.js";import"./Heading-RSuzeiY3-JlUJmRNP.js";import"./disabled-tmA090zy-CscSgigw.js";import"./label-43VWIjgW-BbdrNJX4.js";import{n as s,r as c,t as l}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-DwZ6RXph-D6EvXbkO.js";import"./i18n-DppON4Nc-DkIDk7r4.js";import"./component-Cbqr3hDZ-OFxNM-L6.js";import"./Alert-BrThwIQc-BXbwXRUF.js";import"./label-B4jhdB3Q-DTuMu64B.js";import"./variant-quote-B7A0-G7t-D-zWMczx.js";import"./component-C2H99wHM-CSC0c0D9.js";import"./icons-CxQkiQI9-CuNUXOGK.js";import"./access-and-short-key-BVBIy6Bf-D2eDBR2q.js";import"./hide-label-Dqs_owkY-CVPmmjR-.js";import"./align-CMg-YzqB-Csh18iTk.js";import"./tooltip-align-BCIioKJU-RN4Iy4B4.js";import"./variant-class-name-9vl8S3-X-BGRVmlvF.js";import"./component-CJNiKkbd-DaKa9GJi.js";import"./align-floating-elements-DjivLyM2-CJde41Zg.js";import"./controller-CpsgJ1zD-9WBPiPR5.js";import{n as u}from"./controller-BkkKHpCk-dGCc9ZCF.js";import"./aria-details-Bm1c0NRK-Bmd01pJx.js";import"./associated.controller-B22ATw25-DtITllaH.js";import{t as d}from"./FormFieldStateWrapper-B42l6zXe-DbVUBvxw.js";import{n as f,t as p}from"./controller-icon-2XQ_1N28-B2iKZyZI.js";import"./Input-i4ObCLuq-gSAc2iep.js";import{n as m,t as h}from"./InputStateWrapper-bwkYJ-Z5-DS25BQoG.js";import{t as g}from"./suggestions-CdFtI3g5-BwXdSvGQ.js";import{t as _}from"./auto-complete-yMTBC8PP-go3RrHNK.js";var v=class extends f{constructor(e,t,n){super(e,t,n),this.component=e}validateAutoComplete(e){_(this.component,e)}validateMax(e){this.validateNumber(`_max`,e)}validateMin(e){this.validateNumber(`_min`,e)}validateStep(e){this.validateNumber(`_step`,e)}validateSuggestions(e){g(this.component,e)}validateValue(e){this.validateNumber(`_value`,e),this.component._value=e,this.setFormAssociatedValue(this.component.state._value)}componentWillLoad(){super.componentWillLoad(),this.validateAutoComplete(this.component._autoComplete),this.validateMax(this.component._max),this.validateMin(this.component._min),this.validateStep(this.component._step),this.validateSuggestions(this.component._suggestions),this.validateValue(this.component._value)}},y=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1786964536970"); /* IE9*/
  src: url("kolicons.eot?t=1786964536970#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1786964536970") format("woff2"), url("kolicons.woff?t=1786964536970") format("woff"), url("kolicons.ttf?t=1786964536970") format("truetype"), url("kolicons.svg?t=1786964536970#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-alert .kol-button--external-link > .kolicon-link-external::before {
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
  .kol-form-field .kol-popover-button--inline .kol-button {
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
  .kol-input {
    background-color: transparent;
    width: 100%;
    min-width: var(--a11y-min-size);
  }
  .kol-input-range__inputs-wrapper {
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
  .kol-input-range__input--number {
    width: var(--kolibri-input-range--input-number--width);
    text-align: right;
  }
  .kol-input-range__input--range {
    background-color: white;
    display: inline-block;
    /* Design-Hack - related with flex-grow */
    width: 0;
    min-width: calc(128 * 1rem / var(--kolibri-root-font-size, 16));
    height: calc(8 * 1rem / var(--kolibri-root-font-size, 16));
    margin: 0;
    padding: 0;
    flex-grow: 1;
    line-height: 1.5;
    appearance: none;
    border: 1px solid black;
  }
  .kol-input-range__input:not(:disabled).kol-input-range__input--range::-webkit-slider-thumb {
    cursor: pointer;
  }
  .kol-input-range__input--range::-webkit-slider-thumb {
    background-color: black;
    border-radius: 20px;
    width: calc(20 * 1rem / var(--kolibri-root-font-size, 16));
    height: calc(20 * 1rem / var(--kolibri-root-font-size, 16));
    -webkit-appearance: none;
  }
  @media (prefers-contrast: more) or (forced-colors: active) {
    .kol-input-range__input--range::-webkit-slider-thumb {
      outline: 1px solid currentColor;
    }
  }
  .kol-input-range__input:not(:disabled).kol-input-range__input--range::-moz-range-thumb {
    cursor: pointer;
  }
  .kol-input-range__input--range::-moz-range-thumb {
    background-color: black;
    border-radius: 20px;
    width: calc(20 * 1rem / var(--kolibri-root-font-size, 16));
    height: calc(20 * 1rem / var(--kolibri-root-font-size, 16));
    -moz-appearance: none;
  }
}`,b=class{async focus(e){}async click(){}getSanitizedFloatValue(e){let t=parseFloat(e);return this.state._max&&t>this.state._max?this.state._max:this.state._min&&t<this.state._min?this.state._min:t}remapValue(e){return this._initialValueType===`NumberString`?String(e):e}async getValue(){if(this.ctaRef.el!==void 0){let e=this.ctaRef.el.value,t=this.getSanitizedFloatValue(e);return this.remapValue(t)}}componentDidLoad(){!this._value&&this.refInputRange?.value&&this.validateValue(parseFloat(this.refInputRange.value))}getFormFieldProps(){return{state:this.state,class:o(`kol-input-range`,`range`),tooltipAlign:this._tooltipAlign,alert:this.showAsAlert(),infoPopover:this._infoPopover}}getGenericInputProps(){return Object.assign(Object.assign({state:Object.assign(Object.assign({},this.state),{_suggestions:[]})},this.controller.onFacade),{onChange:this.onChange,onInput:this.onInput,onFocus:e=>{this.controller.onFacade.onFocus(e),this.inputHasFocus=!0},onBlur:e=>{this.controller.onFacade.onBlur(e),this.inputHasFocus=!1}})}get hasSuggestions(){return Array.isArray(this.state._suggestions)&&this.state._suggestions.length>0}getInputRangeProps(){return Object.assign(Object.assign({},this.getGenericInputProps()),{name:this.state._name?`${this.state._name}-range`:void 0,list:this.hasSuggestions?i(this.state._id,`list`):void 0,type:`range`,tabIndex:-1,id:void 0,"aria-hidden":`true`,ref:this.setInputRangeRef})}getInputNumberProps(){return Object.assign(Object.assign({},this.getGenericInputProps()),{name:this.state._name?`${this.state._name}-number`:void 0,list:this.hasSuggestions?i(this.state._id,`list`):void 0,type:`number`,ref:this.setInputNumberRef,onKeyDown:this.onKeyDown})}setInitialValueType(e){this._initialValueType=this.controller.isNumberString(e)?`NumberString`:`number`}render(){let e={"--kolibri-input-range--input-number--width":`calc(${Math.max(String(this.state._max??100).length,String(this.state._min??0).length,4)}ch + 2em)`};return t(d,Object.assign({key:`e7d8c5cfecbefdcaa05ac019f985a4ce3fbbca40`},this.getFormFieldProps()),t(p,{key:`6a5fd3fb40556c13170fddcc41a7f45b75b30f52`,state:this.state},t(`div`,{key:`d15d9bd45d2244a88d47920de8f14bfe75de3b94`,class:`kol-input-range__inputs-wrapper`,style:e},t(h,Object.assign({key:`db748718fa054fe12d5cd92d486c563c4a21b966`,class:`kol-input-range__input kol-input-range__input--range`},this.getInputRangeProps())),t(h,Object.assign({key:`01350d55d8f11c0116c1c6a6d5a315c7a44a3cbd`,class:`kol-input-range__input kol-input-range__input--number`},this.getInputNumberProps()))),this.hasSuggestions&&t(m,{key:`f78cfb07aa676d266fb5d72019b7061f3ea44e92`,id:this.state._id,suggestions:this.state._suggestions})))}constructor(e){n(this,e),this.ctaRef=l(),this.setInputNumberRef=e=>{e&&(this.ctaRef(e),!this._value&&e.value&&this.validateValue(parseFloat(e.value)))},this.setInputRangeRef=e=>{e&&(this.refInputRange=e)},this.onInput=e=>{let t=e.target.value,n=this.getSanitizedFloatValue(t);this.controller.onFacade.onInput(e,!0,this.remapValue(n))},this.onChange=e=>{let t=e.target.value,n=this.getSanitizedFloatValue(t),r=this.remapValue(n);this.validateValue(r),this.controller.onFacade.onChange(e,r)},this.onKeyDown=e=>{this.controller.onFacade.onKeyDown(e),(e.code===`Enter`||e.code===`NumpadEnter`)&&u({form:this.host})},this._autoComplete=`off`,this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._max=100,this._min=0,this._tooltipAlign=`top`,this._touched=!1,this.state={_hideMsg:!1,_id:r(`input-range`),_label:``,_suggestions:[],_min:0,_max:100},this._initialValueType=`number`,this.inputHasFocus=!1,this.controller=new v(this,`range`,this.host)}showAsAlert(){return!!this.state._touched&&!this.inputHasFocus}validateAccessKey(e){this.controller.validateAccessKey(e)}validateAriaDetails(e){this.controller.validateAriaDetails(e)}validateAutoComplete(e){this.controller.validateAutoComplete(e)}validateDisabled(e){this.controller.validateDisabled(e)}validateHideMsg(e){this.controller.validateHideMsg(e)}validateHideLabel(e){this.controller.validateHideLabel(e)}validateHint(e){this.controller.validateHint(e)}validateIcons(e){this.controller.validateIcons(e)}validateLabel(e){this.controller.validateLabel(e)}validateMax(e){this.controller.validateMax(e)}validateMin(e){this.controller.validateMin(e)}validateMsg(e){this.controller.validateMsg(e)}validateName(e){this.controller.validateName(e)}validateOn(e){this.controller.validateOn(e)}validateShortKey(e){this.controller.validateShortKey(e)}validateStep(e){this.controller.validateStep(e)}validateSuggestions(e){this.controller.validateSuggestions(e)}validateSyncValueBySelector(e){this.controller.validateSyncValueBySelector(e)}validateTouched(e){this.controller.validateTouched(e)}validateValue(e){this.controller.validateValue(e),e!==void 0&&this.setInitialValueType(e)}validateVariant(e){this.controller.validateVariant(e)}componentWillLoad(){this._value!==void 0&&this.setInitialValueType(this._value),this._touched=this._touched===!0,this.validateAriaDetails(this._ariaDetails),this.controller.componentWillLoad()}get host(){return e(this)}static get watchers(){return{_accessKey:[`validateAccessKey`],_ariaDetails:[`validateAriaDetails`],_autoComplete:[`validateAutoComplete`],_disabled:[`validateDisabled`],_hideMsg:[`validateHideMsg`],_hideLabel:[`validateHideLabel`],_hint:[`validateHint`],_icons:[`validateIcons`],_label:[`validateLabel`],_max:[`validateMax`],_min:[`validateMin`],_msg:[`validateMsg`],_name:[`validateName`],_on:[`validateOn`],_shortKey:[`validateShortKey`],_step:[`validateStep`],_suggestions:[`validateSuggestions`],_syncValueBySelector:[`validateSyncValueBySelector`],_touched:[`validateTouched`],_value:[`validateValue`],_variant:[`validateVariant`]}}};a([c(`ctaRef`)],b.prototype,`focus`,null),a([s(`ctaRef`)],b.prototype,`click`,null),b.style={default:y};export{b as kol_input_range};