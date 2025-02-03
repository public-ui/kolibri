import { render } from 'solid-js/web';

import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { DEFAULT, ECL_EC, ECL_EU } from '@public-ui/themes';
import { AppComponent } from './components/app/component.solid';

register([DEFAULT, ECL_EC, ECL_EU], defineCustomElements, {
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
