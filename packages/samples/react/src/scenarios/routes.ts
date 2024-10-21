import { Routes } from '../shares/types';
import { AppointmentForm } from './appointment-form/AppointmentForm';
import { CustomTooltipWidth } from './custom-tooltip-width';
import { DisabledInteractiveElements } from './disabled-interactive-elements';
import { InputsGetValue } from './inputs-get-value';
import { StaticForm } from './static-form';
import { FocusElements } from './focus-elements';
import { TableHorizontalScrollAdvanced } from './horizontal-scrollbar-advanced';
import { InputGroupWithError } from './input-group-with-error';
import { ChangeTabindex } from './change-tabindex';

export const SCENARIO_ROUTES: Routes = {
	scenarios: {
		'appointment-form': AppointmentForm,
		'custom-tooltip-width': CustomTooltipWidth,
		'disabled-interactive-scenario': DisabledInteractiveElements,
		'focus-elements': FocusElements,
		'input-group-with-error': InputGroupWithError,
		'inputs-get-value': InputsGetValue,
		'static-form': StaticForm,
		'table-horizontal-scrollbar-advanced': TableHorizontalScrollAdvanced,
		'change-tabindex': ChangeTabindex,
	},
};
