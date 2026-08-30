import{Dt as e,Et as t,G as n,Tt as r,_ as i,a,c as o,kt as s,l as c,o as l,s as u,st as d,wt as f,xt as p}from"./index-BtDvv0Nk.js";import{n as m}from"./dev.utils-DCswsHiU-Ct4542xW.js";import{t as h}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as g}from"./clsx-COFh-Vc8-DWAop4cA.js";import{r as _}from"./label-lhyZhbiM-DCY5HJxk.js";import{n as v,r as y,t as b}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import{t as x}from"./i18n-CrXMv0tS-nSfmqovM.js";import{n as S}from"./align-BNmcYY75-DcgP2j9i.js";import{n as C}from"./keyboard-DNd73LVa-BCj4IeP3.js";var w=[`select-automatic`,`select-manual`],T=(e,t)=>{s(e,`_behavior`,e=>typeof e==`string`&&w.includes(e),new Set([`KoliBriTabBehavior {${w.join(`, `)}`]),t)},E=(e,t)=>{r(e,`_hasCreateButton`,t)},D=`@charset "UTF-8";
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
@layer kol-component {
  :host {
    display: block;
  }
}
@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1788074566656"); /* IE9*/
  src: url("kolicons.eot?t=1788074566656#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1788074566656") format("woff2"), url("kolicons.woff?t=1788074566656") format("woff"), url("kolicons.ttf?t=1788074566656") format("truetype"), url("kolicons.svg?t=1788074566656#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-tabs {
    display: var(--display);
    grid-template-columns: var(--grid-template-columns);
    grid-template-rows: var(--grid-template-rows);
  }
  .kol-tabs--align-right {
    --display: grid;
    --grid-template-columns: 1fr auto;
    --button-group-flex-direction: column;
    --button-group-order: 2;
  }
  .kol-tabs--align-left {
    --display: grid;
    --grid-template-columns: auto 1fr;
    --button-group-flex-direction: column;
    --button-group-order: 0;
  }
  .kol-tabs--align-bottom {
    --display: grid;
    --grid-template-rows: 1fr auto;
    --button-group-order: 2;
  }
  .kol-tabs__tabs-align-top {
    --display: grid;
    --grid-template-rows: auto 1fr;
    --button-group-order: 0;
  }
  .kol-tabs__button-group {
    display: flex;
    order: var(--button-group-order);
    flex-direction: var(--button-group-flex-direction);
    flex-wrap: wrap;
  }
  .kol-tabs__button-group .kol-button {
    border-bottom-color: transparent;
    display: block;
    border-bottom-style: solid;
  }
  @media (forced-colors: active) {
    .kol-tabs__button-group .kol-button.selected {
      outline: 3px solid Highlight;
      outline-offset: -3px;
    }
    .kol-tabs__button-group .kol-button.selected:focus-visible {
      outline-style: dashed;
    }
  }
  .kol-tabs__panel {
    height: 100%;
  }
}`,O=class{constructor(e){u(this,e),this.onCreateLabel=`${x(`kol-new`)} …`,this.ctaRef=b(),this.id=m(`tabs`),this.nextPossibleTabIndex=(e,t,n=1)=>{let r=t+n;return r<e.length?e[r]._disabled?this.nextPossibleTabIndex(e,t,n+1):r:t},this.prevPossibleTabIndex=(e,t,n=1)=>{let r=t-n;return r>=0?e[r]._disabled?this.prevPossibleTabIndex(e,t,n+1):r:t},this.onKeyDown=e=>{switch(e.key){case C.ArrowRight:this.goToNextTab(e);break;case C.ArrowLeft:this.goToPreviousTab(e);break;case C.Space:case C.Enter:this.activateFocusedTab(e)}},this.onClickSelect=(e,t)=>{this.selectNextTabEvent(e,t)},this.onMouseDown=e=>{e.preventDefault()},this.callbacks={onClick:this.onClickSelect,onMouseDown:this.onMouseDown},this.catchTabPanelHost=e=>{this.tabPanelHost=e},this._align=`top`,this._hasCreateButton=!1,this._selected=0,this.state={_align:`top`,_label:``,_selected:0,_tabs:[]},this.selectNextNotDisabledTab=(e,t,r=!0,i)=>{if(e>t.length-1&&(e=t.length-1),e<0&&(e=0),Array.isArray(t)&&t[e]&&t[e]._disabled){if(r===!0){if(e<t.length-1)return this.selectNextNotDisabledTab(e+1,t,!0,i||e);e=i||e,r=!1}if(r===!1){if(e>0)return this.selectNextNotDisabledTab(e-1,t,!1,i||e);n(`[KolTabs] All tabs are disabled, and therefore no tab can be displayed.`)}}return e},this.syncSelectedAndTabs=(e,t,n,r)=>{let i;i=r===`_selected`?e:this.state._selected;let a;a=r===`_tabs`?e:this.state._tabs,a.length>0&&t.set(`_selected`,this.selectNextNotDisabledTab(i,a))},this.refreshTabPanels=()=>{var e;if(this.tabPanelHost){for(;this.tabPanelHost.firstChild;)this.tabPanelHost.removeChild(this.tabPanelHost.firstChild);for(let t=0;t<this.state._tabs?.length;t++){let n=document.createElement(`div`);n.setAttribute(`aria-labelledby`,`${this.id}-tab-${t}`),n.setAttribute(`id`,`${this.id}-panel-${t}`),n.setAttribute(`role`,`tabpanel`),n.setAttribute(`hidden`,``);let r=document.createElement(`slot`);r.setAttribute(`name`,`tabpanel-slot-${t}`),n.appendChild(r),(e=this.tabPanelHost)==null||e.appendChild(n),typeof HTMLCollection<`u`&&this.host?.children instanceof HTMLCollection&&this.host?.children[t]&&this.host.children[t].setAttribute(`slot`,`tabpanel-slot-${t}`)}this.updateVisiblePanel()}},this.updateVisiblePanel=()=>{this.tabPanelHost&&Array.from(this.tabPanelHost.children).forEach((e,t)=>{t===this.state._selected?e.removeAttribute(`hidden`):e.setAttribute(`hidden`,``)})},this.onCreate=e=>{var t,n;e.preventDefault(),(n=(t=this.state._on)?.onCreate)==null||n.call(t,e),this.host&&c(this.host,o.create)},this.onBlur=()=>{this.currentFocusIndex=void 0}}getCurrentFocusIndex(){return typeof this.currentFocusIndex==`number`?this.currentFocusIndex:this.state._selected}getKeyboardTabChangeMode(){return this._behavior===`select-manual`?`selectFocusOnly`:`activateCompletely`}goToNextTab(e){let t=this.nextPossibleTabIndex(this.state._tabs,this.getCurrentFocusIndex());this.selectNextTabEvent(e,t,this.getKeyboardTabChangeMode())}goToPreviousTab(e){let t=this.prevPossibleTabIndex(this.state._tabs,this.getCurrentFocusIndex());this.selectNextTabEvent(e,t,this.getKeyboardTabChangeMode())}activateFocusedTab(e){typeof this.currentFocusIndex==`number`&&this.onSelect(e,this.currentFocusIndex)}selectNextTabEvent(e,t,n=`activateCompletely`){var r,i;this.currentFocusIndex=t,this.focusTabById(t),n===`activateCompletely`&&(this._selected=t,(i=(r=this.state._tabs[t]._on)?.onSelect)==null||i.call(r,e,t),this.onSelect(e,t))}async focus(e){}async click(){}renderButtonGroup(){return l(`div`,{"aria-label":this.state._label,class:`kol-tabs__button-group`,role:`tablist`,onKeyDown:this.onKeyDown,onBlur:this.onBlur},this.state._tabs.map((e,t)=>l(i,{ref:this.state._selected===t?this.ctaRef:void 0,_disabled:e._disabled,_icons:e._icons,_hideLabel:e._hideLabel,_label:e._label,_on:this.callbacks,_tabIndex:this.state._selected===t?0:-1,_tooltipAlign:e._tooltipAlign,_variant:this.state._selected===t?`custom`:void 0,_customClass:this.state._selected===t?`selected`:``,_ariaControls:`${this.id}-panel-${t}`,_ariaSelected:this.state._selected===t,_id:`${this.id}-tab-${t}`,_role:`tab`,_value:t})),this.state._hasCreateButton&&l(i,{class:`kol-tabs__button-create`,_label:this.onCreateLabel,_on:{onClick:this.onCreate},_icons:`kolicon-plus`,"data-testid":`tabs-create-button`}))}render(){return l(`div`,{key:`f32bc164a5eba3ff12fe8fd5725f70563da3474f`,ref:e=>{this.tabPanelsElement=e},class:g(`kol-tabs`,`kol-tabs--align-${this.state._align}`)},this.renderButtonGroup(),l(`div`,{key:`787234589e842aa173e04dc67bbcf43b0a0fe9ed`,class:`kol-tabs__content`,ref:this.catchTabPanelHost}))}validateAlign(e){S(this,e)}validateBehavior(e){T(this,e)}validateHasCreateButton(e){E(this,e)}validateLabel(e){_(this,e,{required:!0})}validateOn(e){if(typeof e==`object`&&e){let t={};typeof e.onCreate==`function`&&(t.onCreate=e.onCreate),typeof e.onSelect==`function`&&(t.onSelect=e.onSelect),p(this,`_on`,t)}}validateSelected(t){e(this,`_selected`,t,{hooks:{beforePatch:this.syncSelectedAndTabs}})}validateTabs(e){t(this,`_tabs`,e=>typeof e==`object`&&!!e&&typeof e._label==`string`&&e._label.length>0,e,void 0,{hooks:{beforePatch:this.syncSelectedAndTabs,afterPatch:this.refreshTabPanels}}),f(`KolTabs`,this.state._tabs.length)}componentWillLoad(){this.validateAlign(this._align),this.validateLabel(this._label),this.validateOn(this._on),this.validateSelected(this._selected),this.validateTabs(this._tabs),this.validateBehavior(this._behavior),this.validateHasCreateButton(this._hasCreateButton)}componentDidRender(){this.refreshTabPanels()}focusTabById(e){this.tabPanelsElement&&d(`button#${this.id}-tab-${e}`,this.tabPanelsElement)?.focus()}onSelect(e,t){var n,r;(r=(n=this._on)?.onSelect)==null||r.call(n,e,t),this.host&&c(this.host,o.select,t),this.focusTabById(t)}get host(){return a(this)}static get watchers(){return{_align:[`validateAlign`],_behavior:[`validateBehavior`],_hasCreateButton:[`validateHasCreateButton`],_label:[`validateLabel`],_on:[`validateOn`],_selected:[`validateSelected`],_tabs:[`validateTabs`]}}};h([y(`ctaRef`)],O.prototype,`focus`,null),h([v(`ctaRef`)],O.prototype,`click`,null),O.style={default:D};export{O as kol_tabs};