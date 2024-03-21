import { bootstrapApplication } from '@angular/platform-browser';
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { DEFAULT } from '@public-ui/theme-default';
import { AppComponent } from './app/app.component';

register(DEFAULT, defineCustomElements)
	.then(() => bootstrapApplication(AppComponent))
	.catch(console.warn);
