import { Routes } from '../shares/types';
import { ChangeTabindex } from './change-tabindex';
import { CustomTooltipWidth } from './custom-tooltip-width';
import { DisabledInteractiveElements } from './disabled-interactive-elements';
import { FocusElements } from './focus-elements';
import { TableHorizontalScrollAdvanced } from './horizontal-scrollbar-advanced';
import { InputGroupWithError } from './input-group-with-error';
import { InputsGetValue } from './inputs-get-value';
import { PerformanceTest } from './performance-test';
import { SameHeightOfAllInteractiveElements } from './same-height-of-all-interactive-elements';
import { StaticForm } from './static-form';
import { SampleFormWithValidation } from './sample-form-with-validation';

export const SCENARIO_ROUTES: Routes = {
	scenarios: {
		'custom-tooltip-width': CustomTooltipWidth,
		'disabled-interactive-scenario': DisabledInteractiveElements,
		'focus-elements': FocusElements,
		'input-group-with-error': InputGroupWithError,
		'inputs-get-value': InputsGetValue,
		'static-form': StaticForm,
		'sample-form-with-validation': SampleFormWithValidation,
		'table-horizontal-scrollbar-advanced': TableHorizontalScrollAdvanced,
		'change-tabindex': ChangeTabindex,
		'same-height-of-all-interactive-elements': SameHeightOfAllInteractiveElements,
		'performance-test': PerformanceTest,
	},
};
