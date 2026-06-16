import{$ as e,St as t,V as n,bt as r,st as i,t as a,tt as o}from"./index-COQinNDk.js";var s=()=>{try{let n=e();if(!n||typeof n.querySelector!=`function`)return;let i=n.querySelector(`meta[name="kolibri"]`);if(i&&i.hasAttribute(`content`)){let e=i.getAttribute(`content`);typeof e==`string`&&(t(e.includes(`experimental-mode=true`)),r(e.includes(`color-contrast-analysis=true`)))}}catch{}},c=()=>{let e=o().KoliBri;return e===void 0&&(e={},Object.defineProperty(o(),"KoliBri",{value:e,writable:!1})),e},l=()=>{s(),n.debug(`
,--. ,--.         ,--. ,--. ,-----.           ,--.
|  .'   /  ,---.  |  | \`--' |  |) /_  ,--.--. \`--'
|  .   '  | .-. | |  | ,--. |  .-.  \\ |  .--' ,--.
|  |\\   \\ | '-' | |  | |  | |  '--' / |  |    |  |
\`--' \`--´  \`---´  \`--' \`--' \`------´  \`--'    \`--'
🚹 The accessible HTML-Standard | 👉 https://public-ui.github.io | ${a.kolibriVersion}
	`,{forceLog:!0})},u=()=>{c().adviceShown!==!0&&(Object.defineProperty(c(),"adviceShown",{get:function(){return!0}}),n.debug(`
You are using the KoliBri component library. If you have any suggestions for improvement or find a problem, please contact us:

Ticket: https://github.com/public-ui/kolibri/issues/new/choose (for privacy reasons, please use email)
Email: kolibri@itzbund.de
`))},d=()=>Math.floor(Math.random()*16777215).toString(16);i()&&(d=()=>`nonce`);var f=e=>`${e}-${d()}`,p=(e,t)=>{let n=e.lastIndexOf(`-`);if(n===-1)return`${e}-${t}`;let r=e.slice(n+1);return r===`nonce`||/^[0-9a-f]+$/.test(r)?`${e.slice(0,n)}-${t}-${r}`:`${e}-${t}`};export{u as a,d as i,f as n,l as r,p as t};