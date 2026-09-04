import{t as e}from"./tooltip-open-tracking-D3tCiiGP-CEtn2Gu2.js";import{a as t,bt as n,c as r,l as i,o as a,r as o,s,v as c}from"./index-DiPdr7ay.js";import{n as l}from"./dev.utils-Dw8Wdn1n-BuPvI6TV.js";import{t as u}from"./clsx-COFh-Vc8-DWAop4cA.js";import{r as d}from"./label-w3T7Y2ih-MXeWUBmb.js";import{t as f}from"./open-BRQrMgjX-CGmr7iF5.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-YTKt4bXw-DEKe-t3S.js";import"./level-Da98N0S6-B96O8ORU.js";import{t as p}from"./validation-CLARYRy--Df43R61y.js";import{t as m}from"./has-closer-DoXfZcmn-9knsKZo_.js";import{n as h}from"./align-C8fl12z_-B7TgRDY0.js";import{n as g,t as _}from"./scroll-lock-BWDLIEQu-CykNS5eN.js";var v=`@charset "UTF-8";
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
@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1788518264931"); /* IE9*/
  src: url("kolicons.eot?t=1788518264931#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1788518264931") format("woff2"), url("kolicons.woff?t=1788518264931") format("woff"), url("kolicons.ttf?t=1788518264931") format("truetype"), url("kolicons.svg?t=1788518264931#kolicons") format("svg"); /* iOS 4.1- */
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
    height: 100%;
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
  .kol-card .kol-button {
    /* The link skeleton renders the anchor as \`.kol-link__anchor\` inside the \`.kol-link\`
       wrapper. The UA default underline sits on the anchor itself, so suppressing
       \`text-decoration\` on the wrapper alone is not enough. The remaining declarations
       restore the box the root element was before the skeleton migration. */
  }
  .kol-card .kol-button__anchor {
    display: flex;
    text-align: left;
    text-decoration-line: none;
    /* The zero-width baseline character used to live on the root element, which was the
       flex container positioning the text. In the link skeleton the anchor is that
       container, so the character has to move with it — otherwise the text sits 1px off. */
  }
  .kol-card .kol-button__anchor::before {
    content: "​";
  }
  .kol-card .kol-button--external-link > .kolicon-link-external::before, .kol-card .kol-button--external-link .kol-button__anchor > .kolicon-link-external::before {
    content: none;
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
  .kol-card:has(.kol-card__link) {
    position: relative;
  }
  .kol-card__link::after {
    position: absolute;
    inset: 0;
    content: "";
    cursor: pointer;
  }
  .kol-drawer__dialog {
    padding: 0;
    border: none;
    /* Prevent scroll chaining from scrollable drawer content to the page. */
    overscroll-behavior: contain;
  }
  .kol-drawer__wrapper {
    position: fixed;
    overflow: auto;
    overscroll-behavior: contain;
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
    overscroll-behavior: contain;
  }
}`,y=class{constructor(t){s(this,t),this.cardHeadingId=l(`drawer-heading`),this.isModal=!0,this._cardOn={onClose:()=>void this.close()},this.getWrapperRef=e=>this.dialogWrapperElement=e,this.getRef=e=>{this.dialogElement=e,setTimeout(()=>{this.openOrCloseBasedOnState()})},this._hasCloser=!1,this._level=0,this.state={_label:``,_open:!1,_align:`left`},this.handleCancelEvent=t=>{var n,a;e(t),!t.defaultPrevented&&((a=(n=this.state._on)?.onCancel)==null||a.call(n,t),!t.defaultPrevented&&this.host&&!i(this.host,r.cancel)&&t.preventDefault())},this.handleClose=()=>{g(this),(async()=>{await this.close(),this.handleCloseDialog()})()},this.handleAnimationEnd=e=>{var t,n;e.animationName.includes(`slideOut`)&&((n=(t=this.dialogElement)?.close)==null||n.call(t))}}async show(e=!1){var t,n,a,o,s,c;this.dialogElement?.open||(this.isModal=e,this.state=Object.assign(Object.assign({},this.state),{_open:!0}),e?((n=(t=this.dialogElement)?.showModal)==null||n.call(t),this.dialogElement&&_(this)):(o=(a=this.dialogElement)?.show)==null||o.call(a),(c=(s=this._on)?.onToggle)==null||c.call(s,!0),this.host&&i(this.host,r.toggle))}showModal(){return this.show(!0)}open(){return this.show(!1)}async close(){var e,t;this.state=Object.assign(Object.assign({},this.state),{_open:!1});let n=this.dialogWrapperElement;n&&window.getComputedStyle(n).animationName===`none`&&((t=(e=this.dialogElement)?.close)==null||t.call(e))}renderDialogContent(){let e=this.state._align;return a(c,{ref:this.getWrapperRef,class:u(`kol-drawer__wrapper`,`kol-drawer__wrapper--${e}`,{"kol-drawer__wrapper--open":this.state._open,"kol-drawer__wrapper--is-closing":this.state._open===!1}),_hasCloser:this.state._hasCloser,_headingId:this.cardHeadingId,_label:this.state._label,_level:this._level,_on:this._cardOn},a(`div`,{class:`kol-drawer__content`},a(`slot`,null)))}render(){return a(o,{key:`8f2218daa0a0960efae384b10be3c71aaab3ebbf`,class:`kol-drawer`},a(`dialog`,{key:`33c159c6641455ba89cab8d2fa0b7dd44254adf6`,"aria-labelledby":this.cardHeadingId,"aria-modal":this.isModal?`true`:`false`,class:`kol-drawer__dialog`,onCancel:this.handleCancelEvent,ref:this.getRef},this.renderDialogContent()))}validateLabel(e){d(this,e,{required:!0})}validateAlign(e){h(this,e)}validateHasCloser(e){m(this,e)}validateLevel(e){p(this,e)}validateOpen(e){typeof e==`boolean`&&(f(this,e),this.dialogElement&&this.openOrCloseBasedOnState())}async openOrCloseBasedOnState(){this.state._open?await this.show(this.isModal):await this.close()}validateOn(e){if(typeof e==`object`&&e){let t={};typeof e.onCancel==`function`&&(t.onCancel=e.onCancel),typeof e.onClose==`function`&&(t.onClose=e.onClose),typeof e.onToggle==`function`&&(t.onToggle=e.onToggle),n(this,`_on`,t)}}handleCloseDialog(){var e,t,n,a;(t=(e=this._on)?.onClose)==null||t.call(e),(a=(n=this._on)?.onToggle)==null||a.call(n,!1),this.host&&(i(this.host,r.close),i(this.host,r.toggle))}componentDidLoad(){var e,t;(e=this.dialogElement)==null||e.addEventListener(`animationend`,this.handleAnimationEnd),(t=this.dialogElement)==null||t.addEventListener(`close`,this.handleClose)}disconnectedCallback(){var e,t;(e=this.dialogElement)==null||e.removeEventListener(`animationend`,this.handleAnimationEnd),(t=this.dialogElement)==null||t.removeEventListener(`close`,this.handleClose),g(this)}componentWillLoad(){this.validateAlign(this._align),this.validateHasCloser(this._hasCloser),this.validateLabel(this._label),this.validateOpen(this._open),this.validateLevel(this._level),this.validateOn(this._on)}get host(){return t(this)}static get watchers(){return{_label:[`validateLabel`],_align:[`validateAlign`],_hasCloser:[`validateHasCloser`],_level:[`validateLevel`],_open:[`validateOpen`],_on:[`validateOn`]}}};y.style={default:v};export{y as kol_drawer};