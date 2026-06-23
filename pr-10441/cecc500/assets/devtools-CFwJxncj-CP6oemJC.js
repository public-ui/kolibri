import{$ as e,B as t,V as n,Z as r,ct as i,dt as a,et as o,gt as s,lt as c,rt as l,tt as u,ut as d,wt as f}from"./index-BmNh9iTC.js";import{a as p,r as m}from"./dev.utils-W9Q9EkQD-SYZCxUeY.js";var h=()=>{let e=u().KoliBri;return e===void 0&&(e={},Object.defineProperty(u(),"KoliBri",{value:e,writable:!1})),e};function g(e,t){try{Object.defineProperty(h(),e,{get:function(){return t}})}catch{n.debug(`KoliBri property ${e} is already bind.`)}}var _=(e,t)=>n.debug(`${e} ${t?``:`not `}activated`),v=()=>{if(m(),l()&&(p(),g(`a11yColorContrast`,i),g(`querySelector`,c),g(`querySelectorAll`,d),g(`querySelectorColors`,a),g(`utils`,function(){return t}),g(`parseJson`,s),g(`stringifyJson`,f),_(`Development mode`,l()),_(`Experimental mode`,o()),_(`Color contrast analysis`,r()),setTimeout(()=>{try{let t=e(),n=t?.body;if(t&&n&&typeof t.createElement==`function`){let e=t.createElement(`svg`);e.setAttribute(`aria-label`,`KoliBri-DevTools`),e.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),e.setAttribute(`role`,`toolbar`),e.setAttribute(`style`,`position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;`),e.innerHTML=`<svg
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
</svg>`,n.appendChild(e)}}catch(e){n.debug([`Could not initialize DevTools UI (likely in SSR/test environment):`,e])}},100),r())){let r=setTimeout(()=>{clearTimeout(r);try{let n=e(),r=n?.body;n&&r&&typeof n.createElement==`function`&&setInterval(()=>{t.queryHtmlElementColors(n.createElement(`div`),i(r),!1,!1)},1e4)}catch(e){n.debug([`Could not initialize color contrast analysis:`,e])}},2500)}};export{v as initialize};