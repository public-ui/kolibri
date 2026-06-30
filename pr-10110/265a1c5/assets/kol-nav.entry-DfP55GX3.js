import{G as e,Tt as t,o as n,q as r,s as i}from"./index-CGgSGtxI.js";import{n as a,t as o}from"./dev.utils-BRffKFmN-Cpov-_bN.js";import"./normalizers-BZrXYlGW-DubWmdZZ.js";import"./label-CSEcI_DU-Docp8YrX.js";import"./base-controller-4nyun1vN-BF8SHmBh.js";import{t as s}from"./base-web-component-BT6jbe_v-Vp21XLG3.js";import"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as c}from"./clsx-COFh-Vc8-alQuJLqj.js";import"./component-BKvFZabC-DDVrypaa.js";import"./align-tkjswpJx-dlLeJ341.js";import"./controller-C1oVs8dr-21b0OIlu.js";import"./component-Bpa5h0dJ-BhFV95Hh.js";import"./label-with-expert-slot-Drx1G6Cn-CincZLFu.js";import"./name-CRrqyGmF-BZ9GovYs.js";import{t as l}from"./controller-CsTLANdH-D_uxxy4q.js";import{n as u}from"./render-BEG0vlR0-ul_YnEmC.js";import{r as d}from"./label-BRWfnFOs-BCFb1EK0.js";import{t as f}from"./i18n-Apwu2-qw-DvMDX6ID.js";import{n as p,t as m}from"./unique-nav-labels-Hzc-CJgf-BCuvQ3YG.js";import{t as h}from"./validation-BsHpYbSo-D31luqYz.js";import"./access-and-short-key-ijzCZfHm-Dx5Q-CAn.js";import"./href-DKzx87Sd-DslkFs6P.js";import{a as g,i as _,n as v,r as y}from"./controller-CkSB0Bb1-DBDCwgRY.js";import{t as b}from"./hide-label-BhB7rwXD-B2rPFTiu.js";var x=(e,n)=>{t(e,`_collapsible`,n)},S=(e,n)=>{t(e,`_hasCompactButton`,n)},C=(e,n)=>{t(e,`_hasIconsWhenExpanded`,n)},w=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1782816497220"); /* IE9*/
  src: url("kolicons.eot?t=1782816497220#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1782816497220") format("woff2"), url("kolicons.woff?t=1782816497220") format("woff"), url("kolicons.ttf?t=1782816497220") format("truetype"), url("kolicons.svg?t=1782816497220#kolicons") format("svg"); /* iOS 4.1- */
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
    display: inline-flex;
  }
  .kol-link--standalone {
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: stretch;
  }
  .kol-link--standalone .kol-link__text {
    display: inline-flex;
    flex: 1 1 100%;
    place-items: center;
  }
  .kol-link__anchor, .kol-link__button {
    display: inline-flex;
    flex: 1;
    align-items: baseline;
    place-items: center;
    text-align: left;
    text-decoration-line: none;
  }
  .kol-link__anchor .kol-span__label, .kol-link__button .kol-span__label {
    text-decoration-line: underline;
  }
  .kol-link__anchor:focus:not([aria-disabled], [disabled]) .kol-span__label, .kol-link__anchor:hover:not([aria-disabled], [disabled]) .kol-span__label, .kol-link__button:focus:not([aria-disabled], [disabled]) .kol-span__label, .kol-link__button:hover:not([aria-disabled], [disabled]) .kol-span__label {
    text-decoration-thickness: 0.2em;
  }
  .kol-link__icon {
    display: inline-flex;
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
    display: inline-flex;
  }
  .kol-button--standalone {
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: stretch;
  }
  .kol-button--standalone .kol-button__text {
    display: inline-flex;
    flex: 1 1 100%;
    place-items: center;
  }
  .kol-button__anchor, .kol-button__button {
    display: inline-flex;
    flex: 1;
    align-items: baseline;
    place-items: center;
    text-align: left;
    text-decoration-line: none;
  }
  .kol-button__anchor .kol-span__label, .kol-button__button .kol-span__label {
    text-decoration-line: underline;
  }
  .kol-button__anchor:focus:not([aria-disabled], [disabled]) .kol-span__label, .kol-button__anchor:hover:not([aria-disabled], [disabled]) .kol-span__label, .kol-button__button:focus:not([aria-disabled], [disabled]) .kol-span__label, .kol-button__button:hover:not([aria-disabled], [disabled]) .kol-span__label {
    text-decoration-thickness: 0.2em;
  }
  .kol-button__icon {
    display: inline-flex;
  }
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-nav {
    display: grid;
    place-items: center;
  }
  .kol-nav:not(.kol-nav--is-compact) .kol-nav__navigation {
    width: 100%;
  }
  .kol-nav__navigation .kol-link__anchor {
    min-height: var(--a11y-min-size);
  }
  .kol-nav__navigation .kol-span {
    width: 100%;
    justify-content: flex-start;
  }
  .kol-nav__navigation .kol-span__container {
    width: 100%;
  }
  .kol-nav__navigation .kol-span__container .kol-span__label {
    flex: 1;
  }
  .kol-nav__list {
    display: flex;
    margin: 0;
    padding: 0;
    flex-direction: column;
    list-style: none;
  }
  .kol-nav__entry-wrapper {
    display: flex;
  }
  .kol-nav__entry {
    flex-grow: 1;
  }
  .kol-nav__compact .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-nav__compact :host {
    display: inline-block;
  }
  .kol-nav__compact .kol-button {
    display: flex;
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-nav__compact .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-nav__compact .kol-button__button, .kol-nav__compact .kol-button__anchor {
    color: inherit;
    display: flex;
    min-height: var(--a11y-min-size);
    flex: 1;
    align-items: stretch;
    /* The user agent styles of <button> do not inherit font and color. */
    font: inherit;
    text-decoration-line: none;
  }
  .kol-nav__compact .kol-button__text {
    flex: 1 0 100%;
  }
}`,T=e=>typeof e._href==`string`,E=e=>e._href===void 0&&typeof e._on?.onClick==`function`,D=class{constructor(e){i(this,e),this.navId=a(`kol-nav`),this.listId=o(this.navId,`list`),this._tick=0,this.forceRender=()=>this._tick++,this.navLinkCtrls=new Map,this.navButtonCtrls=new Map,this.compactButtonCtrl=new l(s.stateLess),this.handleToggleExpansionClick=e=>{e&&(this.state._expandedChildren.includes(e)?this.collapseChildren(e):this.expandChildren(e))},this.linkList=e=>n(`ul`,{class:c(`kol-nav__list`,{"kol-nav__list--nested":e.deep>0,"kol-nav__list--vertical":e.deep!==0}),id:e.deep>0?e.id:void 0},e.links.map((t,n)=>this.li(e.collapsible,e.deep,n,t,e.id))),this._collapsible=!0,this._hasCompactButton=!1,this._hasIconsWhenExpanded=!1,this._hideLabel=!1,this.state={_collapsible:!0,_hasCompactButton:!1,_hasIconsWhenExpanded:!1,_hideLabel:!1,_label:``,_links:[],_expandedChildren:[]}}getNavButtonCtrl(e){let t=this.navButtonCtrls.get(e);return t||(t=new l(s.stateLess),this.navButtonCtrls.set(e,t)),t}syncNavLinkControllers(){let e=new Set,t=n=>{for(let r of n){if(e.add(r),T(r)&&!this.navLinkCtrls.has(r)){let e=new v(_(this.forceRender));g(e,r),this.navLinkCtrls.set(r,e)}Array.isArray(r._children)&&t(r._children)}};t(this.state._links);for(let[t,n]of this.navLinkCtrls)e.has(t)||(n.destroy(),this.navLinkCtrls.delete(t));for(let[t,n]of this.navButtonCtrls)e.has(t)||(n.destroy(),this.navButtonCtrls.delete(t))}expandChildren(e){this.state=Object.assign(Object.assign({},this.state),{_expandedChildren:[...this.state._expandedChildren,e]})}collapseChildren(e){this.state=Object.assign(Object.assign({},this.state),{_expandedChildren:this.state._expandedChildren.filter(t=>t!==e)})}buildIconObject(e,t,n){let r={left:``,right:``};return this.state._hasIconsWhenExpanded&&n&&(r.left=n),this.state._hideLabel&&(n?r.left=n:r.left=`kolicon-link`),e&&(t?r.right=`kolicon-minus`:r.right=`kolicon-plus`),r}entry(e,t,r,i,a){let o=typeof r._icons==`string`?r._icons:typeof r._icons?.left==`string`?r._icons.left:void 0,s=this.buildIconObject(e&&t,i,o);return n(`div`,{class:`kol-nav__entry-wrapper`},T(r)?(()=>{let o=this.navLinkCtrls.get(r);return n(y,{class:c(`kol-nav__entry kol-nav__entry--link`,{"kol-nav__entry--collapsible":e}),href:o.getRenderProp(`href`),label:o.getRenderProp(`label`),icons:s,hideLabel:o.getRenderProp(`hideLabel`),target:o.getRenderProp(`target`),download:o.getRenderProp(`download`),on:o.getRenderProp(`on`),inline:o.getRenderProp(`inline`),disabled:o.getRenderProp(`disabled`),role:o.getRenderProp(`role`),tabIndex:o.getRenderProp(`tabIndex`),accessKey:o.getRenderProp(`accessKey`),shortKey:o.getRenderProp(`shortKey`),tooltipAlign:o.getRenderProp(`tooltipAlign`),ariaControls:e&&t&&i?a:o.getRenderProp(`ariaControls`),ariaCurrentValue:o.getRenderProp(`ariaCurrentValue`),ariaDescription:o.getRenderProp(`ariaDescription`),ariaExpanded:e&&t?String(i):o.getRenderProp(`ariaExpanded`),ariaOwns:o.getRenderProp(`ariaOwns`),customClass:o.getRenderProp(`customClass`),variant:o.getRenderProp(`variant`),ariaCurrent:o.getAriaCurrent(),onAnchorClick:o.handleAnchorClick,tooltipId:o.getTooltipId(),refTooltipFloating:o.setTooltipRef,refAnchor:o.setAnchorRef})})():(()=>{let n=this.getNavButtonCtrl(r);return n.applyProps({label:r._label,hideLabel:this.state._hideLabel,icons:s,ariaControls:e&&t&&i?a:void 0,ariaExpanded:e&&t?i:void 0,on:{onClick:(e,t)=>{E(r)&&typeof r._on.onClick==`function`&&r._on.onClick(e,t),this.handleToggleExpansionClick(r._children)}}}),u(n,{class:c(`kol-nav__entry kol-nav__entry--button`,{"kol-nav__entry--collapsible":e})})})())}li(e,t,r,i,a){let s=!!i._active,l=Array.isArray(i._children)&&i._children.length>0,u=!!(i._children&&this.state._expandedChildren.includes(i._children)),d=o(a,`${t}-${r}`);return n(`li`,{class:c(`kol-nav__list-item`,{"kol-nav__list-item--active":s,"kol-nav__list-item--expanded":u,"kol-nav__list-item--has-children":l}),key:r},this.entry(e,l,i,u,d),u&&n(this.linkList,{collapsible:e,deep:t+1,links:i._children||[],id:d}))}initializeExpandedChildren(){this.state=Object.assign(Object.assign({},this.state),{_expandedChildren:[]});let e=t=>{if(t._active)return t._children&&this.expandChildren(t._children),!0;if(t._children){for(let n of t._children)if(e(n))return this.expandChildren(t._children),!0}return!1};this.state._links.forEach(e)}render(){let e=this.state._collapsible===!0;return n(`div`,{key:`78893d77fdd12548c9aef2cf3cfee25331b48cbe`,class:c(`kol-nav`,{"kol-nav--is-compact":this.state._hideLabel})},n(`nav`,{key:`d7598e6ff6ed0c9a5a0a6f0190c141f7109436a1`,"aria-label":this.state._label,class:`kol-nav__navigation`,id:this.navId},n(this.linkList,{key:`2ead36adb7dd42a6688ef57c502f38a442934cfe`,collapsible:e,deep:0,links:this.state._links,id:this.listId})),this.state._hasCompactButton&&n(`div`,{key:`a3416cf52ffe37f867f8c2c596ad55595aa46c00`,class:`kol-nav__compact`},(this.compactButtonCtrl.applyProps({ariaControls:this.navId,ariaExpanded:!this.state._hideLabel,icons:this.state._hideLabel?`kolicon-chevron-right`:`kolicon-chevron-left`,hideLabel:!0,label:f(this.state._hideLabel?`kol-nav-maximize`:`kol-nav-minimize`),on:{onClick:()=>{this.state=Object.assign(Object.assign({},this.state),{_hideLabel:!this.state._hideLabel})}},tooltipAlign:`right`}),u(this.compactButtonCtrl,{class:`kol-nav__toggle-button`}))))}validateCollapsible(e){x(this,e)}validateHasCompactButton(e){S(this,e)}validateHasIconsWhenExpanded(e){C(this,e)}validateHideLabel(e){b(this,e)}validateLabel(t,n,r=!1){r||p(this.state._label),d(this,t,{required:!0}),e(t),m(this.state._label)}validateLinks(e){h(`KolNav`,this,e),r(`[KolNav] The navigation structure is not yet validated recursively.`),this.initializeExpandedChildren(),this.syncNavLinkControllers()}componentWillLoad(){this.validateCollapsible(this._collapsible),this.validateHideLabel(this._hideLabel),this.validateHasCompactButton(this._hasCompactButton),this.validateHasIconsWhenExpanded(this._hasIconsWhenExpanded),this.validateLabel(this._label,void 0,!0),this.validateLinks(this._links),this.initializeExpandedChildren()}disconnectedCallback(){p(this.state._label);for(let e of this.navLinkCtrls.values())e.destroy();this.navLinkCtrls.clear()}static get watchers(){return{_collapsible:[`validateCollapsible`],_hasCompactButton:[`validateHasCompactButton`],_hasIconsWhenExpanded:[`validateHasIconsWhenExpanded`],_hideLabel:[`validateHideLabel`],_label:[`validateLabel`],_links:[`validateLinks`]}}};D.style={default:w};export{D as kol_nav};