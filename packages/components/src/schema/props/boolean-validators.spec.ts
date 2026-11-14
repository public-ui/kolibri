import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { Generic } from 'adopted-style-sheets';

import { validateActive } from '../../../internals/src/schema/props/active';
import { validateAdjustHeight } from '../../../internals/src/schema/props/adjust-height';
import { validateAllowMultiSort } from '../../../internals/src/schema/props/allow-multi-sort';
import { validateAriaExpanded } from '../../../internals/src/schema/props/aria-expanded';
import { validateAriaSelected } from '../../../internals/src/schema/props/aria-selected';
import { validateChecked } from '../../../internals/src/schema/props/checked';
import { validateCollapsible } from '../../../internals/src/schema/props/collapsible';
import { validateDisabled } from '../../../internals/src/schema/props/disabled';
import { validateHasCloser } from '../../../internals/src/schema/props/has-closer';
import { validateHasCompactButton } from '../../../internals/src/schema/props/has-compact-button';
import { validateHasCounter } from '../../../internals/src/schema/props/has-counter';
import { validateHasCreateButton } from '../../../internals/src/schema/props/has-create-button';
import { validateHasIconsWhenExpanded } from '../../../internals/src/schema/props/has-icons-when-expanded';
import { validateHasSettingsMenu } from '../../../internals/src/schema/props/has-settings-menu';
import { validateHasValue } from '../../../internals/src/schema/props/has-value';
import { validateHideLabel } from '../../../internals/src/schema/props/hide-label';
import { validateHideMsg } from '../../../internals/src/schema/props/hide-msg';
import { validateIndeterminate } from '../../../internals/src/schema/props/indeterminate';
import { validateInline } from '../../../internals/src/schema/props/inline';
import { validateModal } from '../../../internals/src/schema/props/modal';
import { validateMultiple } from '../../../internals/src/schema/props/multiple';
import { validateOpen } from '../../../internals/src/schema/props/open';
import { validateReadOnly } from '../../../internals/src/schema/props/read-only';
import { validateRequired } from '../../../internals/src/schema/props/required';
import { validateShow } from '../../../internals/src/schema/props/show';
import { validateSpellCheck } from '../../../internals/src/schema/props/spell-check';
import { validateTouched } from '../../../internals/src/schema/props/touched';
import { validateVisibilityToggle } from '../../../internals/src/schema/props/visibility-toggle';
import { Log } from '../../../internals/src/schema/utils/dev.utils';
import type { WatchBooleanOptions } from '../../../internals/src/schema/utils/prop.validators';
import { createLegacyComponent, getInvalidValueWarnings, getLoggedMessages } from '../../utils/testing/legacy-component';

type BooleanValidator = (component: Generic.Element.Component, value?: boolean, options?: WatchBooleanOptions) => void;

/**
 * Validators that delegate to `watchBoolean` without a default value.
 *
 * Known differences to the skeleton props of the same name (`internal/props`, `normalizeBoolean`):
 * the legacy validators reject the strings 'true'/'false', and `undefined` keeps the previous state
 * value with a warning instead of resetting it to the default `false`.
 */
const validators: [string, BooleanValidator, string][] = [
	['validateActive', validateActive as BooleanValidator, '_active'],
	['validateAdjustHeight', validateAdjustHeight, '_adjustHeight'],
	['validateAriaExpanded', validateAriaExpanded, '_ariaExpanded'],
	['validateAriaSelected', validateAriaSelected, '_ariaSelected'],
	['validateChecked', validateChecked, '_checked'],
	['validateCollapsible', validateCollapsible, '_collapsible'],
	['validateDisabled', validateDisabled, '_disabled'],
	['validateHasCloser', validateHasCloser, '_hasCloser'],
	['validateHasCompactButton', validateHasCompactButton, '_hasCompactButton'],
	['validateHasCounter', validateHasCounter, '_hasCounter'],
	['validateHasCreateButton', validateHasCreateButton, '_hasCreateButton'],
	['validateHasIconsWhenExpanded', validateHasIconsWhenExpanded, '_hasIconsWhenExpanded'],
	['validateHasSettingsMenu', validateHasSettingsMenu, '_hasSettingsMenu'],
	['validateHasValue', validateHasValue, '_hasValue'],
	['validateHideLabel', validateHideLabel, '_hideLabel'],
	['validateHideMsg', validateHideMsg, '_hideMsg'],
	['validateIndeterminate', validateIndeterminate, '_indeterminate'],
	['validateInline', validateInline, '_inline'],
	['validateModal', validateModal, '_modal'],
	['validateMultiple', validateMultiple, '_multiple'],
	['validateOpen', validateOpen, '_open'],
	['validateReadOnly', validateReadOnly, '_readOnly'],
	['validateRequired', validateRequired, '_required'],
	['validateShow', validateShow, '_show'],
	// `defaultValue: undefined` is no valid boolean, so it behaves like no default value.
	['validateSpellCheck', validateSpellCheck, '_spellCheck'],
	['validateTouched', validateTouched, '_touched'],
	['validateVisibilityToggle', validateVisibilityToggle, '_visibilityToggle'],
];

