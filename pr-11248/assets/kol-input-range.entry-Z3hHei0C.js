import{c as e,l as t,r as n,s as r}from"./index-wY4pHWJG-DYjwDz47.js";import"./behavior-D1kOlK6p-Wv-9wrhS.js";import{i}from"./index-BPo_b1Kz.js";import{n as a,t as o}from"./dev.utils-DDqySnXB-BuCGoQ9V.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./base-web-component-3R1Dy3QK-DvIYP_26.js";import"./label-c9P7yC4V-C5wzRapE.js";import{t as s}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import"./block-bem-DxQXsOt3-D34QqkxJ.js";import"./component-D30YHxgS-C_y_swMR.js";import"./disabled-CdyeAMlW-B7nthVaq.js";import"./Heading-DYEtnAIe-CxZ3dQLl.js";import{i as c,n as l,t as u}from"./element-interaction-Cy9tx3Sx-BTUWCd5A.js";import"./component-C4dhT4Ba-AzTqajDD.js";import"./component-DoCNds1d-DREmEUlE.js";import"./i18n-BaCf-SDK-BNS1D0tN.js";import"./component-kDR4_xf0-CRk1wcQU.js";import"./component-fK2EUkFf-Bze68FoP.js";import"./component-CODtL04S-vIfxPiOq.js";import"./component-CBkrKKXd-DpffbfBG.js";import"./align-DeB15XnU-DgH_vZcC.js";import"./label-with-expert-slot-CocPu9HB-Bjzc8h_s.js";import{l as d,p as f,t as p}from"./variant-CeijQFzL-DxRj6VNh.js";import"./name-D8963H-v-BjUIYVf-.js";import"./api-BvTefIaj-OpyL2iyS.js";import"./resolve-props-YWmoYL6c-CADaFGZe.js";import{t as m}from"./access-and-short-key-ijzCZfHm-Dx5Q-CAn.js";import"./behavior-DnkpB_7O-n8OqB3uI.js";import{n as h}from"./controller-D1hrFVo3-Bd4WPjXU.js";import"./item-lEB6GAqe-D1SRjjnB.js";import"./component-CHz6TLzY-zX_WS8j5.js";import"./item-DewHrd_f-Cpz8y4Ac.js";import{a as g,n as _,t as v}from"./api-Bhr2ic7C-BMrGE5T2.js";import{n as y,r as b,t as x}from"./input-container-CBl9xcK--DIIGiEKb.js";import{t as S}from"./suggestions-B7YH2Q8H-p-iIE7Wr.js";import{t as C}from"./input-C_ZwHs-7-DyzVTKve.js";import{n as w,t as T}from"./suggestions-CX5S2xAI-CFfIpY5x.js";import{t as E}from"./step-BNDp_ZEh-CpV891D8.js";import{a as D,i as O,n as k,r as A,s as j,t as M}from"./number-value-CQ8owQRn-Blr2k1mu.js";var N={required:[...g.required],optional:[...g.optional,p,w,b,A,O,D,d,E,S,f]},P=i.forBlock(`kol-input-range`),F=P(`input`,{number:!0}),I=P(`input`,{range:!0}),L=P(`inputs-wrapper`),R=({max:t,min:n},r)=>e(`div`,{class:L,style:{"--kolibri-input-range--input-number--width":`calc(${Math.max(String(t??100).length,String(n??0).length,4)}ch + 2em)`}},r),z=`@charset "UTF-8";
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
    .kol-modal {
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
  /* A disabled \`fieldset\` only groups its controls; \`cursor\` is inherited and would reach the
     operable info popover in its legend. */
  .disabled label,
  .disabled:focus-within label,
  [aria-disabled=true],
  [aria-disabled=true]:focus,
  [disabled]:where(:not(fieldset)),
  [disabled]:where(:not(fieldset)):focus {
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
  src: url("kolicons.eot?t=1791668330727"); /* IE9*/
  src: url("kolicons.eot?t=1791668330727#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1791668330727") format("woff2"), url("kolicons.woff?t=1791668330727") format("woff"), url("kolicons.ttf?t=1791668330727") format("truetype"), url("kolicons.svg?t=1791668330727#kolicons") format("svg"); /* iOS 4.1- */
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
 * Overlaps with \`kol-embedded-button-box-styles\` below: both target the block class itself and disagree
 * on \`display\` and \`text-align\`. A stylesheet that includes both therefore depends on order or
 * specificity — today that only happens where the caller nests one of them (e.g. \`_alert.mixin\`
 * nests this one under \`.kol-alert\`, which wins). Include only one per block unless the nesting
 * makes the winner explicit.
 */
/*
 * Minimal box replication for shadow trees that render \`ButtonFC\` without including
 * \`kol-button-styles\`. The \`kol-global\` reset (\`background\`, \`width\`, \`margin\`, \`padding\`,
 * \`border\`) and the a11y layer \`min-height\`/\`min-width\` apply to the native button, on top of the
 * UA \`inline-block\`, but not to the \`div\` root that carries the \`kol-button\` class. This mixin
 * replicates that outer box on the root, while the inner \`kol-button__interactive-element\` degrades
 * to a plain block container to avoid the inline-level baseline gap the UA \`inline-block\` would add
 * below it.
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
}`,B=class extends v{constructor(e){super(),t(this,e),this.id=a(`input-range`),this.infoPopoverOpen=!1,this.inputHasFocus=!1,this.ctaRef=u(),this.valueIsNumberString=!1,this._autoComplete=`off`,this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._max=100,this._min=0,this._tooltipAlign=`top`,this._touched=!1,this.handleRangeInput=e=>{let t=e.target,n=this.readValue(t.value);t===this.rangeRef?this._value=n:this.rangeRef&&Number.isFinite(Number(n))&&(this.rangeRef.value=String(n)),this.handleInput(e,n)},this.handleRangeChange=e=>{let t=this.readValue(e.target.value);this._value=t,this.handleChange(e,t)},this.handleNumberKeyDown=e=>{this.handleKeyDown(e),(e.code===`Enter`||e.code===`NumpadEnter`)&&h({form:this.host})},this.setRangeRef=e=>{e&&(this.rangeRef=e)},this.initFormAssociation(`range`,this._name)}watchAccessKey(e){p.apply(e,e=>this.setRenderProp(`accessKey`,e)),m(e,this._shortKey)}watchAriaDetails(e){this.applyAriaDetails(e)}watchAutoComplete(e){w.apply(e,e=>this.setRenderProp(`autoComplete`,e))}watchDisabled(e){this.applyDisabled(e)}watchHideMsg(e){this.applyHideMsg(e)}watchHideLabel(e){this.applyHideLabel(e)}watchHint(e){this.applyHint(e)}watchIcons(e){b.apply(e,e=>this.setRenderProp(`icons`,e))}watchInfoPopover(e){this.applyInfoPopover(e)}watchLabel(e){this.applyLabel(e)}watchMax(e){A.apply(e,e=>this.setRenderProp(`max`,e))}watchMin(e){O.apply(e,e=>this.setRenderProp(`min`,e))}watchMsg(e){this.applyMsg(e)}watchName(e){this.applyName(e)}watchOn(e){this.applyOn(e)}watchShortKey(e){d.apply(e,e=>this.setRenderProp(`shortKey`,e)),m(this._accessKey,e)}watchStep(e){E.apply(e,e=>this.setRenderProp(`step`,e))}watchSuggestions(e){S.apply(e,e=>this.setRenderProp(`suggestions`,e))}watchSyncValueBySelector(e){this.applySyncValueBySelector(e)}watchTooltipAlign(e){this.applyTooltipAlign(e)}watchTouched(e){this.applyTouched(e)}watchValue(e){D.apply(e,e=>this.setRenderProp(`value`,e)),this.formAssociation.setFormAssociatedValue(this.getRenderProp(`value`)??null),e!==void 0&&(this.valueIsNumberString=k(e)===`NumberString`)}watchVariant(e){f.apply(e,e=>this.setRenderProp(`variant`,e))}async getValue(){if(this.ctaRef.el!==void 0)return this.readValue(this.ctaRef.el.value)}async focus(e){}async click(){}componentWillLoad(){this.initRenderProps(N),this.setRenderProp(`min`,0),this.setRenderProp(`max`,100),this._touched=this._touched===!0,this.watchAriaDetails(this._ariaDetails),this.watchName(this._name),this.watchSyncValueBySelector(this._syncValueBySelector),this.watchTouched(this._touched),this.watchAccessKey(this._accessKey),this.watchMsg(this._msg),this.watchDisabled(this._disabled),this.watchHideMsg(this._hideMsg),this.watchHideLabel(this._hideLabel),this.watchHint(this._hint),this.watchInfoPopover(this._infoPopover),this.watchLabel(this._label),this.watchShortKey(this._shortKey),this.watchOn(this._on),this.watchTooltipAlign(this._tooltipAlign),this.watchVariant(this._variant),this.watchIcons(this._icons),this.watchAutoComplete(this._autoComplete),this.watchMax(this._max),this.watchMin(this._min),this.watchStep(this._step),this.watchSuggestions(this._suggestions),this.watchValue(this._value)}componentDidLoad(){!this._value&&this.rangeRef?.value&&(this._value=parseFloat(this.rangeRef.value))}componentDidRender(){this.syncFormField()}disconnectedCallback(){this.destroyFormField()}readValue(e){let t=M(e,this.getRenderProp(`min`),this.getRenderProp(`max`));return j(t,this.valueIsNumberString?`NumberString`:`number`)??t}getSharedInputProps(){let e=this.getRenderProp(`accessKey`),t=this.getRenderProp(`shortKey`);return Object.assign(Object.assign(Object.assign(Object.assign({id:this.id,hideLabel:this.getRenderProp(`hideLabel`),label:this.getRenderProp(`label`),disabled:this.getRenderProp(`disabled`),name:void 0},e?{accessKey:e}:{}),{value:this.getRenderProp(`value`)??null,autoComplete:this.getRenderProp(`autoComplete`),min:this.getRenderProp(`min`)??null,max:this.getRenderProp(`max`)??null,step:this.getRenderProp(`step`)??null,touched:this.getRenderProp(`touched`),msg:this.getRenderProp(`msg`)}),t?{"aria-keyshortcuts":t}:{}),{onBlur:this.handleBlur,onChange:this.handleRangeChange,onClick:this.handleClick,onFocus:this.handleFocus,onInput:this.handleRangeInput,onKeyDown:this.handleKeyDown})}render(){let t=this.getRenderProp(`disabled`),r=this.getRenderProp(`name`),i=this.getRenderProp(`min`),a=this.getRenderProp(`max`),s=this.getRenderProp(`suggestions`),c=s.length>0,l=c?o(this.id,`list`):void 0,u=this.getSharedInputProps(),{ariaDescribedBy:d,hasError:f}=this.getAria(),p=f?`true`:void 0,{startAdornment:m,endAdornment:h}=y({icons:this.getRenderProp(`icons`)});return e(n,{key:`e05d7a0c1407e7318bb7289224fa9d4c7e8a2151`},e(_,Object.assign({key:`1fdf717b000d39985ece8b419877a04477d62be8`},this.getFormFieldProps({class:`kol-input-range range`,accessKey:this.getRenderProp(`accessKey`)||void 0,shortKey:this.getRenderProp(`shortKey`)||void 0,variant:this.getRenderProp(`variant`)})),e(x,{key:`d4b050ebd81d10ec50f48b2aca120ab51766e7d5`,disabled:t,msg:this.getRenderProp(`msg`),touched:this.getRenderProp(`touched`),startAdornment:m,endAdornment:h},e(R,{key:`3bdaf867dc7261375916407172ebecac318ce38c`,max:a,min:i},e(C,Object.assign({key:`fd0c5b52915b7f80cc609feec6055796c6b0c24a`},u,{class:I,name:r?`${r}-range`:void 0,list:l,type:`range`,tabIndex:-1,id:void 0,accessKey:void 0,"aria-hidden":`true`,ref:this.setRangeRef,ariaDescribedBy:d,"aria-invalid":p})),e(C,Object.assign({key:`18f62997e3aeb154f256262518bf74b2e4956dcb`},u,{class:F,name:r?`${r}-number`:void 0,list:l,type:`number`,ref:this.ctaRef,onKeyDown:this.handleNumberKeyDown,ariaDescribedBy:d,"aria-invalid":p}))),c&&e(T,{key:`59e8f18d3d7f1d4898840ed8a3a6b0a07b5f2c99`,id:this.id,suggestions:s}))))}get host(){return r(this)}static get watchers(){return{_accessKey:[`watchAccessKey`],_ariaDetails:[`watchAriaDetails`],_autoComplete:[`watchAutoComplete`],_disabled:[`watchDisabled`],_hideMsg:[`watchHideMsg`],_hideLabel:[`watchHideLabel`],_hint:[`watchHint`],_icons:[`watchIcons`],_infoPopover:[`watchInfoPopover`],_label:[`watchLabel`],_max:[`watchMax`],_min:[`watchMin`],_msg:[`watchMsg`],_name:[`watchName`],_on:[`watchOn`],_shortKey:[`watchShortKey`],_step:[`watchStep`],_suggestions:[`watchSuggestions`],_syncValueBySelector:[`watchSyncValueBySelector`],_tooltipAlign:[`watchTooltipAlign`],_touched:[`watchTouched`],_value:[`watchValue`],_variant:[`watchVariant`]}}};s([c(`ctaRef`)],B.prototype,`focus`,null),s([l(`ctaRef`)],B.prototype,`click`,null),B.style={default:z};export{B as kol_input_range};