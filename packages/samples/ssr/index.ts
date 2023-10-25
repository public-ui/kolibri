import { renderToString } from '@public-ui/hydrate';
import fs from 'fs';
import path from 'path';
import express from 'express';

function ssr(html: string) {
	return renderToString(html, {
		// https://stenciljs.com/docs/hydrate-app#rendertostring-options
		prettyHtml: true, // default: false
	}).then((doc) => {
		const cutBody = /(.*\n)*.*<body>([\s\S]*?)<\/body>(\n.*)*/;
		doc.html = doc.html.replace(cutBody, '$2');
		const removeToastContainer = /(.*\n)*.*<\/kol-toast-container>/;
		doc.html = doc.html.replace(removeToastContainer, '');
		const removeIDs = /(c|s)-(id|mode)="[^"]+"/g;
		doc.html = doc.html.replace(removeIDs, '');
		const removeHtmlComments = /<!--[^>]*-->/g;
		doc.html = doc.html.replace(removeHtmlComments, '');
		const removeEmptyLines = /[\r\n]+/g;
		doc.html = doc.html.replace(removeEmptyLines, '');
		const removeHtmlSpaces = /[\s]+/g;
		doc.html = doc.html.replace(removeHtmlSpaces, ' ');
		const removeSpace = /\> \</g;
		doc.html = doc.html.replace(removeSpace, '><');
		doc.html = doc.html.replace(/hydrated/g, '');
		return doc.html.trim();
	});
}

const app = express();
const port = 3000;

app.use('/assets', express.static('assets'));
app.use('/node_modules', express.static('node_modules'));
app.use('/favicon.ico', express.static('favicon.ico'));

app.get('/', (req, res) => {
	ssr(`<kol-button _icons="codicon codicon-home" _hide-label _label="Submit" _tooltip-align="right" _type="submit"></kol-button>`).then((buttonHTML) => {
		console.log(buttonHTML);
		res.send(`
		<!DOCTYPE html>
<html lang="de" dir="ltr">
	<head>
		<meta charset="UTF-8" />
		<title>SSR + CSR | KoliBri</title>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="kolibri" content="dev-mode=true,experimental-mode=true" />
		<link href="https://cdn.jsdelivr.net/npm/@vscode/codicons@0.0.33/dist/codicon.min.css" rel="stylesheet">
		<!-- script type="module" src="/node_modules/@public-ui/components/dist/kolibri/kolibri.esm.js"></script -->
		<script type="module">
			import { register } from '/node_modules/@public-ui/components/dist/esm/index.js';
			import { defineCustomElements } from '/node_modules/@public-ui/components/dist/esm/loader.js';
			import { DEFAULT } from '/node_modules/@public-ui/theme-default/dist/index.mjs';
			register(DEFAULT, defineCustomElements)
					.catch(console.warn);
		</script>
	</head>
	<body>
		<form action="/" method="GET">
			<input type="text" name="name" value="Martin" />
			${buttonHTML.replace('style', '')}
			<noscript>Diese Webseite erfordert, dass Sie JavaScript aktivieren.</noscript>
			<button>Submit</button>
		</form>
	</body>
</html>`);
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
