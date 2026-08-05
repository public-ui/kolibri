import{o as e,r as t,s as n,u as r,w as i}from"./index-Ci2SfrJK.js";import{t as a}from"./base-web-component-BT6jbe_v-Vp21XLG3.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import{n as o,o as s}from"./normalizers-BRhEe8td-C24z65XS.js";import{t as c}from"./label-DquqQrWd-Cpr82WWy.js";import{n as l}from"./variant-quote-CFRqGY36-CM1f9u_t.js";import{t as u}from"./base-controller-CXhqh4cR-BNzx0WwK.js";var d=o(`href`,``,s,e=>typeof e==`string`),f=o(`quote`,``,s),p=r.forBlock(`kol-quote`),m=p(`blockquote`),h=p(`cite`),g=p(`figcaption`),_=p(`quote`),v=t=>{let{href:n,label:r,quote:a,variant:o}=t,s=a===``,c=p({[o]:!0});return e(`figure`,{class:c},o===`block`?e(`blockquote`,{class:m,cite:n},a,e(`span`,{"aria-hidden":s?void 0:`true`,hidden:!s},e(`slot`,{name:`expert`}))):e(`q`,{class:_,cite:n},a,e(`span`,{"aria-hidden":s?void 0:`true`,hidden:!s},e(`slot`,{name:`expert`}))),typeof r==`string`&&r.length>0&&e(`figcaption`,{class:g},e(`cite`,{class:h},e(i,{_href:n,_label:r,_target:`_blank`}))))},y={optional:[c,l],required:[d,f]},b=class extends u{constructor(e){super(e,y)}componentWillLoad(e){let{href:t,label:n,quote:r,variant:i}=e;this.watchHref(t),this.watchLabel(n),this.watchQuote(r),this.watchVariant(i)}watchHref(e){d.apply(e,e=>{this.setRenderProp(`href`,e)})}watchLabel(e){c.apply(e,e=>{this.setRenderProp(`label`,e)})}watchQuote(e){f.apply(e,e=>{this.setRenderProp(`quote`,e)})}watchVariant(e){l.apply(e,e=>{this.setRenderProp(`variant`,e)})}},x=`@charset "UTF-8";
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
*/
@layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component;
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
  .kol-quote {
    display: inline;
    margin: 0;
    padding: 0;
  }
  .kol-quote__cite::before {
    content: "—";
  }
  .kol-quote--block .kol-quote__figcaption {
    display: inline;
    margin: 0;
    padding: 0;
  }
  .kol-quote__blockquote::before {
    content: open-quote;
  }
  .kol-quote__blockquote::after {
    content: close-quote;
  }
}`,S=class{constructor(e){n(this,e),this.ctrl=new b(a.stateLess),this._variant=`inline`}watchHref(e){this.ctrl.watchHref(e)}watchLabel(e){this.ctrl.watchLabel(e)}watchQuote(e){this.ctrl.watchQuote(e)}watchVariant(e){this.ctrl.watchVariant(e)}componentWillLoad(){this.ctrl.componentWillLoad({href:this._href,label:this._label,quote:this._quote,variant:this._variant})}render(){return e(t,{key:`6dbdd16912a99997f52326f7cca426f704a7357b`},e(v,{key:`a523fb0f75067faad16629169193f76e9e879ace`,href:this.ctrl.getRenderProp(`href`),label:this.ctrl.getRenderProp(`label`),quote:this.ctrl.getRenderProp(`quote`),variant:this.ctrl.getRenderProp(`variant`)}))}static get watchers(){return{_href:[`watchHref`],_label:[`watchLabel`],_quote:[`watchQuote`],_variant:[`watchVariant`]}}};S.style={default:x};export{S as kol_quote};