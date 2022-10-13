import { Component } from '@angular/core';

import IMG_FRAMEWORK from '../../assets/logo.angular.png';
import IMG_LEANUP from '../../assets/logo.leanupjs.png';

@Component({
	selector: 'app',
	templateUrl: 'component.html',
})
export class AppComponent {
	public readonly framework = IMG_FRAMEWORK;
	public readonly leanup = IMG_LEANUP;
}
