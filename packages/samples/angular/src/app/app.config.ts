import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { DEFAULT } from '@public-ui/themes';
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';

register(DEFAULT, defineCustomElements).catch(console.warn);

export const appConfig: ApplicationConfig = {
	providers: [provideRouter(routes, withHashLocation())],
};
