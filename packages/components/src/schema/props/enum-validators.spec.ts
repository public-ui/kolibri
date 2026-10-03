import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { Generic } from 'adopted-style-sheets';

import { createLegacyComponent, getInvalidValueWarnings } from '../../utils/testing/legacy-component';
import { Log } from '../utils/dev.utils';
import { validateAlertType } from './alert-type';
import { validateAlign } from './align';
import { validateAlternativeButtonLinkRole } from './alternative-button-link-role';
import { validateAriaCurrentValue } from './aria-current-value';
import { validateAutoComplete } from './auto-complete';
import { validateButtonType } from './button-type';
import { validateButtonVariant } from './button-variant';
import { validateLabelAlign } from './label-align';
import { validateLoading } from './loading';
import { validateMaxLengthBehavior } from './max-length-behavior';
import { validateOrientation } from './orientation';
import { validatePaginationPosition } from './pagination-position';
import { validatePopoverAlign } from './popover-align';
import { validateResizeTextarea } from './resize-textarea';
import { validateTabBehavior } from './tab-behavior';
import { validateTooltipAlign } from './tooltip-align';
import { validateTypeInputDate } from './type-input-date';
import { validateTypeInputText } from './type-input-text';
import { validateAlertVariant } from './variant-alert';
import { validateVariantInputCheckbox } from './variant-input-checkbox';
import { validateVariantProgress } from './variant-progress';
import { validateVariantQuote } from './variant-quote';
import { validateDialogVariant } from './variant/dialog';
import { validateModalVariant } from './variant/modal';
import { validatePasswordVariant } from './variant/password-variant';
import { validateSpinVariant } from './variant/spin';

type EnumValidator = (component: Generic.Element.Component, value?: string) => void;

const ALIGN_VALUES = ['bottom', 'left', 'right', 'top'];

/**
 * Validators that accept a fixed list of strings: the valid values and the default value that
 * `undefined` leads to (`undefined` = no default value, the state is kept and a warning is logged).
 * An unknown value always keeps the state and logs a warning.
 *
 * Known differences to the skeleton props of the same name (`internal/props`):
 * - `validatePopoverAlign` and `validateTooltipAlign` fall back to 'top'; `popoverAlignProp`
 *   defaults to 'bottom' and `tooltipAlignProp` to 'right', and both map an unknown value to
 *   that default instead of keeping the state.
 * - `validateButtonType` and `validateTabBehavior` have no default value; `buttonTypeProp`
 *   defaults to 'button' and `tabBehaviorProp` to 'select-automatic'.
 */
const validators: [string, EnumValidator, string, string[], string | undefined][] = [
	['validateAlertType', validateAlertType as EnumValidator, '_type', ['default', 'error', 'info', 'success', 'warning'], undefined],
	['validateAlertVariant', validateAlertVariant as EnumValidator, '_variant', ['card', 'msg'], undefined],
	['validateAlign', validateAlign as EnumValidator, '_align', ALIGN_VALUES, 'top'],
	['validateAlternativeButtonLinkRole', validateAlternativeButtonLinkRole as EnumValidator, '_role', ['tab', 'treeitem'], undefined],
	[
		'validateAriaCurrentValue',
		validateAriaCurrentValue as EnumValidator,
		'_ariaCurrentValue',
		['date', 'false', 'location', 'page', 'step', 'time', 'true'],
		'page',
	],
	['validateButtonType', validateButtonType as EnumValidator, '_type', ['button', 'reset', 'submit'], undefined],
	[
		'validateButtonVariant',
		validateButtonVariant as EnumValidator,
		'_variant',
		['custom', 'danger', 'ghost', 'normal', 'primary', 'secondary', 'tertiary'],
		'normal',
	],
	['validateDialogVariant', validateDialogVariant as EnumValidator, '_variant', ['blank', 'card'], undefined],
	['validateLabelAlign', validateLabelAlign as EnumValidator, '_labelAlign', ['left', 'right'], undefined],
	['validateLoading', validateLoading as EnumValidator, '_loading', ['eager', 'lazy'], undefined],
	['validateMaxLengthBehavior', validateMaxLengthBehavior as EnumValidator, '_maxLengthBehavior', ['hard', 'soft'], undefined],
	['validateModalVariant', validateModalVariant as EnumValidator, '_variant', ['blank', 'card'], undefined],
	['validateOrientation', validateOrientation as EnumValidator, '_orientation', ['horizontal', 'vertical'], 'horizontal'],
	['validatePaginationPosition', validatePaginationPosition as EnumValidator, '_paginationPosition', ['both', 'bottom', 'top'], 'bottom'],
	['validatePasswordVariant', validatePasswordVariant as EnumValidator, '_variant', ['default', 'visibility-toggle'], undefined],
	['validatePopoverAlign', validatePopoverAlign as EnumValidator, '_popoverAlign', ALIGN_VALUES, 'top'],
	['validateResizeTextarea', validateResizeTextarea as EnumValidator, '_resize', ['none', 'vertical'], 'vertical'],
	['validateSpinVariant', validateSpinVariant as EnumValidator, '_variant', ['cycle', 'dot', 'none'], undefined],
	['validateTabBehavior', validateTabBehavior as EnumValidator, '_behavior', ['select-automatic', 'select-manual'], undefined],
	['validateTooltipAlign', validateTooltipAlign as EnumValidator, '_tooltipAlign', ALIGN_VALUES, 'top'],
	['validateTypeInputDate', validateTypeInputDate as EnumValidator, '_type', ['date', 'datetime-local', 'month', 'time', 'week'], undefined],
	['validateTypeInputText', validateTypeInputText as EnumValidator, '_type', ['search', 'tel', 'text', 'url'], undefined],
	['validateVariantInputCheckbox', validateVariantInputCheckbox as EnumValidator, '_variant', ['button', 'default', 'switch'], undefined],
	['validateVariantProgress', validateVariantProgress as EnumValidator, '_variant', ['bar', 'cycle'], undefined],
	['validateVariantQuote', validateVariantQuote as EnumValidator, '_variant', ['block', 'inline'], undefined],
];

