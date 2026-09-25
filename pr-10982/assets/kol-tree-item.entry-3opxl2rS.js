import{c as e,o as t,r as n,s as r}from"./index-DcDxiC7I-Bt0i3Efs.js";import{T as i,i as a,r as o,t as s,w as c}from"./index-DJ7TLJxw.js";import{n as l}from"./dev.utils-BRNeztdD-D1ia9hJK.js";import{n as u,t as d}from"./base-web-component--IgFgz37-CZuvR3uB.js";import{t as f}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import"./_Uint8Array-CuELS0_2-BYXN1zbF.js";import{r as p,s as m}from"./variant-quote-DeZzWGZI-C89TqCgK.js";import"./disabled-DPo78Oje-Duw1JgbI.js";import{t as h}from"./open-7VzvTKQV-DsjFn2l0.js";import{a as g,t as _}from"./element-interaction-DkGO5I_0-CYEJb_Yf.js";import"./block-bem-UDOF3rAN-MjEBwJp0.js";import{t as v}from"./component-Bh3trbTp-DkccEbfC.js";import"./component-zqA_GCVc-Cd6rXSY8.js";import"./i18n-s5q4We3h-quwkw6o5.js";import"./component-D2A6cZw8-C4ZAljNR.js";import"./variant-class-name-D1gM1t9T-C4T_E9HM.js";import"./component-JTlUjHZD-YGLcmXVy.js";import"./align-B29XBdiy-Rt_s9o6G.js";import{t as y}from"./label-with-expert-slot-DQT5alA4-C_rNdhPk.js";import"./variant-Bd451cbV-2KRa4ncb.js";import{t as b}from"./href-D5Num3co-CrZzjnpV.js";import"./link-target-CRLfzp48-BELYSvX6.js";import{n as x,o as S,t as C}from"./api-BzHujZS4-DC7N8OKl.js";import{t as w}from"./open-items-cache-D-kml1h6-Ce94d8eX.js";var T=p(`active`,!1,m),E={required:[b,y],optional:[T]},D=a.forBlock(`kol-tree-item`),O=D(),k=D(`children`),A=D(`link-inner`),j=D(`text`),M=D(`toggle-button`),N=D(`toggle-button-icon`),P=D(`toggle-button-placeholder`),F=Object.freeze(u(S)),I=()=>void 0,L=({active:e,ariaCurrent:t,groupId:n,handleAnchorClick:i,handleSlotchange:a,handleToggleClick:o,hasChildren:s,href:c,label:l,level:u,open:d,refAnchor:f})=>r(`li`,{class:O,style:{"--level":`${u}`}},r(`span`,{class:D(`link`,{active:e,"first-level":u===0})},r(C,Object.assign({},F,{ariaCurrent:t,ariaDescriptionId:``,ariaExpanded:s?d?`true`:`false`:``,ariaOwns:s?n:``,expertSlot:!0,handleAnchorClick:i,href:c,label:``,refAnchor:f,refTooltip:I,role:`treeitem`,tabIndex:e?0:-1}),r(`span`,{class:A},s?r(`span`,{class:M,onClick:o},r(v,{class:N,icons:`kolicon kolicon-${d?`chevron-down`:`chevron-right`}`,label:``})):r(`span`,{class:P}),r(`span`,{class:j},l)))),r(`ul`,{class:k,hidden:!s||!d,role:`group`,id:n},r(`slot`,{onSlotchange:a}))),R=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1790295874330"); /* IE9*/
  src: url("kolicons.eot?t=1790295874330#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1790295874330") format("woff2"), url("kolicons.woff?t=1790295874330") format("woff"), url("kolicons.ttf?t=1790295874330") format("truetype"), url("kolicons.svg?t=1790295874330#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-tree-item__link .kol-link {
    display: inline-flex;
    width: 100%;
    min-height: var(--a11y-min-size);
    align-items: center;
    text-decoration: none;
    /* The interactive element inside the link skeleton carries the UA default underline
       itself and replaces the former full-width anchor, so it has to fill the wrapper. */
  }
  .kol-tree-item__link .kol-link__interactive-element {
    flex: 1 1 auto;
    text-decoration: none;
  }
  .kol-tree-item__link-inner {
    display: flex;
    align-items: center;
  }
  .kol-tree-item__children {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .kol-tree-item .kol-span {
    place-items: unset;
  }
  .kol-tree-item__toggle-button, .kol-tree-item__toggle-button-placeholder {
    display: inline-flex;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: center;
    justify-content: center;
  }
  .kol-tree-item__text {
    text-decoration: underline;
  }
}`,z=class extends d{constructor(t){super(),e(this,t),this.anchorRef=_(),this.ariaCurrent=``,this.groupId=l(`tree-group`),this.hasChildren=!1,this.level=0,this.open=!1,this.handleAnchorClick=()=>{this.host&&o(this.host,s.click,this.getRenderProp(`href`))},this.handleSlotchange=()=>{this.checkForChildren()},this.handleToggleClick=e=>{e.preventDefault();let t=this.open;this.focus().then(()=>this.setOpen(!t))}}componentWillLoad(){this.initRenderProps(E),this.watchActive(this._active),this.watchHref(this._href),this.watchLabel(this._label),this.watchOpen(this._open),this.checkForChildren(),this.determineTreeItemDepth(),this.unsubscribeOnLocationChange=i(e=>{let t=e===this.getRenderProp(`href`)?x.getDefaultValue():``;this.ariaCurrent!==t&&(this.ariaCurrent=t)})}disconnectedCallback(){this.unsubscribeOnLocationChange&&=(this.unsubscribeOnLocationChange(),void 0)}determineTreeItemDepth(){let e=0,t=this.host?.parentElement??null;for(;t!==null&&t.tagName.toLowerCase()!==c&&t!==document.body;)t=t.parentElement,e+=1;this.level=e}checkForChildren(){this.hasChildren=Array.from(this.host?.children??[]).some(e=>!e.slot)}getTree(){let e=this.host;for(;e;){let t=e.closest(c);if(t)return t;let n=e.getRootNode()?.host;if(!n||n===document.body)break;e=n}}setOpen(e){this.hasChildren&&(this.open=e,w(this.getTree()))}async focus(e){}async expand(){this.setOpen(!0)}async collapse(){this.setOpen(!1)}async isOpen(){return this.open}render(){return r(n,{key:`7afaecfd8e1046e393b06d7e23013f0213b55fd1`},r(L,{key:`a19832438b78cee7eb5be105eb266de7b92d2647`,active:this.getRenderProp(`active`),ariaCurrent:this.ariaCurrent,groupId:this.groupId,handleAnchorClick:this.handleAnchorClick,handleSlotchange:this.handleSlotchange,handleToggleClick:this.handleToggleClick,hasChildren:this.hasChildren,href:this.getRenderProp(`href`),label:this.getRenderProp(`label`),level:this.level,open:this.open,refAnchor:this.anchorRef}))}watchActive(e){T.apply(e,e=>this.setRenderProp(`active`,e))}watchLabel(e){y.apply(e,e=>this.setRenderProp(`label`,e))}watchOpen(e){h.apply(e,e=>this.open=e)}watchHref(e){b.apply(e,e=>this.setRenderProp(`href`,e))}get host(){return t(this)}static get watchers(){return{_active:[`watchActive`],_label:[`watchLabel`],_open:[`watchOpen`],_href:[`watchHref`]}}};f([g(`anchorRef`)],z.prototype,`focus`,null),z.style={default:R};export{z as kol_tree_item};