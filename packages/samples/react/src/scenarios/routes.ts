import { Routes } from '../shares/types';
import { AppointmentForm } from './appointment-form/AppointmentForm';
import { ChangeTabindex } from './change-tabindex';
import { CustomTooltipWidth } from './custom-tooltip-width';
import { DisabledInteractiveElements } from './disabled-interactive-elements';
import { FocusElements } from './focus-elements';
import { InputGroupWithError } from './input-group-with-error';
import { InputsGetValue } from './inputs-get-value';
import { ResponsiveFlexLayout } from './responsive-flex-layout';
import { SameHeightOfAllInteractiveElements } from './same-height-of-all-interactive-elements';
import { StaticForm } from './static-form';
import { TableHorizontalScrollAdvanced } from './horizontal-scrollbar-advanced';
import { TooltipPositioning } from './tooltip-positioning';

export const SCENARIO_ROUTES: Routes = {
	scenarios: {
		'appointment-form': AppointmentForm,
		'change-tabindex': ChangeTabindex,
		'custom-tooltip-width': CustomTooltipWidth,
		'disabled-interactive-scenario': DisabledInteractiveElements,
		'focus-elements': FocusElements,
		'input-group-with-error': InputGroupWithError,
		'inputs-get-value': InputsGetValue,
		'responsive-flex-layout': ResponsiveFlexLayout,
		'same-height-of-all-interactive-elements': SameHeightOfAllInteractiveElements,
		'static-form': StaticForm,
		'table-horizontal-scrollbar-advanced': TableHorizontalScrollAdvanced,
		'tooltip-positioning': TooltipPositioning,
	},
};
