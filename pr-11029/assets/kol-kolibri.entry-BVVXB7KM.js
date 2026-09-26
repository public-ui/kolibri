import{C as e,c as t,ct as n,it as r,s as i}from"./index-DcDxiC7I-CnSkqFdk.js";import{t as a}from"./i18n-s5q4We3h-CnZyhTAq.js";import{t as o}from"./index-DCHfCGY1-Cy5uaozw.js";var s=/^#((\d|[a-f]){8}|(\d|[a-f]){6}|(\d|[a-f]){3,4})$/i;function c(e){return s.test(e)}function l(e){if(e.startsWith(`{`))try{let t=JSON.parse(e);if(d(t))return{type:`ColorPair`,value:t}}catch{return{type:null,value:null}}return{type:null,value:null}}function u(e){if(e){if(typeof e==`string`){if(c(e))return{type:`string`,valid:!0,value:e};{let t=l(e);if(t.value)return{type:t.type,valid:!0,value:t.value}}}else{let t=e;if(d(t))return{type:`ColorPair`,valid:!0,value:t}}}return{type:null,valid:!1,value:``}}function d(e){return!!(typeof e==`object`&&e&&typeof e.backgroundColor==`string`&&typeof e.foregroundColor==`string`)}function f(e){let t=u(e);switch(t.type){case null:return!1;case`string`:case`ColorPair`:return t.valid}}var p=(e,t,r)=>{n(e,`_color`,f,new Set([`rgb in hex`,`ColorPair`]),t,r)},m=`@charset "UTF-8";
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
@layer kol-component {
  .kol-kolibri {
    display: inline-block;
    max-height: 100%;
  }
  .kol-kolibri__text {
    font-size: calc(90 * 1rem / var(--kolibri-root-font-size, 16));
    letter-spacing: normal;
    word-spacing: normal;
  }
}`,h=class{constructor(n){t(this,n),this.translateKolibriLogo=a(`kol-kolibri-logo`),this._color=`#003c78`,this._labeled=!0,this.state={_color:{red:0,green:60,blue:120},_labeled:!0},this.handleColorChange=(t,n)=>{if(typeof t==`string`){let e=o(t);n.set(`_color`,{red:e[0],green:e[1],blue:e[2]})}else e(`[KolKolibri] You used the complex color schema. For the KoliBri we use need the color as hex string.`)}}render(){let e=`rgb(${this.state._color.red},${this.state._color.green},${this.state._color.blue})`;return i(`svg`,{key:`bd1b1226eff883766a85ec02ed1e3c5a481e6adf`,class:`kol-kolibri`,role:`img`,"aria-label":this.translateKolibriLogo,xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 600 600`,fill:e},i(`path`,{key:`cfa773f2fb465da861ef95f6b35edffeb7cebb94`,d:`M353 322L213 304V434L353 322Z`}),i(`path`,{key:`95fdb9adf00ca10d07498780392729766a5896c7`,d:`M209 564V304L149 434L209 564Z`}),i(`path`,{key:`5c5ac6b30914629dd3e04e8419143a985b09f9bd`,d:`M357 316L417 250L361 210L275 244L357 316Z`}),i(`path`,{key:`6dbfd53d75d77feea2922c07359685c9baa1f8ee`,d:`M329 218L237 92L250 222L272 241L329 218Z`}),i(`path`,{key:`be83bb3be0895cd13bd375a17bc55244d9dba34e`,d:`M353 318L35 36L213 300L353 318Z`}),i(`path`,{key:`50b82a6d2cfc68b29edf4abe1e5efe35a21bfad2`,d:`M391 286L565 272L421 252L391 286Z`}),this.state._labeled===!0&&i(`text`,{key:`cdd23c5d66d0a4194ee43cc71857c325012fe8eb`,class:`kol-kolibri__text`,x:`250`,y:`525`,fill:e},`KoliBri`))}validateColor(e){p(this,e,{defaultValue:`#003c78`,hooks:{beforePatch:this.handleColorChange}})}validateLabeled(e){r(this,`_labeled`,e,{defaultValue:!0})}componentWillLoad(){this.validateColor(this._color),this.validateLabeled(this._labeled)}static get watchers(){return{_color:[`validateColor`],_labeled:[`validateLabeled`]}}};h.style={default:m};export{h as kol_kolibri};