import{a as e,d as t,f as n,o as r,r as i,s as a}from"./index-DuYuYELy.js";import"./normalizers-BZrXYlGW-CbjMIOAO.js";import"./label-CSEcI_DU-BA5ugeRQ.js";import"./base-controller-4nyun1vN-JYZ1LweG.js";import{t as o}from"./base-web-component-BT6jbe_v-Vp21XLG3.js";import{t as s}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import"./clsx-COFh-Vc8-alQuJLqj.js";import"./component-BKvFZabC-P1BRiwoS.js";import"./align-tkjswpJx-VqOFccE0.js";import"./controller-C1oVs8dr-xUh-xneW.js";import"./component-Bpa5h0dJ-BZdLjUmC.js";import"./label-with-expert-slot-Drx1G6Cn-hFCZMR3h.js";import"./name-CRrqyGmF-DVXqY49C.js";import{n as c,t as l}from"./controller-CsTLANdH-BUFcjpPu.js";import"./element-focus-Cp994Rrk-BCxGGpIg.js";import"./element-click-CCljCb-a-Bw1_18r4.js";import{n as u,r as d,t as f}from"./element-interaction-Cfs3SP0D-C57YAP3J.js";import{n as p,t as m}from"./controller-DrnbiMMb-Ch3LHds7.js";import"./aria-labelledby-6-ki3akM-C6lJ0lQF.js";import"./aria-details-DR-Z9997-BSPqqhkh.js";import{t as h}from"./associated.controller-CT6Lmd81-QUPA-0pG.js";var g=`@charset "UTF-8";
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
@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1782395494814"); /* IE9*/
  src: url("kolicons.eot?t=1782395494814#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1782395494814") format("woff2"), url("kolicons.woff?t=1782395494814") format("woff"), url("kolicons.ttf?t=1782395494814") format("truetype"), url("kolicons.svg?t=1782395494814#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-button {
    display: flex;
    font-style: calc(16 * 1rem / var(--kolibri-root-font-size, 16));
    text-decoration-line: none;
  }
  .kol-button::before {
    /* Render zero-width character as first element to set the baseline correctly. */
    content: "​";
  }
  .kol-button__button, .kol-button__anchor {
    min-height: var(--a11y-min-size);
    color: inherit;
    display: flex;
    flex: 1;
    /* The user agent styles of <button> do not inherit font and color. */
    font: inherit;
    text-decoration-line: none;
    align-items: stretch;
  }
  .kol-button__text {
    flex: 1 0 100%;
  }
}`,_=class extends o{constructor(e){super(),a(this,e),this.ctaRef=f(),this.ctrl=new l(this.stateAccess),this.state={},this._disabled=!1,this._hideLabel=!1,this._inline=!1,this._tooltipAlign=`top`,this._type=`button`,this._variant=`normal`,this.onClick=e=>{let{value:r,formAction:i,shouldDispatchKolEvent:a}=this.ctrl.handleClick(e);i===`submit`?p({form:this.host}):i===`reset`?m({form:this.host}):a&&this.formController.setFormAssociatedValue(r),a&&this.host&&n(this.host,t.click,r)},this.onMouseDown=e=>{this.ctrl.handleMouseDown(e),this.host&&n(this.host,t.mousedown)},this.onFocus=e=>{this.ctrl.handleFocus(e),this.host&&n(this.host,t.focus)},this.onBlur=e=>{this.ctrl.handleBlur(e),this.host&&n(this.host,t.blur)},this.refButton=e=>{this.ctaRef(e),this.ctrl.setButtonRef(e)},this.formController=new h(this,`button`,this.host)}async focus(e){}async click(){}async getValue(){return Promise.resolve(this.ctrl.getValue())}watchAccessKey(e){this.ctrl.watchAccessKey(e)}watchAriaControls(e){this.ctrl.watchAriaControls(e)}watchAriaDescription(e){this.ctrl.watchAriaDescription(e)}watchAriaExpanded(e){this.ctrl.watchAriaExpanded(e)}watchAriaSelected(e){this.ctrl.watchAriaSelected(e)}watchCustomClass(e){this.ctrl.watchCustomClass(e)}watchDisabled(e){this.ctrl.watchDisabled(e)}watchHideLabel(e){this.ctrl.watchHideLabel(e)}watchIcons(e){this.ctrl.watchIcons(e)}watchId(e){this.ctrl.watchId(e)}watchInline(e){this.ctrl.watchInline(e)}watchLabel(e){this.ctrl.watchLabel(e)}watchName(e){this.ctrl.watchName(e),this.formController.validateName(e)}watchOn(e){this.ctrl.watchOn(e)}watchRole(e){this.ctrl.watchRole(e)}watchShortKey(e){this.ctrl.watchShortKey(e)}watchSyncValueBySelector(e){this.formController.validateSyncValueBySelector(e)}watchTabIndex(e){this.ctrl.watchTabIndex(e)}watchTooltipAlign(e){this.ctrl.watchTooltipAlign(e)}watchType(e){this.ctrl.watchType(e)}watchValue(e){this.ctrl.setValue(e),this.formController.setFormAssociatedValue(e)}watchVariant(e){this.ctrl.watchVariant(e)}componentWillLoad(){this.ctrl.componentWillLoad({accessKey:this._accessKey,ariaControls:this._ariaControls,ariaDescription:this._ariaDescription,ariaExpanded:this._ariaExpanded,ariaSelected:this._ariaSelected,customClass:this._customClass,disabled:this._disabled,hideLabel:this._hideLabel,icons:this._icons,id:this._id,inline:this._inline,label:this._label,name:this._name,on:this._on,role:this._role,shortKey:this._shortKey,tabIndex:this._tabIndex,tooltipAlign:this._tooltipAlign,type:this._type,variant:this._variant}),this.ctrl.setValue(this._value)}disconnectedCallback(){this.ctrl.destroy()}render(){return r(i,{key:`78f5b1dfd7d1eefa972082dccf40422da3ee5a89`},r(c,{key:`d44b3ec9ca34d97001d882843bb7315ee715de78`,accessKey:this.ctrl.getRenderProp(`accessKey`),ariaControls:this.ctrl.getRenderProp(`ariaControls`),ariaDescription:this.ctrl.getRenderProp(`ariaDescription`),ariaExpanded:this.ctrl.getRenderProp(`ariaExpanded`),ariaSelected:this.ctrl.getRenderProp(`ariaSelected`),customClass:this.ctrl.getRenderProp(`customClass`),disabled:this.ctrl.getRenderProp(`disabled`),hideLabel:this.ctrl.getRenderProp(`hideLabel`),icons:this.ctrl.getRenderProp(`icons`),id:this.ctrl.getRenderProp(`id`),inline:this.ctrl.getRenderProp(`inline`),label:this.ctrl.getRenderProp(`label`),name:this.ctrl.getRenderProp(`name`),on:this.ctrl.getRenderProp(`on`),role:this.ctrl.getRenderProp(`role`),shortKey:this.ctrl.getRenderProp(`shortKey`),tabIndex:this.ctrl.getRenderProp(`tabIndex`),tooltipAlign:this.ctrl.getRenderProp(`tooltipAlign`),type:this.ctrl.getRenderProp(`type`),variant:this.ctrl.getRenderProp(`variant`),handleClick:this.onClick,handleMouseDown:this.onMouseDown,handleFocus:this.onFocus,handleBlur:this.onBlur,refButton:this.refButton,refTooltipFloating:this.ctrl.setTooltipFloatingRef,tooltipId:this.ctrl.getTooltipId()}))}get host(){return e(this)}static get watchers(){return{_accessKey:[`watchAccessKey`],_ariaControls:[`watchAriaControls`],_ariaDescription:[`watchAriaDescription`],_ariaExpanded:[`watchAriaExpanded`],_ariaSelected:[`watchAriaSelected`],_customClass:[`watchCustomClass`],_disabled:[`watchDisabled`],_hideLabel:[`watchHideLabel`],_icons:[`watchIcons`],_id:[`watchId`],_inline:[`watchInline`],_label:[`watchLabel`],_name:[`watchName`],_on:[`watchOn`],_role:[`watchRole`],_shortKey:[`watchShortKey`],_syncValueBySelector:[`watchSyncValueBySelector`],_tabIndex:[`watchTabIndex`],_tooltipAlign:[`watchTooltipAlign`],_type:[`watchType`],_value:[`watchValue`],_variant:[`watchVariant`]}}};s([d(`ctaRef`)],_.prototype,`focus`,null),s([u(`ctaRef`)],_.prototype,`click`,null),_.style={default:g};export{_ as kol_button};