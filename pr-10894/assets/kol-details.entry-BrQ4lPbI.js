import{a as e,o as t,r as n,s as r}from"./index-Ca8QiBul.js";import{n as i,t as a}from"./dev.utils-6ILkAKzi-DXn6uJk-.js";import{t as o}from"./base-web-component--IgFgz37-CZuvR3uB.js";import{t as s}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import"./factory-D0YlwlU7-E6Wz0jLB.js";import{n as c}from"./level-6hZNsJlN-l58JwK8r.js";import{t as l}from"./block-bem-B54mur-n-Dr7DrHEv.js";import"./label-DPKGjVP8-DYYUcPeW.js";import{t as u}from"./label-CNXSQ8qg-DbV2dSWG.js";import"./variant-quote-BOp2s7X6-CHS5T-C8.js";import"./Heading-CvgldzQ--CYoFeg_1.js";import"./component-CenbG63M-440Cts9I.js";import"./component-DKGdMvJy-r2mF7SCj.js";import{a as d,i as f,n as p,o as m,r as h,t as g}from"./disclosure-IpIaACbK-C4RChyNA.js";import{n as _,r as v,t as y}from"./element-interaction-C5-6aPzz-CwUv4L8C.js";var b=`@charset "UTF-8";
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
    .kol-button:focus-visible,
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
  :host {
    display: block;
  }
}
/* For animation technique see https://css-tricks.com/css-grid-can-do-auto-height-transitions/ */
@layer kol-component {
  .collapsible {
    /* \`<details>\` is a block box by default; the predecessor root was a plain div. */
    display: block;
    /*
     * \`<summary>\` replaces the \`kol-button-wc\` the predecessor nested inside the heading, so it
     * has to carry the box that \`kol-button-styles\` used to contribute: the flex container, the
     * accessible minimum size and the baseline box.
     *
     * The native disclosure marker is replaced by the component's own chevron icon. A flex
     * \`<summary>\` is no longer a \`list-item\` and drops the marker on its own in current
     * browsers; \`list-style\` and the two pseudo-elements cover the rest.
     */
  }
  .collapsible__heading-button {
    display: flex;
    min-height: var(--a11y-min-size);
    cursor: pointer;
    list-style: none;
    text-decoration-line: none;
  }
  .collapsible__heading-button::-webkit-details-marker {
    display: none;
  }
  .collapsible__heading-button::marker {
    content: "";
  }
  .collapsible__heading-button {
    /* A flex container only exposes a baseline if it has an in-flow text box to derive one
       from; without it the surrounding inline formatting context falls back to the bottom
       margin edge and everything after the element shifts by a pixel. Same zero-width space
       as in \`kol-button-styles\`.
       It sits on the summary, not on the heading: here it inherits the host's typography,
       exactly as the \`<button>\` did. On the heading it would inherit the heading's instead,
       and a theme that enlarges headings would grow the whole row with it. */
  }
  .collapsible__heading-button::before {
    content: "​";
  }
  .collapsible {
    /* The heading moved inside the summary, so it is the flex item that has to fill the row —
       it used to be the block-level parent of the button and carried no margin of its own. */
  }
  .collapsible__heading-button > .kol-headline {
    display: flex;
    flex: 1;
    margin: 0;
    text-align: left;
    /* \`.kol-span\` was a flex item of the button's interactive element
       (\`.kol-button__text { flex: 1 0 100% }\`). As a plain inline box inside the heading it
       would sit in the heading's line box instead and shift the label by a pixel, so the
       heading takes over as the flex container. */
  }
  .collapsible__heading-button > .kol-headline > .kol-span {
    flex: 1 0 100%;
  }
  .collapsible__heading-button > .kol-headline {
    /* \`a11y.scss\` makes form controls inherit font-family and font-size but deliberately
       not font-weight, so the label used to render at the user agent's \`400\` inside the
       \`<button>\` even though an \`<h1>\`–\`<h6>\`/\`<strong>\` wrapped it. Themes that set a
       weight further in (on \`__container\` or \`__label\`) still win — and a theme that
       weights \`.kol-headline\` from its own layer has to restore this itself. */
    font-weight: 400;
  }
  .collapsible--disabled .collapsible__heading-button {
    cursor: default;
  }
  @media (prefers-reduced-motion) {
    .collapsible__wrapper-animation, .collapsible__wrapper {
      transition: none !important;
    }
  }
  .collapsible {
    /* @see https://github.com/public-ui/kolibri/issues/5952 */
  }
  @media print {
    :not(.collapsible--open) .collapsible__wrapper-animation {
      display: none;
    }
  }
  .collapsible__wrapper {
    /* Forces the element into its own GPU compositing layer (via 3D transform). Helps prevent rendering/layout bugs (e.g. #7511) and may improve animation performance. */
    transform: translateZ(0);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s;
  }
  .collapsible__wrapper-animation {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
    min-height: 0;
    /* This property is important to keep in sync with the visual transition (template-rows). Without it interactive elements within the accordion would stay focusable. */
    visibility: hidden;
    transition: transform 0.3s, opacity 0.3s, visibility 0.3s;
  }
  .collapsible--open .collapsible__wrapper {
    grid-template-rows: 1fr;
  }
  .collapsible--open .collapsible__wrapper-animation {
    opacity: 1;
    transform: scaleY(1);
    visibility: visible;
  }
  .collapsible {
    /*
          * The label used to sit inside a button, where the caption text is centered.
          * \`<summary>\` does not center it, but the alignment is kept so themes that relied
          * on it are unaffected.
          */
  }
  .collapsible__heading-button .kol-span {
    align-items: flex-start;
  }
  .collapsible__heading-button .kol-span__container {
    text-align: left;
  }
  .collapsible--open:focus-within {
    position: relative;
    z-index: 100;
  }
}
@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1789442808778"); /* IE9*/
  src: url("kolicons.eot?t=1789442808778#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1789442808778") format("woff2"), url("kolicons.woff?t=1789442808778") format("woff"), url("kolicons.ttf?t=1789442808778") format("truetype"), url("kolicons.svg?t=1789442808778#kolicons") format("svg"); /* iOS 4.1- */
}
@layer kol-component {
  [class^=kolicon-], [class*=" kolicon-"] {
    font-family: "kolicons";
    font-style: normal;
    font-weight: 400;
    line-height: 1em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .kolicon-alert-error::before {
    content: "\\ea01";
  }
  .kolicon-alert-info::before {
    content: "\\ea02";
  }
  .kolicon-alert-success::before {
    content: "\\ea03";
  }
  .kolicon-alert-warning::before {
    content: "\\ea04";
  }
  .kolicon-check::before {
    content: "\\ea05";
  }
  .kolicon-chevron-double-left::before {
    content: "\\ea06";
  }
  .kolicon-chevron-double-right::before {
    content: "\\ea07";
  }
  .kolicon-chevron-down::before {
    content: "\\ea08";
  }
  .kolicon-chevron-left::before {
    content: "\\ea09";
  }
  .kolicon-chevron-right::before {
    content: "\\ea0a";
  }
  .kolicon-chevron-up::before {
    content: "\\ea0b";
  }
  .kolicon-cogwheel::before {
    content: "\\ea0c";
  }
  .kolicon-cross::before {
    content: "\\ea0d";
  }
  .kolicon-eye-closed::before {
    content: "\\ea0e";
  }
  .kolicon-eye::before {
    content: "\\ea0f";
  }
  .kolicon-house::before {
    content: "\\ea10";
  }
  .kolicon-kolibri::before {
    content: "\\ea11";
  }
  .kolicon-link-external::before {
    content: "\\ea12";
  }
  .kolicon-link::before {
    content: "\\ea13";
  }
  .kolicon-minus::before {
    content: "\\ea14";
  }
  .kolicon-plus::before {
    content: "\\ea15";
  }
  .kolicon-settings::before {
    content: "\\ea16";
  }
  .kolicon-sort-asc::before {
    content: "\\ea17";
  }
  .kolicon-sort-desc::before {
    content: "\\ea18";
  }
  .kolicon-sort-neutral::before {
    content: "\\ea19";
  }
  .kolicon-up::before {
    content: "\\ea1a";
  }
  .kolicon-version::before {
    content: "\\ea1b";
  }
}
@layer kol-component {
  /* The button mixin is gone with the \`kol-button-wc\` the summary replaced; the box it used to
     contribute now lives in \`collapsible.mixin\`. It also emitted \`:host { display: inline-block }\`,
     which outweighed \`host-display-block\` for this component — kept explicitly so dropping the
     mixin stays a structural change and not a layout one. */
  :host {
    display: inline-block;
  }
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .collapsible--open .kol-details__heading-button .kol-icon {
    transform: rotate(90deg);
  }
}`,x=class extends o{constructor(e){super(),r(this,e),this.detailsId=i(`details`),this.ctaRef=y(),this.hasLoaded=!1,this.disclosure=f({setDetailsOpen:e=>this.detailsOpen=e,setExpanded:e=>this.expanded=e}),this.controlId=a(this.detailsId,`control`),this.detailsOpen=!1,this.expanded=!1,this.headingId=a(this.detailsId,`heading`),this.handleToggle=d({getHost:()=>this.host,getOn:()=>this.getRenderProp(`on`),isDisabled:()=>this.getRenderProp(`disabled`)===!0,isOpen:()=>this.getRenderProp(`open`)===!0,setOpen:e=>this._open=e}),this._disabled=!1,this._level=0,this._open=!1}componentWillLoad(){this.initRenderProps(h),this.watchDisabled(this._disabled),this.watchLabel(this._label),this.watchLevel(this._level),this.watchOn(this._on),this.watchOpen(this._open)}componentDidLoad(){this.hasLoaded=!0}disconnectedCallback(){this.disclosure.dispose()}async focus(e){}async click(){}render(){return t(n,{key:`a477ebb4fbd3f9bacf7b471e4e277fb863661c08`},t(g,{key:`e2344ac1313e9983278cad7120b0a5f325f5a910`,block:`kol-details`,contentClass:`indented-text`,controlId:this.controlId,detailsOpen:this.detailsOpen,disabled:this.getRenderProp(`disabled`),expanded:this.expanded,handleToggle:this.handleToggle,headingId:this.headingId,icons:`kolicon-chevron-right`,label:this.getRenderProp(`label`),level:this.getRenderProp(`level`),on:this.getRenderProp(`on`),open:this.getRenderProp(`open`),refHeadingButton:this.ctaRef},t(`slot`,{key:`6d7cda1a9d76bb5f60f11ac2e03eec3c784a27f1`})))}watchDisabled(e){l.apply(e,e=>this.setRenderProp(`disabled`,e))}watchLabel(e){u.apply(e,e=>this.setRenderProp(`label`,e))}watchLevel(e){c.apply(e,e=>this.setRenderProp(`level`,e))}watchOn(e){p.apply(e,e=>this.setRenderProp(`on`,e))}watchOpen(e){m.apply(e,e=>{this.setRenderProp(`open`,e),this.disclosure.syncOpen(e,this.hasLoaded)})}get host(){return e(this)}static get watchers(){return{_disabled:[`watchDisabled`],_label:[`watchLabel`],_level:[`watchLevel`],_on:[`watchOn`],_open:[`watchOpen`]}}};s([v(`ctaRef`)],x.prototype,`focus`,null),s([_(`ctaRef`)],x.prototype,`click`,null),x.style={default:b};export{x as kol_details};