describe('legacy enum prop validators', () => {
	let debugSpy: jest.SpiedFunction<typeof Log.debug>;

	beforeEach(() => {
		debugSpy = jest.spyOn(Log, 'debug');
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	const warningsFor = (propName: string): string[] => getInvalidValueWarnings(debugSpy.mock.calls, propName);

	describe.each(validators)('%s', (_name, validate, propName, values, defaultValue) => {
		it.each(values)('stores "%s"', (value) => {
			const component = createLegacyComponent();
			validate(component, value);
			expect(component.state[propName]).toBe(value);
		});

		it.each([['unknown'], [values[0].toUpperCase()], [1]])('keeps the state and warns for %p', (value) => {
			const component = createLegacyComponent({ [propName]: values[0] });
			validate(component, value as string);
			expect(component.state[propName]).toBe(values[0]);
			expect(warningsFor(propName)).toHaveLength(1);
		});

		if (defaultValue === undefined) {
			it('keeps the state and warns for undefined', () => {
				const component = createLegacyComponent({ [propName]: values[1] });
				validate(component, undefined);
				expect(component.state[propName]).toBe(values[1]);
				expect(warningsFor(propName)).toHaveLength(1);
			});
		} else {
			it(`stores the default "${defaultValue}" for undefined`, () => {
				const component = createLegacyComponent();
				validate(component, undefined);
				expect(component.state[propName]).toBe(defaultValue);
				expect(warningsFor(propName)).toEqual([]);
			});
		}
	});

	describe('validateOrientation', () => {
		it('uses the given default value for undefined', () => {
			const component = createLegacyComponent();
			validateOrientation(component, undefined, 'vertical');
			expect(component.state._orientation).toBe('vertical');
		});
	});

	describe('validateAutoComplete', () => {
		it.each([['on'], ['off'], ['email'], ['shipping street-address']])('stores "%s"', (value) => {
			const component = createLegacyComponent();
			validateAutoComplete(component, value);
			expect(component.state._autoComplete).toBe(value);
		});

		it.each([[''], [1]])('keeps the state and warns for %p', (value) => {
			const component = createLegacyComponent({ _autoComplete: 'on' });
			validateAutoComplete(component, value as string);
			expect(component.state._autoComplete).toBe('on');
			expect(warningsFor('_autoComplete')).toHaveLength(1);
		});

		it('stores the default "off" for undefined', () => {
			const component = createLegacyComponent({ _autoComplete: 'on' });
			validateAutoComplete(component, undefined);
			expect(component.state._autoComplete).toBe('off');
		});
	});
});
