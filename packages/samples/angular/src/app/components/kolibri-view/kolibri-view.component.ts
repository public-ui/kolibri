import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { KoliBriModule } from '@public-ui/angular-v17';
import { NUMBER_OF_INPUTS } from '../../shares/constants';

@Component({
	selector: 'app-kolibri-view',
	standalone: true,
	imports: [KoliBriModule, NgForOf],
	templateUrl: './kolibri-view.component.html',
})
export class KolibriViewComponent {
	numberOfInputs = NUMBER_OF_INPUTS;

	readonly onValueChange = {
		onChange: (event: Event, value: any): void => {
			console.log(value);
		},
	};
}
