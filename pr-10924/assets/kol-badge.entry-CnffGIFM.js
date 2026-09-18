import{J as e,_t as t,a as n,c as r,d as i,ft as a,o,r as s,s as c,u as l,ut as u}from"./index-C-CiPBDH.js";import{i as d,n as f}from"./dev.utils-3xMYti16-C4ikOhy3.js";import{t as p}from"./base-web-component--IgFgz37-CZuvR3uB.js";import{t as m}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import"./label-DxrksC9L-CyFw-z4A.js";import{r as h,t as g}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./_Uint8Array-CuELS0_2-BYXN1zbF.js";import{n as _}from"./normalizers-DEevvNbZ-BYR5tdE6.js";import"./component-CmFzOwYm-B-ppV_H5.js";import"./index-YF9sPUm--DsxDA9tu.js";import{t as v}from"./color-CeyCa7cR-DPg5FsAB.js";import"./label-De6GKT_4-B3yIRt_e.js";import"./variant-quote-JfuelQ4I-WipqRluF.js";import{t as y}from"./label-with-expert-slot-pcKVBAqt-CHOsHN3n.js";import"./align-DglmQnOH-CfC2tQM6.js";import{p as b}from"./component-CE7IQwDa-rxPMeWQa.js";import"./variant-class-name-BFZvmFM_-Dy_zamlk.js";import{t as x}from"./component-vqRjEo0A-qxIvNjHA.js";import"./component-CU4HB3cl-DHTni25C.js";import"./align-floating-elements-D6Kc-f8P-CLU5hWsB.js";import{t as S}from"./behavior-opTsLlOg-DH5GhaYO.js";import"./name-BOMzcWdF-BNvJd8To.js";import{t as C}from"./api-Dn9bhy8h-oemcRJvb.js";import{t as w}from"./resolve-props-LIHicHQT-D3T88CfZ.js";function T(e){let t=typeof e==`string`?a(e):e;if(typeof t==`object`&&t)return t;throw Error(`Invalid smart button: ${typeof e}`)}var E=_(`smartButton`,{_label:``},T),D={required:[y],optional:[v,E,b]},O=i.forBlock(`kol-badge`),k=O(`label`),A=O(`smart-button`),j=e=>{let{ariaDescriptionId:t,color:n,handleBlur:r,handleClick:i,handleFocus:a,handleMouseDown:s,icons:c,label:l,labelId:u,refSmartButton:d,refTooltip:f,smartButton:p,smartButtonProps:m}=e,h=typeof p==`object`&&!!p&&m!==void 0;return o(`div`,{class:O({"has-smart-button":h}),style:{backgroundColor:n.backgroundColor,color:n.foregroundColor}},o(x,{class:k,id:h?u:void 0,allowMarkdown:!0,icons:c,label:l}),h&&o(C,Object.assign({},m,{class:A,ariaDescriptionId:t,handleBlur:r,handleClick:i,handleFocus:a,handleMouseDown:s,refButton:d,refTooltip:f})),o(`br`,null))},M=`@charset "UTF-8";
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
@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1789739495784"); /* IE9*/
  src: url("kolicons.eot?t=1789739495784#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1789739495784") format("woff2"), url("kolicons.woff?t=1789739495784") format("woff"), url("kolicons.ttf?t=1789739495784") format("truetype"), url("kolicons.svg?t=1789739495784#kolicons") format("svg"); /* iOS 4.1- */
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
    width: auto;
    order: 3;
  }
}`;e(`[KolBadge] Optimierung des _color-Properties (rgba, rgb, hex usw.).`);var N=class extends p{constructor(e){super(),c(this,e),this.ctaRef=g(),this.tooltipBehavior=new S(this.stateAccess),this.handleClick=e=>{e.stopPropagation(),this.tooltipBehavior.hideTooltip();let n=this.smartButtonProps?.on.onClick;typeof n==`function`&&(t(e,this.ctaRef.el),n(e,void 0)),this.host&&l(this.host,r.click)},this.handleMouseDown=e=>{var t,n,i;(i=(t=this.smartButtonProps)==null?void 0:(n=t.on).onMouseDown)==null||i.call(n,e),this.host&&l(this.host,r.mousedown)},this.handleFocus=e=>{var t,n,i;(i=(t=this.smartButtonProps)==null?void 0:(n=t.on).onFocus)==null||i.call(n,e),this.host&&l(this.host,r.focus)},this.handleBlur=e=>{var t,n,i;(i=(t=this.smartButtonProps)==null?void 0:(n=t.on).onBlur)==null||i.call(n,e),this.host&&l(this.host,r.blur)},this.labelId=f(`badge-label`),this.ariaDescriptionId=d(),this._color=`#000`}componentWillLoad(){this.initRenderProps(D),this.unsetRenderProp(`smartButton`),this.watchColor(this._color),this.watchIcons(this._icons),this.watchLabel(this._label),this.watchSmartButton(this._smartButton)}componentDidRender(){this.ctaRef.el&&this.tooltipBehavior.syncListeners(void 0,this.ctaRef.el,!0)}disconnectedCallback(){this.tooltipBehavior.destroy()}applySmartButton(e){u(e,()=>{this.unsetRenderProp(`smartButton`),this.smartButtonProps=void 0,e!=null&&E.apply(e,e=>{this.setRenderProp(`smartButton`,e),this.smartButtonProps=w(Object.assign(Object.assign({},e),{_hideLabel:!0,_ariaControls:this.labelId}),this.host),this.tooltipBehavior.componentWillLoad({label:this.smartButtonProps.label,align:this.smartButtonProps.tooltipAlign})})})}async focus(e){}render(){return o(s,{key:`00c7c18cb1f996f63d1d084006326c1e40addc77`},o(j,{key:`61147a4cfbab3a6c1c95b1643afa82946b0cd115`,color:this.getRenderProp(`color`),icons:this.getRenderProp(`icons`),label:this.getRenderProp(`label`),labelId:this.labelId,smartButton:this.getRenderProp(`smartButton`),smartButtonProps:this.smartButtonProps,ariaDescriptionId:this.ariaDescriptionId,handleBlur:this.handleBlur,handleClick:this.handleClick,handleFocus:this.handleFocus,handleMouseDown:this.handleMouseDown,refSmartButton:this.ctaRef,refTooltip:this.tooltipBehavior.setTooltipElementRef}))}watchColor(e){v.apply(e,e=>this.setRenderProp(`color`,e))}watchIcons(e){b.apply(e,e=>this.setRenderProp(`icons`,e))}watchLabel(e){y.apply(e,e=>this.setRenderProp(`label`,e))}watchSmartButton(e){this.applySmartButton(e)}get host(){return n(this)}static get watchers(){return{_color:[`watchColor`],_icons:[`watchIcons`],_label:[`watchLabel`],_smartButton:[`watchSmartButton`]}}};m([h(`ctaRef`)],N.prototype,`focus`,null),N.style={default:M};export{N as kol_badge};