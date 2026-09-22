import{B as e,a as t,c as n,d as r,o as i,s as a,u as o}from"./index-BWgWKiqA.js";import{i as s,n as c}from"./dev.utils-BLwpXbb2-CDBwQ9hR.js";import{n as l,t as u}from"./base-web-component--IgFgz37-CZuvR3uB.js";import{t as d}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as f}from"./clsx-COFh-Vc8-DWAop4cA.js";import"./label-C0rxk5dd-CGJWuuF1.js";import{n as p,r as m,t as h}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./_Uint8Array-CuELS0_2-BYXN1zbF.js";import"./normalizers-bmigMYOh-BCRGjhvr.js";import{t as g}from"./i18n-6Ww8y2f3-WGJaTuKE.js";import"./label-0amhC2jU-BvnE8oFD.js";import"./variant-quote-Ch1VGFiN-BxATUKuP.js";import{n as _}from"./component-DSERKzTV-BJhAYBsj.js";import"./variant-class-name-CJmwIdCX-D8lStYdw.js";import"./component-ASKmbxEX-NdtYPGEK.js";import"./component-B7DNhbVq-B-3koJG_.js";import{t as v}from"./component-BPFxbaa6-Chkoosx4.js";import"./align-66zR6LwD-CRntqgCS.js";import{i as y,t as b}from"./behavior-BAuOL8Z9-Ooz2wo5v.js";import{t as x}from"./label-with-expert-slot-vheHAMen-BtunBHcg.js";import{a as S,c as C,d as w,f as T,l as E,m as D,o as O,p as k,r as A,s as j,t as M,u as N}from"./variant-DIChpbq4-CZ35F0Sk.js";import{t as P}from"./name-C4xBDY63-Cm_4i0yg.js";import{a as F,n as I,r as L,t as R}from"./api-9-uP3TFJ-CSER3YhN.js";import"./controller-pH1qWcyw-zgorjf5B.js";import"./aria-details-BejeJE6g-CbGHruam.js";import"./associated.controller-B8Mhrwd2-DFKkn-LH.js";import{t as z}from"./base-B-klenaB-COLro35R.js";import{n as B,r as V,t as H}from"./controller-BXUpdggx-C0DeVobX.js";var U={required:[x],optional:[M,A,R,I,L,F,S,O,j,y,C,x,E,P,V,N,w,T,k,D]},W=t=>{let r=new B,i=new b(u.stateLess),a=h(),d,f=l(U);delete f.tabIndex;let p=e=>{O.apply(e,e=>{f.disabled=e})};p(t.disabled),j.apply(t.hideLabel,e=>{f.hideLabel=e}),w.apply(t.icons,e=>{f.icons=e}),C.apply(!1,e=>{f.inline=e}),k.apply(`top`,e=>{f.tooltipAlign=e}),F.apply(`button`,e=>{f.type=e}),x.apply(t.label,e=>{f.label=e}),V.apply(t.popoverAlign,e=>{f.popoverAlign=e,r.setAlign(e)}),D.apply(e(`buttonVariantDefault`,t.getFlagHost())??`normal`,e=>{f.variant=e}),f.ariaDescriptionId=s(),f.popoverId=c(`popover`);let m=e=>{let n=t.getEventTarget();n&&o(n,e)},g=e=>{t.setOpen(e.newState===`open`)};return f.handleClick=e=>{e.stopPropagation(),i.hideTooltip(),r.setShow(!t.getOpen()),m(n.click)},f.handleMouseDown=()=>m(n.mousedown),f.handleFocus=()=>m(n.focus),f.handleBlur=()=>m(n.blur),f.refButton=e=>{a(e),r.setTriggerElement(e)},f.refPopover=e=>{d=e,r.setPopoverElementRef(e)},f.refTooltip=i.setTooltipElementRef,i.componentWillLoad({label:f.label,align:f.tooltipAlign}),{getFcProps:()=>Object.assign(Object.assign({},f),{popoverOpen:t.getOpen()}),hide:()=>r.setShow(!1),setDisabled:p,syncListeners:()=>{a.el&&i.syncListeners(void 0,a.el,!0),d?.addEventListener(`toggle`,g)},destroy:()=>{i.destroy(),d&&=(d.removeEventListener(`toggle`,g),void 0),r.destroy()}}},G=r.forBlock(`kol-split-button`),K=G(`button`),q=G(`horizontal-line`),J=G(`root`),Y=G(`secondary-button`),X=e=>{let{buttonProps:t,buttonWrapperClass:n,class:r,dropdownProps:a,refDropdown:o}=e;return i(_,{block:`kol-split-button`,class:r},i(`div`,{class:J},i(`div`,{class:f(K,n)},i(v,Object.assign({},t))),i(`div`,{class:q}),i(`div`,{class:Y,ref:o},i(H,Object.assign({},a)))))},Z=`@charset "UTF-8";
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
* 6. kol-forced-colors - Defaults for forced colors and high contrast modes
* 7. kol-theme-forced-colors - Theme-specific styles for forced colors and high contrast modes
*/
@layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;
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
/*
 * This file contains all rules for forced-colors and highcontrast modes
 * https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/system-color to see all color keywords the browsers are providing
 */
