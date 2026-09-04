import{L as e,g as t,o as n,r,s as i}from"./index-CmgDfNB2.js";import{n as a}from"./dev.utils-Dw8Wdn1n-pTgv5Ihh.js";import"./base-web-component-D909Fl-Y-DjL1hhrh.js";import{n as o}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as s}from"./clsx-COFh-Vc8-DWAop4cA.js";import"./Heading-CLXL0lEH-BN-9WZhL.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-BNeak4hj-CIsUTWj8.js";import{t as c}from"./i18n-CvFPh0g5-C5KXt9nk.js";import"./component-CyyWUgF7-BiicH-gP.js";import{t as l}from"./Alert-xWdv57mh-COpxwjNT.js";import"./variant-quote-ClYWonZq-BDks7t6m.js";import"./component-Ds6OgYtO-B0ZKSnSx.js";var u=e=>{var{status:t,toast:r,onClose:i}=e,a=o(e,[`status`,`toast`,`onClose`]);let{type:c,label:u,description:d,variant:f}=r;return n(`div`,{class:s(`kol-toast-item`,`kol-toast-item--${t}`)},n(l,{class:`kol-toast-item__alert`,alert:!0,label:u,level:0,hasCloser:!0,type:c,variant:f||`card`,onCloserClick:i},n(`div`,Object.assign({},a),d)))},d=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1788507042339"); /* IE9*/
  src: url("kolicons.eot?t=1788507042339#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1788507042339") format("woff2"), url("kolicons.woff?t=1788507042339") format("woff"), url("kolicons.ttf?t=1788507042339") format("truetype"), url("kolicons.svg?t=1788507042339#kolicons") format("svg"); /* iOS 4.1- */
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
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-alert .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-alert .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-alert .kol-button {
    /* The link skeleton renders the anchor as \`.kol-link__anchor\` inside the \`.kol-link\`
       wrapper. The UA default underline sits on the anchor itself, so suppressing
       \`text-decoration\` on the wrapper alone is not enough. The remaining declarations
       restore the box the root element was before the skeleton migration. */
  }
  .kol-alert .kol-button__anchor {
    display: flex;
    text-align: left;
    text-decoration-line: none;
    /* The zero-width baseline character used to live on the root element, which was the
       flex container positioning the text. In the link skeleton the anchor is that
       container, so the character has to move with it — otherwise the text sits 1px off. */
  }
  .kol-alert .kol-button__anchor::before {
    content: "​";
  }
  .kol-alert .kol-button--external-link > .kolicon-link-external::before, .kol-alert .kol-button--external-link .kol-button__anchor > .kolicon-link-external::before {
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
}`,f=300,p=class{constructor(e){i(this,e),this.state={_toastStates:[]},this.translateToastCloseAll=c(`kol-toast-close-all`),this.knownRenderFunctions=new Set}componentWillLoad(){e.warn(`kol-toast-container is deprecated and will be removed in the next major version. Use kol-alert for inline notifications or kol-dialog for interactive messages instead. See https://github.com/public-ui/kolibri/issues/8372`)}async enqueue(e){let t={toast:Object.assign(Object.assign({},e),{variant:`card`}),status:`adding`,id:a(`toast`)};return this.state=Object.assign(Object.assign({},this.state),{_toastStates:[t,...this.state._toastStates]}),setTimeout(()=>{this.state=Object.assign(Object.assign({},this.state),{_toastStates:this.state._toastStates.map(e=>e.id===t.id&&e.status!==`removing`?Object.assign(Object.assign({},e),{status:`settled`}):e)})},f),()=>{this.handleClose(t)}}handleClose(e){let t=this.state._toastStates.find(t=>t.id===e.id);!t||t.status===`removing`||(this.state=Object.assign(Object.assign({},this.state),{_toastStates:this.state._toastStates.map(t=>t.id===e.id?Object.assign(Object.assign({},t),{status:`removing`}):t)}),setTimeout(()=>{var t,n;this.state=Object.assign(Object.assign({},this.state),{_toastStates:this.state._toastStates.filter(t=>t.id!==e.id)}),typeof e.toast.render==`function`&&this.knownRenderFunctions.delete(e.toast.render),(n=(t=e.toast).onClose)==null||n.call(t)},f))}async closeAll(e=!1){if(e)this.state=Object.assign(Object.assign({},this.state),{_toastStates:[]}),this.knownRenderFunctions.clear();else{let e=[...this.state._toastStates];this.state=Object.assign(Object.assign({},this.state),{_toastStates:e.map(e=>Object.assign(Object.assign({},e),{status:`removing`}))}),setTimeout(()=>{this.state=Object.assign(Object.assign({},this.state),{_toastStates:this.state._toastStates.filter(t=>e.every(e=>e.id!==t.id))}),e.forEach(e=>{var t,n;typeof e.toast.render==`function`&&this.knownRenderFunctions.delete(e.toast.render),(n=(t=e.toast).onClose)==null||n.call(t)})},f)}}handleToastRef(e,t){t&&typeof e.toast.render==`function`&&!this.knownRenderFunctions.has(e.toast.render)&&(this.knownRenderFunctions.add(e.toast.render),e.toast.render(t,{close:()=>this.handleClose(e)}))}render(){return n(r,{key:`bb343983a732cab5a48df025126018dc09de4b9b`,class:`kol-toast-container`},this.state._toastStates.length>1&&n(t,{key:`642bf68d61ec6344ab5ff907e2802b1c3189eb8c`,_label:this.translateToastCloseAll,class:`kol-toast-container__button-close-all`,_on:{onClick:()=>{this.closeAll()}}}),this.state._toastStates.map(e=>n(u,{key:e.id,onClose:()=>this.handleClose(e),ref:t=>this.handleToastRef(e,t),toast:e.toast,status:e.status})))}};p.style={default:d};export{p as kol_toast_container};