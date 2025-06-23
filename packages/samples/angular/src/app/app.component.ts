import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	standalone: true,
	imports: [RouterOutlet, RouterLink, RouterLinkActive],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {}
