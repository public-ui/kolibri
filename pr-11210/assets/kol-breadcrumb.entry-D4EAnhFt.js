import{Y as e,b as t,c as n,l as r,n as i,r as a,s as o,v as s}from"./index-D4B7blr0-DMwgMDwu.js";import{n as c}from"./behavior-4FQng58t-2MBlVymK.js";import{g as l,i as u,r as d,t as f}from"./index-CnngGGkA.js";import{i as p}from"./dev.utils-CIxbic-4-CpuuOlZG.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import{n as m,t as h}from"./base-web-component-3R1Dy3QK-D8F0kRol.js";import{r as g}from"./label-CQhGu8Ty-CiLU2Lih.js";import"./block-bem-DxQXsOt3-0f8B81Su.js";import"./component-C0i1NzJH-DUu7maxg.js";import{t as ee}from"./disabled-CdyeAMlW-BXxooNiv.js";import{t as _}from"./element-interaction-Cy9tx3Sx-BTUWCd5A.js";import{t as v}from"./component-BBCQuSzA-COifUvP5.js";import"./component-D5ypRj5K-Y-bV4Hgg.js";import"./i18n-BaCf-SDK-CH8CHorR.js";import"./component-hbwUQuQQ-BuFD-rN3.js";import"./component-CpDRsOko-_uAr0if7.js";import"./align-Db_C34LM-BPjf08B7.js";import{d as y,f as b,l as x,n as S,o as C,r as w,s as T,t as E,u as D}from"./variant-BWyDw1_q-Bz0_ht-n.js";import{t as O}from"./links-Cn5VAgwV-B-eUXNi2.js";import{t as k}from"./href-DOi-fZMu-CT7jvvdM.js";import{t as A}from"./link-target-B7A-qwaP-bjF2_TTm.js";import{a as j,i as M,n as te,o as N,t as P}from"./api-BNTshfbE-BmWSt5s1.js";import{t as F}from"./access-and-short-key-ijzCZfHm-Dx5Q-CAn.js";import{n as I,t as L}from"./unique-nav-labels-DugFb3rS-C1naE9iM.js";var R=O(`KolBreadcrumb`),z={required:[R,g]},B=u.forBlock(`kol-breadcrumb`),V=B(),H=B(`icon`),U=B(`link`),W=B(`list`),G=B(`list-element`),K=B(`list-element-span`),q=B(`separator`),J=`kol-breadcrumb_icon`,Y=(e,t,r,a)=>{let o=a?t!==r:t<r-1;if(t===r&&!a)return n(i,null);let{link:s}=e;return n(`li`,{class:G,key:t},t===r?n(`span`,{class:K,"aria-current":`page`},s._hideLabel?n(v,{class:H,icons:typeof s._icons==`string`?s._icons:`kolicon-link`,label:s._label}):n(i,null,s._label)):n(`div`,{class:U},n(P,Object.assign({},e.fcProps))),o&&n(v,{class:q,icons:`kolicon-chevron-right`,label:``}))},X=({label:e,linkItems:t,showCurrentPage:r})=>{let i=t.length-1;return n(`nav`,{class:V,"aria-label":e},n(`ul`,{class:W},t.length===0&&n(`li`,null,n(v,{class:J,icons:`kolicon-house`,label:``}),`…`),t.map((e,t)=>Y(e,t,i,r))))},Z=(t,n)=>{let r=new c(h.stateLess),i=_(),a=m(N);delete a.tabIndex;let o=(e,t)=>e.apply(t,t=>{a[e.propName]=t});o(E,t._accessKey),o(S,t._ariaControls),o(te,t._ariaCurrentValue),o(w,t._ariaDescription),o(ee,t._disabled),o(M,t._download),o(C,t._hideLabel),o(k,t._href),o(D,t._icons),o(T,t._inline??!1),o(g,t._label),o(j,t._on),o(x,t._shortKey),typeof t._tabIndex==`number`&&o(y,t._tabIndex),o(A,t._target),o(b,t._tooltipAlign),F(t._accessKey,t._shortKey),r.componentWillLoad({label:(()=>{let e=a.label;if(typeof e==`string`&&e.length>0)return e;let t=a.href;return typeof t==`string`?t:``})(),align:a.tooltipAlign}),a.ariaCurrent=``,a.ariaDescriptionId=p(),a.expertSlot=t._label===``;let s=()=>typeof a.href==`string`?a.href:``;return a.handleAnchorClick=t=>{if(r.hideTooltip(),a.disabled===!0){t.preventDefault();return}let o=s(),c=a.on;typeof c?.onClick==`function`&&(e(t,i.el),c.onClick(t,o));let l=n();l&&d(l,f.click,o)},a.refAnchor=e=>{i(e)},a.refTooltip=r.setTooltipElementRef,{link:t,fcProps:a,syncTooltipListeners:()=>{i.el&&r.syncListeners(void 0,i.el,!0)},destroy:()=>{r.destroy()}}},Q=`@charset "UTF-8";
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
    .kol-modal {
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
  src: url("kolicons.eot?t=1791280089659"); /* IE9*/
  src: url("kolicons.eot?t=1791280089659#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1791280089659") format("woff2"), url("kolicons.woff?t=1791280089659") format("woff"), url("kolicons.ttf?t=1791280089659") format("truetype"), url("kolicons.svg?t=1791280089659#kolicons") format("svg"); /* iOS 4.1- */
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
 * Link styles for a skeleton block whose interactive element sits inside the BEM root:
 * \`kol-link\` renders \`<div class="kol-link"><a class="kol-link__interactive-element">\`,
 * \`kol-button\` renders \`<div class="kol-button"><button class="kol-button__interactive-element">\`.
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
  .kol-link {
    display: inline-flex;
    max-width: fit-content;
  }
  .kol-link--standalone {
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: stretch;
    /* The interactive element is the flex container positioning the text — it must
       stretch its content so the text pill keeps the full standalone height. */
  }
  .kol-link--standalone .kol-link__interactive-element {
    align-items: stretch;
  }
  .kol-link--standalone .kol-link__text {
    display: inline-flex;
    flex: 1 1 100%;
    place-items: center;
  }
  .kol-link__interactive-element {
    display: inline-flex;
    flex: 1;
    align-items: baseline;
    place-items: center;
    text-align: left;
    text-decoration-line: none;
  }
  .kol-link__interactive-element:focus:not([aria-disabled], [disabled]) .kol-span__label, .kol-link__interactive-element:hover:not([aria-disabled], [disabled]) .kol-span__label {
    text-decoration-thickness: 0.2em;
  }
  .kol-link .kol-span__label {
    text-decoration-line: underline;
  }
  .kol-link__icon {
    display: inline-flex;
  }
  .kol-breadcrumb__list, .kol-breadcrumb__list-element {
    display: flex;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
    place-items: center;
    list-style: none;
  }
  .kol-breadcrumb__list-element:first-child:last-child {
    min-height: var(--a11y-min-size);
  }
}`,$=class extends h{constructor(e){super(),r(this,e),this.linkItems=[],this.showCurrentPage=!0}watchLabel(e){this.applyLabel(e)}watchLinks(e){this.applyLinks(e)}componentWillLoad(){this.initRenderProps(z),this.applyLabel(this._label,!0),this.applyLinks(this._links),this.unsubscribeOnLocationChange=l(e=>{this.linkItems=this.linkItems.map(t=>{let n=e===t.fcProps.href?t.fcProps.ariaCurrentValue:``;return t.fcProps.ariaCurrent===n?t:Object.assign(Object.assign({},t),{fcProps:Object.assign(Object.assign({},t.fcProps),{ariaCurrent:n})})})})}componentDidRender(){this.linkItems.forEach(e=>e.syncTooltipListeners())}disconnectedCallback(){this.unsubscribeOnLocationChange&&=(this.unsubscribeOnLocationChange(),void 0),this.linkItems.forEach(e=>e.destroy()),I(this.getRenderProp(`label`))}applyLabel(e,n=!1){n||I(this.getRenderProp(`label`)),g.apply(e,e=>this.setRenderProp(`label`,e)),t(e),L(this.getRenderProp(`label`))}applyLinks(e){R.apply(e,e=>{this.setRenderProp(`links`,e),this.linkItems.forEach(e=>e.destroy()),this.linkItems=e.map(e=>Z(e,()=>this.host))})}render(){return this.showCurrentPage=s(`breadcrumbCurrentPage`,this.host)!==`hide`,n(a,{key:`cfd1025fa9da77c431f77c4d3456ae9b84a77fcd`},n(X,{key:`494fb3c65253ddd070299a336abd0f8150344530`,label:this.getRenderProp(`label`),links:this.getRenderProp(`links`),linkItems:this.linkItems,showCurrentPage:this.showCurrentPage}))}get host(){return o(this)}static get watchers(){return{_label:[`watchLabel`],_links:[`watchLinks`]}}};$.style={default:Q};export{$ as kol_breadcrumb};