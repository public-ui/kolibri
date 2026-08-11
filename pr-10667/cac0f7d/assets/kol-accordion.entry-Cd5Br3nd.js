import{J as e,a as t,c as n,kt as r,l as i,o as a,s as o}from"./index-B7AUTndI.js";import{n as s}from"./dev.utils-BUt19n2f-B6QqAQjF.js";import{t as c}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import"./Heading-BGEnUxXW-BWf6CM-R.js";import{t as l}from"./Collapsible-BCytMUe9-CAqwgvkw.js";import{t as u}from"./disabled-jKlKAF7J-U9TWj21e.js";import{r as d}from"./label-Dwxm-V_h-DHZfGAOU.js";import{t as f}from"./open-Cmx_DQBP-ClGXOuOb.js";import{n as p,r as m,t as h}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-Cpy0t9-X-cS_0aRHy.js";import"./level-PcWGlcVG-BB4z-PCm.js";import{t as g}from"./validation-DLEaOerO-DQL1k9KE.js";var _=(e,t)=>{r(e,`_on`,e=>typeof e==`object`&&!!e,new Set([`AccordionCallbacksPropType {Events.onClick, Events.onToggle}`]),t)},v=`@charset "UTF-8";
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
*/
@layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component;
/* forward the rem function */
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
@layer kol-component {
  @media (prefers-reduced-motion) {
    .collapsible__wrapper-animation, .collapsible__wrapper {
      transition: none !important;
    }
  }
  .collapsible {
    /* @see https://github.com/public-ui/kolibri/issues/5952 */
  }
  @media print {
    :not(.collapsible--open) .collapsible__wrapper-animation {
      display: none;
    }
  }
  .collapsible__wrapper {
    /* Forces the element into its own GPU compositing layer (via 3D transform). Helps prevent rendering/layout bugs (e.g. #7511) and may improve animation performance. */
    transform: translateZ(0);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s;
  }
  .collapsible__wrapper-animation {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
    min-height: 0;
    /* This property is important to keep in sync with the visual transition (template-rows). Without it interactive elements within the accordion would stay focusable. */
    visibility: hidden;
    transition: transform 0.3s, opacity 0.3s, visibility 0.3s;
  }
  .collapsible--open .collapsible__wrapper {
    grid-template-rows: 1fr;
  }
  .collapsible--open .collapsible__wrapper-animation {
    opacity: 1;
    transform: scaleY(1);
    visibility: visible;
  }
  .collapsible {
    /*
          * Inside a button, the caption text is always centered.
          * So we have to align the text to the left.
          */
  }
  .collapsible__heading-button button .kol-span {
    align-items: flex-start;
  }
  .collapsible__heading-button button .kol-span__container {
    text-align: left;
  }
  .collapsible--open:focus-within {
    position: relative;
    z-index: 100;
  }
}
@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1786453393365"); /* IE9*/
  src: url("kolicons.eot?t=1786453393365#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1786453393365") format("woff2"), url("kolicons.woff?t=1786453393365") format("woff"), url("kolicons.ttf?t=1786453393365") format("truetype"), url("kolicons.svg?t=1786453393365#kolicons") format("svg"); /* iOS 4.1- */
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
}`;e(`[KolAccordion] Anfrage nach einer KolAccordionGroup bei dem immer nur ein Accordion geöffnet ist.

- onClick auf der KolAccordion anwenden
- Click-Event prüft den _open-Status der Accordions
- Logik Öffnet und Schließt entsprechend`),e(`[KolAccordion] Tab-Sperre des Inhalts im geschlossenen Zustand.`);var y=class{constructor(e){o(this,e),this.id=s(`accordion`),this.ctaRef=h(),this.handleOnClick=e=>{this._open=!this._open,setTimeout(()=>{var t,r,a,o;(r=(t=this.state._on)?.onClick)==null||r.call(t,e,!!this._open),(o=(a=this.state._on)?.onToggle)==null||o.call(a,e,!!this._open),this.host&&(i(this.host,n.click,!!this._open),i(this.host,n.toggle,!!this._open))})},this._disabled=!1,this._level=0,this._open=!1,this.state={_label:``,_level:0,_on:{}}}async focus(e){}async click(){}render(){let{_open:e,_label:t,_disabled:n,_level:r}=this.state,i=`kol-accordion`,o={id:this.id,label:t,open:e,disabled:n,level:r,onClick:this.handleOnClick,class:i,HeadingProps:{class:`${i}__heading`},HeadingButtonProps:{ref:this.ctaRef,class:`${i}__heading-button`},ContentProps:{class:`${i}__content`,wrapperClass:`${i}__wrapper`,animationClass:`${i}__wrapper-animation`}};return a(l,Object.assign({key:`bc29b69e1528683175f7949de1729c16dc17dd47`},o),a(`slot`,{key:`cba1e5b830515e2ded1d0cd92ac4fb4c4423645d`}))}validateDisabled(e){u(this,e)}validateLabel(e){d(this,e,{required:!0})}validateLevel(e){g(this,e)}validateOn(e){_(this,e)}validateOpen(e){f(this,e)}componentWillLoad(){this.validateDisabled(this._disabled),this.validateLabel(this._label),this.validateLevel(this._level),this.validateOn(this._on),this.validateOpen(this._open)}get host(){return t(this)}static get watchers(){return{_disabled:[`validateDisabled`],_label:[`validateLabel`],_level:[`validateLevel`],_on:[`validateOn`],_open:[`validateOpen`]}}};c([m(`ctaRef`)],y.prototype,`focus`,null),c([p(`ctaRef`)],y.prototype,`click`,null),y.style={default:v};export{y as kol_accordion};