import { Component, forwardRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KoliBriModule, KolInputDate } from '@public-ui/angular-v18';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [RouterOutlet, KoliBriModule, FormsModule],
})
export class AppComponent {
	dateModel = new Date();

	public handleInput(evt: Event) {
		const value = (evt.target as HTMLKolInputDateElement).value;
		console.log('input', evt, value);
		if (value instanceof Date) {
			this.dateModel = value;
		}
	}

	public handleChange(evt: Event) {
		console.log('change', evt, (evt.target as HTMLKolInputDateElement).value);
	}
}
