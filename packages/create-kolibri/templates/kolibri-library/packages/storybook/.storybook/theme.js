// https://storybook.js.org/docs/react/configure/theming

import { create } from '@storybook/theming';

import { register } from '@public-ui/core';
import { defineCustomElements as kolibri } from '@public-ui/components/dist/loader';
import { defineCustomElements as leanup } from '@leanup/kolibri-components/dist/loader';
import { BMF, BZST, ITZBund, MAPZ, BAMF, BPA, DESY, ITVSH, NXT, ZOLL } from '@public-ui/themes';

register([BMF, BZST, ITZBund, MAPZ, BAMF, BPA, DESY, ITVSH, NXT, ZOLL], [kolibri, leanup], {
	theme: {
		detect: 'auto',
		name: 'bmf',
	},
})
	.then(() => {
		const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

		if (MutationObserver) {
			const observer = new MutationObserver((mutations) => {
					const classAttributes = mutations.filter((mutation) => mutation.type === 'attributes' && mutation.attributeName === 'class');
					if (classAttributes.length > 0) {
						const className = classAttributes[classAttributes.length - 1].target.className;
						if (className.includes('bamf')) {
							document.body.dataset.theme = 'bamf';
						} else if (className.includes('bmf')) {
							document.body.dataset.theme = 'bmf';
						} else if (className.includes('bpa')) {
							document.body.dataset.theme = 'bpa';
						} else if (className.includes('bzst')) {
							document.body.dataset.theme = 'bzst';
						} else if (className.includes('desy')) {
							document.body.dataset.theme = 'desy';
						} else if (className.includes('hh')) {
							document.body.dataset.theme = 'hh';
						} else if (className.includes('itzbund')) {
							document.body.dataset.theme = 'itzbund';
						} else if (className.includes('mapz')) {
							document.body.dataset.theme = 'mapz';
						} else if (className.includes('nxt')) {
							document.body.dataset.theme = 'nxt';
						} else if (className.includes('zoll')) {
							document.body.dataset.theme = 'zoll';
						}
					}
				}),
				config = {
					attributeFilter: ['class'],
				};
			observer.observe(document.body, config);
		}
		document.body.dataset.theme = 'bmf';
	})
	.catch(console.warn);

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

		// brandTitle: 'KoliBri - Komponentenbibliothek für die Barrierefreiheit',
		// brandUrl: '/',
		// brandImage: 'itzbund.logo.svg',
	}),
};
