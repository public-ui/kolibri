import { render } from 'solid-js/web';

import { defineCustomElements } from '@public-ui/components/dist/loader';
import { BPA, ITZBund } from '@public-ui/themes';
import { BAMF, BMF, BZSt, DESY, MAPZ, ZOLL } from '@itzbund/kolibri-internal-themes';
import { TH } from '@public-oss/kolibri-themes';
import { AppComponent } from './components/app/component.solid';
import { register } from '@public-ui/components';

register([BPA, ITZBund, BAMF, BMF, BZSt, DESY, MAPZ, ZOLL, TH], defineCustomElements, {
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
