import { Component, forwardRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KoliBriModule, KolInputDate } from '@public-ui/angular-v18';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	imports: [RouterOutlet, KoliBriModule, FormsModule],
})
export class AppComponent {
	date = new Date();

	get dateJson() {
		return JSON.stringify(this.date);
	}

	get dateType() {
		return typeof this.date;
	}

	public handleInput(evt: Event) {
		const value = (evt.target as HTMLKolInputDateElement)._value;
		if (value instanceof Date) {
			this.date = value;
		}
	}

	public readonly increaseDate = () => {
		this.date = new Date(this.date.getTime() + 1000 * 60 * 60 * 24);
	};
}
