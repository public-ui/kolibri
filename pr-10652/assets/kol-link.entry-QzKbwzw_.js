import{F as e,a as t,c as n,l as r,o as i,r as a,s as o}from"./index-aRATu4Pl.js";import{i as s}from"./dev.utils-DCswsHiU-Dg5aTKKB.js";import{t as c}from"./base-web-component-D909Fl-Y-DjL1hhrh.js";import{t as l}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{n as u,r as d,t as f}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-DWPxOTIP-Cb74UdFl.js";import"./i18n-CrXMv0tS-B9nvhRTV.js";import"./component-DLBYOSTz-BdcUk5MG.js";import"./label-BE6oW-7F-BQDa02hZ.js";import"./variant-quote-CRKM9QG2-DkvOfPuy.js";import"./component-DdA_Jyhk-mLsNqoIL.js";import"./align-BNmcYY75-BGN6tpNG.js";import"./variant-class-name-B0Wpr2i8-bAAzk8iT.js";import"./align-floating-elements-CONjGoNm-B_Z-g46G.js";import{t as p}from"./behavior-Ctzwvpyr-gFWoJeG4.js";import"./component-OuKjRi_b-B2khapBI.js";import{t as m}from"./access-and-short-key-ijzCZfHm-Dx5Q-CAn.js";import{t as h}from"./label-with-expert-slot-3VWute5S-B6b5sgr1.js";import{t as g}from"./href-CBdHcGY_-BZNPiTBC.js";import{_,a as v,b as y,c as b,d as x,f as S,g as C,h as w,i as T,l as E,m as D,n as O,o as k,p as A,r as j,s as M,t as N,u as P,v as F,x as I,y as L}from"./component-CuVX9ezb-DnK9GdUW.js";var R=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1788113546821"); /* IE9*/
  src: url("kolicons.eot?t=1788113546821#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1788113546821") format("woff2"), url("kolicons.woff?t=1788113546821") format("woff"), url("kolicons.ttf?t=1788113546821") format("truetype"), url("kolicons.svg?t=1788113546821#kolicons") format("svg"); /* iOS 4.1- */
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
  :host {
    display: inline-block;
  }
  .kol-link {
    display: inline-flex;
    max-width: fit-content;
  }
  .kol-link--standalone {
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: stretch;
    /* The anchor is the flex container positioning the text — it must stretch its
       content so the text pill keeps the full standalone height. */
  }
  .kol-link--standalone .kol-link__anchor {
    align-items: stretch;
  }
  .kol-link--standalone .kol-link__text {
    display: inline-flex;
    flex: 1 1 100%;
    place-items: center;
  }
  .kol-link__anchor {
    display: inline-flex;
    flex: 1;
    align-items: baseline;
    place-items: center;
    text-align: left;
    text-decoration-line: none;
  }
  .kol-link__anchor:focus:not([aria-disabled], [disabled]) .kol-span__label, .kol-link__anchor:hover:not([aria-disabled], [disabled]) .kol-span__label {
    text-decoration-thickness: 0.2em;
  }
  .kol-link {
    /* Root-level label decoration: the button DOM (button-link) has no \`__anchor\`, so the
       underline must be carried outside the anchor scope — as it was before the migration. */
  }
  .kol-link .kol-span__label {
    text-decoration-line: underline;
  }
  .kol-link:focus:not([aria-disabled], [disabled]) .kol-span__label, .kol-link:hover:not([aria-disabled], [disabled]) .kol-span__label {
    text-decoration-thickness: 0.2em;
  }
  .kol-link__icon {
    display: inline-flex;
  }
}`,z=class extends c{constructor(e){super(),o(this,e),this.ctaRef=f(),this.tooltipBehavior=new p(this.stateAccess),this.handleAnchorClick=e=>{if(this.tooltipBehavior.hideTooltip(),this.getRenderProp(`disabled`)===!0){e.preventDefault();return}let t=this.getRenderProp(`href`),i=this.getRenderProp(`on`);typeof i?.onClick==`function`&&i.onClick(e,t),this.host&&r(this.host,n.click,t)},this.setAnchorRef=e=>{this.ctaRef(e)},this.ariaCurrent=``,this.ariaDescriptionId=s(),this.expertSlot=!1,this._disabled=!1,this._hideLabel=!1,this._inline=!0,this._tooltipAlign=`right`}componentWillLoad(){this.initRenderProps(D),this.setRenderProp(`tabIndex`,void 0),O.apply(this._accessKey,e=>this.setRenderProp(`accessKey`,e)),j.apply(this._ariaControls,e=>this.setRenderProp(`ariaControls`,e)),T.apply(this._ariaCurrentValue,e=>this.setRenderProp(`ariaCurrentValue`,e)),v.apply(this._ariaDescription,e=>this.setRenderProp(`ariaDescription`,e)),k.apply(this._ariaExpanded,e=>this.setRenderProp(`ariaExpanded`,e)),M.apply(this._ariaOwns,e=>this.setRenderProp(`ariaOwns`,e)),b.apply(this._customClass,e=>this.setRenderProp(`customClass`,e)),E.apply(this._disabled,e=>this.setRenderProp(`disabled`,e)),P.apply(this._download,e=>this.setRenderProp(`download`,e)),x.apply(this._hideLabel,e=>this.setRenderProp(`hideLabel`,e)),g.apply(this._href,e=>this.setRenderProp(`href`,e)),F.apply(this._icons,e=>this.setRenderProp(`icons`,e)),S.apply(this._inline,e=>this.setRenderProp(`inline`,e)),this.applyLabel(this._label),A.apply(this._on,e=>this.setRenderProp(`on`,e)),w.apply(this._role,e=>this.setRenderProp(`role`,e)),_.apply(this._shortKey,e=>this.setRenderProp(`shortKey`,e)),typeof this._tabIndex==`number`&&L.apply(this._tabIndex,e=>this.setRenderProp(`tabIndex`,e)),C.apply(this._target,e=>this.setRenderProp(`target`,e)),this.applyTooltipAlign(this._tooltipAlign),I.apply(this._variant,e=>this.setRenderProp(`variant`,e)),m(this._accessKey,this._shortKey),this.unsubscribeOnLocationChange=e(e=>{let t=this.getRenderProp(`href`),n=this.getRenderProp(`ariaCurrentValue`),r=e===t?n:``;this.getState(`ariaCurrent`)!==r&&this.setState(`ariaCurrent`,r)}),this.tooltipBehavior.componentWillLoad({label:this.getTooltipLabel(),align:this.getRenderProp(`tooltipAlign`)})}componentDidRender(){this.ctaRef.el&&this.tooltipBehavior.syncListeners(void 0,this.ctaRef.el,!0)}disconnectedCallback(){this.unsubscribeOnLocationChange&&=(this.unsubscribeOnLocationChange(),void 0),this.tooltipBehavior.destroy()}getTooltipLabel(){let e=this.getRenderProp(`label`);if(typeof e==`string`&&e.length>0)return e;let t=this.getRenderProp(`href`);return typeof t==`string`?t:``}applyLabel(e){h.apply(e,t=>{this.setRenderProp(`label`,t),this.setState(`expertSlot`,e===``),this.tooltipBehavior.watchLabel(this.getTooltipLabel())})}applyTooltipAlign(e){y.apply(e,e=>{this.setRenderProp(`tooltipAlign`,e),this.tooltipBehavior.watchAlign(e)})}async focus(e){}async click(){}render(){return i(a,{key:`3178714ae1410a2aec259c542d739e3a7fe75485`},i(N,{key:`78c99d51e5dc436b24a9ff4fb693bd1401307a5e`,accessKey:this.getRenderProp(`accessKey`),ariaControls:this.getRenderProp(`ariaControls`),ariaCurrent:this.ariaCurrent,ariaCurrentValue:this.getRenderProp(`ariaCurrentValue`),ariaDescription:this.getRenderProp(`ariaDescription`),ariaDescriptionId:this.ariaDescriptionId,ariaExpanded:this.getRenderProp(`ariaExpanded`),ariaOwns:this.getRenderProp(`ariaOwns`),customClass:this.getRenderProp(`customClass`),disabled:this.getRenderProp(`disabled`),download:this.getRenderProp(`download`),handleAnchorClick:this.handleAnchorClick,hideLabel:this.getRenderProp(`hideLabel`),href:this.getRenderProp(`href`),icons:this.getRenderProp(`icons`),inline:this.getRenderProp(`inline`),label:this.getRenderProp(`label`),on:this.getRenderProp(`on`),refAnchor:this.setAnchorRef,refTooltip:this.tooltipBehavior.setTooltipElementRef,role:this.getRenderProp(`role`),shortKey:this.getRenderProp(`shortKey`),tabIndex:this.getRenderProp(`tabIndex`),target:this.getRenderProp(`target`),tooltipAlign:this.getRenderProp(`tooltipAlign`),variant:this.getRenderProp(`variant`),expertSlot:this.expertSlot}))}watchAccessKey(e){O.apply(e,e=>this.setRenderProp(`accessKey`,e))}watchAriaControls(e){j.apply(e,e=>this.setRenderProp(`ariaControls`,e))}watchAriaCurrentValue(e){T.apply(e,e=>this.setRenderProp(`ariaCurrentValue`,e))}watchAriaDescription(e){v.apply(e,e=>this.setRenderProp(`ariaDescription`,e))}watchAriaExpanded(e){k.apply(e,e=>this.setRenderProp(`ariaExpanded`,e))}watchAriaOwns(e){M.apply(e,e=>this.setRenderProp(`ariaOwns`,e))}watchCustomClass(e){b.apply(e,e=>this.setRenderProp(`customClass`,e))}watchDisabled(e){E.apply(e,e=>this.setRenderProp(`disabled`,e))}watchDownload(e){P.apply(e,e=>this.setRenderProp(`download`,e))}watchHideLabel(e){x.apply(e,e=>this.setRenderProp(`hideLabel`,e))}watchHref(e){g.apply(e,e=>this.setRenderProp(`href`,e))}watchIcons(e){F.apply(e,e=>this.setRenderProp(`icons`,e))}watchInline(e){S.apply(e,e=>this.setRenderProp(`inline`,e))}watchLabel(e){this.applyLabel(e)}watchOn(e){A.apply(e,e=>this.setRenderProp(`on`,e))}watchRole(e){w.apply(e,e=>this.setRenderProp(`role`,e))}watchShortKey(e){_.apply(e,e=>this.setRenderProp(`shortKey`,e))}watchTabIndex(e){L.apply(e,e=>this.setRenderProp(`tabIndex`,e))}watchTarget(e){C.apply(e,e=>this.setRenderProp(`target`,e))}watchTooltipAlign(e){this.applyTooltipAlign(e)}watchVariant(e){I.apply(e,e=>this.setRenderProp(`variant`,e))}get host(){return t(this)}static get watchers(){return{_accessKey:[`watchAccessKey`],_ariaControls:[`watchAriaControls`],_ariaCurrentValue:[`watchAriaCurrentValue`],_ariaDescription:[`watchAriaDescription`],_ariaExpanded:[`watchAriaExpanded`],_ariaOwns:[`watchAriaOwns`],_customClass:[`watchCustomClass`],_disabled:[`watchDisabled`],_download:[`watchDownload`],_hideLabel:[`watchHideLabel`],_href:[`watchHref`],_icons:[`watchIcons`],_inline:[`watchInline`],_label:[`watchLabel`],_on:[`watchOn`],_role:[`watchRole`],_shortKey:[`watchShortKey`],_tabIndex:[`watchTabIndex`],_target:[`watchTarget`],_tooltipAlign:[`watchTooltipAlign`],_variant:[`watchVariant`]}}};l([d(`ctaRef`)],z.prototype,`focus`,null),l([u(`ctaRef`)],z.prototype,`click`,null),z.style={default:R};export{z as kol_link};