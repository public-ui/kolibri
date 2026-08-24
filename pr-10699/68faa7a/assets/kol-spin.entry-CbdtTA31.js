import{o as e,r as t,s as n}from"./index-BlstunOo.js";import{t as r}from"./base-web-component-BT6jbe_v-Vp21XLG3.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import{n as i,o as a,r as o}from"./normalizers-DwZ6RXph-C19LPALr.js";import"./i18n-DppON4Nc-D911DcBn.js";import{t as s}from"./label-B4jhdB3Q-CtsICSgn.js";import"./variant-quote-B7A0-G7t-CuBmr7DW.js";import{t as c}from"./base-controller-CXhqh4cR-BNzx0WwK.js";import{t as l}from"./component-DmD1SOam-BBUb1G0m.js";var u=i(`show`,!1,o),d=[`dot`,`cycle`,`none`],f=i(`variant`,`dot`,e=>{let t=a(e);if(d.includes(t))return t;throw Error(`Invalid spin variant: ${t}`)},()=>!0),p={optional:[s,u,f]},m=class extends c{constructor(e){super(e,p)}componentWillLoad(e){let{show:t,label:n,variant:r}=e;this.watchShow(t),this.watchLabel(n),this.watchVariant(r)}watchShow(e){u.apply(e,e=>{this.setRenderProp(`show`,e)})}watchLabel(e){s.apply(e,e=>{this.setRenderProp(`label`,e)})}watchVariant(e){f.apply(e,e=>{this.setRenderProp(`variant`,e)})}},h=`@charset "UTF-8";
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
  @keyframes rotate {
    to {
      transform: rotate(1turn);
    }
  }
  @keyframes growingCircle {
    0% {
      opacity: 0.5;
      border-color: white;
      clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
    }
    25% {
      opacity: 0.75;
      border-color: var(--kol-spin-color, var(--kol-theme-spin-color, #000));
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
    }
    50% {
      opacity: 1;
      border-color: var(--kol-spin-color, var(--kol-theme-spin-color, black));
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
    }
    75% {
      opacity: 1;
      border-color: var(--kol-spin-color, var(--kol-theme-spin-color, black));
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
    }
    100% {
      opacity: 0.1;
      border-color: var(--kol-spin-color, var(--kol-theme-spin-color, black));
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
    }
  }
  .kol-spin__spinner--cycle {
    width: calc(var(--kol-spin-size, 48) * 1rem / var(--kolibri-root-font-size, 16));
    height: calc(var(--kol-spin-size, 48) * 1rem / var(--kolibri-root-font-size, 16));
  }
  .kol-spin__spinner--cycle__element {
    border-radius: 50%;
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    animation: 2s linear infinite rotate;
  }
  @media (prefers-reduced-motion) {
    .kol-spin__spinner--cycle__element {
      animation-duration: 4s !important;
    }
  }
  .kol-spin__spinner--cycle__element::before {
    border-radius: 50%;
    position: absolute;
    inset: 0;
    content: "";
    animation: 3s linear infinite growingCircle;
    border: 5px solid var(--kol-spin-color, var(--kol-theme-spin-color, #333));
  }
  @media (prefers-reduced-motion) {
    .kol-spin__spinner--cycle__element::before {
      animation-duration: 6s !important;
    }
  }
}
@layer kol-component {
  @keyframes spin1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes spin2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(calc(var(--kol-spin-size, 13) * 1rem / var(--kolibri-root-font-size, 16)), 0);
    }
  }
  @keyframes spin3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  /* https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion#toning_down_the_animation_scaling */
  @media (prefers-reduced-motion) {
    .kol-spin__spinner-element {
      animation-duration: 2s !important;
    }
  }
  .kol-spin__spinner--dot {
    --kol-spin-border-width: calc(var(--kol-spin-size, 13) / 10);
    width: calc(calc(var(--kol-spin-size, 13) * 3 + 2) * 1rem / var(--kolibri-root-font-size, 16));
    height: calc(calc(var(--kol-spin-size, 13) + var(--kol-spin-border-width) * 2) * 1rem / var(--kolibri-root-font-size, 16));
  }
  .kol-spin__spinner--dot__element {
    background-color: var(--kol-spin-color, var(--kol-theme-spin-color, #000));
    border-radius: 50%;
    position: absolute;
    top: 1px;
    width: calc(var(--kol-spin-size, 13) * 1rem / var(--kolibri-root-font-size, 16));
    height: calc(var(--kol-spin-size, 13) * 1rem / var(--kolibri-root-font-size, 16));
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
    border: calc(var(--kol-spin-border-width) * 1rem / var(--kolibri-root-font-size, 16)) solid white;
  }
  .kol-spin__spinner--dot__element--1 {
    left: calc(var(--kol-spin-border-width) * 1rem / var(--kolibri-root-font-size, 16));
    z-index: 0;
    animation: 1s infinite spin1;
  }
  .kol-spin__spinner--dot__element--2 {
    left: calc(var(--kol-spin-border-width) * 1rem / var(--kolibri-root-font-size, 16));
    z-index: 1;
    animation: 1s infinite spin2;
  }
  .kol-spin__spinner--dot__element--3 {
    left: calc(calc(var(--kol-spin-size, 13) + var(--kol-spin-border-width)) * 1rem / var(--kolibri-root-font-size, 16));
    z-index: 1;
    animation: 1s infinite spin2;
  }
  .kol-spin__spinner--dot__element--4 {
    opacity: 0.6;
    left: calc(calc(var(--kol-spin-size, 13) * 2 + var(--kol-spin-border-width)) * 1rem / var(--kolibri-root-font-size, 16));
    z-index: 0;
    animation: 1s infinite spin3;
  }
}
@layer kol-component {
  .kol-spin__spinner {
    display: block;
    position: relative;
  }
}`,g=class extends r{constructor(e){super(),n(this,e),this.ctrl=new m(this.stateAccess)}watchShow(e){this.ctrl.watchShow(e)}watchLabel(e){this.ctrl.watchLabel(e)}watchVariant(e){this.ctrl.watchVariant(e)}componentWillLoad(){this.ctrl.componentWillLoad({show:this._show,label:this._label,variant:this._variant})}render(){return e(t,{key:`8c5ff4d56493e2c27db92e7687e2dbfe01d409ac`},e(l,{key:`5619e221a40298061e05884948baafead0e06846`,show:this.ctrl.getRenderProp(`show`),label:this.ctrl.getRenderProp(`label`),variant:this.ctrl.getRenderProp(`variant`)}))}static get watchers(){return{_show:[`watchShow`],_label:[`watchLabel`],_variant:[`watchVariant`]}}};g.style={default:h};export{g as kol_spin};