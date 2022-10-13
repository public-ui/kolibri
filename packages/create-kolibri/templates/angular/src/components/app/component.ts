import { Component } from '@angular/core';

import IMG_FRAMEWORK from '../../assets/logo.angular.png';

@Component({
	selector: 'app',
	templateUrl: 'component.html',
})
export class AppComponent {
	public readonly framework = IMG_FRAMEWORK;
}
