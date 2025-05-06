import { Routes } from '../shares/types';
import { CustomTooltipWidth } from './custom-tooltip-width';
import { DisabledInteractiveElements } from './disabled-interactive-elements';
import { InputsGetValue } from './inputs-get-value';
import { StaticForm } from './static-form';
import { FocusElements } from './focus-elements';
import { TableHorizontalScrollAdvanced } from './horizontal-scrollbar-advanced';
import { InputGroupWithError } from './input-group-with-error';
import { ChangeTabindex } from './change-tabindex';
import { SameHeightOfAllInteractiveElements } from './same-height-of-all-interactive-elements';

export const SCENARIO_ROUTES: Routes = {
	scenarios: {
		'custom-tooltip-width': CustomTooltipWidth,
		'disabled-interactive-scenario': DisabledInteractiveElements,
		'focus-elements': FocusElements,
		'input-group-with-error': InputGroupWithError,
		'inputs-get-value': InputsGetValue,
		'static-form': StaticForm,
		'table-horizontal-scrollbar-advanced': TableHorizontalScrollAdvanced,
		'change-tabindex': ChangeTabindex,
		'same-height-of-all-interactive-elements': SameHeightOfAllInteractiveElements,
	},
};
