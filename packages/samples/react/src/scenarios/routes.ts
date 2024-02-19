import { Routes } from '../shares/types';
import { AppointmentForm } from './appointment-form/AppointmentForm';
import { TerminComponent } from './complex-form/component';
import { CustomTooltipWidth } from './custom-tooltip-width';
import { StaticForm } from './static-form';

export const SCENARIO_ROUTES: Routes = {
	scenarios: {
		'complex-form': TerminComponent,
		'appointment-form': AppointmentForm,
		'custom-tooltip-width': CustomTooltipWidth,
		'static-form': StaticForm,
	},
};
