import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import { bootstrap } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { BWSt, DEFAULT, ECL_EC, ECL_EU, KERN_V2 } from '@public-ui/themes';

import { App } from '@public-ui/sample-react';

import type { Generic } from 'adopted-style-sheets';

type Theme = Generic.Theming.RegisterPatch<string, string, string>;

const getThemes = async () => {
	if (process.env.THEME_MODULE) {
		/* Visual regression testing mode: Themes are overridden with a certain theme module, that should be used instead. */
		if (process.env.PLATFORM === 'win32') {
			/* Add leading slash, required for ESBuild on Windows.
			   Note: process.env.THEME_MODULE must be used literally in the import(). Moving it to a constant breaks the import. */
			process.env.THEME_MODULE = `/${process.env.THEME_MODULE}`;
		}
		const { [(process.env.THEME_EXPORT as string) || 'default']: theme } = (await import(/* @vite-ignore */ process.env.THEME_MODULE)) as Record<string, Theme>;
		return [theme];
	}

	/* List of regular sample app themes */
	return [DEFAULT, ECL_EC, ECL_EU, KERN_V2, BWSt] as Theme[];
};

void (async () => {
	try {
		await bootstrap(
			await getThemes(),
			() => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				defineCustomElements(window);
			},
			{
				environment: process.env.NODE_ENV === 'development' ? 'development' : 'production',
				reflectInputValues: true,
				theme: process.env.THEME_MODULE
					? undefined
					: {
							detect: 'auto',
						},
				translation: {
					name: 'en',
				},
			},
		);
	} catch (error) {
		console.warn('Theme registration failed:', error);
	}

	/**
	 * You should patch the theme after the components and your default theme are registered.
	 **
	 * ↓ That is a tiny sample!
	 */
	// KoliBriDevHelper.patchTheme(
	// 	'default',
	// 	{
	// 		'KOL-BUTTON': 'button{border:2px solid red;}',
	// 	},
	// 	{
	// 		append: true,
	// 	},
	// );

	const htmlDivElement = document.querySelector('div#app');
	if (htmlDivElement instanceof HTMLDivElement) {
		const root = createRoot(htmlDivElement);
		root.render(
			<StrictMode>
				<Router>
					<App
						customThemes={[
							{
								name: 'Default',
								key: 'default',
							},
							{
								name: 'European Commission (in progress)',
								key: 'ecl-ec',
							},
							{
								name: 'European Union (in progress)',
								key: 'ecl-eu',
							},
							{
								name: 'KERN-UX Standard (v2)',
								key: 'kern-v2',
							},
						]}
					/>
				</Router>
			</StrictMode>,
		);
	}
})();
