import{o as e,r as t,s as n}from"./index-CCR_iWWY.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import{n as r,o as i}from"./normalizers-iLdS6AQE-C910884X.js";import{t as a}from"./label-BwPy2Jd4-xu7RkU2m.js";import{t as o}from"./base-web-component-BCIMb9gN-LtEVmWMj.js";import{t as s}from"./base-controller-CXhqh4cR-BNzx0WwK.js";import{t as c}from"./i18n-CcjZRTxD-Cw2qXxYb.js";import{n as l,r as u,t as d}from"./value-number-clamped-CiWMaJPP-CX5s1eZu.js";var f=[`bar`,`cycle`],p=r(`variant`,`bar`,e=>{let t=i(e);if(f.includes(t))return t;throw Error(`Invalid progress variant: ${t}`)},()=>!0),m=342,h=({max:t,value:n})=>e(`svg`,{width:`100`,viewBox:`0 0 120 120`,xmlns:`http://www.w3.org/2000/svg`},e(`circle`,{class:`kol-progress__cycle-background`,cx:`60`,cy:`60`,r:`54.5`,fill:`currentColor`,stroke:`currentColor`,"stroke-width":`8`}),e(`circle`,{class:`kol-progress__cycle-whitespace`,cx:`60`,cy:`60`,r:`59`,fill:`currentColor`,stroke:`currentColor`,"stroke-width":`3`}),e(`circle`,{class:`kol-progress__cycle-border`,cx:`60`,cy:`60`,r:`59`,fill:`currentColor`,stroke:`currentColor`,"stroke-width":`1`}),e(`circle`,{class:`kol-progress__cycle-whitespace`,cx:`60`,cy:`60`,r:`51`,fill:`currentColor`,stroke:`currentColor`,"stroke-width":`1`}),e(`circle`,{class:`kol-progress__cycle-border`,cx:`60`,cy:`60`,r:`50`,fill:`currentColor`,stroke:`currentColor`,"stroke-width":`1`}),e(`circle`,{class:`kol-progress__cycle-progress`,fill:`currentColor`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-dasharray":`${Math.round(n/t*m)}px ${m}px`,"stroke-width":`6`,cx:`60`,cy:`60`,r:`54.5`})),g=({max:t,value:n})=>{let r=n/t*100;return e(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`100%`,height:`12`,overflow:`visible`},e(`rect`,{class:`kol-progress__bar-background`,x:`1`,y:`1`,height:`11`,rx:`5`,fill:`currentColor`,stroke:`currentColor`,"stroke-width":`3`,width:`100%`}),e(`rect`,{class:`kol-progress__bar-border`,x:`1`,y:`1`,height:`11`,rx:`5`,fill:`currentColor`,stroke:`currentColor`,"stroke-width":`1`,width:`100%`}),e(`rect`,{class:`kol-progress__bar-progress`,x:`3`,y:`3`,height:`7`,rx:`3.5`,fill:`currentColor`,stroke:`currentColor`,"stroke-width":`3`,style:{width:`calc(${r}% - 4px)`}}))},_=(t,n,r)=>{switch(t){case`cycle`:return e(h,{max:n,value:r});case`bar`:return e(g,{max:n,value:r});default:throw Error(`Progress variant ${t} not implemented.`)}},v=t=>{let{label:n,max:r,unit:i,value:a,variant:o,liveValue:s}=t,l=i===`%`,u=l?`${Math.round(s/r*100)}`:s,d=l?Math.round(a/r*100):a,f=`${`${(l?100:r)+1}`.length}ch`,p=l?c(`kol-live-value`,{placeholders:{value:String(u),unit:i}}):c(`kol-live-value-bounded`,{placeholders:{value:String(u),max:String(r),unit:i}});return e(`div`,{class:`kol-progress`},e(`div`,{"aria-hidden":`true`,class:{"kol-progress__cycle":o===`cycle`,"kol-progress__bar":o===`bar`}},o===`bar`&&n&&e(`div`,{class:`kol-progress__bar-label`},n),_(o,r,a),o===`cycle`&&e(`div`,{class:`kol-progress__cycle-text`},n&&e(`div`,{class:`kol-progress__cycle-label`},n),e(`div`,{class:`kol-progress__cycle-value`},`${d} ${i}`)),o===`bar`&&e(`div`,{class:`kol-progress__bar-value`,style:{width:f}},d),o===`bar`&&e(`div`,{class:`kol-progress__bar-unit`},i)),e(`progress`,{class:`visually-hidden`,"aria-busy":a<r?`true`:`false`,max:r,value:a}),e(`span`,{"aria-live":`polite`,"aria-relevant":`removals text`,class:`visually-hidden`},p))},y={optional:[a,u,p],required:[l,d]},b=class extends s{constructor(e){super(e,y)}componentWillLoad(e){let{label:t,max:n,unit:r,value:i,variant:a}=e;this.watchLabel(t),this.watchMax(n),this.watchUnit(r),this.watchValue(i),this.watchVariant(a),this.setState(`liveValue`,this.getRenderProp(`value`)),this.startLiveValueInterval()}watchLabel(e){a.apply(e,e=>{this.setRenderProp(`label`,e)})}watchMax(e){l.apply(e,e=>{this.setRenderProp(`max`,e),this.watchValue(this.getRawProp(`value`))})}watchUnit(e){u.apply(e,e=>{this.setRenderProp(`unit`,e)})}watchValue(e){this.setRawProp(`value`,e),d.apply(e,e=>{this.setRenderProp(`value`,e)},{min:0,max:this.getRenderProp(`max`)})}watchVariant(e){p.apply(e,e=>{this.setRenderProp(`variant`,e)})}startLiveValueInterval(){this.interval=setInterval(()=>{let e=this.getRenderProp(`value`);this.setState(`liveValue`,e)},5e3)}destroy(){this.interval&&=(clearInterval(this.interval),void 0)}},x=`@charset "UTF-8";
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
  .kol-progress {
    --color-bar: var(--kol-progress-color-bar, #0075ff);
  }
  .kol-progress__bar {
    display: grid;
    align-items: center;
    grid-template-areas: "LABEL LABEL LABEL" "BAR VALUE UNIT";
    grid-template-columns: 1fr auto;
  }
  .kol-progress__bar-label {
    grid-column-end: 2;
    grid-area: LABEL;
  }
  .kol-progress__bar svg {
    grid-area: BAR;
  }
  .kol-progress__bar-value {
    grid-area: VALUE;
    text-align: right;
  }
  .kol-progress__bar-unit {
    grid-area: UNIT;
  }
  .kol-progress__bar-border {
    fill: transparent;
    stroke: black;
  }
  .kol-progress__bar-background {
    fill: white;
    stroke: white;
  }
  .kol-progress__bar-progress {
    fill: var(--color-bar);
    stroke: transparent;
  }
  @media (prefers-reduced-motion: no-preference) {
    .kol-progress__bar-progress {
      transition: 250ms ease-in-out 50ms;
    }
  }
  .kol-progress__cycle {
    display: grid;
    align-content: center;
    justify-items: center;
    grid-template-areas: "ALL";
    grid-template-columns: auto;
  }
  .kol-progress__cycle > * {
    grid-area: ALL;
  }
  .kol-progress__cycle-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: x-small;
    text-align: center;
  }
  .kol-progress__cycle-text * {
    background-color: white;
  }
  .kol-progress__cycle-background {
    fill: transparent;
    stroke: white;
  }
  .kol-progress__cycle-border {
    fill: transparent;
    stroke: black;
  }
  .kol-progress__cycle-whitespace {
    fill: transparent;
    stroke: white;
  }
  .kol-progress__cycle-progress {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    fill: transparent;
    stroke: var(--color-bar);
  }
  @media (prefers-reduced-motion: no-preference) {
    .kol-progress__cycle-progress {
      transition: 250ms ease-in-out 50ms;
    }
  }
}`,S=class extends o{constructor(e){super(),n(this,e),this.ctrl=new b(this.stateAccess),this.liveValue=0}watchLabel(e){this.ctrl.watchLabel(e)}watchMax(e){this.ctrl.watchMax(e)}watchUnit(e){this.ctrl.watchUnit(e)}watchValue(e){this.ctrl.watchValue(e)}watchVariant(e){this.ctrl.watchVariant(e)}componentWillLoad(){this.ctrl.componentWillLoad({label:this._label,max:this._max,unit:this._unit,value:this._value,variant:this._variant})}disconnectedCallback(){this.ctrl.destroy()}render(){return e(t,{key:`70710a5592ba3177b7d4e657c36ee496c92fb879`},e(v,{key:`19414781e2a8b8b4daa4df4ca0734afcc7507830`,label:this.ctrl.getRenderProp(`label`),max:this.ctrl.getRenderProp(`max`),unit:this.ctrl.getRenderProp(`unit`),value:this.ctrl.getRenderProp(`value`),variant:this.ctrl.getRenderProp(`variant`),liveValue:this.liveValue}))}static get watchers(){return{_label:[`watchLabel`],_max:[`watchMax`],_unit:[`watchUnit`],_value:[`watchValue`],_variant:[`watchVariant`]}}};S.style={default:x};export{S as kol_progress};