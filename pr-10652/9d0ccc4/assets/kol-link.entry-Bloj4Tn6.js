import{P as e,W as t,a as n,c as r,l as i,o as a,r as o,s,u as c}from"./index-BSrSGxVB.js";import{t as l}from"./base-web-component-Yd2xtcRx-DLjfgSf5.js";import{t as u}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as d}from"./clsx-COFh-Vc8-alQuJLqj.js";import{n as f,r as p,t as m}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import{i as h,n as g,o as _,r as v,s as y}from"./normalizers-aZN4lreB-CqpVamTR.js";import{t as b}from"./i18n-DSbQzWoo-DJShdSOL.js";import{t as ee}from"./component-DjWJ7XCD-DyYrm1hz.js";import"./label-D-HX3Y2A-DFRIWL9M.js";import"./variant-quote-Jd3iIIas-iPZGx_Oq.js";import{t as te}from"./component-BpqUfUDm-D_GVaXFH.js";import{t as x}from"./align-DwiLkjZt-D_QjZeD6.js";import{t as S}from"./variant-class-name-BKhH70Ir-aOi_plJ7.js";import"./align-floating-elements-DEoNvKdO-BOWcBz0_.js";import{t as C}from"./behavior-CAOdnKjk-C3vBCj9t.js";import{t as ne}from"./component-DLp04GcA-CGFjIVcL.js";import{t as w}from"./access-and-short-key-ijzCZfHm-Dx5Q-CAn.js";import{t as T}from"./label-with-expert-slot-ByMn7Yiv-CQ_1MDFK.js";import{t as E}from"./href-Cbm55r6H-DXNeKWrP.js";var D=g(`accessKey`,``,y),O=g(`ariaControls`,``,y),k=[`date`,`location`,`page`,`step`,`time`,`true`,`false`];function A(e){let t=y(e);return k.includes(t)?t:`page`}var j=g(`ariaCurrentValue`,`page`,A),M=g(`ariaDescription`,``,y),N=g(`ariaExpanded`,!1,v),P=g(`ariaOwns`,``,y),F=/^[a-zA-Z][a-zA-Z0-9_-]{0,60}$/,I=e=>typeof e==`string`&&F.test(e);function re(e){return e===``||I(e)}var L=g(`customClass`,``,y,re),R=g(`disabled`,!1,v),z=g(`download`,``,y),B=g(`hideLabel`,!1,v),V=g(`inline`,!0,v);function ie(e){if(typeof e==`object`&&e)return e;throw Error(`Invalid on callbacks: expected object, got ${typeof e}`)}var H=g(`on`,{},ie),ae=[`tab`,`treeitem`];function U(e){return typeof e==`string`&&ae.includes(e)?e:``}var W=g(`role`,``,U),G=g(`target`,``,y),K=g(`shortKey`,``,y);function q(e){if(!e||typeof e==`string`&&e===``)return{};if(typeof e==`string`)return y(e);if(typeof e==`object`)return _(e);throw Error(`Invalid icons: ${typeof e}`)}function oe(e){return typeof e==`string`?e.length>0:typeof e==`object`&&!!e}var J=g(`icons`,{},q,oe),Y=g(`tabIndex`,0,h);function X(e){let t=y(e);return x.includes(t)?t:`right`}var Z=g(`tooltipAlign`,`right`,X,e=>x.includes(e));function se(e){return Array.isArray(e)?e:typeof e==`string`?e.split(` `):[]}function ce(e){return e.length===0||e.every(I)}var Q=g(`variant`,[],se,ce),le={required:[E],optional:[D,O,j,M,N,P,L,R,z,B,J,V,T,H,W,G,K,Y,Z,Q]},ue=({block:e,modifiers:t,class:n},r)=>{let i=c.forBlock(e);return a(`div`,{class:d(i(t),n)},r)},de=`kol-open-link-in-tab`,fe=e=>{let{accessKey:n,ariaControls:r,ariaCurrent:i,ariaDescription:o,ariaExpanded:s,ariaOwns:c,customClass:l,disabled:u,download:f,handleAnchorClick:p,hideLabel:m,href:h,icons:g,inline:_,label:v,on:y,refAnchor:x,refTooltip:C,role:w,shortKey:T,tabIndex:E,target:D,variant:O,expertSlot:k}=e,A=b(de),j=typeof D==`string`&&D.length>0&&D!==`_self`,M={href:typeof h==`string`&&h.length>0?h:`javascript:void(0);`,target:typeof D==`string`&&D.length>0?D:void 0,rel:j?`noopener`:void 0,download:typeof f==`string`&&f.length>0?f:void 0};m===!0&&!v&&t(`[KolLink] An aria-label must be set when _hide-label is set.`);let N=o?.trim(),P=w||void 0;return a(ue,{block:`kol-link`,class:d({[l]:O.includes(`custom`)&&l.length>0,[S(O,`link`)]:O.length>0}),modifiers:{disabled:u===!0,"external-link":j,"hide-label":m===!0,inline:_===!0,standalone:_===!1}},a(`a`,Object.assign({ref:x},M,{accessKey:n||void 0,"aria-current":i||void 0,"aria-controls":r||void 0,"aria-description":N||void 0,"aria-disabled":u?`true`:void 0,"aria-expanded":typeof s==`boolean`?String(s):void 0,"aria-owns":c||void 0,"aria-label":m&&typeof v==`string`?`${v}${j?` (${A})`:``}`:void 0,"aria-keyshortcuts":T||void 0,class:`kol-link__anchor`},y,{onClick:p,role:P,tabIndex:u?-1:E}),a(te,{class:`kol-link__text`,badgeText:n||T,icons:g,hideLabel:m,label:k?``:v||h},a(`slot`,{name:`expert`,slot:`expert`})),j&&a(ee,{class:`kol-link__icon`,label:m?``:A,icons:`kolicon-link-external`,"aria-hidden":m})),m===!0&&!k&&a(`div`,{class:`kol-link__tooltip`},a(ne,{badgeText:n||T||``,label:typeof v==`string`?v:typeof h==`string`?h:``,refFloating:C})))},pe=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1786030174503"); /* IE9*/
  src: url("kolicons.eot?t=1786030174503#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1786030174503") format("woff2"), url("kolicons.woff?t=1786030174503") format("woff"), url("kolicons.ttf?t=1786030174503") format("truetype"), url("kolicons.svg?t=1786030174503#kolicons") format("svg"); /* iOS 4.1- */
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
  }
  .kol-link--standalone {
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
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
  .kol-link__anchor .kol-span__label {
    text-decoration-line: underline;
  }
  .kol-link__anchor:focus:not([aria-disabled], [disabled]) .kol-span__label, .kol-link__anchor:hover:not([aria-disabled], [disabled]) .kol-span__label {
    text-decoration-thickness: 0.2em;
  }
  .kol-link__icon {
    display: inline-flex;
  }
}`,$=class extends l{constructor(e){super(),s(this,e),this.ctaRef=m(),this.tooltipBehavior=new C(this.stateAccess),this.handleAnchorClick=e=>{if(this.tooltipBehavior.hideTooltip(),this.getRenderProp(`disabled`)===!0){e.preventDefault();return}let t=this.getRenderProp(`href`),n=this.getRenderProp(`on`);typeof n?.onClick==`function`&&n.onClick(e,t),this.host&&i(this.host,r.click,t)},this.setAnchorRef=e=>{this.ctaRef(e)},this.ariaCurrent=``,this.expertSlot=!1,this._disabled=!1,this._hideLabel=!1,this._inline=!0,this._tooltipAlign=`right`}componentWillLoad(){this.initRenderProps(le),D.apply(this._accessKey,e=>this.setRenderProp(`accessKey`,e)),O.apply(this._ariaControls,e=>this.setRenderProp(`ariaControls`,e)),j.apply(this._ariaCurrentValue,e=>this.setRenderProp(`ariaCurrentValue`,e)),M.apply(this._ariaDescription,e=>this.setRenderProp(`ariaDescription`,e)),N.apply(this._ariaExpanded,e=>this.setRenderProp(`ariaExpanded`,e)),P.apply(this._ariaOwns,e=>this.setRenderProp(`ariaOwns`,e)),L.apply(this._customClass,e=>this.setRenderProp(`customClass`,e)),R.apply(this._disabled,e=>this.setRenderProp(`disabled`,e)),z.apply(this._download,e=>this.setRenderProp(`download`,e)),B.apply(this._hideLabel,e=>this.setRenderProp(`hideLabel`,e)),E.apply(this._href,e=>this.setRenderProp(`href`,e)),J.apply(this._icons,e=>this.setRenderProp(`icons`,e)),V.apply(this._inline,e=>this.setRenderProp(`inline`,e)),this.applyLabel(this._label),H.apply(this._on,e=>this.setRenderProp(`on`,e)),W.apply(this._role,e=>this.setRenderProp(`role`,e)),K.apply(this._shortKey,e=>this.setRenderProp(`shortKey`,e)),Y.apply(this._tabIndex,e=>this.setRenderProp(`tabIndex`,e)),G.apply(this._target,e=>this.setRenderProp(`target`,e)),this.applyTooltipAlign(this._tooltipAlign),Q.apply(this._variant,e=>this.setRenderProp(`variant`,e)),w(this._accessKey,this._shortKey),this.unsubscribeOnLocationChange=e(e=>{let t=this.getRenderProp(`href`),n=this.getRenderProp(`ariaCurrentValue`),r=e===t?n:``;this.getState(`ariaCurrent`)!==r&&this.setState(`ariaCurrent`,r)}),this.tooltipBehavior.componentWillLoad({label:this.getTooltipLabel(),align:this.getRenderProp(`tooltipAlign`)})}componentDidRender(){this.ctaRef.el&&this.tooltipBehavior.syncListeners(void 0,this.ctaRef.el,!0)}disconnectedCallback(){this.unsubscribeOnLocationChange&&=(this.unsubscribeOnLocationChange(),void 0),this.tooltipBehavior.destroy()}getTooltipLabel(){let e=this.getRenderProp(`label`);if(typeof e==`string`&&e.length>0)return e;let t=this.getRenderProp(`href`);return typeof t==`string`?t:``}applyLabel(e){T.apply(e,t=>{this.setRenderProp(`label`,t),this.setState(`expertSlot`,e===``),this.tooltipBehavior.watchLabel(this.getTooltipLabel())})}applyTooltipAlign(e){Z.apply(e,e=>{this.setRenderProp(`tooltipAlign`,e),this.tooltipBehavior.watchAlign(e)})}async focus(e){}async click(){}render(){return a(o,{key:`8c5a9a53c4bde69810dcda90e197c6c4903146a0`},a(fe,{key:`efa97ffc6b7ef63eb6cbcb793ac708ccc67dbe88`,accessKey:this.getRenderProp(`accessKey`),ariaControls:this.getRenderProp(`ariaControls`),ariaCurrent:this.ariaCurrent,ariaCurrentValue:this.getRenderProp(`ariaCurrentValue`),ariaDescription:this.getRenderProp(`ariaDescription`),ariaExpanded:this.getRenderProp(`ariaExpanded`),ariaOwns:this.getRenderProp(`ariaOwns`),customClass:this.getRenderProp(`customClass`),disabled:this.getRenderProp(`disabled`),download:this.getRenderProp(`download`),handleAnchorClick:this.handleAnchorClick,hideLabel:this.getRenderProp(`hideLabel`),href:this.getRenderProp(`href`),icons:this.getRenderProp(`icons`),inline:this.getRenderProp(`inline`),label:this.getRenderProp(`label`),on:this.getRenderProp(`on`),refAnchor:this.setAnchorRef,refTooltip:this.tooltipBehavior.setTooltipElementRef,role:this.getRenderProp(`role`),shortKey:this.getRenderProp(`shortKey`),tabIndex:this.getRenderProp(`tabIndex`),target:this.getRenderProp(`target`),tooltipAlign:this.getRenderProp(`tooltipAlign`),variant:this.getRenderProp(`variant`),expertSlot:this.expertSlot}))}watchAccessKey(e){D.apply(e,e=>this.setRenderProp(`accessKey`,e))}watchAriaControls(e){O.apply(e,e=>this.setRenderProp(`ariaControls`,e))}watchAriaCurrentValue(e){j.apply(e,e=>this.setRenderProp(`ariaCurrentValue`,e))}watchAriaDescription(e){M.apply(e,e=>this.setRenderProp(`ariaDescription`,e))}watchAriaExpanded(e){N.apply(e,e=>this.setRenderProp(`ariaExpanded`,e))}watchAriaOwns(e){P.apply(e,e=>this.setRenderProp(`ariaOwns`,e))}watchCustomClass(e){L.apply(e,e=>this.setRenderProp(`customClass`,e))}watchDisabled(e){R.apply(e,e=>this.setRenderProp(`disabled`,e))}watchDownload(e){z.apply(e,e=>this.setRenderProp(`download`,e))}watchHideLabel(e){B.apply(e,e=>this.setRenderProp(`hideLabel`,e))}watchHref(e){E.apply(e,e=>this.setRenderProp(`href`,e))}watchIcons(e){J.apply(e,e=>this.setRenderProp(`icons`,e))}watchInline(e){V.apply(e,e=>this.setRenderProp(`inline`,e))}watchLabel(e){this.applyLabel(e)}watchOn(e){H.apply(e,e=>this.setRenderProp(`on`,e))}watchRole(e){W.apply(e,e=>this.setRenderProp(`role`,e))}watchShortKey(e){K.apply(e,e=>this.setRenderProp(`shortKey`,e))}watchTabIndex(e){Y.apply(e,e=>this.setRenderProp(`tabIndex`,e))}watchTarget(e){G.apply(e,e=>this.setRenderProp(`target`,e))}watchTooltipAlign(e){this.applyTooltipAlign(e)}watchVariant(e){Q.apply(e,e=>this.setRenderProp(`variant`,e))}get host(){return n(this)}static get watchers(){return{_accessKey:[`watchAccessKey`],_ariaControls:[`watchAriaControls`],_ariaCurrentValue:[`watchAriaCurrentValue`],_ariaDescription:[`watchAriaDescription`],_ariaExpanded:[`watchAriaExpanded`],_ariaOwns:[`watchAriaOwns`],_customClass:[`watchCustomClass`],_disabled:[`watchDisabled`],_download:[`watchDownload`],_hideLabel:[`watchHideLabel`],_href:[`watchHref`],_icons:[`watchIcons`],_inline:[`watchInline`],_label:[`watchLabel`],_on:[`watchOn`],_role:[`watchRole`],_shortKey:[`watchShortKey`],_tabIndex:[`watchTabIndex`],_target:[`watchTarget`],_tooltipAlign:[`watchTooltipAlign`],_variant:[`watchVariant`]}}};u([p(`ctaRef`)],$.prototype,`focus`,null),u([f(`ctaRef`)],$.prototype,`click`,null),$.style={default:pe};export{$ as kol_link};