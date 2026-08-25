import{o as e,r as t,s as n,u as r}from"./index-C6_8MG7B.js";import{t as i}from"./base-web-component-BT6jbe_v-Vp21XLG3.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import{n as a}from"./normalizers-DwZ6RXph-DTCp-_pF.js";import{t as o}from"./i18n-DppON4Nc-Bk0NTFcm.js";import{t as s}from"./contrast--AU_DInd-qnKDfgi6.js";import{t as c}from"./label-B4jhdB3Q-BdH8QaOM.js";import"./variant-quote-B7A0-G7t-pdvyg2sk.js";import{t as l}from"./src-CymcBWRf-BQDRnl3C.js";import{t as u}from"./base-controller-CXhqh4cR-BNzx0WwK.js";var d=`kol-avatar`,f=r(d,`image`),p=r(d,`initials`),m=t=>{let{color:n,initials:r,label:i,src:a}=t;return e(`div`,{"aria-label":o(`kol-avatar-alt`,{placeholders:{name:i}}),class:`kol-avatar`,role:`img`,style:{backgroundColor:n.backgroundColor,color:n.foregroundColor}},a?e(`img`,{alt:``,"aria-hidden":`true`,class:f,src:a}):e(`span`,{"aria-hidden":`true`,class:p},r))},h=/^#((\d|[a-f]){8}|(\d|[a-f]){6}|(\d|[a-f]){3,4})$/i;function g(e){return h.test(e)}function _(e){if(typeof e==`string`&&g(e)){let t=s(e);return{backgroundColor:t.background,foregroundColor:t.foreground}}if(typeof e==`object`&&e){let t=e;if(typeof t.backgroundColor==`string`&&typeof t.foregroundColor==`string`&&g(t.backgroundColor)&&g(t.foregroundColor)){let e=s({background:t.backgroundColor,foreground:t.foregroundColor});return{backgroundColor:e.background,foregroundColor:e.foreground}}}throw Error(`Invalid color ${e}`)}function v(e){return g(e.foregroundColor)&&g(e.backgroundColor)}var y=a(`color`,{backgroundColor:`#d3d3d3`,foregroundColor:`#3f3f3f`},_,v),b={optional:[y,l],required:[c]},x=e=>e.length===0?``:e[0].toUpperCase(),S=e=>{let t=e.trim().split(/\s+/),n=t[0],r=t[t.length-1];return t.length>=2&&n&&r?`${x(n)}${x(r)}`:x(e)},C=class extends u{constructor(e){super(e,b)}componentWillLoad(e){let{color:t,label:n,src:r}=e;this.watchColor(t),this.watchLabel(n),this.watchSrc(r)}watchColor(e){y.apply(e,e=>{this.setRenderProp(`color`,e)})}watchLabel(e){c.apply(e,e=>{this.setRenderProp(`label`,e),this.setState(`initials`,S(e))})}watchSrc(e){l.apply(e,e=>{this.setRenderProp(`src`,e)})}},w=`@charset "UTF-8";
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
  :host {
    display: block;
  }
}
@layer kol-component {
  :host {
    display: flex;
    width: calc(100 * 1rem / var(--kolibri-root-font-size, 16));
    aspect-ratio: 1;
    align-items: center;
    justify-content: center;
    container-type: size;
  }
  .kol-avatar,
  .kol-avatar__image,
  .kol-avatar__initials {
    border-radius: 50%;
  }
  .kol-avatar {
    /* Visible with forced colors  */
    outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));
    display: flex;
    width: max(100cqw, 100cqh);
    height: max(100cqw, 100cqh);
    flex-shrink: 0;
    container-type: size;
  }
  .kol-avatar__initials {
    background-color: inherit;
    margin: auto;
    font-size: 40cqh;
  }
}`,T=class extends i{constructor(e){super(),n(this,e),this.ctrl=new C(this.stateAccess),this.initials=``}watchColor(e){this.ctrl.watchColor(e)}watchLabel(e){this.ctrl.watchLabel(e)}watchSrc(e){this.ctrl.watchSrc(e)}componentWillLoad(){this.ctrl.componentWillLoad({color:this._color,label:this._label,src:this._src})}render(){return e(t,{key:`293a0f642334d4058d3b129b69d7de334bb43866`},e(m,{key:`96c92705c57c43050b666513dfc65829a7be5047`,color:this.ctrl.getRenderProp(`color`),label:this.ctrl.getRenderProp(`label`),src:this.ctrl.getRenderProp(`src`),initials:this.initials}))}static get watchers(){return{_color:[`watchColor`],_label:[`watchLabel`],_src:[`watchSrc`]}}};T.style={default:w};export{T as kol_avatar};