import{Dt as e,Et as t,a as n,o as r,s as i}from"./index-DxoAMT6r.js";import{n as a,t as o}from"./dev.utils-DIu7_VyB-D0k3_lEg.js";import"./base-web-component-D909Fl-Y-DjL1hhrh.js";import{n as s,t as c}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as l}from"./clsx-COFh-Vc8-DWAop4cA.js";import"./Heading-k6TDy0AK-B-5cVw_c.js";import"./disabled-D9vEsnpm-ClQswEew.js";import"./label-BIbocgr4-CevRhHl7.js";import{n as u,r as d,t as f}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-Be8ufkLk-B42yVsdQ.js";import"./i18n-BQHGsG9x-DmqPDPIC.js";import"./component-D8_w_70e-CapA1jCj.js";import"./Alert-DsVfg6BH-C6LxuhZP.js";import"./label-BvARLb-R-DDedBiEw.js";import"./variant-quote-EmnyVV4C-CUfv-h6o.js";import"./component-BGQ3KHIL-DhvU8zcS.js";import"./icons-DcQuwLiH-8LL6aXc-.js";import"./align-DnuTHmUs-CMvtyEoX.js";import"./align-floating-elements-WdG2GMuA-BgL5MLyZ.js";import"./behavior-HUguuvWv-B3yCwCAZ.js";import"./variant-class-name-n9fFvZD3-DSQC0gJO.js";import"./component-Bo3vx5Fw-CEpuEsem.js";import"./aria-details-CJRXDn9Y-BnI66xsz.js";import"./associated.controller-CLABhrQa-tg5mnDLn.js";import"./hide-label-DLFa0pLb-yO4h1Ook.js";import"./tooltip-align-CXJ9LTRR--qckGgVL.js";import{a as p,c as m,o as h,s as g,t as _}from"./FormFieldStateWrapper-C78YhFMp-DIUB8gCa.js";import{n as v,t as y}from"./controller-icon-DmNjXloo-CB2eOFBB.js";import{t as b}from"./placeholder-CFHs33T3-BPIc-VKP.js";import{t as x}from"./required-BCinTANC-mSU6hbhe.js";import{t as S}from"./read-only-CJg166t--HtauTYKZ.js";import{i as C,n as w,r as T,t as E}from"./counter-dom-updater-IzONttDm-CFr_UouK.js";import{t as D}from"./spell-check-DM2ucggn-DJ0kslV5.js";import{t as O}from"./rows-Bu0kzWI0-0i_7OfMm.js";var k=[`vertical`,`none`],A=e=>typeof e==`string`&&k.includes(e),j=(t,n)=>{e(t,`_resize`,A,new Set(k),n,{defaultValue:`vertical`})},M=e=>{let{class:t,msg:n,touched:i,readonly:a,disabled:o,required:c,ariaDescribedBy:u,hideLabel:d,label:f}=e,g=s(e,[`class`,`msg`,`touched`,`readonly`,`disabled`,`required`,`ariaDescribedBy`,`hideLabel`,`label`]),_={"kol-textarea--disabled":!!o,"kol-textarea--required":!!c,"kol-textarea--touched":!!i,"kol-textarea--readonly":!!a,[`kol-textarea--${h(n)}`]:m(n,i)},v=Object.assign(Object.assign({class:l(`kol-textarea`,_,t),required:c,disabled:o,readonly:a},p({ariaDescribedBy:u,hideLabel:d,label:f})),g);return r(`textarea`,Object.assign({},v))};function N(e,t){let n=g(e),r=[...n.ariaDescribedBy,...t.ariaDescribedBy??[]],i=Object.assign(Object.assign({id:e._id,hideLabel:e._hideLabel,label:e._label,value:e._value,accessKey:e._accessKey,disabled:e._disabled,name:e._name,rows:e._rows,readonly:e._readOnly,required:e._required,placeholder:e._placeholder,touched:e._touched,msg:e._msg},t),{ariaDescribedBy:r,"aria-invalid":n.hasError?`true`:void 0});return`_maxLength`in e&&`_maxLengthBehavior`in e&&e._maxLengthBehavior===`hard`&&(i.maxLength=e._maxLength),`_shortKey`in e&&(i[`aria-keyshortcuts`]=e._shortKey),i}var P=e=>{var{state:t}=e,n=s(e,[`state`]);return r(M,Object.assign({},N(t,n)))},F=class extends v{constructor(e,t,n){super(e,t,n),this.component=e}validateHasCounter(e){w(this.component,e)}validateMaxLengthBehavior(e){C(this.component,e)}validateMaxLength(e){T(this.component,e)}validatePlaceholder(e){b(this.component,e)}validateReadOnly(e){S(this.component,e)}validateResize(e){j(this.component,e)}validateRequired(e){x(this.component,e)}validateRows(e){O(this.component,e)}validateSpellCheck(e){D(this.component,e)}validateValue(e){t(this.component,`_value`,e),this.setFormAssociatedValue(this.component._value)}componentWillLoad(){super.componentWillLoad(),this.validateHasCounter(this.component._hasCounter),this.validateMaxLengthBehavior(this.component._maxLengthBehavior),this.validateMaxLength(this.component._maxLength),this.validatePlaceholder(this.component._placeholder),this.validateReadOnly(this.component._readOnly),this.validateRequired(this.component._required),this.validateResize(this.component._resize),this.validateRows(this.component._rows),this.validateSpellCheck(this.component._spellCheck),this.validateValue(this.component._value)}},I=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1788230304984"); /* IE9*/
  src: url("kolicons.eot?t=1788230304984#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1788230304984") format("woff2"), url("kolicons.woff?t=1788230304984") format("woff"), url("kolicons.ttf?t=1788230304984") format("truetype"), url("kolicons.svg?t=1788230304984#kolicons") format("svg"); /* iOS 4.1- */
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
/*
 * Button styles for a skeleton block whose interactive element sits inside the BEM root:
 * \`kol-button\` renders \`<div class="kol-button"><button class="kol-button__button">\`, \`kol-link\`
 * renders \`<div class="kol-link"><a class="kol-link__anchor">\`. \`$interactive-element\` names that
 * inner element; \`null\` attaches the styles to the class carrier itself, for blocks whose DOM has
 * no inner interactive element.
 */
