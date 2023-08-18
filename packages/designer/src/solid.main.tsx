import { render } from 'solid-js/web';

import { defineCustomElements } from '@public-ui/components/dist/loader';
import { ITZBund, BAMF, BMF, BZSt, DESYv1, DESYv2, ECL_EC, ECL_EU, MAPZ, ZOLLv2, TOKEN_BASED } from '@public-ui/themes';
import { TH } from '@public-oss/kolibri-themes';
import { AppComponent } from './components/app/component.solid';
import { register } from '@public-ui/components';

register([BAMF, BMF, BZSt, DESYv1, DESYv2, ECL_EC, ECL_EU, ITZBund, MAPZ, TH, TOKEN_BASED, ZOLLv2], defineCustomElements, {
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
