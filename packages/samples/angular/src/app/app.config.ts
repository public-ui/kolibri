import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { DEFAULT } from '@public-ui/themes';
import { routes } from './app.routes';

register(DEFAULT, defineCustomElements).catch(console.warn);

export const appConfig: ApplicationConfig = {
	providers: [provideRouter(routes, withHashLocation())],
};
