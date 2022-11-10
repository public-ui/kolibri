// https://storybook.js.org/docs/react/configure/story-layout

import { THEME } from './theme';

// import { setCustomElements } from '@storybook/react';
// import customElements from '@public-ui/components/custom-elements.json';
// setCustomElements(customElements);

// addParameters({
//   badgesConfig: {
//     version: {
//       contrast: '#eee',
//       color: '#000',
//       title: require('../package.json').version,
//     },
//   },
// });

import { register } from '@public-ui/core';
import { defineCustomElements as kolibri } from '@public-ui/components/dist/loader';
import { defineCustomElements as leanup } from '@leanup/kolibri-components/dist/loader';
import { BMF, BZST, ITZBund, MAPZ, BAMF, BPA, DESY, ITVSH, NXT, ZOLL } from '@public-ui/themes';

const AVAILABLE_THEMES = [
	// { name: 'BAMF-Styleguide', class: 'bamf', color: '', disabled: true },
	{ name: 'BMF-Styleguide', class: 'bmf', color: '#004b76' },
	// { name: 'BPA-Styleguide', class: 'bpa', color: '', disabled: true },
	{ name: 'BZSt-Styleguide (WIP)', class: 'bzst', color: '#23614e' },
	{ name: 'DESY-Styleguide', class: 'desy', color: '#326cae' },
	{ name: 'Hamburg-Styleguide (WIP)', class: 'hh', color: '#e10019' },
	{ name: 'ITZBund-Styleguide (Demo)', class: 'itzbund', color: '#007a89' },
	{ name: 'MAPZoll-Styleguide', class: 'mapz', color: '#1e538f' },
	{ name: 'Next-Styleguide (WIP)', class: 'nxt', color: '#003064' },
	// { name: 'ZOLL-Styleguide (WIP)', class: 'zoll', color: '#326cae' },
];
const CACHED_SELECTED_THEME = localStorage.getItem('kolibri-storybook-theme');

const getThemeDetails = (className) =>
	AVAILABLE_THEMES.find((theme) => {
		return theme.class === className;
	}) || null;

const getThemeName = (className) => getThemeDetails(className).name || null;

const switchTheme = (className) => {
	const themeDetails = getThemeDetails(className);
	if (themeDetails) {
		document.body.dataset.theme = themeDetails.class;
	} else {
		document.body.dataset.theme = 'bmf';
	}
};

register([BMF, BZST, ITZBund, MAPZ, BAMF, BPA, DESY, ITVSH, NXT, ZOLL], [kolibri, leanup], {
	theme: {
		detect: 'auto',
	},
})
	.then(() => {
		switchTheme(CACHED_SELECTED_THEME);
	})
	.catch(console.warn);

export const parameters = {
	a11y: {
		element: '#root',
		config: {},
		options: {},
		manual: false,
	},
	actions: {
		argTypesRegex: '^on[A-Z].*',
	},
	backgrounds: {
		disable: true,
	},
	badges: [require('../package.json').version],
	// badgesConfig: {
	//   [BADGE.BETA]: {
	//     contrast: '#FFF',
	//     color: '#018786',
	//     title: 'Beta',
	//   },
	//   [BADGE.DEPRECATED]: {
	//     contrast: '#FFF',
	//     color: '#6200EE',
	//     title: 'Deprecated',
	//   },
	// },
	cssprops: {
		'kolibri-background-color': {
			value: 'white',
			description: 'Optional description',
		},
		'kolibri-border-color': {
			value: '#bbb',
			description: 'Optional description',
		},
		'kolibri-border-radius': {
			control: 'text',
			value: '0.25rem',
			description: 'Optional description',
		},
		'kolibri-color': {
			value: 'black',
			description: 'Optional description',
		},
		'kolibri-color-accent': {
			value: '#ef9e48',
			description: 'Optional description',
		},
		'kolibri-color-error': {
			value: '#ad0e0b',
			description: 'Optional description',
		},
		'kolibri-color-info': {
			value: '#28568a',
			description: 'Optional description',
		},
		'kolibri-color-primary': {
			value: '#1e538f',
			description: 'Optional description',
		},
		'kolibri-color-secondary': {
			value: '#326cae',
			description: 'Optional description',
		},
		'kolibri-color-spin-1': {
			value: '#000000',
			description: 'Optional description',
		},
		'kolibri-color-spin-2': {
			value: '#ff0000',
			description: 'Optional description',
		},
		'kolibri-color-spin-3': {
			value: '#ffcc00',
			description: 'Optional description',
		},
		'kolibri-color-success': {
			value: '#12632f',
			description: 'Optional description',
		},
		'kolibri-color-warning': {
			value: '#854000',
			description: 'Optional description',
		},
		'kolibri-font-family': {
			control: 'text',
			value: 'BundesSans',
			description: 'Optional description',
		},
		'kolibri-hyphens': {
			control: 'text',
			value: 'auto',
			description: 'Optional description',
		},
		'kolibri-line-height': {
			control: 'text',
			value: '1.25em',
			description: 'Optional description',
		},
		'kolibri-spacing': {
			control: 'text',
			value: '0.25em',
			description: 'Optional description',
		},
	},
	docs: {
		// page: () => (
		//   <>
		//     <Title />
		//     <Subtitle />
		//     <Description />
		//     <Primary />
		//     <ArgsTable story={PRIMARY_STORY} />
		//     <Stories />
		//   </>
		// ),
		// source: {
		//   type: 'code',
		// },
		theme: THEME.itzbund,
	},
	// layout: 'centered',
	options: {
		storySort: {
			order: ['Startseite', 'Get Started', 'React', 'Web Components'],
		},
	},
	status: {
		statuses: {
			bitv: {
				background: '#0b8748',
				color: '#fff',
				description: 'Die Komponente ist BIK BITV getestet.',
			},
		},
	},
	themes: {
		clearable: false,
		default: getThemeName(CACHED_SELECTED_THEME),
		onChange: (theme) => {
			localStorage.setItem('kolibri-storybook-theme', theme.class);
			document.body.dataset.theme = theme.class;
			document.querySelectorAll('iframe').forEach((iframe) => {
				iframe.contentWindow.location.reload();
			});
		},
		list: AVAILABLE_THEMES,
	},
	viewMode: 'docs',
};
