import{J as e,K as t,O as n,Ot as r,b as i,o as a,s as o}from"./index-B5snaiMH.js";import{n as s,t as c}from"./dev.utils-Bhh4oJHO-BphYCKoy.js";import{t as l}from"./clsx-COFh-Vc8-alQuJLqj.js";import{r as u}from"./label-Ftw1VCQG-DHd7EsVq.js";import{t as d}from"./i18n-BsXYYo8j-BGmQI-1I.js";import{n as f,t as p}from"./unique-nav-labels-D8t0Lwbk-MTkYPDCK.js";import{t as m}from"./validation-C1wS_Ep2-QdWaPRyF.js";import{t as h}from"./hide-label-B9ipEhG8-i7FgLAQo.js";var g=(e,t)=>{r(e,`_collapsible`,t)},_=(e,t)=>{r(e,`_hasCompactButton`,t)},v=(e,t)=>{r(e,`_hasIconsWhenExpanded`,t)},y=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1784286833522"); /* IE9*/
  src: url("kolicons.eot?t=1784286833522#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1784286833522") format("woff2"), url("kolicons.woff?t=1784286833522") format("woff"), url("kolicons.ttf?t=1784286833522") format("truetype"), url("kolicons.svg?t=1784286833522#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-nav {
    display: grid;
    place-items: center;
  }
  .kol-nav:not(.kol-nav--is-compact) .kol-nav__navigation {
    width: 100%;
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
  .kol-button {
    text-align: left;
  }
}`,b=e=>typeof e._href==`string`,x=e=>e._href===void 0&&typeof e._on?.onClick==`function`,S=class{constructor(e){o(this,e),this.navId=s(`kol-nav`),this.listId=c(this.navId,`list`),this.handleToggleExpansionClick=e=>{e&&(this.state._expandedChildren.includes(e)?this.collapseChildren(e):this.expandChildren(e))},this.linkList=e=>a(`ul`,{class:l(`kol-nav__list`,{"kol-nav__list--nested":e.deep>0,"kol-nav__list--vertical":e.deep!==0}),id:e.deep>0?e.id:void 0},e.links.map((t,n)=>this.li(e.collapsible,e.deep,n,t,e.id))),this._collapsible=!0,this._hasCompactButton=!1,this._hasIconsWhenExpanded=!1,this._hideLabel=!1,this.state={_collapsible:!0,_hasCompactButton:!1,_hasIconsWhenExpanded:!1,_hideLabel:!1,_label:``,_links:[],_expandedChildren:[]}}expandChildren(e){this.state=Object.assign(Object.assign({},this.state),{_expandedChildren:[...this.state._expandedChildren,e]})}collapseChildren(e){this.state=Object.assign(Object.assign({},this.state),{_expandedChildren:this.state._expandedChildren.filter(t=>t!==e)})}buildIconObject(e,t,n){let r={left:``,right:``};return this.state._hasIconsWhenExpanded&&n&&(r.left=n),this.state._hideLabel&&(n?r.left=n:r.left=`kolicon-link`),e&&(t?r.right=`kolicon-minus`:r.right=`kolicon-plus`),r}entry(e,t,r,o,s){let c=typeof r._icons==`string`?r._icons:typeof r._icons?.left==`string`?r._icons.left:void 0,u=this.buildIconObject(e&&t,o,c);return a(`div`,{class:`kol-nav__entry-wrapper`},b(r)?a(n,Object.assign({class:l(`kol-nav__entry kol-nav__entry--link`,{"kol-nav__entry--collapsible":e})},r,{_hideLabel:this.state._hideLabel,_icons:u,_ariaControls:e&&t&&o?s:void 0,_ariaExpanded:e&&t?o:void 0})):a(i,{class:l(`kol-nav__entry kol-nav__entry--button`,{"kol-nav__entry--collapsible":e}),_label:r._label,_hideLabel:this.state._hideLabel,_icons:u,_ariaControls:e&&t&&o?s:void 0,_ariaExpanded:e&&t?o:void 0,_on:{onClick:(e,t)=>{x(r)&&typeof r._on.onClick==`function`&&r._on.onClick(e,t),this.handleToggleExpansionClick(r._children)}}}))}li(e,t,n,r,i){let o=!!r._active,s=Array.isArray(r._children)&&r._children.length>0,u=!!(r._children&&this.state._expandedChildren.includes(r._children)),d=c(i,`${t}-${n}`);return a(`li`,{class:l(`kol-nav__list-item`,{"kol-nav__list-item--active":o,"kol-nav__list-item--expanded":u,"kol-nav__list-item--has-children":s}),key:n},this.entry(e,s,r,u,d),u&&a(this.linkList,{collapsible:e,deep:t+1,links:r._children||[],id:d}))}initializeExpandedChildren(){this.state=Object.assign(Object.assign({},this.state),{_expandedChildren:[]});let e=t=>{if(t._active)return t._children&&this.expandChildren(t._children),!0;if(t._children){for(let n of t._children)if(e(n))return this.expandChildren(t._children),!0}return!1};this.state._links.forEach(e)}render(){let e=this.state._collapsible===!0;return a(`div`,{key:`168e77bd4e310d31ec72afcc5dc4633df3a5852c`,class:l(`kol-nav`,{"kol-nav--is-compact":this.state._hideLabel})},a(`nav`,{key:`d27ea32253853f5ab13df4cceec8245a69564179`,"aria-label":this.state._label,class:`kol-nav__navigation`,id:this.navId},a(this.linkList,{key:`43080dfc66978e4161adb904094f8b7a4585798c`,collapsible:e,deep:0,links:this.state._links,id:this.listId})),this.state._hasCompactButton&&a(`div`,{key:`917c25c8c29c3f980dd95c19cac2b3857c9f06fd`,class:`kol-nav__compact`},a(i,{key:`c08ed259ed0721edaa769a44e7b9b96c50091f30`,class:`kol-nav__toggle-button`,_ariaControls:this.navId,_ariaExpanded:!this.state._hideLabel,_icons:this.state._hideLabel?`kolicon-chevron-right`:`kolicon-chevron-left`,_hideLabel:!0,_label:d(this.state._hideLabel?`kol-nav-maximize`:`kol-nav-minimize`),_on:{onClick:()=>{this.state=Object.assign(Object.assign({},this.state),{_hideLabel:!this.state._hideLabel})}},_tooltipAlign:`right`})))}validateCollapsible(e){g(this,e)}validateHasCompactButton(e){_(this,e)}validateHasIconsWhenExpanded(e){v(this,e)}validateHideLabel(e){h(this,e)}validateLabel(e,n,r=!1){r||f(this.state._label),u(this,e,{required:!0}),t(e),p(this.state._label)}validateLinks(t){m(`KolNav`,this,t),e(`[KolNav] The navigation structure is not yet validated recursively.`),this.initializeExpandedChildren()}componentWillLoad(){this.validateCollapsible(this._collapsible),this.validateHideLabel(this._hideLabel),this.validateHasCompactButton(this._hasCompactButton),this.validateHasIconsWhenExpanded(this._hasIconsWhenExpanded),this.validateLabel(this._label,void 0,!0),this.validateLinks(this._links),this.initializeExpandedChildren()}disconnectedCallback(){f(this.state._label)}static get watchers(){return{_collapsible:[`validateCollapsible`],_hasCompactButton:[`validateHasCompactButton`],_hasIconsWhenExpanded:[`validateHasIconsWhenExpanded`],_hideLabel:[`validateHideLabel`],_label:[`validateLabel`],_links:[`validateLinks`]}}};S.style={default:y};export{S as kol_nav};