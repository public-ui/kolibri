import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

import { createLegacyComponent, getInvalidValueWarnings, getLoggedMessages } from '../../utils/testing/legacy-component';
import type { AlignPropType } from '../props/align';
import type { Optgroup, Option, SelectOption } from '../types/input/types';
import { Log } from '../utils/dev.utils';
import { validateAccessAndShortKey } from './access-and-short-key';
import { validateAlignment } from './alignment';
import { isObject, isString, isStyle, STATE_CHANGE_EVENT } from './common';
import { validateInputSelectOptions } from './options';

describe('schema validators', () => {
	let debugSpy: jest.SpiedFunction<typeof Log.debug>;

	beforeEach(() => {
		debugSpy = jest.spyOn(Log, 'debug');
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('validateAccessAndShortKey', () => {
		it.each([
			[undefined, undefined],
			['a', undefined],
			[undefined, 's'],
			['', 's'],
			['a', ''],
		])('accepts the access key %p with the short key %p', (accessKey, shortKey) => {
			expect(() => validateAccessAndShortKey(accessKey, shortKey)).not.toThrow();
		});

		it('throws when both keys are set', () => {
			expect(() => validateAccessAndShortKey('a', 's')).toThrow('AccessKey and ShortKey are used. Only one is allowed.');
		});
	});

	describe('validateAlignment', () => {
		it.each([['bottom'], ['left'], ['right'], ['top']])('stores "%s"', (value) => {
			const component = createLegacyComponent();
			validateAlignment(component, '_align', value as AlignPropType);
			expect(component.state._align).toBe(value);
		});

		it('stores the default "top" for undefined', () => {
			const component = createLegacyComponent({ _align: 'left' });
			validateAlignment(component, '_align', undefined);
			expect(component.state._align).toBe('top');
		});

		it('keeps the state and warns for an unknown value', () => {
			const component = createLegacyComponent({ _alignInvalid: 'left' });
			validateAlignment(component, '_alignInvalid', 'center' as AlignPropType);
			expect(component.state._alignInvalid).toBe('left');
			expect(getInvalidValueWarnings(debugSpy.mock.calls, '_alignInvalid')).toEqual([
				expect.stringContaining('Allowed values are: left, right, top, bottom, '),
			]);
		});
	});

	describe('isObject', () => {
		it.each([[{}], [[]], [new Date()]])('accepts %p', (value) => {
			expect(isObject(value)).toBe(true);
		});

		it.each([[null], [undefined], ['{}'], [1], [() => undefined]])('rejects %p', (value) => {
			expect(isObject(value)).toBe(false);
		});
	});

	describe('isString', () => {
		it.each([
			['', undefined, true],
			['', 1, false],
			['a', 1, true],
			['ab', 3, false],
			['abc', 3, true],
			[1, 0, false],
			[undefined, 0, false],
		])('isString(%p, %p) is %p', (value, minLength, expected) => {
			expect(isString(value, minLength)).toBe(expected);
		});
	});

	describe('isStyle', () => {
		it.each([[{}], [{ color: 'red' }], [{ color: '' }], ['color: red']])('accepts %p', (value) => {
			expect(isStyle(value as Record<string, string>)).toBe(true);
		});

		it.each([[''], [undefined], [null], [1]])('rejects %p', (value) => {
			expect(isStyle(value as unknown as Record<string, string>)).toBe(false);
		});
	});

	describe('STATE_CHANGE_EVENT', () => {
		it('is a shared StateChange event', () => {
			expect(STATE_CHANGE_EVENT).toBeInstanceOf(Event);
			expect(STATE_CHANGE_EVENT.type).toBe('StateChange');
		});
	});

	describe('validateInputSelectOptions', () => {
		const a11yHints = (): string[] => getLoggedMessages(debugSpy.mock.calls).filter((message) => message.includes('A differing Aria-Label'));

		it('accepts an option with a string label and normalizes it in place', () => {
			const option: Option<string> = { label: '  Option A  ', value: 'a' };
			expect(validateInputSelectOptions(option)).toBe(true);
			expect(option).toEqual({ disabled: false, label: 'Option A', value: 'a' });
		});

		it('keeps disabled: true', () => {
			const option: Option<string> = { disabled: true, label: 'Option B', value: 'b' };
			expect(validateInputSelectOptions(option)).toBe(true);
			expect(option.disabled).toBe(true);
		});

		it('coerces a non-boolean disabled value to false', () => {
			const option = { disabled: 'true', label: 'Option C', value: 'c' } as unknown as Option<string>;
			validateInputSelectOptions(option);
			expect(option.disabled).toBe(false);
		});

		it('accepts a number label without normalizing the option', () => {
			const option = { label: 1, value: 1 } as unknown as Option<number>;
			expect(validateInputSelectOptions(option)).toBe(true);
			expect(option).toEqual({ label: 1, value: 1 });
		});

		it.each([[null], [undefined], ['Option'], [{ value: 'a' }], [{ label: '', value: 'a' }], [{ label: true, value: 'a' }]])('rejects %p', (option) => {
			expect(validateInputSelectOptions(option as unknown as SelectOption<string>)).toBe(false);
		});

		it('accepts an optgroup whose options are all valid', () => {
			const optgroup = {
				label: 'Group',
				options: [
					{ label: 'One', value: 1 },
					{ label: 2, value: 2 },
				],
			} as unknown as Optgroup<number>;
			expect(validateInputSelectOptions(optgroup)).toBe(true);
		});

		it('rejects an optgroup with an invalid option', () => {
			const optgroup = { label: 'Group', options: [{ label: 'One', value: 1 }, { value: 2 }] } as unknown as Optgroup<number>;
			expect(validateInputSelectOptions(optgroup)).toBe(false);
		});

		it('gives an a11y hint for a label with fewer than three readable characters', () => {
			expect(validateInputSelectOptions({ label: 'Ab!', value: 'short' })).toBe(true);
			expect(a11yHints()).toEqual([expect.stringContaining('(Ab!)')]);
		});

		it('gives no a11y hint for a label of numbers only', () => {
			expect(validateInputSelectOptions({ label: '7', value: 7 })).toBe(true);
			expect(a11yHints()).toEqual([]);
		});
	});
});
