import{$ as e,F as t,I as n,X as r,Y as i,Z as a,at as o,it as s,ot as c,q as l,st as u,ut as d,vt as f}from"./index-B8CLGIlf.js";import{a as p,r as m}from"./dev.utils-DEzQ6pd0-BV_e1MmD.js";var h=()=>{let e=a().KoliBri;return e===void 0&&(e={},Object.defineProperty(a(),"KoliBri",{value:e,writable:!1})),e};function g(e,t){try{Object.defineProperty(h(),e,{get:function(){return t}})}catch{n.debug(`KoliBri property ${e} is already bind.`)}}var _=(e,t)=>n.debug(`${e} ${t?``:`not `}activated`),v=()=>{if(m(),e()&&(p(),g(`a11yColorContrast`,s),g(`querySelector`,o),g(`querySelectorAll`,c),g(`querySelectorColors`,u),g(`utils`,function(){return t}),g(`parseJson`,d),g(`stringifyJson`,f),_(`Development mode`,e()),_(`Experimental mode`,r()),_(`Color contrast analysis`,l()),setTimeout(()=>{try{let e=i(),t=e?.body;if(e&&t&&typeof e.createElement==`function`){let n=e.createElement(`svg`);n.setAttribute(`aria-label`,`KoliBri-DevTools`),n.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),n.setAttribute(`role`,`toolbar`),n.setAttribute(`style`,`position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;`),n.innerHTML=`<svg
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
</svg>`,t.appendChild(n)}}catch(e){n.debug([`Could not initialize DevTools UI (likely in SSR/test environment):`,e])}},100),l())){let e=setTimeout(()=>{clearTimeout(e);try{let e=i(),n=e?.body;e&&n&&typeof e.createElement==`function`&&setInterval(()=>{t.queryHtmlElementColors(e.createElement(`div`),s(n),!1,!1)},1e4)}catch(e){n.debug([`Could not initialize color contrast analysis:`,e])}},2500)}};export{v as initialize};