@layer kol-forced-colors {
  @media (forced-colors: active) {
    .kol-button__text {
      color: ButtonText;
      background-color: ButtonFace;
      border: 2px solid ButtonBorder;
    }
    .kol-button--disabled .kol-button__text {
      color: GrayText;
      border-color: GrayText;
    }
    .kol-card,
    .kol-dialog,
    .kol-modal,
    .kol-drawer {
      color: CanvasText;
      background-color: Canvas;
      border: 1px solid ButtonBorder;
    }
    .kol-pagination__button--selected .kol-button {
      opacity: 1;
    }
    .kol-pagination__button--selected .kol-button__text {
      color: SelectedItemText;
      background-color: SelectedItem;
    }
    /* focus styles */
    .kol-button__interactive-element:focus-visible,
    .kol-link__interactive-element:focus-visible {
      outline: 2px solid Highlight;
      outline-offset: 2px;
    }
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
  src: url("kolicons.eot?t=1790067982438"); /* IE9*/
  src: url("kolicons.eot?t=1790067982438#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1790067982438") format("woff2"), url("kolicons.woff?t=1790067982438") format("woff"), url("kolicons.ttf?t=1790067982438") format("truetype"), url("kolicons.svg?t=1790067982438#kolicons") format("svg"); /* iOS 4.1- */
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
 * \`kol-button\` renders \`<div class="kol-button"><button class="kol-button__interactive-element">\`,
 * \`kol-link\` renders \`<div class="kol-link"><a class="kol-link__interactive-element">\`.
 *
 * Overlaps with \`kol-button-wc-box-styles\` below: both target the block class itself and disagree
 * on \`display\` and \`text-align\`. A stylesheet that includes both therefore depends on order or
 * specificity — today that only happens where the caller nests one of them (e.g. \`_alert.mixin\`
 * nests this one under \`.kol-alert\`, which wins). Include only one per block unless the nesting
 * makes the winner explicit.
 */
/*
 * Minimal box replication for trees that do not include \`kol-button-styles\` but render
 * \`kol-button-wc\` (transitional light-DOM output). Before the skeleton migration the button
 * element itself carried the \`kol-button\` class, so the \`kol-global\` reset
 * (\`background\`, \`width\`, \`margin\`, \`padding\`, \`border\`) and the a11y layer \`min-height\`/
 * \`min-width\` applied to it, on top of the UA \`inline-block\`. The wrapper div now carries the
 * class but receives none of that automatically, so this mixin replicates the exact outer box,
 * while the inner \`kol-button__interactive-element\` degrades to a plain block container to avoid
 * the inline-level baseline gap the UA \`inline-block\` would add below it.
 *
 * Mutually exclusive with \`kol-button-styles\` above — see the collision note there.
 */
@layer kol-component {
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-button {
    background-color: transparent;
    display: inline-block;
    width: 100%;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    margin: 0;
    padding: 0;
    /* The user-agent stylesheet centers text on \`button\`, but not on \`div\`. The wrapper now
       carries the class, so that UA default has to be restated here for the inner content to
       sit where it did when the button element itself was the class carrier. */
    text-align: center;
    /* Replicate the reset the real button received: width stays at the initial \`medium\`, only
       the style becomes \`none\`. Consumer rules that flip e.g. \`border-bottom-style\` back to
       \`solid\` (tabs) must therefore target the inner button (see the \`__interactive-element\`
       override below), because Firefox vertically centers button content inside the content box,
       which shrinks by the border — exactly as it did when the real button carried these rules. */
  }
  .kol-button__interactive-element {
    border-style: none;
    display: block;
    border-width: medium;
    /* The UA pins \`text-align: center\` and (in Firefox) \`font-weight: 400\` directly on every
       \`button\`, which would beat any alignment or font styling inherited through the wrapper
       (e.g. nav's \`text-align: left\`, or a bold active entry that used to apply to the button
       element itself). Inheriting all three restores the old flow. */
    font-weight: inherit;
    font-style: inherit;
    text-align: inherit;
  }
  .kol-button {
    /* See kol-button-styles: the tooltip wrapper must stay zero-height, also when the wrapper
       div is a flex or grid item (e.g. nav entry rows). */
  }
  .kol-button__tooltip {
    height: 0;
  }
  .kol-popover-button {
    /*
     * The predecessor rendered this box as an unstyled (inline) custom element host; keep the
     * inline display so the flow layout around the embedded button stays unchanged.
     */
    display: inline;
  }
  .kol-popover-button__popover {
    margin: 0;
    padding: 0;
    border: 0;
  }
  .kol-popover-button--open .kol-button__tooltip {
    display: none;
  }
  .kol-popover-button--inline {
    display: inline-block;
    /* The size exemption has to cover both the BEM root div and the inner interactive element:
       the a11y layer pins every \`button\` to 44×44, so the inner \`kol-button__interactive-element\`
       needs the override as well — the root alone used to be the button before the skeleton migration. */
  }
  .kol-popover-button--inline .kol-button,
  .kol-popover-button--inline .kol-button .kol-button__interactive-element {
    min-width: 0;
    min-height: 1em;
  }
  .kol-popover {
    opacity: 0;
    transition: 0.2s ease-out opacity;
  }
  .kol-popover-button--open .kol-popover-button__popover {
    opacity: 1;
  }
  .kol-split-button {
    display: flex;
    position: relative;
    width: 100%;
  }
  .kol-split-button__root {
    display: flex;
    position: relative;
    width: 100%;
    align-items: stretch;
  }
  .kol-split-button__button {
    min-width: 0;
    flex: 1 1 auto;
    text-align: left;
  }
}`,Q=class extends z{constructor(e){super(),a(this,e),this.setDropdownRef=e=>{this.dropdownElement=e},this.ariaDescriptionId=s(),this.dropdownOpen=!1,this._disabled=!1,this._hideLabel=!1,this._tooltipAlign=`top`,this._type=`button`,this._variant=`normal`,this.initFormAssociation()}componentWillLoad(){this.initButtonRenderProps(),this.watchAccessKey(this._accessKey),this.watchAriaControls(this._ariaControls),this.watchAriaDescription(this._ariaDescription),this.watchAriaExpanded(this._ariaExpanded),this.watchAriaSelected(this._ariaSelected),this.watchCustomClass(this._customClass),this.watchDisabled(this._disabled),this.watchHideLabel(this._hideLabel),this.watchIcons(this._icons),this.applyInline(!1),this.watchLabel(this._label),this.watchName(this._name),this.watchOn(this._on),this.watchShortKey(this._shortKey),this.watchSyncValueBySelector(this._syncValueBySelector),this.watchTooltipAlign(this._tooltipAlign),this.watchType(this._type),this.watchValue(this._value),this.watchVariant(this._variant),this.initTooltipBehavior(),this.dropdownItem=W({disabled:this._disabled,getEventTarget:()=>this.dropdownElement,getFlagHost:()=>this.host,getOpen:()=>this.dropdownOpen,hideLabel:!0,icons:`kolicon-chevron-down`,label:g(`kol-split-button-dropdown-label-open`),popoverAlign:`bottom`,setOpen:e=>{this.dropdownOpen=e}})}componentDidRender(){this.syncTooltipListeners(),this.dropdownItem.syncListeners()}disconnectedCallback(){this.destroyTooltipBehavior(),this.dropdownItem.destroy()}async getValue(){return this._value}async focus(e){}async click(){}async closePopup(){this.dropdownItem.hide()}getButtonWrapperClass(){return f({[this._variant]:this._variant!==`custom`,[this._customClass]:this._variant===`custom`&&typeof this._customClass==`string`&&this._customClass.length>0})}render(){return i(X,{key:`998de8fe27ee637c39e6a886c6e594879d3afc23`,buttonProps:this.getButtonFCProps(),buttonWrapperClass:this.getButtonWrapperClass(),dropdownProps:this.dropdownItem.getFcProps(),refDropdown:this.setDropdownRef})}watchAccessKey(e){this.applyAccessKey(e,this._shortKey)}watchAriaControls(e){this.applyAriaControls(e)}watchAriaDescription(e){this.applyAriaDescription(e)}watchAriaExpanded(e){this.applyAriaExpanded(e)}watchAriaSelected(e){this.applyAriaSelected(e)}watchCustomClass(e){this.applyCustomClass(e)}watchDisabled(e){var t;this.applyDisabled(e),(t=this.dropdownItem)==null||t.setDisabled(e)}watchHideLabel(e){this.applyHideLabel(e)}watchIcons(e){this.applyIcons(e)}watchLabel(e){this.applyLabel(e)}watchName(e){this.applyName(e)}watchOn(e){this.applyOn({onClick:e?.onClick})}watchRole(){}watchShortKey(e){this.applyShortKey(e,this._accessKey)}watchSyncValueBySelector(e){this.applySyncValueBySelector(e)}watchTooltipAlign(e){this.applyTooltipAlign(e)}watchType(e){this.applyType(e)}watchValue(e){this.applyValue(e)}watchVariant(e){this.applyVariant(e)}get host(){return t(this)}static get watchers(){return{_accessKey:[`watchAccessKey`],_ariaControls:[`watchAriaControls`],_ariaDescription:[`watchAriaDescription`],_ariaExpanded:[`watchAriaExpanded`],_ariaSelected:[`watchAriaSelected`],_customClass:[`watchCustomClass`],_disabled:[`watchDisabled`],_hideLabel:[`watchHideLabel`],_icons:[`watchIcons`],_label:[`watchLabel`],_name:[`watchName`],_on:[`watchOn`],_role:[`watchRole`],_shortKey:[`watchShortKey`],_syncValueBySelector:[`watchSyncValueBySelector`],_tooltipAlign:[`watchTooltipAlign`],_type:[`watchType`],_value:[`watchValue`],_variant:[`watchVariant`]}}};d([m(`ctaRef`)],Q.prototype,`focus`,null),d([p(`ctaRef`)],Q.prototype,`click`,null),Q.style={default:Z};export{Q as kol_split_button};