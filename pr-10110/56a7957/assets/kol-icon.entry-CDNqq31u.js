import{o as e,r as t,s as n}from"./index-C0OvazWw.js";import{c as r,r as i}from"./normalizers-BZrXYlGW-DLPC_Qmg.js";import{t as a}from"./label-CSEcI_DU-CBXFmicx.js";import{t as o}from"./base-controller-4nyun1vN-C_I3DDll.js";import{t as s}from"./base-web-component-BT6jbe_v-Vp21XLG3.js";import"./tslib.es6-QNbPBOk5-DpzS01Oy.js";import"./clsx-COFh-Vc8-alQuJLqj.js";import{t as c}from"./component-BKvFZabC-D9EF8tnz.js";var l=i(`icons`,`kolicon-logo`,r),u={required:[l,a]},d=class extends o{constructor(e){super(e,u)}componentWillLoad(e){let{icons:t,label:n}=e;this.watchIcons(t),this.watchLabel(n)}watchIcons(e){l.apply(e,e=>{this.setRenderProp(`icons`,e)})}watchLabel(e){a.apply(e,e=>{this.setRenderProp(`label`,e)})}},f=`@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1782804012437"); /* IE9*/
  src: url("kolicons.eot?t=1782804012437#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1782804012437") format("woff2"), url("kolicons.woff?t=1782804012437") format("woff"), url("kolicons.ttf?t=1782804012437") format("truetype"), url("kolicons.svg?t=1782804012437#kolicons") format("svg"); /* iOS 4.1- */
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
}`,p=class{constructor(e){n(this,e),this.ctrl=new d(s.stateLess)}watchIcons(e){this.ctrl.watchIcons(e)}watchLabel(e){this.ctrl.watchLabel(e)}componentWillLoad(){this.ctrl.componentWillLoad({icons:this._icons,label:this._label})}render(){return e(t,{key:`efd5a3145837ea5fcd7c0dca8a9b6c9df9c2d2fb`},e(c,{key:`fa086c2bfc59330085280cbca84b81a679d203a2`,icons:this.ctrl.getRenderProp(`icons`),label:this.ctrl.getRenderProp(`label`)}))}static get watchers(){return{_icons:[`watchIcons`],_label:[`watchLabel`]}}};p.style={default:f};export{p as kol_icon};