import{L as e,g as t,o as n,r,s as i}from"./index-CTo1d1UL.js";import{n as a}from"./dev.utils-CNUPRHqD-CYX3Yyzu.js";import"./base-web-component--IgFgz37-CZuvR3uB.js";import{n as o}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as s}from"./clsx-COFh-Vc8-DWAop4cA.js";import"./Heading-B3ff7tJb-CSNJWtbP.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-Cjgf2IMC-DJikx1Sh.js";import{t as c}from"./i18n-BQHGsG9x-DOhZ8v45.js";import"./component-_umTbs5q-BBrGWCFk.js";import{t as l}from"./Alert-DYFrIYAu-TQ6ZddxD.js";import"./variant-quote-BOqtghM5-BmHDI9BB.js";import"./component-D8Ih3vau-D1_ekkCb.js";var u=e=>{var{status:t,toast:r,onClose:i}=e,a=o(e,[`status`,`toast`,`onClose`]);let{type:c,label:u,description:d,variant:f}=r;return n(`div`,{class:s(`kol-toast-item`,`kol-toast-item--${t}`)},n(l,{class:`kol-toast-item__alert`,alert:!0,label:u,level:0,hasCloser:!0,type:c,variant:f||`card`,onCloserClick:i},n(`div`,Object.assign({},a),d)))},d=`@charset "UTF-8";
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
@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1789047538051"); /* IE9*/
  src: url("kolicons.eot?t=1789047538051#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1789047538051") format("woff2"), url("kolicons.woff?t=1789047538051") format("woff"), url("kolicons.ttf?t=1789047538051") format("truetype"), url("kolicons.svg?t=1789047538051#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-alert .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-alert :host {
    display: inline-block;
  }
  .kol-alert .kol-button {
    display: flex;
    height: 100%;
    min-height: var(--a11y-min-size);
    text-decoration-line: none;
    /* The interactive element is the flex container positioning the text, so it carries the
       box the root element used to be. The UA default underline sits on that element too,
       so suppressing \`text-decoration\` on the wrapper alone is not enough. */
  }
  .kol-alert .kol-button__interactive-element {
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
  .kol-alert .kol-button__interactive-element::before {
    content: "​";
  }
  .kol-alert .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-alert .kol-button {
    /* The tooltip wrapper holds only the absolutely positioned floating tooltip. In the legacy
       DOM it sat in a block flow and collapsed to zero height; as a flex/grid item it would
       stretch to the container height instead, adding phantom rows to the layout. */
  }
  .kol-alert .kol-button__tooltip {
    height: 0;
  }
  .kol-alert .kol-button--external-link > .kolicon-link-external::before {
    content: none;
  }
  .kol-alert .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {
    content: none;
  }
  .kol-alert {
    display: grid;
    grid-template-areas: "icon heading close" "icon content close";
    grid-template-columns: min-content 1fr min-content;
    grid-template-rows: min-content min-content;
  }
  .kol-alert__icon {
    grid-area: icon;
  }
  .kol-alert__heading {
    grid-area: heading;
  }
  .kol-alert__closer {
    /* Visible with forced colors */
    outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));
    grid-area: close;
  }
  .kol-alert__content {
    grid-area: content;
  }
  :host {
    display: flex;
    position: fixed;
    z-index: 200;
    max-width: 90vw;
    flex-direction: column;
  }
  .kol-toast-container__close-all {
    align-self: flex-end;
  }
}`,f=300,p=class{constructor(e){i(this,e),this.state={_toastStates:[]},this.translateToastCloseAll=c(`kol-toast-close-all`),this.knownRenderFunctions=new Set}componentWillLoad(){e.warn(`kol-toast-container is deprecated and will be removed in the next major version. Use kol-alert for inline notifications or kol-dialog for interactive messages instead. See https://github.com/public-ui/kolibri/issues/8372`)}async enqueue(e){let t={toast:Object.assign(Object.assign({},e),{variant:`card`}),status:`adding`,id:a(`toast`)};return this.state=Object.assign(Object.assign({},this.state),{_toastStates:[t,...this.state._toastStates]}),setTimeout(()=>{this.state=Object.assign(Object.assign({},this.state),{_toastStates:this.state._toastStates.map(e=>e.id===t.id&&e.status!==`removing`?Object.assign(Object.assign({},e),{status:`settled`}):e)})},f),()=>{this.handleClose(t)}}handleClose(e){let t=this.state._toastStates.find(t=>t.id===e.id);!t||t.status===`removing`||(this.state=Object.assign(Object.assign({},this.state),{_toastStates:this.state._toastStates.map(t=>t.id===e.id?Object.assign(Object.assign({},t),{status:`removing`}):t)}),setTimeout(()=>{var t,n;this.state=Object.assign(Object.assign({},this.state),{_toastStates:this.state._toastStates.filter(t=>t.id!==e.id)}),typeof e.toast.render==`function`&&this.knownRenderFunctions.delete(e.toast.render),(n=(t=e.toast).onClose)==null||n.call(t)},f))}async closeAll(e=!1){if(e)this.state=Object.assign(Object.assign({},this.state),{_toastStates:[]}),this.knownRenderFunctions.clear();else{let e=[...this.state._toastStates];this.state=Object.assign(Object.assign({},this.state),{_toastStates:e.map(e=>Object.assign(Object.assign({},e),{status:`removing`}))}),setTimeout(()=>{this.state=Object.assign(Object.assign({},this.state),{_toastStates:this.state._toastStates.filter(t=>e.every(e=>e.id!==t.id))}),e.forEach(e=>{var t,n;typeof e.toast.render==`function`&&this.knownRenderFunctions.delete(e.toast.render),(n=(t=e.toast).onClose)==null||n.call(t)})},f)}}handleToastRef(e,t){t&&typeof e.toast.render==`function`&&!this.knownRenderFunctions.has(e.toast.render)&&(this.knownRenderFunctions.add(e.toast.render),e.toast.render(t,{close:()=>this.handleClose(e)}))}render(){return n(r,{key:`6c17bfb6c43ccdde16a75e7eb6e4a9bada6c88af`,class:`kol-toast-container`},this.state._toastStates.length>1&&n(t,{key:`84c6f192097a99f2630b86a7c4127e46111e7f87`,_label:this.translateToastCloseAll,class:`kol-toast-container__button-close-all`,_on:{onClick:()=>{this.closeAll()}}}),this.state._toastStates.map(e=>n(u,{key:e.id,onClose:()=>this.handleClose(e),ref:t=>this.handleToastRef(e,t),toast:e.toast,status:e.status})))}};p.style={default:d};export{p as kol_toast_container};