import{$ as e,L as t,Q as n,R as r,Y as i,Z as a,bt as o,ct as s,ft as c,lt as l,ot as u,st as d,tt as f}from"./index-B4F1xHEp.js";import{a as p,r as m}from"./dev.utils-DIu7_VyB-CgOzmmGN.js";var h=()=>{let t=e().KoliBri;return t===void 0&&(t={},Object.defineProperty(e(),"KoliBri",{value:t,writable:!1})),t};function g(e,t){try{Object.defineProperty(h(),e,{get:function(){return t}})}catch{r.debug(`KoliBri property ${e} is already bind.`)}}var _=(e,t)=>r.debug(`${e} ${t?``:`not `}activated`),v=()=>{if(m(),f()&&(p(),g(`a11yColorContrast`,u),g(`querySelector`,d),g(`querySelectorAll`,s),g(`querySelectorColors`,l),g(`utils`,function(){return t}),g(`parseJson`,c),g(`stringifyJson`,o),_(`Development mode`,f()),_(`Experimental mode`,n()),_(`Color contrast analysis`,i()),setTimeout(()=>{try{let e=a(),t=e?.body;if(e&&t&&typeof e.createElement==`function`){let n=e.createElement(`svg`);n.setAttribute(`aria-label`,`KoliBri-DevTools`),n.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),n.setAttribute(`role`,`toolbar`),n.setAttribute(`style`,`position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;`),n.innerHTML=`<svg
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
</svg>`,t.appendChild(n)}}catch(e){r.debug([`Could not initialize DevTools UI (likely in SSR/test environment):`,e])}},100),i())){let e=setTimeout(()=>{clearTimeout(e);try{let e=a(),n=e?.body;e&&n&&typeof e.createElement==`function`&&setInterval(()=>{t.queryHtmlElementColors(e.createElement(`div`),u(n),!1,!1)},1e4)}catch(e){r.debug([`Could not initialize color contrast analysis:`,e])}},2500)}};export{v as initialize};