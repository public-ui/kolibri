import{Ct as e,a as t,c as n,d as r,f as i,o as a,r as o,s,x as c}from"./index-ClDhhhWK.js";import{n as l}from"./dev.utils-W9Q9EkQD-CX8-AdHj.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-B5NKuJgN-EPBKHE7w.js";import{t as u}from"./clsx-COFh-Vc8-alQuJLqj.js";import{n as d}from"./align-DdWzcKWR-BMLiUCDd.js";import{r as f}from"./label-BiOix5de-BxYtIaZ9.js";import{t as p}from"./open-DZ2Z5a7z-7q6CCEZC.js";import"./level-Kr0RFikR-IpKEQm7o.js";import{t as m}from"./validation-D_PYegRV-B_qdjdBr.js";import{t as h}from"./has-closer-COzVY-FT-CF0Fviqc.js";var g=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1781712336733"); /* IE9*/
  src: url("kolicons.eot?t=1781712336733#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1781712336733") format("woff2"), url("kolicons.woff?t=1781712336733") format("woff"), url("kolicons.ttf?t=1781712336733") format("truetype"), url("kolicons.svg?t=1781712336733#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-card .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-card :host {
    display: inline-block;
  }
  .kol-card .kol-button {
    display: flex;
    min-height: var(--a11y-min-size);
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-card .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-card .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-card {
    /* Visible with forced colors  */
    outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));
    display: grid;
    height: 100%;
    overflow: visible;
    grid-template-areas: "header  close" "content content";
    grid-template-columns: 1fr min-content;
    grid-template-rows: min-content 1fr;
  }
  .kol-card__header {
    align-self: start;
    grid-area: header;
  }
  .kol-card__content {
    align-self: stretch;
    grid-area: content;
  }
  .kol-card__close-button {
    grid-area: close;
  }
  .kol-drawer__dialog {
    padding: 0;
    border: none;
  }
  .kol-drawer__wrapper {
    position: fixed;
    overflow: auto;
  }
  .kol-drawer__wrapper--left, .kol-drawer__wrapper--right {
    top: 0;
    max-width: 100vw;
    height: 100vh;
  }
  .kol-drawer__wrapper--left .kol-drawer__content, .kol-drawer__wrapper--right .kol-drawer__content {
    height: 100%;
  }
  .kol-drawer__wrapper--left {
    left: 0;
  }
  .kol-drawer__wrapper--right {
    right: 0;
  }
  .kol-drawer__wrapper--bottom, .kol-drawer__wrapper--top {
    left: 0;
    width: 100vw;
    max-height: 100vh;
  }
  .kol-drawer__wrapper--bottom .kol-drawer__content, .kol-drawer__wrapper--top .kol-drawer__content {
    width: 100%;
  }
  .kol-drawer__wrapper--bottom {
    bottom: 0;
  }
  .kol-drawer__wrapper--top {
    top: 0;
  }
  .kol-drawer__content {
    position: relative;
  }
  .kol-drawer__dialog .kol-card__content {
    overflow-y: auto;
  }
}`,_=class{constructor(e){s(this,e),this.cardHeadingId=l(`drawer-heading`),this.isModal=!0,this._cardOn={onClose:()=>void this.close()},this.getWrapperRef=e=>this.dialogWrapperElement=e,this.getRef=e=>{this.dialogElement=e,setTimeout(()=>{this.openOrCloseBasedOnState()})},this._hasCloser=!1,this._level=0,this.state={_label:``,_open:!1,_align:`left`},this.handleCancelEvent=e=>{var t,a;n(e),!e.defaultPrevented&&((a=(t=this.state._on)?.onCancel)==null||a.call(t,e),!e.defaultPrevented&&this.host&&!i(this.host,r.cancel)&&e.preventDefault())},this.handleClose=()=>{(async()=>{await this.close(),this.handleCloseDialog()})()},this.handleAnimationEnd=e=>{var t,n;e.animationName.includes(`slideOut`)&&((n=(t=this.dialogElement)?.close)==null||n.call(t))}}async show(e=!1){var t,n,a,o,s,c;this.dialogElement?.open||(this.isModal=e,this.state=Object.assign(Object.assign({},this.state),{_open:!0}),e?(n=(t=this.dialogElement)?.showModal)==null||n.call(t):(o=(a=this.dialogElement)?.show)==null||o.call(a),(c=(s=this._on)?.onToggle)==null||c.call(s,!0),this.host&&i(this.host,r.toggle))}showModal(){return this.show(!0)}open(){return this.show(!1)}async close(){var e,t;this.state=Object.assign(Object.assign({},this.state),{_open:!1});let n=this.dialogWrapperElement;n&&window.getComputedStyle(n).animationName===`none`&&((t=(e=this.dialogElement)?.close)==null||t.call(e))}renderDialogContent(){let e=this.state._align;return a(c,{ref:this.getWrapperRef,class:u(`kol-drawer__wrapper`,`kol-drawer__wrapper--${e}`,{"kol-drawer__wrapper--open":this.state._open,"kol-drawer__wrapper--is-closing":this.state._open===!1}),_hasCloser:this.state._hasCloser,_headingId:this.cardHeadingId,_label:this.state._label,_level:this._level,_on:this._cardOn},a(`div`,{class:`kol-drawer__content`},a(`slot`,null)))}render(){return a(o,{key:`14aa4c6b978a89943fe8d83901ede517d8ff6032`,class:`kol-drawer`},a(`dialog`,{key:`db250f54f95e8658e6929c3cfd4b2afd21ca62ab`,"aria-labelledby":this.cardHeadingId,"aria-modal":this.isModal?`true`:`false`,class:`kol-drawer__dialog`,onCancel:this.handleCancelEvent,ref:this.getRef},this.renderDialogContent()))}validateLabel(e){f(this,e,{required:!0})}validateAlign(e){d(this,e)}validateHasCloser(e){h(this,e)}validateLevel(e){m(this,e)}validateOpen(e){typeof e==`boolean`&&(p(this,e),this.dialogElement&&this.openOrCloseBasedOnState())}async openOrCloseBasedOnState(){this.state._open?await this.show(this.isModal):await this.close()}validateOn(t){if(typeof t==`object`&&t){let n={};typeof t.onCancel==`function`&&(n.onCancel=t.onCancel),typeof t.onClose==`function`&&(n.onClose=t.onClose),typeof t.onToggle==`function`&&(n.onToggle=t.onToggle),e(this,`_on`,n)}}handleCloseDialog(){var e,t,n,a;(t=(e=this._on)?.onClose)==null||t.call(e),(a=(n=this._on)?.onToggle)==null||a.call(n,!1),this.host&&(i(this.host,r.close),i(this.host,r.toggle))}componentDidLoad(){var e,t;(e=this.dialogElement)==null||e.addEventListener(`animationend`,this.handleAnimationEnd),(t=this.dialogElement)==null||t.addEventListener(`close`,this.handleClose)}disconnectedCallback(){var e,t;(e=this.dialogElement)==null||e.removeEventListener(`animationend`,this.handleAnimationEnd),(t=this.dialogElement)==null||t.removeEventListener(`close`,this.handleClose)}componentWillLoad(){this.validateAlign(this._align),this.validateHasCloser(this._hasCloser),this.validateLabel(this._label),this.validateOpen(this._open),this.validateLevel(this._level),this.validateOn(this._on)}get host(){return t(this)}static get watchers(){return{_label:[`validateLabel`],_align:[`validateAlign`],_hasCloser:[`validateHasCloser`],_level:[`validateLevel`],_open:[`validateOpen`],_on:[`validateOn`]}}};_.style={default:g};export{_ as kol_drawer};