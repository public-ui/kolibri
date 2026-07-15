import{a as e,d as t,f as n,o as r,r as i,s as a}from"./index-Yml9sNyN.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import{n as o,o as s}from"./normalizers-iLdS6AQE-BbQ7mkeM.js";import{n as c,t as l}from"./base-web-component-BCIMb9gN-DWDKGf5z.js";import{t as u}from"./base-controller-CXhqh4cR-BNzx0WwK.js";import{t as d}from"./src-C1iVkqtP-DWah7CJb.js";var f=o(`alt`,``,s,e=>typeof e==`string`),p=o(`sizes`,``,s),m=o(`srcset`,``,s),h=e=>{let{alt:t,loading:n,sizes:i,src:a,srcset:o,handleError:s,handleLoad:c}=e;return r(`img`,{class:`kol-image`,alt:t,loading:n,sizes:i||void 0,src:a,srcset:o||void 0,onError:e=>s(e),onLoad:e=>c(e)})},g={optional:[c,p,m],required:[f,d]},_=class extends u{constructor(e){super(e,g)}componentWillLoad(e){let{alt:t,loading:n,sizes:r,src:i,srcset:a}=e;this.watchAlt(t),this.watchLoading(n),this.watchSizes(r),this.watchSrc(i),this.watchSrcset(a)}watchAlt(e){f.apply(e,e=>{this.setRenderProp(`alt`,e)})}watchLoading(e){c.apply(e,e=>{this.setRenderProp(`loading`,e)})}watchSizes(e){p.apply(e,e=>{this.setRenderProp(`sizes`,e)})}watchSrc(e){d.apply(e,e=>{this.setRenderProp(`src`,e)})}watchSrcset(e){m.apply(e,e=>{this.setRenderProp(`srcset`,e)})}},v=`@charset "UTF-8";
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
  .kol-image {
    display: inline-block;
    max-width: 100%;
    max-height: 100%;
  }
}`,y=class{constructor(e){a(this,e),this.ctrl=new _(l.stateLess),this.handleError=e=>{var r,i;(i=(r=this._on)?.onError)==null||i.call(r,e),this.host&&n(this.host,t.error,e)},this.handleLoad=e=>{var r,i;(i=(r=this._on)?.onLoad)==null||i.call(r,e),this.host&&n(this.host,t.load,e)}}watchAlt(e){this.ctrl.watchAlt(e)}watchLoading(e){this.ctrl.watchLoading(e)}watchSizes(e){this.ctrl.watchSizes(e)}watchSrc(e){this.ctrl.watchSrc(e)}watchSrcset(e){this.ctrl.watchSrcset(e)}componentWillLoad(){this.ctrl.componentWillLoad({alt:this._alt,loading:this._loading,sizes:this._sizes,src:this._src,srcset:this._srcset})}render(){return r(i,{key:`3b39257fa87e6d0961ded3dba73922ebf8834626`},r(h,{key:`648ddf0d233b1b0896c5cdf43ee8ba50f95b2ea8`,alt:this.ctrl.getRenderProp(`alt`),loading:this.ctrl.getRenderProp(`loading`),sizes:this.ctrl.getRenderProp(`sizes`),src:this.ctrl.getRenderProp(`src`),srcset:this.ctrl.getRenderProp(`srcset`),handleError:this.handleError,handleLoad:this.handleLoad}))}get host(){return e(this)}static get watchers(){return{_alt:[`watchAlt`],_loading:[`watchLoading`],_sizes:[`watchSizes`],_src:[`watchSrc`],_srcset:[`watchSrcset`]}}};y.style={default:v};export{y as kol_image};