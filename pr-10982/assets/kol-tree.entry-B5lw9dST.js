import{c as e,o as t,r as n,s as r}from"./index-DcDxiC7I-Bt0i3Efs.js";import{C as i,i as a,w as o}from"./index-DJ7TLJxw.js";import{t as s}from"./base-web-component--IgFgz37-CZuvR3uB.js";import"./_Uint8Array-CuELS0_2-BYXN1zbF.js";import"./variant-quote-DeZzWGZI-C89TqCgK.js";import{t as c}from"./element-focus-Cp994Rrk-BCxGGpIg.js";import{t as l}from"./label-with-expert-slot-DQT5alA4-C_rNdhPk.js";import{n as u,r as d}from"./open-items-cache-D-kml1h6-Ce94d8eX.js";var f={required:[l]},p=a.forBlock(`kol-tree`),m=p(),h=p(`treeview-navigation`),g=({handleSlotchange:e,label:t})=>r(`nav`,{class:m,"aria-label":t},r(`ul`,{class:h,role:`tree`,"aria-label":t},r(`slot`,{onSlotchange:e}))),_=`@charset "UTF-8";
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
  .kol-tree__treeview-navigation {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .kol-tree:focus-within {
    outline: 1px solid;
    outline-offset: 2px;
  }
}`,v=e=>e?.tagName===i.toUpperCase(),y=class extends s{constructor(t){super(),e(this,t),this.cacheValid=!1,this.invalidateOpenItemsCache=()=>{this.cacheValid=!1},this.handleSlotchange=()=>{this.observeTopLevelItems(),this.scheduleTreeChange()}}connectedCallback(){this.host&&u(this.host,this.invalidateOpenItemsCache)}componentWillLoad(){this.initRenderProps(f),this.watchLabel(this._label),this.handleTreeChange(),this.observeChildListMutations()}disconnectedCallback(){var e;this.host&&d(this.host),(e=this.observer)==null||e.disconnect(),this.rafHandle!==void 0&&(cancelAnimationFrame(this.rafHandle),this.rafHandle=void 0)}async focus(e){this.host&&await c(this.host,async()=>{await((await this.getOpenTreeItemElements())?.[0])?.focus(e)})}observeChildListMutations(){this.observer=new MutationObserver(()=>this.scheduleTreeChange()),this.observeTopLevelItems()}observeTopLevelItems(){this.getTopLevelTreeItems().forEach(e=>{var t;(t=this.observer)==null||t.observe(e,{childList:!0,subtree:!0})})}scheduleTreeChange(){this.rafHandle&&cancelAnimationFrame(this.rafHandle),this.rafHandle=requestAnimationFrame(()=>{this.handleTreeChange()})}getTopLevelTreeItems(){return Array.from(this.host?.children??[]).filter(e=>v(e)&&!e.slot)}handleTreeChange(){this.treeItemElements=this.getTreeItemElements(),this.cacheValid=!1,this.ensureActiveItemVisibility()}getTreeItemElements(){return this.getTopLevelTreeItems().reduce((e,t)=>{let n=t.querySelectorAll(i);return[...e,t,...n]},[])}async getOpenTreeItemElements(){if(!this.treeItemElements)return;if(this.cacheValid&&this.cachedOpenItems)return this.cachedOpenItems;let e=async e=>{let t=e.parentElement;for(;v(t);){if(!await t.isOpen())return!1;t=t.parentElement}return!0};return this.cachedOpenItems=await Promise.all(this.treeItemElements.map(async t=>({item:t,isOpen:await e(t)}))).then(e=>e.filter(({isOpen:e})=>e).map(({item:e})=>e)),this.cacheValid=!0,this.cachedOpenItems}ensureActiveItemVisibility(){let e=()=>{for(let e of this.getTopLevelTreeItems()){if(e._active)return e;let t=e.querySelector(`${i}[_active="true"]`);if(t?._active)return t}},t=e=>{v(e.parentElement)&&(e.parentElement.expand(),t(e.parentElement))},n=e();n&&t(n)}async handleKeyDown(e){let t=await this.getOpenTreeItemElements(),n=document.activeElement?.closest(i),r=e.metaKey||e.altKey||e.ctrlKey||e.shiftKey;if(!t||!n)return;let a=t.findIndex(e=>e===n);switch(e.key){case`ArrowDown`:await t[a+1]?.focus(),e.preventDefault();break;case`ArrowUp`:await t[a-1]?.focus(),e.preventDefault();break;case`Right`:case`ArrowRight`:e.preventDefault(),await n.isOpen()?await t[a+1]?.focus():await n.expand();break;case`Left`:case`ArrowLeft`:if(e.preventDefault(),await n.isOpen())await n.collapse();else{let e=n.parentElement,r=e?t.indexOf(e):-1;r!==-1&&await t[r]?.focus()}break;case`Home`:await t[0]?.focus(),e.preventDefault();break;case`End`:await t[t.length-1]?.focus(),e.preventDefault();break;case e.key.match(/^[a-zA-Z0-9]$/)?.input:if(!r){let n=e.key.toLowerCase(),r=a+1,i=e=>e.getAttribute(`_label`)?.trim().toLowerCase().startsWith(n)??!1,o=t.slice(r).findIndex(i);o===-1?o=t.slice(0,r).findIndex(i):o+=r,o!==-1&&(await t[o]?.focus(),e.preventDefault())}break;case`*`:(n.parentElement?.querySelectorAll(i))?.forEach(e=>{e.expand()})}}handleFocusIn(e){e.target===this.host&&!document.activeElement?.closest(i)&&requestAnimationFrame(()=>{this.focus()})}handleFocusOut(e){e.relatedTarget&&!e.relatedTarget.closest(o)&&this.ensureActiveItemVisibility()}render(){return r(n,{key:`0664dce2b05b7d5acd281ba6ab015aba803cb124`},r(g,{key:`e1ac3a3f0b8d9b859677579238ca2c66d7a2d800`,handleSlotchange:this.handleSlotchange,label:this.getRenderProp(`label`)}))}watchLabel(e){l.apply(e,e=>this.setRenderProp(`label`,e))}get host(){return t(this)}static get watchers(){return{_label:[`watchLabel`]}}};y.style={default:_};export{y as kol_tree};