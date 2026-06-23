import{B as e,o as t,r as n,s as r,y as i}from"./index-BlBPbof5.js";import{n as a}from"./dev.utils--sxWcqPK-CIJUe8Xl.js";import"./normalizers-DQHMHf5k-DiypBPae.js";import"./label-DoKA2G5H--vvpcRS3.js";import"./base-controller-CasHQmZc-wERigD3B.js";import{t as o}from"./base-web-component-BT6jbe_v-Vp21XLG3.js";import{n as s}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as c}from"./clsx-COFh-Vc8-alQuJLqj.js";import"./component-DgHpRLqh-C-J7q_tY.js";import"./align-BAw_Pz6R-DiOBbmDw.js";import"./controller-Cq7rOj58-BnF60kT4.js";import"./component-B2JV-0-F-DpiLo-kv.js";import"./label-with-expert-slot-B4CxtEy6-W8hd1aH9.js";import"./name-DecN4dTq-C7RIBh6J.js";import{t as l}from"./controller-BuYOBsT2-BKK2kTO3.js";import{t as u}from"./render-rkLHkzsx-DZ0ndMbZ.js";import"./Heading-B2awUN98-Cilz7lFl.js";import{t as d}from"./i18n-Bk8ltJJF-AygzQkXh.js";import{t as f}from"./Alert-DSjgUyfs-8YwfzDU6.js";var p=e=>{var{status:n,toast:r,onClose:i,closeButtonCtrl:a}=e,o=s(e,[`status`,`toast`,`onClose`,`closeButtonCtrl`]);let l=a??u(`toast-close-${r.label}`),{type:d,label:p,description:m,variant:h}=r;return t(`div`,{class:c(`kol-toast-item`,`kol-toast-item--${n}`)},t(f,{class:`kol-toast-item__alert`,alert:!0,label:p,level:0,hasCloser:!0,type:d,variant:h||`card`,onCloserClick:i,closeButtonCtrl:l},t(`div`,Object.assign({},o),m)))},m=`@charset "UTF-8";
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
@layer kol-component {
  :host {
    display: block;
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
    min-height: var(--a11y-min-size);
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-alert .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-alert .kol-button__button {
    color: inherit;
    display: flex;
    flex: 1;
    /* The user agent styles of <button> do not inherit font and color. */
    font: inherit;
    text-decoration-line: none;
  }
  .kol-alert .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-alert {
    display: grid;
  }
  .kol-alert__container {
    display: flex;
    place-items: center;
  }
  .kol-alert__container-content {
    flex-grow: 1;
  }
  .kol-alert__closer {
    /* Visible with forced colors */
    outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));
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
}`,h=300,g=class{constructor(e){r(this,e),this.state={_toastStates:[]},this.translateToastCloseAll=d(`kol-toast-close-all`),this.toastCloseButtonCtrls=new Map,this.knownRenderFunctions=new Set}getToastCloseButtonCtrl(e){let t=this.toastCloseButtonCtrls.get(e);return t||(t=new l(o.stateLess),this.toastCloseButtonCtrls.set(e,t)),t}componentWillLoad(){e.warn(`kol-toast-container is deprecated and will be removed in the next major version. Use kol-alert for inline notifications or kol-dialog for interactive messages instead. See https://github.com/public-ui/kolibri/issues/8372`)}async enqueue(e){let t={toast:Object.assign(Object.assign({},e),{variant:`card`}),status:`adding`,id:a(`toast`)};return this.state=Object.assign(Object.assign({},this.state),{_toastStates:[t,...this.state._toastStates]}),setTimeout(()=>{this.state=Object.assign(Object.assign({},this.state),{_toastStates:this.state._toastStates.map(e=>e.id===t.id&&e.status!==`removing`?Object.assign(Object.assign({},e),{status:`settled`}):e)})},h),()=>{this.handleClose(t)}}handleClose(e){let t=this.state._toastStates.find(t=>t.id===e.id);!t||t.status===`removing`||(this.state=Object.assign(Object.assign({},this.state),{_toastStates:this.state._toastStates.map(t=>t.id===e.id?Object.assign(Object.assign({},t),{status:`removing`}):t)}),setTimeout(()=>{var t,n;this.state=Object.assign(Object.assign({},this.state),{_toastStates:this.state._toastStates.filter(t=>t.id!==e.id)}),typeof e.toast.render==`function`&&this.knownRenderFunctions.delete(e.toast.render),(n=(t=e.toast).onClose)==null||n.call(t)},h))}async closeAll(e=!1){if(e)this.state=Object.assign(Object.assign({},this.state),{_toastStates:[]}),this.knownRenderFunctions.clear();else{let e=[...this.state._toastStates];this.state=Object.assign(Object.assign({},this.state),{_toastStates:e.map(e=>Object.assign(Object.assign({},e),{status:`removing`}))}),setTimeout(()=>{this.state=Object.assign(Object.assign({},this.state),{_toastStates:this.state._toastStates.filter(t=>e.every(e=>e.id!==t.id))}),e.forEach(e=>{var t,n;typeof e.toast.render==`function`&&this.knownRenderFunctions.delete(e.toast.render),(n=(t=e.toast).onClose)==null||n.call(t)})},h)}}handleToastRef(e,t){t&&typeof e.toast.render==`function`&&!this.knownRenderFunctions.has(e.toast.render)&&(this.knownRenderFunctions.add(e.toast.render),e.toast.render(t,{close:()=>this.handleClose(e)}))}render(){return t(n,{key:`7c27d4f2ec88cf9fb250a235020aca08723760c6`,class:`kol-toast-container`},this.state._toastStates.length>1&&t(i,{key:`5bcc9a2666d5c2ee14542b409624feef6c8032fe`,_label:this.translateToastCloseAll,class:`kol-toast-container__button-close-all`,_on:{onClick:()=>{this.closeAll()}}}),this.state._toastStates.map(e=>t(p,{key:e.id,onClose:()=>this.handleClose(e),ref:t=>this.handleToastRef(e,t),toast:e.toast,status:e.status,closeButtonCtrl:this.getToastCloseButtonCtrl(e.id)})))}};g.style={default:m};export{g as kol_toast_container};