import{X as e,_ as t,c as n,o as r,r as i,s as a}from"./index-DcDxiC7I-Bbwhlup5.js";import{t as o}from"./behavior-Eatm8kmr-CTN2AVTt.js";import{T as s,i as c,r as l,t as u}from"./index-UNffDw32.js";import{i as d}from"./dev.utils-BRNeztdD-_UskE8CF.js";import{n as f,t as p}from"./base-web-component--IgFgz37-CZuvR3uB.js";import{i as m,u as h}from"./variant-quote-CPA_pFWU-CsxuKhT5.js";import{t as g}from"./disabled-BdkcA-WS-DH3Eeavn.js";import"./label-BDgaSpkn-NoYVNkOV.js";import"./label-CDp6ht3Z-BehQnPM3.js";import{n as _,t as v}from"./element-focus-Cp994Rrk-BCxGGpIg.js";import{n as y,t as ee}from"./element-click-CCljCb-a-Bw1_18r4.js";import{t as b}from"./element-interaction-DkGO5I_0-CYEJb_Yf.js";import"./block-bem-B2WJpaeb-ChoP-l0H.js";import"./component-CwO0zW8_-DkZAc2Qh.js";import"./component-DNi43x13-BnqMhBxr.js";import"./i18n-s5q4We3h-B5facG0A.js";import{t as x}from"./component-Bol9zKnv-CgMYNJoG.js";import"./component-CxauMHaQ-BO-WcTnC.js";import"./component-nvIRawJq-DVY0KYbi.js";import{t as S}from"./component-DbEQyyOu-BGckKW6H.js";import"./align-B29XBdiy-DNBU1Kch.js";import{t as C}from"./label-with-expert-slot-LdmDsdfz-Dq-v9csw.js";import{n as te}from"./variant-DKbetdU1-BCYchCGj.js";import{a as ne,c as w,d as T,f as E,i as D,l as O,n as k,o as A,r as j,s as M,t as N,u as P}from"./tooltip-align-Bcuc9zWQ-BIf-rMYd.js";import"./name-C-7s_t57-Hm_n1VtM.js";import"./api-0jMCoYap-SVPeYtRH.js";import{t as F}from"./resolve-props-Cb0i2cmC-DU2nRw_R.js";import{t as I}from"./href-B3UMHW6_-MU5LiTF2.js";import{t as L}from"./link-target-B3zq6oZc-BHoz9lix.js";import{a as R,i as z,n as re,o as B,r as V,t as H}from"./api-WaVX7leM-CCcArhdz.js";import{t as U}from"./access-and-short-key-ijzCZfHm-Dx5Q-CAn.js";import{n as W,t as G}from"./controller-BzYze_SO-CsL38igo.js";import{t as K}from"./orientation-CkztOikx-DM9BSAUr.js";import{n as q}from"./keyboard-DNd73LVa-BCj4IeP3.js";var J=m(`items`,[],e=>h(e),e=>e.every(e=>typeof e==`object`&&!!e)),Y={required:[C,J],optional:[K]},X=c.forBlock(`kol-toolbar`)(`item`),ie=(e,t,n,r)=>{let i=t===n&&!e.disabled?0:-1;return a(`div`,{class:X,key:t,ref:e.refWrapper},e.type===`link`?a(H,Object.assign({},e.getFcProps(i,r))):a(S,Object.assign({},e.getFcProps(i))))},ae=({class:e,currentIndex:t,itemRecords:n,label:r,location:i,orientation:o})=>a(x,{block:`kol-toolbar`,class:e,modifiers:{"orientation-horizontal":o===`horizontal`,"orientation-vertical":o===`vertical`},role:`toolbar`,"aria-label":r},n.map((e,n)=>ie(e,n,t,i))),Z={disabled:!1,hideLabel:!1,inline:!0,tooltipAlign:`right`};function oe(e){let t=f(B),n=e=>n=>{t[e]=n};return I.apply(e._href,n(`href`)),N.apply(e._accessKey,n(`accessKey`)),k.apply(e._ariaControls,n(`ariaControls`)),re.apply(e._ariaCurrentValue,n(`ariaCurrentValue`)),j.apply(e._ariaDescription,n(`ariaDescription`)),D.apply(e._ariaExpanded,n(`ariaExpanded`)),V.apply(e._ariaOwns,n(`ariaOwns`)),ne.apply(e._customClass,n(`customClass`)),g.apply(e._disabled??Z.disabled,n(`disabled`)),z.apply(e._download,n(`download`)),A.apply(e._hideLabel??Z.hideLabel,n(`hideLabel`)),P.apply(e._icons,n(`icons`)),M.apply(e._inline??Z.inline,n(`inline`)),C.apply(e._label,n(`label`)),R.apply(e._on,n(`on`)),w.apply(e._role,n(`role`)),O.apply(e._shortKey,n(`shortKey`)),L.apply(e._target,n(`target`)),E.apply(e._tooltipAlign??Z.tooltipAlign,n(`tooltipAlign`)),te.apply(e._variant,n(`variant`)),typeof e._tabIndex==`number`?T.apply(e._tabIndex,n(`tabIndex`)):t.tabIndex=void 0,U(e._accessKey,e._shortKey),t}var se=(e,t)=>e.type===`link`?ce(e,t):Q(e,t),Q=(t,n)=>{let r=new o(p.stateLess),i=b(),a=d(),s,c=F(t,n()),f=t._value;r.componentWillLoad({label:c.label,align:c.tooltipAlign});let m=(e,t)=>{s&&l(s,e,t)},h=t=>{t.stopPropagation(),r.hideTooltip(),c.type===`submit`?W({form:s}):c.type===`reset`?G({form:s}):typeof c.on.onClick==`function`&&(e(t,i.el),c.on.onClick(t,f)),m(u.click,f)},g=e=>{var t,n;(n=(t=c.on).onMouseDown)==null||n.call(t,e),m(u.mousedown)},_=e=>{var t,n;(n=(t=c.on).onFocus)==null||n.call(t,e),m(u.focus)},v=e=>{var t,n;(n=(t=c.on).onBlur)==null||n.call(t,e),m(u.blur)};return{type:`button`,disabled:c.disabled,getElement:()=>i.el,getFcProps:e=>Object.assign(Object.assign({},c),{ariaDescriptionId:a,handleBlur:v,handleClick:h,handleFocus:_,handleMouseDown:g,refButton:i,refTooltip:r.setTooltipElementRef,tabIndex:typeof t._tabIndex==`number`?c.tabIndex:e}),refWrapper:e=>{s=e},syncListeners:()=>{i.el&&r.syncListeners(void 0,i.el,!0)},destroy:()=>r.destroy()}},ce=(n,r)=>{let i=new o(p.stateLess),a=b(),s=d(),c,f=n,m=oe(Object.assign(Object.assign({},f),{_inline:f._inline??!1,_variant:f._variant??t(`buttonVariantDefault`,r())??`normal`}));i.componentWillLoad({label:m.label.length>0?m.label:m.href,align:m.tooltipAlign});let h=t=>{if(i.hideTooltip(),m.disabled){t.preventDefault();return}typeof m.on.onClick==`function`&&(e(t,a.el),m.on.onClick(t,m.href)),c&&l(c,u.click,m.href)};return{type:`link`,disabled:m.disabled,getElement:()=>a.el,getFcProps:(e,t)=>Object.assign(Object.assign({},m),{ariaCurrent:t!==``&&t===m.href?m.ariaCurrentValue:``,ariaDescriptionId:s,expertSlot:n._label===``,handleAnchorClick:h,refAnchor:a,refTooltip:i.setTooltipElementRef,tabIndex:typeof n._tabIndex==`number`?m.tabIndex:e}),refWrapper:e=>{c=e},syncListeners:()=>{a.el&&i.syncListeners(void 0,a.el,!0)},destroy:()=>i.destroy()}},le=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1790382895561"); /* IE9*/
  src: url("kolicons.eot?t=1790382895561#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1790382895561") format("woff2"), url("kolicons.woff?t=1790382895561") format("woff"), url("kolicons.ttf?t=1790382895561") format("truetype"), url("kolicons.svg?t=1790382895561#kolicons") format("svg"); /* iOS 4.1- */
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
  :host {
    display: inline-block;
  }
  .kol-link {
    display: flex;
    height: 100%;
    min-height: var(--a11y-min-size);
    text-decoration-line: none;
    /* The interactive element is the flex container positioning the text, so it carries the
       box the root element used to be. The UA default underline sits on that element too,
       so suppressing \`text-decoration\` on the wrapper alone is not enough. */
  }
  .kol-link__interactive-element {
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
  .kol-link__interactive-element::before {
    content: "​";
  }
  .kol-link__text {
    flex: 1 0 100%;
  }
  .kol-link {
    /* The tooltip wrapper holds only the absolutely positioned floating tooltip. In the legacy
       DOM it sat in a block flow and collapsed to zero height; as a flex/grid item it would
       stretch to the container height instead, adding phantom rows to the layout. */
  }
  .kol-link__tooltip {
    height: 0;
  }
  .kol-link--external-link > .kolicon-link-external::before {
    content: none;
  }
  .kol-link--external-link .kol-link__interactive-element > .kolicon-link-external::before {
    content: none;
  }
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
    height: 100%;
    min-height: var(--a11y-min-size);
    text-decoration-line: none;
    /* The interactive element is the flex container positioning the text, so it carries the
       box the root element used to be. The UA default underline sits on that element too,
       so suppressing \`text-decoration\` on the wrapper alone is not enough. */
  }
  .kol-button__interactive-element {
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
  .kol-button__interactive-element::before {
    content: "​";
  }
  .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-button {
    /* The tooltip wrapper holds only the absolutely positioned floating tooltip. In the legacy
       DOM it sat in a block flow and collapsed to zero height; as a flex/grid item it would
       stretch to the container height instead, adding phantom rows to the layout. */
  }
  .kol-button__tooltip {
    height: 0;
  }
  .kol-button--external-link > .kolicon-link-external::before {
    content: none;
  }
  .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {
    content: none;
  }
  .kol-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .kol-toolbar--orientation-vertical {
    flex-direction: column;
    align-items: stretch;
  }
  .kol-toolbar--orientation-vertical .kol-span {
    align-items: flex-start;
  }
  .kol-toolbar:focus-within {
    outline: 1px solid;
    outline-offset: 2px;
  }
}`,ue=[q.ArrowUp,q.ArrowDown,q.ArrowRight,q.ArrowLeft],$=class extends p{constructor(e){super(),n(this,e),this.currentIndex=0,this.itemRecords=[],this.location=``}componentWillLoad(){this.initRenderProps(Y),this.watchLabel(this._label),this.watchItems(this._items),this.watchOrientation(this._orientation),this.unsubscribeOnLocationChange=s(e=>{this.location=e})}componentDidRender(){this.itemRecords.forEach(e=>e.syncListeners())}disconnectedCallback(){this.unsubscribeOnLocationChange&&=(this.unsubscribeOnLocationChange(),void 0),this.itemRecords.forEach(e=>e.destroy())}async focus(e){let t=this.getCurrentItemElement();if(t)return v(this.host,()=>_(t,e))}async click(){let e=this.getCurrentItemElement();if(e)return ee(this.host,async()=>y(e))}getCurrentItemElement(){let e=this.itemRecords[this.currentIndex];return e&&!e.disabled?e.getElement():void 0}setFirstEnabledItemIndex(){this.currentIndex=this.itemRecords.findIndex(e=>!e.disabled)}findNextEnabledItemIndex(e,t){let n=this.itemRecords.length;for(let r=1;r<=n;r++){let i=((e+t*r)%n+n)%n;if(!this.itemRecords[i].disabled)return i}}handleKeyDown(e){var t;let n=e.code;if(!ue.includes(n)||(e.preventDefault(),this.itemRecords.length===0))return;let r=n===q.ArrowUp||n===q.ArrowLeft?-1:1,i=this.findNextEnabledItemIndex(this.currentIndex,r);i!==void 0&&i!==this.currentIndex&&(this.currentIndex=i,(t=this.itemRecords[i].getElement())==null||t.focus())}handleFocusout(e){e.target===this.host&&this.setFirstEnabledItemIndex()}render(){return a(i,{key:`249d5b2a0d6848d8e699cc31c86117f8e8dca76d`},a(ae,{key:`d3f1a1e187283a6b862371c88cf98015736b7c8d`,currentIndex:this.currentIndex,itemRecords:this.itemRecords,label:this.getRenderProp(`label`),location:this.location,orientation:this.getRenderProp(`orientation`)}))}watchLabel(e){C.apply(e,e=>this.setRenderProp(`label`,e))}watchItems(e){J.apply(e,e=>{this.setRenderProp(`items`,e),this.itemRecords.forEach(e=>e.destroy()),this.itemRecords=e.map(e=>se(e,()=>this.host)),this.setFirstEnabledItemIndex()})}watchOrientation(e){K.apply(e,e=>this.setRenderProp(`orientation`,e))}get host(){return r(this)}static get watchers(){return{_label:[`watchLabel`],_items:[`watchItems`],_orientation:[`watchOrientation`]}}};$.style={default:le};export{$ as kol_toolbar};