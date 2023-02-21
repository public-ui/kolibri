import { render } from 'solid-js/web';

import { defineCustomElements } from '@public-ui/components/dist/loader';
import { BPA, HaVdB, ITZBund } from '@public-ui/themes';
import { BAMF, BMF, BZSt, DESYv1, DESYv2, MAPZ, ZOLLv2 } from '@itzbund/kolibri-internal-themes';
import { TH } from '@public-oss/kolibri-themes';
import { AppComponent } from './components/app/component.solid';
import { register } from '@public-ui/components';

register([BPA, ITZBund, BAMF, BMF, BZSt, DESYv1, DESYv2, HaVdB, MAPZ, ZOLLv2, TH], defineCustomElements, {
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
