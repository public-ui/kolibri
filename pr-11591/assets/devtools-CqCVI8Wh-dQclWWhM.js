import{A as e,D as t,H as n,N as r,O as i,S as a,a as o,b as s,g as c,i as l,k as u,v as d,y as f}from"./common-DNea1CxM-itfUmR_N.js";import{a as p,r as m}from"./dev.utils-Bg6A16WE-CQLP3pmJ.js";var h=()=>{let e=s().KoliBri;return e===void 0&&(e={},Object.defineProperty(s(),"KoliBri",{value:e,writable:!1})),e};function g(e,t){try{Object.defineProperty(h(),e,{get:function(){return t}})}catch{o.debug(`KoliBri property ${e} is already bind.`)}}var _=(e,t)=>o.debug(`${e} ${t?``:`not `}activated`),v=()=>{if(m(),a()&&(p(),g(`a11yColorContrast`,t),g(`querySelector`,i),g(`querySelectorAll`,u),g(`querySelectorColors`,e),g(`utils`,function(){return l}),g(`parseJson`,r),g(`stringifyJson`,n),_(`Development mode`,a()),_(`Experimental mode`,f()),_(`Color contrast analysis`,c()),setTimeout(()=>{try{let e=d(),t=e?.body;if(e&&t&&typeof e.createElement==`function`){let n=e.createElement(`svg`);n.setAttribute(`aria-label`,`KoliBri-DevTools`),n.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),n.setAttribute(`role`,`toolbar`),n.setAttribute(`style`,`position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;`),n.innerHTML=`<svg
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
</svg>`,t.appendChild(n)}}catch(e){o.debug([`Could not initialize DevTools UI (likely in SSR/test environment):`,e])}},100),c())){let e=setTimeout(()=>{clearTimeout(e);try{let e=d(),n=e?.body;e&&n&&typeof e.createElement==`function`&&setInterval(()=>{l.queryHtmlElementColors(e.createElement(`div`),t(n),!1,!1)},1e4)}catch(e){o.debug([`Could not initialize color contrast analysis:`,e])}},2500)}};export{v as initialize};