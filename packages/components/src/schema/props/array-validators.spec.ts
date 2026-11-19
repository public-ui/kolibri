import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { Generic } from 'adopted-style-sheets';

import { createLegacyComponent, getLoggedMessages } from '../../utils/testing/legacy-component';
import type { KoliBriTableDataType } from '../types/table';
import { Log } from '../utils/dev.utils';
import type { SetStateHooks } from '../utils/prop.validators';
import type { OptionsPropType, OptionsWithOptgroupPropType } from './options';
import { validateOptions, validateOptionsWithOptgroup } from './options';
import type { SuggestionsPropType } from './suggestions';
import { validateSuggestions } from './suggestions';
import { validateTableData } from './table-data';
import { validateTableDataFoot } from './table-data-foot';
import type { ToolbarItemsPropType } from './toolbar-items';
import { validateToolbarItems } from './toolbar-items';

type ArrayValidator = (component: Generic.Element.Component, value?: string | object[], setStateHooks?: SetStateHooks) => void;

/**
 * Validators that accept an array of objects or its JSON string and ignore any other value
 * silently: no state change, no warning.
 */
const objectArrayValidators: [string, ArrayValidator, string][] = [
	['validateTableData', validateTableData as ArrayValidator, '_data'],
	['validateTableDataFoot', validateTableDataFoot as ArrayValidator, '_dataFoot'],
	['validateToolbarItems', validateToolbarItems as ArrayValidator, '_items'],
];

describe('legacy array prop validators', () => {
	let debugSpy: jest.SpiedFunction<typeof Log.debug>;

	beforeEach(() => {
		debugSpy = jest.spyOn(Log, 'debug');
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe.each(objectArrayValidators)('%s', (_name, validate, propName) => {
		const items = [{ id: 1 }, { id: 2 }];

		it('stores an array of objects', () => {
			const component = createLegacyComponent();
			validate(component, items);
			expect(component.state[propName]).toBe(items);
		});

		it('parses a JSON string', () => {
			const component = createLegacyComponent();
			validate(component, JSON.stringify(items));
			expect(component.state[propName]).toEqual(items);
		});

		it('stores an empty array for undefined', () => {
			const component = createLegacyComponent({ [propName]: items });
			validate(component, undefined);
			expect(component.state[propName]).toEqual([]);
		});

		it.each([[''], ['[object Object]'], ['text'], [[{ id: 1 }, null]], [[1]], ['{"id":1}']])('silently keeps the state for %p', (value) => {
			const component = createLegacyComponent({ [propName]: items });
			validate(component, value as string);
			expect(component.state[propName]).toBe(items);
			expect(debugSpy).not.toHaveBeenCalled();
		});
	});

	describe.each([
		['validateTableData', validateTableData, '_data'],
		['validateTableDataFoot', validateTableDataFoot, '_dataFoot'],
	])('%s with hooks', (_name, validate, propName) => {
		it('passes the hooks to setState', () => {
			const afterPatch = jest.fn<Generic.Element.StateHooksCallback>();
			const component = createLegacyComponent();
			const data: KoliBriTableDataType[] = [{ id: 1 }];
			validate(component, data, { afterPatch });
			expect(afterPatch).toHaveBeenCalledWith(data, component.state, component, propName);
		});
	});

	describe('validateToolbarItems', () => {
		it('stores toolbar items', () => {
			const component = createLegacyComponent();
			const items = [{ _label: 'Button', type: 'button' }] as ToolbarItemsPropType;
			validateToolbarItems(component, items);
			expect(component.state._items).toBe(items);
		});
	});

	describe('validateOptions', () => {
		it.each([
			[[{ label: 'Option A', value: 'a' }], [{ label: 'Option A', value: 'a' }]],
			['[{"label":"Option A","value":"a"}]', [{ label: 'Option A', value: 'a' }]],
			[[], []],
			[undefined, []],
		])('stores %p as %p', (value, expected) => {
			const component = createLegacyComponent();
			validateOptions(component, value as OptionsPropType);
			expect(component.state._options).toEqual(expected);
		});

		// Known difference to `validateOptionsWithOptgroup`: a number label is invalid here.
		it.each([[[{ label: '', value: 'a' }]], [[{ label: 1, value: 1 }]], [[{ value: 'a' }]], [[null]], ['{"label":"A"}']])(
			'keeps the state and logs the error for %p',
			(value) => {
				const component = createLegacyComponent({ _options: [] });
				validateOptions(component, value as OptionsPropType);
				expect(component.state._options).toEqual([]);
				expect(debugSpy).toHaveBeenCalledWith(expect.any(Error));
			},
		);

		it.each([[''], ['[object Object]']])('ignores the string "%s" silently', (value) => {
			const component = createLegacyComponent({ _options: [] });
			validateOptions(component, value);
			expect(component.state._options).toEqual([]);
			expect(debugSpy).not.toHaveBeenCalled();
		});

		it('passes the options to watchJsonArrayString', () => {
			const afterPatch = jest.fn<Generic.Element.StateHooksCallback>();
			const component = createLegacyComponent();
			validateOptions(component, [{ label: 'Option A', value: 'a' }], { hooks: { afterPatch } });
			expect(afterPatch).toHaveBeenCalledWith([{ label: 'Option A', value: 'a' }], component.state, component, '_options');
		});
	});

	describe('validateOptionsWithOptgroup', () => {
		it('stores options and optgroups normalized by validateInputSelectOptions', () => {
			const component = createLegacyComponent();
			validateOptionsWithOptgroup(component, [
				{ label: ' Option A ', value: 'a' },
				{ label: 'Group', options: [{ label: 2, value: 2 }] },
			] as OptionsWithOptgroupPropType);
			expect(component.state._options).toEqual([
				{ disabled: false, label: 'Option A', value: 'a' },
				{ disabled: false, label: 'Group', options: [{ label: 2, value: 2 }] },
			]);
		});

		it('keeps the state for an optgroup with an invalid option', () => {
			const component = createLegacyComponent({ _options: [] });
			validateOptionsWithOptgroup(component, [{ label: 'Group', options: [{ value: 'a' }] }] as unknown as OptionsWithOptgroupPropType);
			expect(component.state._options).toEqual([]);
			expect(debugSpy).toHaveBeenCalledWith(expect.any(Error));
		});
	});

	describe('validateSuggestions', () => {
		const suggestionHints = (): string[] => getLoggedMessages(debugSpy.mock.calls).filter((message) => message.startsWith('Property suggestions'));

		it('stores an empty list without an a11y hint', () => {
			const component = createLegacyComponent();
			validateSuggestions(component, []);
			expect(component.state._suggestions).toEqual([]);
			expect(suggestionHints()).toEqual([]);
		});

		// `a11yHint` logs a message only once per module instance, so the hint is checked in the first test that stores suggestions.
		it('stores strings and numbers and gives an a11y hint', () => {
			const component = createLegacyComponent();
			validateSuggestions(component, '["a",1]');
			expect(component.state._suggestions).toEqual(['a', 1]);
			expect(suggestionHints()).toHaveLength(1);
		});

		it.each([[[true]], [[{}]], [['a', null]]])('keeps the state for %p', (value) => {
			const component = createLegacyComponent({ _suggestions: [] });
			validateSuggestions(component, value as unknown as SuggestionsPropType);
			expect(component.state._suggestions).toEqual([]);
		});
	});
});
