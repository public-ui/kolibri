import { Routes } from '../shares/types';
import { ChangeTabindex } from './change-tabindex';
import { CustomTooltipWidth } from './custom-tooltip-width';
import { DisabledInteractiveElements } from './disabled-interactive-elements';
import { FocusElements } from './focus-elements';
import { InputGroupWithError } from './input-group-with-error';
import { InputsGetValue } from './inputs-get-value';
import { PerformanceTest } from './performance-test';
import { SameHeightOfAllInteractiveElements } from './same-height-of-all-interactive-elements';
import { StaticForm } from './static-form';
import { SampleFormWithValidation } from './sample-form-with-validation';
import { TableHorizontalScrollAdvanced } from './horizontal-scrollbar-advanced';
import { TooltipPositioning } from './tooltip-positioning';
import { RHFBasic } from './react-hook-form/basic';

export const SCENARIO_ROUTES: Routes = {
	scenarios: {
		'change-tabindex': ChangeTabindex,
		'custom-tooltip-width': CustomTooltipWidth,
		'disabled-interactive-scenario': DisabledInteractiveElements,
		'focus-elements': FocusElements,
		'input-group-with-error': InputGroupWithError,
		'inputs-get-value': InputsGetValue,
		'react-hook-form-adapter': RHFBasic,
		'same-height-of-all-interactive-elements': SameHeightOfAllInteractiveElements,
		'static-form': StaticForm,
		'sample-form-with-validation': SampleFormWithValidation,
		'table-horizontal-scrollbar-advanced': TableHorizontalScrollAdvanced,
		'tooltip-positioning': TooltipPositioning,
		'performance-test': PerformanceTest,
	},
};
