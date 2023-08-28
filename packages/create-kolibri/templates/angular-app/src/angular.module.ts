import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/component';
import { KoliBriModule } from '@public-ui/angular-v16';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { register } from '@public-ui/components';
import { ITZBund } from '@public-ui/themes';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [AppComponent],
	imports: [BrowserModule, FormsModule, KoliBriModule],
})
export class AppModule {
	public constructor() {
		register(ITZBund, defineCustomElements).catch(console.warn);
	}
}
