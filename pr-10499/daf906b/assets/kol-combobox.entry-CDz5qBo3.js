import{Ot as e,a as t,b as n,jt as r,o as i,s as a}from"./index-Cpp_dfaV.js";import{n as o}from"./dev.utils-DY5629O1-D-9k7aXs.js";import"./base-web-component-BT6jbe_v-Vp21XLG3.js";import{t as s}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as c}from"./clsx-COFh-Vc8-alQuJLqj.js";import"./Heading-Bob8ei9D-L-kcdwSJ.js";import"./disabled-BcXSZaDo-DxZNydC-.js";import"./label-Ftw1VCQG-BGcEogS9.js";import"./element-focus-BQXzaLL9-oq1SsV6e.js";import{n as l,r as u,t as d}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-Dmgd1cXp-Cu1mELp3.js";import{t as f}from"./i18n-BsXYYo8j-CZV5B28w.js";import{t as p}from"./component-BZ5jYo_C-B9hFhWuu.js";import"./Alert-EESC0IPz-Cb9fz3XD.js";import"./label-RX8TPr4R-DFu1Rhfu.js";import"./variant-quote-BI3zVSZn-ry8kzOjT.js";import"./base-controller-CXhqh4cR-BNzx0WwK.js";import"./component-CRNb78-J-D12kb5xv.js";import"./icons-BX75HD_Y-DVLozagx.js";import"./access-and-short-key-Mj1AS76I-BT9tMdiu.js";import"./hide-label-B9ipEhG8-GA3Pz-Hy.js";import"./align-DpNc6EKs-o_Dv6EHf.js";import"./tooltip-align-ChjYN8Pt-DlxQikWY.js";import"./variant-class-name-DFWOlDkF-De1abUGE.js";import"./component-Vz8H-eGL-DYPPtdwa.js";import"./align-floating-elements-Dg-_rui1-r8OPrlRd.js";import"./controller-B0iAHK14-CueGG-MW.js";import"./aria-labelledby-6-ki3akM-C6lJ0lQF.js";import"./aria-details-8nY2-PPr-BL3fuk8Y.js";import"./associated.controller-CKYHZabJ-Ct9N3hAQ.js";import{s as m,t as h}from"./FormFieldStateWrapper-DPNZIpJ5-D2Mz6N3B.js";import{n as g,t as _}from"./controller-icon-Ddi5v-xC-D4OqtYvT.js";import"./Input-8QDk3Svm-DldPDMe5.js";import{t as v}from"./InputStateWrapper-CUNIglH5-DGyL67Sx.js";import{n as y,t as b}from"./CustomSuggestionsOptionsGroup-BlMUa4LS-D7uqwjAs.js";import{t as x}from"./placeholder-BBA3H0w5-DHrtDgBB.js";import{t as S}from"./required-DSzN5_9V-6S-wO5YE.js";import{t as C}from"./suggestions-Bqlc1vUw-D8aYRddL.js";var w=class extends g{constructor(e,t,n){super(e,t,n),this.component=e}validateHasClearButton(t){e(this.component,`_hasClearButton`,t)}validatePlaceholder(e){x(this.component,e)}validateRequired(e){S(this.component,e)}validateSuggestions(e){C(this.component,e)}validateValue(e){r(this.component,`_value`,e)}componentWillLoad(){super.componentWillLoad(),this.validateHasClearButton(this.component._hasClearButton),this.validatePlaceholder(this.component._placeholder),this.validateRequired(this.component._required),this.validateSuggestions(this.component._suggestions),this.validateValue(this.component._value)}},T=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1784203381610"); /* IE9*/
  src: url("kolicons.eot?t=1784203381610#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1784203381610") format("woff2"), url("kolicons.woff?t=1784203381610") format("woff"), url("kolicons.ttf?t=1784203381610") format("truetype"), url("kolicons.svg?t=1784203381610#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-combobox__delete .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-combobox__delete :host {
    display: inline-block;
  }
  .kol-combobox__delete .kol-button {
    display: flex;
    height: 100%;
    min-height: var(--a11y-min-size);
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-combobox__delete .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-combobox__delete .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-combobox-toggle {
    min-height: 0;
    flex: 0;
    align-self: stretch;
  }
}`,E=class{async getValue(){return this.state._value}async focus(e){}async click(){}selectOption(e){var t;this.controller.onFacade.onInput(new CustomEvent(`input`,{bubbles:!0,detail:{name:this.state._name,value:e}}),!0,e),this.controller.onFacade.onChange(new CustomEvent(`change`,{bubbles:!0,detail:{name:this.state._name,value:e}}),e),this.controller.setFormAssociatedValue(e),this._filteredSuggestions=[...this.state._suggestions],this.state._value=e,(t=this.ctaRef.el)==null||t.focus()}clearSelection(){var e;if(this.state._disabled===!0)return;this._focusedOptionIndex=-1,this._value=``,this.state._value=``,this._filteredSuggestions=[...this.state._suggestions],this._isOpen=!1;let t={name:this.state._name,value:``};this.controller.onFacade.onInput(new CustomEvent(`input`,{bubbles:!0,detail:t}),!0,``),this.controller.onFacade.onChange(new CustomEvent(`change`,{bubbles:!0,detail:t}),``),this.controller.setFormAssociatedValue(``),(e=this.ctaRef.el)==null||e.focus()}onInput(e){let t=e.target.value;this.state._value=t,this._value=t,this.controller.onFacade.onInput(e,!0,t),this.setFilteredSuggestionsByQuery(t),this._focusedOptionIndex=-1,e.stopImmediatePropagation()}handleKeyDownDropdown(e){e.key.length===1&&/[a-z0-9]/i.test(e.key)&&(this._isOpen=!0,this.focusSuggestionStartingWith(e.key))}setFilteredSuggestionsByQuery(e){e!==void 0&&(e.trim()===``?this._filteredSuggestions=[...this.state._suggestions]:(this._filteredSuggestions=Array.isArray(this.state._suggestions)?this.state._suggestions.filter(t=>t.toLowerCase().includes(e.trim().toLowerCase())):this._filteredSuggestions,this._filteredSuggestions?.length===1&&this._filteredSuggestions[0]===e?this._isOpen=!1:this._filteredSuggestions&&this._filteredSuggestions.length>0?this._isOpen=!0:this._isOpen=!1))}moveFocus(e){if(!this._filteredSuggestions)return;let t=this._focusedOptionIndex+e;t>=this._filteredSuggestions.length&&(t=0),t<0&&(t=this._filteredSuggestions.length-1),this.focusOption(t)}focusOption(e){this._focusedOptionIndex=e,this.refSuggestions&&this.refSuggestions[e]?.focus()}selectFocusedOption(){return this._filteredSuggestions&&this._focusedOptionIndex>=0&&this._focusedOptionIndex<this._filteredSuggestions.length?(this.selectOption(this._filteredSuggestions[this._focusedOptionIndex]),!0):!1}focusSuggestionStartingWith(e){let t=e.toLowerCase(),n=Array.isArray(this._filteredSuggestions)&&this._filteredSuggestions.length>0&&this._filteredSuggestions.findIndex(e=>e.toLowerCase().startsWith(t));typeof n==`number`&&this.focusOption(n)}getFormFieldProps(){return{state:this.state,class:c(`kol-combobox`,{"has-value":this.state._hasValue}),tooltipAlign:this._tooltipAlign,alert:this.showAsAlert()}}getInputProps(){let{ariaDescribedBy:e}=m(this.state),t=this.state._disabled===!0;return Object.assign(Object.assign({ref:this.ctaRef,state:this.state,class:`kol-combobox__input`,type:`text`,role:`combobox`,"aria-activedescendant":this._isOpen&&this._focusedOptionIndex>=0?`option-${this._focusedOptionIndex}`:void 0,"aria-autocomplete":`both`,"aria-controls":this.state._id+`-listbox`,"aria-describedby":e.length>0?e.join(` `):void 0,"aria-expanded":this._isOpen?`true`:`false`,"aria-label":this.state._hideLabel&&typeof this.state._label==`string`?this.state._label:void 0,"aria-labelledby":this.state._id+`-label`,"aria-keyshortcuts":this.state._shortKey,value:this.state._value,accessKey:this.state._accessKey,autocapitalize:`off`,autocorrect:`off`,disabled:t,customSuggestions:!0,id:this.state._id,name:this.state._name,required:this.state._required},this.controller.onFacade),{onChange:this.onChange.bind(this),onInput:this.onInput.bind(this),placeholder:this.state._placeholder})}render(){let e=this.state._disabled===!0;return i(h,Object.assign({key:`5d29dc592fe2292e261ef170fe75841d25f85aea`},this.getFormFieldProps()),i(_,{key:`631741b70ef2a1b8d428a95c0fab4cb58c911cef`,state:this.state},i(`div`,{key:`9d66ed4035974fd3e377d974301495dd28eb418a`,class:`kol-combobox__group`},i(v,Object.assign({key:`8f2c831fec6b647adbb86f8429f19334a17de2ae`},this.getInputProps())),this.state._value&&this.state._hasClearButton&&i(n,{key:`5a7b9faa823f8c5f2ef0f18a8a92b5c9587a61fc`,_icons:`kolicon-cross`,_label:this.translateDeleteSelection,_hideLabel:!0,_variant:`ghost`,_disabled:e,"data-testid":`combobox-delete`,class:`kol-combobox__delete`,hidden:e,_on:{onClick:()=>{this.clearSelection()},onFocus:()=>{this.clearButtonFocused=!0},onBlur:()=>{this.clearButtonFocused=!1}}}),i(`button`,{key:`9c260edf0a6488606a13d4ff9b12d08e0fdb3790`,type:`button`,tabIndex:-1,class:`kol-combobox-toggle`,onClick:this.toggleListbox.bind(this),disabled:this._disabled,hidden:e},i(p,{key:`122243913c7f7e1fe7032636901f4863194dfd87`,icons:`kolicon-chevron-down`,label:``}))),i(y,{key:`eee2b35d66c4aea8dbb9d2b6603edb67d8369b5e`,blockSuggestionMouseOver:this.blockSuggestionMouseOver,onKeyDown:this.handleKeyDownDropdown.bind(this),hidden:!this._isOpen||e,id:this.state._id+`-listbox`},Array.isArray(this._filteredSuggestions)&&this._filteredSuggestions.length>0&&this._filteredSuggestions.map((e,t)=>i(b,{disabled:!1,index:t,option:e,searchTerm:this.state._value,ref:e=>{e&&(this.refSuggestions[t]=e)},selected:this.state._value===e,onClick:()=>{this.selectOption(e),this.toggleListbox(),this._isOpen=!1},onMouseOver:()=>{this.blockSuggestionMouseOver||this.focusOption(t)},onFocus:()=>{this.focusOption(t)}})))))}handleKeyDown(e){var t,n;let r=(t,n)=>{var r;e.preventDefault(),t!==void 0&&(this._isOpen=t,t||(r=this.ctaRef.el)==null||r.focus()),n?.()};switch(e.key){case`Down`:case`ArrowDown`:this.blockSuggestionMouseOver=!0,r(!0,()=>this.moveFocus(1));break;case`Up`:case`ArrowUp`:this.blockSuggestionMouseOver=!0,r(!0,()=>this.moveFocus(-1));break;case`Tab`:this._isOpen&&(this._isOpen=!1,(t=this.ctaRef.el)==null||t.focus());break;case`Esc`:case`Escape`:this._isOpen=!1,e.preventDefault(),(n=this.ctaRef.el)==null||n.focus();break;case`Enter`:case`NumpadEnter`:this.clearButtonFocused?this.clearSelection():this._isOpen?this.selectFocusedOption()&&(this._isOpen=!1):this.toggleListbox(),e.preventDefault();break;case` `:this.clearButtonFocused?(this.clearSelection(),e.preventDefault()):this._isOpen&&this.selectFocusedOption()&&(this._isOpen=!1,e.preventDefault());break;case`Home`:this.blockSuggestionMouseOver=!0,r(void 0,()=>{this._isOpen&&this.focusOption(0)});break;case`End`:this.blockSuggestionMouseOver=!0,r(void 0,()=>{this._isOpen&&this.focusOption(this._filteredSuggestions?this._filteredSuggestions.length-1:0)});break;case`PageUp`:this.blockSuggestionMouseOver=!0,r(void 0,()=>this._isOpen&&this.moveFocus(-10));break;case`PageDown`:this.blockSuggestionMouseOver=!0,r(void 0,()=>this._isOpen&&this.moveFocus(10));break}}handleWindowClick(e){this.host!==void 0&&!this.host.contains(e.target)&&(this._isOpen=!1)}validateAriaDetails(e){this.controller.validateAriaDetails(e)}constructor(e){a(this,e),this.ctaRef=d(),this.refSuggestions=[],this._focusedOptionIndex=-1,this.translateDeleteSelection=f(`kol-delete-selection`),this.clearButtonFocused=!1,this.toggleListbox=()=>{var e;if(this.state._disabled===!0)this._isOpen=!1;else if((e=this.ctaRef.el)==null||e.focus(),this._isOpen)this._isOpen=!1;else if(Array.isArray(this._filteredSuggestions)&&this._filteredSuggestions.length>0){this._isOpen=!0;let e=this._filteredSuggestions.findIndex(e=>e===this.state._value);this._focusedOptionIndex=e>=0?e:-1,this.focusOption(this._focusedOptionIndex)}},this.blockSuggestionMouseOver=!1,this._isOpen=!1,this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._hasClearButton=!0,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this.state={_hasValue:!1,_hasClearButton:!0,_hideMsg:!1,_id:o(`combobox`),_label:``,_suggestions:[],_value:``},this.inputHasFocus=!1,this.controller=new w(this,`combobox`,this.host),this.onInput=this.onInput.bind(this)}showAsAlert(){return!!this.state._touched&&!this.inputHasFocus}validatePlaceholder(e){this.controller.validatePlaceholder(e)}validateAccessKey(e){this.controller.validateAccessKey(e)}validateDisabled(e){this.controller.validateDisabled(e)}validateHideMsg(e){this.controller.validateHideMsg(e)}validateHideLabel(e){this.controller.validateHideLabel(e)}validateHint(e){this.controller.validateHint(e)}validateIcons(e){this.controller.validateIcons(e)}validateLabel(e){this.controller.validateLabel(e)}validateMsg(e){this.controller.validateMsg(e)}validateName(e){this.controller.validateName(e)}validateOn(e){this.controller.validateOn(e)}validateShortKey(e){this.controller.validateShortKey(e)}validateSuggestions(e){this.controller.validateSuggestions(e),this._filteredSuggestions=e,this.setFilteredSuggestionsByQuery(this._value)}validateHasClearButton(e){this.controller.validateHasClearButton(e)}validateRequired(e){this.controller.validateRequired(e)}validateSyncValueBySelector(e){this.controller.validateSyncValueBySelector(e)}validateTouched(e){this.controller.validateTouched(e)}validateValue(e){this.controller.validateValue(e),this.controller.setFormAssociatedValue(e)}validateVariant(e){this.controller.validateVariant(e)}componentWillLoad(){this.validateAriaDetails(this._ariaDetails),this.refSuggestions=[],this._touched=this._touched===!0,this.controller.componentWillLoad(),this.state._hasValue=!!this.state._value,this.controller.addValueChangeListener(e=>this.state._hasValue=!!e),this._filteredSuggestions=this.state._suggestions}handleMouseEvent(){this.blockSuggestionMouseOver=!1}handleFocusIn(e){this.host?.contains(document.activeElement)&&!this.inputHasFocus&&(this.controller.onFacade.onFocus(e),this.inputHasFocus=!0)}handleFocusOut(e){let t=e.relatedTarget,n=t&&(t===this.host||this.host?.contains(t));this.inputHasFocus&&!n&&(this.controller.onFacade.onBlur(e),this.inputHasFocus=!1,this._isOpen&&=!1)}onChange(e){e.stopPropagation();let t=this.state._value;this.controller.onFacade.onChange(e,t),this.controller.setFormAssociatedValue(t)}get host(){return t(this)}static get watchers(){return{_ariaDetails:[`validateAriaDetails`],_placeholder:[`validatePlaceholder`],_accessKey:[`validateAccessKey`],_disabled:[`validateDisabled`],_hideMsg:[`validateHideMsg`],_hideLabel:[`validateHideLabel`],_hint:[`validateHint`],_icons:[`validateIcons`],_label:[`validateLabel`],_msg:[`validateMsg`],_name:[`validateName`],_on:[`validateOn`],_shortKey:[`validateShortKey`],_suggestions:[`validateSuggestions`],_hasClearButton:[`validateHasClearButton`],_required:[`validateRequired`],_syncValueBySelector:[`validateSyncValueBySelector`],_touched:[`validateTouched`],_value:[`validateValue`],_variant:[`validateVariant`]}}};s([u(`ctaRef`)],E.prototype,`focus`,null),s([l(`ctaRef`)],E.prototype,`click`,null),E.style={default:T};export{E as kol_combobox};