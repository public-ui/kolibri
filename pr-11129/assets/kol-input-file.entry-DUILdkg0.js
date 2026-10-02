import{G as e,U as t,at as n,b as r,c as i,ct as a,et as o,h as s,l as c,lt as l,s as u,st as d,y as f}from"./index-BTk_Xa7x-Cqp5CHG4.js";import{n as p}from"./behavior-D3q8mlzI-C_w7RsVA.js";import{d as m,r as ee,t as h}from"./index-DqLu2dTO.js";import{n as g,t as _}from"./dev.utils-C9l4asDK-BdSU0STj.js";import{t as v}from"./base-web-component--IgFgz37-CZuvR3uB.js";import{n as y,t as b}from"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import{c as x}from"./variant-quote-8EE89Qmy-d3OxnDOm.js";import{i as S}from"./label-BRge7Tz4-Bp8PhVoL.js";import"./label-Dep-t7MH-Cid3wKjP.js";import{t as C}from"./clsx-COFh-Vc8-DWAop4cA.js";import"./Heading-sD5olybG-CP4Zop3U.js";import{n as te,r as ne,t as re}from"./element-interaction-DkGO5I_0-CYEJb_Yf.js";import"./block-bem-oAgQngkS-Z7QjDWsf.js";import{t as w}from"./component-CgjGFURO-DMmS8jyj.js";import{n as T,r as E}from"./component-BXJCtH7W-CDgPalLm.js";import{t as D}from"./i18n-DDasbRB2-CuR_qVO5.js";import{r as O}from"./component-Boezjtnf-BU8DbSNP.js";import"./component-Dj42dlOa-DnmzZPVM.js";import"./component-DF7TBM47-BXxCL6BT.js";import"./component-DUzOSjgZ-DvW8-36C.js";import"./component-Dw3FxVJK-BvUy8KlQ.js";import"./align-Iw-pSqEe-CYWX7nj7.js";import"./name-CJYChKz5-98EWH6GP.js";import{t as k}from"./access-and-short-key-ijzCZfHm-Dx5Q-CAn.js";import{n as A}from"./aria-labelledby-6-ki3akM-C6lJ0lQF.js";import{r as j,t as M}from"./behavior-DnFwQCdo-CLn7KYPO.js";import{a as N,s as P,t as F}from"./component-CdchxXRk-Bst1CjpJ.js";import{n as I}from"./default-input-props-DC1xN5zR-eCUXtPpv.js";import{i as L,t as R}from"./icon-button-Bf_No2ft-D1accPi0.js";import{t as z}from"./input-B95nVFq1-DteIHAM6.js";import{t as B}from"./input-container-DCDelTBd-Bmw_-try.js";import{t as V}from"./suggestions-D1KOWaeo-C4hH5NoI.js";import{t as H}from"./hide-label-DGuVwoaI-BvjH0ONR.js";import{t as U}from"./tooltip-align-B2F5GF4h-DeNb0b3h.js";var W=(e,t,n={})=>{a(e,`_accept`,t,n)},G=(e,t)=>{a(e,`_accessKey`,t)},K=(e,t)=>{n(e,`_adjustHeight`,t)},q=(e,t,n,r)=>{l(e,`_ariaDetails`,e=>typeof e==`string`||e===void 0,new Set([`string`]),r);let i=A(t,r);if(n){try{n.ariaDetailsElements=i}catch{}s.debug([`WebComponent internals`,n])}return i},J=(e,t)=>{n(e,`_disabled`,t,{hooks:{afterPatch:e=>{e===!0&&r()}}})},Y=(e,t,r)=>{n(e,`_hideMsg`,t,r)},X=(e,t)=>{a(e,`_hint`,t)},ie=(e,t,r)=>{n(e,`_multiple`,t,r)},ae=(e,t,n)=>{a(e,`_name`,t,n)},oe=(e,t)=>{n(e,`_required`,t)},se=(e,t)=>{a(e,`_shortKey`,t)},ce={hooks:{afterPatch:e=>{e!==-1&&e!==0&&f(`Don't Use Tabindex Greater than 0: https://adrianroselli.com/2014/11/dont-use-tabindex-greater-than-0.html`)}}},le=(e,t)=>{d(e,`_tabIndex`,t,ce)},ue=(e,t)=>{n(e,`_touched`,t)},Z=new Map,de=e=>{let t=Z.get(e);if(t)return t;let n=new p(v.stateLess);return n.componentWillLoad({label:``}),Z.set(e,n),n},fe=e=>{let t=Z.get(e);t&&(t.destroy(),Z.delete(e))},pe=(e,t)=>{let{id:n,label:r,hideLabel:a,renderNoTooltip:o,accessKey:s,shortKey:c,tooltipAlign:l}=e,u=y(e,[`id`,`label`,`hideLabel`,`renderNoTooltip`,`accessKey`,`shortKey`,`tooltipAlign`]),d=N({hideLabel:a,label:r,renderNoTooltip:o})?de(n):void 0;return d?(d.watchAlign(l),d.watchBadgeText(T(s,c)||``),d.watchId(_(n,`label`)),d.watchLabel(r)):fe(n),i(F,Object.assign({},u,{id:n,label:r,hideLabel:a,renderNoTooltip:o,accessKey:s,shortKey:c,tooltipAlign:l,refInput:e=>{d&&e&&(d.initContext(e),d.syncListeners(void 0,e,!0))},refTooltip:e=>{d?.setTooltipElementRef(e)}}),t)};function me(e,t){let n={id:e._id,disabled:e._disabled,msg:e._msg,hint:e._hint,label:e._label,hideLabel:e._hideLabel,hideMsg:e._hideMsg,touched:e._touched,showBadge:`_accessKey`in e&&!!e._accessKey||`_shortKey`in e&&!!e._shortKey};return`_required`in e&&(n.required=e._required),`_readOnly`in e&&(n.readOnly=e._readOnly),`_accessKey`in e&&(n.accessKey=e._accessKey),`_shortKey`in e&&(n.shortKey=e._shortKey),`_maxLength`in e&&(n.maxLength=e._maxLength),`_hasCounter`in e&&e._hasCounter===!0&&(n.counter=Object.assign({maxLength:`_maxLength`in e?e._maxLength:void 0,maxLengthBehavior:(`_maxLengthBehavior`in e?e._maxLengthBehavior:void 0)||`hard`},t)),`_variant`in e&&(n.variant=e._variant),n}var he=(e,t)=>{var{state:n,counterRefs:r}=e,a=y(e,[`state`,`counterRefs`]);let o=me(n,r);return i(pe,Object.assign({},o,a),t)},ge=R,_e=B;function ve(e){let t,n;return`_icons`in e&&(t=e._icons),`_smartButton`in e&&(n=e._smartButton),{icons:t,smartButton:n,disabled:e._disabled,msg:e._msg,touched:e._touched}}var ye=({state:e,startAdornment:t,endAdornment:n},r)=>{let{icons:a,smartButton:o,disabled:s,msg:c,touched:l}=ve(e),u=a?.left;E(u)&&(u={icon:u});let d=a?.right;E(d)&&(d={icon:d});let f=[],p=[];return t&&(Array.isArray(t)?f.push(...t):f.push(t)),u&&(x(u)?f.push(i(w,{class:`kol-input-container__icon`,icons:u.icon,label:u.label??``,style:u.style})):f.push(i(w,{class:`kol-input-container__icon`,icons:u,label:``}))),x(o)&&p.push(i(ge,Object.assign({componentName:`button`,class:`kol-input-container__smart-button`},o,{hideLabel:!0,disabled:s}))),d&&(x(d)?p.push(i(w,{class:`kol-input-container__icon`,icons:d.icon,label:d.label??``,style:d.style})):p.push(i(w,{class:`kol-input-container__icon`,icons:d,label:``}))),n&&(Array.isArray(n)?p.push(...n):p.push(n)),i(_e,{disabled:s,msg:c,touched:l,startAdornment:f,endAdornment:p},r)},be=z,xe=V,Q=e=>I({id:e._id,msg:e._msg,hint:e._hint,touched:e._touched,hideMsg:e._hideMsg});function Se(e,t,n){let r=Q(e),a=[...r.ariaDescribedBy,...t.ariaDescribedBy??[]],o={id:e._id,hideLabel:e._hideLabel,label:e._label,disabled:e._disabled,name:e._name};return`_accessKey`in e&&(o.accessKey=e._accessKey),`_type`in e&&(o.type=e._type),`_value`in e&&(o.value=e._value),`_required`in e&&(o.required=e._required),`_maxLength`in e&&`_maxLengthBehavior`in e&&e._maxLengthBehavior===`hard`&&(o.maxlength=e._maxLength),`_placeholder`in e&&(o.placeholder=e._placeholder),`_autoComplete`in e&&(o.autoComplete=e._autoComplete),`_spellCheck`in e&&(o.spellcheck=e._spellCheck),`_pattern`in e&&(o.pattern=e._pattern),`_readOnly`in e&&(o.readonly=e._readOnly),`_min`in e&&(o.min=e._min),`_max`in e&&(o.max=e._max),`_step`in e&&(o.step=e._step),`_multiple`in e&&(o.multiple=e._multiple),`_touched`in e&&(o.touched=e._touched),`_msg`in e&&(o.msg=e._msg),`_shortKey`in e&&(o[`aria-keyshortcuts`]=e._shortKey),`_suggestions`in e&&!n&&Array.isArray(e._suggestions)&&e._suggestions.length>0&&(o.suggestions=i(xe,{id:e._id,suggestions:e._suggestions})),Object.assign(Object.assign(Object.assign({},o),t),{ariaDescribedBy:a,"aria-invalid":r.hasError?`true`:void 0})}var Ce=e=>{var{state:t,customSuggestions:n}=e,r=y(e,[`state`,`customSuggestions`]);return i(be,Object.assign({},Se(t,r,n)))},we=class{constructor(e,t,n){this.setFormAssociatedValue=e=>{this.formAssociation.setFormAssociatedValue(e)},this.component=e,this.formAssociation=new M(v.stateLess,{host:n,type:t,name:e._name}),this.host=this.formAssociation.host}get internals(){return this.formAssociation.internals}get formAssociated(){return this.formAssociation.formAssociated}get syncToOwnInput(){return this.formAssociation.syncToOwnInput}validateName(e){ae(this.component,e,{hooks:{afterPatch:()=>{this.formAssociation.setNameAttribute(this.component.state._name)}}}),e===void 0&&j()}validateSyncValueBySelector(e){this.formAssociation.watchSyncValueBySelector(e)}validateAriaDetails(e){q(this.component,this.host,this.internals,e)}componentWillLoad(){this.validateName(this.component._name),this.validateSyncValueBySelector(this.component._syncValueBySelector)}},Te=class extends we{constructor(e,t,n){super(e,t,n),this.component=e}validateTouched(e){ue(this.component,e)}componentWillLoad(){super.componentWillLoad(),this.validateTouched(this.component._touched)}},Ee=class extends Te{constructor(e,t,n){super(e,t,n),this.valueChangeListeners=[],this.inputHasFocus=!1,this.onFacade={onBlur:this.onBlur.bind(this),onChange:this.onChange.bind(this),onClick:this.onClick.bind(this),onFocus:this.onFocus.bind(this),onInput:this.onInput.bind(this),onKeyDown:this.onKeyDown.bind(this)},this.component=e}validateAccessKey(e){G(this.component,e),k(e,this.component._shortKey)}validateAdjustHeight(e){K(this.component,e)}validateDisabled(e){J(this.component,e)}validateTooltipAlign(e){U(this.component,e)}validateHideMsg(e){Y(this.component,e,{hooks:{afterPatch:()=>{this.component.state._hideMsg&&f(`Property _hideMsg for inputs: Only use when the error message is shown outside of the input component.`)}}})}validateHideLabel(e){H(this.component,e,{hooks:{afterPatch:()=>{this.component.state._hideLabel&&f(`Property hide-label for inputs: Only use for exceptions like search inputs that are clearly identifiable by their context.`)}}})}validateHint(e){X(this.component,e)}validateLabel(e){S(this.component,e,{required:!0})}validateMsg(e){P(this.component,e)}validateOn(e){typeof e==`object`&&o(this.component,`_on`,e)}validateShortKey(e){se(this.component,e),k(this.component._accessKey,e)}validateSmartButton(n){t(n,()=>{try{n=e(n)}catch{}o(this.component,`_smartButton`,n)})}validateTabIndex(e){le(this.component,e)}validateVariant(e){O(this.component,e)}componentWillLoad(){super.componentWillLoad(),this.validateAccessKey(this.component._accessKey),this.validateAdjustHeight(this.component._adjustHeight),this.validateMsg(this.component._msg),this.validateDisabled(this.component._disabled),this.validateHideMsg(this.component._hideMsg),this.validateHideLabel(this.component._hideLabel),this.validateHint(this.component._hint),this.validateLabel(this.component._label),this.validateShortKey(this.component._shortKey),this.validateSmartButton(this.component._smartButton),this.validateOn(this.component._on),this.validateTabIndex(this.component._tabIndex),this.validateVariant(this.component._variant),k(this.component._accessKey,this.component._shortKey)}emitEvent(e,t){this.host&&ee(this.host,e,t)}onChange(e,t){e.stopPropagation(),t===void 0&&(t=e.target.value),this.emitEvent(h.change,t),typeof this.component._on?.onChange==`function`&&this.component._on.onChange(e,t),this.valueChangeListeners.forEach(e=>e(t))}onInput(e,t=!0,n){e.stopPropagation(),n===void 0&&(n=e.target.value),this.emitEvent(h.input,n),t&&this.setFormAssociatedValue(n),typeof this.component._on?.onInput==`function`&&this.component._on.onInput(e,n)}onClick(e){this.emitEvent(h.click),typeof this.component._on?.onClick==`function`&&this.component._on.onClick(e)}onFocus(e){this.inputHasFocus||=(this.emitEvent(h.focus),typeof this.component._on?.onFocus==`function`&&this.component._on.onFocus(e),!0)}onBlur(e){if(this.component._disabled)return;let t=(this.host?.shadowRoot||this.host)?.contains(e.relatedTarget)||this.host===e.relatedTarget;this.inputHasFocus&&!t&&(this.component._touched=!0,this.emitEvent(h.blur),typeof this.component._on?.onBlur==`function`&&this.component._on.onBlur(e),this.inputHasFocus=!1)}onKeyDown(e){this.emitEvent(h.keydown),typeof this.component._on?.onKeyDown==`function`&&this.component._on.onKeyDown(e)}addValueChangeListener(e){this.valueChangeListeners.push(e)}hasSoftCharacterLimit(){return typeof this.component.state._maxLength==`number`&&this.component.state._maxLengthBehavior===`soft`}hasCounter(){return this.component.state._hasCounter===!0}},De=class extends Ee{constructor(e,t,n){super(e,t,n),this.component=e}validateIcons(e){L(this.component,e)}componentWillLoad(){super.componentWillLoad(),this.validateIcons(this.component._icons)}},Oe=class extends De{constructor(e,t,n){super(e,t,n),this.component=e}validateAccept(e){W(this.component,e)}validateMultiple(e){ie(this.component,e)}validateRequired(e){oe(this.component,e)}componentWillLoad(){super.componentWillLoad(),this.validateAccept(this.component._accept),this.validateMultiple(this.component._multiple),this.validateRequired(this.component._required)}},ke=`@charset "UTF-8";
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
  :host {
    display: block;
  }
}
@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1790915645625"); /* IE9*/
  src: url("kolicons.eot?t=1790915645625#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1790915645625") format("woff2"), url("kolicons.woff?t=1790915645625") format("woff"), url("kolicons.ttf?t=1790915645625") format("truetype"), url("kolicons.svg?t=1790915645625#kolicons") format("svg"); /* iOS 4.1- */
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
  .kolicon-pin-pinned::before {
    content: "\\ea15";
  }
  .kolicon-pin-unpinned::before {
    content: "\\ea16";
  }
  .kolicon-plus::before {
    content: "\\ea17";
  }
  .kolicon-settings::before {
    content: "\\ea18";
  }
  .kolicon-sort-asc::before {
    content: "\\ea19";
  }
  .kolicon-sort-desc::before {
    content: "\\ea1a";
  }
  .kolicon-sort-neutral::before {
    content: "\\ea1b";
  }
  .kolicon-up::before {
    content: "\\ea1c";
  }
  .kolicon-version::before {
    content: "\\ea1d";
  }
}
@layer kol-component {
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-tooltip {
    display: contents;
  }
  .kol-tooltip__floating {
    opacity: 0;
    display: none;
    position: fixed;
    /* Avoid layout interference - see https://floating-ui.com/docs/computePosition */
    top: 0;
    left: 0;
    /* Can be used to specify the tooltip-width from the outside. Unset by default.  */
    width: var(--kol-tooltip-width, max-content);
    min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));
    max-width: 90vw;
    max-height: 90vh;
    animation-direction: normal;
    /* Can be used to specify the animation duration from the outside. 250ms by default. */
    animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
  }
  .kol-tooltip__floating.hide {
    animation-name: hideTooltip;
  }
  .kol-tooltip__floating.show {
    animation-name: showTooltip;
  }
  .kol-tooltip__arrow {
    transform: rotate(45deg);
    color: black;
    background-color: white;
    position: absolute;
    z-index: 999;
    width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));
    height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));
  }
  .kol-tooltip__content {
    color: black;
    background-color: white;
    position: relative;
    z-index: 1000;
  }
  @keyframes hideTooltip {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      display: none;
    }
  }
  @keyframes showTooltip {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
/*
 * Button styles for a skeleton block whose interactive element sits inside the BEM root:
 * \`kol-button\` renders \`<div class="kol-button"><button class="kol-button__interactive-element">\`,
 * \`kol-link\` renders \`<div class="kol-link"><a class="kol-link__interactive-element">\`.
 *
 * Overlaps with \`kol-button-wc-box-styles\` below: both target the block class itself and disagree
 * on \`display\` and \`text-align\`. A stylesheet that includes both therefore depends on order or
 * specificity — today that only happens where the caller nests one of them (e.g. \`_alert.mixin\`
 * nests this one under \`.kol-alert\`, which wins). Include only one per block unless the nesting
 * makes the winner explicit.
 */
/*
 * Minimal box replication for trees that do not include \`kol-button-styles\` but render
 * \`kol-button-wc\` (transitional light-DOM output). Before the skeleton migration the button
 * element itself carried the \`kol-button\` class, so the \`kol-global\` reset
 * (\`background\`, \`width\`, \`margin\`, \`padding\`, \`border\`) and the a11y layer \`min-height\`/
 * \`min-width\` applied to it, on top of the UA \`inline-block\`. The wrapper div now carries the
 * class but receives none of that automatically, so this mixin replicates the exact outer box,
 * while the inner \`kol-button__interactive-element\` degrades to a plain block container to avoid
 * the inline-level baseline gap the UA \`inline-block\` would add below it.
 *
 * Mutually exclusive with \`kol-button-styles\` above — see the collision note there.
 */
@layer kol-component {
  .kol-alert .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .kol-alert :host {
    display: inline-block;
  }
  .kol-alert .kol-button {
    display: flex;
    height: 100%;
    min-height: var(--a11y-min-size);
    text-decoration-line: none;
    /* The interactive element is the flex container positioning the text, so it carries the
       box the root element used to be. The UA default underline sits on that element too,
       so suppressing \`text-decoration\` on the wrapper alone is not enough. */
  }
  .kol-alert .kol-button__interactive-element {
    display: flex;
    flex: 1;
    text-align: left;
    text-decoration-line: none;
    /* A flex container only exposes a baseline if it has an in-flow text box to derive one
       from; without it the surrounding inline formatting context falls back to the bottom
       margin edge and everything after the element shifts by 1px. The zero-width space
       supplies that box. Measured, not assumed: removing it turns \`popover-button/inline\`
       and \`input-file/basic\` red against the develop baseline (the box grows 179→180px). */
  }
  .kol-alert .kol-button__interactive-element::before {
    content: "​";
  }
  .kol-alert .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-alert .kol-button {
    /* The tooltip wrapper holds only the absolutely positioned floating tooltip. In the legacy
       DOM it sat in a block flow and collapsed to zero height; as a flex/grid item it would
       stretch to the container height instead, adding phantom rows to the layout. */
  }
  .kol-alert .kol-button__tooltip {
    height: 0;
  }
  .kol-alert .kol-button--external-link > .kolicon-link-external::before {
    content: none;
  }
  .kol-alert .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {
    content: none;
  }
  .kol-alert {
    display: grid;
    grid-template-areas: "icon heading close" "icon content close";
    grid-template-columns: min-content 1fr min-content;
    grid-template-rows: min-content min-content;
  }
  .kol-alert__icon {
    grid-area: icon;
  }
  .kol-alert__heading {
    grid-area: heading;
  }
  .kol-alert__closer {
    /* Visible with forced colors */
    outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));
    grid-area: close;
  }
  .kol-alert__content {
    grid-area: content;
  }
  .kol-form-field .kol-popover-button {
    /*
     * The predecessor rendered this box as an unstyled (inline) custom element host; keep the
     * inline display so the flow layout around the embedded button stays unchanged.
     */
    display: inline;
  }
  .kol-form-field .kol-popover-button__popover {
    margin: 0;
    padding: 0;
    border: 0;
  }
  .kol-form-field .kol-popover-button--open .kol-button__tooltip {
    display: none;
  }
  .kol-form-field .kol-popover-button--inline {
    display: inline-block;
    /* The size exemption has to cover both the BEM root div and the inner interactive element:
       the a11y layer pins every \`button\` to 44×44, so the inner \`kol-button__interactive-element\`
       needs the override as well — the root alone used to be the button before the skeleton migration. */
  }
  .kol-form-field .kol-popover-button--inline .kol-button,
  .kol-form-field .kol-popover-button--inline .kol-button .kol-button__interactive-element {
    min-width: 0;
    min-height: 1em;
  }
  .kol-form-field .kol-popover {
    opacity: 0;
    transition: 0.2s ease-out opacity;
  }
  .kol-form-field .kol-popover-button--open .kol-popover-button__popover {
    opacity: 1;
  }
  .kol-form-field {
    display: grid;
  }
  .kol-form-field:not(.kol-form-field--disabled) .kol-form-field__label {
    cursor: pointer;
  }
  .kol-form-field__label {
    display: flex;
  }
  .kol-form-field__label-text {
    flex-flow: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .kol-form-field--required .kol-form-field__label-text:has(.kol-span__slot[hidden]) .kol-span__label::after,
  .kol-form-field--required .kol-form-field .kol-tooltip__content .kol-span__label::after {
    content: "*"/"";
  }
  .kol-input-container {
    background-color: transparent;
    display: grid;
    position: relative;
    width: 100%;
    min-width: var(--a11y-min-size);
    min-height: var(--a11y-min-size);
    align-items: center;
    grid-template-columns: 1fr;
  }
  .kol-input-container:has(> .kol-input-container__adornment--start) {
    grid-template-columns: auto 1fr auto;
  }
  .kol-input-container__container {
    position: relative;
    z-index: 1;
  }
  .kol-input-container__adornment {
    display: flex;
    align-items: center;
  }
  .kol-input-container__adornment .kol-icon {
    display: grid;
    place-items: center;
  }
  .kol-input {
    background-color: transparent;
    width: 100%;
    min-width: var(--a11y-min-size);
  }
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  :host {
    display: inline-block;
  }
  .kol-button {
    display: flex;
    height: 100%;
    min-height: var(--a11y-min-size);
    text-decoration-line: none;
    /* The interactive element is the flex container positioning the text, so it carries the
       box the root element used to be. The UA default underline sits on that element too,
       so suppressing \`text-decoration\` on the wrapper alone is not enough. */
  }
  .kol-button__interactive-element {
    display: flex;
    flex: 1;
    text-align: left;
    text-decoration-line: none;
    /* A flex container only exposes a baseline if it has an in-flow text box to derive one
       from; without it the surrounding inline formatting context falls back to the bottom
       margin edge and everything after the element shifts by 1px. The zero-width space
       supplies that box. Measured, not assumed: removing it turns \`popover-button/inline\`
       and \`input-file/basic\` red against the develop baseline (the box grows 179→180px). */
  }
  .kol-button__interactive-element::before {
    content: "​";
  }
  .kol-button__text {
    flex: 1 0 100%;
  }
  .kol-button {
    /* The tooltip wrapper holds only the absolutely positioned floating tooltip. In the legacy
       DOM it sat in a block flow and collapsed to zero height; as a flex/grid item it would
       stretch to the container height instead, adding phantom rows to the layout. */
  }
  .kol-button__tooltip {
    height: 0;
  }
  .kol-button--external-link > .kolicon-link-external::before {
    content: none;
  }
  .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {
    content: none;
  }
  .kol-input {
    opacity: 0;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .kol-input::-webkit-file-upload-button, .kol-input::file-selector-button {
    cursor: pointer;
  }
  .kol-input:disabled, .kol-input:disabled::-webkit-file-upload-button, .kol-input:disabled::file-selector-button {
    cursor: not-allowed;
    pointer-events: none;
  }
  .kol-input-container__container {
    display: flex;
    overflow: hidden;
    align-items: center;
  }
  .kol-input-container__filename {
    overflow: hidden;
    flex-grow: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .kol-input-container:has(> .kol-input-container__adornment--start):has(> .kol-input-container__adornment--end) {
    grid-template-columns: auto 1fr;
  }
}`,$=class{async getValue(){return this.ctaRef.el?.files}async focus(e){}async click(){}async reset(){this.controller.setFormAssociatedValue(``),this.filename=this.translateFilenameText,this.hasFileSelected=!1,this.ctaRef.el&&(this.ctaRef.el.value=``)}getFormFieldProps(){return{state:this.state,class:C(`kol-input-file`,`file`),tooltipAlign:this._tooltipAlign,alert:this.showAsAlert(),infoPopover:this._infoPopover}}getInputProps(){return Object.assign(Object.assign({ref:this.ctaRef,state:this.state,type:`file`,accept:this.state._accept,multiple:this.state._multiple},this.controller.onFacade),{onChange:this.onChange,onInput:this.onInput,onFocus:e=>{this.controller.onFacade.onFocus(e),this.inputHasFocus=!0},onBlur:e=>{this.controller.onFacade.onBlur(e),this.inputHasFocus=!1}})}render(){return i(he,Object.assign({key:`8a344efdf4f8c33204925e21a395e9f3ba90ded7`},this.getFormFieldProps()),i(ye,{key:`85b0ea94cb7b45c957fa5ba62b826a6a685476d3`,state:this.state},i(`span`,{key:`91e9bce99e988773b6d7b8e0e79f3a8e6ca6c4ee`,class:C(`kol-input-container__filename`,{"kol-input-container__filename--has-file":this.hasFileSelected})},this.filename),i(Ce,Object.assign({key:`cf15e11a04126a6a2bc8c16d4df1b0606a5dc841`},this.getInputProps())),i(m,{key:`a1c24bc41e3ddb22ef10c271e3e023e30f45475c`,class:`kol-input-container__button`,_label:this.translateDataBrowseText,_variant:`primary`,_disabled:this._disabled})))}constructor(e){c(this,e),this.ctaRef=re(),this.translateDataBrowseText=D(`kol-data-browse-text`),this.translateFilenameText=D(`kol-filename-text`),this._disabled=!1,this._hideMsg=!1,this._hideLabel=!1,this._hint=``,this._multiple=!1,this._required=!1,this._tooltipAlign=`top`,this._touched=!1,this.filename=this.translateFilenameText,this.hasFileSelected=!1,this.state={_hideMsg:!1,_id:g(`input-file`),_label:``},this.inputHasFocus=!1,this.isDisabled=()=>this._disabled===!0,this.onDragOver=e=>{var t;this.isDisabled()||(e.preventDefault(),(t=this.ctaRef.el?.parentElement?.parentElement)==null||t.classList.add(`kol-input-container--is-dragover`))},this.onDragLeave=()=>{var e;(e=this.ctaRef.el?.parentElement?.parentElement)==null||e.classList.remove(`kol-input-container--is-dragover`)},this.onDrop=e=>{var t;if(!this.isDisabled()&&(e.preventDefault(),this.ctaRef.el&&((t=this.ctaRef.el.parentElement?.parentElement)==null||t.classList.remove(`kol-input-container--is-dragover`),e.dataTransfer?.files.length))){let t=e.dataTransfer.files;this.ctaRef.el.files=t,this.filename=Array.from(t).map(e=>e.name).join(`, `),this.controller.setFormAssociatedValue(t),this.controller.onFacade.onChange(e,t),this.controller.onFacade.onInput(e,!1,t)}},this.onChange=e=>{if(this.ctaRef.el instanceof HTMLInputElement&&this.ctaRef.el.type===`file`){let t=this.ctaRef.el.files;this.hasFileSelected=!!t?.length,this.filename=t?.length?Array.from(t).map(e=>e.name).join(`, `):this.translateFilenameText,this.controller.onFacade.onChange(e,t),this.controller.setFormAssociatedValue(t)}},this.onInput=e=>{if(this.ctaRef.el instanceof HTMLInputElement&&this.ctaRef.el.type===`file`){let t=this.ctaRef.el.files;this.controller.onFacade.onInput(e,!1,t)}},this.controller=new Oe(this,`file`,this.host)}showAsAlert(){return!!this.state._touched&&!this.inputHasFocus}validateAccept(e){this.controller.validateAccept(e)}validateAccessKey(e){this.controller.validateAccessKey(e)}validateAriaDetails(e){this.controller.validateAriaDetails(e)}validateDisabled(e){this.controller.validateDisabled(e)}validateHideMsg(e){this.controller.validateHideMsg(e)}validateHideLabel(e){this.controller.validateHideLabel(e)}validateHint(e){this.controller.validateHint(e)}validateIcons(e){this.controller.validateIcons(e)}validateLabel(e){this.controller.validateLabel(e)}validateMsg(e){this.controller.validateMsg(e)}validateMultiple(e){this.controller.validateMultiple(e)}validateName(e){this.controller.validateName(e)}validateOn(e){this.controller.validateOn(e)}validateRequired(e){this.controller.validateRequired(e)}validateShortKey(e){this.controller.validateShortKey(e)}validateSmartButton(e){this.controller.validateSmartButton(e)}validateSyncValueBySelector(e){this.controller.validateSyncValueBySelector(e)}validateTouched(e){this.controller.validateTouched(e)}validateVariant(e){this.controller.validateVariant(e)}componentWillLoad(){this._touched=this._touched===!0,this.validateAriaDetails(this._ariaDetails),this.controller.componentWillLoad()}componentDidLoad(){let e=this.ctaRef.el?.parentElement?.parentElement;e?.addEventListener(`dragover`,this.onDragOver),e?.addEventListener(`dragleave`,this.onDragLeave),e?.addEventListener(`drop`,this.onDrop)}get host(){return u(this)}static get watchers(){return{_accept:[`validateAccept`],_accessKey:[`validateAccessKey`],_ariaDetails:[`validateAriaDetails`],_disabled:[`validateDisabled`],_hideMsg:[`validateHideMsg`],_hideLabel:[`validateHideLabel`],_hint:[`validateHint`],_icons:[`validateIcons`],_label:[`validateLabel`],_msg:[`validateMsg`],_multiple:[`validateMultiple`],_name:[`validateName`],_on:[`validateOn`],_required:[`validateRequired`],_shortKey:[`validateShortKey`],_smartButton:[`validateSmartButton`],_syncValueBySelector:[`validateSyncValueBySelector`],_touched:[`validateTouched`],_variant:[`validateVariant`]}}};b([ne(`ctaRef`)],$.prototype,`focus`,null),b([te(`ctaRef`)],$.prototype,`click`,null),$.style={default:ke};export{$ as kol_input_file};