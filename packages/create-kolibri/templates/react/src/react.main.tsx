import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import { AppComponent } from './components/app/component';

import { register } from '@public-ui/core';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { BMF } from '@public-ui/themes';

register(BMF, defineCustomElements)
	.then(() => {
		const htmlElement: HTMLElement | null = document.querySelector<HTMLDivElement>('div#app');
		if (htmlElement instanceof HTMLElement) {
			const root = createRoot(htmlElement);
			root.render(
				<Router>
					<AppComponent />
				</Router>
			);
		}
	})
	.catch(console.warn);
