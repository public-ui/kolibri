import{J as e,a as t,bt as n,dt as r,n as i,o as a,pt as o,s}from"./index-BlBPbof5.js";import"./normalizers-DQHMHf5k-DiypBPae.js";import"./label-DoKA2G5H--vvpcRS3.js";import"./base-controller-CasHQmZc-wERigD3B.js";import{t as c}from"./base-web-component-BT6jbe_v-Vp21XLG3.js";import{n as l}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import"./clsx-COFh-Vc8-alQuJLqj.js";import"./component-DgHpRLqh-C-J7q_tY.js";import"./align-BAw_Pz6R-DiOBbmDw.js";import"./controller-Cq7rOj58-BnF60kT4.js";import"./component-B2JV-0-F-DpiLo-kv.js";import"./label-with-expert-slot-B4CxtEy6-W8hd1aH9.js";import"./name-DecN4dTq-C7RIBh6J.js";import{i as u,t as d}from"./controller-BuYOBsT2-BKK2kTO3.js";import{n as f}from"./render-rkLHkzsx-DZ0ndMbZ.js";import{r as p}from"./label-CqR1CDui-Cso5z4hK.js";import{n as m,t as h}from"./element-focus-Cp994Rrk-BCxGGpIg.js";import{n as g,t as _}from"./element-click-CCljCb-a-Bw1_18r4.js";import"./i18n-Bk8ltJJF-AygzQkXh.js";import"./access-and-short-key-ijzCZfHm-Dx5Q-CAn.js";import"./href-Dvz7ELmC-o6TfyyWi.js";import{a as v,i as y,n as b,r as x}from"./controller-BjkEYI4h-hQMECDGB.js";import{t as S}from"./orientation-KCBDZC2f-BWFjSnKZ.js";import{n as C}from"./keyboard-DNd73LVa-BCj4IeP3.js";var w=(t,i)=>{e(i,()=>{r(i,()=>{i===void 0&&(i=[]);try{i=o(i)}catch{}Array.isArray(i)&&i.every(e=>typeof e==`object`&&!!e)&&n(t,`_items`,i)})})},T=`@charset "UTF-8";
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
     */
    --a11y-min-size: calc(44 * 1rem / var(--kolibri-root-font-size, 16));
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
  a,
  button {
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
  src: url("kolicons.eot?t=1782188100458"); /* IE9*/
  src: url("kolicons.eot?t=1782188100458#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1782188100458") format("woff2"), url("kolicons.woff?t=1782188100458") format("woff"), url("kolicons.ttf?t=1782188100458") format("truetype"), url("kolicons.svg?t=1782188100458#kolicons") format("svg"); /* iOS 4.1- */
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
    display: flex;
    min-height: var(--a11y-min-size);
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-link::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-link__button {
    color: inherit;
    display: flex;
    flex: 1;
    /* The user agent styles of <button> do not inherit font and color. */
    font: inherit;
    text-decoration-line: none;
  }
  .kol-link__text {
    flex: 1 0 100%;
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
    min-height: var(--a11y-min-size);
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-button__button {
    color: inherit;
    display: flex;
    flex: 1;
    /* The user agent styles of <button> do not inherit font and color. */
    font: inherit;
    text-decoration-line: none;
  }
  .kol-button__text {
    flex: 1 0 100%;
  }
  a.kol-link {
    width: auto;
  }
  .kol-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .kol-toolbar--orientation-vertical {
    flex-direction: column;
    align-items: stretch;
  }
  .kol-toolbar--orientation-vertical .kol-span {
    align-items: flex-start;
  }
  .kol-toolbar:focus-within {
    outline: 1px solid;
    outline-offset: 2px;
  }
}`,E=class{constructor(e){s(this,e),this.state={_label:``,_items:[]},this.currentIndex=0,this.indexToElement=new Map,this._tick=0,this.forceRender=()=>this._tick++,this.toolbarLinkCtrls=new Map,this.toolbarButtonCtrls=new Map,this.renderItem=(e,t)=>{let n=this.normalizeItem(e),r=t===this.currentIndex&&!n?._disabled?0:-1,o={class:`button normal kol-toolbar__item`};if(n.type===`link`){let e=this.toolbarLinkCtrls.get(t);if(!e)return a(i,null);let n=e;return a(x,{class:o.class,href:n.getRenderProp(`href`),label:n.getRenderProp(`label`),icons:n.getRenderProp(`icons`),hideLabel:n.getRenderProp(`hideLabel`),target:n.getRenderProp(`target`),download:n.getRenderProp(`download`),on:n.getRenderProp(`on`),inline:n.getRenderProp(`inline`),disabled:n.getRenderProp(`disabled`),role:n.getRenderProp(`role`),tabIndex:r,accessKey:n.getRenderProp(`accessKey`),shortKey:n.getRenderProp(`shortKey`),tooltipAlign:n.getRenderProp(`tooltipAlign`),ariaControls:n.getRenderProp(`ariaControls`),ariaCurrentValue:n.getRenderProp(`ariaCurrentValue`),ariaDescription:n.getRenderProp(`ariaDescription`),ariaExpanded:n.getRenderProp(`ariaExpanded`),ariaOwns:n.getRenderProp(`ariaOwns`),customClass:n.getRenderProp(`customClass`),variant:n.getRenderProp(`variant`),ariaCurrent:n.getAriaCurrent(),onAnchorClick:n.handleAnchorClick,tooltipId:n.getTooltipId(),refTooltipFloating:n.setTooltipRef,refAnchor:e=>{n.setAnchorRef(e),e&&this.indexToElement.set(t,e)}})}let s=this.toolbarButtonCtrls.get(t);return s?(u(s,Object.assign(Object.assign({},n),{_tabIndex:r,_variant:`normal`})),f(s,{class:o.class,refButton:e=>{e&&this.indexToElement.set(t,e)}})):a(i,null)}}async focus(e){let t=this.indexToElement.get(this.currentIndex);if(t)return h(this.host,()=>m(t,e))}async click(){let e=this.indexToElement.get(this.currentIndex);if(e)return _(this.host,async()=>g(e))}normalizeItem(e){let{_icons:t,_disabled:n}=e,r=l(e,[`_icons`,`_disabled`]);return Object.assign(Object.assign({},r),{_icons:t,_disabled:n})}render(){return a(`div`,{key:`92eac5886abe293045ede790a8deb4b6df68847a`,class:`kol-toolbar kol-toolbar--orientation-${this.state._orientation}`,role:`toolbar`,"aria-label":this.state._label},this.state._items.map(this.renderItem))}validateLabel(e){p(this,e)}validateItems(e){w(this,e),this.indexToElement.clear();for(let e of this.toolbarLinkCtrls.values())e.destroy();this.toolbarLinkCtrls.clear();for(let e of this.toolbarButtonCtrls.values())e.destroy();this.toolbarButtonCtrls.clear(),this.state._items.forEach((e,t)=>{if(e.type===`link`){let n=new b(y(this.forceRender));v(n,e),this.toolbarLinkCtrls.set(t,n)}else this.toolbarButtonCtrls.set(t,new d(c.stateLess))}),this.setFirstEnabledItemIndex()}validateOrientation(e){S(this,e)}getCurrentToolbarItem(e){return typeof e==`number`?this.indexToElement.get(e):void 0}setFirstEnabledItemIndex(){this.currentIndex=this.state._items?.findIndex(e=>!e._disabled)}handleKeyDown(e){let t=e.code;if(![C.ArrowUp,C.ArrowDown,C.ArrowRight,C.ArrowLeft].includes(t))return;e.preventDefault();let n=(this._items?.length??0)-1;if(n<0)return;let r=this.currentIndex,i=r;switch(t){case C.ArrowUp:case C.ArrowLeft:i=r>0?r-1:n;break;case C.ArrowDown:case C.ArrowRight:i=r<n?r+1:0;break}if(r===i||this.state._items?.[i]?._disabled)return;this.currentIndex=i;let a=this.getCurrentToolbarItem(i);this.host&&a?.focus()}handleFocusout(e){e.target===this.host&&this.setFirstEnabledItemIndex()}componentWillLoad(){this.validateLabel(this._label),this.validateItems(this._items),this.validateOrientation(this._orientation),this.setFirstEnabledItemIndex()}disconnectedCallback(){for(let e of this.toolbarLinkCtrls.values())e.destroy();this.toolbarLinkCtrls.clear()}get host(){return t(this)}static get watchers(){return{_label:[`validateLabel`],_items:[`validateItems`],_orientation:[`validateOrientation`]}}};E.style={default:T};export{E as kol_toolbar};