/**
 * Validators that pass their options through to `watchBoolean`.
 */
const validatorsWithOptions: [string, BooleanValidator, string][] = [
	['validateActive', validateActive as BooleanValidator, '_active'],
	['validateAllowMultiSort', validateAllowMultiSort, '_allowMultiSort'],
	['validateHasCounter', validateHasCounter, '_hasCounter'],
	['validateHasValue', validateHasValue, '_hasValue'],
	['validateHideLabel', validateHideLabel, '_hideLabel'],
	['validateHideMsg', validateHideMsg, '_hideMsg'],
	['validateInline', validateInline, '_inline'],
	['validateMultiple', validateMultiple, '_multiple'],
	['validateOpen', validateOpen, '_open'],
	['validateShow', validateShow, '_show'],
	['validateVisibilityToggle', validateVisibilityToggle, '_visibilityToggle'],
];

describe('legacy boolean prop validators', () => {
	let debugSpy: jest.SpiedFunction<typeof Log.debug>;

	beforeEach(() => {
		debugSpy = jest.spyOn(Log, 'debug');
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	// `a11yHint` logs a message only once per module instance, so this test runs before the table below sets `_disabled` to true.
	describe('validateDisabled', () => {
		const disabledHints = (): string[] => getLoggedMessages(debugSpy.mock.calls).filter((message) => message.startsWith('"Disabled" limits accessibility'));

		it('gives the a11y hint after the state is patched to true', () => {
			const component = createLegacyComponent();
			validateDisabled(component, false);
			expect(disabledHints()).toEqual([]);
			validateDisabled(component, true);
			expect(component.state._disabled).toBe(true);
			expect(disabledHints()).toHaveLength(1);
		});
	});

	describe('validateAllowMultiSort', () => {
		it('stores the default false for undefined', () => {
			const component = createLegacyComponent({ _allowMultiSort: true });
			validateAllowMultiSort(component, undefined);
			expect(component.state._allowMultiSort).toBe(false);
		});

		it('lets the options override the default value', () => {
			const component = createLegacyComponent();
			validateAllowMultiSort(component, undefined, { defaultValue: true });
			expect(component.state._allowMultiSort).toBe(true);
		});
	});

	describe.each(validators)('%s', (_name, validate, propName) => {
		it.each([[true], [false]])('stores %p', (value) => {
			const component = createLegacyComponent();
			validate(component, value);
			expect(component.state[propName]).toBe(value);
		});

		it('keeps the state and warns for the string "true"', () => {
			const component = createLegacyComponent({ [propName]: false });
			validate(component, 'true' as unknown as boolean);
			expect(component.state[propName]).toBe(false);
			expect(getInvalidValueWarnings(debugSpy.mock.calls, propName)).toHaveLength(1);
		});

		it('keeps the state and warns for undefined', () => {
			const component = createLegacyComponent({ [propName]: true });
			validate(component, undefined);
			expect(component.state[propName]).toBe(true);
			expect(getInvalidValueWarnings(debugSpy.mock.calls, propName)).toHaveLength(1);
		});
	});

	describe.each(validatorsWithOptions)('%s with options', (_name, validate, propName) => {
		it('stores the default value of the options for undefined', () => {
			const component = createLegacyComponent();
			validate(component, undefined, { defaultValue: true });
			expect(component.state[propName]).toBe(true);
		});

		it('calls the afterPatch hook of the options', () => {
			const afterPatch = jest.fn<Generic.Element.StateHooksCallback>();
			const component = createLegacyComponent();
			validate(component, true, { hooks: { afterPatch } });
			expect(afterPatch).toHaveBeenCalledWith(true, component.state, component, propName);
		});
	});
});
