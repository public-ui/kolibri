import { render } from 'solid-js/web';

import { defineCustomElements } from '@public-ui/components/dist/loader';
import { BAMF, BMF, BPA, BZST, DESY, HH, ITZBund, MAPZ, NXT, ZOLL } from '@public-ui/themes';
import { AppComponent } from './components/app/component.solid';
import { register } from '@public-ui/core';

register([BAMF, BPA, BMF, BZST, DESY, HH, ITZBund, MAPZ, NXT, ZOLL], defineCustomElements, {
	theme: {
		detect: 'auto',
	},
})
	.then(() => {
		const htmlElement: HTMLElement | null = document.querySelector<HTMLDivElement>('div#app');
		if (htmlElement instanceof HTMLElement) {
			render(() => <AppComponent />, htmlElement);
		}
	})
	.catch(console.warn);
