// https://storybook.js.org/docs/react/configure/theming

import './pwa';

import { create } from '@storybook/theming';

export const THEME = {
	itzbund: create({
		// ...themes.dark,
		// ...themes.light,
		// ...themes.normal,
		base: 'light',

		colorPrimary: '#00828C',
		colorSecondary: '#00828C',

		// UI
		// appBg: '#00828C',
		// appContentBg: 'white',
		// appBorderColor: 'black',
		appBorderRadius: 5,

		// Typography
		fontBase: 'BundesSans Web',
		// fontCode: 'monospace',

		// Text colors
		textColor: 'black',
		// textInverseColor: 'rgba(255,255,255,0.5)',

		// Toolbar default and active colors
		barTextColor: 'black',
		// barSelectedColor: 'white',
		// barBg: '#00828C',

		// Form colors
		// inputBg: 'white',
		inputBorder: 'black',
		// inputTextColor: 'black',
		inputBorderRadius: 5,

		brandTitle: 'KoliBri - Komponenten-Bibliothek für die Barrierefreiheit',
		brandUrl: 'https://itzbund.de',
		brandImage: 'itzbund.logo.svg',
	}),
};
