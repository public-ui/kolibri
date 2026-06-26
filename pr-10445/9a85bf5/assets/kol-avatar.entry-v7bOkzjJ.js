import{o as e,p as t,r as n,s as r}from"./index-fD6QA0MZ.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import{n as i}from"./normalizers-B5NKuJgN-DZ_l8o9-.js";import{t as a}from"./label-BT-6lb8r-leZYbGB-.js";import{t as o}from"./base-web-component-CArCAUxk-B71fORFV.js";import{t as s}from"./base-controller-CXhqh4cR-BNzx0WwK.js";import{t as c}from"./i18n-COPUp6ul-DR5GQMdC.js";import{t as l}from"./contrast-D1msrkD4-DP0wTI_L.js";import{t as u}from"./src-DH5c0A9H-Bl04uvZ4.js";var d=/^#((\d|[a-f]){8}|(\d|[a-f]){6}|(\d|[a-f]){3,4})$/i;function f(e){return d.test(e)}function p(e){if(typeof e==`string`&&f(e)){let t=l(e);return{backgroundColor:t.background,foregroundColor:t.foreground}}else if(typeof e==`object`&&e){let t=e;if(typeof t.backgroundColor==`string`&&typeof t.foregroundColor==`string`&&f(t.backgroundColor)&&f(t.foregroundColor)){let e=l({background:t.backgroundColor,foreground:t.foregroundColor});return{backgroundColor:e.background,foregroundColor:e.foreground}}}throw Error(`Invalid color ${e}`)}function m(e){return f(e.foregroundColor)&&f(e.backgroundColor)}var h=i(`color`,{backgroundColor:`#d3d3d3`,foregroundColor:`#3f3f3f`},p,m),g=`kol-avatar`,_=t(g,`image`),v=t(g,`initials`),y=t=>{let{color:n,initials:r,label:i,src:a}=t;return e(`div`,{"aria-label":c(`kol-avatar-alt`,{placeholders:{name:i}}),class:`kol-avatar`,role:`img`,style:{backgroundColor:n.backgroundColor,color:n.foregroundColor}},a?e(`img`,{alt:``,"aria-hidden":`true`,class:_,src:a}):e(`span`,{"aria-hidden":`true`,class:v},r))},b={optional:[h,u],required:[a]},x=e=>e.length===0?``:e[0].toUpperCase(),S=e=>{let t=e.trim().split(/\s+/),n=t[0],r=t[t.length-1];return t.length>=2&&n&&r?`${x(n)}${x(r)}`:x(e)},C=class extends s{constructor(e){super(e,b)}componentWillLoad(e){let{color:t,label:n,src:r}=e;this.watchColor(t),this.watchLabel(n),this.watchSrc(r)}watchColor(e){h.apply(e,e=>{this.setRenderProp(`color`,e)})}watchLabel(e){a.apply(e,e=>{this.setRenderProp(`label`,e),this.setState(`initials`,S(e))})}watchSrc(e){u.apply(e,e=>{this.setRenderProp(`src`,e)})}},w=`/* forward the rem function */
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
  :host {
    display: block;
  }
}
@layer kol-component {
  .kol-avatar,
  .kol-avatar__image,
  .kol-avatar__initials {
    border-radius: 50%;
  }
  .kol-avatar {
    /* Visible with forced colors  */
    outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));
    display: flex;
    width: calc(100 * 1rem / var(--kolibri-root-font-size, 16));
    height: calc(100 * 1rem / var(--kolibri-root-font-size, 16));
  }
  .kol-avatar__initials {
    background-color: inherit;
    margin: auto;
    font-size: calc(40 * 1rem / var(--kolibri-root-font-size, 16));
  }
}`,T=class extends o{constructor(e){super(),r(this,e),this.ctrl=new C(this.stateAccess),this.initials=``}watchColor(e){this.ctrl.watchColor(e)}watchLabel(e){this.ctrl.watchLabel(e)}watchSrc(e){this.ctrl.watchSrc(e)}componentWillLoad(){this.ctrl.componentWillLoad({color:this._color,label:this._label,src:this._src})}render(){return e(n,{key:`51bab6cbd74bf055652e1c6e898859c3c2da74c2`},e(y,{key:`5a9ca83993207e35f7d62f85a680b04f49f4cd0e`,color:this.ctrl.getRenderProp(`color`),label:this.ctrl.getRenderProp(`label`),src:this.ctrl.getRenderProp(`src`),initials:this.initials}))}static get watchers(){return{_color:[`watchColor`],_label:[`watchLabel`],_src:[`watchSrc`]}}};T.style={default:w};export{T as kol_avatar};