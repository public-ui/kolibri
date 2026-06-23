import{B as e,Q as t,_t as n,et as r,ot as i,t as a,yt as o}from"./index-D99H9wcB.js";var s=()=>{try{let e=t();if(!e||typeof e.querySelector!=`function`)return;let r=e.querySelector(`meta[name="kolibri"]`);if(r&&r.hasAttribute(`content`)){let e=r.getAttribute(`content`);typeof e==`string`&&(o(e.includes(`experimental-mode=true`)),n(e.includes(`color-contrast-analysis=true`)))}}catch{}},c=()=>{let e=r().KoliBri;return e===void 0&&(e={},Object.defineProperty(r(),"KoliBri",{value:e,writable:!1})),e},l=()=>{s(),e.debug(`
,--. ,--.         ,--. ,--. ,-----.           ,--.
|  .'   /  ,---.  |  | \`--' |  |) /_  ,--.--. \`--'
|  .   '  | .-. | |  | ,--. |  .-.  \\ |  .--' ,--.
|  |\\   \\ | '-' | |  | |  | |  '--' / |  |    |  |
\`--' \`--´  \`---´  \`--' \`--' \`------´  \`--'    \`--'
🚹 The accessible HTML-Standard | 👉 https://public-ui.github.io | ${a.kolibriVersion}
	`,{forceLog:!0})},u=()=>{c().adviceShown!==!0&&(Object.defineProperty(c(),"adviceShown",{get:function(){return!0}}),e.debug(`
You are using the KoliBri component library. If you have any suggestions for improvement or find a problem, please contact us:

Ticket: https://github.com/public-ui/kolibri/issues/new/choose (for privacy reasons, please use email)
Email: kolibri@itzbund.de
`))},d=()=>Math.floor(Math.random()*16777215).toString(16);i()&&(d=()=>`nonce`);var f=e=>`${e}-${d()}`,p=(e,t)=>{let n=e.lastIndexOf(`-`);if(n===-1)return`${e}-${t}`;let r=e.slice(n+1);return r===`nonce`||/^[0-9a-f]+$/.test(r)?`${e.slice(0,n)}-${t}-${r}`:`${e}-${t}`};export{u as a,d as i,f as n,l as r,p as t};