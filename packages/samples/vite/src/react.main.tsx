import { defineCustomElements } from '@public-ui/components/dist/loader';
import { register } from '@public-ui/components';
import { DEFAULT } from '@public-ui/theme-default';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

try {
	await register(DEFAULT, defineCustomElements);
} catch (error) {
	console.error(error);
}

const htmlElement: HTMLElement | null = document.querySelector<HTMLDivElement>('div#app');
if (htmlElement instanceof HTMLElement) {
	const root = createRoot(htmlElement);
	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
