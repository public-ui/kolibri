import { Routes } from '../shares/types';
import { AppointmentForm } from './appointment-form/AppointmentForm';
import { CustomTooltipWidth } from './custom-tooltip-width';
import { DisabledInteractiveElements } from './disabled-interactive-elements';
import { InputsGetValue } from './inputs-get-value';
import { StaticForm } from './static-form';

export const SCENARIO_ROUTES: Routes = {
	scenarios: {
		'appointment-form': AppointmentForm,
		'inputs-get-value': InputsGetValue,
		'custom-tooltip-width': CustomTooltipWidth,
		'static-form': StaticForm,
		'disabled-interactive-scenario': DisabledInteractiveElements,
	},
};
