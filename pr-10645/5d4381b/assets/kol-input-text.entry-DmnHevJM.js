import{a as e,o as t,s as n}from"./index-cGsRKJ77.js";import{n as r,t as i}from"./dev.utils-Bp48T7K--tr1KkZf7.js";import"./base-web-component-BT6jbe_v-Vp21XLG3.js";import{t as a}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as o}from"./clsx-COFh-Vc8-alQuJLqj.js";import"./Heading-B1x6PKRk-w4AHIor1.js";import"./disabled-BcXSZaDo-eVXysCE0.js";import"./label-Ftw1VCQG-qXAtRx5T.js";import{n as s,r as c,t as l}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-Dmgd1cXp-UlS2ZdKe.js";import"./i18n-BsXYYo8j-Bl2dkvcW.js";import"./component-C0fGqGE4-BxJ2OtSo.js";import"./Alert-B0-brpb4-CDeHKHBq.js";import"./label-RX8TPr4R-ButqBogK.js";import"./variant-quote-BI3zVSZn-CUykAT2e.js";import"./component-D7UTo-Wg-CWrkkt-R.js";import"./icons-BX75HD_Y-Cm1TMFX4.js";import"./access-and-short-key-Mj1AS76I-oQKkwcDI.js";import"./hide-label-B9ipEhG8-BSmLkPK5.js";import"./align-DpNc6EKs-BGUKUjoG.js";import"./tooltip-align-ChjYN8Pt-BeZIujaf.js";import"./variant-class-name-DFWOlDkF-ZTHsIzaF.js";import"./component-ta0hHoH--5uGU0lpG.js";import"./align-floating-elements-BgsKEL5o-BIqw0YBp.js";import"./controller-DV0N3zXZ-BE4Zrgsk.js";import{n as u}from"./controller-CY_VvCRp-B_Rwsb-n.js";import"./aria-details-8nY2-PPr-BcW4cnce.js";import"./associated.controller-CKYHZabJ-By2YIopm.js";import{t as d}from"./FormFieldStateWrapper-DeD_I_FE-BH1OzBDd.js";import{t as f}from"./controller-icon-C_Du8fw5-BWj3meY4.js";import"./Input-C4bosh3c-CP8SezBp.js";import{t as p}from"./InputStateWrapper-B11I6qMD-D0u--goQ.js";import"./placeholder-BBA3H0w5-DS0uBrFR.js";import"./required-DSzN5_9V-DqXdDBKN.js";import"./suggestions-Bqlc1vUw-CwqTyfqd.js";import"./auto-complete-Bnrpv_sN-D2Y3Mgmc.js";import"./read-only-CR_961Fh-Bn7Ssbl8.js";import{t as m}from"./counter-dom-updater-DbyoBkbs-CHSn5FLZ.js";import"./spell-check-CoGXExpz-BHZSfzmb.js";import"./controller-D91xd76h-CExKM7Cw.js";import{t as h}from"./controller-Bs6pkz9U-oRJogIYf.js";var g=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1785949569353"); /* IE9*/
  src: url("kolicons.eot?t=1785949569353#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1785949569353") format("woff2"), url("kolicons.woff?t=1785949569353") format("woff"), url("kolicons.ttf?t=1785949569353") format("truetype"), url("kolicons.svg?t=1785949569353#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-form-field__hint-button {
    display: inline-flex;
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
}`,_=class{async getValue(){return this.ctaRef.el?.value}async focus(e){}async click(){}async selectionStart(){return Promise.resolve(this.ctaRef.el?.selectionStart)}async selectionEnd(){return Promise.resolve(this.ctaRef.el?.selectionEnd)}async setSelectionRange(e,t,n){var r;(r=this.ctaRef.el)==null||r.setSelectionRange(e,t,n)}async setSelectionStart(e){var t;(t=this.ctaRef.el)==null||t.setSelectionRange(e,e)}async setRangeText(e,t,n,r){var i,a;t!==void 0&&n!==void 0?(i=this.ctaRef.el)==null||i.setRangeText(e,t,n,r):(a=this.ctaRef.el)==null||a.setRangeText(e)}getFormFieldProps(){return{state:this.state,class:o(`kol-input-text`,this.state._type,{"has-value":this.state._hasValue,"kol-form-field--has-counter":this.controller.hasSoftCharacterLimit()||this.controller.hasCounter()}),tooltipAlign:this._tooltipAlign,alert:this.showAsAlert(),counterRefs:{visualRef:this.counterUpdater.setVisualRef,ariaRef:this.counterUpdater.setAriaRef}}}getInputProps(){let e=typeof this.state._maxLength==`number`&&!this.controller.hasCounter()?[i(this.state._id,`character-limit-hint`)]:void 0;return Object.assign(Object.assign({ref:this.ctaRef,state:this.state,ariaDescribedBy:e},this.controller.onFacade),{onBlur:this.onBlur,onChange:this.onChange,onFocus:this.onFocus,onInput:this.onInput,onKeyDown:this.onKeyDown})}render(){return t(d,Object.assign({key:`9f131c81c170b8958fad815a771acb6defd0e836`},this.getFormFieldProps()),t(f,{key:`f52e11bf904dabeb11944ab6bc650f2c693664e6`,state:this.state},t(p,Object.assign({key:`5672b675d85f121ea0f39334a7e7f08038077fe0`},this.getInputProps()))))}validateAriaDetails(e){this.controller.validateAriaDetails(e)}constructor(e){n(this,e),this.ctaRef=l(),this.counterUpdater=new m,this.onBlur=e=>{this.controller.onFacade.onBlur(e),this.inputHasFocus=!1},this.onChange=e=>{let t=this.ctaRef.el?.value;this.oldValue!==t&&(this.oldValue=t),this.controller.onFacade.onChange(e)},this.onFocus=e=>{this.controller.onFacade.onFocus(e),this.inputHasFocus=!0,this.counterUpdater.retriggerAria(this._value?.length??0,this.state._maxLength,this.state._maxLengthBehavior??`hard`)},this.onInput=e=>{this._value=this.ctaRef.el?.value??``,this.controller.onFacade.onInput(e)},this.onKeyDown=e=>{this.controller.onFacade.onKeyDown(e),this.counterUpdater.handleKeyDown(e,this.ctaRef.el?.value.length??0,this.state._maxLength,this.state._maxLengthBehavior??`hard`),(e.code===`Enter`||e.code===`NumpadEnter`)&&u({form:this.host})},this._autoComplete=`off`,this._hasCounter=!1,this._maxLengthBehavior=`hard`,this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._readOnly=!1,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this._type=`text`,this.state={_hasValue:!1,_hideMsg:!1,_id:r(`input-text`),_label:``,_suggestions:[],_type:`text`},this.inputHasFocus=!1,this.controller=new h(this,`text`,this.host)}showAsAlert(){return!!this.state._touched&&!this.inputHasFocus}validateAccessKey(e){this.controller.validateAccessKey(e)}validateAutoComplete(e){this.controller.validateAutoComplete(e)}validateMaxLengthBehavior(e){this.controller.validateMaxLengthBehavior(e)}validateDisabled(e){this.controller.validateDisabled(e)}validateHideMsg(e){this.controller.validateHideMsg(e)}validateHideLabel(e){this.controller.validateHideLabel(e)}validateHasCounter(e){this.controller.validateHasCounter(e)}validateHint(e){this.controller.validateHint(e)}validateIcons(e){this.controller.validateIcons(e)}validateLabel(e){this.controller.validateLabel(e)}validateMaxLength(e){this.controller.validateMaxLength(e),this.counterUpdater.updateImmediate(this._value?.length??0,this.state._maxLength,this.state._maxLengthBehavior??`hard`)}validateMsg(e){this.controller.validateMsg(e)}validateName(e){this.controller.validateName(e)}validateOn(e){this.controller.validateOn(e)}validatePattern(e){this.controller.validatePattern(e)}validatePlaceholder(e){this.controller.validatePlaceholder(e)}validateReadOnly(e){this.controller.validateReadOnly(e)}validateRequired(e){this.controller.validateRequired(e)}validateShortKey(e){this.controller.validateShortKey(e)}validateSpellCheck(e){this.controller.validateSpellCheck(e)}validateSuggestions(e){this.controller.validateSuggestions(e)}validateSmartButton(e){this.controller.validateSmartButton(e)}validateSyncValueBySelector(e){this.controller.validateSyncValueBySelector(e)}validateTouched(e){this.controller.validateTouched(e)}validateType(e){this.controller.validateType(e)}validateValue(e){this.controller.validateValue(e),this.oldValue=e,this.counterUpdater.update(e?.length??0,this.state._maxLength,this.state._maxLengthBehavior??`hard`)}validateVariant(e){this.controller.validateVariant(e)}componentDidLoad(){(this.controller.hasCounter()||this.controller.hasSoftCharacterLimit())&&this.counterUpdater.updateImmediate(this._value?.length??0,this.state._maxLength,this.state._maxLengthBehavior??`hard`)}disconnectedCallback(){this.counterUpdater.destroy()}componentWillLoad(){this.validateAriaDetails(this._ariaDetails),this._touched=this._touched===!0,this.oldValue=this._value,this.controller.componentWillLoad(),this.state._hasValue=!!this.state._value,this.controller.addValueChangeListener(e=>this.state._hasValue=!!e)}get host(){return e(this)}static get watchers(){return{_ariaDetails:[`validateAriaDetails`],_accessKey:[`validateAccessKey`],_autoComplete:[`validateAutoComplete`],_maxLengthBehavior:[`validateMaxLengthBehavior`],_disabled:[`validateDisabled`],_hideMsg:[`validateHideMsg`],_hideLabel:[`validateHideLabel`],_hasCounter:[`validateHasCounter`],_hint:[`validateHint`],_icons:[`validateIcons`],_label:[`validateLabel`],_maxLength:[`validateMaxLength`],_msg:[`validateMsg`],_name:[`validateName`],_on:[`validateOn`],_pattern:[`validatePattern`],_placeholder:[`validatePlaceholder`],_readOnly:[`validateReadOnly`],_required:[`validateRequired`],_shortKey:[`validateShortKey`],_spellCheck:[`validateSpellCheck`],_suggestions:[`validateSuggestions`],_smartButton:[`validateSmartButton`],_syncValueBySelector:[`validateSyncValueBySelector`],_touched:[`validateTouched`],_type:[`validateType`],_value:[`validateValue`],_variant:[`validateVariant`]}}};a([c(`ctaRef`)],_.prototype,`focus`,null),a([s(`ctaRef`)],_.prototype,`click`,null),_.style={default:g};export{_ as kol_input_text};