import{Ct as e,G as t,St as n,T as r,U as i,o as a,s as o,v as s,wt as c}from"./index-CfnAvnDn.js";import{n as l,t as u}from"./dev.utils-DEzQ6pd0-DROOGbP6.js";import{r as d}from"./label-BJf95S0B-CPiqCjNV.js";import{t as f}from"./clsx-COFh-Vc8-DWAop4cA.js";import{t as p}from"./i18n-B_vSiQA9-BqLHng0R.js";import{n as m,t as h}from"./unique-nav-labels-DWO8JUzQ-m232ShdO.js";import{t as g}from"./hide-label-D9p4NSvH-cQfmh_BS.js";var _=(t,n)=>{e(t,`_collapsible`,n)},v=(t,n)=>{e(t,`_hasCompactButton`,n)},y=(t,n)=>{e(t,`_hasIconsWhenExpanded`,n)},b=(e,t,r)=>{c(t,`_links`,e=>typeof e==`object`&&(typeof e._href==`string`||typeof e._label==`string`),r),n(e,t.state._links.length)},x=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1790130098301"); /* IE9*/
  src: url("kolicons.eot?t=1790130098301#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1790130098301") format("woff2"), url("kolicons.woff?t=1790130098301") format("woff"), url("kolicons.ttf?t=1790130098301") format("truetype"), url("kolicons.svg?t=1790130098301#kolicons") format("svg"); /* iOS 4.1- */
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
}`,S=e=>typeof e._href==`string`,C=e=>e._href===void 0&&typeof e._on?.onClick==`function`,w=class{constructor(e){o(this,e),this.navId=l(`kol-nav`),this.listId=u(this.navId,`list`),this.handleToggleExpansionClick=e=>{e&&(this.state._expandedChildren.includes(e)?this.collapseChildren(e):this.expandChildren(e))},this.linkList=e=>a(`ul`,{class:f(`kol-nav__list`,{"kol-nav__list--nested":e.deep>0,"kol-nav__list--vertical":e.deep!==0}),id:e.deep>0?e.id:void 0},e.links.map((t,n)=>this.li(e.collapsible,e.deep,n,t,e.id))),this._collapsible=!0,this._hasCompactButton=!1,this._hasIconsWhenExpanded=!1,this._hideLabel=!1,this.state={_collapsible:!0,_hasCompactButton:!1,_hasIconsWhenExpanded:!1,_hideLabel:!1,_label:``,_links:[],_expandedChildren:[]}}expandChildren(e){this.state=Object.assign(Object.assign({},this.state),{_expandedChildren:[...this.state._expandedChildren,e]})}collapseChildren(e){this.state=Object.assign(Object.assign({},this.state),{_expandedChildren:this.state._expandedChildren.filter(t=>t!==e)})}buildIconObject(e,t,n){let r={left:``,right:``};return this.state._hasIconsWhenExpanded&&n&&(r.left=n),this.state._hideLabel&&(r.left=n||`kolicon-link`),e&&(r.right=t?`kolicon-minus`:`kolicon-plus`),r}entry(e,t,n,i,o){let c=typeof n._icons==`string`?n._icons:typeof n._icons?.left==`string`?n._icons.left:void 0,l=this.buildIconObject(e&&t,i,c);return a(`div`,{class:`kol-nav__entry-wrapper`},S(n)?a(r,Object.assign({class:f(`kol-nav__entry kol-nav__entry--link`,{"kol-nav__entry--collapsible":e})},n,{_hideLabel:this.state._hideLabel,_icons:l,_ariaControls:e&&t&&i?o:void 0,_ariaExpanded:e&&t?i:void 0})):a(s,{class:f(`kol-nav__entry kol-nav__entry--button`,{"kol-nav__entry--collapsible":e}),_label:n._label,_disabled:C(n)?n._disabled:void 0,_hideLabel:this.state._hideLabel,_icons:l,_ariaControls:e&&t&&i?o:void 0,_ariaExpanded:e&&t?i:void 0,_on:{onClick:(e,t)=>{C(n)&&typeof n._on.onClick==`function`&&n._on.onClick(e,t),this.handleToggleExpansionClick(n._children)}}}))}li(e,t,n,r,i){let o=!!r._active,s=Array.isArray(r._children)&&r._children.length>0,c=!!(r._children&&this.state._expandedChildren.includes(r._children)),l=u(i,`${t}-${n}`);return a(`li`,{class:f(`kol-nav__list-item`,{"kol-nav__list-item--active":o,"kol-nav__list-item--expanded":c,"kol-nav__list-item--has-children":s}),key:n},this.entry(e,s,r,c,l),c&&a(this.linkList,{collapsible:e,deep:t+1,links:r._children||[],id:l}))}initializeExpandedChildren(){this.state=Object.assign(Object.assign({},this.state),{_expandedChildren:[]});let e=t=>{if(t._active)return t._children&&this.expandChildren(t._children),!0;if(t._children){for(let n of t._children)if(e(n))return this.expandChildren(t._children),!0}return!1};this.state._links.forEach(e)}render(){let e=this.state._collapsible===!0;return a(`div`,{key:`cc29dd1a0de62cd04ab30d1781aab1eb096ae205`,class:f(`kol-nav`,{"kol-nav--is-compact":this.state._hideLabel})},a(`nav`,{key:`7b9a586346012b433ae24e311ec2766a787be74f`,"aria-label":this.state._label,class:`kol-nav__navigation`,id:this.navId},a(this.linkList,{key:`14490461ca495790cf064de8316b13ee9e628ffd`,collapsible:e,deep:0,links:this.state._links,id:this.listId})),this.state._hasCompactButton&&a(`div`,{key:`afae61d8c806f7eba89caa6db79c3c33e0e9c291`,class:`kol-nav__compact`},a(s,{key:`d83f22809cb7252ede75bb741a50898b12c1121e`,class:`kol-nav__toggle-button`,_ariaControls:this.navId,_ariaExpanded:!this.state._hideLabel,_icons:this.state._hideLabel?`kolicon-chevron-right`:`kolicon-chevron-left`,_hideLabel:!0,_label:this.state._hideLabel?p(`kol-nav-maximize`):p(`kol-nav-minimize`),_on:{onClick:()=>{this.state=Object.assign(Object.assign({},this.state),{_hideLabel:!this.state._hideLabel})}},_tooltipAlign:`right`})))}validateCollapsible(e){_(this,e)}validateHasCompactButton(e){v(this,e)}validateHasIconsWhenExpanded(e){y(this,e)}validateHideLabel(e){g(this,e)}validateLabel(e,t,n=!1){n||m(this.state._label),d(this,e,{required:!0}),i(e),h(this.state._label)}validateLinks(e){b(`KolNav`,this,e),t(`[KolNav] The navigation structure is not yet validated recursively.`),this.initializeExpandedChildren()}componentWillLoad(){this.validateCollapsible(this._collapsible),this.validateHideLabel(this._hideLabel),this.validateHasCompactButton(this._hasCompactButton),this.validateHasIconsWhenExpanded(this._hasIconsWhenExpanded),this.validateLabel(this._label,void 0,!0),this.validateLinks(this._links),this.initializeExpandedChildren()}disconnectedCallback(){m(this.state._label)}static get watchers(){return{_collapsible:[`validateCollapsible`],_hasCompactButton:[`validateHasCompactButton`],_hasIconsWhenExpanded:[`validateHasIconsWhenExpanded`],_hideLabel:[`validateHideLabel`],_label:[`validateLabel`],_links:[`validateLinks`]}}};w.style={default:x};export{w as kol_nav};