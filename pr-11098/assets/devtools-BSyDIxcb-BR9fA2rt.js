import{A as e,B as t,G as n,H as r,M as i,O as a,P as o,V as s,h as c,j as l,m as u,tt as d,z as f}from"./index-CNT2K9Es-n5DdRaiE.js";import{a as p,r as m}from"./dev.utils-CJuHqJK7-D_hxupM2.js";var h=()=>{let e=i().KoliBri;return e===void 0&&(e={},Object.defineProperty(i(),"KoliBri",{value:e,writable:!1})),e};function g(e,t){try{Object.defineProperty(h(),e,{get:function(){return t}})}catch{c.debug(`KoliBri property ${e} is already bind.`)}}var _=(e,t)=>c.debug(`${e} ${t?``:`not `}activated`),v=()=>{if(m(),o()&&(p(),g(`a11yColorContrast`,f),g(`querySelector`,t),g(`querySelectorAll`,s),g(`querySelectorColors`,r),g(`utils`,function(){return u}),g(`parseJson`,n),g(`stringifyJson`,d),_(`Development mode`,o()),_(`Experimental mode`,l()),_(`Color contrast analysis`,a()),setTimeout(()=>{try{let t=e(),n=t?.body;if(t&&n&&typeof t.createElement==`function`){let e=t.createElement(`svg`);e.setAttribute(`aria-label`,`KoliBri-DevTools`),e.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),e.setAttribute(`role`,`toolbar`),e.setAttribute(`style`,`position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;`),e.innerHTML=`<svg
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
</svg>`,n.appendChild(e)}}catch(e){c.debug([`Could not initialize DevTools UI (likely in SSR/test environment):`,e])}},100),a())){let t=setTimeout(()=>{clearTimeout(t);try{let t=e(),n=t?.body;t&&n&&typeof t.createElement==`function`&&setInterval(()=>{u.queryHtmlElementColors(t.createElement(`div`),f(n),!1,!1)},1e4)}catch(e){c.debug([`Could not initialize color contrast analysis:`,e])}},2500)}};export{v as initialize};