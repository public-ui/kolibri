import{o as e,r as t,s as n}from"./index-B7AUTndI.js";import{t as r}from"./base-web-component-BT6jbe_v-Vp21XLG3.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import{a as i,n as a,o}from"./normalizers-Cpy0t9-X-cS_0aRHy.js";import{t as s}from"./i18n-D8kFHvIt-BHjnpdLu.js";import{t as c}from"./label-BGcJjCR_-C2M0nbZx.js";import"./variant-quote-CZ5CemUm-CVdBuw7u.js";import{t as l}from"./base-controller-CXhqh4cR-BNzx0WwK.js";import{n as u,r as d,t as f}from"./value-number-clamped-Doz9q_aV-0CSzJXv2.js";var p=a(`high`,0,i),m=a(`low`,0,i),h=a(`min`,0,i),g=a(`optimum`,0,i),_=[`horizontal`,`vertical`],v=a(`orientation`,`horizontal`,e=>{let t=o(e);if(_.includes(t))return t;throw Error(`Invalid orientation: ${t}`)}),y=a(`value`,0,i,e=>e>=0);function b(e,t,n,r,i,a){let o=r??t,s=i??n;if(a===void 0)return e>=o&&e<=s?`optimum`:`suboptimal`;let c=e<o,l=e>s,u=!c&&!l;return a<o?c?`optimum`:u?`suboptimal`:`critical`:a>s?l?`optimum`:u?`suboptimal`:`critical`:u?`optimum`:`suboptimal`}var x=t=>{let{high:n,label:r,low:i,max:a,min:o,optimum:c,orientation:l,unit:u,value:d}=t,f=l===`vertical`,p=u===`%`,m=p?Math.round((d-o)/(a-o)*100):d,h=b(d,o,a,i,n,c),g=i!==void 0||n!==void 0,_=``;g&&(_=s(h===`critical`?`kol-meter-state-critical`:h===`optimum`?`kol-meter-state-optimum`:`kol-meter-state-suboptimal`));let v=p?s(`kol-live-value`,{placeholders:{value:String(m),unit:u}}):s(`kol-live-value-bounded`,{placeholders:{value:String(m),max:String(a),unit:u}}),y=g?`${v} – ${_}`:v,x=a.toString().length>o.toString().length?a.toString().length+`ch`:o.toString().length+`ch`;return e(`div`,{class:{"kol-meter":!0,"kol-meter--vertical":f}},e(`div`,{class:`kol-meter__bar`},e(`div`,{class:`kol-meter__bar-label`},r,g&&e(`span`,{class:`kol-meter__bar-state kol-meter__bar-state--${h}`},` – `,_)),e(`div`,{class:`kol-meter__bar-track`},e(`meter`,{"aria-label":r,"aria-valuetext":y,high:n,low:i,max:a,min:o,optimum:c,value:d})),e(`span`,{class:`kol-meter__value-unit`},e(`span`,{class:`kol-meter__value`,style:{"min-width":x}},m),e(`span`,{class:`kol-meter__unit`},u))))},S={optional:[h,v,d],required:[c,u,y]},C=class extends l{constructor(e){super(e,S),this.meterData={high:void 0,low:void 0,optimum:void 0}}componentWillLoad(e){let{high:t,label:n,low:r,max:i,min:a,optimum:o,orientation:s,unit:c,value:l}=e;this.watchHigh(t),this.watchLabel(n),this.watchLow(r),this.watchMax(i),this.watchMin(a),this.watchOptimum(o),this.watchOrientation(s),this.watchUnit(c),this.watchValue(l)}getMeterData(){return this.meterData}watchHigh(e){e===void 0?this.meterData.high=void 0:p.apply(e,e=>{this.meterData.high=e})}watchLabel(e){c.apply(e,e=>{this.setRenderProp(`label`,e)})}watchLow(e){e===void 0?this.meterData.low=void 0:m.apply(e,e=>{this.meterData.low=e})}watchMax(e){u.apply(e,e=>{this.setRenderProp(`max`,e),this.watchValue(this.getRawProp(`value`))})}watchMin(e){h.apply(e,e=>{this.setRenderProp(`min`,e),this.watchValue(this.getRawProp(`value`))})}watchOptimum(e){e===void 0?this.meterData.optimum=void 0:g.apply(e,e=>{this.meterData.optimum=e})}watchOrientation(e){v.apply(e,e=>{this.setRenderProp(`orientation`,e)})}watchUnit(e){d.apply(e,e=>{this.setRenderProp(`unit`,e)})}watchValue(e){this.setRawProp(`value`,e),f.apply(e,e=>{this.setRenderProp(`value`,e)},{min:this.getRenderProp(`min`),max:this.getRenderProp(`max`)})}},w=`@charset "UTF-8";
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
  .kol-meter {
    --color-optimal: var(--kol-meter-color-optimal, #2ea32e);
    --color-suboptimal: var(--kol-meter-color-suboptimal, #c8a000);
    --color-critical: var(--kol-meter-color-critical, #c00);
    --vertical-height: var(--kol-meter-vertical-height, 128);
    --horizontal-height: var(--kol-meter-horizontal-height, 12);
  }
  .kol-meter__bar {
    display: grid;
    align-items: center;
    grid-template-areas: "label label" "bar value";
    grid-template-columns: 1fr auto;
  }
  .kol-meter__bar-label {
    grid-column-end: 2;
    grid-area: label;
  }
  .kol-meter__bar-track {
    display: flex;
    min-width: 100%;
    grid-area: bar;
  }
  .kol-meter__value-unit {
    grid-area: value;
  }
  .kol-meter:not(.kol-meter--vertical) .kol-meter__value {
    display: inline-block;
    text-align: right;
  }
  .kol-meter--vertical {
    min-height: 100%;
  }
  .kol-meter--vertical .kol-meter__bar {
    min-height: 100%;
    align-items: end;
    justify-items: center;
    grid-template-areas: "label" "bar" "value";
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr min-content;
  }
  .kol-meter--vertical .kol-meter__bar-label {
    text-align: center;
  }
  .kol-meter--vertical .kol-meter__bar-track {
    position: relative;
    min-width: 0;
    min-height: calc(var(--vertical-height) * 1rem / var(--kolibri-root-font-size, 16));
    align-items: center;
  }
  .kol-meter--vertical .kol-meter__bar meter {
    transform: rotate(-90deg);
    transform-origin: left bottom;
    position: absolute;
    bottom: 0;
    width: calc(var(--vertical-height) * 1rem / var(--kolibri-root-font-size, 16));
  }
  .kol-meter {
    /* Base meter styling */
  }
  .kol-meter meter {
    width: 100%;
    height: calc(var(--horizontal-height) * 1rem / var(--kolibri-root-font-size, 16));
    /* Remove default appearance in some browsers */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .kol-meter {
    /* Chrome, Safari, Edge (WebKit/Blink) */
  }
  .kol-meter meter::-webkit-meter-bar {
    background: white;
    height: calc(var(--horizontal-height) * 1rem / var(--kolibri-root-font-size, 16));
    border: 1px solid black;
  }
  .kol-meter meter::-webkit-meter-optimum-value {
    background: var(--color-optimal);
  }
  .kol-meter meter::-webkit-meter-suboptimum-value {
    background: var(--color-suboptimal);
  }
  .kol-meter meter::-webkit-meter-even-less-good-value {
    background: var(--color-critical);
  }
  .kol-meter {
    /* Firefox */
  }
  @supports (selector(::-moz-meter-bar)) {
    .kol-meter meter {
      background: white;
      border: 1px solid black;
    }
  }
  .kol-meter meter::-moz-meter-bar {
    background: var(--color-optimal);
  }
  .kol-meter meter:-moz-meter-sub-optimum::-moz-meter-bar {
    background: var(--color-suboptimal);
  }
  .kol-meter meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
    background: var(--color-critical);
  }
}`,T=class extends r{constructor(e){super(),n(this,e),this.ctrl=new C(r.stateLess),this._max=1,this._min=0,this._orientation=`horizontal`,this._unit=`%`}watchHigh(e){this.ctrl.watchHigh(e)}watchLabel(e){this.ctrl.watchLabel(e)}watchLow(e){this.ctrl.watchLow(e)}watchMax(e){this.ctrl.watchMax(e)}watchMin(e){this.ctrl.watchMin(e)}watchOptimum(e){this.ctrl.watchOptimum(e)}watchOrientation(e){this.ctrl.watchOrientation(e)}watchUnit(e){this.ctrl.watchUnit(e)}watchValue(e){this.ctrl.watchValue(e)}componentWillLoad(){this.ctrl.componentWillLoad({high:this._high,label:this._label,low:this._low,max:this._max,min:this._min,optimum:this._optimum,orientation:this._orientation,unit:this._unit,value:this._value})}render(){let{high:n,low:r,optimum:i}=this.ctrl.getMeterData();return e(t,{key:`d6296c70fef60247e6ca84ac7b02d556951dabea`},e(x,{key:`4ffab4c14275169bff007cc6e23b905153ce84a8`,high:n,label:this.ctrl.getRenderProp(`label`),low:r,max:this.ctrl.getRenderProp(`max`),min:this.ctrl.getRenderProp(`min`),optimum:i,orientation:this.ctrl.getRenderProp(`orientation`),unit:this.ctrl.getRenderProp(`unit`),value:this.ctrl.getRenderProp(`value`)}))}static get watchers(){return{_high:[`watchHigh`],_label:[`watchLabel`],_low:[`watchLow`],_max:[`watchMax`],_min:[`watchMin`],_optimum:[`watchOptimum`],_orientation:[`watchOrientation`],_unit:[`watchUnit`],_value:[`watchValue`]}}};T.style={default:w};export{T as kol_meter};