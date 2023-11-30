import { Routes } from '../shares/types';
import { TerminComponent } from './complex-form/component';
import { AppointmentForm } from './appointment-form/AppointmentForm';
import { InputsGetValue } from './inputs-get-value';
import { CustomTooltipWidth } from './custom-tooltip-width';

export const SCENARIO_ROUTES: Routes = {
	scenarios: {
		'complex-form': TerminComponent,
		'appointment-form': AppointmentForm,
		'inputs-get-value': InputsGetValue,
		'custom-tooltip-width': CustomTooltipWidth,
	},
};
