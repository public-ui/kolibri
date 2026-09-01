import{a as e,c as t,l as n,o as r,r as i,s as a}from"./index-4y3a6zpm.js";import{t as o}from"./base-web-component-D909Fl-Y-DjL1hhrh.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import{n as s,s as c}from"./normalizers-Be8ufkLk-XFImyUHR.js";import{t as l}from"./variant-quote-EmnyVV4C-Dk0gwEBY.js";import{t as u}from"./src-Cyxwrmf6-CLmXnjL7.js";var d=s(`alt`,``,c,e=>typeof e==`string`),f=s(`sizes`,``,c),p=s(`srcset`,``,c),m={optional:[l,f,p],required:[d,u]},h=e=>{let{alt:t,loading:n,sizes:i,src:a,srcset:o,handleError:s,handleLoad:c}=e;return r(`img`,{class:`kol-image`,alt:t,loading:n,sizes:i||void 0,src:a,srcset:o||void 0,onError:e=>s(e),onLoad:e=>c(e)})},g=`@charset "UTF-8";
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
  .kol-image {
    display: inline-block;
    max-width: 100%;
    max-height: 100%;
  }
}`,_=class extends o{constructor(e){super(),a(this,e),this.handleError=e=>{var r,i;(i=(r=this._on)?.onError)==null||i.call(r,e),this.host&&n(this.host,t.error,e)},this.handleLoad=e=>{var r,i;(i=(r=this._on)?.onLoad)==null||i.call(r,e),this.host&&n(this.host,t.load,e)}}watchAlt(e){d.apply(e,e=>this.setRenderProp(`alt`,e))}watchLoading(e){l.apply(e,e=>this.setRenderProp(`loading`,e))}watchSizes(e){f.apply(e,e=>this.setRenderProp(`sizes`,e))}watchSrc(e){u.apply(e,e=>this.setRenderProp(`src`,e))}watchSrcset(e){p.apply(e,e=>this.setRenderProp(`srcset`,e))}componentWillLoad(){this.initRenderProps(m),d.apply(this._alt,e=>this.setRenderProp(`alt`,e)),l.apply(this._loading,e=>this.setRenderProp(`loading`,e)),f.apply(this._sizes,e=>this.setRenderProp(`sizes`,e)),u.apply(this._src,e=>this.setRenderProp(`src`,e)),p.apply(this._srcset,e=>this.setRenderProp(`srcset`,e))}render(){return r(i,{key:`d755753606673b88ffc8cf7407fe6ba95eb3b9ff`},r(h,{key:`f712b6afe41001b7c772b312e9251e4a0663e5cb`,alt:this.getRenderProp(`alt`),loading:this.getRenderProp(`loading`),sizes:this.getRenderProp(`sizes`),src:this.getRenderProp(`src`),srcset:this.getRenderProp(`srcset`),handleError:this.handleError,handleLoad:this.handleLoad}))}get host(){return e(this)}static get watchers(){return{_alt:[`watchAlt`],_loading:[`watchLoading`],_sizes:[`watchSizes`],_src:[`watchSrc`],_srcset:[`watchSrcset`]}}};_.style={default:g};export{_ as kol_image};