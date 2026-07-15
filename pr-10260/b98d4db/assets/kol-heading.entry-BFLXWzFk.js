import{o as e,r as t,s as n}from"./index-R3jasSzo.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import{n as r,o as i}from"./normalizers-iLdS6AQE-BBj9F7wB.js";import{t as a}from"./base-web-component-BCIMb9gN-BghIqwYX.js";import{t as o}from"./base-controller-CXhqh4cR-BNzx0WwK.js";import{t as s}from"./clsx-COFh-Vc8-alQuJLqj.js";import{n as c}from"./level-DRQEJIoR-FXgAhj2V.js";var l=r(`label`,``,i),u=r(`secondaryHeadline`,``,i);function d(e){return e>=1&&e<=6?`h${e}`:`strong`}var f=t=>{let{label:n,level:r,secondaryHeadline:i}=t,a=d(r);return i?e(`hgroup`,{class:`kol-heading-group`},e(a,{class:s(`kol-headline`,`kol-headline--${a}`,`kol-headline--group`,`kol-headline--primary`)},n,e(`slot`,{name:`expert`,slot:`expert`})),e(`p`,{class:`kol-headline kol-headline--group kol-headline--secondary`},i)):e(a,{class:s(`kol-headline`,`kol-headline--${a}`,`kol-headline--single`)},n,e(`slot`,{name:`expert`,slot:`expert`}))},p={optional:[c,u],required:[l]},m=class extends o{constructor(e){super(e,p)}componentWillLoad(e){let{label:t,level:n,secondaryHeadline:r}=e;this.watchLabel(t),this.watchLevel(n),this.watchSecondaryHeadline(r)}watchLabel(e){l.apply(e,e=>{this.setRenderProp(`label`,e)})}watchLevel(e){c.apply(e,e=>{this.setRenderProp(`level`,e)})}watchSecondaryHeadline(e){u.apply(e,e=>{this.setRenderProp(`secondaryHeadline`,e)})}},h=`@charset "UTF-8";
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
  .kol-headline--secondary {
    margin: 0;
  }
}`,g=class{constructor(e){n(this,e),this.ctrl=new m(a.stateLess),this._level=0}watchLabel(e){this.ctrl.watchLabel(e)}watchLevel(e){this.ctrl.watchLevel(e)}watchSecondaryHeadline(e){this.ctrl.watchSecondaryHeadline(e)}componentWillLoad(){this.ctrl.componentWillLoad({label:this._label,level:this._level,secondaryHeadline:this._secondaryHeadline})}render(){return e(t,{key:`5d87ccb29dc05fdbd165bf482d18e80fbaa62b7d`},e(f,{key:`3d4d078165c93bc620c850644b4fcced6e4390ca`,label:this.ctrl.getRenderProp(`label`),level:this.ctrl.getRenderProp(`level`),secondaryHeadline:this.ctrl.getRenderProp(`secondaryHeadline`)}))}static get watchers(){return{_label:[`watchLabel`],_level:[`watchLevel`],_secondaryHeadline:[`watchSecondaryHeadline`]}}};g.style={default:h};export{g as kol_heading};