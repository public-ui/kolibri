import{Dt as e,J as t,a as n,c as r,o as i,s as a,u as o,v as s}from"./index-gJiRbKbQ.js";import{n as c,t as l}from"./dev.utils-T67xDnhC-C6VObjmX.js";import{n as u,t as d}from"./tslib.es6-DQVO_XFF-DpzS01Oy.js";import{t as f}from"./clsx-COFh-Vc8-DWAop4cA.js";import{t as p}from"./Heading-CqlfR_Ej-DiLqf9pM.js";import{t as m}from"./disabled-D9vEsnpm-CrkeFz6G.js";import{r as h}from"./label-BIbocgr4-TAqQZbBp.js";import{t as g}from"./open-BN-u0FA2-CVVxvn4p.js";import{n as _,r as v,t as y}from"./element-interaction-BPnZMkX0-KKKn0vhi.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./normalizers-DBL3hh2G-B-2JIpmM.js";import"./level-CMVN24DT-gTfiA5Sr.js";import{t as b}from"./validation-B4SRWT6k-Cwo1PHFX.js";var x=(t,n)=>{e(t,`_on`,e=>typeof e==`object`&&!!e,new Set([`AccordionCallbacksPropType {Events.onClick, Events.onToggle}`]),n)},S=(e,t)=>{let{id:n,class:r,label:a,level:o=1,disabled:c,open:d,onClick:m,HeadingProps:h={},HeadingButtonProps:g={},ContentProps:_={}}=e,v=u(e,[`id`,`class`,`label`,`level`,`disabled`,`open`,`onClick`,`HeadingProps`,`HeadingButtonProps`,`ContentProps`]),y=d?`kolicon-chevron-down`:`kolicon-chevron-right`,b=l(n,`heading`),x=l(n,`control`);return i(`div`,Object.assign({id:n,class:f(`collapsible`,{"collapsible--disabled":c===!0,"collapsible--open":d===!0},r)},v),i(p,{ref:h?.ref,level:o,class:f(`collapsible__heading`,h?.class)},i(s,{class:f(`collapsible__heading-button`,g?.class),ref:g?.ref,slot:`expert`,id:b,_ariaControls:x,_ariaExpanded:d,_disabled:c,_icons:g?._icons||`${y}`,_label:a,_on:{onClick:m}})),i(`div`,{class:f(`collapsible__wrapper`,_?.wrapperClass)},i(`div`,{class:f(`collapsible__wrapper-animation`,_?.animationClass)},i(`div`,{"aria-hidden":d===!1?`true`:void 0,"aria-labelledby":b,role:`region`,class:f(`collapsible__content`,_?.class),id:x},t))))},C=`@charset "UTF-8";
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
  src: url("kolicons.eot?t=1789436315725"); /* IE9*/
  src: url("kolicons.eot?t=1789436315725#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1789436315725") format("woff2"), url("kolicons.woff?t=1789436315725") format("woff"), url("kolicons.ttf?t=1789436315725") format("truetype"), url("kolicons.svg?t=1789436315725#kolicons") format("svg"); /* iOS 4.1- */
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
}`;t(`[KolAccordion] Anfrage nach einer KolAccordionGroup bei dem immer nur ein Accordion geöffnet ist.

- onClick auf der KolAccordion anwenden
- Click-Event prüft den _open-Status der Accordions
- Logik Öffnet und Schließt entsprechend`),t(`[KolAccordion] Tab-Sperre des Inhalts im geschlossenen Zustand.`);var w=class{constructor(e){a(this,e),this.id=c(`accordion`),this.ctaRef=y(),this.handleOnClick=e=>{this._open=!this._open,setTimeout(()=>{var t,n,i,a;(n=(t=this.state._on)?.onClick)==null||n.call(t,e,!!this._open),(a=(i=this.state._on)?.onToggle)==null||a.call(i,e,!!this._open),this.host&&(o(this.host,r.click,!!this._open),o(this.host,r.toggle,!!this._open))})},this._disabled=!1,this._level=0,this._open=!1,this.state={_label:``,_level:0,_on:{}}}async focus(e){}async click(){}render(){let{_open:e,_label:t,_disabled:n,_level:r}=this.state,a=`kol-accordion`,o={id:this.id,label:t,open:e,disabled:n,level:r,onClick:this.handleOnClick,class:a,HeadingProps:{class:`${a}__heading`},HeadingButtonProps:{ref:this.ctaRef,class:`${a}__heading-button`},ContentProps:{class:`${a}__content`,wrapperClass:`${a}__wrapper`,animationClass:`${a}__wrapper-animation`}};return i(S,Object.assign({key:`bc29b69e1528683175f7949de1729c16dc17dd47`},o),i(`slot`,{key:`cba1e5b830515e2ded1d0cd92ac4fb4c4423645d`}))}validateDisabled(e){m(this,e)}validateLabel(e){h(this,e,{required:!0})}validateLevel(e){b(this,e)}validateOn(e){x(this,e)}validateOpen(e){g(this,e)}componentWillLoad(){this.validateDisabled(this._disabled),this.validateLabel(this._label),this.validateLevel(this._level),this.validateOn(this._on),this.validateOpen(this._open)}get host(){return n(this)}static get watchers(){return{_disabled:[`validateDisabled`],_label:[`validateLabel`],_level:[`validateLevel`],_on:[`validateOn`],_open:[`validateOpen`]}}};d([v(`ctaRef`)],w.prototype,`focus`,null),d([_(`ctaRef`)],w.prototype,`click`,null),w.style={default:C};export{w as kol_accordion};