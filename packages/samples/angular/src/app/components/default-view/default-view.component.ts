import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { KoliBriModule } from '@public-ui/angular-v17';
import { NUMBER_OF_INPUTS } from '../../shares/constants';

@Component({
	selector: 'app-default-view',
	standalone: true,
	imports: [KoliBriModule, NgForOf],
	templateUrl: './default-view.component.html',
})
export class DefaultViewComponent {
	numberOfInputs = NUMBER_OF_INPUTS;

	onValueChange(event: Event): void {
		console.log('Value changed:', event);
	}
}
