import{c as e,o as t,r as n,s as r}from"./index-DcDxiC7I-DXk_rUat.js";import{o as i,r as a,t as o}from"./behavior-Eatm8kmr-BqSvgqpX.js";import{i as s,r as c,t as l}from"./index-DPUE9SuA.js";import{i as u,n as d}from"./dev.utils-BRNeztdD-BWUuW9QW.js";import{t as f}from"./base-web-component--IgFgz37-CZuvR3uB.js";import{i as p}from"./variant-quote-CPA_pFWU-Dtq2KY4_.js";import{t as m}from"./level-DQ5rZKg_-C0N0VPgA.js";import"./disabled-BdkcA-WS-C0XLs7f5.js";import"./label-BDgaSpkn-B_UnZfEZ.js";import{t as h}from"./label-CDp6ht3Z-b8-w0jxZ.js";import{t as g}from"./open-CIf2NgJu-Cq84LZ_l.js";import"./Heading-B-bvl0rB-DvjKGvYM.js";import{t as _}from"./element-interaction-DkGO5I_0-CYEJb_Yf.js";import"./block-bem-B2WJpaeb-1nc0E6VG.js";import"./component-CwO0zW8_-6kcThfJP.js";import"./component-DNi43x13-BLZ4jimo.js";import"./i18n-s5q4We3h-T5hSa8gs.js";import{t as v}from"./has-closer-DuZoKeMC-BPkEQKDU.js";import"./component-Bol9zKnv-D1rrzeWF.js";import"./component-CxauMHaQ-D2xVC3cV.js";import"./component-nvIRawJq-Dl2fBvaL.js";import"./component-DbEQyyOu-Cy1EboZu.js";import"./align-B29XBdiy-C3Wb0wLI.js";import"./label-with-expert-slot-LdmDsdfz-DFeSO_TQ.js";import"./variant-DKbetdU1-BImbsKuw.js";import"./tooltip-align-Bcuc9zWQ-CnTL7piy.js";import"./name-C-7s_t57-DU-u0dT0.js";import"./api-0jMCoYap-DcyyJCyX.js";import"./resolve-props-Cb0i2cmC-BHk788ee.js";import{n as y,t as b}from"./component-DWH3H2Sv-5CTh6E5F.js";import{i as x,r as S,t as C}from"./scroll-lock-7GtWWgCD-Ekq-n2BY.js";function w(e){if(typeof e!=`object`||!e)throw Error(`Invalid on callbacks: expected object, got ${typeof e}`);let{onCancel:t,onClose:n,onToggle:r}=e,i={};return typeof t==`function`&&(i.onCancel=t),typeof n==`function`&&(i.onClose=n),typeof r==`function`&&(i.onToggle=r),i}var T=p(`on`,{},w),E={required:[h],optional:[a,T,v,m]},D=s.forBlock(`kol-drawer`),O=D(`content`),k=D(`dialog`),A=D(),j=(e,t)=>{let{align:n,cardProps:i,expanded:a,handleAnimationEnd:o,handleCancel:s,handleClose:c,headingId:l,label:u,modal:d,refDialog:f,refWrapper:p}=e;return r(C,{blockClass:k,handleCancel:s,handleClose:c,label:u,labelledBy:l,modal:d,refDialog:f},r(`div`,{class:D(`wrapper`,{[n]:!0,"is-closing":!a,open:a}),onAnimationEnd:o,ref:p},r(b,Object.assign({},i),r(`div`,{class:O},t))))},M=`@charset "UTF-8";
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
@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1790424658950"); /* IE9*/
  src: url("kolicons.eot?t=1790424658950#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1790424658950") format("woff2"), url("kolicons.woff?t=1790424658950") format("woff"), url("kolicons.ttf?t=1790424658950") format("truetype"), url("kolicons.svg?t=1790424658950#kolicons") format("svg"); /* iOS 4.1- */
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
    text-decoration-line: none;
    /* The interactive element is the flex container positioning the text, so it carries the
       box the root element used to be. The UA default underline sits on that element too,
       so suppressing \`text-decoration\` on the wrapper alone is not enough. */
  }
  .kol-card .kol-button__interactive-element {
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
  .kol-card .kol-button__interactive-element::before {
    content: "​";
  }
  .kol-card .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-card .kol-button {
    /* The tooltip wrapper holds only the absolutely positioned floating tooltip. In the legacy
       DOM it sat in a block flow and collapsed to zero height; as a flex/grid item it would
       stretch to the container height instead, adding phantom rows to the layout. */
  }
  .kol-card .kol-button__tooltip {
    height: 0;
  }
  .kol-card .kol-button--external-link > .kolicon-link-external::before {
    content: none;
  }
  .kol-card .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {
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
}`,N=()=>{},P=class extends f{constructor(t){super(),e(this,t),this.dialogRef=_(),this.wrapperRef=_(),this.cardCloseButtonRef=_(),this.cardCloseTooltipBehavior=new o(this.stateAccess),this.handleAnimationEnd=e=>{var t,n;e.animationName.includes(`slideOut`)&&((n=(t=this.dialogRef.el)?.close)==null||n.call(t))},this.handleCancel=e=>{var t,n;i(e),!e.defaultPrevented&&((n=(t=this.getRenderProp(`on`)).onCancel)==null||n.call(t,e),!e.defaultPrevented&&this.host&&!c(this.host,l.cancel)&&e.preventDefault())},this.handleClose=e=>{var t,n;if(e.target!==this.dialogRef.el)return;x(this),this.closeDrawer();let r=this.getRenderProp(`on`);(t=r.onClose)==null||t.call(r),(n=r.onToggle)==null||n.call(r,!1),this.host&&(c(this.host,l.close),c(this.host,l.toggle))},this.handleCardClose=()=>{this.cardCloseTooltipBehavior.hideTooltip(),this.closeDrawer()},this.ariaDescriptionId=u(),this.expanded=!1,this.headingId=d(`drawer-heading`),this.modal=!0,this._hasCloser=!1,this._level=0}componentWillLoad(){this.initRenderProps(E),this.cardCloseButtonProps=y(this.host),this.cardCloseTooltipBehavior.componentWillLoad({label:this.cardCloseButtonProps.label,align:this.cardCloseButtonProps.tooltipAlign}),this.watchAlign(this._align),this.watchHasCloser(this._hasCloser),this.watchLabel(this._label),this.watchLevel(this._level),this.watchOn(this._on),this.watchOpen(this._open)}componentDidLoad(){this.openOrCloseBasedOnState()}componentDidRender(){this.cardCloseButtonRef.el&&this.cardCloseTooltipBehavior.syncListeners(void 0,this.cardCloseButtonRef.el,!0)}disconnectedCallback(){x(this),this.cardCloseTooltipBehavior.destroy()}async show(e=!1){this.showDrawer(e)}async showModal(){await this.show(!0)}async open(){await this.show(!1)}async close(){this.closeDrawer()}showDrawer(e){var t,n,r,i;let a=this.dialogRef.el;a?.open||(this.setState(`modal`,e),this.setState(`expanded`,!0),e?((t=a?.showModal)==null||t.call(a),a&&S(this)):(n=a?.show)==null||n.call(a),(i=(r=this.getRenderProp(`on`)).onToggle)==null||i.call(r,!0),this.host&&c(this.host,l.toggle))}closeDrawer(){var e,t;this.setState(`expanded`,!1);let n=this.wrapperRef.el;n&&window.getComputedStyle(n).animationName===`none`&&((t=(e=this.dialogRef.el)?.close)==null||t.call(e))}openOrCloseBasedOnState(){this.getState(`expanded`)?this.showDrawer(this.getState(`modal`)):this.closeDrawer()}buildCardProps(){return{ariaDescriptionId:this.getState(`ariaDescriptionId`),closeButtonProps:this.cardCloseButtonProps,handleBlur:N,handleClose:this.handleCardClose,handleFocus:N,hasCloser:this.getRenderProp(`hasCloser`),headingId:this.getState(`headingId`),href:``,label:this.getRenderProp(`label`),level:this.getRenderProp(`level`),on:{},refCloseButton:this.cardCloseButtonRef,refCta:N,refTooltip:this.cardCloseTooltipBehavior.setTooltipElementRef,target:``}}render(){return r(n,{key:`335fa07b8ce3453b06e6ef2096c71c1002aa8c8c`,class:A},r(j,{key:`a053bc089b779bb683feeb589668007478ccb33e`,align:this.getRenderProp(`align`),ariaDescriptionId:this.getState(`ariaDescriptionId`),cardProps:this.buildCardProps(),expanded:this.getState(`expanded`),handleAnimationEnd:this.handleAnimationEnd,handleCancel:this.handleCancel,handleClose:this.handleClose,hasCloser:this.getRenderProp(`hasCloser`),headingId:this.getState(`headingId`),label:this.getRenderProp(`label`),level:this.getRenderProp(`level`),modal:this.getState(`modal`),on:this.getRenderProp(`on`),refDialog:this.dialogRef,refWrapper:this.wrapperRef},r(`slot`,{key:`f1da8490f101d73e42a9d64b1845e9f11ec9f0c1`})))}watchAlign(e){a.apply(e,e=>this.setRenderProp(`align`,e))}watchHasCloser(e){v.apply(e,e=>this.setRenderProp(`hasCloser`,e))}watchLabel(e){h.apply(e,e=>this.setRenderProp(`label`,e))}watchLevel(e){m.apply(e,e=>this.setRenderProp(`level`,e))}watchOn(e){T.apply(e,e=>this.setRenderProp(`on`,e))}watchOpen(e){g.apply(e,e=>{this.setState(`expanded`,e),this.dialogRef.el&&this.openOrCloseBasedOnState()})}get host(){return t(this)}static get watchers(){return{_align:[`watchAlign`],_hasCloser:[`watchHasCloser`],_label:[`watchLabel`],_level:[`watchLevel`],_on:[`watchOn`],_open:[`watchOpen`]}}};P.style={default:M};export{P as kol_drawer};