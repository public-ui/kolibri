import{C as e,b as t,c as n,l as r,o as i,r as a,s as o}from"./index-DsCeQ9Ys-DT8-7Ybx.js";import"./behavior-D1kOlK6p-KEPO5gSK.js";import"./index-ZS8uCArk.js";import{n as s,t as c}from"./dev.utils-CYtV9X0K-no4Riu1I.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import{f as l,o as u,t as d}from"./base-web-component-3R1Dy3QK-BhEzAxH_.js";import"./label-c9P7yC4V-B_wwMOT2.js";import{t as f}from"./clsx-COFh-Vc8-DWAop4cA.js";import"./block-bem-DxQXsOt3-ZdTfoQUG.js";import{t as p}from"./component-BxKN0JbT-juiH1PW5.js";import"./disabled-CdyeAMlW-BO58wys1.js";import"./component-BjH8s4-t-DgFTIoSO.js";import"./component-D_58mw87-k97kkval.js";import{t as m}from"./i18n-BaCf-SDK-C9h8FecG.js";import"./component-C9DexidK-PSrxeG8X.js";import"./component-xrrwVuiI-DyIKozOQ.js";import{t as h}from"./component-C3aqLFK2-BXxTlNpj.js";import"./align-DeB15XnU-Yl_IqDq4.js";import{t as g}from"./label-with-expert-slot-CocPu9HB-DM_ZebTB.js";import{o as _}from"./variant-CeijQFzL-B21t7EL2.js";import"./name-D8963H-v-nycd0GVa.js";import"./api-BvTefIaj-DGNuVYyC.js";import"./resolve-props-YWmoYL6c-nwFU0Mrd.js";import{t as v}from"./links-Cn5VAgwV-DZgAdk3v.js";import"./href-DOi-fZMu-C3-3J2o3.js";import"./link-target-B7A-qwaP-COY2H0Ac.js";import{t as y}from"./api-BA-AFr5H-B-2jpk1Y.js";import{n as b,t as x}from"./unique-nav-labels-DugFb3rS-SVpBsz0G.js";import"./controller-D1hrFVo3-D-TTMJpb.js";import{t as S}from"./item-DY0fVVnj-IhHXpP2y.js";import{t as C}from"./item-pool-BOxAYePG-7TsT6kC_.js";import"./resolve-props-DJxTzf-G-DaszmAjh.js";import{t as w}from"./item-CaxJw3ad-DOprkbmP.js";var T=u(`collapsible`,!0,l),E=u(`hasCompactButton`,!1,l),D=u(`hasIconsWhenExpanded`,!1,l),O=v(`KolNav`),k={required:[g,O],optional:[T,E,D,_]},A=e=>typeof e._href==`string`,j=e=>e._href===void 0&&typeof e._on?.onClick==`function`;function M(e){let t=[],n=e=>{if(e._active)return e._children&&t.push(e._children),!0;if(e._children){for(let r of e._children)if(n(r))return t.push(e._children),!0}return!1};return e.forEach(n),t}function N(e,t){return e.includes(t)?e.filter(e=>e!==t):[...e,t]}function P(e){return typeof e._icons==`string`?e._icons:typeof e._icons?.left==`string`?e._icons.left:void 0}function F({collapsible:e,expanded:t,hasIconsWhenExpanded:n,hideLabel:r,leftIcon:i}){let a={left:``,right:``};return n&&i&&(a.left=i),r&&(a.left=i||`kolicon-link`),e&&(a.right=t?`kolicon-minus`:`kolicon-plus`),a}var I=(e,t,r,i,a)=>{let{collapsible:o,compact:s,getButtonFcProps:c,getLinkFcProps:l,handleToggleExpansion:u,hasIconsWhenExpanded:d}=e,p=F({collapsible:o&&r,expanded:i,hasIconsWhenExpanded:d,hideLabel:s,leftIcon:P(t)});return n(`div`,{class:`kol-nav__entry-wrapper`},A(t)?n(`div`,{class:f(`kol-nav__entry kol-nav__entry--link`,{"kol-nav__entry--collapsible":o})},n(y,Object.assign({},l(`link-${a}`,Object.assign(Object.assign({},t),{_hideLabel:s,_icons:p,_ariaControls:o&&r&&i?a:void 0,_ariaExpanded:o&&r?i:void 0}))))):n(`div`,{class:f(`kol-nav__entry kol-nav__entry--button`,{"kol-nav__entry--collapsible":o})},n(h,Object.assign({},c(`button-${a}`,{_label:t._label,_disabled:j(t)?t._disabled:void 0,_hideLabel:s,_icons:p,_ariaControls:o&&r&&i?a:void 0,_ariaExpanded:o&&r?i:void 0,_on:{onClick:(e,n)=>{j(t)&&typeof t._on.onClick==`function`&&t._on.onClick(e,n),u(t._children)}}})))))},L=e=>n(`ul`,{class:f(`kol-nav__list`,{"kol-nav__list--nested":e.deep>0,"kol-nav__list--vertical":e.deep!==0}),id:e.deep>0?e.id:void 0},e.links.map((t,r)=>{let i=Array.isArray(t._children)&&t._children.length>0,a=!!(t._children&&e.expandedChildren.includes(t._children)),o=c(e.id,`${e.deep}-${r}`);return n(`li`,{class:f(`kol-nav__list-item`,{"kol-nav__list-item--active":!!t._active,"kol-nav__list-item--expanded":a,"kol-nav__list-item--has-children":i}),key:r},I(e,t,i,a,o),a&&n(L,Object.assign({},e,{deep:e.deep+1,links:t._children||[],id:o})))})),R=({collapsible:e,compact:t,expandedChildren:r,getButtonFcProps:i,getLinkFcProps:a,handleToggleCompact:o,handleToggleExpansion:s,hasCompactButton:c,hasIconsWhenExpanded:l,label:u,links:d,listId:f,navId:g})=>n(p,{block:`kol-nav`,modifiers:{"is-compact":t}},n(`nav`,{"aria-label":u,class:`kol-nav__navigation`,id:g},n(L,{collapsible:e,compact:t,deep:0,expandedChildren:r,getButtonFcProps:i,getLinkFcProps:a,handleToggleExpansion:s,hasIconsWhenExpanded:l,id:f,links:d})),c&&n(`div`,{class:`kol-nav__compact`},n(`div`,{class:`kol-nav__toggle-button`},n(h,Object.assign({},i(`compact-toggle`,{_ariaControls:g,_ariaExpanded:!t,_icons:t?`kolicon-chevron-right`:`kolicon-chevron-left`,_hideLabel:!0,_label:m(t?`kol-nav-maximize`:`kol-nav-minimize`),_on:{onClick:o},_tooltipAlign:`right`})))))),z=`@charset "UTF-8";
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
  /* A disabled \`fieldset\` only groups its controls; \`cursor\` is inherited and would reach the
     operable info popover in its legend. */
  .disabled label,
  .disabled:focus-within label,
  [aria-disabled=true],
  [aria-disabled=true]:focus,
  [disabled]:where(:not(fieldset)),
  [disabled]:where(:not(fieldset)):focus {
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
  src: url("kolicons.eot?t=1791511866240"); /* IE9*/
  src: url("kolicons.eot?t=1791511866240#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1791511866240") format("woff2"), url("kolicons.woff?t=1791511866240") format("woff"), url("kolicons.ttf?t=1791511866240") format("truetype"), url("kolicons.svg?t=1791511866240#kolicons") format("svg"); /* iOS 4.1- */
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
 * Overlaps with \`kol-embedded-button-box-styles\` below: both target the block class itself and disagree
 * on \`display\` and \`text-align\`. A stylesheet that includes both therefore depends on order or
 * specificity — today that only happens where the caller nests one of them (e.g. \`_alert.mixin\`
 * nests this one under \`.kol-alert\`, which wins). Include only one per block unless the nesting
 * makes the winner explicit.
 */
/*
 * Minimal box replication for shadow trees that render \`ButtonFC\` without including
 * \`kol-button-styles\`. The \`kol-global\` reset (\`background\`, \`width\`, \`margin\`, \`padding\`,
 * \`border\`) and the a11y layer \`min-height\`/\`min-width\` apply to the native button, on top of the
 * UA \`inline-block\`, but not to the \`div\` root that carries the \`kol-button\` class. This mixin
 * replicates that outer box on the root, while the inner \`kol-button__interactive-element\` degrades
 * to a plain block container to avoid the inline-level baseline gap the UA \`inline-block\` would add
 * below it.
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
}`,B=class extends d{constructor(e){super(),r(this,e),this.compact=!1,this.expandedChildren=[],this.navId=s(`kol-nav`),this.listId=c(this.navId,`list`),this.buttonItems=C(()=>S(()=>this.host),e=>e.syncListeners(),e=>e.destroy()),this.linkItems=C(()=>w(()=>i(this)),e=>e.syncListeners(),e=>e.destroy()),this._collapsible=!0,this._hasCompactButton=!1,this._hasIconsWhenExpanded=!1,this._hideLabel=!1,this.getButtonFcProps=(e,t)=>this.buttonItems.get(e).getFcProps(t),this.getLinkFcProps=(e,t)=>this.linkItems.get(e).getFcProps(t),this.handleToggleExpansion=e=>{e&&(this.expandedChildren=N(this.expandedChildren,e))},this.handleToggleCompact=()=>{this.compact=!this.compact}}watchCollapsible(e){T.apply(e,e=>this.setRenderProp(`collapsible`,e))}watchHasCompactButton(e){E.apply(e,e=>this.setRenderProp(`hasCompactButton`,e))}watchHasIconsWhenExpanded(e){D.apply(e,e=>this.setRenderProp(`hasIconsWhenExpanded`,e))}watchHideLabel(e){_.apply(e,e=>{this.compact=e})}watchLabel(e){this.applyLabel(e)}watchLinks(t){O.apply(t,e=>this.setRenderProp(`links`,e)),e(`[KolNav] The navigation structure is not yet validated recursively.`),this.expandedChildren=M(this.getRenderProp(`links`))}componentWillLoad(){this.initRenderProps(k),this.watchCollapsible(this._collapsible),this.watchHideLabel(this._hideLabel),this.watchHasCompactButton(this._hasCompactButton),this.watchHasIconsWhenExpanded(this._hasIconsWhenExpanded),this.applyLabel(this._label,!0),this.watchLinks(this._links)}componentDidRender(){this.buttonItems.endRender(),this.linkItems.endRender()}disconnectedCallback(){b(this.getRenderProp(`label`)),this.buttonItems.destroy(),this.linkItems.destroy()}applyLabel(e,n=!1){n||b(this.getRenderProp(`label`)),g.apply(e,e=>this.setRenderProp(`label`,e)),t(e),x(this.getRenderProp(`label`))}render(){return this.buttonItems.beginRender(),this.linkItems.beginRender(),n(a,{key:`94099a0fe9892e70337d72f3a3ef7fe8b11eb037`},n(R,{key:`d809270df21ecfa8ea283a0b57abdfd78f6e2d94`,collapsible:this.getRenderProp(`collapsible`),compact:this.compact,expandedChildren:this.expandedChildren,getButtonFcProps:this.getButtonFcProps,getLinkFcProps:this.getLinkFcProps,handleToggleCompact:this.handleToggleCompact,handleToggleExpansion:this.handleToggleExpansion,hasCompactButton:this.getRenderProp(`hasCompactButton`),hasIconsWhenExpanded:this.getRenderProp(`hasIconsWhenExpanded`),label:this.getRenderProp(`label`),links:this.getRenderProp(`links`),listId:this.listId,navId:this.navId}))}get host(){return o(this)}static get watchers(){return{_collapsible:[`watchCollapsible`],_hasCompactButton:[`watchHasCompactButton`],_hasIconsWhenExpanded:[`watchHasIconsWhenExpanded`],_hideLabel:[`watchHideLabel`],_label:[`watchLabel`],_links:[`watchLinks`]}}};B.style={default:z};export{B as kol_nav};