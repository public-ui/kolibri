import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { Generic } from 'adopted-style-sheets';

import { createLegacyComponent, getInvalidValueWarnings } from '../../utils/testing/legacy-component';
import type { KoliBriTableSelection } from '../types/table';
import { Log } from '../utils/dev.utils';
import { validateButtonCallbacks } from './button-callbacks';
import { validateColor } from './color';
import type { ErrorListPropType } from './error-list';
import { validateErrorList } from './error-list';
import type { IconsPropType } from './icons';
import { isIcon, mapIconProp2State, validateIcons } from './icons';
import type { InputCheckboxIconsPropType } from './icons-input-checkbox';
import { validateIconsInputCheckbox } from './icons-input-checkbox';
import { validateLinkCallbacks } from './link-on-callbacks';
import type { MsgPropType } from './msg';
import { checkHasMsg, getMsgType, isMsgDefinedAndInputTouched, normalizeMsg, validateMsg } from './msg';
import { validateTableCallbacks, validateTableStatefulCallbacks } from './table-callbacks';
import type { FixedColsPropType } from './table-fixed-cols';
import { validateFixedCols } from './table-fixed-cols';
import type { TableHeaderCellsPropType } from './table-header-cells';
import { validateTableHeaders } from './table-header-cells';
import type { TableSelectionPropType } from './table-selection';
import { validateTableSelection } from './table-selection';
import type { VariantClassNamePropType } from './variant-class-name';
import { classNameFromVariant, validateVariantClassName } from './variant-class-name';

type ObjectValidator = (component: Generic.Element.Component, value?: object) => void;

