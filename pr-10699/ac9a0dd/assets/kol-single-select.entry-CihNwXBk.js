import{Dt as e,Tt as t,_ as n,a as r,kt as i,o as a,s as o}from"./index-DsEOhkwl.js";import{n as s}from"./dev.utils-VBoUDs60-CLVENPkl.js";import"./base-web-component-BT6jbe_v-Vp21XLG3.js";import{t as c}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as l}from"./clsx-COFh-Vc8-DWAop4cA.js";import"./Heading-RSuzeiY3-apxQExEf.js";import"./disabled-tmA090zy-BKqRHNvs.js";import"./label-43VWIjgW-ByxfMWfq.js";import{r as u,t as d}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-DwZ6RXph-BQFidZgG.js";import{t as f}from"./i18n-DppON4Nc-CcfNvR6Z.js";import{t as p}from"./component-Cbqr3hDZ-Bq-PG65Q.js";import"./Alert-BrThwIQc-BRx5iWm3.js";import"./label-B4jhdB3Q-CuDTPz56.js";import"./variant-quote-B7A0-G7t-B2wBFurO.js";import"./component-C2H99wHM-BAWi07VH.js";import"./icons-CxQkiQI9-sraLelMQ.js";import"./access-and-short-key-BVBIy6Bf-DvPjHABX.js";import"./hide-label-Dqs_owkY-i5CDeFw8.js";import"./align-CMg-YzqB-8smji6vw.js";import"./tooltip-align-BCIioKJU-r2BEciR0.js";import"./variant-class-name-9vl8S3-X-Bp0VV41S.js";import"./component-CJNiKkbd-BA2GdoAC.js";import"./align-floating-elements-DjivLyM2-BNtpQij_.js";import"./controller-CpsgJ1zD-CzXznI7F.js";import"./aria-details-Bm1c0NRK-BiOaF50m.js";import"./associated.controller-B22ATw25-nqwpToCX.js";import{s as m,t as h}from"./FormFieldStateWrapper-B42l6zXe-DFE9E9C_.js";import{n as g,t as _}from"./controller-icon-2XQ_1N28-ajuTqFD0.js";import"./Input-i4ObCLuq-C78GGrpj.js";import{t as v}from"./InputStateWrapper-bwkYJ-Z5-BQMKPFsz.js";import{n as y,t as b}from"./CustomSuggestionsOptionsGroup-BOmzHi-1-fOFFmQ29.js";import{t as x}from"./placeholder-S0DMyipR-DQpNubE8.js";import{t as S}from"./required-16oQLXa0-BBMmxd33.js";import"./orientation-HCX-2i6Q-DIZ_ep0e.js";import{i as C,r as w}from"./controller-CL0cL-eC-jxDHgVbJ.js";var T=class extends g{constructor(e,t,n){super(e,t,n),this.keyOptionMap=new Map,this.afterPatchOptions=(e,t,n,r)=>{r===`_value`&&this.setFormAssociatedValue(e)},this.beforePatchOptions=(e,t)=>{let n=t.has(`_options`)?t.get(`_options`):this.component.state._options;Array.isArray(n)&&n.length>0&&(this.keyOptionMap.clear(),w(this.keyOptionMap,n))},this.component=e}validateOptions(e){C(this.component,e,{hooks:{afterPatch:this.afterPatchOptions,beforePatch:this.beforePatchOptions}})}validateRequired(e){S(this.component,e)}validateValue(e){i(this.component,`_value`,e=>e!==void 0,new Set([`StencilUnknown`]),e)}validatePlaceholder(e){x(this.component,e)}validateHasClearButton(e){t(this.component,`_hasClearButton`,e)}validateRows(t){e(this.component,`_rows`,t)}componentWillLoad(){super.componentWillLoad(),this.validateOptions(this.component._options),this.validateRequired(this.component._required),this.validateValue(this.component._value),this.validatePlaceholder(this.component._placeholder),this.validateHasClearButton(this.component._hasClearButton),this.validateRows(this.component._rows)}},E=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1787577979293"); /* IE9*/
  src: url("kolicons.eot?t=1787577979293#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1787577979293") format("woff2"), url("kolicons.woff?t=1787577979293") format("woff"), url("kolicons.ttf?t=1787577979293") format("truetype"), url("kolicons.svg?t=1787577979293#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-custom-suggestions-option {
    line-height: 1.5;
    white-space: normal;
    cursor: pointer;
    overflow-wrap: break-word;
  }
  .kol-custom-suggestions-options-group--cursor-hidden .kol-custom-suggestions-option {
    cursor: none !important;
  }
  .kol-custom-suggestions-option--disabled:focus, .kol-custom-suggestions-option--disabled:focus * {
    cursor: not-allowed;
  }
  .kol-custom-suggestions-options-group {
    background-color: white;
    display: block;
    position: absolute;
    z-index: 2;
    max-height: calc(250 * 1rem / var(--kolibri-root-font-size, 16));
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
    list-style-type: none;
  }
  .kol-input-container:has(.kol-custom-suggestions-options-group--open) {
    z-index: 10;
  }
  .kol-custom-suggestions-toggle {
    display: flex;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: center;
    justify-content: center;
    cursor: default;
  }
  .kol-custom-suggestions-toggle.kol-custom-suggestions-toggle--disabled {
    cursor: not-allowed;
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
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-single-select__delete .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-single-select__delete :host {
    display: inline-block;
  }
  .kol-single-select__delete .kol-button {
    display: flex;
    height: 100%;
    min-height: var(--a11y-min-size);
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-single-select__delete .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-single-select__delete .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-single-select__delete .kol-button--external-link > .kolicon-link-external::before {
    content: none;
  }
  .kol-single-select__no-results-message {
    display: flex;
    min-height: calc(50 * 1rem / var(--kolibri-root-font-size, 16));
    align-items: center;
    justify-content: center;
    cursor: default;
  }
  .kol-single-select .kol-custom-suggestions-options-group {
    max-height: calc(40 * 1rem / var(--kolibri-root-font-size, 16) * var(--visible-options, 5) + 2 * 1rem / var(--kolibri-root-font-size, 16)) !important;
  }
  .kol-custom-suggestions-toggle:not(.kol-custom-suggestions-toggle--disabled) {
    cursor: pointer;
  }
}`,D=class{async getValue(){return this._value}async focus(e){}onBlur(){let e=this.state._options?.find(e=>e.label?.toLowerCase()===this._inputValue?.toLowerCase());e?this.selectOption(e):this._value!==null&&this._value!==void 0&&(this._filteredOptions=[...this.state._options??[]])}createEventWithTarget(e,t){let n=new CustomEvent(e,{bubbles:!0,detail:t});return this.ctaRef.el&&(Object.defineProperty(n,"target",{value:this.ctaRef.el}),Object.defineProperty(n,"currentTarget",{value:this.ctaRef.el})),n}clearSelection(){var e;if(this.state._disabled)return;this._focusedOptionIndex=-1,this._value=null,this._inputValue=``,this._filteredOptions=[...this.state._options];let t=this.createEventWithTarget(`input`,{name:this.state._name,value:null}),n=this.createEventWithTarget(`change`,{name:this.state._name,value:null});this.controller.onFacade.onInput(t,!0,{value:null}),this.controller.onFacade.onChange(n,{value:null}),(e=this.ctaRef.el)==null||e.focus(),this._isOpen=!0}selectOption(e){if(e.value===this._value){this._inputValue=e.label,this._filteredOptions=[...this.state._options];return}this._value=e.value,this._inputValue=e.label;let t=this.createEventWithTarget(`input`,{name:this.state._name??``,value:e.value}),n=this.createEventWithTarget(`change`,{name:this.state._name??``,value:e.value});this.controller.onFacade.onInput(t,!1,e.value),this.controller.onFacade.onChange(n,e.value),this._filteredOptions=[...this.state._options],this.controller.setFormAssociatedValue(this._value)}onInput(e){let t=e.target;this._inputValue=t.value,this._isOpen=!0,this.setFilteredOptionsByQuery(t.value),this._focusedOptionIndex=-1}handleKeyDownDropdown(e){e.key.length===1&&/[a-z0-9]/i.test(e.key)&&(e.preventDefault(),this._isOpen=!0,this.focusSuggestionStartingWith(e.key))}setFilteredOptionsByQuery(e){e!==void 0&&(e?.trim()===``?this._filteredOptions=[...this.state._options]:Array.isArray(this.state._options)&&this.state._options.length>0&&e.length>0&&(this._filteredOptions=this.state._options.filter(t=>(t.label?.toLowerCase())?.includes(e?.toLowerCase()))))}moveFocus(e){if(!this._filteredOptions)return;let t=this._focusedOptionIndex+e,n=0,r=!1,i=this._filteredOptions.length;for(;n<i;){if(t>=this._filteredOptions.length&&(t=0),t<0&&(t=this._filteredOptions.length-1),!this._filteredOptions[t].disabled){r=!0;break}t+=e,n++}r&&(this._focusedOptionIndex=t,this.focusOption(this._focusedOptionIndex))}focusOption(e){this.refOptions&&this.refOptions[e]?.focus()}selectFocusedOption(){return Array.isArray(this._filteredOptions)&&this._filteredOptions.length>0&&this._focusedOptionIndex>=0?(this.selectOption(this._filteredOptions[this._focusedOptionIndex]),!0):!1}focusSuggestionStartingWith(e){let t=e.toLowerCase(),n=Array.isArray(this._filteredOptions)&&this._filteredOptions.findIndex(e=>e.label.toLowerCase().startsWith(t)&&!e.disabled);typeof n==`number`&&n>=0&&(this._focusedOptionIndex=n,this.focusOption(n))}getFormFieldProps(){return{state:this.state,class:`kol-single-select`,tooltipAlign:this._tooltipAlign,alert:this.showAsAlert(),infoPopover:this._infoPopover}}getInputProps(){let{ariaDescribedBy:e}=m(this.state),t=this.state._disabled===!0;return Object.assign(Object.assign({"aria-activedescendant":this._isOpen&&this._focusedOptionIndex>=0?`option-${this._focusedOptionIndex}`:void 0,"aria-autocomplete":`both`,"aria-controls":this.state._id+`-listbox`,"aria-describedby":e.length>0?e.join(` `):void 0,"aria-expanded":this._isOpen?`true`:`false`,"aria-label":this.state._hideLabel&&typeof this.state._label==`string`?this.state._label:void 0,"aria-labelledby":this.state._id+`-label`,"aria-keyshortcuts":this.state._shortKey,accessKey:this.state._accessKey,autocapitalize:`off`,autocorrect:`off`,autocomplete:`off`,class:`kol-single-select__input`,disabled:t,name:this.state._name,placeholder:this.state._placeholder,ref:this.ctaRef,required:this.state._required,role:`combobox`,state:this.state,type:`text`,value:this._inputValue},this.controller.onFacade),{onChange:this.onChange.bind(this),onClick:this.onClick.bind(this),onInput:this.onInput.bind(this)})}render(){let e=this.state._disabled===!0;return a(h,Object.assign({key:`55a4b719fd211a111e9d5fc89bf317c7c5a7a27a`},this.getFormFieldProps()),a(_,{key:`9844cfb2c19888d0c11963bcef673d41d97d6afd`,state:this.state},a(`div`,{key:`a04e8b052a6335f1b943e66ae8e98b38a1fbdc0c`,class:`kol-single-select__group`},a(v,Object.assign({key:`7bb985ee8ae941acca3fd123f06c37cc86e0e0f8`},this.getInputProps())),this._inputValue&&this.state._hasClearButton&&a(n,{key:`c149a06e9c5bf14b215cd0a78a825d19cdef2087`,_icons:`kolicon-cross`,_label:this.translateDeleteSelection,_hideLabel:!0,_variant:`ghost`,_disabled:e,"data-testid":`single-select-delete`,class:`kol-single-select__delete`,hidden:e,_on:{onClick:()=>{var e;this.clearSelection(),(e=this.ctaRef.el)==null||e.focus(),this.clearButtonFocused=!1},onFocus:()=>{this.clearButtonFocused=!0},onBlur:()=>{this.clearButtonFocused=!1}}}),a(p,{key:`486ebaa2ab6c265c2638f762ebe392367405caa5`,icons:`kolicon-chevron-down`,label:``,class:l(`kol-custom-suggestions-toggle`,{"kol-custom-suggestions-toggle--disabled":e}),onClick:this.toggleListbox.bind(this)})),a(y,{key:`1b896ec7d21c50eaa9eb4da8426160ca419468c8`,blockSuggestionMouseOver:this.blockSuggestionMouseOver,onKeyDown:this.handleKeyDownDropdown.bind(this),style:{"--visible-options":`${this._rows??5}`},hidden:!this._isOpen||e,id:this.state._id+`-listbox`},Array.isArray(this._filteredOptions)&&this._filteredOptions.length>0?this._filteredOptions.map((e,t)=>a(b,{index:t,option:e.label,searchTerm:this._inputValue,ref:e=>{e&&(this.refOptions[t]=e)},selected:this._value===e.value,disabled:!!e.disabled,onClick:t=>{var n;e.disabled||(this.selectOption(e),(n=this.ctaRef.el)==null||n.focus(),this.toggleListbox(t),this._isOpen=!1)},onMouseOver:()=>{this.blockSuggestionMouseOver||(this._focusedOptionIndex=t,this.focusOption(t))},onFocus:()=>{e.disabled||(this._focusedOptionIndex=t,this.focusOption(t))},onKeyDown:t=>{var n;e.disabled||(t.key===`Enter`||t.key===`NumpadEnter`)&&(this.selectOption(e),(n=this.ctaRef.el)==null||n.focus(),this.toggleListbox(t),t.preventDefault())}})):a(`li`,{class:`kol-single-select__no-results-message`,role:`alert`},this.translateNoResultsMessage,` `))))}handleKeyDown(e){var t,n,r;let i=(t,n)=>{var r;e.preventDefault(),t!==void 0&&(this._isOpen=t,t||(r=this.ctaRef.el)==null||r.focus()),n?.()};switch(e.key){case`Down`:case`ArrowDown`:this.blockSuggestionMouseOver=!0,i(!0,()=>this.moveFocus(1));break;case`Up`:case`ArrowUp`:this.blockSuggestionMouseOver=!0,i(!0,()=>this.moveFocus(-1));break;case`Tab`:this._isOpen&&(this._isOpen=!this._isOpen,(t=this.ctaRef.el)==null||t.focus());break;case`Esc`:case`Escape`:this._isOpen&&(e.preventDefault(),this._isOpen=!1,(n=this.ctaRef.el)==null||n.focus());break;case` `:case`Enter`:case`NumpadEnter`:this.clearButtonFocused?(this.clearSelection(),e.preventDefault()):this._isOpen?this.selectFocusedOption()&&((r=this.ctaRef.el)==null||r.focus(),i(!1)):this.toggleListbox(e);break;case`Home`:this.blockSuggestionMouseOver=!0,i(void 0,()=>{this._isOpen&&(this._focusedOptionIndex=0,this.focusOption(this._focusedOptionIndex))});break;case`End`:this.blockSuggestionMouseOver=!0,i(void 0,()=>{this._isOpen&&(this._focusedOptionIndex=this._filteredOptions?this._filteredOptions.length-1:0,this.focusOption(this._focusedOptionIndex))});break;case`PageUp`:this.blockSuggestionMouseOver=!0,i(void 0,()=>this._isOpen&&this.moveFocus(-10));break;case`PageDown`:this.blockSuggestionMouseOver=!0,i(void 0,()=>this._isOpen&&this.moveFocus(10))}}validateAriaDetails(e){this.controller.validateAriaDetails(e)}constructor(e){o(this,e),this.ctaRef=d(),this.refOptions=[],this.translateDeleteSelection=f(`kol-delete-selection`),this.translateNoResultsMessage=f(`kol-no-results-message`),this.clearButtonFocused=!1,this.toggleListbox=e=>{var t;if(e?.preventDefault(),this.state._disabled!==!0){if((t=this.ctaRef.el)==null||t.focus(),this._isOpen)this._isOpen=!1;else{this._isOpen=!0;let e=Array.isArray(this._filteredOptions)?this._filteredOptions.findIndex(e=>e.label===this._inputValue):-1;this._focusedOptionIndex=e>=0?e:-1,this.focusOption(this._focusedOptionIndex)}}},this._focusedOptionIndex=-1,this._isOpen=!1,this._filteredOptions=[],this._inputValue=``,this.blockSuggestionMouseOver=!1,this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this._value=null,this._hasClearButton=!0,this.state={_hideMsg:!1,_id:s(`single-select`),_label:``,_options:[],_hasClearButton:!0},this.inputHasFocus=!1,this.controller=new T(this,`single-select`,this.host)}showAsAlert(){return!!this.state._touched&&!this.inputHasFocus}validatePlaceholder(e){this.controller.validatePlaceholder(e)}validateAccessKey(e){this.controller.validateAccessKey(e)}validateDisabled(e){this.controller.validateDisabled(e)}validateHideMsg(e){this.controller.validateHideMsg(e)}validateHideLabel(e){this.controller.validateHideLabel(e)}validateHint(e){this.controller.validateHint(e)}validateIcons(e){this.controller.validateIcons(e)}validateLabel(e){this.controller.validateLabel(e)}validateMsg(e){this.controller.validateMsg(e)}validateName(e){this.controller.validateName(e)}validateOn(e){this.controller.validateOn(e)}validateOptions(e){this.controller.validateOptions(e),this._filteredOptions=[...this.state._options??[]],this._isOpen?this.setFilteredOptionsByQuery(this._inputValue):this.updateInputValue(this._value)}validateRequired(e){this.controller.validateRequired(e)}validateShortKey(e){this.controller.validateShortKey(e)}validateSyncValueBySelector(e){this.controller.validateSyncValueBySelector(e)}validateTouched(e){this.controller.validateTouched(e)}validateValue(e){this.controller.validateValue(e),this.oldValue=e,this.updateInputValue(e)}validateHasClearButton(e){this.controller.validateHasClearButton(e)}validateRows(e){this.controller.validateRows(e)}validateVariant(e){this.controller.validateVariant(e)}handleMouseEvent(){this.blockSuggestionMouseOver=!1}handleFocusIn(e){setTimeout(()=>{this.host?.contains(document.activeElement)&&!this.inputHasFocus&&(this.controller.onFacade.onFocus(e),this.inputHasFocus=!0)})}handleFocusOut(e){this.onBlur(),setTimeout(()=>{this.inputHasFocus&&!this.host?.contains(document.activeElement)&&(this.controller.onFacade.onBlur(e),this.inputHasFocus=!1,this._isOpen=!1)})}updateInputValue(e){let t=this.state._options?.find(t=>t.value===e);this._inputValue=t?String(t.label):``}componentWillLoad(){this.refOptions=[],this._touched=this._touched===!0,this.validateAriaDetails(this._ariaDetails),this.controller.componentWillLoad(),this.oldValue=this._value,this._filteredOptions=this.state._options,this.updateInputValue(this._value)}onChange(e){this.oldValue!==this.ctaRef.el?.value&&(this.oldValue=this.ctaRef.el?.value),this._isOpen||this.controller.onFacade.onChange(e,this._value)}onClick(e){var t;this.toggleListbox(e),(t=this.ctaRef.el)==null||t.focus(),this.controller.onFacade.onClick(e)}get host(){return r(this)}static get watchers(){return{_ariaDetails:[`validateAriaDetails`],_placeholder:[`validatePlaceholder`],_accessKey:[`validateAccessKey`],_disabled:[`validateDisabled`],_hideMsg:[`validateHideMsg`],_hideLabel:[`validateHideLabel`],_hint:[`validateHint`],_icons:[`validateIcons`],_label:[`validateLabel`],_msg:[`validateMsg`],_name:[`validateName`],_on:[`validateOn`],_options:[`validateOptions`],_required:[`validateRequired`],_shortKey:[`validateShortKey`],_syncValueBySelector:[`validateSyncValueBySelector`],_touched:[`validateTouched`],_value:[`validateValue`],_hasClearButton:[`validateHasClearButton`],_rows:[`validateRows`],_variant:[`validateVariant`]}}};c([u(`ctaRef`)],D.prototype,`focus`,null),D.style={default:E};export{D as kol_single_select};