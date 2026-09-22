import{o as e,r as t,s as n}from"./index-C-CiPBDH.js";import{t as r}from"./base-web-component--IgFgz37-CZuvR3uB.js";import"./label-DxrksC9L-CyFw-z4A.js";import"./_Uint8Array-CuELS0_2-BYXN1zbF.js";import{n as i,u as a}from"./normalizers-DEevvNbZ-BYR5tdE6.js";import{t as o}from"./component-CmFzOwYm-B-ppV_H5.js";import{t as s}from"./label-De6GKT_4-B3yIRt_e.js";import"./variant-quote-JfuelQ4I-WipqRluF.js";var c=i(`icons`,`kolicon-logo`,a),l={required:[c,s]},u=`@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1789739495784"); /* IE9*/
  src: url("kolicons.eot?t=1789739495784#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1789739495784") format("woff2"), url("kolicons.woff?t=1789739495784") format("woff"), url("kolicons.ttf?t=1789739495784") format("truetype"), url("kolicons.svg?t=1789739495784#kolicons") format("svg"); /* iOS 4.1- */
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
}`,d=class extends r{constructor(e){super(),n(this,e)}watchIcons(e){c.apply(e,e=>this.setRenderProp(`icons`,e))}watchLabel(e){s.apply(e,e=>this.setRenderProp(`label`,e))}componentWillLoad(){this.initRenderProps(l),c.apply(this._icons,e=>this.setRenderProp(`icons`,e)),s.apply(this._label,e=>this.setRenderProp(`label`,e))}render(){return e(t,{key:`e9b3f6e09765874bf8c9ae3f0db45d4e24bf1c75`},e(o,{key:`feddea1bcc651df047a9be1062f813df0dfaa4f7`,icons:this.getRenderProp(`icons`),label:this.getRenderProp(`label`)}))}static get watchers(){return{_icons:[`watchIcons`],_label:[`watchLabel`]}}};d.style={default:u};export{d as kol_icon};