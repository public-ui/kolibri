import{B as e,a as t,o as n,r,s as i}from"./index-QyHpjUu2.js";import{n as a,t as o}from"./dev.utils-vg27Ig_f-TpP-W9ig.js";import{t as s}from"./base-web-component--IgFgz37-CZuvR3uB.js";import{t as c}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import"./_Uint8Array-kJnEuTzT-BYXN1zbF.js";import"./factory-CA4gfImU-CN8Xf-XO.js";import{n as l}from"./level-BwwBrucj-BfjlhIKx.js";import{t as u}from"./block-bem-D-vtzDos-hM6jtJRh.js";import"./label-DQP9fH5r-2VQ3D6kO.js";import{t as d}from"./label-Dqv37gCG-C-ii-GS5.js";import"./variant-quote-B6S4ZebR-6-WzB5_n.js";import"./Heading-CBNkTTAs-CBkFphd7.js";import"./component-DJJa0Eke-DcdQsmT-.js";import"./component-B4FjVkTb-CPZmqEmE.js";import{a as f,i as p,n as m,o as h,r as g,t as _}from"./toggle-handler-ey9ENHk1-D9wrT3Rl.js";import{n as v,r as y,t as b}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";var x=`@charset "UTF-8";
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
@layer kol-component {
  :host {
    display: block;
  }
}
/* For animation technique see https://css-tricks.com/css-grid-can-do-auto-height-transitions/ */
/*
 * Base styles for a collapsible built on \`<details>\`/\`<summary>\`: \`kol-accordion\` and \`kol-details\`
 * render the same DOM under their own block, so each includes this mixin with its block name.
 *
 * The transition duration comes from the theme's \`collapsibleTransitionMs\` feature flag, which the
 * component writes to \`--collapsible-transition-duration\` on \`<details>\`.
 */
@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1789540166075"); /* IE9*/
  src: url("kolicons.eot?t=1789540166075#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1789540166075") format("woff2"), url("kolicons.woff?t=1789540166075") format("woff"), url("kolicons.ttf?t=1789540166075") format("truetype"), url("kolicons.svg?t=1789540166075#kolicons") format("svg"); /* iOS 4.1- */
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
  /* Outweighs \`host-display-block\`: the details host sizes to its content. */
  :host {
    display: inline-block;
  }
  .kol-details {
    /* \`<summary>\` is the toggle control and carries the box of the button it stands in for. */
  }
  .kol-details__heading {
    display: flex;
    min-height: var(--a11y-min-size);
    cursor: pointer;
    /* Baseline box for the flex container; without it the surrounding inline flow shifts by 1px. */
  }
  .kol-details__heading::before {
    content: "​";
  }
  .kol-details__heading {
    /* The heading fills the row; the label span is the flex container inside it. */
  }
  .kol-details__heading > .kol-headline {
    display: flex;
    flex: 1;
    margin: 0;
    text-align: left;
    /* Form controls do not inherit font-weight (see \`a11y.scss\`); themes weight the label further in. */
    font-weight: 400;
  }
  .kol-details__heading > .kol-headline > .kol-span {
    flex: 1 0 100%;
    /* \`.kol-span\` centres its column (\`_global.scss\`); the summary label is start-aligned. */
    align-items: flex-start;
  }
  @media (prefers-reduced-motion) {
    .kol-details__wrapper-animation, .kol-details__wrapper {
      transition: none !important;
    }
  }
  .kol-details {
    /* @see https://github.com/public-ui/kolibri/issues/5952 */
  }
  @media print {
    .kol-details:not(.kol-details--open) .kol-details__wrapper-animation {
      display: none;
    }
  }
  .kol-details__wrapper {
    /* Forces the element into its own GPU compositing layer (via 3D transform). Helps prevent rendering/layout bugs (e.g. #7511) and may improve animation performance. */
    transform: translateZ(0);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--collapsible-transition-duration, 0.3s);
  }
  .kol-details__wrapper-animation {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
    min-height: 0;
    /* This property is important to keep in sync with the visual transition (template-rows). Without it interactive elements within the accordion would stay focusable. */
    visibility: hidden;
    transition: transform var(--collapsible-transition-duration, 0.3s), opacity var(--collapsible-transition-duration, 0.3s), visibility var(--collapsible-transition-duration, 0.3s);
  }
  .kol-details--open .kol-details__wrapper {
    grid-template-rows: 1fr;
  }
  .kol-details--open .kol-details__wrapper-animation {
    opacity: 1;
    transform: scaleY(1);
    visibility: visible;
  }
  .kol-details--open:focus-within {
    position: relative;
    z-index: 100;
  }
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-details--open .kol-details__heading .kol-icon {
    transform: rotate(90deg);
  }
}`,S=class extends s{constructor(e){super(),i(this,e),this.detailsId=a(`details`),this.ctaRef=b(),this.hasLoaded=!1,this.openAnimation=p({getTransitionMs:()=>this.transitionMs,setDetailsOpen:e=>this.detailsOpen=e,setExpanded:e=>this.expanded=e}),this.controlId=o(this.detailsId,`control`),this.detailsOpen=!1,this.expanded=!1,this.headingId=o(this.detailsId,`heading`),this.transitionMs=300,this.handleToggle=f({getHost:()=>this.host,getOn:()=>this.getRenderProp(`on`),isDisabled:()=>this.getRenderProp(`disabled`)===!0,isOpen:()=>this.getRenderProp(`open`)===!0,setOpen:e=>this._open=e}),this._disabled=!1,this._level=0,this._open=!1}componentWillLoad(){this.initRenderProps(g),this.transitionMs=e(`collapsibleTransitionMs`,this.host)??300,this.watchDisabled(this._disabled),this.watchLabel(this._label),this.watchLevel(this._level),this.watchOn(this._on),this.watchOpen(this._open)}componentDidLoad(){this.hasLoaded=!0}disconnectedCallback(){this.openAnimation.dispose()}async focus(e){}async click(){}render(){return n(r,{key:`aec3c9a5650f1c4b8134a6cdcfae6ca7a9e939d4`},n(_,{key:`ec0dc9328954b70900fcf89bd0928de365282678`,block:`kol-details`,contentClass:`indented-text`,controlId:this.controlId,detailsOpen:this.detailsOpen,disabled:this.getRenderProp(`disabled`),expanded:this.expanded,handleToggle:this.handleToggle,headingId:this.headingId,icons:`kolicon-chevron-right`,label:this.getRenderProp(`label`),level:this.getRenderProp(`level`),on:this.getRenderProp(`on`),open:this.getRenderProp(`open`),refHeadingButton:this.ctaRef,transitionMs:this.transitionMs},n(`slot`,{key:`cbc6e43473b7947ae7ea02e41d57c9e18a727ed0`})))}watchDisabled(e){u.apply(e,e=>this.setRenderProp(`disabled`,e))}watchLabel(e){d.apply(e,e=>this.setRenderProp(`label`,e))}watchLevel(e){l.apply(e,e=>this.setRenderProp(`level`,e))}watchOn(e){m.apply(e,e=>this.setRenderProp(`on`,e))}watchOpen(e){h.apply(e,e=>{this.setRenderProp(`open`,e),this.openAnimation.syncOpen(e,this.hasLoaded)})}get host(){return t(this)}static get watchers(){return{_disabled:[`watchDisabled`],_label:[`watchLabel`],_level:[`watchLevel`],_on:[`watchOn`],_open:[`watchOpen`]}}};c([y(`ctaRef`)],S.prototype,`focus`,null),c([v(`ctaRef`)],S.prototype,`click`,null),S.style={default:x};export{S as kol_details};