/*
 * Minimal box replication for trees that do not include \`kol-button-styles\` but render
 * \`kol-button-wc\` (transitional light-DOM output). Before the skeleton migration the button
 * element itself carried the \`kol-button\` class, so the \`kol-global\` reset
 * (\`background\`, \`width\`, \`margin\`, \`padding\`, \`border\`) and the a11y layer \`min-height\`/
 * \`min-width\` applied to it, on top of the UA \`inline-block\`. The wrapper div now carries the
 * class but receives none of that automatically, so this mixin replicates the exact outer box,
 * while the inner \`kol-button__button\` degrades to a plain block container to avoid the
 * inline-level baseline gap the UA \`inline-block\` would add below it.
 */
@layer kol-component {
  .kol-button {
    background-color: transparent;
    display: inline-block;
    width: 100%;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    margin: 0;
    padding: 0;
    /* User-agent stylesheets center button text; a \`div\` inherits instead, so the old
       inherited alignment (usually \`left\` from the a11y \`:host\` rule) has to be replicated
       explicitly for the inner content to sit at the same position as before. */
    text-align: center;
    /* Replicate the reset the real button received: width stays at the initial \`medium\`, only
       the style becomes \`none\`. Consumer rules that flip e.g. \`border-bottom-style\` back to
       \`solid\` (tabs) must therefore target the inner button (see the \`__button\` override
       below), because Firefox vertically centers button content inside the content box, which
       shrinks by the border — exactly as it did when the real button carried these rules. */
  }
  .kol-button__button {
    border-style: none;
    display: block;
    border-width: medium;
    /* The UA pins \`text-align: center\` and (in Firefox) \`font-weight: 400\` directly on every
       \`button\`, which would beat any alignment or font weight inherited through the wrapper
       (e.g. nav's \`text-align: left\`, or a bold active entry that used to apply to the button
       element itself). Inheriting restores the old flow. */
    font-style: inherit;
    font-weight: inherit;
    text-align: inherit;
  }
  .kol-button {
    /* See kol-button-styles: the tooltip wrapper must stay zero-height, also when the wrapper
       div is a flex or grid item (e.g. nav entry rows). */
  }
  .kol-button__tooltip {
    height: 0;
  }
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
    /* The interactive element is the flex container positioning the text, so it carries the
       box the root element used to be. The UA default underline sits on that element too,
       so suppressing \`text-decoration\` on the wrapper alone is not enough. */
  }
  .kol-alert .kol-button__button {
    display: flex;
    flex: 1;
    text-align: left;
    text-decoration-line: none;
    /* The zero-width baseline character has to sit on the flex container that positions
       the text — otherwise the text sits 1px off. */
  }
  .kol-alert .kol-button__button::before {
    content: "​";
  }
  .kol-alert .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-alert .kol-button {
    /* The tooltip wrapper holds only the absolutely positioned floating tooltip. In the legacy
       DOM it sat in a block flow and collapsed to zero height; as a flex/grid item it would
       stretch to the container height instead, adding phantom rows to the layout. */
  }
  .kol-alert .kol-button__tooltip {
    height: 0;
  }
  .kol-alert .kol-button--external-link > .kolicon-link-external::before {
    content: none;
  }
  .kol-alert .kol-button--external-link .kol-button__button > .kolicon-link-external::before {
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
  .kol-form-field .kol-popover-button--inline {
    /* The size exemption has to cover both the BEM root div and the inner interactive element:
       the a11y layer pins every \`button\` to 44×44, so the inner \`kol-button__button\` needs the
       override as well — the root alone used to be the button before the skeleton migration. */
  }
  .kol-form-field .kol-popover-button--inline .kol-button,
  .kol-form-field .kol-popover-button--inline .kol-button .kol-button__button {
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
  .kol-textarea {
    width: 100%;
  }
}`,L=e=>{e.style.overflow=`hidden`;let t=e.rows,n=e.clientHeight/t;e.rows=1;let r=Math.round(e.scrollHeight/n);return e.rows=t,r},R=class{async getValue(){return this.ctaRef.el?.value}async focus(e){}async click(){}getFormFieldProps(){return{state:this.state,class:l(`kol-form-field-textarea`,{"kol-form-field--has-value":this.state._hasValue,"kol-form-field--has-counter":this.controller.hasSoftCharacterLimit()||this.controller.hasCounter()}),tooltipAlign:this._tooltipAlign,alert:this.showAsAlert(),counterRefs:{visualRef:this.counterUpdater.setVisualRef,ariaRef:this.counterUpdater.setAriaRef},infoPopover:this._infoPopover}}getTextAreaProps(){let e=typeof this.state._maxLength==`number`&&!this.controller.hasCounter()?[o(this.state._id,`character-limit-hint`)]:void 0;return Object.assign(Object.assign({ref:this.ctaRef,state:this.state,style:{resize:this.state._resize},ariaDescribedBy:e},this.controller.onFacade),{onInput:this.onInput,onKeyDown:this.onKeyDown,onFocus:e=>{this.controller.onFacade.onFocus(e),this.inputHasFocus=!0,this.counterUpdater.retriggerAria(this._value?.length??0,this.state._maxLength,this.state._maxLengthBehavior??`hard`)},onBlur:e=>{this.controller.onFacade.onBlur(e),this.inputHasFocus=!1}})}render(){return r(_,Object.assign({key:`e171fba631919549058849814044bf389746a2ce`},this.getFormFieldProps()),r(y,{key:`7caac4084b41594c2f72425b02ea4c03b8d9e448`,state:this.state},r(P,Object.assign({key:`61fd072eaba7f89a468c3d9cc4fcadaf254ffd0d`},this.getTextAreaProps()))))}validateAriaDetails(e){this.controller.validateAriaDetails(e)}constructor(e){i(this,e),this.ctaRef=f(),this.counterUpdater=new E,this._adjustHeight=!1,this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._hasCounter=!1,this._maxLengthBehavior=`hard`,this._readOnly=!1,this._resize=`vertical`,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this.state={_adjustHeight:!1,_hasValue:!1,_hideMsg:!1,_id:a(`textarea`),_label:``,_resize:`vertical`},this.inputHasFocus=!1,this.onKeyDown=e=>{this.controller.onFacade.onKeyDown(e),this.counterUpdater.handleKeyDown(e,this.ctaRef.el?.value.length??0,this.state._maxLength,this.state._maxLengthBehavior??`hard`)},this.onInput=e=>{this.ctaRef.el instanceof HTMLTextAreaElement&&(this._value=this.ctaRef.el.value,this.state._adjustHeight&&(this._rows=L(this.ctaRef.el)),this.controller.onFacade.onInput(e))},this.controller=new F(this,`textarea`,this.host)}showAsAlert(){return!!this.state._touched&&!this.inputHasFocus}validateAccessKey(e){this.controller.validateAccessKey(e)}validateAdjustHeight(e){this.controller.validateAdjustHeight(e)}validateDisabled(e){this.controller.validateDisabled(e)}validateHideMsg(e){this.controller.validateHideMsg(e)}validateHideLabel(e){this.controller.validateHideLabel(e)}validateHasCounter(e){this.controller.validateHasCounter(e)}validateHint(e){this.controller.validateHint(e)}validateIcons(e){this.controller.validateIcons(e)}validateLabel(e){this.controller.validateLabel(e)}validateMaxLength(e){this.controller.validateMaxLength(e),this.counterUpdater.updateImmediate(this._value?.length??0,this.state._maxLength,this.state._maxLengthBehavior??`hard`)}validateMaxLengthBehavior(e){this.controller.validateMaxLengthBehavior(e)}validateMsg(e){this.controller.validateMsg(e)}validateName(e){this.controller.validateName(e)}validateOn(e){this.controller.validateOn(e)}validatePlaceholder(e){this.controller.validatePlaceholder(e)}validateReadOnly(e){this.controller.validateReadOnly(e)}validateResize(e){this.controller.validateResize(e)}validateRequired(e){this.controller.validateRequired(e)}validateRows(e){this.controller.validateRows(e)}validateShortKey(e){this.controller.validateShortKey(e)}validateSpellCheck(e){this.controller.validateSpellCheck(e)}validateSyncValueBySelector(e){this.controller.validateSyncValueBySelector(e)}validateTouched(e){this.controller.validateTouched(e)}validateValue(e){this.controller.validateValue(e),this.counterUpdater.update(e?.length??0,this.state._maxLength,this.state._maxLengthBehavior??`hard`)}validateVariant(e){this.controller.validateVariant(e)}componentDidLoad(){(this.controller.hasCounter()||this.controller.hasSoftCharacterLimit())&&this.counterUpdater.updateImmediate(this._value?.length??0,this.state._maxLength,this.state._maxLengthBehavior??`hard`),setTimeout(()=>{this._adjustHeight===!0&&this.ctaRef.el?this._rows=this.state?._rows&&this.state._rows>L(this.ctaRef.el)?this.state._rows:L(this.ctaRef.el):this._rows||=1})}disconnectedCallback(){this.counterUpdater.destroy()}componentWillLoad(){this.validateAriaDetails(this._ariaDetails),this._touched=this._touched===!0,this.controller.componentWillLoad(),this.state._hasValue=!!this.state._value,this.controller.addValueChangeListener(e=>this.state._hasValue=!!e)}get host(){return n(this)}static get watchers(){return{_ariaDetails:[`validateAriaDetails`],_accessKey:[`validateAccessKey`],_adjustHeight:[`validateAdjustHeight`],_disabled:[`validateDisabled`],_hideMsg:[`validateHideMsg`],_hideLabel:[`validateHideLabel`],_hasCounter:[`validateHasCounter`],_hint:[`validateHint`],_icons:[`validateIcons`],_label:[`validateLabel`],_maxLength:[`validateMaxLength`],_maxLengthBehavior:[`validateMaxLengthBehavior`],_msg:[`validateMsg`],_name:[`validateName`],_on:[`validateOn`],_placeholder:[`validatePlaceholder`],_readOnly:[`validateReadOnly`],_resize:[`validateResize`],_required:[`validateRequired`],_rows:[`validateRows`],_shortKey:[`validateShortKey`],_spellCheck:[`validateSpellCheck`],_syncValueBySelector:[`validateSyncValueBySelector`],_touched:[`validateTouched`],_value:[`validateValue`],_variant:[`validateVariant`]}}};c([d(`ctaRef`)],R.prototype,`focus`,null),c([u(`ctaRef`)],R.prototype,`click`,null),R.style={default:I};export{R as kol_textarea};