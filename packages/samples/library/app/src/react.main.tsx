import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import { register } from '@public-ui/components';
import { defineCustomElements as KoliBri } from '@public-ui/components/dist/loader';
import { defineCustomElements as Demo } from '@public-ui/library-components/dist/loader';

import { App } from './App';

void (async () => {
	/* Regular mode: Register all known themes. */
	try {
		await register([], [KoliBri, Demo]);
	} catch (error) {
		console.warn('Registration failed:', error);
	}

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
