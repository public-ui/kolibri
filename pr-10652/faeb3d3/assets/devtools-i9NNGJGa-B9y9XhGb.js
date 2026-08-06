import{I as e,J as t,L as n,Q as r,X as i,Z as a,at as o,ct as s,et as c,ot as l,pt as u,st as d,xt as f}from"./index-Bf28zR1_.js";import{a as p,r as m}from"./dev.utils-CSS9vFoH-Br8vjCQ1.js";var h=()=>{let e=r().KoliBri;return e===void 0&&(e={},Object.defineProperty(r(),"KoliBri",{value:e,writable:!1})),e};function g(e,t){try{Object.defineProperty(h(),e,{get:function(){return t}})}catch{n.debug(`KoliBri property ${e} is already bind.`)}}var _=(e,t)=>n.debug(`${e} ${t?``:`not `}activated`),v=()=>{if(m(),c()&&(p(),g(`a11yColorContrast`,o),g(`querySelector`,l),g(`querySelectorAll`,d),g(`querySelectorColors`,s),g(`utils`,function(){return e}),g(`parseJson`,u),g(`stringifyJson`,f),_(`Development mode`,c()),_(`Experimental mode`,a()),_(`Color contrast analysis`,t()),setTimeout(()=>{try{let e=i(),t=e?.body;if(e&&t&&typeof e.createElement==`function`){let n=e.createElement(`svg`);n.setAttribute(`aria-label`,`KoliBri-DevTools`),n.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),n.setAttribute(`role`,`toolbar`),n.setAttribute(`style`,`position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;`),n.innerHTML=`<svg
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
</svg>`,t.appendChild(n)}}catch(e){n.debug([`Could not initialize DevTools UI (likely in SSR/test environment):`,e])}},100),t())){let t=setTimeout(()=>{clearTimeout(t);try{let t=i(),n=t?.body;t&&n&&typeof t.createElement==`function`&&setInterval(()=>{e.queryHtmlElementColors(t.createElement(`div`),o(n),!1,!1)},1e4)}catch(e){n.debug([`Could not initialize color contrast analysis:`,e])}},2500)}};export{v as initialize};