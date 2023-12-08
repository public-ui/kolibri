import { Routes } from '../shares/types';
import { TerminComponent } from './complex-form/component';
import { AppointmentForm } from './appointment-form/AppointmentForm';
import { CustomTooltipWidth } from './custom-tooltip-width';

export const SCENARIO_ROUTES: Routes = {
	scenarios: {
		'complex-form': TerminComponent,
		'appointment-form': AppointmentForm,
		'custom-tooltip-width': CustomTooltipWidth,
	},
};
