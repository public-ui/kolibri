import { Routes } from '../shares/types';
import { AppointmentForm } from './appointment-form/AppointmentForm';
import { ChangeTabindex } from './change-tabindex';
import { CustomTooltipCssProperties } from './custom-tooltip-css-properties';
import { DisabledInteractiveElements } from './disabled-interactive-elements';
import { FocusElements } from './focus-elements';
import { TableHorizontalScrollAdvanced } from './horizontal-scrollbar-advanced';
import { InputGroupWithError } from './input-group-with-error';
import { InputsGetValue } from './inputs-get-value';
import { PerformanceTest } from './performance-test';
import { SameHeightOfAllInteractiveElements } from './same-height-of-all-interactive-elements';
import { StaticForm } from './static-form';

export const SCENARIO_ROUTES: Routes = {
	scenarios: {
		'appointment-form': AppointmentForm,
		'custom-tooltip-css-properties': CustomTooltipCssProperties,
		'disabled-interactive-scenario': DisabledInteractiveElements,
		'focus-elements': FocusElements,
		'input-group-with-error': InputGroupWithError,
		'inputs-get-value': InputsGetValue,
		'static-form': StaticForm,
		'table-horizontal-scrollbar-advanced': TableHorizontalScrollAdvanced,
		'change-tabindex': ChangeTabindex,
		'same-height-of-all-interactive-elements': SameHeightOfAllInteractiveElements,
		'performance-test': PerformanceTest,
	},
};
