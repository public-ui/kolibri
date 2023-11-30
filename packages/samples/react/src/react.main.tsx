import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import { defineCustomElements } from '@public-ui/components/dist/loader';
import type { Generic } from '@a11y-ui/core';
import { register } from '@public-ui/components';
import { BAMF, BMF, BZStv1, DEFAULT, DESYv1, DESYv2, ECL_EC, ECL_EU, ITZBund, MAPZ, ZOLLv2, ZOLLv3 } from '@public-ui/themes';
import { TH } from '@public-oss/kolibri-themes';
import { App } from './App';

type Theme = Generic.Theming.RegisterPatch<string, string, string>;

void (async () => {
	if (process.env.THEME_MODULE) {
		/* Visual regression testing mode: Themes are overridden with a certain theme module, that should be used instead. */
		const { [(process.env.THEME_EXPORT as string) ?? 'default']: theme } = (await import(process.env.THEME_MODULE)) as Record<string, Theme>;
		try {
			await register([theme], defineCustomElements);
		} catch (error) {
			console.warn('Theme registration failed:', error);
		}
	} else {
		/* Regular mode: Register all known themes. */
		try {
			await register([BAMF, BMF, DEFAULT, BZStv1, DESYv1, DESYv2, ECL_EC, ECL_EU, ITZBund, MAPZ, ZOLLv2, ZOLLv3, TH], defineCustomElements, {
				theme: {
					detect: 'auto',
				},
			});
		} catch (error) {
			console.warn('Theme registration failed:', error);
		}
	}

	/**
	 * You should patch the theme after the components and your default theme are registered.
	 *
	 * ↓ That is a tiny sample!
	 */
	// KoliBriDevHelper.patchTheme('my-theme', {
	// 	'KOL-BUTTON': 'button{border:2px solid red;}',
	// });

	const htmlDivElement = document.querySelector('div#app');
	if (htmlDivElement instanceof HTMLDivElement) {
		const root = createRoot(htmlDivElement);
		root.render(
			<StrictMode>
				<Router>
					<App />
				</Router>
			</StrictMode>,
		);
	}
})();
