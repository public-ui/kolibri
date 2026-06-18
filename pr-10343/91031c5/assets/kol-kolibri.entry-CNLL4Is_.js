import{Dt as e,o as t,q as n,s as r}from"./index-CRU9V6nP.js";import{t as i}from"./i18n-CFuSxM6N-zN_c0YyK.js";import{n as a}from"./contrast-D1msrkD4-DM_MLmHU.js";import{n as o}from"./color-CftCtla8-9Vx3KiyY.js";var s=`/* forward the rem function */
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
/*
 * This file contains all rules for accessibility.
 */
@layer kol-a11y {
  :host {
    /*
                   * Minimum size of interactive elements.
                   */
    --a11y-min-size: calc(44 * 1rem / var(--kolibri-root-font-size, 16));
    /*
     * No element should be used without verifying the contrast ratio of its background and font colors.
     * By initially setting the background color to white and the font color to black,
     * the contrast ratio is ensured and explicit adjustment is forced.
     */
    color: black;
    background-color: white;
    /*
     * Verdana is an accessible font that can be used without requiring additional loading time.
     */
    font-family: Verdana;
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
  .kol-kolibri {
    display: inline-block;
    max-height: 100%;
  }
  .kol-kolibri__text {
    font-size: calc(90 * 1rem / var(--kolibri-root-font-size, 16));
    letter-spacing: normal;
    word-spacing: normal;
  }
}`,c=class{constructor(e){r(this,e),this.translateKolibriLogo=i(`kol-kolibri-logo`),this._color=`#003c78`,this._labeled=!0,this.state={_color:{red:0,green:60,blue:120},_labeled:!0},this.handleColorChange=(e,t)=>{if(typeof e==`string`){let n=a(e);t.set(`_color`,{red:n[0],green:n[1],blue:n[2]})}else n(`[KolKolibri] You used the complex color schema. For the KoliBri we use need the color as hex string.`)}}render(){let e=`rgb(${this.state._color.red},${this.state._color.green},${this.state._color.blue})`;return t(`svg`,{key:`4c7a91b347f1030b6243bcd73fe80f18ea4870d9`,class:`kol-kolibri`,role:`img`,"aria-label":this.translateKolibriLogo,xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 600 600`,fill:e},t(`path`,{key:`acfbbaa7bac5f630eabf483f3072c293d23ced9c`,d:`M353 322L213 304V434L353 322Z`}),t(`path`,{key:`950473ab86c2b6101bef184b6388a0c9a313fbb3`,d:`M209 564V304L149 434L209 564Z`}),t(`path`,{key:`113e568b1cbf311a9f1c656526d7712c6a0dc129`,d:`M357 316L417 250L361 210L275 244L357 316Z`}),t(`path`,{key:`23b033e7e9884099469fea1ca2fef1af56a2ea29`,d:`M329 218L237 92L250 222L272 241L329 218Z`}),t(`path`,{key:`61c8946c0a73d39039b3008f29a9f1750ed90af2`,d:`M353 318L35 36L213 300L353 318Z`}),t(`path`,{key:`8c76c669b7edbfdada18a00e82c8760c3eb55987`,d:`M391 286L565 272L421 252L391 286Z`}),this.state._labeled===!0&&t(`text`,{key:`01f6d92e065a1b17072de2438671cdd208a416f2`,class:`kol-kolibri__text`,x:`250`,y:`525`,fill:e},`KoliBri`))}validateColor(e){o(this,e,{defaultValue:`#003c78`,hooks:{beforePatch:this.handleColorChange}})}validateLabeled(t){e(this,`_labeled`,t,{defaultValue:!0})}componentWillLoad(){this.validateColor(this._color),this.validateLabeled(this._labeled)}static get watchers(){return{_color:[`validateColor`],_labeled:[`validateLabeled`]}}};c.style={default:s};export{c as kol_kolibri};