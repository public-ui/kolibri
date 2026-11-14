import{a as e,c as t,d as n,f as r,g as i,h as a,i as o,l as s,m as c,n as l,o as u,p as d,r as f,s as p,t as m,u as h}from"./index-DytbkHKX.js";function g(e,t){try{Object.defineProperty((()=>{let e=u().KoliBri;return e===void 0&&(e={},Object.defineProperty(u(),"KoliBri",{value:e,writable:!1})),e})(),e,{get:function(){return t}})}catch{s.debug(`KoliBri property ${e} is already bind.`)}}var _=(e,t)=>s.debug(`${e} ${t?``:`not `}activated`),v=()=>{if(l(),d()&&(m(),g(`a11yColorContrast`,n),g(`querySelector`,a),g(`querySelectorAll`,r),g(`querySelectorColors`,c),g(`utils`,(function(){return t})),g(`parseJson`,e),g(`stringifyJson`,o),_(`Development mode`,d()),_(`Experimental mode`,h()),_(`Color contrast analysis`,p()),setTimeout((()=>{try{let e=f(),t=e?.body;if(e&&t&&typeof e.createElement==`function`){let n=e.createElement(i(`svg`));n.setAttribute(`aria-label`,`KoliBri-DevTools`),n.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),n.setAttribute(`role`,`toolbar`),n.setAttribute(`style`,`position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;`),n.innerHTML=`<svg
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
</svg>`,t.appendChild(n)}}catch(e){s.debug([`Could not initialize DevTools UI (likely in SSR/test environment):`,e])}}),100),p())){let e=setTimeout((()=>{clearTimeout(e);try{let e=f(),r=e?.body;e&&r&&typeof e.createElement==`function`&&setInterval((()=>{t.queryHtmlElementColors(e.createElement(i(`div`)),n(r),!1,!1)}),1e4)}catch(e){s.debug([`Could not initialize color contrast analysis:`,e])}}),2500)}};export{v as initialize};