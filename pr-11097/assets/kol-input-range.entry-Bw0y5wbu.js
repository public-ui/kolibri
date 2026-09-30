import{c as e,o as t,r as n,s as r}from"./index-DoSJ-Gvj-CY_5vNS9.js";import"./behavior-BhBxAvt5-DDN9u87a.js";import"./index-B_h3T3Kh.js";import{n as i,t as a}from"./dev.utils-DaBrNORr-3dvDVdWj.js";import"./base-web-component--IgFgz37-CZuvR3uB.js";import{t as o}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import"./variant-quote-Cuubd2oS-Dc-Kep9M.js";import"./disabled-CojzC4_Y-CsUzjM6u.js";import"./label-CeTSiwZp-BgJ0rfvf.js";import"./label-DwrSZniq-7iLYRyap.js";import"./Heading-B8GqnxaG-CP9-FA1V.js";import{n as s,r as c,t as l}from"./element-interaction-DkGO5I_0-CYEJb_Yf.js";import"./block-bem-DXhBMAv_-MGPeSVId.js";import"./component-gGgKYzDU-BhLLwo1x.js";import"./component-DiYb-uG1-B3Vv5wyt.js";import"./i18n-D2_tokqe-D0Wpvz2Y.js";import"./component-guyF0SVd-n2duCij6.js";import"./component-D4bMu1b0-7o2vhoxE.js";import"./component-C2iCTO9d-B97kJFan.js";import"./component-B8cIfeYE-Cl0_YPtG.js";import"./component-YRLAuWA--DgsPYkWP.js";import"./align-Coi3MuR6-C7MiiEA0.js";import"./label-with-expert-slot-Drr-eT_y-CjcYZczL.js";import{n as u}from"./variant-DjntMFfM-ZnKYwOsj.js";import{r as d,t as f}from"./tooltip-align-CJkgtGcL-B3eswgVK.js";import"./name-BU_3z1AF-3N11QSCs.js";import{t as p}from"./access-and-short-key-ijzCZfHm-Dx5Q-CAn.js";import"./behavior-Jdq0GIfp-qK4P5DFi.js";import{n as m}from"./controller-BM2C5gBD-CAnPFaa5.js";import{t as h}from"./component-Chg7219m-C3iE1I3j.js";import"./aria-D1foCRLl-C9XmfwRF.js";import"./icon-button-BUhQe6bR-BWhZpwyi.js";import{t as g}from"./input-container-BHhfzt_a-CPPloMs9.js";import{t as _}from"./input-DyL9LABu-BWKl0pR7.js";import{t as v}from"./suggestions-hM9UkCnA-B-VLwsuQ.js";import{i as y,n as b,r as x,t as S}from"./api-PM8ncYnc-ChjX0j7J.js";import{t as C}from"./auto-complete-BjR1_eBc-vTi_R5ke.js";import{t as w}from"./suggestions-BTk2fS82-Ce_6fUTN.js";import{a as T,c as E,i as D,n as O,r as k,s as A,t as j}from"./number-value-BoF8gkDb-eTcfcggl.js";var M={required:[...b.required],optional:[...b.optional,f,C,y,k,D,T,d,E,w,u]},N=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1790790534324"); /* IE9*/
  src: url("kolicons.eot?t=1790790534324#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1790790534324") format("woff2"), url("kolicons.woff?t=1790790534324") format("woff"), url("kolicons.ttf?t=1790790534324") format("truetype"), url("kolicons.svg?t=1790790534324#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-input-range__inputs-wrapper {
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
  .kol-input-range__input--number {
    width: var(--kolibri-input-range--input-number--width);
    text-align: right;
  }
  .kol-input-range__input--range {
    background-color: white;
    display: inline-block;
    /* Design-Hack - related with flex-grow */
    width: 0;
    min-width: calc(128 * 1rem / var(--kolibri-root-font-size, 16));
    height: calc(8 * 1rem / var(--kolibri-root-font-size, 16));
    margin: 0;
    padding: 0;
    flex-grow: 1;
    line-height: 1.5;
    appearance: none;
    border: 1px solid black;
  }
  .kol-input-range__input:not(:disabled).kol-input-range__input--range::-webkit-slider-thumb {
    cursor: pointer;
  }
  .kol-input-range__input--range::-webkit-slider-thumb {
    background-color: black;
    border-radius: 20px;
    width: calc(20 * 1rem / var(--kolibri-root-font-size, 16));
    height: calc(20 * 1rem / var(--kolibri-root-font-size, 16));
    -webkit-appearance: none;
  }
  @media (prefers-contrast: more) or (forced-colors: active) {
    .kol-input-range__input--range::-webkit-slider-thumb {
      outline: 1px solid currentColor;
    }
  }
  .kol-input-range__input:not(:disabled).kol-input-range__input--range::-moz-range-thumb {
    cursor: pointer;
  }
  .kol-input-range__input--range::-moz-range-thumb {
    background-color: black;
    border-radius: 20px;
    width: calc(20 * 1rem / var(--kolibri-root-font-size, 16));
    height: calc(20 * 1rem / var(--kolibri-root-font-size, 16));
    -moz-appearance: none;
  }
}`,P=class extends S{constructor(t){super(),e(this,t),this.ctaRef=l(),this.id=i(`input-range`),this.inputHasFocus=!1,this.valueIsNumberString=!1,this.handleRangeInput=e=>{this.handleInput(e,this.readValue(e.target.value))},this.handleRangeChange=e=>{let t=this.readValue(e.target.value);this._value=t,this.handleChange(e,t)},this.handleNumberKeyDown=e=>{this.handleKeyDown(e),(e.code===`Enter`||e.code===`NumpadEnter`)&&m({form:this.host})},this.setRangeRef=e=>{e&&(this.rangeRef=e)},this._autoComplete=`off`,this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._max=100,this._min=0,this._tooltipAlign=`top`,this._touched=!1,this.initFormAssociation(`range`,this._name)}async getValue(){if(this.ctaRef.el!==void 0)return this.readValue(this.ctaRef.el.value)}async focus(e){}async click(){}componentWillLoad(){this.initRenderProps(M),this.setRenderProp(`min`,0),this.setRenderProp(`max`,100),this._touched=this._touched===!0,this.watchAriaDetails(this._ariaDetails),this.watchName(this._name),this.watchSyncValueBySelector(this._syncValueBySelector),this.watchTouched(this._touched),this.watchAccessKey(this._accessKey),this.watchMsg(this._msg),this.watchDisabled(this._disabled),this.watchHideMsg(this._hideMsg),this.watchHideLabel(this._hideLabel),this.watchHint(this._hint),this.watchInfoPopover(this._infoPopover),this.watchLabel(this._label),this.watchShortKey(this._shortKey),this.watchOn(this._on),this.watchTooltipAlign(this._tooltipAlign),this.watchVariant(this._variant),this.watchIcons(this._icons),this.watchAutoComplete(this._autoComplete),this.watchMax(this._max),this.watchMin(this._min),this.watchStep(this._step),this.watchSuggestions(this._suggestions),this.watchValue(this._value)}componentDidLoad(){!this._value&&this.rangeRef?.value&&(this._value=parseFloat(this.rangeRef.value))}disconnectedCallback(){this.destroyFormField()}readValue(e){let t=j(e,this.getRenderProp(`min`),this.getRenderProp(`max`));return A(t,this.valueIsNumberString?`NumberString`:`number`)??t}getSharedInputProps(){let e=this.getRenderProp(`accessKey`),t=this.getRenderProp(`shortKey`);return Object.assign(Object.assign(Object.assign(Object.assign({id:this.id,hideLabel:this.getRenderProp(`hideLabel`),label:this.getRenderProp(`label`),disabled:this.getRenderProp(`disabled`),name:void 0},e?{accessKey:e}:{}),{value:this.getRenderProp(`value`)??null,autoComplete:this.getRenderProp(`autoComplete`),min:this.getRenderProp(`min`)??null,max:this.getRenderProp(`max`)??null,step:this.getRenderProp(`step`)??null,touched:this.getRenderProp(`touched`),msg:this.getRenderProp(`msg`)}),t?{"aria-keyshortcuts":t}:{}),{onBlur:this.handleBlur,onChange:this.handleRangeChange,onClick:this.handleClick,onFocus:this.handleFocus,onInput:this.handleRangeInput,onKeyDown:this.handleKeyDown})}render(){let e=this.getRenderProp(`disabled`),t=this.getRenderProp(`name`),i=this.getRenderProp(`min`),o=this.getRenderProp(`max`),s=this.getRenderProp(`suggestions`),c=s.length>0,l=c?a(this.id,`list`):void 0,u=this.getSharedInputProps(),{ariaDescribedBy:d,hasError:f}=this.getAria(),p=f?`true`:void 0,{startAdornment:m,endAdornment:y}=x({icons:this.getRenderProp(`icons`),disabled:e}),b={"--kolibri-input-range--input-number--width":`calc(${Math.max(String(o??100).length,String(i??0).length,4)}ch + 2em)`};return r(n,{key:`60eec19755fefd40f98af71fe7a639394d61f4d1`},r(h,Object.assign({key:`7e2eaf53ba3fefacac69f63e4631a9c0e5d2d735`},this.getFormFieldProps({class:`kol-input-range range`,accessKey:this.getRenderProp(`accessKey`)||void 0,shortKey:this.getRenderProp(`shortKey`)||void 0,variant:this.getRenderProp(`variant`)})),r(g,{key:`ef31ca368c07d10dcbc60bbd487539aaa97f253a`,disabled:e,msg:this.getRenderProp(`msg`),touched:this.getRenderProp(`touched`),startAdornment:m,endAdornment:y},r(`div`,{key:`343fbe3ec8f95fdc2f724fbca3e756b99e9b13c1`,class:`kol-input-range__inputs-wrapper`,style:b},r(_,Object.assign({key:`1e3ffe6cc76e12cc8bf54318c9ecc951948afb2d`},u,{class:`kol-input-range__input kol-input-range__input--range`,name:t?`${t}-range`:void 0,list:l,type:`range`,tabIndex:-1,id:void 0,accessKey:void 0,"aria-hidden":`true`,ref:this.setRangeRef,ariaDescribedBy:d,"aria-invalid":p})),r(_,Object.assign({key:`2e24cfcb0ce67b976d2f5b81d91497b0e12c183f`},u,{class:`kol-input-range__input kol-input-range__input--number`,name:t?`${t}-number`:void 0,list:l,type:`number`,ref:this.ctaRef,onKeyDown:this.handleNumberKeyDown,ariaDescribedBy:d,"aria-invalid":p}))),c&&r(v,{key:`20ed6003ebaba38de0c0a4feef4376dea9b53cb5`,id:this.id,suggestions:s}))))}watchAccessKey(e){f.apply(e,e=>this.setRenderProp(`accessKey`,e)),p(e,this._shortKey)}watchAriaDetails(e){this.applyAriaDetails(e)}watchAutoComplete(e){C.apply(e,e=>this.setRenderProp(`autoComplete`,e))}watchDisabled(e){this.applyDisabled(e)}watchHideMsg(e){this.applyHideMsg(e)}watchHideLabel(e){this.applyHideLabel(e)}watchHint(e){this.applyHint(e)}watchIcons(e){y.apply(e,e=>this.setRenderProp(`icons`,e))}watchInfoPopover(e){this.applyInfoPopover(e)}watchLabel(e){this.applyLabel(e)}watchMax(e){k.apply(e,e=>this.setRenderProp(`max`,e))}watchMin(e){D.apply(e,e=>this.setRenderProp(`min`,e))}watchMsg(e){this.applyMsg(e)}watchName(e){this.applyName(e)}watchOn(e){this.applyOn(e)}watchShortKey(e){d.apply(e,e=>this.setRenderProp(`shortKey`,e)),p(this._accessKey,e)}watchStep(e){E.apply(e,e=>this.setRenderProp(`step`,e))}watchSuggestions(e){w.apply(e,e=>this.setRenderProp(`suggestions`,e))}watchSyncValueBySelector(e){this.applySyncValueBySelector(e)}watchTooltipAlign(e){this.applyTooltipAlign(e)}watchTouched(e){this.applyTouched(e)}watchValue(e){T.apply(e,e=>this.setRenderProp(`value`,e)),this.formAssociation.setFormAssociatedValue(this.getRenderProp(`value`)??null),e!==void 0&&(this.valueIsNumberString=O(e)===`NumberString`)}watchVariant(e){u.apply(e,e=>this.setRenderProp(`variant`,e))}get host(){return t(this)}static get watchers(){return{_accessKey:[`watchAccessKey`],_ariaDetails:[`watchAriaDetails`],_autoComplete:[`watchAutoComplete`],_disabled:[`watchDisabled`],_hideMsg:[`watchHideMsg`],_hideLabel:[`watchHideLabel`],_hint:[`watchHint`],_icons:[`watchIcons`],_infoPopover:[`watchInfoPopover`],_label:[`watchLabel`],_max:[`watchMax`],_min:[`watchMin`],_msg:[`watchMsg`],_name:[`watchName`],_on:[`watchOn`],_shortKey:[`watchShortKey`],_step:[`watchStep`],_suggestions:[`watchSuggestions`],_syncValueBySelector:[`watchSyncValueBySelector`],_tooltipAlign:[`watchTooltipAlign`],_touched:[`watchTouched`],_value:[`watchValue`],_variant:[`watchVariant`]}}};o([c(`ctaRef`)],P.prototype,`focus`,null),o([s(`ctaRef`)],P.prototype,`click`,null),P.style={default:N};export{P as kol_input_range};