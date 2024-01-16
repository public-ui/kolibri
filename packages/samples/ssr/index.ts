import { renderToString } from '@public-ui/hydrate';
import express from 'express';

async function ssr(html: string): Promise<string> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	const doc = (await renderToString(html, {
		// https://stenciljs.com/docs/hydrate-app#rendertostring-options
		prettyHtml: true, // default: false
	})) as { html: string };

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
}

const app = express();
const port = 3000;

app.use('/assets', express.static('assets'));
app.use('/node_modules', express.static('node_modules'));
app.use('/favicon.ico', express.static('favicon.ico'));

app.get('/', (_req, res) => {
	const webComponents: Promise<string>[] = [
		ssr(`<kol-kolibri class="block h-40"></kol-kolibri>`),
		ssr(`<kol-heading _label="SSR + CSR"></kol-heading>`),
		ssr(`
	<kol-input-text _label="Name" _name="name" _placeholder="Enter your name" _required></kol-input-text>
	<div class="flex flex-wrap gap-4">
		<kol-button _icons="codicon codicon-play" _hide-label _label="Submit" _type="submit" _variant="primary"></kol-button>
		<kol-button _label="Reset" _type="reset" _variant="danger"></kol-button>
	</div>`),
	];
	void Promise.all(webComponents).then((htmls) => {
		console.log(htmls);
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
		<script src="https://cdn.tailwindcss.com"></script>
	</head>
	<body class="container mx-auto p-4 grid gap-4">
		<header>
			${htmls[0]}
			${htmls[1]}
		</header>
		<main>
			<form action="/" method="GET" class="grid gap-4">
				${htmls[2]}
			</form>
		</main>
	</body>
</html>`);
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
