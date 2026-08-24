import{W as e,a as t,kt as n,o as r,s as i,xt as a}from"./index-BTRkqyH2.js";import{n as o}from"./dev.utils-VBoUDs60-BNVHc3vJ.js";import"./base-web-component-BT6jbe_v-Vp21XLG3.js";import{t as s}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as c}from"./clsx-COFh-Vc8-DWAop4cA.js";import"./Heading-RSuzeiY3-rqc4qenA.js";import"./disabled-tmA090zy-B9UECFyB.js";import"./label-43VWIjgW-D9uDzeL-.js";import{n as l,r as u,t as d}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-DwZ6RXph-YLkdJmpk.js";import"./i18n-DppON4Nc-VfHPMDFD.js";import"./component-Cbqr3hDZ-7XFghFlr.js";import"./Alert-BrThwIQc-kHrPlSzX.js";import"./label-B4jhdB3Q-Bb7ZrvLs.js";import"./variant-quote-B7A0-G7t-BiCwzDUL.js";import"./component-C2H99wHM-DySFryfh.js";import"./icons-CxQkiQI9-D3E4-I75.js";import"./access-and-short-key-BVBIy6Bf-CYCaUsqR.js";import"./hide-label-Dqs_owkY-BKyBYA93.js";import"./align-CMg-YzqB-DZEkNtK2.js";import"./tooltip-align-BCIioKJU-BG0QLlu_.js";import"./variant-class-name-9vl8S3-X-8kvtOlXd.js";import"./component-CJNiKkbd-hfUj9pjP.js";import"./align-floating-elements-DjivLyM2-PLo9r2Vm.js";import"./controller-CpsgJ1zD-BOE59Bry.js";import{n as f}from"./controller-BkkKHpCk-CO5-DhcZ.js";import"./aria-details-Bm1c0NRK-Cq8iKam9.js";import"./associated.controller-B22ATw25-CUd6lVcA.js";import{t as p}from"./FormFieldStateWrapper-B42l6zXe-C2kcXIf7.js";import{n as m,t as h}from"./controller-icon-2XQ_1N28-vvRfmNLs.js";import"./Input-i4ObCLuq-DQOWkWzs.js";import{t as g}from"./InputStateWrapper-bwkYJ-Z5-Bo8IjnC6.js";import{t as _}from"./required-16oQLXa0-B-M6_07T.js";import{t as v}from"./suggestions-CdFtI3g5-T9KlDgkC.js";import{t as y}from"./auto-complete-yMTBC8PP-CuhxEfWX.js";import{t as b}from"./read-only-CoisIdu_-Bdo-rCCZ.js";var x=[`date`,`datetime-local`,`month`,`time`,`week`],S=e=>typeof e==`string`&&x.includes(e),C=(e,t)=>{n(e,`_type`,S,new Set(x),t)},w=class e extends m{constructor(t,r,i){super(t,r,i),this.validateIso8601=(t,r,i)=>n(this.component,t,e=>e==null||e===``||this.validateDateString(e),new Set([`Date`,`string{ISO-8601}`]),e.tryParseToString(r,this.component._type,this.component._step),{hooks:{afterPatch:e=>{typeof e==`string`&&i&&i(e)}}}),this.component=t}validateAutoComplete(e){y(this.component,e)}validateSuggestions(e){v(this.component,e)}static tryParseToString(e,t,n){if(typeof e==`string`||e===null)return e;if(typeof e==`object`&&e instanceof Date){let r=e.getFullYear(),i=String(e.getMonth()+1).padStart(2,`0`),a=String(e.getDate()).padStart(2,`0`),o=String(e.getHours()).padStart(2,`0`),s=String(e.getMinutes()).padStart(2,`0`),c=String(e.getSeconds()).padStart(2,`0`),l=[r,i,a].join(`-`),u=[o,s,c].join(`:`);switch(t){case`date`:return l;case`datetime-local`:return`${l}T${u}`;case`month`:return`${r}-${i}`;case`time`:return n===void 0||String(n)===`60`?`${o}:${s}`:u;case`week`:return`${r}-W${this.getWeekNumberOfDate(e)}`}}}static getWeekNumberOfDate(e){let t=new Date(e),n=(t.getDay()+6)%7;t.setDate(t.getDate()-n+3);let r=t.valueOf();return t.setMonth(0,1),t.getDay()!==4&&t.setMonth(0,1+(4-t.getDay()+7)%7),(1+Math.ceil((r-t.valueOf())/6048e5)).toString().padStart(2,`0`)}validateDateString(t){switch(this.component._type){case`date`:return e.isoDateRegex.test(t);case`datetime-local`:return e.isoLocalDateTimeRegex.test(t);case`month`:return e.isoMonthRegex.test(t);case`time`:return e.isoTimeRegex.test(t);case`week`:return e.isoWeekRegex.test(t);default:return!1}}onBlur(e){super.onBlur(e),!!e.target.value!=!!this.component._value&&(this.component._value=e.target.value)}validateMax(e){this.validateIso8601(`_max`,e)}validateMin(e){this.validateIso8601(`_min`,e)}validateOn(e){a(this.component,`_on`,Object.assign(Object.assign({},e),{onChange:(t,n)=>{!!n!=!!this.component._value&&(this.component._value=n),e?.onChange&&e.onChange(t,n)}}))}validateReadOnly(e){b(this.component,e)}validateRequired(e){_(this.component,e)}validateStep(e){this.validateNumber(`_step`,e)}validateType(e){C(this.component,e)}validateValue(e){this.validateValueEx(e)}validateValueEx(e,t){this.validateIso8601(`_value`,e,t),this.setFormAssociatedValue(this.component.state._value)}componentWillLoad(){super.componentWillLoad(),this.validateAutoComplete(this.component._autoComplete),this.validateMax(this.component._max),this.validateMin(this.component._min),this.validateLabel(this.component._label),this.validateSuggestions(this.component._suggestions),this.validateOn(this.component._on),this.validateReadOnly(this.component._readOnly),this.validateRequired(this.component._required),this.validateStep(this.component._step),this.validateType(this.component._type),this.validateValue(this.component._value)}};w.isoDateRegex=/^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])/,w.isoLocalDateTimeRegex=/^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])[T ][0-2]\d:[0-5]\d(:[0-5]\d(?:\.\d+)?)?/,w.isoMonthRegex=/^\d{4}-([0]\d|1[0-2])/,w.isoTimeRegex=/^[0-2]\d:[0-5]\d(:[0-5]\d(?:\.\d+)?)?/,w.isoWeekRegex=/^\d{4}-W(?:[0-4]\d|5[0-3])$/;var T=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1787577505384"); /* IE9*/
  src: url("kolicons.eot?t=1787577505384#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1787577505384") format("woff2"), url("kolicons.woff?t=1787577505384") format("woff"), url("kolicons.ttf?t=1787577505384") format("truetype"), url("kolicons.svg?t=1787577505384#kolicons") format("svg"); /* iOS 4.1- */
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
  /**
   * Workaround for detecting focus state of the native date input's calendar icon.
   * The \`:focus-visible\` pseudo class does not work on the icon itself, but only on the input element.
   * By using the \`content\` property we can detect whether the icon is focused by inspecting the computed style in JS.
   * This should be replaced once native focus detection for the icon is available.
   */
  :host input[type=date],
  :host input[type=datetime-local],
  :host input[type=month],
  :host input[type=time],
  :host input[type=week] {
    content: "native-icon-focused";
  }
  :host input[type=date]:focus-visible,
  :host input[type=datetime-local]:focus-visible,
  :host input[type=month]:focus-visible,
  :host input[type=time]:focus-visible,
  :host input[type=week]:focus-visible {
    content: "native-icon-not-focused";
  }
  .kol-input {
    cursor: text;
  }
  .kol-input::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
}`,E=class{async getValue(){return this.ctaRef.el&&this.remapValue(this.ctaRef.el?.value)}async focus(e){}async click(){}async reset(){this.state=Object.assign(Object.assign({},this.state),{_value:null}),this.controller.setFormAssociatedValue(``),this.ctaRef.el&&(this.ctaRef.el.value=``)}setInitialValueType(e){this._initialValueType=e instanceof Date?`Date`:typeof e==`string`?`String`:null}remapValue(e){return e===``?null:this._initialValueType===`Date`?new Date(e):e}getFormFieldProps(){return{state:this.state,class:c(`kol-input-date`,this.state._type,{"has-value":this.state._hasValue}),tooltipAlign:this._tooltipAlign,alert:this.showAsAlert(),infoPopover:this._infoPopover}}getInputProps(){return Object.assign(Object.assign({ref:this.ctaRef,state:this.state},this.controller.onFacade),{onBlur:this.onBlur,onFocus:this.onFocus,onKeyDown:this.onKeyDown,onChange:this.onChange,onInput:this.onInput})}render(){return r(p,Object.assign({key:`fca9f3cf890888b4b5330b1c1b737b632f3ebe68`},this.getFormFieldProps()),r(h,{key:`6b71b5cae4fe531d18c3495fa5c84a6a77c0af40`,state:this.state},r(g,Object.assign({key:`1689900caab75357be297000037e213aa2a82d88`},this.getInputProps()))))}constructor(e){i(this,e),this.ctaRef=d(),this._initialValueType=null,this.onBlur=e=>{this.controller.onFacade.onBlur(e),this.inputHasFocus=!1},this.onFocus=e=>{this.controller.onFacade.onFocus(e),this.inputHasFocus=!0},this.onChange=e=>{let t=e.target.value,n=this.remapValue(t);this.controller.onFacade.onChange(e,n)},this.onInput=e=>{let t=e.target.value,n=this.remapValue(t);this._value=n,this.controller.onFacade.onInput(e,!0,n)},this.isNativeCalendarIconFocused=()=>!this.ctaRef.el||typeof window>`u`||typeof window.getComputedStyle!=`function`?!1:window.getComputedStyle(this.ctaRef.el).content.includes(`native-icon-focused`),this.onKeyDown=e=>{this.controller.onFacade.onKeyDown(e),(e.code===`Enter`||e.code===`NumpadEnter`)&&!this.isNativeCalendarIconFocused()&&f({form:this.host}),this.state._readOnly&&e.code===`Space`&&e.preventDefault()},this._autoComplete=`off`,this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._readOnly=!1,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this._type=`date`,this.state={_hasValue:!1,_hideMsg:!1,_id:o(`input-date`),_label:``,_suggestions:[],_type:`datetime-local`},this.inputHasFocus=!1,this.controller=new w(this,`date`,this.host)}showAsAlert(){return!!this.state._touched&&!this.inputHasFocus}validateAccessKey(e){this.controller.validateAccessKey(e)}validateAriaDetails(e){this.controller.validateAriaDetails(e)}validateAutoComplete(e){this.controller.validateAutoComplete(e)}validateDisabled(e){this.controller.validateDisabled(e)}validateHideMsg(e){this.controller.validateHideMsg(e)}validateHideLabel(e){this.controller.validateHideLabel(e)}validateHint(e){this.controller.validateHint(e)}validateIcons(e){this.controller.validateIcons(e)}validateLabel(e){this.controller.validateLabel(e)}validateMax(e){this.controller.validateMax(e)}validateMin(e){this.controller.validateMin(e)}validateMsg(e){this.controller.validateMsg(e)}validateName(e){this.controller.validateName(e)}validateOn(e){this.controller.validateOn(e)}validateReadOnly(e){this.controller.validateReadOnly(e)}validateRequired(e){this.controller.validateRequired(e)}validateShortKey(e){this.controller.validateShortKey(e)}validateSmartButton(e){this.controller.validateSmartButton(e)}validateSuggestions(e){this.controller.validateSuggestions(e)}validateStep(e){this.controller.validateStep(e)}validateSyncValueBySelector(e){this.controller.validateSyncValueBySelector(e)}validateTouched(e){this.controller.validateTouched(e)}validateType(e){this.controller.validateType(e)}validateValue(t){t instanceof Date&&e("Date type will be removed in v3. Use `Iso8601` instead."),this.controller.validateValueEx(t),t!=null&&this.setInitialValueType(t)}validateVariant(e){this.controller.validateVariant(e)}componentWillLoad(){this._value!==void 0&&this.setInitialValueType(this._value),this._touched=this._touched===!0,this.validateAriaDetails(this._ariaDetails),this.controller.componentWillLoad(),this.state._hasValue=!!this.state._value,this.controller.addValueChangeListener(e=>this.state._hasValue=!!e)}get host(){return t(this)}static get watchers(){return{_accessKey:[`validateAccessKey`],_ariaDetails:[`validateAriaDetails`],_autoComplete:[`validateAutoComplete`],_disabled:[`validateDisabled`],_hideMsg:[`validateHideMsg`],_hideLabel:[`validateHideLabel`],_hint:[`validateHint`],_icons:[`validateIcons`],_label:[`validateLabel`],_max:[`validateMax`],_min:[`validateMin`],_msg:[`validateMsg`],_name:[`validateName`],_on:[`validateOn`],_readOnly:[`validateReadOnly`],_required:[`validateRequired`],_shortKey:[`validateShortKey`],_smartButton:[`validateSmartButton`],_suggestions:[`validateSuggestions`],_step:[`validateStep`],_syncValueBySelector:[`validateSyncValueBySelector`],_touched:[`validateTouched`],_type:[`validateType`],_value:[`validateValue`],_variant:[`validateVariant`]}}};s([u(`ctaRef`)],E.prototype,`focus`,null),s([l(`ctaRef`)],E.prototype,`click`,null),E.style={default:T};export{E as kol_input_date};