#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function filterFiles(dir, regExp) {
	let files = [];
	const dirPath = path.resolve(process.cwd(), dir);
	fs.readdirSync(dirPath).forEach((file) => {
		const fullPath = path.resolve(dir, file);
		if (fs.lstatSync(fullPath).isDirectory()) {
			files = files.concat(filterFiles(fullPath, regExp));
		} else if (regExp.test(path.basename(fullPath))) {
			files.push(fullPath);
		}
	});
	return files;
}

const FILES = filterFiles(path.relative(process.cwd(), 'build'), /index\.html$/);

FILES.forEach((file) => {
	const content = fs.readFileSync(file, 'utf-8').replace(
		'</head>',
		`<!-- https://www.vioma.de/de/wiki/online-marketing/seo/meta-tags/ -->
	<meta charset="UTF-8" />
	<meta name="robots" content="index, follow" />
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

	<!-- https://ogp.me/ -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Informationstechnikzentrum Bund" />
	<meta property="og:title" content="KoliBri - The accessible HTML-Standard" />
	<meta property="og:description" content="KoliBri ist die barrierefreie Web Component-Bibliothek für alle webbasierten Projekte und Design Systeme." />
	<meta property="og:url" content="https://public-ui.github.io/" />
	<meta property="og:image" content="https://avatars.githubusercontent.com/u/109126739?u=a57a37d20d60090bf572668d907ed093f6dbda85" />
	<meta property="og:image:alt" content="Logo von KoliBri - The accessible HTML-Standard" />

	<!-- https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@ITZBund" />
	<meta name="twitter:creator" content="@martinoppitz" />
	<meta name="twitter:title" content="KoliBri - The accessible HTML-Standard" />
	<meta name="twitter:description" content="KoliBri ist die barrierefreie Web Component-Bibliothek für alle webbasierten Projekte und Design Systeme." />
	<meta name="twitter:image" content="https://avatars.githubusercontent.com/u/109126739?u=a57a37d20d60090bf572668d907ed093f6dbda85" />
	<meta name="twitter:image:alt" content="Logo von KoliBri - The accessible HTML-Standard" /></head>`
	);
	console.warn(`${file} meta details updated`);
	fs.writeFileSync(file, content, 'utf-8');
});
