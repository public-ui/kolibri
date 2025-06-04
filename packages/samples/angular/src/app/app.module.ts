import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DefaultViewComponent } from './components/default-view/default-view.component';
import { KolibriViewComponent } from './components/kolibri-view/kolibri-view.component';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { DEFAULT } from '@public-ui/themes';
import { register } from '@public-ui/components';
import { CustomElementViewComponent } from './components/custom-element-view/custom-element-view.component';
import { ShadowElementViewComponent } from './components/shadow-element-view/shadow-element-view.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		RouterModule.forRoot(
			[
				{ path: 'default', component: DefaultViewComponent },
				{ path: 'custom-element', component: CustomElementViewComponent },
				{ path: 'shadow-element', component: ShadowElementViewComponent },
				{ path: 'kolibri', component: KolibriViewComponent },
				{ path: '**', redirectTo: 'default' },
			],
			{
				useHash: true,
			},
		),
	],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor() {
		register(DEFAULT, defineCustomElements).catch(console.warn);
	}
}
