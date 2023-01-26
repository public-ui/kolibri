const path = require('path');
module.exports = {
	publicPath: '/',
	name: 'KoliBri | Public UI',
	short_name: 'KoliBri | Public UI',
	description: 'Dokumentation der barrierefreien Web Component-Bibliothek KoliBri (Public UI)',
	lang: 'de-DE',
	start_url: '/',
	display: 'fullscreen',
	orientation: 'any',
	theme_color: '#fff',
	background_color: '#fff',
	filename: 'manifest.json',
	icons: [
		{
			src: path.resolve('src/assets/logo.kolibri.png'),
			sizes: [96, 128, 192, 256, 384, 512],
		},
	],
	crossorigin: null,
	inject: true,
	fingerprints: true,
	ios: true,
	includeDirectory: true,
};
