import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { Generic } from 'adopted-style-sheets';

import { createLegacyComponent, getInvalidValueWarnings, getLoggedMessages } from '../../utils/testing/legacy-component';
import { Log } from '../utils/dev.utils';
import type { WatchNumberOptions } from '../utils/prop.validators';
import { validateCurrentLength } from './current-length';
import { validateMax } from './max';
import { validateMaxLength } from './max-length';
import { validateRows } from './rows';
import { validateTabIndex } from './tab-index';

type NumberValidator = (component: Generic.Element.Component, value?: number, options?: WatchNumberOptions) => void;

/**
 * Validators that delegate to `watchNumber`, with their smallest valid value.
 *
 * Known difference to the skeleton props of the same name (`internal/props`, `normalizeNumber` and
 * `normalizeInteger`): the legacy validators reject number strings such as '3' instead of parsing them.
 */
const validators: [string, NumberValidator, string, number | undefined][] = [
	['validateCurrentLength', validateCurrentLength, '_currentLength', undefined],
	['validateMax', validateMax, '_max', undefined],
	['validateMaxLength', validateMaxLength, '_maxLength', 0],
	['validateRows', validateRows, '_rows', 1],
	['validateTabIndex', validateTabIndex, '_tabIndex', undefined],
];

describe('legacy number prop validators', () => {
	let debugSpy: jest.SpiedFunction<typeof Log.debug>;

	beforeEach(() => {
		debugSpy = jest.spyOn(Log, 'debug');
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('validateTabIndex', () => {
		const tabIndexHints = (): string[] => getLoggedMessages(debugSpy.mock.calls).filter((message) => message.startsWith("Don't Use Tabindex Greater than 0"));

		it.each([[-1], [0]])('gives no a11y hint for %p', (value) => {
			validateTabIndex(createLegacyComponent(), value);
			expect(tabIndexHints()).toEqual([]);
		});

		// `a11yHint` logs a message only once per module instance, so this block runs before the table below sets 3.
		it('gives an a11y hint for any other value', () => {
			validateTabIndex(createLegacyComponent(), 1);
			expect(tabIndexHints()).toHaveLength(1);
		});
	});

	describe.each(validators)('%s', (_name, validate, propName, min) => {
		it('stores a number', () => {
			const component = createLegacyComponent();
			validate(component, 3);
			expect(component.state[propName]).toBe(3);
		});

		it('keeps the state and warns for a number string', () => {
			const component = createLegacyComponent({ [propName]: 2 });
			validate(component, '3' as unknown as number);
			expect(component.state[propName]).toBe(2);
			expect(getInvalidValueWarnings(debugSpy.mock.calls, propName)).toHaveLength(1);
		});

		it('keeps the state and warns for undefined', () => {
			const component = createLegacyComponent({ [propName]: 2 });
			validate(component, undefined);
			expect(component.state[propName]).toBe(2);
			expect(getInvalidValueWarnings(debugSpy.mock.calls, propName)).toHaveLength(1);
		});

		if (min === undefined) {
			it('accepts negative numbers', () => {
				const component = createLegacyComponent();
				validate(component, -1);
				expect(component.state[propName]).toBe(-1);
			});
		} else {
			it(`accepts ${min} and rejects ${min - 1}`, () => {
				const component = createLegacyComponent();
				validate(component, min - 1);
				expect(component.state).toEqual({});
				validate(component, min);
				expect(component.state[propName]).toBe(min);
			});
		}
	});

	describe.each([
		['validateCurrentLength', validateCurrentLength, '_currentLength'],
		['validateMax', validateMax, '_max'],
		['validateMaxLength', validateMaxLength, '_maxLength'],
	] as [string, NumberValidator, string][])('%s with options', (_name, validate, propName) => {
		it('applies the limits and the default value of the options', () => {
			const component = createLegacyComponent();
			validate(component, 11, { max: 10 });
			expect(component.state).toEqual({});
			validate(component, undefined, { defaultValue: 5 });
			expect(component.state[propName]).toBe(5);
		});
	});

	describe('validateMaxLength', () => {
		it('lets the options override the minimum', () => {
			const component = createLegacyComponent();
			validateMaxLength(component, -1, { min: -1 });
			expect(component.state._maxLength).toBe(-1);
		});
	});
});
