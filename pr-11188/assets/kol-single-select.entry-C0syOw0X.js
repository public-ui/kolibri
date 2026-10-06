import{c as e,l as t,r as n,s as r}from"./index-BtYjJomD-2NL-4U3O.js";import"./behavior-CiPpEcHi-C4ubS3a2.js";import{i,n as a,t as o}from"./index-DvthrIgu.js";import{n as s,t as c}from"./dev.utils-DVPKJwhh-D1tNyiqe.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import{o as l}from"./base-web-component-DK8TT74a-BXfZvOou.js";import"./label-D2KAEhQi-CnOaEsor.js";import{t as u}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{t as d}from"./clsx-COFh-Vc8-DWAop4cA.js";import"./block-bem-BWLThqqc-BtUFGi7X.js";import"./component-B5OmtChm-BpfuiRUo.js";import"./disabled-Ch6DBLjt-BGLS8aSf.js";import"./Heading-D2EH5Vz9-C4ANBShH.js";import{i as f,t as p}from"./element-interaction-Cy9tx3Sx-BTUWCd5A.js";import{t as m}from"./component-BauANlCU-BMDgFmT6.js";import"./component-DbsunX7x-CnTy1DS9.js";import{t as h}from"./i18n-CEIPukO1-BzlZIKd8.js";import"./component-GqGXpjMZ-DTSgDkCk.js";import"./component-ArZwqu6c-D3WtlbjK.js";import{t as g}from"./component-CoN6ZwTo-I3toQz_E.js";import"./component-DWiKUdpa-CCP7iTH7.js";import"./align-options-DA5VDyEG-DpPtpK4G.js";import"./label-with-expert-slot-D91L4OW1-CebMKI1t.js";import{l as _,p as v,t as y}from"./variant-BeDn7Bgo-IfAA3eU2.js";import"./name-D4D5UxdN-D1Dh-5h4.js";import"./api-BZzrHnyD-CqTX_NAf.js";import"./resolve-props-vskIOP3D-BgwT5SRK.js";import{t as b}from"./access-and-short-key-ijzCZfHm-Dx5Q-CAn.js";import"./behavior-ByHH6jIv-DR9IRAks.js";import"./controller-DS1adyd5-iMRBBeJ5.js";import{t as x}from"./item-Cj7w26xK-HgkfbXK8.js";import"./component-CChFD3b2-BdTQzDQR.js";import"./item-CD8r4zxe-BJS8XDOi.js";import{a as S,n as C}from"./api-CdMtXDCT-CfZYIIPW.js";import{a as w,i as T,n as E,r as D,t as O}from"./group-BOYMyHeI-BIOk2ILJ.js";import{n as k,r as A,t as j}from"./input-container-XQF7Pspa-BmmhXD7Q.js";import{t as M}from"./placeholder-CrMbWpX2-Buef3pzd.js";import{t as N}from"./required-CHQsLAMO-DOUMWd3Z.js";import{t as P}from"./input-Bf1PWJg1-BJgG0qN-.js";import{t as F}from"./radio-options-CQvKTe2m-Ckqz7J6u.js";import{t as I}from"./rows-wGC2rjHq-GQY-eST1.js";var L=l(`options`,[],F),R={required:[...S.required,L],optional:[...S.optional,y,w,A,M,N,I,_,v]},z=i.forBlock(`kol-single-select`),B=i.forBlock(`kol-custom-suggestions-toggle`),V=z(`delete`),H=z(`no-results-message`),U=({disabled:t,handleClick:n})=>e(m,{icons:`kolicon-chevron-down`,label:``,class:B({disabled:t}),onClick:n}),W=({message:t})=>e(`li`,{class:H,role:`alert`},t,` `),G=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1791289175519"); /* IE9*/
  src: url("kolicons.eot?t=1791289175519#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1791289175519") format("woff2"), url("kolicons.woff?t=1791289175519") format("woff"), url("kolicons.ttf?t=1791289175519") format("truetype"), url("kolicons.svg?t=1791289175519#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-custom-suggestions-option {
    line-height: 1.5;
    white-space: normal;
    overflow-wrap: break-word;
    /* The \`not-allowed\` reset for disabled controls lives in \`kol-global\`, which loses to
       \`kol-component\` whatever the specificity (see \`_layer-order.scss\`). An unguarded pointer
       therefore wins and makes a dead option look selectable, focused or not. */
  }
  .kol-custom-suggestions-option:not(.kol-custom-suggestions-option--disabled) {
    cursor: pointer;
  }
  .kol-custom-suggestions-options-group--cursor-hidden .kol-custom-suggestions-option {
    cursor: none !important;
  }
  .kol-custom-suggestions-option--disabled, .kol-custom-suggestions-option--disabled * {
    cursor: not-allowed;
  }
  .kol-custom-suggestions-options-group {
    background-color: white;
    display: block;
    position: absolute;
    z-index: 2;
    max-height: calc(250 * 1rem / var(--kolibri-root-font-size, 16));
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
    list-style-type: none;
  }
  .kol-input-container:has(.kol-custom-suggestions-options-group--open) {
    z-index: 10;
  }
  .kol-custom-suggestions-toggle {
    display: flex;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: center;
    justify-content: center;
    cursor: default;
  }
  .kol-custom-suggestions-toggle.kol-custom-suggestions-toggle--disabled {
    cursor: not-allowed;
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
  .kol-single-select {
    /* Scoped to the group that holds the clear button: the info popover in the label renders a \`.kol-button\` as well. */
  }
  .kol-single-select__group .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-single-select__group :host {
    display: inline-block;
  }
  .kol-single-select__group .kol-button {
    display: flex;
    height: 100%;
    min-height: var(--a11y-min-size);
    text-decoration-line: none;
    /* The interactive element is the flex container positioning the text, so it carries the
       box the root element used to be. The UA default underline sits on that element too,
       so suppressing \`text-decoration\` on the wrapper alone is not enough. */
  }
  .kol-single-select__group .kol-button__interactive-element {
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
  .kol-single-select__group .kol-button__interactive-element::before {
    content: "​";
  }
  .kol-single-select__group .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-single-select__group .kol-button {
    /* The tooltip wrapper holds only the absolutely positioned floating tooltip. In the legacy
       DOM it sat in a block flow and collapsed to zero height; as a flex/grid item it would
       stretch to the container height instead, adding phantom rows to the layout. */
  }
  .kol-single-select__group .kol-button__tooltip {
    height: 0;
  }
  .kol-single-select__group .kol-button--external-link > .kolicon-link-external::before {
    content: none;
  }
  .kol-single-select__group .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {
    content: none;
  }
  .kol-single-select__no-results-message {
    display: flex;
    min-height: calc(50 * 1rem / var(--kolibri-root-font-size, 16));
    align-items: center;
    justify-content: center;
    cursor: default;
  }
  .kol-single-select .kol-custom-suggestions-options-group {
    max-height: calc(40 * 1rem / var(--kolibri-root-font-size, 16) * var(--visible-options, 5) + 2 * 1rem / var(--kolibri-root-font-size, 16)) !important;
  }
  .kol-single-select--open .kol-custom-suggestions-toggle {
    transform: rotate(180deg);
  }
  .kol-custom-suggestions-toggle:not(.kol-custom-suggestions-toggle--disabled) {
    cursor: pointer;
  }
}`,K=class extends O{constructor(e){super(),t(this,e),this.clearButton=x(()=>this.host),this.ctaRef=p(),this.translateDeleteSelection=h(`kol-delete-selection`),this.translateNoResultsMessage=h(`kol-no-results-message`),this.id=s(`single-select`),this.infoPopoverOpen=!1,this.inputHasFocus=!1,this.isOpen=!1,this.blockSuggestionMouseOver=!1,this.filteredOptions=[],this.inputValue=``,this.toggleListbox=e=>{var t;if(e?.preventDefault(),this.getRenderProp(`disabled`)!==!0){if((t=this.ctaRef.el)==null||t.focus(),this.isOpen)this.isOpen=!1;else{this.isOpen=!0;let e=Array.isArray(this.filteredOptions)?this.filteredOptions.findIndex(e=>e.label===this.inputValue):-1;this.focusOption(e>=0?e:-1)}}},this.handleSingleSelectInput=e=>{let t=e.target.value;this.inputValue=t,this.isOpen=!0,this.setFilteredOptionsByQuery(t),this.focusedIndex=-1},this.handleSingleSelectChange=e=>{this.isOpen||this.handleChange(e,this._value)},this.handleSingleSelectClick=e=>{var t;this.toggleListbox(e),(t=this.ctaRef.el)==null||t.focus(),this.handleClick(e)},this.handleInputBlur=e=>{this.handleFocusLeave(e)},this.handleDropdownKeyDown=e=>{e.key.length===1&&/[a-z0-9]/i.test(e.key)&&(e.preventDefault(),this.isOpen=!0,this.focusOptionStartingWith(e.key))},this.handleClearButtonClick=()=>{var e;this.clearSelection(),(e=this.ctaRef.el)==null||e.focus(),this.clearButtonFocused=!1},this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this._value=null,this._hasClearButton=!0,this.initFormAssociation(`single-select`,this._name)}async getValue(){return this._value}async focus(e){}componentWillLoad(){this.initRenderProps(R),this.optionRefs=[],this._touched=this._touched===!0,this.watchAriaDetails(this._ariaDetails),this.watchName(this._name),this.watchSyncValueBySelector(this._syncValueBySelector),this.watchTouched(this._touched),this.watchAccessKey(this._accessKey),this.watchMsg(this._msg),this.watchDisabled(this._disabled),this.watchHideMsg(this._hideMsg),this.watchHideLabel(this._hideLabel),this.watchHint(this._hint),this.watchInfoPopover(this._infoPopover),this.watchLabel(this._label),this.watchShortKey(this._shortKey),this.watchOn(this._on),this.watchTooltipAlign(this._tooltipAlign),this.watchVariant(this._variant),this.watchIcons(this._icons),this.applyOptions(this._options),this.watchRequired(this._required),this.watchPlaceholder(this._placeholder),this.watchHasClearButton(this._hasClearButton),this.watchRows(this._rows),this.filteredOptions=this.getRenderProp(`options`),this.updateInputValue(this._value)}componentDidRender(){this.syncFormField(),this.clearButton.syncListeners()}disconnectedCallback(){this.clearButton.destroy(),this.destroyFormField()}getOptionCount(){return Array.isArray(this.filteredOptions)?this.filteredOptions.length:0}moveFocus(e,t=1){this.filteredOptions&&this.moveFocusSkippingDisabled(e,t,e=>!!this.filteredOptions[e].disabled)}focusFirstOption(){this.moveFocus(this.focusedIndex*-1)}focusLastOption(){this.moveFocus(this.filteredOptions?this.filteredOptions.length-1-this.focusedIndex:0,-1)}handleConfirmKey(e){var t;this.clearButtonFocused?(this.clearSelection(),e.preventDefault()):this.isOpen?this.selectFocusedOption()&&((t=this.ctaRef.el)==null||t.focus(),this.handleListboxEvent(e,!1)):this.toggleListbox(e)}selectFocusedOption(){if(Array.isArray(this.filteredOptions)&&this.filteredOptions.length>0&&this.focusedIndex>=0){let e=this.filteredOptions[this.focusedIndex];return!e?.disabled&&(this.selectOption(e),!0)}return!1}focusOptionStartingWith(e){let t=e.toLowerCase(),n=Array.isArray(this.filteredOptions)&&this.filteredOptions.findIndex(e=>e.label.toLowerCase().startsWith(t)&&!e.disabled);typeof n==`number`&&n>=0&&this.focusOption(n)}setFilteredOptionsByQuery(e){if(e===void 0)return;let t=this.getRenderProp(`options`);e.trim()===``?this.filteredOptions=[...t]:Array.isArray(t)&&t.length>0&&e.length>0&&(this.filteredOptions=t.filter(t=>(t.label?.toLowerCase())?.includes(e.toLowerCase())))}updateInputValue(e){let t=this.getRenderProp(`options`)?.find(t=>t.value===e);this.inputValue=t?String(t.label):``}selectOption(e){if(e.value===this._value){this.inputValue=e.label,this.filteredOptions=[...this.getRenderProp(`options`)];return}this._value=e.value,this.inputValue=e.label;let t={name:this.getRenderProp(`name`)??``,value:e.value};this.handleInput(a(o.input,t,this.ctaRef.el),e.value),this.handleChange(a(o.change,t,this.ctaRef.el),e.value),this.filteredOptions=[...this.getRenderProp(`options`)],this.formAssociation.setFormAssociatedValue(this._value)}clearSelection(){var e;if(this.getRenderProp(`disabled`)===!0)return;this.focusedIndex=-1,this._value=null,this.inputValue=``,this.filteredOptions=[...this.getRenderProp(`options`)];let t={name:this.getRenderProp(`name`),value:null};this.handleInput(a(o.input,t,this.ctaRef.el),{value:null}),this.handleChange(a(o.change,t,this.ctaRef.el),{value:null}),(e=this.ctaRef.el)==null||e.focus(),this.isOpen=!0}selectOptionByInputValue(){let e=this.getRenderProp(`options`),t=e?.find(e=>e.label?.toLowerCase()===this.inputValue?.toLowerCase());t?this.selectOption(t):this._value!==null&&this._value!==void 0&&(this.filteredOptions=[...e??[]])}handleHostKeyDown(e){this.handleListboxKeyDown(e)}handleMouseEvent(){this.handleListboxMouseMove()}handleFocusIn(e){setTimeout(()=>{this.host?.contains(document.activeElement)&&!this.inputHasFocus&&this.handleFocus(e)})}handleFocusOut(e){this.selectOptionByInputValue(),setTimeout(()=>{this.inputHasFocus&&!this.host?.contains(document.activeElement)&&(this.handleBlur(e),this.isOpen=!1)})}getInputProps(){let{ariaDescribedBy:e,hasError:t}=this.getAria(),n=this.id,r=this.getRenderProp(`disabled`)===!0,i=this.getRenderProp(`accessKey`)||void 0,a=this.getRenderProp(`placeholder`),o=this.getRenderProp(`shortKey`)||void 0,s=this.getRenderProp(`hideLabel`),l=this.getRenderProp(`label`);return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({id:n,hideLabel:s,label:l,disabled:r,name:this.getRenderProp(`name`)||void 0},i?{accessKey:i}:{}),{value:this.inputValue,required:this.getRenderProp(`required`)}),a?{placeholder:a}:{}),{touched:this.getRenderProp(`touched`),msg:this.getRenderProp(`msg`)}),o?{"aria-keyshortcuts":o}:{}),{"aria-activedescendant":this.getActiveDescendant(),"aria-autocomplete":`both`,"aria-controls":c(n,`listbox`),"aria-describedby":e.length>0?e.join(` `):void 0,"aria-expanded":this.isOpen?`true`:`false`,"aria-label":s&&typeof l==`string`?l:void 0,"aria-labelledby":c(n,`label`),autocapitalize:`off`,autocorrect:`off`,autocomplete:`off`,class:`kol-single-select__input`,ref:this.ctaRef,role:`combobox`,type:`text`,onBlur:this.handleInputBlur,onChange:this.handleSingleSelectChange,onClick:this.handleSingleSelectClick,onFocus:this.handleFocus,onInput:this.handleSingleSelectInput,onKeyDown:this.handleKeyDown,ariaDescribedBy:e,"aria-invalid":t?`true`:void 0})}renderOptions(){return!Array.isArray(this.filteredOptions)||this.filteredOptions.length===0?e(W,{message:this.translateNoResultsMessage}):this.filteredOptions.map((t,n)=>e(E,{id:this.getOptionId(n),index:n,option:t.label,searchTerm:this.inputValue,ref:e=>{e&&(this.optionRefs[n]=e)},selected:this._value===t.value,disabled:!!t.disabled,onClick:e=>{var n;t.disabled||(e.preventDefault(),this.selectOption(t),this.isOpen=!1,(n=this.ctaRef.el)==null||n.focus())},onMouseOver:()=>{!this.blockSuggestionMouseOver&&!t.disabled&&this.focusOption(n)},onFocus:()=>{t.disabled||this.focusOption(n)}}))}render(){let t=this.getRenderProp(`disabled`)===!0,{startAdornment:r,endAdornment:i}=k({icons:this.getRenderProp(`icons`)});return e(n,{key:`5de86aa2976c99b58cac48d32e6eb57324df67ed`},e(C,Object.assign({key:`ec74ce25f0fb49dfd5cb596b0fe7560ad4b83f56`},this.getFormFieldProps({class:d(`kol-single-select`,{"kol-single-select--open":this.isOpen}),accessKey:this.getRenderProp(`accessKey`)||void 0,shortKey:this.getRenderProp(`shortKey`)||void 0,required:this.getRenderProp(`required`),variant:this.getRenderProp(`variant`)})),e(j,{key:`f85f466a0cc7d4eb3e00c5db6b209c24a26949f5`,disabled:t,msg:this.getRenderProp(`msg`),touched:this.getRenderProp(`touched`),startAdornment:r,endAdornment:i},e(T,{key:`d9b0d156e0ea55a8aed4d61ab5e91c1fb045d5d6`,block:`kol-single-select`},e(P,Object.assign({key:`516606346f7295ea994d6b629c6f588aaeaf8709`},this.getInputProps())),this.inputValue&&this.getRenderProp(`hasClearButton`)&&e(g,Object.assign({key:`0702ae5ac1afb2efc7a80914559111ad117e1b5a`},this.clearButton.getFcProps({_icons:`kolicon-cross`,_label:this.translateDeleteSelection,_hideLabel:!0,_variant:`ghost`,_disabled:t,_on:{onClick:this.handleClearButtonClick,onFocus:this.handleClearButtonFocus,onBlur:this.handleClearButtonBlur}},{class:V,"data-testid":`single-select-delete`,hidden:t}))),e(U,{key:`6864d4e32ef14691744f8eac2fb41918347fe926`,disabled:t,handleClick:this.toggleListbox})),e(D,{key:`6e38afd5fdbe85be1254796a95b40325378fec17`,blockSuggestionMouseOver:this.blockSuggestionMouseOver,onKeyDown:this.handleDropdownKeyDown,style:{"--visible-options":`${this.getRenderProp(`rows`)??5}`},hidden:!this.isOpen||t,id:c(this.id,`listbox`)},this.renderOptions()))))}watchAccessKey(e){y.apply(e,e=>this.setRenderProp(`accessKey`,e)),b(e,this._shortKey)}watchAriaDetails(e){this.applyAriaDetails(e)}watchDisabled(e){this.applyDisabled(e)}watchHasClearButton(e){w.apply(e,e=>this.setRenderProp(`hasClearButton`,e))}watchHideMsg(e){this.applyHideMsg(e)}watchHideLabel(e){this.applyHideLabel(e)}watchHint(e){this.applyHint(e)}watchIcons(e){A.apply(e,e=>this.setRenderProp(`icons`,e))}watchInfoPopover(e){this.applyInfoPopover(e)}watchLabel(e){this.applyLabel(e)}watchMsg(e){this.applyMsg(e)}watchName(e){this.applyName(e)}watchOn(e){this.applyOn(e)}applyOptions(e){L.apply(e,e=>this.setRenderProp(`options`,e))}watchOptions(e){this.applyOptions(e),this.filteredOptions=[...this.getRenderProp(`options`)??[]],this.isOpen?this.setFilteredOptionsByQuery(this.inputValue):this.updateInputValue(this._value)}watchPlaceholder(e){M.apply(e,e=>this.setRenderProp(`placeholder`,e))}watchRequired(e){N.apply(e,e=>this.setRenderProp(`required`,e))}watchRows(e){I.apply(e,e=>this.setRenderProp(`rows`,e))}watchShortKey(e){_.apply(e,e=>this.setRenderProp(`shortKey`,e)),b(this._accessKey,e)}watchSyncValueBySelector(e){this.applySyncValueBySelector(e)}watchTooltipAlign(e){this.applyTooltipAlign(e)}watchTouched(e){this.applyTouched(e)}watchValue(e){this.updateInputValue(e)}watchVariant(e){v.apply(e,e=>this.setRenderProp(`variant`,e))}get host(){return r(this)}static get watchers(){return{_accessKey:[`watchAccessKey`],_ariaDetails:[`watchAriaDetails`],_disabled:[`watchDisabled`],_hasClearButton:[`watchHasClearButton`],_hideMsg:[`watchHideMsg`],_hideLabel:[`watchHideLabel`],_hint:[`watchHint`],_icons:[`watchIcons`],_infoPopover:[`watchInfoPopover`],_label:[`watchLabel`],_msg:[`watchMsg`],_name:[`watchName`],_on:[`watchOn`],_options:[`watchOptions`],_placeholder:[`watchPlaceholder`],_required:[`watchRequired`],_rows:[`watchRows`],_shortKey:[`watchShortKey`],_syncValueBySelector:[`watchSyncValueBySelector`],_tooltipAlign:[`watchTooltipAlign`],_touched:[`watchTouched`],_value:[`watchValue`],_variant:[`watchVariant`]}}};u([f(`ctaRef`)],K.prototype,`focus`,null),K.style={default:G};export{K as kol_single_select};