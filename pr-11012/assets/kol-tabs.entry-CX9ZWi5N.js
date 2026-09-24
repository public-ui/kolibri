import{C as e,X as t,c as n,nt as r,o as i,r as a,s as o,z as s}from"./index-DcDxiC7I-CEwv2uDY.js";import{r as c,t as l}from"./behavior-iJpU4AKD-BJi6HxZW.js";import{i as u,r as d,t as f}from"./index-BWJzRRT_.js";import{i as p,n as m}from"./dev.utils-BRNeztdD-DH8dEXrf.js";import{t as h}from"./base-web-component--IgFgz37-CZuvR3uB.js";import{t as g}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import"./_Uint8Array-CuELS0_2-BYXN1zbF.js";import{d as _,i as v,l as y,o as b,p as x,r as S,s as C}from"./variant-quote-DeZzWGZI-XPOvY9Cp.js";import"./disabled-DPo78Oje-Bbfra81q.js";import"./label-BDgaSpkn-BXm1w35p.js";import"./label-C-mcs1F6-B_mP-OZF.js";import{n as w,r as T,t as E}from"./element-interaction-DkGO5I_0-CYEJb_Yf.js";import"./block-bem-UDOF3rAN-DhTVVOg_.js";import"./component-Bh3trbTp-BislnGmP.js";import"./component-zqA_GCVc-BIQLLxrs.js";import{t as D}from"./i18n-s5q4We3h-Batnr_Eu.js";import{n as O}from"./component-D2A6cZw8-51BNhbu-.js";import"./variant-class-name-D1gM1t9T-BXRaoBLD.js";import"./component-JTlUjHZD-CL4qEEH-.js";import{t as k}from"./component-DWslkzV8-BVweRCxw.js";import"./align-B29XBdiy-DzkYK9to.js";import{t as A}from"./label-with-expert-slot-DQT5alA4-CAEP1nzg.js";import"./variant-Bd451cbV-D95miYy5.js";import"./name-ygfuf6Ck-lKuc-D8j.js";import"./api-DquRPbhk-DjGC205O.js";import{t as j}from"./resolve-props-30YuzYBw-BKL4AJ3P.js";import{n as M}from"./keyboard-DNd73LVa-BCj4IeP3.js";var N=S(`hasCreateButton`,!1,C),P=S(`selected`,0,_),F=[`select-automatic`,`select-manual`],I=S(`behavior`,`select-automatic`,e=>x(e),e=>v(e,F)),L=S(`tabs`,[],e=>b(e),e=>e.every(e=>typeof e==`object`&&!!e&&typeof e._label==`string`&&e._label.length>0),{hints:(e,t)=>r(`KolTabs`,t.length)}),R=S(`on`,{},e=>{let t=y(e),n={};return typeof t.onCreate==`function`&&(n.onCreate=t.onCreate),typeof t.onSelect==`function`&&(n.onSelect=t.onSelect),n}),z={required:[A,L],optional:[c,N,P,I,R]},B=()=>{let e=new l(h.stateLess),n=p(),r,i,a,o,s=(e,t)=>{a&&d(a,e,t)},c=n=>{n.stopPropagation(),e.hideTooltip();let a=r?.on.onClick;typeof a==`function`&&(t(n,o),a(n,i)),s(f.click,i)},u=e=>{var t,n;(n=r==null?void 0:(t=r.on).onMouseDown)==null||n.call(t,e),s(f.mousedown)},m=e=>{var t,n;(n=r==null?void 0:(t=r.on).onFocus)==null||n.call(t,e),s(f.focus)},g=e=>{var t,n;(n=r==null?void 0:(t=r.on).onBlur)==null||n.call(t,e),s(f.blur)},_=e=>{a=e},v=e=>{o=e};return{getButton:(t,a)=>(r=j(t,a),i=t._value,e.componentWillLoad({label:r.label,align:r.tooltipAlign}),{buttonProps:Object.assign(Object.assign({},r),{ariaDescriptionId:n,handleBlur:g,handleClick:c,handleFocus:m,handleMouseDown:u,refButton:v,refTooltip:e.setTooltipElementRef}),refBox:_}),getButtonElement:()=>o,syncListeners:()=>{o&&e.syncListeners(void 0,o,!0)},destroy:()=>{e.destroy()}}},V=u.forBlock(`kol-tabs`),H=V(`button-create`),U=V(`button-group`),W=V(`content`),G=V(`tab`),K=e=>{let{align:t,class:n,createButton:r,handleBlur:i,handleKeyDown:a,hasCreateButton:s,label:c,refContent:l,refRoot:u,tabButtons:d}=e;return o(O,{block:`kol-tabs`,modifiers:{[`align-${t}`]:!0},class:n,ref:u},o(`div`,{"aria-label":c,class:U,role:`tablist`,onKeyDown:a,onBlur:i},d.map(({buttonProps:e,refBox:t})=>o(`div`,{class:G,ref:t},o(k,Object.assign({},e)))),s&&o(`div`,{class:H,ref:r.refBox},o(k,Object.assign({},r.buttonProps)))),o(`div`,{class:W,ref:l}))},q=`@charset "UTF-8";
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
@layer kol-component {
  :host {
    display: block;
  }
}
@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1790254632718"); /* IE9*/
  src: url("kolicons.eot?t=1790254632718#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1790254632718") format("woff2"), url("kolicons.woff?t=1790254632718") format("woff"), url("kolicons.ttf?t=1790254632718") format("truetype"), url("kolicons.svg?t=1790254632718#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-tabs {
    display: var(--display);
    grid-template-columns: var(--grid-template-columns);
    grid-template-rows: var(--grid-template-rows);
  }
  .kol-tabs--align-right {
    --display: grid;
    --grid-template-columns: 1fr auto;
    --button-group-flex-direction: column;
    --button-group-order: 2;
  }
  .kol-tabs--align-left {
    --display: grid;
    --grid-template-columns: auto 1fr;
    --button-group-flex-direction: column;
    --button-group-order: 0;
  }
  .kol-tabs--align-bottom {
    --display: grid;
    --grid-template-rows: 1fr auto;
    --button-group-order: 2;
  }
  .kol-tabs__tabs-align-top {
    --display: grid;
    --grid-template-rows: auto 1fr;
    --button-group-order: 0;
  }
  .kol-tabs__button-group {
    display: flex;
    order: var(--button-group-order);
    flex-direction: var(--button-group-flex-direction);
    flex-wrap: wrap;
  }
  .kol-tabs__button-group .kol-button {
    display: block;
    /* The underline belongs to the interactive element — it carries the UA \`medium\`
       border-width from the shared wc-box styles, so the selected-tab underline keeps
       the exact box it had when the button element itself carried \`kol-button\`. */
  }
  .kol-tabs__button-group .kol-button .kol-button__interactive-element {
    border-bottom-color: transparent;
    border-bottom-style: solid;
  }
  @media (forced-colors: active) {
    .kol-tabs__button-group .kol-button.selected {
      outline: 3px solid Highlight;
      outline-offset: -3px;
      /* The outline sits on the wrapper, but only the inner button can receive focus.
         Matching \`:focus-visible\` on the wrapper itself would never fire, so the
         focused state has to be detected through the interactive element. */
    }
    .kol-tabs__button-group .kol-button.selected:has(.kol-button__interactive-element:focus-visible) {
      outline-style: dashed;
    }
  }
  .kol-tabs__panel {
    height: 100%;
  }
}`,J=class extends h{constructor(t){super(),n(this,t),this.onCreateLabel=`${D(`kol-new`)} …`,this.ctaRef=E(),this.id=m(`tabs`),this.tabButtonItems=[],this.createButtonItem=B(),this.nextPossibleTabIndex=(e,t,n=1)=>{let r=t+n;return r<e.length?e[r]._disabled?this.nextPossibleTabIndex(e,t,n+1):r:t},this.prevPossibleTabIndex=(e,t,n=1)=>{let r=t-n;return r>=0?e[r]._disabled?this.prevPossibleTabIndex(e,t,n+1):r:t},this.selectNextNotDisabledTab=(t,n,r=!0,i)=>{if(t>n.length-1&&(t=n.length-1),t<0&&(t=0),Array.isArray(n)&&n[t]&&n[t]._disabled){if(r===!0){if(t<n.length-1)return this.selectNextNotDisabledTab(t+1,n,!0,i||t);t=i||t,r=!1}if(r===!1){if(t>0)return this.selectNextNotDisabledTab(t-1,n,!1,i||t);e(`[KolTabs] All tabs are disabled, and therefore no tab can be displayed.`)}}return t},this.handleKeyDown=e=>{switch(e.key){case M.ArrowRight:this.goToNextTab(e);break;case M.ArrowLeft:this.goToPreviousTab(e);break;case M.Space:case M.Enter:this.activateFocusedTab(e)}},this.handleBlur=()=>{this.currentFocusIndex=void 0},this.onClickSelect=(e,t)=>{this.selectNextTabEvent(e,t)},this.onMouseDown=e=>{e.preventDefault()},this.tabButtonCallbacks={onClick:this.onClickSelect,onMouseDown:this.onMouseDown},this.onCreate=e=>{var t,n;e.preventDefault(),(n=(t=this.getRenderProp(`on`)).onCreate)==null||n.call(t,e),this.host&&d(this.host,f.create)},this.setRootRef=e=>{this.rootElement=e},this.setContentRef=e=>{this.tabPanelHost=e},this.tabButtons=[],this._align=`top`,this._hasCreateButton=!1,this._selected=0}componentWillLoad(){this.initRenderProps(z),c.apply(this._align,e=>this.setRenderProp(`align`,e)),I.apply(this._behavior,e=>this.setRenderProp(`behavior`,e)),N.apply(this._hasCreateButton,e=>this.setRenderProp(`hasCreateButton`,e)),A.apply(this._label,e=>this.setRenderProp(`label`,e)),R.apply(this._on,e=>this.setRenderProp(`on`,e)),this.applySelected(this._selected),this.applyTabs(this._tabs)}componentWillRender(){this.resolveButtons()}componentDidRender(){this.ctaRef(this.tabButtonItems[this.getRenderProp(`selected`)]?.getButtonElement()),this.tabButtonItems.forEach(e=>e.syncListeners()),this.createButtonItem.syncListeners(),this.refreshTabPanels()}disconnectedCallback(){this.tabButtonItems.forEach(e=>e.destroy()),this.createButtonItem.destroy()}async focus(e){}async click(){}syncSelected(){let e=this.getRenderProp(`tabs`);e.length>0&&this.setRenderProp(`selected`,this.selectNextNotDisabledTab(this.getRenderProp(`selected`),e))}getCurrentFocusIndex(){return typeof this.currentFocusIndex==`number`?this.currentFocusIndex:this.getRenderProp(`selected`)}getKeyboardTabChangeMode(){return this.getRenderProp(`behavior`)===`select-manual`?`selectFocusOnly`:`activateCompletely`}goToNextTab(e){let t=this.nextPossibleTabIndex(this.getRenderProp(`tabs`),this.getCurrentFocusIndex());this.selectNextTabEvent(e,t,this.getKeyboardTabChangeMode())}goToPreviousTab(e){let t=this.prevPossibleTabIndex(this.getRenderProp(`tabs`),this.getCurrentFocusIndex());this.selectNextTabEvent(e,t,this.getKeyboardTabChangeMode())}activateFocusedTab(e){typeof this.currentFocusIndex==`number`&&this.onSelect(e,this.currentFocusIndex)}selectNextTabEvent(e,t,n=`activateCompletely`){var r,i;this.currentFocusIndex=t,this.focusTabById(t),n===`activateCompletely`&&(this._selected=t,(i=(r=this.getRenderProp(`tabs`)[t]._on)?.onSelect)==null||i.call(r,e,t),this.onSelect(e,t))}focusTabById(e){this.rootElement&&s(`button#${this.id}-tab-${e}`,this.rootElement)?.focus()}onSelect(e,t){var n,r;(r=(n=this.getRenderProp(`on`)).onSelect)==null||r.call(n,e,t),this.host&&d(this.host,f.select,t),this.focusTabById(t)}refreshTabPanels(){if(!this.tabPanelHost)return;for(;this.tabPanelHost.firstChild;)this.tabPanelHost.removeChild(this.tabPanelHost.firstChild);let e=this.getRenderProp(`tabs`);for(let t=0;t<e.length;t++){let e=document.createElement(`div`);e.setAttribute(`aria-labelledby`,`${this.id}-tab-${t}`),e.setAttribute(`id`,`${this.id}-panel-${t}`),e.setAttribute(`role`,`tabpanel`),e.setAttribute(`hidden`,``);let n=document.createElement(`slot`);n.setAttribute(`name`,`tabpanel-slot-${t}`),e.appendChild(n),this.tabPanelHost.appendChild(e),typeof HTMLCollection<`u`&&this.host?.children instanceof HTMLCollection&&this.host?.children[t]&&this.host.children[t].setAttribute(`slot`,`tabpanel-slot-${t}`)}this.updateVisiblePanel()}updateVisiblePanel(){if(!this.tabPanelHost)return;let e=this.getRenderProp(`selected`);Array.from(this.tabPanelHost.children).forEach((t,n)=>{n===e?t.removeAttribute(`hidden`):t.setAttribute(`hidden`,``)})}resolveButtons(){let e=this.getRenderProp(`selected`),t=this.getRenderProp(`tabs`);this.tabButtons=this.tabButtonItems.map((n,r)=>{let i=t[r],a=e===r;return n.getButton({_ariaControls:`${this.id}-panel-${r}`,_ariaSelected:a,_customClass:a?`selected`:``,_disabled:i._disabled,_hideLabel:i._hideLabel,_icons:i._icons,_id:`${this.id}-tab-${r}`,_label:i._label,_on:this.tabButtonCallbacks,_role:`tab`,_tabIndex:a?0:-1,_tooltipAlign:i._tooltipAlign,_value:r,_variant:a?`custom`:void 0},this.host)}),this.createButton=this.createButtonItem.getButton({_icons:`kolicon-plus`,_label:this.onCreateLabel,_on:{onClick:this.onCreate}},this.host)}render(){return o(a,{key:`2fc752c47c8bb7dd074512dc2f850b1aeef1402d`},o(K,{key:`395e5bce92521fec6e7abf614b73c2672ae82878`,align:this.getRenderProp(`align`),behavior:this.getRenderProp(`behavior`),createButton:this.createButton,handleBlur:this.handleBlur,handleKeyDown:this.handleKeyDown,hasCreateButton:this.getRenderProp(`hasCreateButton`),label:this.getRenderProp(`label`),on:this.getRenderProp(`on`),refContent:this.setContentRef,refRoot:this.setRootRef,selected:this.getRenderProp(`selected`),tabButtons:this.tabButtons,tabs:this.getRenderProp(`tabs`)}))}watchAlign(e){c.apply(e,e=>this.setRenderProp(`align`,e))}watchBehavior(e){I.apply(e,e=>this.setRenderProp(`behavior`,e))}watchHasCreateButton(e){N.apply(e,e=>this.setRenderProp(`hasCreateButton`,e))}watchLabel(e){A.apply(e,e=>this.setRenderProp(`label`,e))}watchOn(e){R.apply(e,e=>this.setRenderProp(`on`,e))}watchSelected(e){this.applySelected(e)}watchTabs(e){this.applyTabs(e)}applySelected(e){P.apply(e,e=>{this.setRenderProp(`selected`,e),this.syncSelected()})}applyTabs(e){L.apply(e,e=>{this.setRenderProp(`tabs`,e),this.tabButtonItems.forEach(e=>e.destroy()),this.tabButtonItems=e.map(()=>B()),this.syncSelected()})}get host(){return i(this)}static get watchers(){return{_align:[`watchAlign`],_behavior:[`watchBehavior`],_hasCreateButton:[`watchHasCreateButton`],_label:[`watchLabel`],_on:[`watchOn`],_selected:[`watchSelected`],_tabs:[`watchTabs`]}}};g([T(`ctaRef`)],J.prototype,`focus`,null),g([w(`ctaRef`)],J.prototype,`click`,null),J.style={default:q};export{J as kol_tabs};