import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { Generic } from 'adopted-style-sheets';

import { createLegacyComponent, getInvalidValueWarnings, getLoggedMessages } from '../../utils/testing/legacy-component';
import { Log, setExperimentalMode } from './dev.utils';
import {
	emptyStringByArrayHandler,
	KoliBriDevHelper,
	koliBriQuerySelector,
	koliBriQuerySelectorAll,
	mapBoolean2String,
	mapStringOrBoolean2String,
	objectObjectHandler,
	parseJson,
	setEventTarget,
	setState,
	stringifyJson,
	watchBoolean,
	watchJsonArrayString,
	watchNumber,
	watchString,
	watchValidator,
} from './prop.validators';

type DebugSpy = jest.SpiedFunction<typeof Log.debug>;

const isString = (value?: unknown): boolean => typeof value === 'string';

describe('legacy watch helpers', () => {
	let debugSpy: DebugSpy;

	beforeEach(() => {
		debugSpy = jest.spyOn(Log, 'debug');
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	const warningsFor = (propName: string): string[] => getInvalidValueWarnings(debugSpy.mock.calls, propName);

	describe('objectObjectHandler', () => {
		it.each([['[object Object]'], ['prefix [object Object] suffix']])('skips the callback for the string "%s"', (value) => {
			const callback = jest.fn();
			objectObjectHandler(value, callback);
			expect(callback).not.toHaveBeenCalled();
		});

		it.each([[''], ['text'], [undefined], [null], [{}], [[]]])('runs the callback for %p', (value) => {
			const callback = jest.fn();
			objectObjectHandler(value, callback);
			expect(callback).toHaveBeenCalledTimes(1);
		});
	});

	describe('emptyStringByArrayHandler', () => {
		it('skips the callback for an empty string', () => {
			const callback = jest.fn();
			emptyStringByArrayHandler('', callback);
			expect(callback).not.toHaveBeenCalled();
		});

		it.each([[' '], ['[]'], [undefined], [null], [[]]])('runs the callback for %p', (value) => {
			const callback = jest.fn();
			emptyStringByArrayHandler(value, callback);
			expect(callback).toHaveBeenCalledTimes(1);
		});
	});

	describe('setState', () => {
		it('merges the value into the state and removes the pending maps', () => {
			const component = createLegacyComponent({ _other: 'kept' });
			setState(component, '_value', 'next');
			expect(component.state).toEqual({ _other: 'kept', _value: 'next' });
			expect(component.nextState).toBeUndefined();
			expect(component.nextHooks).toBeUndefined();
		});

		it('replaces the state object instead of mutating it', () => {
			const component = createLegacyComponent();
			const previous = component.state;
			setState(component, '_value', 1);
			expect(component.state).not.toBe(previous);
			expect(previous).toEqual({});
		});

		it.each([[undefined], [null]])('stores %p as an own state key', (value) => {
			const component = createLegacyComponent({ _value: 'old' });
			setState(component, '_value', value);
			expect(component.state).toHaveProperty('_value', value);
		});

		it('calls beforePatch with the next value, the next state map, the host and the key', () => {
			const component = createLegacyComponent();
			const beforePatch = jest.fn<Generic.Element.NextStateHooksCallback>();
			setState(component, '_value', 'next', { beforePatch });
			expect(beforePatch).toHaveBeenCalledTimes(1);
			const [nextValue, nextState, host, key] = beforePatch.mock.calls[0];
			expect(nextValue).toBe('next');
			expect(nextState).toBeInstanceOf(Map);
			expect(host).toBe(component);
			expect(key).toBe('_value');
		});

		it('calls beforePatch before the state is patched', () => {
			const component = createLegacyComponent({ _value: 'old' });
			const seen: unknown[] = [];
			setState(component, '_value', 'next', {
				beforePatch: (_nextValue, _nextState, host) => {
					seen.push(host.state._value);
				},
			});
			expect(seen).toEqual(['old']);
		});

		it('lets beforePatch replace the next value', () => {
			const component = createLegacyComponent();
			setState(component, '_value', 'raw', {
				beforePatch: (nextValue, nextState) => {
					nextState.set('_value', `${nextValue as string}-normalized`);
				},
			});
			expect(component.state._value).toBe('raw-normalized');
		});

		it('lets beforePatch discard the change; afterPatch is then not called', () => {
			const component = createLegacyComponent({ _value: 'old' });
			const afterPatch = jest.fn<Generic.Element.StateHooksCallback>();
			setState(component, '_value', 'next', {
				afterPatch,
				beforePatch: (_nextValue, nextState) => {
					nextState.delete('_value');
				},
			});
			expect(component.state).toEqual({ _value: 'old' });
			expect(afterPatch).not.toHaveBeenCalled();
			expect(component.nextHooks).toBeUndefined();
		});

		it('calls afterPatch with the patched value, the new state, the host and the key', () => {
			const component = createLegacyComponent({ _other: true });
			const afterPatch = jest.fn<Generic.Element.StateHooksCallback>();
			setState(component, '_value', 'next', { afterPatch });
			expect(afterPatch).toHaveBeenCalledTimes(1);
			expect(afterPatch).toHaveBeenCalledWith('next', { _other: true, _value: 'next' }, component, '_value');
			expect(afterPatch.mock.calls[0][1]).toBe(component.state);
		});

		it('ignores hooks that are no functions', () => {
			const component = createLegacyComponent();
			setState(component, '_value', 'next', { afterPatch: 'no function' as unknown as Generic.Element.StateHooksCallback });
			expect(component.state._value).toBe('next');
		});
	});

	describe('watchValidator', () => {
		it('stores a valid value', () => {
			const component = createLegacyComponent();
			watchValidator(component, '_wvValid', isString, new Set(['String']), 'text');
			expect(component.state._wvValid).toBe('text');
			expect(warningsFor('_wvValid')).toEqual([]);
		});

		it('keeps the state and logs a warning with the allowed values for an invalid value', () => {
			const component = createLegacyComponent({ _wvInvalid: 'old' });
			watchValidator(component, '_wvInvalid', isString, new Set(['String']), 42 as unknown as string);
			expect(component.state).toEqual({ _wvInvalid: 'old' });
			const [warning] = warningsFor('_wvInvalid');
			expect(warning).toBe(`[${component.constructor.name}] The property value: (42) for '_wvInvalid' is not valid. Allowed values are: String, `);
		});

		it('adds null to the allowed values of an optional prop', () => {
			const allowed = new Set<string | null | undefined>(['String']);
			watchValidator(createLegacyComponent(), '_wvOptional', isString, allowed, 42 as unknown as string);
			expect(Array.from(allowed)).toEqual(['String', null]);
		});

		it('does not add null to the allowed values of a required prop', () => {
			const allowed = new Set<string | null | undefined>(['String']);
			watchValidator(createLegacyComponent(), '_wvRequired', isString, allowed, 42 as unknown as string, { required: true });
			expect(Array.from(allowed)).toEqual(['String']);
			expect(warningsFor('_wvRequired')).toHaveLength(1);
		});

		it('stores the default value for undefined', () => {
			const component = createLegacyComponent({ _wvDefault: 'old' });
			watchValidator(component, '_wvDefault', isString, new Set(['String']), undefined, { defaultValue: 'fallback' });
			expect(component.state._wvDefault).toBe('fallback');
		});

		it('keeps the state and warns for undefined without a default value', () => {
			const component = createLegacyComponent({ _wvNoDefault: 'old' });
			watchValidator(component, '_wvNoDefault', isString, new Set(['String']), undefined);
			expect(component.state._wvNoDefault).toBe('old');
			expect(warningsFor('_wvNoDefault')).toHaveLength(1);
		});

		it('keeps the state and warns for undefined with an invalid default value', () => {
			const component = createLegacyComponent();
			watchValidator(component, '_wvBadDefault', isString, new Set(['String']), undefined, { defaultValue: 1 });
			expect(component.state).toEqual({});
			expect(warningsFor('_wvBadDefault')).toHaveLength(1);
		});

		it('ignores the default value of a required prop', () => {
			const component = createLegacyComponent();
			watchValidator(component, '_wvRequiredDefault', isString, new Set(['String']), undefined, { defaultValue: 'fallback', required: true });
			expect(component.state).toEqual({});
			expect(warningsFor('_wvRequiredDefault')).toHaveLength(1);
		});

		it('stores undefined when the validation function accepts it', () => {
			const component = createLegacyComponent({ _wvUndefined: 'old' });
			watchValidator(component, '_wvUndefined', () => true, new Set(['any']), undefined, { defaultValue: 'fallback' });
			expect(component.state).toHaveProperty('_wvUndefined', undefined);
		});

		// The inline comment of `watchValidator` mentions "UNDEFINED oder NULL", but only `undefined` falls back to the default value.
		it('treats null as an invalid value and does not use the default value', () => {
			const component = createLegacyComponent({ _wvNull: 'old' });
			watchValidator(component, '_wvNull', isString, new Set(['String']), null as unknown as string, { defaultValue: 'fallback' });
			expect(component.state._wvNull).toBe('old');
			expect(warningsFor('_wvNull')).toHaveLength(1);
		});

		it('passes the hooks to setState for a valid value and for the default value', () => {
			const afterPatch = jest.fn<Generic.Element.StateHooksCallback>();
			const beforePatch = jest.fn<Generic.Element.NextStateHooksCallback>();
			const component = createLegacyComponent();
			watchValidator(component, '_wvHooks', isString, new Set(['String']), 'text', { hooks: { afterPatch, beforePatch } });
			watchValidator(component, '_wvHooks', isString, new Set(['String']), undefined, { defaultValue: 'fallback', hooks: { afterPatch, beforePatch } });
			expect(beforePatch.mock.calls.map(([value]) => value)).toEqual(['text', 'fallback']);
			expect(afterPatch.mock.calls.map(([value]) => value)).toEqual(['text', 'fallback']);
		});

		it('does not call the hooks for an invalid value', () => {
			const afterPatch = jest.fn<Generic.Element.StateHooksCallback>();
			const beforePatch = jest.fn<Generic.Element.NextStateHooksCallback>();
			watchValidator(createLegacyComponent(), '_wvNoHooks', isString, new Set(['String']), 1 as unknown as string, { hooks: { afterPatch, beforePatch } });
			expect(beforePatch).not.toHaveBeenCalled();
			expect(afterPatch).not.toHaveBeenCalled();
		});

		it('logs an identical warning only once', () => {
			const component = createLegacyComponent();
			watchValidator(component, '_wvOnce', isString, new Set(['String']), 1 as unknown as string);
			watchValidator(component, '_wvOnce', isString, new Set(['String']), 1 as unknown as string);
			expect(warningsFor('_wvOnce')).toHaveLength(1);
		});
	});

	describe('watchBoolean', () => {
		it.each([[true], [false]])('stores %p', (value) => {
			const component = createLegacyComponent();
			watchBoolean(component, '_wbValid', value);
			expect(component.state._wbValid).toBe(value);
		});

		it.each([['true'], [1], [null]])('rejects %p and warns', (value) => {
			const propName = '_wbInvalid';
			const component = createLegacyComponent({ [propName]: true });
			watchBoolean(component, propName, value as unknown as boolean);
			expect(component.state[propName]).toBe(true);
			expect(warningsFor(propName)).toEqual([expect.stringContaining('Allowed values are: Boolean {true, false}, ')]);
		});

		// An optional boolean that is unset again keeps its previous state value.
		it('keeps the previous value and warns for undefined without a default value', () => {
			const component = createLegacyComponent({ _wbUndefined: true });
			watchBoolean(component, '_wbUndefined', undefined);
			expect(component.state._wbUndefined).toBe(true);
			expect(warningsFor('_wbUndefined')).toHaveLength(1);
		});

		it('stores the default value for undefined', () => {
			const component = createLegacyComponent({ _wbDefault: true });
			watchBoolean(component, '_wbDefault', undefined, { defaultValue: false });
			expect(component.state._wbDefault).toBe(false);
		});

		it('rejects null as default value', () => {
			const component = createLegacyComponent();
			watchBoolean(component, '_wbNullDefault', undefined, { defaultValue: null });
			expect(component.state).toEqual({});
			expect(warningsFor('_wbNullDefault')).toHaveLength(1);
		});
	});

	describe('watchString', () => {
		it.each([[''], ['text']])('stores %p without length limits', (value) => {
			const component = createLegacyComponent();
			watchString(component, '_wsValid', value);
			expect(component.state._wsValid).toBe(value);
		});

		it.each([[1], [true], [null], [{}]])('rejects %p and warns', (value) => {
			const propName = '_wsInvalid';
			const component = createLegacyComponent();
			watchString(component, propName, value as unknown as string);
			expect(component.state).toEqual({});
			expect(warningsFor(propName)).toEqual([expect.stringContaining('Allowed values are: String, ')]);
		});

		it('applies minLength', () => {
			const component = createLegacyComponent();
			watchString(component, '_wsMin', 'ab', { minLength: 3 });
			expect(component.state).toEqual({});
			watchString(component, '_wsMin', 'abc', { minLength: 3 });
			expect(component.state._wsMin).toBe('abc');
		});

		it('applies maxLength', () => {
			const component = createLegacyComponent();
			watchString(component, '_wsMax', 'abcd', { maxLength: 3 });
			expect(component.state).toEqual({});
			watchString(component, '_wsMax', 'abc', { maxLength: 3 });
			expect(component.state._wsMax).toBe('abc');
		});

		it('stores the default value for undefined', () => {
			const component = createLegacyComponent();
			watchString(component, '_wsDefault', undefined, { defaultValue: 'fallback' });
			expect(component.state._wsDefault).toBe('fallback');
		});

		it('validates the default value against the length limits', () => {
			const component = createLegacyComponent();
			watchString(component, '_wsShortDefault', undefined, { defaultValue: '', minLength: 1 });
			expect(component.state).toEqual({});
			expect(warningsFor('_wsShortDefault')).toHaveLength(1);
		});

		it('warns for a required string that is undefined', () => {
			const component = createLegacyComponent();
			watchString(component, '_wsRequired', undefined, { required: true });
			expect(component.state).toEqual({});
			expect(warningsFor('_wsRequired')).toEqual([expect.stringMatching(/Allowed values are: String$/)]);
		});
	});

	describe('watchNumber', () => {
		it.each([[0], [-1], [1.5]])('stores %p without limits', (value) => {
			const component = createLegacyComponent();
			watchNumber(component, '_wnValid', value);
			expect(component.state._wnValid).toBe(value);
		});

		it.each([['1'], [null], [true]])('rejects %p and warns', (value) => {
			const propName = '_wnInvalid';
			const component = createLegacyComponent();
			watchNumber(component, propName, value as unknown as number);
			expect(component.state).toEqual({});
			expect(warningsFor(propName)).toEqual([expect.stringContaining('Allowed values are: Number, ')]);
		});

		it('applies min and max inclusively', () => {
			const component = createLegacyComponent();
			watchNumber(component, '_wnRange', 0, { max: 5, min: 1 });
			expect(component.state).toEqual({});
			watchNumber(component, '_wnRange', 6, { max: 5, min: 1 });
			expect(component.state).toEqual({});
			watchNumber(component, '_wnRange', 1, { max: 5, min: 1 });
			expect(component.state._wnRange).toBe(1);
			watchNumber(component, '_wnRange', 5, { max: 5, min: 1 });
			expect(component.state._wnRange).toBe(5);
		});

		it('stores the default value for undefined', () => {
			const component = createLegacyComponent();
			watchNumber(component, '_wnDefault', undefined, { defaultValue: 3 });
			expect(component.state._wnDefault).toBe(3);
		});

		// `typeof NaN === 'number'`: without limits NaN passes the validation.
		it('accepts NaN without limits and rejects it with a limit', () => {
			const component = createLegacyComponent();
			watchNumber(component, '_wnNaN', NaN);
			expect(component.state._wnNaN).toBeNaN();
			const limited = createLegacyComponent();
			watchNumber(limited, '_wnNaNLimited', NaN, { min: 0 });
			expect(limited.state).toEqual({});
		});
	});

	describe('watchJsonArrayString', () => {
		it('stores a valid array', () => {
			const component = createLegacyComponent();
			watchJsonArrayString(component, '_list', isString, ['a', 'b']);
			expect(component.state._list).toEqual(['a', 'b']);
		});

		it('parses a JSON string', () => {
			const component = createLegacyComponent();
			watchJsonArrayString(component, '_list', isString, '["a","b"]');
			expect(component.state._list).toEqual(['a', 'b']);
		});

		it('parses a JSON string with single quotes', () => {
			const component = createLegacyComponent();
			watchJsonArrayString(component, '_list', isString, "['a','b']");
			expect(component.state._list).toEqual(['a', 'b']);
		});

		it('stores an empty array for undefined', () => {
			const component = createLegacyComponent({ _list: ['old'] });
			watchJsonArrayString(component, '_list', isString, undefined);
			expect(component.state._list).toEqual([]);
		});

		it.each([[''], ['[object Object]']])('ignores the string "%s" without logging', (value) => {
			const component = createLegacyComponent({ _list: ['old'] });
			watchJsonArrayString(component, '_list', isString, value);
			expect(component.state._list).toEqual(['old']);
			expect(debugSpy).not.toHaveBeenCalled();
		});

		it('keeps the state and logs the error for an invalid item', () => {
			const component = createLegacyComponent({ _list: ['old'] });
			watchJsonArrayString(component, '_list', isString, ['a', 1] as unknown as string[]);
			expect(component.state._list).toEqual(['old']);
			expect(debugSpy).toHaveBeenCalledWith(1);
			expect(debugSpy).toHaveBeenCalledWith(expect.any(Error));
		});

		it('keeps the state silently for an item that is the string "[object Object]"', () => {
			const component = createLegacyComponent({ _list: ['old'] });
			watchJsonArrayString(component, '_list', (item: unknown) => typeof item === 'number', ['[object Object]'] as unknown as number[]);
			expect(component.state._list).toEqual(['old']);
			expect(debugSpy).not.toHaveBeenCalled();
		});

		// `Array.prototype.find` returns `undefined` both for "no invalid item" and for an invalid `undefined` item.
		it('accepts an undefined item although the item validation rejects it', () => {
			const itemValidation = jest.fn((item: unknown) => typeof item === 'string');
			const component = createLegacyComponent();
			watchJsonArrayString(component, '_list', itemValidation, ['a', undefined] as unknown as string[]);
			expect(itemValidation).toHaveReturnedWith(false);
			expect(component.state._list).toEqual(['a', undefined]);
		});

		it('keeps the state when the array validation fails', () => {
			const component = createLegacyComponent({ _list: ['old'] });
			const arrayValidation = jest.fn((items: string[]) => items.length > 2);
			watchJsonArrayString(component, '_list', isString, ['a'], arrayValidation);
			expect(arrayValidation).toHaveBeenCalledWith(['a']);
			expect(component.state._list).toEqual(['old']);
		});

		it.each([['plain text'], [{ a: 1 }], ['{"a":1}']])('keeps the state and logs the error for the non-array %p', (value) => {
			const component = createLegacyComponent({ _list: ['old'] });
			watchJsonArrayString(component, '_list', isString, value as unknown as string);
			expect(component.state._list).toEqual(['old']);
			expect(debugSpy).toHaveBeenCalledWith(expect.any(Error));
		});

		it('passes the hooks to setState', () => {
			const afterPatch = jest.fn<Generic.Element.StateHooksCallback>();
			const component = createLegacyComponent();
			watchJsonArrayString(component, '_list', isString, '["a"]', undefined, { hooks: { afterPatch } });
			expect(afterPatch).toHaveBeenCalledWith(['a'], { _list: ['a'] }, component, '_list');
		});

		it('ignores the default value and the required option for undefined', () => {
			const component = createLegacyComponent();
			watchJsonArrayString(component, '_list', isString, undefined, undefined, { defaultValue: ['fallback'], required: true });
			expect(component.state._list).toEqual([]);
		});
	});

	describe('parseJson', () => {
		it.each([
			['{"a":1}', { a: 1 }],
			['[1,2]', [1, 2]],
			["{'a':'b'}", { a: 'b' }],
			["['a']", ['a']],
			['null', null],
			['true', true],
			['0', 0],
			['"text"', 'text'],
		])('parses %p', (value, expected) => {
			expect(parseJson(value)).toEqual(expected);
		});

		it.each([[undefined], [null], [1], [{ a: 1 }], [['a']]])('throws for the non-string %p', (value) => {
			expect(() => parseJson(value)).toThrow();
		});

		it('throws silently for a string that does not start with { or [', () => {
			const errorSpy = jest.spyOn(Log, 'error').mockImplementation(() => undefined);
			expect(() => parseJson('plain text')).toThrow();
			expect(errorSpy).not.toHaveBeenCalled();
		});

		it('logs and throws for an object or array string that cannot be parsed', () => {
			const errorSpy = jest.spyOn(Log, 'error').mockImplementation(() => undefined);
			const warnSpy = jest.spyOn(Log, 'warn').mockImplementation(() => undefined);
			expect(() => parseJson('{broken')).toThrow();
			expect(warnSpy).toHaveBeenCalledWith(['parseJson', '{broken']);
			expect(getLoggedMessages(errorSpy.mock.calls)).toEqual([expect.stringContaining('The JSON string could not be parsed.')]);
		});
	});

	describe('stringifyJson', () => {
		it('stringifies with single quotes', () => {
			expect(stringifyJson({ a: 'b', c: [1] })).toBe("{'a':'b','c':[1]}");
		});

		it('logs and throws for a value that cannot be stringified', () => {
			const errorSpy = jest.spyOn(Log, 'error').mockImplementation(() => undefined);
			const warnSpy = jest.spyOn(Log, 'warn').mockImplementation(() => undefined);
			const circular: Record<string, unknown> = {};
			circular.self = circular;
			expect(() => stringifyJson(circular)).toThrow();
			expect(warnSpy).toHaveBeenCalledWith(['stringifyJson', circular]);
			expect(errorSpy).toHaveBeenCalledTimes(1);
		});

		it('is exposed by KoliBriDevHelper', () => {
			expect(KoliBriDevHelper.stringifyJson).toBe(stringifyJson);
			expect(KoliBriDevHelper.querySelector).toBe(koliBriQuerySelector);
			expect(KoliBriDevHelper.querySelectorAll).toBe(koliBriQuerySelectorAll);
		});
	});

	describe('mapBoolean2String', () => {
		it.each([
			[true, 'true'],
			[false, 'false'],
			[undefined, undefined],
			['true', undefined],
		])('maps %p to %p', (value, expected) => {
			expect(mapBoolean2String(value as boolean)).toBe(expected);
		});
	});

	describe('mapStringOrBoolean2String', () => {
		it.each([
			['', ''],
			['text', 'text'],
			[true, 'true'],
			[false, 'false'],
			[undefined, undefined],
			[1, undefined],
		])('maps %p to %p', (value, expected) => {
			expect(mapStringOrBoolean2String(value as string)).toBe(expected);
		});
	});

	describe('setEventTarget', () => {
		afterEach(() => {
			setExperimentalMode(false);
		});

		it('defines a read-only target', () => {
			const event = new Event('click');
			const target = document.createElement('button');
			setEventTarget(event, target);
			expect(event.target).toBe(target);
			expect(Object.getOwnPropertyDescriptor(event, 'target')).toMatchObject({ value: target, writable: false });
		});

		it('logs the event and the target in the experimental mode only', () => {
			const target = document.createElement('button');
			setEventTarget(new Event('click'), target);
			expect(debugSpy).not.toHaveBeenCalled();
			setExperimentalMode(true);
			const event = new Event('submit');
			setEventTarget(event, target);
			expect(debugSpy).toHaveBeenCalledWith([event, target]);
		});
	});
});
