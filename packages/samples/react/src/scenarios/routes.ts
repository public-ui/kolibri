import { Routes } from '../shares/types';
import { ButtonShortkeyTable } from './button-shortkey-table';
import { ChangeTabindex } from './change-tabindex';
import { CustomTooltipCssProperties } from './custom-tooltip-css-properties';
import { DateInForm } from './date-in-form';
import { DisabledInteractiveElements } from './disabled-interactive-elements';
import { FocusElements } from './focus-elements';
import { TableHorizontalScrollAdvanced } from './horizontal-scrollbar-advanced';
import { InputGroupWithError } from './input-group-with-error';
import { InputsGetValue } from './inputs-get-value';
import { PerformanceTest } from './performance-test';
import { RHFBasic } from './react-hook-form/basic';
import { RHFReset } from './react-hook-form/reset';
import { SameHeightOfAllInteractiveElements } from './same-height-of-all-interactive-elements';
import { SampleFormWithValidation } from './sample-form-with-validation';
import { StaticForm } from './static-form';
import { ToolbarItemOrder } from './toolbar-item-order';
import { TooltipPositioning } from './tooltip-positioning';
import { ZIndexScenario } from './z-index';

export const SCENARIO_ROUTES: Routes = {
	scenarios: {
		'button-shortkey-table': ButtonShortkeyTable,
		'change-tabindex': ChangeTabindex,
		'custom-tooltip-css-properties': CustomTooltipCssProperties,
		'date-in-form': DateInForm,
		'disabled-interactive-scenario': DisabledInteractiveElements,
		'focus-elements': FocusElements,
		'input-group-with-error': InputGroupWithError,
		'inputs-get-value': InputsGetValue,
		'react-hook-form-adapter': RHFBasic,
		'react-hook-form-reset': RHFReset,
		'same-height-of-all-interactive-elements': SameHeightOfAllInteractiveElements,
		'static-form': StaticForm,
		'sample-form-with-validation': SampleFormWithValidation,
		'table-horizontal-scrollbar-advanced': TableHorizontalScrollAdvanced,
		'toolbar-item-order': ToolbarItemOrder,
		'tooltip-positioning': TooltipPositioning,
		'z-index': ZIndexScenario,
		'performance-test': PerformanceTest,
	},
};
