import{$ as e,C as t,F as n,G as r,H as i,I as a,L as o,M as s,P as c,S as l,U as u,W as d,q as f,t as p}from"./index-Dp687ss5.js";import{a as m,o as h,r as g}from"./dev.utils-CsFQ-32M-xUbQHzSE.js";var _=()=>{let e=a().KoliBri;return e===void 0&&(e={},Object.defineProperty(a(),"KoliBri",{value:e,writable:!1})),e};function v(e,n){try{Object.defineProperty(_(),e,{get:function(){return n}})}catch{t.debug(`KoliBri property ${e} is already bind.`)}}var y=(e,n)=>t.debug(`${e} ${n?``:`not `}activated`),b=()=>{if(h(p.kolibriVersion),g(),o()&&(m(),v(`a11yColorContrast`,i),v(`querySelector`,u),v(`querySelectorAll`,d),v(`querySelectorColors`,r),v(`utils`,function(){return l}),v(`parseJson`,f),v(`stringifyJson`,e),y(`Development mode`,o()),y(`Experimental mode`,n()),y(`Color contrast analysis`,s()),setTimeout(()=>{try{let e=c(),t=e?.body;if(e&&t&&typeof e.createElement==`function`){let n=e.createElement(`svg`);n.setAttribute(`aria-label`,`KoliBri-DevTools`),n.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),n.setAttribute(`role`,`toolbar`),n.setAttribute(`style`,`position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;`),n.innerHTML=`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="50"
  height="50"
  viewBox="0 0 600 600"
>
  <path d="M353 322L213 304V434L353 322Z" fill="#047" />
  <path d="M209 564V304L149 434L209 564Z" fill="#047" />
  <path d="M357 316L417 250L361 210L275 244L357 316Z" fill="#047" />
  <path d="M353 318L35 36L213 300L353 318Z" fill="#047" />
  <path d="M329 218L237 92L250 222L272 241L329 218Z" fill="#047" />
  <path d="M391 286L565 272L421 252L391 286Z" fill="#047" />
</svg>`,t.appendChild(n)}}catch(e){t.debug([`Could not initialize DevTools UI (likely in SSR/test environment):`,e])}},100),s())){let e=setTimeout(()=>{clearTimeout(e);try{let e=c(),t=e?.body;e&&t&&typeof e.createElement==`function`&&setInterval(()=>{l.queryHtmlElementColors(e.createElement(`div`),i(t),!1,!1)},1e4)}catch(e){t.debug([`Could not initialize color contrast analysis:`,e])}},2500)}};export{b as initialize};