import{c as e,r as t,s as n}from"./index-DcDxiC7I-DL_Fa4k7.js";import{t as r}from"./base-web-component--IgFgz37-CZuvR3uB.js";import{h as i,i as a}from"./variant-quote-CPA_pFWU-BLd7k0sN.js";import"./label-BDgaSpkn-Ug5u5pm3.js";import{t as o}from"./label-CDp6ht3Z-DkuHE6pN.js";import{t as s}from"./i18n-s5q4We3h-DEUqe8gt.js";import{n as c,r as l,t as u}from"./value-number-clamped-BlwB4mSS-DkWkyyWg.js";import{t as d}from"./orientation-CkztOikx-BeD6jPWB.js";var f=a(`high`,0,i),p=a(`low`,0,i),m=a(`min`,0,i),h=a(`optimum`,0,i),g=a(`value`,0,i,e=>e>=0),_={optional:[m,d,l],required:[o,c,g]};function v(e,t,n,r,i,a){let o=r??t,s=i??n;if(a===void 0)return e>=o&&e<=s?`optimum`:`suboptimal`;let c=e<o,l=e>s,u=!c&&!l;return a<o?c?`optimum`:u?`suboptimal`:`critical`:a>s?l?`optimum`:u?`suboptimal`:`critical`:u?`optimum`:`suboptimal`}var y=e=>{let{high:t,label:r,low:i,max:a,min:o,optimum:c,orientation:l,unit:u,value:d}=e,f=l===`vertical`,p=u===`%`,m=p?Math.round((d-o)/(a-o)*100):d,h=v(d,o,a,i,t,c),g=i!==void 0||t!==void 0,_=``;g&&(_=s(h===`critical`?`kol-meter-state-critical`:h===`optimum`?`kol-meter-state-optimum`:`kol-meter-state-suboptimal`));let y=p?s(`kol-live-value`,{placeholders:{value:String(m),unit:u}}):s(`kol-live-value-bounded`,{placeholders:{value:String(m),max:String(a),unit:u}}),b=g?`${y} – ${_}`:y,x=a.toString().length>o.toString().length?a.toString().length+`ch`:o.toString().length+`ch`;return n(`div`,{class:{"kol-meter":!0,"kol-meter--vertical":f}},n(`div`,{class:`kol-meter__bar`},n(`div`,{class:`kol-meter__bar-label`},r,g&&n(`span`,{class:`kol-meter__bar-state kol-meter__bar-state--${h}`},` – `,_)),n(`div`,{class:`kol-meter__bar-track`},n(`meter`,{"aria-label":r,"aria-valuetext":b,high:t,low:i,max:a,min:o,optimum:c,value:d})),n(`span`,{class:`kol-meter__value-unit`},n(`span`,{class:`kol-meter__value`,style:{"min-width":x}},m),n(`span`,{class:`kol-meter__unit`},u))))},b=`@charset "UTF-8";
/* forward the rem function */
/*
 * Guards an interaction rule (\`:hover\`, \`:active\`, \`:focus…\`) against the disabled state.
 *
 * Two shapes are needed because the disabled marker sits on different elements: a native control
 * carries \`disabled\`, an anchor or summary carries \`aria-disabled\`, and a BEM wrapper carries a
 * \`--disabled\` modifier while its inner control carries the attribute.
 */
/* Wrapper variant: asks the interactive element inside, which is where the attribute lives. */
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
* 6. kol-forced-colors - Defaults for forced colors and high contrast modes
* 7. kol-theme-forced-colors - Theme-specific styles for forced colors and high contrast modes
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
    /*
     * Forced colors drop author colors, so the only way a disabled control still reads as
     * disabled is the \`GrayText\` system color. \`kol-button\` had it; the controls whose disabled
     * state is \`aria-disabled\` (anchor, summary) and the native form controls did not.
     */
    .kol-link__interactive-element[aria-disabled=true],
    .kol-accordion__heading[aria-disabled=true],
    .kol-details__heading[aria-disabled=true] {
      color: GrayText;
    }
    .kol-link__interactive-element[aria-disabled=true] .kol-icon,
    .kol-link__interactive-element[aria-disabled=true] .kol-span__label,
    .kol-accordion__heading[aria-disabled=true] .kol-icon,
    .kol-accordion__heading[aria-disabled=true] .kol-span__label,
    .kol-details__heading[aria-disabled=true] .kol-icon,
    .kol-details__heading[aria-disabled=true] .kol-span__label {
      color: GrayText;
    }
    input:disabled,
    select:disabled,
    textarea:disabled {
      color: GrayText;
      border-color: GrayText;
    }
    .kol-card,
    .kol-dialog,
    .kol-modal,
    .kol-drawer {
      color: CanvasText;
      background-color: Canvas;
      border: 1px solid ButtonBorder;
    }
    .kol-pagination__button--selected .kol-button {
      opacity: 1;
    }
    .kol-pagination__button--selected .kol-button__text {
      color: SelectedItemText;
      background-color: SelectedItem;
    }
    /* focus styles */
    .kol-button__interactive-element:focus-visible,
    .kol-link__interactive-element:focus-visible {
      outline: 2px solid Highlight;
      outline-offset: 2px;
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
}`,x=class extends r{constructor(t){super(),e(this,t),this.meterData={high:void 0,low:void 0,optimum:void 0},this._max=1,this._min=0,this._orientation=`horizontal`,this._unit=`%`}watchHigh(e){e===void 0?this.meterData.high=void 0:f.apply(e,e=>{this.meterData.high=e})}watchLabel(e){o.apply(e,e=>this.setRenderProp(`label`,e))}watchLow(e){e===void 0?this.meterData.low=void 0:p.apply(e,e=>{this.meterData.low=e})}watchMax(e){c.apply(e,e=>{this.setRenderProp(`max`,e),this.watchValue(this.getRawProp(`value`))})}watchMin(e){m.apply(e,e=>{this.setRenderProp(`min`,e),this.watchValue(this.getRawProp(`value`))})}watchOptimum(e){e===void 0?this.meterData.optimum=void 0:h.apply(e,e=>{this.meterData.optimum=e})}watchOrientation(e){d.apply(e,e=>this.setRenderProp(`orientation`,e))}watchUnit(e){l.apply(e,e=>this.setRenderProp(`unit`,e))}watchValue(e){this.setRawProp(`value`,e),u.apply(e,e=>{this.setRenderProp(`value`,e)},{min:this.getRenderProp(`min`),max:this.getRenderProp(`max`)})}componentWillLoad(){this.initRenderProps(_),this.watchHigh(this._high),o.apply(this._label,e=>this.setRenderProp(`label`,e)),this.watchLow(this._low),c.apply(this._max,e=>{this.setRenderProp(`max`,e),this.watchValue(this.getRawProp(`value`))}),m.apply(this._min,e=>{this.setRenderProp(`min`,e),this.watchValue(this.getRawProp(`value`))}),this.watchOptimum(this._optimum),d.apply(this._orientation,e=>this.setRenderProp(`orientation`,e)),l.apply(this._unit,e=>this.setRenderProp(`unit`,e)),this.watchValue(this._value)}render(){let{high:e,low:r,optimum:i}=this.meterData;return n(t,{key:`287bac0698e32cd1a291f54af14d2bab05ebe281`},n(y,{key:`a3b9370b211854e7b04ada002e24a4eaba290cd5`,high:e,label:this.getRenderProp(`label`),low:r,max:this.getRenderProp(`max`),min:this.getRenderProp(`min`),optimum:i,orientation:this.getRenderProp(`orientation`),unit:this.getRenderProp(`unit`),value:this.getRenderProp(`value`)}))}static get watchers(){return{_high:[`watchHigh`],_label:[`watchLabel`],_low:[`watchLow`],_max:[`watchMax`],_min:[`watchMin`],_optimum:[`watchOptimum`],_orientation:[`watchOrientation`],_unit:[`watchUnit`],_value:[`watchValue`]}}};x.style={default:b};export{x as kol_meter};