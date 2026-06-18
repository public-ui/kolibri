import{o as e,r as t,s as n}from"./index-C8_mMPfY.js";import"./isArray-CcrBs4JM-DiEJ1b3e.js";import"./_Uint8Array-kJHDjtoP-CTkgs_0o.js";import{n as r,o as i}from"./normalizers-B5NKuJgN-BqofC-35.js";import{t as a}from"./label-BT-6lb8r-C6iAixqW.js";import{t as o}from"./base-web-component-CArCAUxk-BnppPtgS.js";import{t as s}from"./base-controller-CXhqh4cR-BNzx0WwK.js";import"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import"./clsx-COFh-Vc8-alQuJLqj.js";import{t as c}from"./component--kVItxH9-CxkDdg1m.js";var l=r(`icons`,`kolicon-logo`,i),u={required:[l,a]},d=class extends s{constructor(e){super(e,u)}componentWillLoad(e){let{icons:t,label:n}=e;this.watchIcons(t),this.watchLabel(n)}watchIcons(e){l.apply(e,e=>{this.setRenderProp(`icons`,e)})}watchLabel(e){a.apply(e,e=>{this.setRenderProp(`label`,e)})}},f=`@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1781806771745"); /* IE9*/
  src: url("kolicons.eot?t=1781806771745#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1781806771745") format("woff2"), url("kolicons.woff?t=1781806771745") format("woff"), url("kolicons.ttf?t=1781806771745") format("truetype"), url("kolicons.svg?t=1781806771745#kolicons") format("svg"); /* iOS 4.1- */
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
  .kol-icon {
    color: inherit;
    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
}`,p=class{constructor(e){n(this,e),this.ctrl=new d(o.stateLess)}watchIcons(e){this.ctrl.watchIcons(e)}watchLabel(e){this.ctrl.watchLabel(e)}componentWillLoad(){this.ctrl.componentWillLoad({icons:this._icons,label:this._label})}render(){return e(t,{key:`af39984255995f183c5dce6bc5a6433b84940131`},e(c,{key:`1a03c1c01121ec2cc03ade18bc299a00bee5f0cd`,icons:this.ctrl.getRenderProp(`icons`),label:this.ctrl.getRenderProp(`label`)}))}static get watchers(){return{_icons:[`watchIcons`],_label:[`watchLabel`]}}};p.style={default:f};export{p as kol_icon};