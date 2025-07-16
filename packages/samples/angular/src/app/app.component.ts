import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KolButton } from '@public-ui/angular-v20';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [RouterOutlet, KolButton],
})
export class AppComponent {
	title = 'angular';
}
