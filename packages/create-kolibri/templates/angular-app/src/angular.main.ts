// Polyfills
import 'core-js/features/reflect';
import 'zone.js/dist/zone';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './angular.module';

const ENVs = {
	NODE_ENV: '$$NODE_ENV$$',
};
if (ENVs.NODE_ENV === 'production') {
	enableProdMode();
}

const htmlDivElement: HTMLElement | null = document.querySelector<HTMLDivElement>('div#app');
if (htmlDivElement instanceof HTMLElement) {
	htmlDivElement.appendChild(document.createElement('app'));

	platformBrowserDynamic()
		.bootstrapModule(AppModule)
		.then(() => {})
		.catch(() => {})
		.finally(() => {});
}
