import{Tt as e,a as t,kt as n,o as r,rt as i,s as a,xt as o}from"./index-BDrkE4r0.js";import{n as s}from"./dev.utils-BXf9h7MR-JD8DNTda.js";import"./base-web-component-BT6jbe_v-Vp21XLG3.js";import{n as c,t as l}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as u}from"./clsx-COFh-Vc8-alQuJLqj.js";import"./Heading-BKIw2hie-CNGzxfOe.js";import"./disabled-BcXSZaDo-YJE2Zfqe.js";import"./label-Ftw1VCQG-BtqBLScF.js";import{n as d,r as f,t as p}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-Dmgd1cXp-CizKJth4.js";import"./i18n-BsXYYo8j-TC135gC_.js";import{t as m}from"./component-CCQEFb4H-Bs8A56Ec.js";import"./Alert-6LKID5XK-CusopCzl.js";import"./label-RX8TPr4R-Dado2bvA.js";import"./variant-quote-BI3zVSZn-CaiEkpbm.js";import"./component-BG44r5Mq-cUit7lPW.js";import"./access-and-short-key-Mj1AS76I-DxnJpZsw.js";import"./hide-label-B9ipEhG8-cr3eLkj6.js";import"./align-DpNc6EKs-Bd0YzvzZ.js";import"./tooltip-align-ChjYN8Pt-DsPQdC70.js";import"./variant-class-name-DFWOlDkF-Cbs0vV7m.js";import"./component-8mzKPFWl-DO5QSl27.js";import"./align-floating-elements-BgsKEL5o-DUuTWSJ5.js";import"./controller-DV0N3zXZ-C0rreHSo.js";import{n as h}from"./controller-CY_VvCRp-r6nI1-1t.js";import"./aria-details-8nY2-PPr-CjUjPB8C.js";import"./associated.controller-CKYHZabJ-QULPgEzt.js";import{c as g,o as _,s as v,t as y}from"./FormFieldStateWrapper-bIXou4Vb-DMy6CYgX.js";import{t as b}from"./Input-GYVleU_A-C7oTjRLJ.js";import"./required-DSzN5_9V-CCoz6g-X.js";import"./orientation-BOSiSKDw-CI7CLDQC.js";import{t as x}from"./controller-DSLm6Bu3-7BT14W2g.js";import{t as S}from"./FieldControlStateWrapper-B094YFcY-C4XLKhTe.js";var C=(t,n)=>{e(t,`_checked`,n)},w=(t,n)=>{e(t,`_indeterminate`,n)},T=[`left`,`right`],E=(e,t)=>{n(e,`_labelAlign`,e=>typeof e==`string`&&T.includes(e),new Set([`KoliBriLabelAlign {${T.join(`, `)}`]),t)},D=[`button`,`default`,`switch`],O=e=>typeof e==`string`&&D.includes(e),k=(e,t)=>{n(e,`_variant`,O,new Set(D),t)},A=class extends x{constructor(e,t,n){super(e,t,n),this.setFormAssociatedCheckboxValue=e=>{this.component._checked?this.setFormAssociatedValue(e):this.setFormAssociatedValue(null)},this.component=e}validateChecked(e){C(this.component,e),this.setFormAssociatedCheckboxValue(this.component.state._value)}validateIcons(e){n(this.component,`_icons`,e=>{let t=e;return typeof t==`object`&&!!t&&(i(t.checked,1)||i(t.indeterminate,1)||i(t.unchecked,1))},new Set([`InputCheckboxIcons`]),e,{hooks:{beforePatch:(e,t,n)=>{t.set(`_icons`,Object.assign(Object.assign({},n.state._icons),e))}}})}validateIndeterminate(e){w(this.component,e)}validateLabelAlign(e){E(this.component,e)}validateValue(e){o(this.component,`_value`,e),this.setFormAssociatedCheckboxValue(this.component.state._value)}validateVariant(e){k(this.component,e)}componentWillLoad(){super.componentWillLoad(),this.validateChecked(this.component._checked),this.validateIcons(this.component._icons),this.validateIndeterminate(this.component._indeterminate),this.validateValue(this.component._value),this.validateVariant(this.component._variant),this.validateLabelAlign(this.component._labelAlign)}},j=e=>{var{class:t,variant:n=`default`,icon:i,inputProps:a}=e,o=c(e,[`class`,`variant`,`icon`,`inputProps`]);let{class:s}=a,l=c(a,[`class`]),d={[`kol-checkbox--variant-${n}`]:!0,"kol-checkbox--checked":a?.checked,"kol-checkbox--indeterminate":a?.indeterminate,"kol-checkbox--disabled":!!a?.disabled,"kol-checkbox--required":!!a?.required,"kol-checkbox--touched":!!a?.touched,[`kol-checkbox--${_(a?.msg)}`]:!!g(a?.msg,a?.touched)};return r(`label`,Object.assign({class:u(`kol-checkbox`,d,t)},o),r(m,{label:``,icons:i,class:u(`kol-checkbox__icon`)}),r(b,Object.assign({class:u(`kol-checkbox__input`,s)},l,{type:`checkbox`})))};function M(e,t={}){let{ariaDescribedBy:n}=v(e),r={id:e._id,hideLabel:e._hideLabel,label:e._label,value:e._value,accessKey:e._accessKey,disabled:e._disabled,name:e._name,ariaDescribedBy:n};return`_required`in e&&(r.required=e._required),`_checked`in e&&(r.checked=e._checked),`_indeterminate`in e&&(r.indeterminate=e._indeterminate),`_touched`in e&&(r.touched=e._touched),`_msg`in e&&(r.msg=e._msg),`_shortKey`in e&&(r[`aria-keyshortcuts`]=e._shortKey),Object.assign(Object.assign({},r),t)}var N=e=>{var{state:t,inputProps:n}=e,i=c(e,[`state`,`inputProps`]);let a=t?._variant||`default`;return r(j,Object.assign({variant:a,inputProps:M(t,n)},i))},P=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1785418168146"); /* IE9*/
  src: url("kolicons.eot?t=1785418168146#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1785418168146") format("woff2"), url("kolicons.woff?t=1785418168146") format("woff"), url("kolicons.ttf?t=1785418168146") format("truetype"), url("kolicons.svg?t=1785418168146#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-form-field {
    display: grid;
  }
  .kol-form-field__label-text {
    display: ruby;
  }
  .kol-checkbox {
    display: flex;
    position: relative;
    align-items: center;
    cursor: pointer;
  }
  .kol-checkbox--disabled {
    cursor: not-allowed;
  }
  .kol-checkbox .kol-input {
    background-color: white;
    border-style: solid;
    margin: 0;
    border-width: 2px;
    appearance: none;
    cursor: inherit;
  }
  .kol-checkbox .kol-input:before {
    content: "";
  }
  /**
   * Variant: Checkbox
   */
  .kol-checkbox--variant-default {
    position: relative;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    justify-content: center;
  }
  .kol-checkbox--variant-default .kol-icon {
    display: none;
    position: absolute;
    inset: auto;
    z-index: 1;
    pointer-events: none;
  }
  .kol-checkbox--variant-default .kol-input {
    width: calc(22 * 1rem / var(--kolibri-root-font-size, 16));
    height: calc(22 * 1rem / var(--kolibri-root-font-size, 16));
  }
  .kol-checkbox--variant-default.kol-checkbox--checked .kol-icon, .kol-checkbox--variant-default.kol-checkbox--indeterminate .kol-icon {
    display: block;
  }
  /**
   * Variant: Switch
   */
  .kol-checkbox--variant-switch {
    position: relative;
  }
  .kol-checkbox--variant-switch .kol-input {
    display: inline-block;
    position: relative;
    width: 3.2em;
    min-width: 3.2em;
    height: 1.7em;
  }
  .kol-checkbox--variant-switch .kol-input::before {
    background-color: black;
    position: absolute;
    top: calc(0.25em - 2 * 1rem / var(--kolibri-root-font-size, 16));
    left: calc(0.25em - 2 * 1rem / var(--kolibri-root-font-size, 16));
    width: 1.2em;
    height: 1.2em;
    transition: 0.5s;
  }
  .kol-checkbox--variant-switch .kol-input:checked::before {
    transform: translateX(1.5em);
  }
  .kol-checkbox--variant-switch .kol-input:indeterminate::before {
    transform: translateX(0.75em);
  }
  .kol-checkbox--variant-switch .kol-icon {
    transform: translate(0, -50%);
    color: black;
    display: flex;
    position: absolute;
    top: 50%;
    left: calc(4 * 1rem / var(--kolibri-root-font-size, 16));
    z-index: 1;
    width: 1.2em;
    height: 1.2em;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
  }
  .kol-checkbox--variant-switch.kol-checkbox--checked .kol-icon {
    transform: translate(1.5em, -50%);
  }
  .kol-checkbox--variant-switch.kol-checkbox--indeterminate .kol-icon {
    transform: translate(0.75em, -50%);
  }
  /**
   * Variant: Button
   */
  .kol-checkbox--variant-button {
    min-width: var(--a11y-min-size);
  }
  .kol-checkbox--variant-button .kol-icon {
    display: flex;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: center;
    justify-content: center;
  }
}`,F=class{getModelValue(){return this._checked?this.state._value:null}async getValue(){return this.getModelValue()}async focus(e){}async click(){}getFormFieldProps(){return{state:this.state,class:u(`kol-input-checkbox`,{"kol-input-checkbox--checked":this.state._checked,"kol-input-checkbox--indeterminate":this.state._indeterminate,[`kol-input-checkbox--variant-${this.state._variant||`default`}`]:!0,[`kol-input-checkbox--label-align-${this.state._labelAlign||`right`}`]:!0}),tooltipAlign:this._tooltipAlign,alert:this.showAsAlert(),renderNoTooltip:!0}}getFieldControlProps(){return{class:u(`kol-input-checkbox__field-control`,{"kol-input-checkbox__field-control--checked":this.state._checked,"kol-input-checkbox__field-control--indeterminate":this.state._indeterminate,[`kol-input-checkbox__field-control--variant-${this.state._variant||`default`}`]:!0}),state:this.state,fieldControlLabelProps:{onMouseDown:e=>{this.inputHasFocus&&e.preventDefault()}}}}getInputProps(){return{state:this.state,icon:this.getIcon(),onMouseDown:e=>{this.inputHasFocus&&!(e.target instanceof HTMLInputElement)&&e.preventDefault()},inputProps:Object.assign(Object.assign({class:u({"visually-hidden":this.state._variant===`button`}),ref:this.ctaRef},this.controller.onFacade),{onInput:this.onInput,onChange:this.onChange,onKeyDown:this.onKeyDown,onFocus:e=>{this.controller.onFacade.onFocus(e),this.inputHasFocus=!0},onBlur:e=>{this._disabled||(this.controller.onFacade.onBlur(e),this.inputHasFocus=!1)},onClick:void 0})}}getIcon(){return this.state._indeterminate?this.state._icons.indeterminate:this.state._checked?this.state._icons.checked:this.state._icons.unchecked}render(){return r(y,Object.assign({key:`0ea0966fe542da9d5fd29c6a440ebea8ccb25956`},this.getFormFieldProps(),{renderNoLabel:!0}),r(S,Object.assign({key:`a0fa6137a59dcc2ee59a09e965c4cb84fd7a12d7`},this.getFieldControlProps(),{renderNoHint:!0}),r(N,Object.assign({key:`f10b121933fdf4f3aebb7767852a49e7157c2a6e`},this.getInputProps()))))}constructor(e){a(this,e),this.ctaRef=p(),this._checked=!1,this._hideMsg=!1,this._disabled=!1,this._hideLabel=!1,this._hint=``,this._labelAlign=`right`,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this._value=!0,this._variant=`default`,this.state={_checked:!1,_hideMsg:!1,_icons:{checked:`kolicon-check`,indeterminate:`kolicon-minus`,unchecked:`kolicon-cross`},_id:s(`input-checkbox`),_indeterminate:!1,_label:``,_value:!0,_variant:`default`,_labelAlign:`right`},this.inputHasFocus=!1,this.onInput=e=>{this._checked=!this._checked,this._indeterminate=!1;let t=this.getModelValue();this.controller.onFacade.onInput(e,!1,t),this.controller.setFormAssociatedCheckboxValue(t)},this.onChange=e=>{this.controller.onFacade.onChange(e,this.getModelValue())},this.onKeyDown=e=>{this.controller.onFacade.onKeyDown(e),(e.code===`Enter`||e.code===`NumpadEnter`)&&h({form:this.host})},this.controller=new A(this,`checkbox`,this.host)}showAsAlert(){return!!this.state._touched&&!this.inputHasFocus}validateAccessKey(e){this.controller.validateAccessKey(e)}validateAriaDetails(e){this.controller.validateAriaDetails(e)}validateChecked(e){this.controller.validateChecked(e)}validateDisabled(e){this.controller.validateDisabled(e)}validateHideMsg(e){this.controller.validateHideMsg(e)}validateHideLabel(e){this.controller.validateHideLabel(e)}validateHint(e){this.controller.validateHint(e)}validateIcons(e){this.controller.validateIcons(e)}validateIndeterminate(e){this.controller.validateIndeterminate(e)}validateLabel(e){this.controller.validateLabel(e)}validateLabelAlign(e){this.controller.validateLabelAlign(e)}validateMsg(e){this.controller.validateMsg(e)}validateName(e){this.controller.validateName(e)}validateOn(e){this.controller.validateOn(e)}validateRequired(e){this.controller.validateRequired(e)}validateShortKey(e){this.controller.validateShortKey(e)}validateSyncValueBySelector(e){this.controller.validateSyncValueBySelector(e)}validateTouched(e){this.controller.validateTouched(e)}validateValue(e){this.controller.validateValue(e)}validateVariant(e){this.controller.validateVariant(e)}componentWillLoad(){this._touched=this._touched===!0,this.validateAriaDetails(this._ariaDetails),this.controller.componentWillLoad()}get host(){return t(this)}static get watchers(){return{_accessKey:[`validateAccessKey`],_ariaDetails:[`validateAriaDetails`],_checked:[`validateChecked`],_disabled:[`validateDisabled`],_hideMsg:[`validateHideMsg`],_hideLabel:[`validateHideLabel`],_hint:[`validateHint`],_icons:[`validateIcons`],_indeterminate:[`validateIndeterminate`],_label:[`validateLabel`],_labelAlign:[`validateLabelAlign`],_msg:[`validateMsg`],_name:[`validateName`],_on:[`validateOn`],_required:[`validateRequired`],_shortKey:[`validateShortKey`],_syncValueBySelector:[`validateSyncValueBySelector`],_touched:[`validateTouched`],_value:[`validateValue`],_variant:[`validateVariant`]}}};l([f(`ctaRef`)],F.prototype,`focus`,null),l([d(`ctaRef`)],F.prototype,`click`,null),F.style={default:P};export{F as kol_input_checkbox};