import{$ as e,B as t,C as n,E as r,F as i,I as a,L as o,P as s,Q as c,T as l,c as u,k as d,s as f,x as p}from"./index-C3Bp-kav-B5Xilx7b.js";import{a as m,r as h}from"./dev.utils-DPk2BYo5-DPws4rBm.js";var g=()=>{let e=r().KoliBri;return e===void 0&&(e={},Object.defineProperty(r(),"KoliBri",{value:e,writable:!1})),e};function _(e,t){try{Object.defineProperty(g(),e,{get:function(){return t}})}catch{u.debug(`KoliBri property ${e} is already bind.`)}}var v=(e,t)=>u.debug(`${e} ${t?``:`not `}activated`),y=()=>{if(h(),d()&&(m(),_(`a11yColorContrast`,s),_(`querySelector`,i),_(`querySelectorAll`,a),_(`querySelectorColors`,o),_(`utils`,function(){return f}),_(`parseJson`,t),_(`stringifyJson`,c),v(`Development mode`,d()),v(`Experimental mode`,l()),v(`Color contrast analysis`,p()),setTimeout(()=>{try{let t=n(),r=t?.body;if(t&&r&&typeof t.createElement==`function`){let n=t.createElement(e(`svg`));n.setAttribute(`aria-label`,`KoliBri-DevTools`),n.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),n.setAttribute(`role`,`toolbar`),n.setAttribute(`style`,`position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;`),n.innerHTML=`<svg
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
</svg>`,r.appendChild(n)}}catch(e){u.debug([`Could not initialize DevTools UI (likely in SSR/test environment):`,e])}},100),p())){let t=setTimeout(()=>{clearTimeout(t);try{let t=n(),r=t?.body;t&&r&&typeof t.createElement==`function`&&setInterval(()=>{f.queryHtmlElementColors(t.createElement(e(`div`)),s(r),!1,!1)},1e4)}catch(e){u.debug([`Could not initialize color contrast analysis:`,e])}},2500)}};export{y as initialize};