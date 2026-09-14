import{a as e,c as t,d as n,o as r,r as i,s as a,u as o,v as s}from"./index-BHAW7mHr.js";import{n as c,t as l}from"./dev.utils-T67xDnhC-BbeYXpe9.js";import{t as u}from"./base-web-component--IgFgz37-CZuvR3uB.js";import{t as d}from"./tslib.es6-DQVO_XFF-DpzS01Oy.js";import{t as f}from"./clsx-COFh-Vc8-DWAop4cA.js";import{n as p}from"./Heading-CqlfR_Ej-t7BDz6zq.js";import"./label-BIbocgr4-CqTGEGEZ.js";import{n as m,r as h,t as g}from"./element-interaction-BPnZMkX0-KKKn0vhi.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import{i as _,n as v}from"./normalizers-DBL3hh2G-CdYiWrjc.js";import{n as y}from"./level-CMVN24DT-CA9jHsxP.js";import{t as b}from"./label-JwY15DCd-D0dwg-r3.js";import"./variant-quote-C5LHgumW-DADjho2_.js";import{n as x,t as S}from"./component-BuDblEok-DIEhxgB-.js";function C(e){if(typeof e==`object`&&e)return e;throw Error(`Invalid on callbacks: expected object, got ${typeof e}`)}var w=v(`on`,{},C),T=v(`open`,!1,_),E={optional:[w,x,y,T],required:[b]},D=n.forBlock(`kol-details`),O=({controlId:e,disabled:t,handleToggle:n,headingId:i,label:a,level:o,open:c,refHeadingButton:l},u)=>{let d=p(o);return r(S,{block:`kol-details`,class:f(`collapsible`,{"collapsible--disabled":t===!0,"collapsible--open":c===!0})},r(d,{class:f(`kol-headline`,`kol-headline--${d}`,`collapsible__heading`,D(`heading`),`kol-headline--single`)},r(s,{class:f(`collapsible__heading-button`,D(`heading-button`)),id:i,ref:l,slot:`expert`,_ariaControls:e,_ariaExpanded:c,_disabled:t,_icons:`kolicon-chevron-right`,_label:a,_on:{onClick:n}})),r(`div`,{class:f(`collapsible__wrapper`,D(`wrapper`))},r(`div`,{class:f(`collapsible__wrapper-animation`,D(`wrapper-animation`))},r(`div`,{"aria-hidden":c===!1?`true`:void 0,"aria-labelledby":i,class:f(`collapsible__content`,D(`content`),`indented-text`),id:e,role:`region`},u))))},k=`@charset "UTF-8";
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
    .kol-button:focus-visible,
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
/* For animation technique see https://css-tricks.com/css-grid-can-do-auto-height-transitions/ */
@layer kol-component {
  @media (prefers-reduced-motion) {
    .collapsible__wrapper-animation, .collapsible__wrapper {
      transition: none !important;
    }
  }
  .collapsible {
    /* @see https://github.com/public-ui/kolibri/issues/5952 */
  }
  @media print {
    :not(.collapsible--open) .collapsible__wrapper-animation {
      display: none;
    }
  }
  .collapsible__wrapper {
    /* Forces the element into its own GPU compositing layer (via 3D transform). Helps prevent rendering/layout bugs (e.g. #7511) and may improve animation performance. */
    transform: translateZ(0);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s;
  }
  .collapsible__wrapper-animation {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
    min-height: 0;
    /* This property is important to keep in sync with the visual transition (template-rows). Without it interactive elements within the accordion would stay focusable. */
    visibility: hidden;
    transition: transform 0.3s, opacity 0.3s, visibility 0.3s;
  }
  .collapsible--open .collapsible__wrapper {
    grid-template-rows: 1fr;
  }
  .collapsible--open .collapsible__wrapper-animation {
    opacity: 1;
    transform: scaleY(1);
    visibility: visible;
  }
  .collapsible {
    /*
          * Inside a button, the caption text is always centered.
          * So we have to align the text to the left.
          */
  }
  .collapsible__heading-button button .kol-span {
    align-items: flex-start;
  }
  .collapsible__heading-button button .kol-span__container {
    text-align: left;
  }
  .collapsible--open:focus-within {
    position: relative;
    z-index: 100;
  }
}
@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1789346416912"); /* IE9*/
  src: url("kolicons.eot?t=1789346416912#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1789346416912") format("woff2"), url("kolicons.woff?t=1789346416912") format("woff"), url("kolicons.ttf?t=1789346416912") format("truetype"), url("kolicons.svg?t=1789346416912#kolicons") format("svg"); /* iOS 4.1- */
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
  :host {
    display: inline-block;
  }
  .kol-button {
    display: flex;
    height: 100%;
    min-height: var(--a11y-min-size);
    text-decoration-line: none;
    /* The interactive element is the flex container positioning the text, so it carries the
       box the root element used to be. The UA default underline sits on that element too,
       so suppressing \`text-decoration\` on the wrapper alone is not enough. */
  }
  .kol-button__interactive-element {
    display: flex;
    flex: 1;
    text-align: left;
    text-decoration-line: none;
    /* A flex container only exposes a baseline if it has an in-flow text box to derive one
       from; without it the surrounding inline formatting context falls back to the bottom
       margin edge and everything after the element shifts by 1px. The zero-width space
       supplies that box. Measured, not assumed: removing it turns \`popover-button/inline\`
       and \`input-file/basic\` red against the develop baseline (the box grows 179→180px). */
  }
  .kol-button__interactive-element::before {
    content: "​";
  }
  .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-button {
    /* The tooltip wrapper holds only the absolutely positioned floating tooltip. In the legacy
       DOM it sat in a block flow and collapsed to zero height; as a flex/grid item it would
       stretch to the container height instead, adding phantom rows to the layout. */
  }
  .kol-button__tooltip {
    height: 0;
  }
  .kol-button--external-link > .kolicon-link-external::before {
    content: none;
  }
  .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {
    content: none;
  }
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .collapsible--open .kol-details__heading-button .kol-icon {
    transform: rotate(90deg);
  }
}`,A=class extends u{constructor(e){super(),a(this,e),this.detailsId=c(`details`),this.ctaRef=g(),this.controlId=l(this.detailsId,`control`),this.headingId=l(this.detailsId,`heading`),this.handleToggle=e=>{this._open=!this._open,clearTimeout(this.toggleTimeout),this.toggleTimeout=setTimeout(()=>{var n,r;this.host&&o(this.host,t.toggle,!!this._open),(r=(n=this.getRenderProp(`on`)).onToggle)==null||r.call(n,e,!!this._open)},25)},this._disabled=!1,this._level=0,this._open=!1}componentWillLoad(){this.initRenderProps(E),this.watchDisabled(this._disabled),this.watchLabel(this._label),this.watchLevel(this._level),this.watchOn(this._on),this.watchOpen(this._open)}async focus(e){}async click(){}render(){return r(i,{key:`7c2487cb5c24155f7524e96615ea27cb17f6bef6`},r(O,{key:`48ee95956646d107ff5e3d8d2ddf7c9c62f857f2`,controlId:this.controlId,disabled:this.getRenderProp(`disabled`),handleToggle:this.handleToggle,headingId:this.headingId,label:this.getRenderProp(`label`),level:this.getRenderProp(`level`),on:this.getRenderProp(`on`),open:this.getRenderProp(`open`),refHeadingButton:this.ctaRef},r(`slot`,{key:`1d79992d66c4380fcb3e4d18fbfdefccfbc538a5`})))}watchDisabled(e){x.apply(e,e=>this.setRenderProp(`disabled`,e))}watchLabel(e){b.apply(e,e=>this.setRenderProp(`label`,e))}watchLevel(e){y.apply(e,e=>this.setRenderProp(`level`,e))}watchOn(e){w.apply(e,e=>this.setRenderProp(`on`,e))}watchOpen(e){T.apply(e,e=>this.setRenderProp(`open`,e))}get host(){return e(this)}static get watchers(){return{_disabled:[`watchDisabled`],_label:[`watchLabel`],_level:[`watchLevel`],_on:[`watchOn`],_open:[`watchOpen`]}}};d([h(`ctaRef`)],A.prototype,`focus`,null),d([m(`ctaRef`)],A.prototype,`click`,null),A.style={default:k};export{A as kol_details};