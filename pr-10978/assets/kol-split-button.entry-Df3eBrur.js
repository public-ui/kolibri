import{_ as e,c as t,o as n,s as r}from"./index-DcDxiC7I-BPkCYzNh.js";import{a as i,t as a}from"./behavior-Eatm8kmr-3UGsFE0Q.js";import{i as o,r as s,t as c}from"./index-C-YNlXPI.js";import{i as l,n as u}from"./dev.utils-BRNeztdD-Be5OhnhE.js";import{n as d,t as f}from"./base-web-component--IgFgz37-CZuvR3uB.js";import{t as p}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import"./variant-quote-CPA_pFWU-cQZcKc15.js";import{t as m}from"./disabled-BdkcA-WS-BNByrutE.js";import"./label-BDgaSpkn-ByJtGtyM.js";import"./label-CDp6ht3Z-B0Fq37zg.js";import{t as h}from"./clsx-COFh-Vc8-DWAop4cA.js";import{n as g,r as _,t as v}from"./element-interaction-DkGO5I_0-CYEJb_Yf.js";import"./block-bem-B2WJpaeb-rtMKDiOl.js";import"./component-CwO0zW8_-BfAq2ibN.js";import"./component-DNi43x13-CZbu_qWH.js";import{t as y}from"./i18n-s5q4We3h-BJrxsRSN.js";import{t as b}from"./component-Bol9zKnv-BzIsoKrr.js";import"./component-CxauMHaQ-C6ou-XWC.js";import"./component-nvIRawJq-DHN6Js6O.js";import{t as x}from"./component-DbEQyyOu-DKxcwCgL.js";import"./align-B29XBdiy-p5P03V7C.js";import{t as S}from"./label-with-expert-slot-LdmDsdfz-BWgzl-kV.js";import{n as C}from"./variant-DKbetdU1-D-TGsM35.js";import{a as w,c as T,d as E,f as D,l as O,o as k,r as A,s as j,t as M,u as N}from"./tooltip-align-Bcuc9zWQ-CeEds2lR.js";import{t as P}from"./name-C-7s_t57-BFwAeNbl.js";import{a as F,n as I,r as L,t as R}from"./api-0jMCoYap-CStjRMtG.js";import"./controller-BzYze_SO-sKdYsuOH.js";import"./aria-details-CaVxOiaf-C1GJAIB8.js";import"./associated.controller-DFAIT7Or-IVSz1I5S.js";import{t as z}from"./base-RCeclK3Y-Bdw8zIJ7.js";import{n as B,r as V,t as H}from"./controller-DgaV6bVa-CZs_vvRI.js";var U={required:[S],optional:[M,A,R,I,L,F,w,m,k,i,j,S,T,P,V,O,N,E,D,C]},W=t=>{let n=new B,r=new a(f.stateLess),i=v(),o,p=d(U);delete p.tabIndex;let h=e=>{m.apply(e,e=>{p.disabled=e})};h(t.disabled),k.apply(t.hideLabel,e=>{p.hideLabel=e}),N.apply(t.icons,e=>{p.icons=e}),j.apply(!1,e=>{p.inline=e}),D.apply(`top`,e=>{p.tooltipAlign=e}),F.apply(`button`,e=>{p.type=e}),S.apply(t.label,e=>{p.label=e}),V.apply(t.popoverAlign,e=>{p.popoverAlign=e,n.setAlign(e)}),C.apply(e(`buttonVariantDefault`,t.getFlagHost())??`normal`,e=>{p.variant=e}),p.ariaDescriptionId=l(),p.popoverId=u(`popover`);let g=e=>{let n=t.getEventTarget();n&&s(n,e)},_=e=>{t.setOpen(e.newState===`open`)};return p.handleClick=e=>{e.stopPropagation(),r.hideTooltip(),n.setShow(!t.getOpen()),g(c.click)},p.handleMouseDown=()=>g(c.mousedown),p.handleFocus=()=>g(c.focus),p.handleBlur=()=>g(c.blur),p.refButton=e=>{i(e),n.setTriggerElement(e)},p.refPopover=e=>{o=e,n.setPopoverElementRef(e)},p.refTooltip=r.setTooltipElementRef,r.componentWillLoad({label:p.label,align:p.tooltipAlign}),{getFcProps:()=>Object.assign(Object.assign({},p),{popoverOpen:t.getOpen()}),hide:()=>n.setShow(!1),setDisabled:h,syncListeners:()=>{i.el&&r.syncListeners(void 0,i.el,!0),o?.addEventListener(`toggle`,_)},destroy:()=>{r.destroy(),o&&=(o.removeEventListener(`toggle`,_),void 0),n.destroy()}}},G=o.forBlock(`kol-split-button`),K=G(`button`),q=G(`horizontal-line`),J=G(`root`),Y=G(`secondary-button`),X=e=>{let{buttonProps:t,buttonWrapperClass:n,class:i,dropdownProps:a,refDropdown:o}=e;return r(b,{block:`kol-split-button`,class:i},r(`div`,{class:J},r(`div`,{class:h(K,n)},r(x,Object.assign({},t))),r(`div`,{class:q}),r(`div`,{class:Y,ref:o},r(H,Object.assign({},a)))))},Z=`@charset "UTF-8";
/* forward the rem function */
/*
 * Guards an interaction rule (\`:hover\`, \`:active\`, \`:focus…\`) against the disabled state.
 *
 * Two shapes are needed because the disabled marker sits on different elements: a native control
 * carries \`disabled\`, an anchor or summary carries \`aria-disabled\`, and a BEM wrapper carries a
 * \`--disabled\` modifier while its inner control carries the attribute.
 */
/* Wrapper variant: asks the interactive element inside, which is where the attribute lives. */
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
    /*
     * Forced colors drop author colors, so the only way a disabled control still reads as
     * disabled is the \`GrayText\` system color. \`kol-button\` had it; the controls whose disabled
     * state is \`aria-disabled\` (anchor, summary) and the native form controls did not.
     */
    .kol-link__interactive-element[aria-disabled=true],
    .kol-accordion__heading[aria-disabled=true],
    .kol-details__heading[aria-disabled=true] {
      color: GrayText;
    }
    .kol-link__interactive-element[aria-disabled=true] .kol-icon,
    .kol-link__interactive-element[aria-disabled=true] .kol-span__label,
    .kol-accordion__heading[aria-disabled=true] .kol-icon,
    .kol-accordion__heading[aria-disabled=true] .kol-span__label,
    .kol-details__heading[aria-disabled=true] .kol-icon,
    .kol-details__heading[aria-disabled=true] .kol-span__label {
      color: GrayText;
    }
    input:disabled,
    select:disabled,
    textarea:disabled {
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
  src: url("kolicons.eot?t=1790401873185"); /* IE9*/
  src: url("kolicons.eot?t=1790401873185#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1790401873185") format("woff2"), url("kolicons.woff?t=1790401873185") format("woff"), url("kolicons.ttf?t=1790401873185") format("truetype"), url("kolicons.svg?t=1790401873185#kolicons") format("svg"); /* iOS 4.1- */
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
  .kolicon-pin-pinned::before {
    content: "\\ea15";
  }
  .kolicon-pin-unpinned::before {
    content: "\\ea16";
  }
  .kolicon-plus::before {
    content: "\\ea17";
  }
  .kolicon-settings::before {
    content: "\\ea18";
  }
  .kolicon-sort-asc::before {
    content: "\\ea19";
  }
  .kolicon-sort-desc::before {
    content: "\\ea1a";
  }
  .kolicon-sort-neutral::before {
    content: "\\ea1b";
  }
  .kolicon-up::before {
    content: "\\ea1c";
  }
  .kolicon-version::before {
    content: "\\ea1d";
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
}`,Q=class extends z{constructor(e){super(),t(this,e),this.setDropdownRef=e=>{this.dropdownElement=e},this.ariaDescriptionId=l(),this.dropdownOpen=!1,this._disabled=!1,this._hideLabel=!1,this._tooltipAlign=`top`,this._type=`button`,this._variant=`normal`,this.initFormAssociation()}componentWillLoad(){this.initButtonRenderProps(),this.watchAccessKey(this._accessKey),this.watchAriaControls(this._ariaControls),this.watchAriaDescription(this._ariaDescription),this.watchAriaExpanded(this._ariaExpanded),this.watchAriaSelected(this._ariaSelected),this.watchCustomClass(this._customClass),this.watchDisabled(this._disabled),this.watchHideLabel(this._hideLabel),this.watchIcons(this._icons),this.applyInline(!1),this.watchLabel(this._label),this.watchName(this._name),this.watchOn(this._on),this.watchShortKey(this._shortKey),this.watchSyncValueBySelector(this._syncValueBySelector),this.watchTooltipAlign(this._tooltipAlign),this.watchType(this._type),this.watchValue(this._value),this.watchVariant(this._variant),this.initTooltipBehavior(),this.dropdownItem=W({disabled:this._disabled,getEventTarget:()=>this.dropdownElement,getFlagHost:()=>this.host,getOpen:()=>this.dropdownOpen,hideLabel:!0,icons:`kolicon-chevron-down`,label:y(`kol-split-button-dropdown-label-open`),popoverAlign:`bottom`,setOpen:e=>{this.dropdownOpen=e}})}componentDidRender(){this.syncTooltipListeners(),this.dropdownItem.syncListeners()}disconnectedCallback(){this.destroyTooltipBehavior(),this.dropdownItem.destroy()}async getValue(){return this._value}async focus(e){}async click(){}async closePopup(){this.dropdownItem.hide()}getButtonWrapperClass(){return h({[this._variant]:this._variant!==`custom`,[this._customClass]:this._variant===`custom`&&typeof this._customClass==`string`&&this._customClass.length>0})}render(){return r(X,{key:`4c120e5b0716fd84e53b4fd6c4a4e9bedfa8271f`,buttonProps:this.getButtonFCProps(),buttonWrapperClass:this.getButtonWrapperClass(),dropdownProps:this.dropdownItem.getFcProps(),refDropdown:this.setDropdownRef})}watchAccessKey(e){this.applyAccessKey(e,this._shortKey)}watchAriaControls(e){this.applyAriaControls(e)}watchAriaDescription(e){this.applyAriaDescription(e)}watchAriaExpanded(e){this.applyAriaExpanded(e)}watchAriaSelected(e){this.applyAriaSelected(e)}watchCustomClass(e){this.applyCustomClass(e)}watchDisabled(e){var t;this.applyDisabled(e),(t=this.dropdownItem)==null||t.setDisabled(e)}watchHideLabel(e){this.applyHideLabel(e)}watchIcons(e){this.applyIcons(e)}watchLabel(e){this.applyLabel(e)}watchName(e){this.applyName(e)}watchOn(e){this.applyOn({onClick:e?.onClick})}watchRole(){}watchShortKey(e){this.applyShortKey(e,this._accessKey)}watchSyncValueBySelector(e){this.applySyncValueBySelector(e)}watchTooltipAlign(e){this.applyTooltipAlign(e)}watchType(e){this.applyType(e)}watchValue(e){this.applyValue(e)}watchVariant(e){this.applyVariant(e)}get host(){return n(this)}static get watchers(){return{_accessKey:[`watchAccessKey`],_ariaControls:[`watchAriaControls`],_ariaDescription:[`watchAriaDescription`],_ariaExpanded:[`watchAriaExpanded`],_ariaSelected:[`watchAriaSelected`],_customClass:[`watchCustomClass`],_disabled:[`watchDisabled`],_hideLabel:[`watchHideLabel`],_icons:[`watchIcons`],_label:[`watchLabel`],_name:[`watchName`],_on:[`watchOn`],_role:[`watchRole`],_shortKey:[`watchShortKey`],_syncValueBySelector:[`watchSyncValueBySelector`],_tooltipAlign:[`watchTooltipAlign`],_type:[`watchType`],_value:[`watchValue`],_variant:[`watchVariant`]}}};p([_(`ctaRef`)],Q.prototype,`focus`,null),p([g(`ctaRef`)],Q.prototype,`click`,null),Q.style={default:Z};export{Q as kol_split_button};