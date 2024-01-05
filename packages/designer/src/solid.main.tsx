import { render } from 'solid-js/web';

import { defineCustomElements } from '@public-ui/components/dist/loader';
import { BMF, DEFAULT, ECL_EC, ECL_EU, ITZBund } from '@public-ui/themes';
import { AppComponent } from './components/app/component.solid';
import { register } from '@public-ui/components';

register([BMF, DEFAULT, ECL_EC, ECL_EU, ITZBund], defineCustomElements, {
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