describe('legacy object prop validators', () => {
	let debugSpy: jest.SpiedFunction<typeof Log.debug>;

	beforeEach(() => {
		debugSpy = jest.spyOn(Log, 'debug');
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	const warningsFor = (propName: string): string[] => getInvalidValueWarnings(debugSpy.mock.calls, propName);

	describe.each([
		['validateButtonCallbacks', validateButtonCallbacks as ObjectValidator],
		['validateTableCallbacks', validateTableCallbacks as ObjectValidator],
		['validateTableStatefulCallbacks', validateTableStatefulCallbacks as ObjectValidator],
	])('%s', (_name, validate) => {
		it('stores any object, also without callbacks', () => {
			const component = createLegacyComponent();
			const on = { onClick: () => undefined };
			validate(component, on);
			expect(component.state._on).toBe(on);
			validate(component, {});
			expect(component.state._on).toEqual({});
		});

		it.each([[null], [undefined], ['onClick']])('keeps the state and warns for %p', (value) => {
			const on = {};
			const component = createLegacyComponent({ _on: on });
			validate(component, value as unknown as object);
			expect(component.state._on).toBe(on);
			expect(warningsFor('_on')).toHaveLength(1);
		});
	});

	describe('validateLinkCallbacks', () => {
		it('stores an object with an onClick function, bypassing setState', () => {
			const component = createLegacyComponent();
			const on = { onClick: () => undefined };
			validateLinkCallbacks(component, on);
			expect(component.state._on).toBe(on);
			expect(component.nextHooks).toBeUndefined();
		});

		it.each([[undefined], [{}], [{ onClick: 'handler' }]])('silently keeps the state for %p', (value) => {
			const component = createLegacyComponent({ _on: 'old' });
			validateLinkCallbacks(component, value as never);
			expect(component.state._on).toBe('old');
			expect(debugSpy).not.toHaveBeenCalled();
		});
	});

	describe('validateColor', () => {
		const pair = { backgroundColor: '#000', foregroundColor: '#fff' };

		it.each([['#fff'], ['#FFFF'], ['#00ff00'], ['#00ff0080']])('stores the hex color %p', (value) => {
			const component = createLegacyComponent();
			validateColor(component, value);
			expect(component.state._color).toBe(value);
		});

		it('stores a color pair object', () => {
			const component = createLegacyComponent();
			validateColor(component, pair);
			expect(component.state._color).toBe(pair);
		});

		// The string is validated as JSON, but the state keeps the unparsed string.
		it('stores a color pair JSON string unparsed', () => {
			const component = createLegacyComponent();
			validateColor(component, JSON.stringify(pair));
			expect(component.state._color).toBe(JSON.stringify(pair));
		});

		it.each([['#ggg'], ['red'], ['#12'], ["{'backgroundColor':'#000','foregroundColor':'#fff'}"], [{ backgroundColor: '#000' }], [undefined]])(
			'keeps the state and warns for %p',
			(value) => {
				const component = createLegacyComponent({ _color: '#000' });
				validateColor(component, value as string);
				expect(component.state._color).toBe('#000');
				expect(warningsFor('_color')).toHaveLength(1);
			},
		);

		it('stores the default value of the options for undefined', () => {
			const component = createLegacyComponent();
			validateColor(component, undefined, { defaultValue: '#123' });
			expect(component.state._color).toBe('#123');
		});
	});

	/**
	 * The predicate tests the entries for `string` or `function`, so an entry of the type
	 * `ErrorListPropType` (an object) is never valid. The skeleton `errorListProp` checks the object
	 * shape instead (see `internal/props/error-list.ts`). The prop name has no leading underscore.
	 */
	describe('validateErrorList', () => {
		it('rejects a list of ErrorListPropType objects', () => {
			const component = createLegacyComponent();
			validateErrorList(component, [{ message: 'Error', selector: '#field' }]);
			expect(component.state).toEqual({});
			expect(warningsFor('errorList')).toHaveLength(1);
		});

		it('stores a list of strings and functions under "errorList"', () => {
			const component = createLegacyComponent();
			const value = ['#field', () => undefined] as unknown as ErrorListPropType[];
			validateErrorList(component, value);
			expect(component.state.errorList).toBe(value);
		});

		it('stores an empty list', () => {
			const component = createLegacyComponent();
			validateErrorList(component, []);
			expect(component.state.errorList).toEqual([]);
		});

		it.each([[undefined], ['[]']])('keeps the state and warns for %p', (value) => {
			const component = createLegacyComponent({ errorList: [] });
			validateErrorList(component, value as unknown as ErrorListPropType[]);
			expect(component.state.errorList).toEqual([]);
			expect(warningsFor('errorList')).toHaveLength(1);
		});
	});

	describe('validateFixedCols', () => {
		it.each([[[0, 0]], [[1, 2]]])('stores %p', (value) => {
			const component = createLegacyComponent();
			validateFixedCols(component, value as FixedColsPropType);
			expect(component.state._fixedCols).toEqual(value);
		});

		it.each([[[1]], [[1, 2, 3]], [[-1, 0]], [[1.5, 0]], [['1', 0]], ['[1,2]'], [undefined]])('keeps the state and warns for %p', (value) => {
			const component = createLegacyComponent({ _fixedCols: [0, 0] });
			validateFixedCols(component, value as unknown as FixedColsPropType);
			expect(component.state._fixedCols).toEqual([0, 0]);
			expect(warningsFor('_fixedCols')).toHaveLength(1);
		});
	});

	describe('validateIcons', () => {
		it.each([
			['kolicon-alert', { left: { icon: 'kolicon-alert' } }],
			['{"right":"kolicon-alert"}', { right: { icon: 'kolicon-alert' } }],
			["{'top':'kolicon-alert'}", { top: { icon: 'kolicon-alert' } }],
			[{ bottom: { icon: 'kolicon-alert', label: 'Alert' } }, { bottom: { icon: 'kolicon-alert', label: 'Alert' } }],
			[
				{ left: 'kolicon-a', right: { icon: 'kolicon-b' } },
				{ left: { icon: 'kolicon-a' }, right: { icon: 'kolicon-b' } },
			],
			[{ left: '' }, {}],
			[{}, {}],
			[null, {}],
			[undefined, {}],
		])('maps %p to the state %p', (value, expected) => {
			const component = createLegacyComponent();
			validateIcons(component, value as IconsPropType);
			expect(component.state._icons).toEqual(expected);
		});

		it.each([[''], [1], [{ left: 1 }], [{ unknown: 'kolicon-alert' }], [{ left: { icon: '' } }]])('keeps the state and warns for %p', (value) => {
			const component = createLegacyComponent({ _icons: {} });
			validateIcons(component, value as IconsPropType);
			expect(component.state._icons).toEqual({});
			expect(warningsFor('_icons')).toHaveLength(1);
		});

		it('ignores the string "[object Object]" silently', () => {
			const component = createLegacyComponent({ _icons: 'old' });
			validateIcons(component, '[object Object]');
			expect(component.state._icons).toBe('old');
			expect(debugSpy).not.toHaveBeenCalled();
		});

		it('calls the hooks of the options before mapping the icons', () => {
			const beforePatch = jest.fn<Generic.Element.NextStateHooksCallback>();
			const afterPatch = jest.fn<Generic.Element.StateHooksCallback>();
			const component = createLegacyComponent();
			validateIcons(component, 'kolicon-alert', { hooks: { afterPatch, beforePatch } });
			expect(beforePatch).toHaveBeenCalledWith('kolicon-alert', expect.any(Map), component, '_icons');
			expect(afterPatch).toHaveBeenCalledWith({ left: { icon: 'kolicon-alert' } }, component.state, component, '_icons');
		});
	});

	describe('isIcon', () => {
		it.each([[{ icon: 'kolicon-a' }], [{ icon: 'kolicon-a', label: '' }], [{ icon: 'kolicon-a', style: { color: 'red' } }]])('accepts %p', (value) => {
			expect(isIcon(value)).toBe(true);
		});

		it.each([[null], ['kolicon-a'], [{ icon: '' }], [{ icon: 'kolicon-a', label: 1 }], [{ icon: 'kolicon-a', style: '' }]])('rejects %p', (value) => {
			expect(isIcon(value)).toBe(false);
		});
	});

	describe('mapIconProp2State', () => {
		it('ignores icons that are neither objects nor non-empty strings', () => {
			expect(mapIconProp2State({ left: '' as never, right: 'kolicon-a' })).toEqual({ right: { icon: 'kolicon-a' } });
		});
	});

	describe('validateIconsInputCheckbox', () => {
		it('merges a partial object into the icons of the state', () => {
			const component = createLegacyComponent({ _icons: { checked: 'kolicon-check', indeterminate: 'kolicon-minus', unchecked: 'kolicon-cross' } });
			validateIconsInputCheckbox(component, { checked: 'kolicon-plus' });
			expect(component.state._icons).toEqual({ checked: 'kolicon-plus', indeterminate: 'kolicon-minus', unchecked: 'kolicon-cross' });
		});

		it('stores the object when the state has no icons yet', () => {
			const component = createLegacyComponent();
			validateIconsInputCheckbox(component, { unchecked: 'kolicon-cross' });
			expect(component.state._icons).toEqual({ unchecked: 'kolicon-cross' });
		});

		it.each([['{"checked":"kolicon-check"}'], [{}], [{ checked: '' }], [null], [undefined]])('keeps the state and warns for %p', (value) => {
			const component = createLegacyComponent({ _icons: { checked: 'kolicon-check' } });
			validateIconsInputCheckbox(component, value as InputCheckboxIconsPropType);
			expect(component.state._icons).toEqual({ checked: 'kolicon-check' });
			expect(warningsFor('_icons')).toHaveLength(1);
		});
	});

	describe('validateMsg', () => {
		it.each([
			['Error text', 'Error text'],
			[{ _description: 'Error' }, { _description: 'Error' }],
			['{"_description":"Info","_type":"info"}', { _description: 'Info', _type: 'info' }],
			["{'_description':'Info'}", { _description: 'Info' }],
		])('stores %p as %p', (value, expected) => {
			const component = createLegacyComponent();
			validateMsg(component, value as MsgPropType);
			expect(component.state._msg).toEqual(expected);
		});

		it('stores undefined', () => {
			const component = createLegacyComponent({ _msg: 'old' });
			validateMsg(component, undefined);
			expect(component.state).toHaveProperty('_msg', undefined);
		});

		it.each([[''], [{}], [{ _description: '' }], [null], [1]])('keeps the state and warns for %p', (value) => {
			const component = createLegacyComponent({ _msg: 'old' });
			validateMsg(component, value as MsgPropType);
			expect(component.state._msg).toBe('old');
			expect(warningsFor('_msg')).toHaveLength(1);
		});

		it('ignores the string "[object Object]" silently', () => {
			const component = createLegacyComponent({ _msg: 'old' });
			validateMsg(component, '[object Object]');
			expect(component.state._msg).toBe('old');
			expect(debugSpy).not.toHaveBeenCalled();
		});
	});

	describe('message helpers', () => {
		it.each([
			[undefined, undefined],
			['Error text', { _description: 'Error text', _type: 'error' }],
			['{"_description":"Info","_type":"info"}', { _description: 'Info', _type: 'info' }],
			[{ _description: 'Error' }, { _description: 'Error', _type: 'error' }],
			[
				{ _description: 'Ok', _type: 'success' },
				{ _description: 'Ok', _type: 'success' },
			],
		])('normalizeMsg(%p) is %p', (value, expected) => {
			expect(normalizeMsg(value as MsgPropType)).toEqual(expected);
		});

		it.each([
			[undefined, 'error'],
			['{"_type":"info"}', 'error'],
			[{ _description: 'Error' }, 'error'],
			[{ _description: 'Ok', _type: 'success' }, 'success'],
		])('getMsgType(%p) is %p', (value, expected) => {
			expect(getMsgType(value as MsgPropType)).toBe(expected);
		});

		it.each([
			['Error', true, true],
			['Error', false, false],
			['Error', undefined, false],
			['', true, false],
			[undefined, true, false],
		])('isMsgDefinedAndInputTouched(%p, %p) is %p', (msg, touched, expected) => {
			expect(isMsgDefinedAndInputTouched(msg, touched)).toBe(expected);
			expect(checkHasMsg(msg, touched)).toBe(expected);
		});
	});

	describe('validateTableHeaders', () => {
		const headers = { horizontal: [[{ key: 'name', label: 'Name', width: 100 }]], vertical: [[{ label: 'Row' }]] };

		it('stores a valid object', () => {
			const component = createLegacyComponent();
			validateTableHeaders(component, headers);
			expect(component.state._headers).toBe(headers);
		});

		it('parses a JSON string', () => {
			const component = createLegacyComponent();
			validateTableHeaders(component, JSON.stringify(headers));
			expect(component.state._headers).toEqual(headers);
		});

		it('stores an object without rows', () => {
			const component = createLegacyComponent();
			validateTableHeaders(component, {});
			expect(component.state._headers).toEqual({});
		});

		it.each([
			[{ horizontal: [{ label: 'Name' }] }],
			[{ vertical: 'rows' }],
			[{ horizontal: [[{ label: 'Name', width: '100px' }]] }],
			[null],
			[undefined],
			['text'],
		])('keeps the state and warns for %p', (value) => {
			const component = createLegacyComponent({ _headers: {} });
			validateTableHeaders(component, value as TableHeaderCellsPropType);
			expect(component.state._headers).toEqual({});
			expect(warningsFor('_headers')).toHaveLength(1);
		});

		it.each([[''], ['[object Object]']])('ignores the string "%s" silently', (value) => {
			const component = createLegacyComponent({ _headers: {} });
			validateTableHeaders(component, value);
			expect(component.state._headers).toEqual({});
			expect(debugSpy).not.toHaveBeenCalled();
		});
	});

	describe('validateTableSelection', () => {
		const label = () => 'Select row';

		it.each([[{ label }], [{ label, selectedKeys: ['1'] }], [{ label, multiple: true, selectedKeys: [] }]])('stores %p', (value) => {
			const component = createLegacyComponent();
			validateTableSelection(component, value as KoliBriTableSelection);
			expect(component.state._selection).toBe(value);
		});

		// A JSON string cannot carry the required `label` function, so every string is rejected.
		it.each([[{}], [{ label: 'Select' }], [{ label, selectedKeys: '1' }], [null], [undefined], ['{"label":"Select"}']])(
			'silently keeps the state for %p',
			(value) => {
				const component = createLegacyComponent({ _selection: 'old' });
				validateTableSelection(component, value as TableSelectionPropType);
				expect(component.state._selection).toBe('old');
				expect(debugSpy).not.toHaveBeenCalled();
			},
		);
	});

	/**
	 * Known differences to the skeleton `variantProp` (`internal/props/variant.ts`): the legacy class
	 * names need at least four characters (the skeleton accepts one), and `undefined` keeps the state
	 * with a warning because the default value `{}` is invalid (the skeleton defaults to `[]`).
	 */
	describe('validateVariantClassName', () => {
		it.each([
			['primary', ['primary']],
			['primary custom-variant', ['primary', 'custom-variant']],
			[
				['primary', 'custom_variant'],
				['primary', 'custom_variant'],
			],
			[[], []],
		])('stores %p as %p', (value, expected) => {
			const component = createLegacyComponent();
			validateVariantClassName(component, value as VariantClassNamePropType);
			expect(component.state._variant).toEqual(expected);
		});

		it.each([['abc'], [''], ['1primary'], ['primary  custom'], [['primary', 'abc']], [{}], [undefined]])('keeps the state and warns for %p', (value) => {
			const component = createLegacyComponent({ _variant: ['old-variant'] });
			validateVariantClassName(component, value as VariantClassNamePropType);
			expect(component.state._variant).toEqual(['old-variant']);
			expect(warningsFor('_variant')).toHaveLength(1);
		});

		it('calls the hooks of the options', () => {
			const beforePatch = jest.fn<Generic.Element.NextStateHooksCallback>();
			const afterPatch = jest.fn<Generic.Element.StateHooksCallback>();
			const component = createLegacyComponent();
			validateVariantClassName(component, 'primary', { hooks: { afterPatch, beforePatch } });
			expect(beforePatch).toHaveBeenCalledWith('primary', expect.any(Map), component, '_variant');
			expect(afterPatch).toHaveBeenCalledWith(['primary'], component.state, component, '_variant');
		});
	});

	describe('classNameFromVariant', () => {
		it.each([
			[['primary', 'custom'], 'kol-button--primary kol-button--custom '],
			[[], ''],
			['primary', ''],
			[undefined, ''],
		])('maps %p to %p', (variants, expected) => {
			expect(classNameFromVariant(variants, 'button')).toBe(expected);
		});
	});
});
