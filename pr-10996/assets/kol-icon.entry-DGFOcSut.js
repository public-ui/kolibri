import{o as e,r as t,s as n}from"./index-B17M4jfV.js";import{t as r}from"./base-web-component--IgFgz37-CZuvR3uB.js";import{h as i,i as a}from"./factory-BzFtzYNQ-BDt8p9uY.js";import"./label-BJf95S0B-vGq1tv7E.js";import{t as o}from"./label-P4YO9nHc-B8ZLftSs.js";import"./variant-quote-Cpb7i7xZ-D_rNmaNU.js";import{t as s}from"./component-CDTVZl9D-BG_m_KvL.js";var c=a(`icons`,`kolicon-logo`,i),l={required:[c,o]},u=`@font-face {
  font-family: "kolicons";
  src: url("kolicons.eot?t=1790215877211"); /* IE9*/
  src: url("kolicons.eot?t=1790215877211#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1790215877211") format("woff2"), url("kolicons.woff?t=1790215877211") format("woff"), url("kolicons.ttf?t=1790215877211") format("truetype"), url("kolicons.svg?t=1790215877211#kolicons") format("svg"); /* iOS 4.1- */
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
}`,d=class extends r{constructor(e){super(),n(this,e)}watchIcons(e){c.apply(e,e=>this.setRenderProp(`icons`,e))}watchLabel(e){o.apply(e,e=>this.setRenderProp(`label`,e))}componentWillLoad(){this.initRenderProps(l),c.apply(this._icons,e=>this.setRenderProp(`icons`,e)),o.apply(this._label,e=>this.setRenderProp(`label`,e))}render(){return e(t,{key:`e9b3f6e09765874bf8c9ae3f0db45d4e24bf1c75`},e(s,{key:`feddea1bcc651df047a9be1062f813df0dfaa4f7`,icons:this.getRenderProp(`icons`),label:this.getRenderProp(`label`)}))}static get watchers(){return{_icons:[`watchIcons`],_label:[`watchLabel`]}}};d.style={default:u};export{d as kol_icon};