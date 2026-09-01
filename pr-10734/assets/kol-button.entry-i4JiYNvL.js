import{B as e,_t as t,a as n,c as r,l as i,o as a,r as o,s}from"./index-D9bXLENY.js";import{i as c}from"./dev.utils-1TYMcT8T-BTvJo9mQ.js";import{t as l}from"./base-web-component-D909Fl-Y-DjL1hhrh.js";import{t as u}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{n as d,r as f,t as p}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-Be8ufkLk-BzxtGwIS.js";import"./component-95J7pA5l-C0WjfBMF.js";import"./label-BvARLb-R-CfN-HVK6.js";import"./variant-quote-EmnyVV4C-DrQmlhlL.js";import"./component-CzNbQz3u-5XRV1v5Y.js";import"./align-DnuTHmUs-CTKFkR3w.js";import{a as m,c as h,d as g,f as _,h as v,i as y,l as b,m as x,n as S,o as C,r as w,s as T,u as E}from"./component-B3U5KOzB-DGL7tV8L.js";import"./align-floating-elements-WdG2GMuA-B2VtvWNl.js";import{t as D}from"./behavior-HUguuvWv-CPX1CVXM.js";import{t as O}from"./label-with-expert-slot-BVXtHf7D-DIkiNgEl.js";import{t as k}from"./name-g_bTNsxY-BA2BHuoj.js";import"./variant-class-name-n9fFvZD3-DvILHVMY.js";import"./component-8tyJZM6F-C-ZHDIgv.js";import{a as A,i as j,o as M,r as N,t as P}from"./component-DttKv7dB-Bp-0OzAy.js";import{t as F}from"./access-and-short-key-ijzCZfHm-Dx5Q-CAn.js";import{n as I,t as L}from"./controller-DLnIkWfr-CtZO5EaU.js";import"./aria-details-CJRXDn9Y-oc-v-h3x.js";import{t as R}from"./associated.controller-CLABhrQa-B1Nc7Ez7.js";var z=`@charset "UTF-8";
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
@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1788253385813"); /* IE9*/
  src: url("kolicons.eot?t=1788253385813#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1788253385813") format("woff2"), url("kolicons.woff?t=1788253385813") format("woff"), url("kolicons.ttf?t=1788253385813") format("truetype"), url("kolicons.svg?t=1788253385813#kolicons") format("svg"); /* iOS 4.1- */
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
    /* The interactive element is the flex container positioning the text, so it carries the
       box the root element used to be. The UA default underline sits on that element too,
       so suppressing \`text-decoration\` on the wrapper alone is not enough. */
  }
  .kol-button__button {
    display: flex;
    flex: 1;
    text-align: left;
    text-decoration-line: none;
    /* The zero-width baseline character has to sit on the flex container that positions
       the text — otherwise the text sits 1px off. */
  }
  .kol-button__button::before {
    content: "​";
  }
  .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-button {
    /* The tooltip wrapper holds only the absolutely positioned floating tooltip. In the legacy
       DOM it sat in a block flow and collapsed to zero height; as a flex/grid item it would
       stretch to the container height instead, adding phantom rows to the layout. */
  }
  .kol-button__tooltip {
    height: 0;
  }
  .kol-button--external-link > .kolicon-link-external::before {
    content: none;
  }
  .kol-button--external-link .kol-button__button > .kolicon-link-external::before {
    content: none;
  }
}`,B=class extends l{constructor(e){super(),s(this,e),this.ctaRef=p(),this.tooltipBehavior=new D(this.stateAccess),this.formAssociation={state:{}},this.handleClick=e=>{e.stopPropagation(),this.tooltipBehavior.hideTooltip();let n=this.getRenderProp(`type`);if(n===`submit`)I({form:this.host});else if(n===`reset`)L({form:this.host});else{this.associatedController.setFormAssociatedValue(this._value);let n=this.getRenderProp(`on`).onClick;typeof n==`function`&&(t(e,this.ctaRef.el),n(e,this._value))}this.host&&i(this.host,r.click,this._value)},this.handleMouseDown=e=>{var t,n;(n=(t=this.getRenderProp(`on`)).onMouseDown)==null||n.call(t,e),this.host&&i(this.host,r.mousedown)},this.handleFocus=e=>{var t,n;(n=(t=this.getRenderProp(`on`)).onFocus)==null||n.call(t,e),this.host&&i(this.host,r.focus)},this.handleBlur=e=>{var t,n;(n=(t=this.getRenderProp(`on`)).onBlur)==null||n.call(t,e),this.host&&i(this.host,r.blur)},this.ariaDescriptionId=c(),this._disabled=!1,this._hideLabel=!1,this._inline=!1,this._tooltipAlign=`top`,this._type=`button`,this.associatedController=new R(this.formAssociation,`button`,this.host)}componentWillLoad(){this.initRenderProps(A),this.setRenderProp(`tabIndex`,void 0),this.watchAccessKey(this._accessKey),this.watchAriaControls(this._ariaControls),this.watchAriaDescription(this._ariaDescription),this.watchAriaExpanded(this._ariaExpanded),this.watchAriaSelected(this._ariaSelected),this.watchCustomClass(this._customClass),this.watchDisabled(this._disabled),this.watchHideLabel(this._hideLabel),this.watchIcons(this._icons),this.watchInline(this._inline),this.watchLabel(this._label),this.watchName(this._name),this.watchOn(this._on),this.watchRole(this._role),this.watchShortKey(this._shortKey),this.watchSyncValueBySelector(this._syncValueBySelector),this.watchTooltipAlign(this._tooltipAlign),this.watchType(this._type),this.watchValue(this._value),this.watchVariant(this._variant),this.tooltipBehavior.componentWillLoad({label:this.getRenderProp(`label`),align:this.getRenderProp(`tooltipAlign`)})}componentDidRender(){this.ctaRef.el&&this.tooltipBehavior.syncListeners(void 0,this.ctaRef.el,!0)}disconnectedCallback(){this.tooltipBehavior.destroy()}async getValue(){return this._value}async focus(e){}async click(){}render(){return a(o,{key:`d929a063096abb36ecda15f26cb7f4298178e417`},a(P,{key:`4f230a4cc954104f3555feddcbadc088daa04942`,accessKey:this.getRenderProp(`accessKey`),ariaControls:this.getRenderProp(`ariaControls`),ariaDescription:this.getRenderProp(`ariaDescription`),ariaDescriptionId:this.ariaDescriptionId,ariaExpanded:this.getRenderProp(`ariaExpanded`),ariaHasPopup:this.getRenderProp(`ariaHasPopup`),ariaSelected:this.getRenderProp(`ariaSelected`),customClass:this.getRenderProp(`customClass`),disabled:this.getRenderProp(`disabled`),handleBlur:this.handleBlur,handleClick:this.handleClick,handleFocus:this.handleFocus,handleMouseDown:this.handleMouseDown,hideLabel:this.getRenderProp(`hideLabel`),icons:this.getRenderProp(`icons`),id:this.getRenderProp(`id`),inline:this.getRenderProp(`inline`),label:this.getRenderProp(`label`),name:this.getRenderProp(`name`),on:this.getRenderProp(`on`),refButton:this.ctaRef,refTooltip:this.tooltipBehavior.setTooltipElementRef,role:this.getRenderProp(`role`),shortKey:this.getRenderProp(`shortKey`),tabIndex:this.getRenderProp(`tabIndex`),tooltipAlign:this.getRenderProp(`tooltipAlign`),type:this.getRenderProp(`type`),variant:this.getRenderProp(`variant`)}))}watchAccessKey(e){S.apply(e,e=>this.setRenderProp(`accessKey`,e)),F(e,this._shortKey)}watchAriaControls(e){w.apply(e,e=>this.setRenderProp(`ariaControls`,e))}watchAriaDescription(e){y.apply(e,e=>this.setRenderProp(`ariaDescription`,e))}watchAriaExpanded(e){m.apply(e,e=>this.setRenderProp(`ariaExpanded`,e))}watchAriaSelected(e){N.apply(e,e=>this.setRenderProp(`ariaSelected`,e))}watchCustomClass(e){C.apply(e,e=>this.setRenderProp(`customClass`,e))}watchDisabled(e){T.apply(e,e=>this.setRenderProp(`disabled`,e))}watchHideLabel(e){h.apply(e,e=>this.setRenderProp(`hideLabel`,e))}watchIcons(e){_.apply(e,e=>this.setRenderProp(`icons`,e))}watchInline(e){b.apply(e,e=>this.setRenderProp(`inline`,e))}watchLabel(e){O.apply(e,e=>{this.setRenderProp(`label`,e),this.tooltipBehavior.watchLabel(e)})}watchName(e){k.apply(e,e=>this.setRenderProp(`name`,e)),this.formAssociation._name=e,this.associatedController.validateName(e)}watchOn(e){j.apply(e,e=>this.setRenderProp(`on`,e))}watchRole(e){E.apply(e,e=>this.setRenderProp(`role`,e))}watchShortKey(e){g.apply(e,e=>this.setRenderProp(`shortKey`,e)),F(this._accessKey,e)}watchSyncValueBySelector(e){this.formAssociation._syncValueBySelector=e,this.associatedController.validateSyncValueBySelector(e)}watchTooltipAlign(e){x.apply(e,e=>{this.setRenderProp(`tooltipAlign`,e),this.tooltipBehavior.watchAlign(e)})}watchType(e){M.apply(e,e=>this.setRenderProp(`type`,e))}watchValue(e){this.associatedController.setFormAssociatedValue(e)}watchVariant(t){v.apply(t??e(`buttonVariantDefault`,this.host)??`normal`,e=>this.setRenderProp(`variant`,e))}get host(){return n(this)}static get watchers(){return{_accessKey:[`watchAccessKey`],_ariaControls:[`watchAriaControls`],_ariaDescription:[`watchAriaDescription`],_ariaExpanded:[`watchAriaExpanded`],_ariaSelected:[`watchAriaSelected`],_customClass:[`watchCustomClass`],_disabled:[`watchDisabled`],_hideLabel:[`watchHideLabel`],_icons:[`watchIcons`],_inline:[`watchInline`],_label:[`watchLabel`],_name:[`watchName`],_on:[`watchOn`],_role:[`watchRole`],_shortKey:[`watchShortKey`],_syncValueBySelector:[`watchSyncValueBySelector`],_tooltipAlign:[`watchTooltipAlign`],_type:[`watchType`],_value:[`watchValue`],_variant:[`watchVariant`]}}};u([f(`ctaRef`)],B.prototype,`focus`,null),u([d(`ctaRef`)],B.prototype,`click`,null),B.style={default:z};export{B as kol_button};