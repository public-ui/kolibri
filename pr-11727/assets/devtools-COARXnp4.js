import{a as e,c as t,d as n,f as r,g as i,h as a,i as o,l as s,m as c,n as l,o as u,p as d,r as f,s as p,t as m,u as h}from"./index-CaCqKfAb.js";function g(t,n){try{Object.defineProperty((()=>{let e=o().KoliBri;return e===void 0&&(e={},Object.defineProperty(o(),"KoliBri",{value:e,writable:!1})),e})(),t,{get:function(){return n}})}catch{e.debug(`KoliBri property ${t} is already bind.`)}}var _=(t,n)=>e.debug(`${t} ${n?``:`not `}activated`),v=()=>{if(l(),n()&&(m(),g(`a11yColorContrast`,p),g(`querySelector`,s),g(`querySelectorAll`,a),g(`querySelectorColors`,r),g(`utils`,(function(){return t})),g(`parseJson`,d),g(`stringifyJson`,h),_(`Development mode`,n()),_(`Experimental mode`,c()),_(`Color contrast analysis`,u()),setTimeout((()=>{try{let e=f(),t=e?.body;if(e&&t&&typeof e.createElement==`function`){let n=e.createElement(i(`svg`));n.setAttribute(`aria-label`,`KoliBri-DevTools`),n.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),n.setAttribute(`role`,`toolbar`),n.setAttribute(`style`,`position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;`),n.innerHTML=`<svg
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
</svg>`,t.appendChild(n)}}catch(t){e.debug([`Could not initialize DevTools UI (likely in SSR/test environment):`,t])}}),100),u())){let n=setTimeout((()=>{clearTimeout(n);try{let e=f(),n=e?.body;e&&n&&typeof e.createElement==`function`&&setInterval((()=>{t.queryHtmlElementColors(e.createElement(i(`div`)),p(n),!1,!1)}),1e4)}catch(t){e.debug([`Could not initialize color contrast analysis:`,t])}}),2500)}};export{v as initialize};