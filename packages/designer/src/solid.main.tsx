import { render } from 'solid-js/web';

import { defineCustomElements } from '@public-ui/components/dist/loader';
import { BAHN, SPK, UKV, VKB, TH } from '@public-oss/kolibri-themes';
import { BAMF, BMF, BPA, BZST, DESY, ITZBund, MAPZ, NXT, ZOLL } from '@public-ui/themes';
import { AppComponent } from './components/app/component.solid';
import { register } from '@public-ui/core';

register([BAMF, BPA, BMF, BZST, DESY, ITZBund, MAPZ, NXT, TH, ZOLL, BAHN, SPK, UKV, VKB], defineCustomElements, {
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
