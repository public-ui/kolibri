import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './components/app/component';

import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { ECL_EC } from '@public-ui/themes';

register(ECL_EC, defineCustomElements)
	.then(() => {
		const htmlElement: HTMLElement | null = document.querySelector<HTMLDivElement>('div#app');
		if (htmlElement instanceof HTMLElement) {
			const root = createRoot(htmlElement);
			root.render(<App />);
		}
	})
	.catch(console.warn);
