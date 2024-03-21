import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KoliBriModule } from '@public-ui/angular-v17';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [RouterOutlet, KoliBriModule],
})
export class AppComponent {
	title = 'angular';
}
