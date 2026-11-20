import{_ as e,a as t,c as n,d as r,f as i,g as a,h as o,i as s,l as c,m as l,n as u,o as d,p as f,r as p,s as m,t as h,u as g,v as _}from"./index-DUF96pFY.js";function v(e,t){try{Object.defineProperty((()=>{let e=s().KoliBri;return e===void 0&&(e={},Object.defineProperty(s(),"KoliBri",{value:e,writable:!1})),e})(),e,{get:function(){return t}})}catch{_.debug(`KoliBri property ${e} is already bind.`)}}var y=(e,t)=>_.debug(`${e} ${t?``:`not `}activated`),b=()=>{if(p(l.kolibriVersion),h(),r()&&(u(),v(`a11yColorContrast`,m),v(`querySelector`,f),v(`querySelectorAll`,g),v(`querySelectorColors`,e),v(`utils`,(function(){return c})),v(`parseJson`,i),v(`stringifyJson`,n),y(`Development mode`,r()),y(`Experimental mode`,d()),y(`Color contrast analysis`,a()),setTimeout((()=>{try{let e=t(),n=e?.body;if(e&&n&&typeof e.createElement==`function`){let t=e.createElement(o(`svg`));t.setAttribute(`aria-label`,`KoliBri-DevTools`),t.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),t.setAttribute(`role`,`toolbar`),t.setAttribute(`style`,`position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;`),t.innerHTML=`<svg
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
</svg>`,n.appendChild(t)}}catch(e){_.debug([`Could not initialize DevTools UI (likely in SSR/test environment):`,e])}}),100),a())){let e=setTimeout((()=>{clearTimeout(e);try{let e=t(),n=e?.body;e&&n&&typeof e.createElement==`function`&&setInterval((()=>{c.queryHtmlElementColors(e.createElement(o(`div`)),m(n),!1,!1)}),1e4)}catch(e){_.debug([`Could not initialize color contrast analysis:`,e])}}),2500)}};export{b as initialize};