import { NgForOf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { KolInputCheckbox, KolInputNumber, KolInputText } from '@public-ui/angular-v21';
import { NUMBER_OF_INPUTS } from '../../shares/constants';

@Component({
	selector: 'app-kolibri-view',
	standalone: true,
	imports: [KolInputText, KolInputNumber, KolInputCheckbox, NgForOf],
	templateUrl: './kolibri-view.component.html',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class KolibriViewComponent {
	numberOfInputs = NUMBER_OF_INPUTS;

	readonly onValueChange = {
		onChange: (event: Event, value: any): void => {
			console.log(value);
		},
	};
}
