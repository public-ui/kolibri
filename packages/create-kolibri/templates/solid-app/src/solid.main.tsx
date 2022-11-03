import { render } from 'solid-js/web';

import { AppComponent } from './components/app/component';

import { register } from '@public-ui/core';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { BMF } from '@public-ui/themes';

register(BMF, defineCustomElements)
	.then(() => {
		const htmlDivElement: HTMLDivElement | null = document.querySelector('div#app');
		if (htmlDivElement instanceof HTMLDivElement) {
			render(() => <AppComponent />, htmlDivElement);
		}
	})
	.catch(console.warn);
