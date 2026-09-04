import{C as e,o as t,r as n,s as r,u as i}from"./index-CK4fQ08p.js";import{t as a}from"./base-web-component-D909Fl-Y-DjL1hhrh.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import{n as o,s}from"./normalizers-YTKt4bXw-9ric4Jm3.js";import{t as c}from"./label-Zuw86z1N-C3cT1o8B.js";import{n as l}from"./variant-quote-Dn7fuaYQ-rjxYYXrx.js";import{t as u}from"./href-gzZZ8o5E-B9ueHC2u.js";var d=o(`quote`,``,s),f={optional:[c,l],required:[u,d]},p=i.forBlock(`kol-quote`),m=p(`blockquote`),h=p(`cite`),g=p(`figcaption`),_=p(`quote`),v=n=>{let{href:r,label:i,quote:a,variant:o}=n,s=a===``,c=p({[o]:!0});return t(`figure`,{class:c},o===`block`?t(`blockquote`,{class:m,cite:r},a,t(`span`,{"aria-hidden":s?void 0:`true`,hidden:!s},t(`slot`,{name:`expert`}))):t(`q`,{class:_,cite:r},a,t(`span`,{"aria-hidden":s?void 0:`true`,hidden:!s},t(`slot`,{name:`expert`}))),typeof i==`string`&&i.length>0&&t(`figcaption`,{class:g},t(`cite`,{class:h},t(e,{_href:r,_label:i,_target:`_blank`}))))},y=`@charset "UTF-8";
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
* 6. kol-high-contrast - Defaults for forced colors and high contrast modes
* 7. kol-theme-high-contrast - Theme-specific styles for forced colors and high contrast modes
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
    .kol-card {
      color: CanvasText;
      background-color: Canvas;
      border: 1px solid ButtonText;
    }
    .kol-dialog,
    .kol-modal {
      color: CanvasText;
      background-color: Canvas;
      border: 1px solid ButtonText;
    }
    .kol-pagination__button--selected .kol-button {
      opacity: 1;
    }
    .kol-pagination__button--selected .kol-button__text {
      color: SelectedItemText;
      background-color: SelectedItem;
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
}`,b=class extends a{constructor(e){super(),r(this,e),this._variant=`inline`}watchHref(e){u.apply(e,e=>this.setRenderProp(`href`,e))}watchLabel(e){c.apply(e,e=>this.setRenderProp(`label`,e))}watchQuote(e){d.apply(e,e=>this.setRenderProp(`quote`,e))}watchVariant(e){l.apply(e,e=>this.setRenderProp(`variant`,e))}componentWillLoad(){this.initRenderProps(f),u.apply(this._href,e=>this.setRenderProp(`href`,e)),c.apply(this._label,e=>this.setRenderProp(`label`,e)),d.apply(this._quote,e=>this.setRenderProp(`quote`,e)),l.apply(this._variant,e=>this.setRenderProp(`variant`,e))}render(){return t(n,{key:`f2f3fcba27d9b5e6bf6f2f061e5dfab6cedd07f4`},t(v,{key:`114079cc6c38bff8d260dda7954bfc7263dac6be`,href:this.getRenderProp(`href`),label:this.getRenderProp(`label`),quote:this.getRenderProp(`quote`),variant:this.getRenderProp(`variant`)}))}static get watchers(){return{_href:[`watchHref`],_label:[`watchLabel`],_quote:[`watchQuote`],_variant:[`watchVariant`]}}};b.style={default:y};export{b as kol_quote};