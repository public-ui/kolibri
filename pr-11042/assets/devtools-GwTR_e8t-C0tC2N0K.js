import{$ as e,A as t,B as n,E as r,L as i,M as a,O as o,R as s,U as c,k as l,m as u,p as d,z as f}from"./index-CzVsFXc1-CyJRexvm.js";import{a as p,r as m}from"./dev.utils-DapS9xiO-Dhbjk9cz.js";var h=()=>{let e=t().KoliBri;return e===void 0&&(e={},Object.defineProperty(t(),"KoliBri",{value:e,writable:!1})),e};function g(e,t){try{Object.defineProperty(h(),e,{get:function(){return t}})}catch{u.debug(`KoliBri property ${e} is already bind.`)}}var _=(e,t)=>u.debug(`${e} ${t?``:`not `}activated`),v=()=>{if(m(),a()&&(p(),g(`a11yColorContrast`,i),g(`querySelector`,s),g(`querySelectorAll`,f),g(`querySelectorColors`,n),g(`utils`,function(){return d}),g(`parseJson`,c),g(`stringifyJson`,e),_(`Development mode`,a()),_(`Experimental mode`,l()),_(`Color contrast analysis`,r()),setTimeout(()=>{try{let e=o(),t=e?.body;if(e&&t&&typeof e.createElement==`function`){let n=e.createElement(`svg`);n.setAttribute(`aria-label`,`KoliBri-DevTools`),n.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),n.setAttribute(`role`,`toolbar`),n.setAttribute(`style`,`position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;`),n.innerHTML=`<svg
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
</svg>`,t.appendChild(n)}}catch(e){u.debug([`Could not initialize DevTools UI (likely in SSR/test environment):`,e])}},100),r())){let e=setTimeout(()=>{clearTimeout(e);try{let e=o(),t=e?.body;e&&t&&typeof e.createElement==`function`&&setInterval(()=>{d.queryHtmlElementColors(e.createElement(`div`),i(t),!1,!1)},1e4)}catch(e){u.debug([`Could not initialize color contrast analysis:`,e])}},2500)}};export{v as initialize};