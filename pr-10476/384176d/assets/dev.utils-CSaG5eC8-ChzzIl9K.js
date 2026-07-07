import{Ct as e,V as t,ct as n,et as r,nt as i,t as a,xt as o}from"./index-1Rni1avn.js";var s=()=>{try{let t=r();if(!t||typeof t.querySelector!=`function`)return;let n=t.querySelector(`meta[name="kolibri"]`);if(n&&n.hasAttribute(`content`)){let t=n.getAttribute(`content`);typeof t==`string`&&(e(t.includes(`experimental-mode=true`)),o(t.includes(`color-contrast-analysis=true`)))}}catch{}},c=()=>{let e=i().KoliBri;return e===void 0&&(e={},Object.defineProperty(i(),"KoliBri",{value:e,writable:!1})),e},l=()=>{s(),t.debug(`
,--. ,--.         ,--. ,--. ,-----.           ,--.
|  .'   /  ,---.  |  | \`--' |  |) /_  ,--.--. \`--'
|  .   '  | .-. | |  | ,--. |  .-.  \\ |  .--' ,--.
|  |\\   \\ | '-' | |  | |  | |  '--' / |  |    |  |
\`--' \`--´  \`---´  \`--' \`--' \`------´  \`--'    \`--'
🚹 The accessible HTML-Standard | 👉 https://public-ui.github.io | ${a.kolibriVersion}
	`,{forceLog:!0})},u=()=>{c().adviceShown!==!0&&(Object.defineProperty(c(),"adviceShown",{get:function(){return!0}}),t.debug(`
You are using the KoliBri component library. If you have any suggestions for improvement or find a problem, please contact us:

Ticket: https://github.com/public-ui/kolibri/issues/new/choose (for privacy reasons, please use email)
Email: kolibri@itzbund.de
`))},d=()=>Math.floor(Math.random()*16777215).toString(16);n()&&(d=()=>`nonce`);var f=e=>`${e}-${d()}`,p=(e,t)=>{let n=e.lastIndexOf(`-`);if(n===-1)return`${e}-${t}`;let r=e.slice(n+1);return r===`nonce`||/^[0-9a-f]+$/.test(r)?`${e.slice(0,n)}-${t}-${r}`:`${e}-${t}`};export{u as a,d as i,f as n,l as r,p as t};