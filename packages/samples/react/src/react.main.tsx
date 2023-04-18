import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import { defineCustomElements } from '@public-ui/components/dist/loader';
import { register } from '@public-ui/core';
import { BAMF, BPA, BZSt, BMF, DESYv1, DESYv2, ECL_EC, ECL_EU, ITZBund, MAPZ, ZOLLv2 } from '@public-ui/themes';
import { TH } from '@public-oss/kolibri-themes';
import { KoliBriDevHelper } from '@public-ui/components';
import { App } from './App';

register([BAMF, BPA, BMF, BZSt, DESYv1, DESYv2, ECL_EC, ECL_EU, ITZBund, MAPZ, ZOLLv2, TH], defineCustomElements, {
	theme: {
		detect: 'auto',
	},
})
	.then(() => {
		/**
		 * You should patch the theme after the components and your default theme are registered.
		 *
		 * ↓ That is a tiny sample!
		 */
		KoliBriDevHelper.patchTheme('my-theme', {
			'KOL-BUTTON': 'button{border:2px solid red;}',
		});

		const htmlDivElement = document.querySelector('div#app');
		if (htmlDivElement instanceof HTMLDivElement) {
			const root = createRoot(htmlDivElement);
			root.render(
				<StrictMode>
					<Router>
						<App />
					</Router>
				</StrictMode>
			);
		}
	})
	.catch(console.warn);
