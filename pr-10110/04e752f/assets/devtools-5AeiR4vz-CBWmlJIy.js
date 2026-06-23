import{$ as e,B as t,Q as n,X as r,ct as i,et as a,lt as o,nt as s,pt as c,st as l,ut as u,xt as d,z as f}from"./index-BlBPbof5.js";import{a as p,r as m}from"./dev.utils--sxWcqPK-CIJUe8Xl.js";var h=()=>{let e=a().KoliBri;return e===void 0&&(e={},Object.defineProperty(a(),"KoliBri",{value:e,writable:!1})),e};function g(e,n){try{Object.defineProperty(h(),e,{get:function(){return n}})}catch{t.debug(`KoliBri property ${e} is already bind.`)}}var _=(e,n)=>t.debug(`${e} ${n?``:`not `}activated`),v=()=>{if(m(),s()&&(p(),g(`a11yColorContrast`,l),g(`querySelector`,i),g(`querySelectorAll`,o),g(`querySelectorColors`,u),g(`utils`,function(){return f}),g(`parseJson`,c),g(`stringifyJson`,d),_(`Development mode`,s()),_(`Experimental mode`,e()),_(`Color contrast analysis`,r()),setTimeout(()=>{try{let e=n(),t=e?.body;if(e&&t&&typeof e.createElement==`function`){let n=e.createElement(`svg`);n.setAttribute(`aria-label`,`KoliBri-DevTools`),n.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),n.setAttribute(`role`,`toolbar`),n.setAttribute(`style`,`position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;`),n.innerHTML=`<svg
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
</svg>`,t.appendChild(n)}}catch(e){t.debug([`Could not initialize DevTools UI (likely in SSR/test environment):`,e])}},100),r())){let e=setTimeout(()=>{clearTimeout(e);try{let e=n(),t=e?.body;e&&t&&typeof e.createElement==`function`&&setInterval(()=>{f.queryHtmlElementColors(e.createElement(`div`),l(t),!1,!1)},1e4)}catch(e){t.debug([`Could not initialize color contrast analysis:`,e])}},2500)}};export{v as initialize};