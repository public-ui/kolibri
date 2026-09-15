import{B as e,J as t,_t as n,a as r,c as i,d as a,ft as o,o as s,r as c,s as l,u,ut as d}from"./index-BBQOU1JR.js";import{i as f,n as p}from"./dev.utils-B0RnquMm-B40Q1F_9.js";import{n as m,t as h}from"./base-web-component--IgFgz37-CZuvR3uB.js";import{t as g}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import"./label-Dt_AAe-6-DUYdLcP_.js";import{r as _,t as v}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./_Uint8Array-CuELS0_2-BYXN1zbF.js";import{n as y}from"./normalizers-DWVZCEEd-DXioXoAI.js";import"./component-_PTab6yD-CMbMpwG6.js";import"./index-B_lu4hie-BaVJGhsP.js";import{t as b}from"./color-Bny-4aq3-CaG9IaZR.js";import"./label-B91IvZgi-IvmdBUKI.js";import"./variant-quote-NZCtZu5M-CveJqLDh.js";import{t as x}from"./label-with-expert-slot-B1Fz9bPl--W3QFLTg.js";import"./align-DkzUS6Lm-9_UgLDaq.js";import{a as S,c as ee,d as C,f as w,g as T,h as E,i as D,l as O,m as k,o as A,p as j,r as M,s as N,u as P}from"./component-QA6mnPbJ-D5uM7KCf.js";import"./variant-class-name-ByMQxdST-CcBssx7u.js";import{t as F}from"./component-BBzl2p79-BUn_HL-z.js";import"./component-0TUO8TMa--CsrtJMx.js";import"./align-floating-elements-Cf42W53a-C5w5g15f.js";import{n as I,t as L}from"./behavior-RfuKDrOT-CtN1WQjh.js";import{t as R}from"./name-BQrl--ry-CbF44RiG.js";import{a as z,i as B,o as V,r as H,t as U}from"./api-ChEtGqU5-DzB7di74.js";function W(e){let t=typeof e==`string`?o(e):e;if(typeof t==`object`&&t)return t;throw Error(`Invalid smart button: ${typeof e}`)}var G=y(`smartButton`,{_label:``},W),K={required:[x],optional:[b,G,j]},q=a.forBlock(`kol-badge`),J=q(`label`),Y=q(`smart-button`),X=e=>{let{ariaDescriptionId:t,color:n,handleBlur:r,handleClick:i,handleFocus:a,handleMouseDown:o,icons:c,label:l,labelId:u,refSmartButton:d,refTooltip:f,smartButton:p,smartButtonProps:m}=e,h=typeof p==`object`&&!!p&&m!==void 0;return s(`span`,{class:q({"has-smart-button":h}),style:{backgroundColor:n.backgroundColor,color:n.foregroundColor}},s(F,{class:J,id:h?u:void 0,allowMarkdown:!0,icons:c,label:l}),h&&s(U,Object.assign({},m,{class:Y,ariaDescriptionId:t,handleBlur:r,handleClick:i,handleFocus:a,handleMouseDown:o,refButton:d,refTooltip:f})))},Z={disabled:!1,hideLabel:!1,inline:!1,tooltipAlign:`top`,type:`button`};function Q(t,n){let r=m(z),i=e=>t=>{r[e]=t};return x.apply(t._label,i(`label`)),M.apply(t._accessKey,i(`accessKey`)),D.apply(t._ariaControls,i(`ariaControls`)),S.apply(t._ariaDescription,i(`ariaDescription`)),A.apply(t._ariaExpanded,i(`ariaExpanded`)),H.apply(t._ariaSelected,i(`ariaSelected`)),B.apply(t._on,i(`on`)),V.apply(t._type??Z.type,i(`type`)),N.apply(t._customClass,i(`customClass`)),ee.apply(t._disabled??Z.disabled,i(`disabled`)),O.apply(t._hideLabel??Z.hideLabel,i(`hideLabel`)),I.apply(t._id,i(`id`)),P.apply(t._inline??Z.inline,i(`inline`)),C.apply(t._role,i(`role`)),R.apply(t._name,i(`name`)),w.apply(t._shortKey,i(`shortKey`)),j.apply(t._icons,i(`icons`)),E.apply(t._tooltipAlign??Z.tooltipAlign,i(`tooltipAlign`)),typeof t._tabIndex==`number`?k.apply(t._tabIndex,i(`tabIndex`)):r.tabIndex=void 0,T.apply(t._variant??e(`buttonVariantDefault`,n)??`normal`,i(`variant`)),r}var te=`@charset "UTF-8";
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
* 6. kol-forced-colors - Defaults for forced colors and high contrast modes
* 7. kol-theme-forced-colors - Theme-specific styles for forced colors and high contrast modes
*/
@layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;
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
    .kol-button:focus-visible,
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
@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1789438422238"); /* IE9*/
  src: url("kolicons.eot?t=1789438422238#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1789438422238") format("woff2"), url("kolicons.woff?t=1789438422238") format("woff"), url("kolicons.ttf?t=1789438422238") format("truetype"), url("kolicons.svg?t=1789438422238#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
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
  .kol-badge {
    /* Visible with forced colors  */
    outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .kol-badge .kol-badge__smart-button {
    /* \`kol-button-wc-box-styles\` gives \`.kol-button\` \`width: 100%\`, which was harmless while
       the block sat inside a \`kol-button-wc\` wrapper element. The badge now renders
       \`ButtonFC\` directly, so the block IS the flex item — a 100% base size would claim the
       whole badge and squeeze the label. \`auto\` restores the wrapper's content sizing. */
    width: auto;
  }
}`;t(`[KolBadge] Optimierung des _color-Properties (rgba, rgb, hex usw.).`);var $=class extends h{constructor(e){super(),l(this,e),this.ctaRef=v(),this.tooltipBehavior=new L(this.stateAccess),this.handleClick=e=>{e.stopPropagation(),this.tooltipBehavior.hideTooltip();let t=this.smartButtonProps?.on.onClick;typeof t==`function`&&(n(e,this.ctaRef.el),t(e,void 0)),this.host&&u(this.host,i.click)},this.handleMouseDown=e=>{var t,n,r;(r=(t=this.smartButtonProps)==null?void 0:(n=t.on).onMouseDown)==null||r.call(n,e),this.host&&u(this.host,i.mousedown)},this.handleFocus=e=>{var t,n,r;(r=(t=this.smartButtonProps)==null?void 0:(n=t.on).onFocus)==null||r.call(n,e),this.host&&u(this.host,i.focus)},this.handleBlur=e=>{var t,n,r;(r=(t=this.smartButtonProps)==null?void 0:(n=t.on).onBlur)==null||r.call(n,e),this.host&&u(this.host,i.blur)},this.labelId=p(`badge-label`),this.ariaDescriptionId=f(),this._color=`#000`}componentWillLoad(){this.initRenderProps(K),this.unsetRenderProp(`smartButton`),this.watchColor(this._color),this.watchIcons(this._icons),this.watchLabel(this._label),this.watchSmartButton(this._smartButton)}componentDidRender(){this.ctaRef.el&&this.tooltipBehavior.syncListeners(void 0,this.ctaRef.el,!0)}disconnectedCallback(){this.tooltipBehavior.destroy()}applySmartButton(e){d(e,()=>{this.unsetRenderProp(`smartButton`),this.smartButtonProps=void 0,e!=null&&G.apply(e,e=>{this.setRenderProp(`smartButton`,e),this.smartButtonProps=Q(Object.assign(Object.assign({},e),{_hideLabel:!0,_ariaControls:this.labelId}),this.host),this.tooltipBehavior.componentWillLoad({label:this.smartButtonProps.label,align:this.smartButtonProps.tooltipAlign})})})}async focus(e){}render(){return s(c,{key:`167bce75a818de6a921dfcb8a2a4b85dd2f8eb46`},s(X,{key:`21db272423f76854722cd7efea503a87e6757a32`,color:this.getRenderProp(`color`),icons:this.getRenderProp(`icons`),label:this.getRenderProp(`label`),labelId:this.labelId,smartButton:this.getRenderProp(`smartButton`),smartButtonProps:this.smartButtonProps,ariaDescriptionId:this.ariaDescriptionId,handleBlur:this.handleBlur,handleClick:this.handleClick,handleFocus:this.handleFocus,handleMouseDown:this.handleMouseDown,refSmartButton:this.ctaRef,refTooltip:this.tooltipBehavior.setTooltipElementRef}))}watchColor(e){b.apply(e,e=>this.setRenderProp(`color`,e))}watchIcons(e){j.apply(e,e=>this.setRenderProp(`icons`,e))}watchLabel(e){x.apply(e,e=>this.setRenderProp(`label`,e))}watchSmartButton(e){this.applySmartButton(e)}get host(){return r(this)}static get watchers(){return{_color:[`watchColor`],_icons:[`watchIcons`],_label:[`watchLabel`],_smartButton:[`watchSmartButton`]}}};g([_(`ctaRef`)],$.prototype,`focus`,null),$.style={default:te};export{$ as kol_badge};