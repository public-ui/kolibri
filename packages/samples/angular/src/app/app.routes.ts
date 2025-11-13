import { Routes } from '@angular/router';
import { CustomElementViewComponent } from './components/custom-element-view/custom-element-view.component';
import { DefaultViewComponent } from './components/default-view/default-view.component';
import { KolibriViewComponent } from './components/kolibri-view/kolibri-view.component';
import { ShadowElementViewComponent } from './components/shadow-element-view/shadow-element-view.component';

export const routes: Routes = [
	{ path: 'default', component: DefaultViewComponent },
	{ path: 'custom-element', component: CustomElementViewComponent },
	{ path: 'shadow-element', component: ShadowElementViewComponent },
	{ path: 'kolibri', component: KolibriViewComponent },
	{ path: '**', redirectTo: 'default' },
];
