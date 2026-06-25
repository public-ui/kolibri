import{$ as e,B as t,bt as n,st as r,t as i,tt as a,vt as o}from"./index-BYMCFgVO.js";var s=()=>{try{let t=e();if(!t||typeof t.querySelector!=`function`)return;let r=t.querySelector(`meta[name="kolibri"]`);if(r&&r.hasAttribute(`content`)){let e=r.getAttribute(`content`);typeof e==`string`&&(n(e.includes(`experimental-mode=true`)),o(e.includes(`color-contrast-analysis=true`)))}}catch{}},c=()=>{let e=a().KoliBri;return e===void 0&&(e={},Object.defineProperty(a(),"KoliBri",{value:e,writable:!1})),e},l=()=>{s(),t.debug(`
,--. ,--.         ,--. ,--. ,-----.           ,--.
|  .'   /  ,---.  |  | \`--' |  |) /_  ,--.--. \`--'
|  .   '  | .-. | |  | ,--. |  .-.  \\ |  .--' ,--.
|  |\\   \\ | '-' | |  | |  | |  '--' / |  |    |  |
\`--' \`--´  \`---´  \`--' \`--' \`------´  \`--'    \`--'
🚹 The accessible HTML-Standard | 👉 https://public-ui.github.io | ${i.kolibriVersion}
	`,{forceLog:!0})},u=()=>{c().adviceShown!==!0&&(Object.defineProperty(c(),"adviceShown",{get:function(){return!0}}),t.debug(`
You are using the KoliBri component library. If you have any suggestions for improvement or find a problem, please contact us:

Ticket: https://github.com/public-ui/kolibri/issues/new/choose (for privacy reasons, please use email)
Email: kolibri@itzbund.de
`))},d=()=>Math.floor(Math.random()*16777215).toString(16);r()&&(d=()=>`nonce`);var f=e=>`${e}-${d()}`,p=(e,t)=>{let n=e.lastIndexOf(`-`);if(n===-1)return`${e}-${t}`;let r=e.slice(n+1);return r===`nonce`||/^[0-9a-f]+$/.test(r)?`${e.slice(0,n)}-${t}-${r}`:`${e}-${t}`};export{u as a,d as i,f as n,l as r,p as t};