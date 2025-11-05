import { Routes } from '../shares/types';
import { AppointmentForm } from './appointment-form/AppointmentForm';
import { ChangeTabindex } from './change-tabindex';
import { CustomTooltipCssProperties } from './custom-tooltip-css-properties';
import { DisabledInteractiveElements } from './disabled-interactive-elements';
import { FocusElements } from './focus-elements';
import { InputGroupWithError } from './input-group-with-error';
import { InputsGetValue } from './inputs-get-value';
import { SameHeightOfAllInteractiveElements } from './same-height-of-all-interactive-elements';
import { StaticForm } from './static-form';
import { TableHorizontalScrollAdvanced } from './horizontal-scrollbar-advanced';
import { ToolbarItemOrder } from './toolbar-item-order';
import { TooltipPositioning } from './tooltip-positioning';
import { DateInForm } from './date-in-form';

export const SCENARIO_ROUTES: Routes = {
	scenarios: {
		'appointment-form': AppointmentForm,
		'change-tabindex': ChangeTabindex,
		'custom-tooltip-css-properties': CustomTooltipCssProperties,
		'date-in-form': DateInForm,
		'disabled-interactive-scenario': DisabledInteractiveElements,
		'focus-elements': FocusElements,
		'input-group-with-error': InputGroupWithError,
		'inputs-get-value': InputsGetValue,
		'same-height-of-all-interactive-elements': SameHeightOfAllInteractiveElements,
		'static-form': StaticForm,
		'table-horizontal-scrollbar-advanced': TableHorizontalScrollAdvanced,
		'toolbar-item-order': ToolbarItemOrder,
		'tooltip-positioning': TooltipPositioning,
	},
};
