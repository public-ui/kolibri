import{Ot as e,_ as t,a as n,o as r,s as i}from"./index-DVOtN9Yg.js";import{n as a}from"./dev.utils-Bp48T7K--D6Y8_10P.js";import"./base-web-component-BT6jbe_v-Vp21XLG3.js";import{t as o}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as s}from"./clsx-COFh-Vc8-alQuJLqj.js";import"./Heading-B1x6PKRk-hYsy6eir.js";import"./disabled-BcXSZaDo-DC47qBpz.js";import"./label-Ftw1VCQG-Csv-DxH6.js";import{n as c,r as l,t as u}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-Dmgd1cXp-DV1MscQR.js";import{t as d}from"./i18n-BsXYYo8j-DtXHYllX.js";import"./component-C0fGqGE4-CbEpce9v.js";import"./Alert-B0-brpb4-ZV0os1YV.js";import"./label-RX8TPr4R-Bj5GzW0-.js";import"./variant-quote-BI3zVSZn-5aXSyKob.js";import"./component-D7UTo-Wg-V78q1h5X.js";import"./icons-BX75HD_Y-DYXAbBA4.js";import"./access-and-short-key-Mj1AS76I-D61r_RHb.js";import"./hide-label-B9ipEhG8-p42FCxVm.js";import"./align-DpNc6EKs-B7F46mQb.js";import"./tooltip-align-ChjYN8Pt-vsAdKpWu.js";import"./variant-class-name-DFWOlDkF-BwPi9HtR.js";import"./component-ta0hHoH--E6hsz6a9.js";import"./align-floating-elements-BgsKEL5o-DEJ-rdfL.js";import"./controller-DV0N3zXZ-DnIBS76m.js";import"./aria-details-8nY2-PPr-BoFUtUKN.js";import"./associated.controller-CKYHZabJ-DZtzdoSv.js";import{t as f}from"./FormFieldStateWrapper-RFAVyAWM-B7mSXV5n.js";import{n as p,t as m}from"./controller-icon-E2i_Tvo6-yQzne7c_.js";import"./Input-CybpAJ8Y-BEOMvNas.js";import{t as h}from"./InputStateWrapper-DyXXkT2u-C-ZY-qtW.js";import{t as g}from"./required-DSzN5_9V-1RfzQlzn.js";import{t as _}from"./multiple-BZH-f6A7-DCDIKLFN.js";var v=(t,n,r={})=>{e(t,`_accept`,n,r)},y=class extends p{constructor(e,t,n){super(e,t,n),this.component=e}validateAccept(e){v(this.component,e)}validateMultiple(e){_(this.component,e)}validateRequired(e){g(this.component,e)}componentWillLoad(){super.componentWillLoad(),this.validateAccept(this.component._accept),this.validateMultiple(this.component._multiple),this.validateRequired(this.component._required)}},b=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1786009005100"); /* IE9*/
  src: url("kolicons.eot?t=1786009005100#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1786009005100") format("woff2"), url("kolicons.woff?t=1786009005100") format("woff"), url("kolicons.ttf?t=1786009005100") format("truetype"), url("kolicons.svg?t=1786009005100#kolicons") format("svg"); /* iOS 4.1- */
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
  :host {
    display: inline-block;
  }
  .kol-button {
    display: flex;
    height: 100%;
    min-height: var(--a11y-min-size);
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-input {
    opacity: 0;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .kol-input::-webkit-file-upload-button, .kol-input::file-selector-button {
    cursor: pointer;
  }
  .kol-input:disabled, .kol-input:disabled::-webkit-file-upload-button, .kol-input:disabled::file-selector-button {
    cursor: not-allowed;
    pointer-events: none;
  }
  .kol-input-container__container {
    display: flex;
    overflow: hidden;
    align-items: center;
  }
  .kol-input-container__filename {
    overflow: hidden;
    flex-grow: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .kol-input-container:has(> .kol-input-container__adornment--start):has(> .kol-input-container__adornment--end) {
    grid-template-columns: auto 1fr;
  }
}`,x=class{async getValue(){return this.ctaRef.el?.files}async focus(e){}async click(){}async reset(){this.controller.setFormAssociatedValue(``),this.filename=this.translateFilenameText,this.hasFileSelected=!1,this.ctaRef.el&&(this.ctaRef.el.value=``)}getFormFieldProps(){return{state:this.state,class:s(`kol-input-file`,`file`),tooltipAlign:this._tooltipAlign,alert:this.showAsAlert()}}getInputProps(){return Object.assign(Object.assign({ref:this.ctaRef,state:this.state,type:`file`,accept:this.state._accept,multiple:this.state._multiple},this.controller.onFacade),{onChange:this.onChange,onInput:this.onInput,onFocus:e=>{this.controller.onFacade.onFocus(e),this.inputHasFocus=!0},onBlur:e=>{this.controller.onFacade.onBlur(e),this.inputHasFocus=!1}})}render(){return r(f,Object.assign({key:`2f1dea434280f076dd0b2fdc65e3edb606f9ba8e`},this.getFormFieldProps()),r(m,{key:`25670f621dcdbd768569d37e5d4737636dd8cbcf`,state:this.state},r(`span`,{key:`d0f515da4f147e462c602a7b46dbdc57dd10a70f`,class:s(`kol-input-container__filename`,{"kol-input-container__filename--has-file":this.hasFileSelected})},this.filename),r(h,Object.assign({key:`68df67267f52e158997fcfe00a9218267f4fa356`},this.getInputProps())),r(t,{key:`936bd37943dfec580375193b26f1ee3db9f46bde`,class:`kol-input-container__button`,_label:this.translateDataBrowseText,_variant:`primary`,_disabled:this._disabled})))}constructor(e){i(this,e),this.ctaRef=u(),this.translateDataBrowseText=d(`kol-data-browse-text`),this.translateFilenameText=d(`kol-filename-text`),this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._multiple=!1,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this.filename=this.translateFilenameText,this.hasFileSelected=!1,this.state={_hideMsg:!1,_id:a(`input-file`),_label:``},this.inputHasFocus=!1,this.onDragOver=e=>{var t;e.preventDefault(),(t=this.ctaRef.el?.parentElement?.parentElement)==null||t.classList.add(`kol-input-container--is-dragover`)},this.onDragLeave=()=>{var e;(e=this.ctaRef.el?.parentElement?.parentElement)==null||e.classList.remove(`kol-input-container--is-dragover`)},this.onDrop=e=>{var t;if(e.preventDefault(),this.ctaRef.el&&((t=this.ctaRef.el.parentElement?.parentElement)==null||t.classList.remove(`kol-input-container--is-dragover`),e.dataTransfer?.files.length)){let t=e.dataTransfer.files;this.ctaRef.el.files=t,this.filename=Array.from(t).map(e=>e.name).join(`, `),this.controller.setFormAssociatedValue(t),this.controller.onFacade.onChange(e,t),this.controller.onFacade.onInput(e,!1,t)}},this.onChange=e=>{if(this.ctaRef.el instanceof HTMLInputElement&&this.ctaRef.el.type===`file`){let t=this.ctaRef.el.files;this.hasFileSelected=!!t?.length,this.filename=t?.length?Array.from(t).map(e=>e.name).join(`, `):this.translateFilenameText,this.controller.onFacade.onChange(e,t),this.controller.setFormAssociatedValue(t)}},this.onInput=e=>{if(this.ctaRef.el instanceof HTMLInputElement&&this.ctaRef.el.type===`file`){let t=this.ctaRef.el.files;this.controller.onFacade.onInput(e,!1,t)}},this.controller=new y(this,`file`,this.host)}showAsAlert(){return!!this.state._touched&&!this.inputHasFocus}validateAccept(e){this.controller.validateAccept(e)}validateAccessKey(e){this.controller.validateAccessKey(e)}validateAriaDetails(e){this.controller.validateAriaDetails(e)}validateDisabled(e){this.controller.validateDisabled(e)}validateHideMsg(e){this.controller.validateHideMsg(e)}validateHideLabel(e){this.controller.validateHideLabel(e)}validateHint(e){this.controller.validateHint(e)}validateIcons(e){this.controller.validateIcons(e)}validateLabel(e){this.controller.validateLabel(e)}validateMsg(e){this.controller.validateMsg(e)}validateMultiple(e){this.controller.validateMultiple(e)}validateName(e){this.controller.validateName(e)}validateOn(e){this.controller.validateOn(e)}validateRequired(e){this.controller.validateRequired(e)}validateShortKey(e){this.controller.validateShortKey(e)}validateSmartButton(e){this.controller.validateSmartButton(e)}validateSyncValueBySelector(e){this.controller.validateSyncValueBySelector(e)}validateTouched(e){this.controller.validateTouched(e)}validateVariant(e){this.controller.validateVariant(e)}componentWillLoad(){this._touched=this._touched===!0,this.validateAriaDetails(this._ariaDetails),this.controller.componentWillLoad()}componentDidLoad(){let e=this.ctaRef.el?.parentElement?.parentElement;e?.addEventListener(`dragover`,this.onDragOver),e?.addEventListener(`dragleave`,this.onDragLeave),e?.addEventListener(`drop`,this.onDrop)}get host(){return n(this)}static get watchers(){return{_accept:[`validateAccept`],_accessKey:[`validateAccessKey`],_ariaDetails:[`validateAriaDetails`],_disabled:[`validateDisabled`],_hideMsg:[`validateHideMsg`],_hideLabel:[`validateHideLabel`],_hint:[`validateHint`],_icons:[`validateIcons`],_label:[`validateLabel`],_msg:[`validateMsg`],_multiple:[`validateMultiple`],_name:[`validateName`],_on:[`validateOn`],_required:[`validateRequired`],_shortKey:[`validateShortKey`],_smartButton:[`validateSmartButton`],_syncValueBySelector:[`validateSyncValueBySelector`],_touched:[`validateTouched`],_variant:[`validateVariant`]}}};o([l(`ctaRef`)],x.prototype,`focus`,null),o([c(`ctaRef`)],x.prototype,`click`,null),x.style={default:b};export{x as kol_input_file};