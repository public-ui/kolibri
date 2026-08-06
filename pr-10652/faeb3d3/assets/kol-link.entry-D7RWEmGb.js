import{P as e,W as t,a as n,c as r,l as i,n as a,o,r as s,s as c,vt as l}from"./index-Bf28zR1_.js";import{t as u}from"./base-web-component-BT6jbe_v-Vp21XLG3.js";import{t as d}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as ee}from"./clsx-COFh-Vc8-alQuJLqj.js";import{n as f,r as p,t as m}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import{i as h,n as g,o as _,r as v,s as y}from"./normalizers-DB6hjv_I-1FC-6tRr.js";import{t as te}from"./i18n-Bp0Tt-MR-KqplOzHr.js";import{t as b}from"./component-CuditNXQ-CHe0F8iL.js";import"./label-CGiqphLR-B6jaJ7h6.js";import"./variant-quote-B_RxP4F4-BzoudIwX.js";import{t as x}from"./base-controller-CXhqh4cR-BNzx0WwK.js";import{t as ne}from"./component-B6OK52or-CMT_64_0.js";import{t as S}from"./align-BKbMSY7m-JeA4WNtF.js";import{t as re}from"./variant-class-name-D6dgCtSi-DJcPRm1v.js";import{t as ie}from"./component-B5cHX1Ov-Co7q4C9Q.js";import"./align-floating-elements-BtwwUkW8-BFlhlG-T.js";import{t as C}from"./controller-Bi3naHI6-z7UtaypA.js";import{t as w}from"./access-and-short-key-ijzCZfHm-Dx5Q-CAn.js";import{t as T}from"./label-with-expert-slot-DuJNfPri-xEkUO48m.js";import{t as E}from"./href-CziAvABt-DhmJlOKx.js";var D=g(`accessKey`,``,y),O=g(`ariaControls`,``,y),k=[`date`,`location`,`page`,`step`,`time`,`true`,`false`];function A(e){let t=y(e);return k.includes(t)?t:`page`}var j=g(`ariaCurrentValue`,`page`,A),M=g(`ariaDescription`,``,y),N=g(`ariaExpanded`,!1,v),P=g(`ariaOwns`,``,y),ae=/^[a-zA-Z][a-zA-Z0-9_-]{0,60}$/,F=e=>typeof e==`string`&&ae.test(e);function I(e){return e===``||F(e)}var L=g(`customClass`,``,y,I),R=g(`disabled`,!1,v),z=g(`download`,``,y),B=g(`hideLabel`,!1,v),V=g(`inline`,!0,v);function H(e){if(typeof e==`object`&&e)return e;throw Error(`Invalid on callbacks: expected object, got ${typeof e}`)}var U=g(`on`,{},H),W=[`tab`,`treeitem`];function G(e){return typeof e==`string`&&W.includes(e)?e:``}var K=g(`role`,``,G),q=g(`target`,``,y),J=g(`shortKey`,``,y);function oe(e){if(!e||typeof e==`string`&&e===``)return{};if(typeof e==`string`)return y(e);if(typeof e==`object`)return _(e);throw Error(`Invalid icons: ${typeof e}`)}function se(e){return typeof e==`string`?e.length>0:typeof e==`object`&&!!e}var Y=g(`icons`,{},oe,se),X=g(`tabIndex`,0,h);function ce(e){let t=y(e);return S.includes(t)?t:`right`}var Z=g(`tooltipAlign`,`right`,ce,e=>S.includes(e));function le(e){return Array.isArray(e)?e:typeof e==`string`?e.split(` `):[]}function ue(e){return e.length===0||e.every(F)}var Q=g(`variant`,[],le,ue),de=`kol-open-link-in-tab`,fe=e=>{let{accessKey:n,ariaControls:r,ariaCurrent:i,ariaDescription:s,ariaExpanded:c,ariaOwns:l,customClass:u,disabled:d,download:f,handleAnchorClick:p,hideLabel:m,href:h,icons:g,inline:_,label:v,on:y,refAnchor:x,refTooltip:S,role:C,shortKey:w,tabIndex:T,target:E,variant:D,expertSlot:O}=e,k=te(de),A=typeof E==`string`&&E.length>0&&E!==`_self`,j={href:typeof h==`string`&&h.length>0?h:`javascript:void(0);`,target:typeof E==`string`&&E.length>0?E:void 0,rel:A?`noopener`:void 0,download:typeof f==`string`&&f.length>0?f:void 0};m===!0&&!v&&t(`[KolLink] An aria-label must be set when _hide-label is set.`);let M=s?.trim(),N=C||void 0;return o(a,null,o(`a`,Object.assign({ref:x},j,{accessKey:n||void 0,"aria-current":i||void 0,"aria-controls":r||void 0,"aria-description":M||void 0,"aria-disabled":d?`true`:void 0,"aria-expanded":typeof c==`boolean`?String(c):void 0,"aria-owns":l||void 0,"aria-label":m&&typeof v==`string`?`${v}${A?` (${k})`:``}`:void 0,"aria-keyshortcuts":w||void 0,class:ee(`kol-link`,{"kol-link--disabled":d===!0,"kol-link--external-link":A,"kol-link--hide-label":m===!0,[re(D,`link`)]:D.length>0,"kol-link--inline":_===!0,"kol-link--standalone":_===!1,[u]:D.includes(`custom`)&&u.length>0})},y,{onClick:p,role:N,tabIndex:d?-1:T}),o(ne,{class:`kol-link__text`,badgeText:n||w,icons:g,hideLabel:m,label:O?``:v||h},o(`slot`,{name:`expert`,slot:`expert`})),A&&o(b,{class:`kol-link__icon`,label:m?``:k,icons:`kolicon-link-external`,"aria-hidden":m})),m===!0&&!O&&o(`div`,{class:`kol-link__tooltip`},o(ie,{badgeText:n||w||``,label:typeof v==`string`?v:typeof h==`string`?h:``,refFloating:S})))},pe={required:[E],optional:[D,O,j,M,N,P,L,R,z,B,Y,V,T,U,K,q,J,X,Z,Q]},me=class extends x{constructor(e){super(e,pe),this.handleAnchorClick=e=>{var t;if(this.tooltipCtrl.hideTooltip(),this.getRenderProp(`disabled`)===!0){e.preventDefault();return}let n=this.getRenderProp(`href`),r=this.getRenderProp(`on`);typeof r?.onClick==`function`&&r.onClick(e,n),(t=this.dispatchClick)==null||t.call(this,n)},this.setDispatchClick=e=>{this.dispatchClick=e},this.setClickEventTarget=(e,t)=>{l(e,t)},this.tooltipCtrl=new C(e)}componentWillLoad(t){this.watchAccessKey(t.accessKey),this.watchAriaControls(t.ariaControls),this.watchAriaCurrentValue(t.ariaCurrentValue),this.watchAriaDescription(t.ariaDescription),this.watchAriaExpanded(t.ariaExpanded),this.watchAriaOwns(t.ariaOwns),this.watchCustomClass(t.customClass),this.watchDisabled(t.disabled),this.watchDownload(t.download),this.watchHideLabel(t.hideLabel),this.watchHref(t.href),this.watchIcons(t.icons),this.watchInline(t.inline),this.watchLabel(t.label),this.watchOn(t.on),this.watchRole(t.role),this.watchShortKey(t.shortKey),this.watchTabIndex(t.tabIndex),this.watchTarget(t.target),this.watchTooltipAlign(t.tooltipAlign),this.watchVariant(t.variant),w(t.accessKey,t.shortKey),this.unsubscribeOnLocationChange=e(e=>{let t=this.getRenderProp(`href`),n=this.getRenderProp(`ariaCurrentValue`),r=e===t?n:``;this.getState(`ariaCurrent`)!==r&&this.setState(`ariaCurrent`,r)}),this.tooltipCtrl.componentWillLoad({label:this.getTooltipLabel(),align:this.getRenderProp(`tooltipAlign`)})}watchAccessKey(e){D.apply(e,e=>this.setRenderProp(`accessKey`,e))}watchAriaControls(e){O.apply(e,e=>this.setRenderProp(`ariaControls`,e))}watchAriaCurrentValue(e){j.apply(e,e=>this.setRenderProp(`ariaCurrentValue`,e))}watchAriaDescription(e){M.apply(e,e=>this.setRenderProp(`ariaDescription`,e))}watchAriaExpanded(e){N.apply(e,e=>this.setRenderProp(`ariaExpanded`,e))}watchAriaOwns(e){P.apply(e,e=>this.setRenderProp(`ariaOwns`,e))}watchCustomClass(e){L.apply(e,e=>this.setRenderProp(`customClass`,e))}watchDisabled(e){R.apply(e,e=>this.setRenderProp(`disabled`,e))}watchDownload(e){z.apply(e,e=>this.setRenderProp(`download`,e))}watchHideLabel(e){B.apply(e,e=>this.setRenderProp(`hideLabel`,e))}watchHref(e){E.apply(e,e=>this.setRenderProp(`href`,e))}watchIcons(e){Y.apply(e,e=>this.setRenderProp(`icons`,e))}watchInline(e){V.apply(e,e=>this.setRenderProp(`inline`,e))}watchLabel(e){T.apply(e,t=>{this.setRenderProp(`label`,t),this.setState(`expertSlot`,e===``),this.tooltipCtrl.watchLabel(this.getTooltipLabel())})}watchOn(e){U.apply(e,e=>this.setRenderProp(`on`,e))}watchRole(e){K.apply(e,e=>this.setRenderProp(`role`,e))}watchShortKey(e){J.apply(e,e=>this.setRenderProp(`shortKey`,e))}watchTabIndex(e){X.apply(e,e=>this.setRenderProp(`tabIndex`,e))}watchTarget(e){q.apply(e,e=>this.setRenderProp(`target`,e))}watchTooltipAlign(e){Z.apply(e,e=>{this.setRenderProp(`tooltipAlign`,e),this.tooltipCtrl.watchAlign(e)})}watchVariant(e){Q.apply(e,e=>this.setRenderProp(`variant`,e))}getTooltipController(){return this.tooltipCtrl}syncTooltipListeners(e){e&&this.tooltipCtrl.syncListeners(void 0,e,!0)}getTooltipLabel(){let e=this.getRenderProp(`label`);if(typeof e==`string`&&e.length>0)return e;let t=this.getRenderProp(`href`);return typeof t==`string`?t:``}destroy(){this.unsubscribeOnLocationChange&&=(this.unsubscribeOnLocationChange(),void 0),this.tooltipCtrl.destroy()}},he=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1786019407877"); /* IE9*/
  src: url("kolicons.eot?t=1786019407877#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1786019407877") format("woff2"), url("kolicons.woff?t=1786019407877") format("woff"), url("kolicons.ttf?t=1786019407877") format("truetype"), url("kolicons.svg?t=1786019407877#kolicons") format("svg"); /* iOS 4.1- */
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
    align-items: baseline;
    place-items: center;
    text-align: left;
    text-decoration-line: none;
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
  .kol-link .kol-span__label {
    text-decoration-line: underline;
  }
  .kol-link:focus:not([aria-disabled], [disabled]) .kol-span__label, .kol-link:hover:not([aria-disabled], [disabled]) .kol-span__label {
    text-decoration-thickness: 0.2em;
  }
  .kol-link__icon {
    display: inline-flex;
  }
}`,$=class extends u{constructor(e){super(),c(this,e),this.ctaRef=m(),this.ctrl=new me(this.stateAccess),this.setAnchorRef=e=>{this.ctaRef(e)},this.ariaCurrent=``,this.expertSlot=!1,this._disabled=!1,this._hideLabel=!1,this._inline=!0,this._tooltipAlign=`right`}async focus(e){}async click(){}componentWillLoad(){this.ctrl.setDispatchClick(e=>{this.host&&i(this.host,r.click,e)}),this.ctrl.componentWillLoad({accessKey:this._accessKey,ariaControls:this._ariaControls,ariaCurrentValue:this._ariaCurrentValue,ariaDescription:this._ariaDescription,ariaExpanded:this._ariaExpanded,ariaOwns:this._ariaOwns,customClass:this._customClass,disabled:this._disabled,download:this._download,hideLabel:this._hideLabel,href:this._href,icons:this._icons,inline:this._inline,label:this._label,on:this._on,role:this._role,shortKey:this._shortKey,tabIndex:this._tabIndex,target:this._target,tooltipAlign:this._tooltipAlign,variant:this._variant})}componentDidRender(){this.ctrl.syncTooltipListeners(this.ctaRef.el)}disconnectedCallback(){this.ctrl.destroy()}render(){return o(s,{key:`716266b3f008b84d7c5d4b188b0867f4cb2eb6c2`},o(fe,{key:`fa1ddb326c40e88d7790e49245c2ac9e2c023b42`,accessKey:this.ctrl.getRenderProp(`accessKey`),ariaControls:this.ctrl.getRenderProp(`ariaControls`),ariaCurrent:this.ariaCurrent,ariaCurrentValue:this.ctrl.getRenderProp(`ariaCurrentValue`),ariaDescription:this.ctrl.getRenderProp(`ariaDescription`),ariaExpanded:this.ctrl.getRenderProp(`ariaExpanded`),ariaOwns:this.ctrl.getRenderProp(`ariaOwns`),customClass:this.ctrl.getRenderProp(`customClass`),disabled:this.ctrl.getRenderProp(`disabled`),download:this.ctrl.getRenderProp(`download`),handleAnchorClick:this.ctrl.handleAnchorClick,hideLabel:this.ctrl.getRenderProp(`hideLabel`),href:this.ctrl.getRenderProp(`href`),icons:this.ctrl.getRenderProp(`icons`),inline:this.ctrl.getRenderProp(`inline`),label:this.ctrl.getRenderProp(`label`),on:this.ctrl.getRenderProp(`on`),refAnchor:this.setAnchorRef,refTooltip:this.ctrl.getTooltipController().setTooltipElementRef,role:this.ctrl.getRenderProp(`role`),shortKey:this.ctrl.getRenderProp(`shortKey`),tabIndex:this.ctrl.getRenderProp(`tabIndex`),target:this.ctrl.getRenderProp(`target`),tooltipAlign:this.ctrl.getRenderProp(`tooltipAlign`),variant:this.ctrl.getRenderProp(`variant`),expertSlot:this.expertSlot}))}watchAccessKey(e){this.ctrl.watchAccessKey(e)}watchAriaControls(e){this.ctrl.watchAriaControls(e)}watchAriaCurrentValue(e){this.ctrl.watchAriaCurrentValue(e)}watchAriaDescription(e){this.ctrl.watchAriaDescription(e)}watchAriaExpanded(e){this.ctrl.watchAriaExpanded(e)}watchAriaOwns(e){this.ctrl.watchAriaOwns(e)}watchCustomClass(e){this.ctrl.watchCustomClass(e)}watchDisabled(e){this.ctrl.watchDisabled(e)}watchDownload(e){this.ctrl.watchDownload(e)}watchHideLabel(e){this.ctrl.watchHideLabel(e)}watchHref(e){this.ctrl.watchHref(e)}watchIcons(e){this.ctrl.watchIcons(e)}watchInline(e){this.ctrl.watchInline(e)}watchLabel(e){this.ctrl.watchLabel(e)}watchOn(e){this.ctrl.watchOn(e)}watchRole(e){this.ctrl.watchRole(e)}watchShortKey(e){this.ctrl.watchShortKey(e)}watchTabIndex(e){this.ctrl.watchTabIndex(e)}watchTarget(e){this.ctrl.watchTarget(e)}watchTooltipAlign(e){this.ctrl.watchTooltipAlign(e)}watchVariant(e){this.ctrl.watchVariant(e)}get host(){return n(this)}static get watchers(){return{_accessKey:[`watchAccessKey`],_ariaControls:[`watchAriaControls`],_ariaCurrentValue:[`watchAriaCurrentValue`],_ariaDescription:[`watchAriaDescription`],_ariaExpanded:[`watchAriaExpanded`],_ariaOwns:[`watchAriaOwns`],_customClass:[`watchCustomClass`],_disabled:[`watchDisabled`],_download:[`watchDownload`],_hideLabel:[`watchHideLabel`],_href:[`watchHref`],_icons:[`watchIcons`],_inline:[`watchInline`],_label:[`watchLabel`],_on:[`watchOn`],_role:[`watchRole`],_shortKey:[`watchShortKey`],_tabIndex:[`watchTabIndex`],_target:[`watchTarget`],_tooltipAlign:[`watchTooltipAlign`],_variant:[`watchVariant`]}}};d([p(`ctaRef`)],$.prototype,`focus`,null),d([f(`ctaRef`)],$.prototype,`click`,null),$.style={default:he};export{$ as kol_link};