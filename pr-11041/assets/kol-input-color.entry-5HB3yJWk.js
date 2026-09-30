import{F as e,P as t,W as n,c as r,o as i,r as a,s as o,v as s}from"./index-gOqi0Da2-C2tTJVQk.js";import{n as c}from"./behavior-BJG-MhL2-BGBY2zYs.js";import{r as ee,t as l}from"./index-DODM1vbi.js";import{n as u,t as d}from"./dev.utils-BKKndjMg-C9ZWHGoo.js";import{t as f}from"./base-web-component--IgFgz37-CZuvR3uB.js";import{t as p}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{_ as m,d as h,i as g,n as te}from"./variant-quote-BeLSzQuc-UCtPxjfX.js";import{t as _}from"./disabled-tzbd2axj-BXtEkvT5.js";import"./label-PXB2NzQQ-WrBlxuI6.js";import"./label-DnHVAz5W-ekDM5Xgh.js";import"./Heading-2SNCxH77-BbRjp8LH.js";import{n as v,r as y,t as b}from"./element-interaction-DkGO5I_0-CYEJb_Yf.js";import"./block-bem-Cl7BKDmL-DOugg0lP.js";import{t as x}from"./component-ou5XqICI-BlV-48zE.js";import{n as S}from"./component-B1boc6gl-DwsXlt6h.js";import"./i18n-_TX4pqPZ-DJHksmVh.js";import"./component-CiuT3GwM-Bh94JhI1.js";import"./component-BOhahyeM--ryyGPxa.js";import"./component-DV-Pd02L-CjxFHKQu.js";import"./component-DaImMw0_-C51TOGdY.js";import"./component-Bp7ZayZg-BSmVnGDb.js";import"./align-Cz5UO4VN-cjPy8JPP.js";import{t as C}from"./label-with-expert-slot-BtV316Cb-3GBRNQfX.js";import{t as w}from"./smart-button-BHmAwWaV-CGwnUjFm.js";import{n as T}from"./variant-DJWVOpfb-Cgqb8Tl0.js";import{i as E,n as D,r as O,t as k}from"./tooltip-align-C50xFmNl-CaMlJoaJ.js";import{t as A}from"./name-CJ-_92Qo-DRno2V18.js";import{t as j}from"./access-and-short-key-ijzCZfHm-Dx5Q-CAn.js";import{n as M,t as N}from"./behavior-DWXm_Lu8-Dx00BonP.js";import{o as ne,t as re}from"./component-IUn5bvIH-Dai24TUE.js";import{n as ie}from"./aria-B7HFuHtc-BMpKhABT.js";import{n as ae,r as P,t as oe}from"./icon-button-wOCn253J-DWDvbxLP.js";import{t as F}from"./input-container-BtFh2gWw-BRF4G9_5.js";import{t as I}from"./input-B0i6nkjq-MuBj92eN.js";import{t as L}from"./suggestions-vi1BHMQW-BhKEsgfb.js";var R=g(`autoComplete`,`off`,m,e=>e.length>0),z=g(`hideMsg`,!1,h),B=g(`hint`,``,m),V=t=>e(t,0)||ae(t);function H(t){let r=t;if(typeof t==`string`)try{r=n(t)}catch{}if(e(r,1))return P(r);if(typeof r==`object`&&r){let e=r;if(Object.keys(e).length===0||[`left`,`right`,`top`,`bottom`].some(t=>V(e[t])))return P(r)}throw Error(`Invalid icons: ${typeof t}`)}var U=g(`icons`,{},H);function W(e){if(typeof e==`object`&&e)return e;throw Error(`Invalid info popover: ${typeof e}`)}var G=g(`infoPopover`,void 0,W),K=te();function se(e){if(typeof e==`string`)try{return n(e)}catch{return e}return e}function ce(n){return n===void 0?!0:typeof n==`string`?n.length>0:t(n)&&e(n._description,1)}var q=g(`msg`,void 0,se,ce);function le(e){let t=typeof e==`string`?n(e):e;if(Array.isArray(t))return t;throw Error(`Invalid suggestions: ${typeof e}`)}var J=g(`suggestions`,[],le,e=>e.every(e=>typeof e==`string`||typeof e==`number`),{hints:(e,t)=>{t.length>0&&s(`Property suggestions: Options have accessibility issues in how browsers implemented them and should not be used for now.`)}}),Y=g(`touched`,!1,h),X=g(`value`,void 0,m),ue=class extends f{constructor(){super(...arguments),this.tooltipBehavior=new c(f.stateLess),this.focusEventSent=!1,this.handleChange=(e,t)=>{var n,r;e.stopPropagation(),t===void 0&&(t=e.target.value),this.emit(l.change,t),(r=(n=this._on)?.onChange)==null||r.call(n,e,t)},this.handleInput=(e,t)=>{var n,r;e.stopPropagation(),t===void 0&&(t=e.target.value),this.emit(l.input,t),this.formAssociation.setFormAssociatedValue(t),(r=(n=this._on)?.onInput)==null||r.call(n,e,t)},this.handleClick=e=>{var t,n;this.emit(l.click),(n=(t=this._on)?.onClick)==null||n.call(t,e)},this.handleFocus=e=>{var t,n;this.focusEventSent||=(this.emit(l.focus),(n=(t=this._on)?.onFocus)==null||n.call(t,e),!0),this.shared.setState(`inputHasFocus`,!0)},this.handleBlur=e=>{this.handleFocusLeave(e),this.shared.setState(`inputHasFocus`,!1)},this.handleKeyDown=e=>{var t,n;this.emit(l.keydown),(n=(t=this._on)?.onKeyDown)==null||n.call(t,e)},this.setInputRef=e=>{e&&this.isTooltipShown()&&(this.tooltipBehavior.initContext(e),this.tooltipBehavior.syncListeners(void 0,e,!0))},this.setTooltipRef=e=>{this.tooltipBehavior.setTooltipElementRef(e)}}get shared(){return this}initFormAssociation(e,t){this.formAssociation=new N(f.stateLess,{host:this.host,type:e,name:t})}destroyFormField(){this.tooltipBehavior.destroy()}applyAriaDetails(e){M.apply(e,e=>this.shared.setRenderProp(`ariaDetails`,e)),this.formAssociation.watchAriaDetails(e)}applyDisabled(e){_.apply(e,e=>this.shared.setRenderProp(`disabled`,e))}applyHideLabel(e){D.apply(e,e=>this.shared.setRenderProp(`hideLabel`,e))}applyHideMsg(e){z.apply(e,e=>this.shared.setRenderProp(`hideMsg`,e))}applyHint(e){B.apply(e,e=>this.shared.setRenderProp(`hint`,e))}applyInfoPopover(e){G.apply(e,e=>this.shared.setRenderProp(`infoPopover`,e))}applyLabel(e){let t=e;C.apply(t===!1?``:e,e=>this.shared.setRenderProp(`label`,e))}applyMsg(e){q.apply(e,e=>this.shared.setRenderProp(`msg`,e))}applyName(e){A.apply(e,e=>this.shared.setRenderProp(`name`,e)),this.formAssociation.watchName(e)}applyOn(e){K.apply(e,e=>this.shared.setRenderProp(`on`,e))}applySyncValueBySelector(e){this.formAssociation.watchSyncValueBySelector(e)}applyTooltipAlign(e){E.apply(e??`top`,e=>this.shared.setRenderProp(`tooltipAlign`,e))}applyTouched(e){Y.apply(e,e=>this.shared.setRenderProp(`touched`,e))}emit(e,t){this.host&&ee(this.host,e,t)}handleFocusLeave(e){var t,n;if(this._disabled)return;let r=(this.host?.shadowRoot||this.host)?.contains(e.relatedTarget)||this.host===e.relatedTarget;this.focusEventSent&&!r&&(this._touched=!0,this.emit(l.blur),(n=(t=this._on)?.onBlur)==null||n.call(t,e),this.focusEventSent=!1)}getAria(){let e=this.shared;return ie({id:e.getState(`id`),msg:e.getRenderProp(`msg`),hint:e.getRenderProp(`hint`),touched:e.getRenderProp(`touched`),hideMsg:e.getRenderProp(`hideMsg`)})}showAsAlert(){return!!this.shared.getRenderProp(`touched`)&&!this.shared.getState(`inputHasFocus`)}isTooltipShown(){let e=this.shared;return ne({hideLabel:e.getRenderProp(`hideLabel`),label:e.getRenderProp(`label`)})}getFormFieldProps({class:e,accessKey:t,shortKey:n,variant:r}){let i=this.shared,a=i.getState(`id`),o=i.getRenderProp(`label`),s=i.getRenderProp(`tooltipAlign`);return this.isTooltipShown()?(this.tooltipBehavior.watchAlign(s),this.tooltipBehavior.watchBadgeText(S(t,n)||``),this.tooltipBehavior.watchId(d(a,`label`)),this.tooltipBehavior.watchLabel(o)):this.tooltipBehavior.destroy(),{id:a,disabled:i.getRenderProp(`disabled`),msg:i.getRenderProp(`msg`),hint:i.getRenderProp(`hint`),label:o,hideLabel:i.getRenderProp(`hideLabel`),hideMsg:i.getRenderProp(`hideMsg`),touched:i.getRenderProp(`touched`),showBadge:!!t||!!n,accessKey:t,shortKey:n,variant:r,class:e,tooltipAlign:s,alert:this.showAsAlert(),infoPopover:i.getRenderProp(`infoPopover`),refInput:this.setInputRef,refTooltip:this.setTooltipRef}}},Z={required:[C],optional:[M,_,D,z,B,G,K,q,A,E,Y]},de={required:[...Z.required],optional:[...Z.optional,k,R,U,O,w,X,J,T]},fe=`@charset "UTF-8";
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
 * Guards an interaction rule (\`:hover\`, \`:active\`, \`:focus…\`) against the disabled state.
 *
 * Two shapes are needed because the disabled marker sits on different elements: a native control
 * carries \`disabled\`, an anchor or summary carries \`aria-disabled\`, and a BEM wrapper carries a
 * \`--disabled\` modifier while its inner control carries the attribute.
 */
/* Wrapper variant: asks the interactive element inside, which is where the attribute lives. */
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
    /*
     * Forced colors drop author colors, so the only way a disabled control still reads as
     * disabled is the \`GrayText\` system color. \`kol-button\` had it; the controls whose disabled
     * state is \`aria-disabled\` (anchor, summary) and the native form controls did not.
     */
    .kol-link__interactive-element[aria-disabled=true],
    .kol-accordion__heading[aria-disabled=true],
    .kol-details__heading[aria-disabled=true] {
      color: GrayText;
    }
    .kol-link__interactive-element[aria-disabled=true] .kol-icon,
    .kol-link__interactive-element[aria-disabled=true] .kol-span__label,
    .kol-accordion__heading[aria-disabled=true] .kol-icon,
    .kol-accordion__heading[aria-disabled=true] .kol-span__label,
    .kol-details__heading[aria-disabled=true] .kol-icon,
    .kol-details__heading[aria-disabled=true] .kol-span__label {
      color: GrayText;
    }
    input:disabled,
    select:disabled,
    textarea:disabled {
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
    .kol-button__interactive-element:focus-visible,
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
  src: url("kolicons.eot?t=1790730720528"); /* IE9*/
  src: url("kolicons.eot?t=1790730720528#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1790730720528") format("woff2"), url("kolicons.woff?t=1790730720528") format("woff"), url("kolicons.ttf?t=1790730720528") format("truetype"), url("kolicons.svg?t=1790730720528#kolicons") format("svg"); /* iOS 4.1- */
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
  .kolicon-pin-pinned::before {
    content: "\\ea15";
  }
  .kolicon-pin-unpinned::before {
    content: "\\ea16";
  }
  .kolicon-plus::before {
    content: "\\ea17";
  }
  .kolicon-settings::before {
    content: "\\ea18";
  }
  .kolicon-sort-asc::before {
    content: "\\ea19";
  }
  .kolicon-sort-desc::before {
    content: "\\ea1a";
  }
  .kolicon-sort-neutral::before {
    content: "\\ea1b";
  }
  .kolicon-up::before {
    content: "\\ea1c";
  }
  .kolicon-version::before {
    content: "\\ea1d";
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
  .kol-button {
    background-color: transparent;
    display: inline-block;
    width: 100%;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    margin: 0;
    padding: 0;
    /* The user-agent stylesheet centers text on \`button\`, but not on \`div\`. The wrapper now
       carries the class, so that UA default has to be restated here for the inner content to
       sit where it did when the button element itself was the class carrier. */
    text-align: center;
    /* Replicate the reset the real button received: width stays at the initial \`medium\`, only
       the style becomes \`none\`. Consumer rules that flip e.g. \`border-bottom-style\` back to
       \`solid\` (tabs) must therefore target the inner button (see the \`__interactive-element\`
       override below), because Firefox vertically centers button content inside the content box,
       which shrinks by the border — exactly as it did when the real button carried these rules. */
  }
  .kol-button__interactive-element {
    border-style: none;
    display: block;
    border-width: medium;
    /* The UA pins \`text-align: center\` and (in Firefox) \`font-weight: 400\` directly on every
       \`button\`, which would beat any alignment or font styling inherited through the wrapper
       (e.g. nav's \`text-align: left\`, or a bold active entry that used to apply to the button
       element itself). Inheriting all three restores the old flow. */
    font-weight: inherit;
    font-style: inherit;
    text-align: inherit;
  }
  .kol-button {
    /* See kol-button-styles: the tooltip wrapper must stay zero-height, also when the wrapper
       div is a flex or grid item (e.g. nav entry rows). */
  }
  .kol-button__tooltip {
    height: 0;
  }
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
  .kol-form-field .kol-popover-button {
    /*
     * The predecessor rendered this box as an unstyled (inline) custom element host; keep the
     * inline display so the flow layout around the embedded button stays unchanged.
     */
    display: inline;
  }
  .kol-form-field .kol-popover-button__popover {
    margin: 0;
    padding: 0;
    border: 0;
  }
  .kol-form-field .kol-popover-button--open .kol-button__tooltip {
    display: none;
  }
  .kol-form-field .kol-popover-button--inline {
    display: inline-block;
    /* The size exemption has to cover both the BEM root div and the inner interactive element:
       the a11y layer pins every \`button\` to 44×44, so the inner \`kol-button__interactive-element\`
       needs the override as well — the root alone used to be the button before the skeleton migration. */
  }
  .kol-form-field .kol-popover-button--inline .kol-button,
  .kol-form-field .kol-popover-button--inline .kol-button .kol-button__interactive-element {
    min-width: 0;
    min-height: 1em;
  }
  .kol-form-field .kol-popover {
    opacity: 0;
    transition: 0.2s ease-out opacity;
  }
  .kol-form-field .kol-popover-button--open .kol-popover-button__popover {
    opacity: 1;
  }
  .kol-form-field {
    display: grid;
  }
  .kol-form-field:not(.kol-form-field--disabled) .kol-form-field__label {
    cursor: pointer;
  }
  .kol-form-field__label {
    display: flex;
  }
  .kol-form-field__label-text {
    flex-flow: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .kol-form-field--required .kol-form-field__label-text:has(.kol-span__slot[hidden]) .kol-span__label::after,
  .kol-form-field--required .kol-form-field .kol-tooltip__content .kol-span__label::after {
    content: "*"/"";
  }
  .kol-input-container {
    background-color: transparent;
    display: grid;
    position: relative;
    width: 100%;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: center;
    grid-template-columns: 1fr;
  }
  .kol-input-container:has(> .kol-input-container__adornment--start) {
    grid-template-columns: auto 1fr auto;
  }
  .kol-input-container__container {
    position: relative;
    z-index: 1;
  }
  .kol-input-container__adornment {
    display: flex;
    align-items: center;
  }
  .kol-input-container__adornment .kol-icon {
    display: grid;
    place-items: center;
  }
  .kol-input {
    background-color: transparent;
    width: 100%;
    min-width: var(--a11y-min-size);
  }
  .kol-input {
    cursor: pointer;
  }
  .kol-input:disabled {
    cursor: not-allowed;
  }
}`,Q=e=>e?typeof e==`string`?o(x,{class:`kol-input-container__icon`,icons:e,label:``}):o(x,{class:`kol-input-container__icon`,icons:e.icon,label:e.label??``,style:e.style}):null,$=class extends ue{constructor(e){super(),r(this,e),this.ctaRef=b(),this.id=u(`input-color`),this.inputHasFocus=!1,this.handleColorInput=e=>{let t=e.target.value;this.setRenderProp(`value`,t),this.ctaRef.el&&(this.ctaRef.el.value=t),this.handleInput(e)},this._autoComplete=`off`,this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._tooltipAlign=`top`,this._touched=!1,this.initFormAssociation(`color`,this._name)}async getValue(){return this.ctaRef.el?.value}async focus(e){}async click(){}componentWillLoad(){this.initRenderProps(de),this.unsetRenderProp(`smartButton`),this._touched=this._touched===!0,this.watchAriaDetails(this._ariaDetails),this.watchName(this._name),this.watchSyncValueBySelector(this._syncValueBySelector),this.watchTouched(this._touched),this.watchAccessKey(this._accessKey),this.watchMsg(this._msg),this.watchDisabled(this._disabled),this.watchHideMsg(this._hideMsg),this.watchHideLabel(this._hideLabel),this.watchHint(this._hint),this.watchInfoPopover(this._infoPopover),this.watchLabel(this._label),this.watchShortKey(this._shortKey),this.watchSmartButton(this._smartButton),this.watchOn(this._on),this.watchTooltipAlign(this._tooltipAlign),this.watchVariant(this._variant),this.watchIcons(this._icons),this.watchAutoComplete(this._autoComplete),this.watchSuggestions(this._suggestions),this.watchValue(this._value)}componentDidLoad(){!this._value&&this.ctaRef&&(this._value=this.ctaRef.el?.value)}disconnectedCallback(){this.destroyFormField()}getInputProps(){let e=this.id,t=this.getRenderProp(`name`),n=this.getRenderProp(`accessKey`),r=this.getRenderProp(`shortKey`),i=this.getRenderProp(`suggestions`),{ariaDescribedBy:a,hasError:s}=this.getAria();return Object.assign(Object.assign(Object.assign(Object.assign({id:e,hideLabel:this.getRenderProp(`hideLabel`),label:this.getRenderProp(`label`),disabled:this.getRenderProp(`disabled`),name:t?`${t}-color`:void 0},n?{accessKey:n}:{}),{value:this.getRenderProp(`value`),autoComplete:this.getRenderProp(`autoComplete`),touched:this.getRenderProp(`touched`),msg:this.getRenderProp(`msg`)}),r?{"aria-keyshortcuts":r}:{}),{suggestions:i.length>0?o(L,{id:e,suggestions:i}):void 0,class:`kol-input-color__input kol-input-color__input--color`,onBlur:this.handleBlur,onChange:this.handleChange,onClick:this.handleClick,onFocus:this.handleFocus,onInput:this.handleColorInput,onKeyDown:this.handleKeyDown,ref:this.ctaRef,type:`color`,ariaDescribedBy:a,"aria-invalid":s?`true`:void 0})}render(){let e=this.getRenderProp(`icons`),t=this.getRenderProp(`smartButton`),n=this.getRenderProp(`disabled`),r=[Q(e.left)].filter(Boolean),i=[typeof t==`object`&&t?o(oe,Object.assign({componentName:`button`,class:`kol-input-container__smart-button`},t,{hideLabel:!0,disabled:n})):null,Q(e.right)].filter(Boolean);return o(a,{key:`f780947a5694ef0b406557631cc7ee6da7b2c2bc`},o(re,Object.assign({key:`6a672fb8268fd37c1df68b678bedf76eff5e1b65`},this.getFormFieldProps({class:`kol-input-color`,accessKey:this.getRenderProp(`accessKey`)||void 0,shortKey:this.getRenderProp(`shortKey`)||void 0,variant:this.getRenderProp(`variant`)})),o(F,{key:`5a40ad68a1a8f450a3c5680111f1eb35d4203d06`,disabled:n,msg:this.getRenderProp(`msg`),touched:this.getRenderProp(`touched`),startAdornment:r,endAdornment:i},o(I,Object.assign({key:`5f5b6f4dbbf39a85bb93cdc733aea444253db9ab`},this.getInputProps())))))}watchAccessKey(e){k.apply(e,e=>this.setRenderProp(`accessKey`,e)),j(e,this._shortKey)}watchAriaDetails(e){this.applyAriaDetails(e)}watchAutoComplete(e){R.apply(e,e=>this.setRenderProp(`autoComplete`,e))}watchDisabled(e){this.applyDisabled(e)}watchHideMsg(e){this.applyHideMsg(e)}watchHideLabel(e){this.applyHideLabel(e)}watchHint(e){this.applyHint(e)}watchIcons(e){U.apply(e,e=>this.setRenderProp(`icons`,e))}watchInfoPopover(e){this.applyInfoPopover(e)}watchLabel(e){this.applyLabel(e)}watchMsg(e){this.applyMsg(e)}watchName(e){this.applyName(e)}watchOn(e){this.applyOn(e)}watchShortKey(e){O.apply(e,e=>this.setRenderProp(`shortKey`,e)),j(this._accessKey,e)}watchSmartButton(e){e==null?this.unsetRenderProp(`smartButton`):w.apply(e,e=>this.setRenderProp(`smartButton`,e))}watchSuggestions(e){J.apply(e,e=>this.setRenderProp(`suggestions`,e))}watchSyncValueBySelector(e){this.applySyncValueBySelector(e)}watchTooltipAlign(e){this.applyTooltipAlign(e)}watchTouched(e){this.applyTouched(e)}watchValue(e){X.apply(e,e=>this.setRenderProp(`value`,e)),this.formAssociation.setFormAssociatedValue(this.getRenderProp(`value`))}watchVariant(e){T.apply(e,e=>this.setRenderProp(`variant`,e))}get host(){return i(this)}static get watchers(){return{_accessKey:[`watchAccessKey`],_ariaDetails:[`watchAriaDetails`],_autoComplete:[`watchAutoComplete`],_disabled:[`watchDisabled`],_hideMsg:[`watchHideMsg`],_hideLabel:[`watchHideLabel`],_hint:[`watchHint`],_icons:[`watchIcons`],_infoPopover:[`watchInfoPopover`],_label:[`watchLabel`],_msg:[`watchMsg`],_name:[`watchName`],_on:[`watchOn`],_shortKey:[`watchShortKey`],_smartButton:[`watchSmartButton`],_suggestions:[`watchSuggestions`],_syncValueBySelector:[`watchSyncValueBySelector`],_tooltipAlign:[`watchTooltipAlign`],_touched:[`watchTouched`],_value:[`watchValue`],_variant:[`watchVariant`]}}};p([y(`ctaRef`)],$.prototype,`focus`,null),p([v(`ctaRef`)],$.prototype,`click`,null),$.style={default:fe};export{$ as kol_input_color};