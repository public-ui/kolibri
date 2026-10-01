import{c as e,l as t,r as n,s as r,v as i}from"./index-CNT2K9Es-inqeXPzX.js";import"./behavior-ojkxD653-CC9yG8fz.js";import"./index-eimArwtg.js";import{n as a}from"./dev.utils-CJuHqJK7-BHGL7WLL.js";import"./base-web-component--IgFgz37-CZuvR3uB.js";import{t as o}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import"./variant-quote-Bi5NwsIp-BpcCIA46.js";import"./disabled-vGicE4OD-Be9JlOc5.js";import"./label-CeTSiwZp-C1BdRcFP.js";import"./label-BXzgHxD8-Cafo0eat.js";import{t as s}from"./clsx-COFh-Vc8-DWAop4cA.js";import"./Heading-BUuqOqdt-CeM54USG.js";import{n as c,r as l,t as u}from"./element-interaction-DkGO5I_0-CYEJb_Yf.js";import"./block-bem-DXhBMAv_-oe0YCqiH.js";import{t as d}from"./component-BHxB0_7B-C_E1elEq.js";import"./component-BdhaNb8y-CDZGCaWt.js";import"./i18n-D2_tokqe-Djk0qxU3.js";import"./component-Bu4di63F-DUxQCgar.js";import"./component-C_ds0M99-Ddb-35QF.js";import"./component-ssDi-B6o-DldK56fe.js";import"./component-XWkrwS1X-C3UVHb7I.js";import"./component-fXEBZk2b-BSj_XgOP.js";import"./align-Coi3MuR6-B1sFCdcm.js";import"./label-with-expert-slot-DNw2u-YE-DfIOAyOT.js";import{t as f}from"./smart-button-BNgrtCab-VTZT7EIk.js";import{n as p}from"./variant-DY3lW369-BfK6-J0n.js";import{r as m,t as h}from"./tooltip-align-DM4_tLvE-BIxXVdvg.js";import"./name-Bjupd3S7-BxafJ7Jn.js";import{t as g}from"./access-and-short-key-ijzCZfHm-Dx5Q-CAn.js";import"./behavior-BygXubs5-BzWNWbVs.js";import{n as _}from"./controller-BM2C5gBD-Cbgs162V.js";import{t as v}from"./component-CIYIgPpk-C_hQwvNH.js";import"./aria-CUUjS3PR-BQtXnh_a.js";import"./icon-button-DehE-JfS-5YXwp3IH.js";import{t as y}from"./input-container-C8aPAzaT-C_ZKGTOB.js";import{t as b}from"./input-BxTT-cb6-DmwNAk50.js";import{t as x}from"./suggestions-YKXUE3fI-C78mwO6p.js";import{i as S,n as C,r as w,t as T}from"./api-97WQsbVB-DeSJqKLw.js";import{t as E}from"./auto-complete-D4AbBRne-S52tSAOY.js";import{t as D}from"./suggestions-BNQNBUzi-c2MK9j0q.js";import{n as O,t as k}from"./required-BOpBp4UZ-Bq3nLzEu.js";import{t as A}from"./step-BT0DlX5N-B5TY-0E2.js";import{t as j}from"./placeholder-BCGJZcWd-DSKaOYdc.js";import{a as M,i as N,n as P,o as F,r as I,s as L}from"./number-value-BNKUlvUh-DZr0p6go.js";var R={required:[...C.required],optional:[...C.optional,h,E,S,I,N,M,j,k,O,m,f,A,D,p]},z=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1790873744868"); /* IE9*/
  src: url("kolicons.eot?t=1790873744868#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1790873744868") format("woff2"), url("kolicons.woff?t=1790873744868") format("woff"), url("kolicons.ttf?t=1790873744868") format("truetype"), url("kolicons.svg?t=1790873744868#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-input-number input {
    appearance: textfield;
    text-align: right;
  }
  .kol-input-number input::-webkit-inner-spin-button {
    display: none;
  }
}`,B=`kol-input-number__step-button`,V=e=>(e?.classList)?.contains(B)===!0,H=class extends T{constructor(e){super(),t(this,e),this.ctaRef=u(),this.id=a(`input-number`),this.inputHasFocus=!1,this.valueType=`null`,this.hasValue=!1,this.handleNumberInput=e=>{this._value=this.readInputValue(),this.handleInput(e,this._value)},this.handleNumberChange=e=>{let t=this.readInputValue();this.handleChange(e,t),this.hasValue=!!t},this.handleNumberFocus=e=>{V(e.relatedTarget)||this.handleFocus(e)},this.handleNumberBlur=e=>{V(e.relatedTarget)||this.handleBlur(e)},this.handleNumberKeyDown=e=>{this.handleKeyDown(e),(e.code===`Enter`||e.code===`NumpadEnter`)&&_({form:this.host})},this.handleStepDown=e=>{this.step(e,`down`)},this.handleStepUp=e=>{this.step(e,`up`)},this._autoComplete=`off`,this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._readOnly=!1,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this.initFormAssociation(`number`,this._name)}async getValue(){return this.remapValue(this.getRenderProp(`value`))}async focus(e){}async click(){}componentWillLoad(){this.initRenderProps(R),this.unsetRenderProp(`smartButton`),this._touched=this._touched===!0,this.watchAriaDetails(this._ariaDetails),this.watchName(this._name),this.watchSyncValueBySelector(this._syncValueBySelector),this.watchTouched(this._touched),this.watchAccessKey(this._accessKey),this.watchMsg(this._msg),this.watchDisabled(this._disabled),this.watchHideMsg(this._hideMsg),this.watchHideLabel(this._hideLabel),this.watchHint(this._hint),this.watchInfoPopover(this._infoPopover),this.watchLabel(this._label),this.watchShortKey(this._shortKey),this.watchSmartButton(this._smartButton),this.watchOn(this._on),this.watchTooltipAlign(this._tooltipAlign),this.watchVariant(this._variant),this.watchIcons(this._icons),this.watchAutoComplete(this._autoComplete),this.watchMax(this._max),this.watchMin(this._min),this.watchSuggestions(this._suggestions),this.watchPlaceholder(this._placeholder),this.watchReadOnly(this._readOnly),this.watchRequired(this._required),this.watchStep(this._step),this.watchValue(this._value),this.hasValue=!!this.getRenderProp(`value`)}disconnectedCallback(){this.destroyFormField()}remapValue(e){return L(e,this.valueType)}readInputValue(){return this.remapValue(F(this.ctaRef.el?.value))}step(e,t){var n,r,i;t===`up`?(n=this.ctaRef.el)==null||n.stepUp():(r=this.ctaRef.el)==null||r.stepDown(),this._value=this.readInputValue(),this.handleInput(e,this._value),this.handleChange(e,this._value),this.hasValue=!!this._value,(i=this.ctaRef.el)==null||i.focus()}renderStepButton(t){return this._disabled||this._readOnly||i(`inputNumberButtons`,this.host)===`hide`?null:e(`button`,{type:`button`,"aria-hidden":`true`,tabIndex:-1,class:`${B} ${B}-${t} kol-input-container__smart-button`,"data-testid":`kol-input-number-step-${t}`,onClick:t===`up`?this.handleStepUp:this.handleStepDown,disabled:this._disabled||this._readOnly},e(d,{icons:t===`up`?`kolicon-plus`:`kolicon-minus`,label:``}))}getInputProps(){let t=this.id,n=this.getRenderProp(`accessKey`),r=this.getRenderProp(`placeholder`),i=this.getRenderProp(`shortKey`),a=this.getRenderProp(`suggestions`),{ariaDescribedBy:o,hasError:s}=this.getAria();return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({id:t,hideLabel:this.getRenderProp(`hideLabel`),label:this.getRenderProp(`label`),disabled:this.getRenderProp(`disabled`),name:this.getRenderProp(`name`)||void 0},n?{accessKey:n}:{}),{value:this.getRenderProp(`value`)??null,required:this.getRenderProp(`required`)}),r===void 0?{}:{placeholder:r}),{autoComplete:this.getRenderProp(`autoComplete`),readonly:this.getRenderProp(`readOnly`),min:this.getRenderProp(`min`)??null,max:this.getRenderProp(`max`)??null,step:this.getRenderProp(`step`)??null,touched:this.getRenderProp(`touched`),msg:this.getRenderProp(`msg`)}),i?{"aria-keyshortcuts":i}:{}),a.length>0?{suggestions:e(x,{id:t,suggestions:a})}:{}),{ref:this.ctaRef,type:`number`,onBlur:this.handleNumberBlur,onChange:this.handleNumberChange,onClick:this.handleClick,onFocus:this.handleNumberFocus,onInput:this.handleNumberInput,onKeyDown:this.handleNumberKeyDown,ariaDescribedBy:o,"aria-invalid":s?`true`:void 0})}render(){let t=this.getRenderProp(`disabled`),{startAdornment:r,endAdornment:i}=w({icons:this.getRenderProp(`icons`),smartButton:this.getRenderProp(`smartButton`),disabled:t,startAdornment:this.renderStepButton(`down`),endAdornment:this.renderStepButton(`up`)});return e(n,{key:`227abbc04bf2477ae358f63e412a16ec3456a86a`},e(v,Object.assign({key:`d4402b7c37ddcc8b2a27bd6cefced7e9ad0c5111`},this.getFormFieldProps({class:s(`kol-input-number`,`number`,{"has-value":this.hasValue}),accessKey:this.getRenderProp(`accessKey`)||void 0,shortKey:this.getRenderProp(`shortKey`)||void 0,variant:this.getRenderProp(`variant`),required:this.getRenderProp(`required`),readOnly:this.getRenderProp(`readOnly`)})),e(y,{key:`1f070a7949d78699f04292f271e53b8f3e09454f`,disabled:t,msg:this.getRenderProp(`msg`),touched:this.getRenderProp(`touched`),startAdornment:r,endAdornment:i},e(b,Object.assign({key:`fc21dd8a73f2d986f32638c0850fda73b9d6abb6`},this.getInputProps())))))}watchAccessKey(e){h.apply(e,e=>this.setRenderProp(`accessKey`,e)),g(e,this._shortKey)}watchAriaDetails(e){this.applyAriaDetails(e)}watchAutoComplete(e){E.apply(e,e=>this.setRenderProp(`autoComplete`,e))}watchDisabled(e){this.applyDisabled(e)}watchHideMsg(e){this.applyHideMsg(e)}watchHideLabel(e){this.applyHideLabel(e)}watchHint(e){this.applyHint(e)}watchIcons(e){S.apply(e,e=>this.setRenderProp(`icons`,e))}watchInfoPopover(e){this.applyInfoPopover(e)}watchLabel(e){this.applyLabel(e)}watchMax(e){I.apply(e,e=>this.setRenderProp(`max`,e))}watchMin(e){N.apply(e,e=>this.setRenderProp(`min`,e))}watchMsg(e){this.applyMsg(e)}watchName(e){this.applyName(e)}watchOn(e){this.applyOn(e)}watchPlaceholder(e){j.apply(e,e=>this.setRenderProp(`placeholder`,e))}watchReadOnly(e){k.apply(e,e=>this.setRenderProp(`readOnly`,e))}watchRequired(e){O.apply(e,e=>this.setRenderProp(`required`,e))}watchShortKey(e){m.apply(e,e=>this.setRenderProp(`shortKey`,e)),g(this._accessKey,e)}watchSmartButton(e){e==null?this.unsetRenderProp(`smartButton`):f.apply(e,e=>this.setRenderProp(`smartButton`,e))}watchStep(e){A.apply(e,e=>this.setRenderProp(`step`,e))}watchSuggestions(e){D.apply(e,e=>this.setRenderProp(`suggestions`,e))}watchSyncValueBySelector(e){this.applySyncValueBySelector(e)}watchTooltipAlign(e){this.applyTooltipAlign(e)}watchTouched(e){this.applyTouched(e)}watchValue(e){M.apply(e,e=>this.setRenderProp(`value`,e)),this.formAssociation.setFormAssociatedValue(this.getRenderProp(`value`)??null),e!=null&&(this.valueType=P(e))}watchVariant(e){p.apply(e,e=>this.setRenderProp(`variant`,e))}get host(){return r(this)}static get watchers(){return{_accessKey:[`watchAccessKey`],_ariaDetails:[`watchAriaDetails`],_autoComplete:[`watchAutoComplete`],_disabled:[`watchDisabled`],_hideMsg:[`watchHideMsg`],_hideLabel:[`watchHideLabel`],_hint:[`watchHint`],_icons:[`watchIcons`],_infoPopover:[`watchInfoPopover`],_label:[`watchLabel`],_max:[`watchMax`],_min:[`watchMin`],_msg:[`watchMsg`],_name:[`watchName`],_on:[`watchOn`],_placeholder:[`watchPlaceholder`],_readOnly:[`watchReadOnly`],_required:[`watchRequired`],_shortKey:[`watchShortKey`],_smartButton:[`watchSmartButton`],_step:[`watchStep`],_suggestions:[`watchSuggestions`],_syncValueBySelector:[`watchSyncValueBySelector`],_tooltipAlign:[`watchTooltipAlign`],_touched:[`watchTouched`],_value:[`watchValue`],_variant:[`watchVariant`]}}};o([l(`ctaRef`)],H.prototype,`focus`,null),o([c(`ctaRef`)],H.prototype,`click`,null),H.style={default:z};export{H as kol_input_number};