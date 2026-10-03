import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { Generic } from 'adopted-style-sheets';

import type { HostInternals } from '../../utils/aria-labelledby';
import { createLegacyComponent, getInvalidValueWarnings, getLoggedMessages } from '../../utils/testing/legacy-component';
import { Log } from '../utils/dev.utils';
import type { WatchStringOptions } from '../utils/prop.validators';
import { validateAccept } from './accept';
import { validateAccessKey } from './access-key';
import { validateAlt } from './alt';
import { validateAriaControls } from './aria-controls';
import { validateAriaDescription } from './aria-description';
import { validateAriaDetails } from './aria-details';
import { validateAriaLabelledby } from './aria-labelledby';
import { validateAriaOwns } from './aria-owns';
import { validateBadgeText } from './badge-text';
import { validateCustomClass } from './custom-class';
import { validateDownload } from './download';
import { validateHint } from './hint';
import { validateHref } from './href';
import { validateId } from './id';
import { validateImageSizes } from './image-sizes';
import { validateImageSource } from './image-source';
import { validateImageSrcset } from './image-srcset';
import { containsOnlyNumbers, hasEnoughReadableChars, validateLabel, validateLabelWithExpertSlot } from './label';
import { validateLinkTarget } from './link-target';
import { validateName } from './name';
import { validatePattern } from './pattern';
import { validatePlaceholder } from './placeholder';
import { validateQuote } from './quote';
import { validateShortKey } from './short-key';
import { validateUnit } from './unit';
import { validateWidth } from './width';

type StringValidator = (component: Generic.Element.Component, value?: string, options?: WatchStringOptions) => void;

const KEEP = Symbol('keeps the previous state value');

/**
 * Validators that delegate to `watchString`, with the state value that `undefined` leads to.
 *
 * Known difference to the skeleton props of the same name (`internal/props`, `normalizeString`):
 * the legacy validators reject numbers and booleans instead of converting them to a string, and
 * `undefined` keeps the previous state value unless the validator has a default value.
 */
const validators: [string, StringValidator, string, string | typeof KEEP][] = [
	['validateAccept', validateAccept, '_accept', KEEP],
	['validateAccessKey', validateAccessKey, '_accessKey', KEEP],
	['validateAlt', validateAlt, '_alt', KEEP],
	['validateAriaControls', validateAriaControls, '_ariaControls', KEEP],
	['validateAriaDescription', validateAriaDescription, '_ariaDescription', KEEP],
	// `defaultValue: undefined` is no valid string, so it behaves like no default value.
	['validateAriaOwns', validateAriaOwns, '_ariaOwns', KEEP],
	['validateBadgeText', validateBadgeText, '_badgeText', KEEP],
	['validateCustomClass', validateCustomClass, '_customClass', ''],
	['validateDownload', validateDownload, '_download', KEEP],
	['validateHint', validateHint, '_hint', KEEP],
	['validateHref', validateHref, '_href', KEEP],
	['validateId', validateId, '_id', KEEP],
	['validateImageSizes', validateImageSizes, '_sizes', KEEP],
	['validateImageSource', validateImageSource, '_src', KEEP],
	['validateImageSrcset', validateImageSrcset, '_srcset', KEEP],
	['validateLabel', validateLabel, '_label', KEEP],
	['validateLinkTarget', validateLinkTarget, '_target', KEEP],
	['validateName', validateName, '_name', KEEP],
	['validatePattern', validatePattern, '_pattern', KEEP],
	['validatePlaceholder', validatePlaceholder, '_placeholder', KEEP],
	['validateQuote', validateQuote, '_quote', KEEP],
	['validateShortKey', validateShortKey, '_shortKey', KEEP],
	['validateUnit', validateUnit, '_unit', KEEP],
	['validateWidth', validateWidth, '_width', '100%'],
];

/**
 * Validators that pass their options through to `watchString`.
 */
const validatorsWithOptions: [string, StringValidator, string][] = [
	['validateAccept', validateAccept, '_accept'],
	['validateAlt', validateAlt, '_alt'],
	['validateHref', validateHref, '_href'],
	['validateImageSizes', validateImageSizes, '_sizes'],
	['validateImageSource', validateImageSource, '_src'],
	['validateImageSrcset', validateImageSrcset, '_srcset'],
	['validateName', validateName, '_name'],
	['validatePattern', validatePattern, '_pattern'],
	['validatePlaceholder', validatePlaceholder, '_placeholder'],
	['validateWidth', validateWidth, '_width'],
];

type IdrefValidator = (component: unknown, host: HTMLElement | undefined, internals: HostInternals | undefined, value?: string) => HTMLElement[];

/**
 * Validators of an IDREF list that resolve the referenced elements and assign them to the host internals.
 */
const idrefValidators: [string, IdrefValidator, string, 'ariaDetailsElements' | 'ariaLabelledByElements'][] = [
	['validateAriaDetails', validateAriaDetails, '_ariaDetails', 'ariaDetailsElements'],
	['validateAriaLabelledby', validateAriaLabelledby, '_ariaLabelledby', 'ariaLabelledByElements'],
];

describe('legacy string prop validators', () => {
	let debugSpy: jest.SpiedFunction<typeof Log.debug>;

	beforeEach(() => {
		debugSpy = jest.spyOn(Log, 'debug');
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	const warningsFor = (propName: string): string[] => getInvalidValueWarnings(debugSpy.mock.calls, propName);

	describe.each(validators)('%s', (_name, validate, propName, undefinedResult) => {
		it('stores a string', () => {
			const component = createLegacyComponent();
			validate(component, 'Value 1');
			expect(component.state[propName]).toBe('Value 1');
		});

		it('keeps the state and warns for a number', () => {
			const component = createLegacyComponent({ [propName]: 'old' });
			validate(component, 1 as unknown as string);
			expect(component.state[propName]).toBe('old');
			expect(warningsFor(propName)).toHaveLength(1);
		});

		it('handles undefined', () => {
			const component = createLegacyComponent({ [propName]: 'old' });
			validate(component, undefined);
			if (undefinedResult === KEEP) {
				expect(component.state[propName]).toBe('old');
				expect(warningsFor(propName)).toHaveLength(1);
			} else {
				expect(component.state[propName]).toBe(undefinedResult);
				expect(warningsFor(propName)).toEqual([]);
			}
		});
	});

	describe.each(validatorsWithOptions)('%s with options', (_name, validate, propName) => {
		it('applies the length limits of the options', () => {
			const component = createLegacyComponent({ [propName]: 'old' });
			validate(component, 'ab', { minLength: 3 });
			expect(component.state[propName]).toBe('old');
		});

		it('stores the default value of the options for undefined', () => {
			const component = createLegacyComponent();
			validate(component, undefined, { defaultValue: 'fallback' });
			expect(component.state[propName]).toBe('fallback');
		});
	});

	describe.each(idrefValidators)('%s', (_name, validate, propName, internalsKey) => {
		const globals = globalThis as { Document?: unknown };
		const hadDocument = 'Document' in globals;
		let target: HTMLElement;

		// `resolveTargets` tests the root node with `instanceof Document`, which the Stencil mock window does not define.
		beforeEach(() => {
			if (!hadDocument) {
				globals.Document = class Document {};
			}
			target = document.createElement('span');
			target.id = `${propName}-target`;
			document.body.appendChild(target);
		});

		afterEach(() => {
			target.remove();
			if (!hadDocument) {
				delete globals.Document;
			}
		});

		const createInternals = (): HostInternals => ({ ariaLabelledByElements: [], role: null });

		it('stores the IDREF, resolves the existing elements and assigns them to the internals', () => {
			const component = createLegacyComponent();
			const internals = createInternals();
			const elements = validate(component, undefined, internals, `${propName}-target ${propName}-missing`);
			expect(component.state[propName]).toBe(`${propName}-target ${propName}-missing`);
			expect(elements).toEqual([target]);
			expect(internals[internalsKey]).toEqual([target]);
			expect(debugSpy).toHaveBeenCalledWith(['WebComponent internals', internals]);
		});

		it('returns the elements without internals', () => {
			expect(validate(createLegacyComponent(), undefined, undefined, `${propName}-target`)).toEqual([target]);
		});

		it('stores undefined and resolves no elements', () => {
			const component = createLegacyComponent({ [propName]: 'old' });
			const internals = createInternals();
			expect(validate(component, undefined, internals, undefined)).toEqual([]);
			expect(component.state).toHaveProperty(propName, undefined);
			expect(internals[internalsKey]).toEqual([]);
		});

		it('ignores internals that reject the element references', () => {
			const internals = createInternals();
			Object.defineProperty(internals, internalsKey, {
				set: () => {
					throw new Error('not supported');
				},
			});
			expect(validate(createLegacyComponent(), undefined, internals, `${propName}-target`)).toEqual([target]);
		});

		// The validation only warns; `resolveTargets` then calls `trim` on the invalid value.
		it('warns and throws a TypeError for a number', () => {
			const component = createLegacyComponent();
			expect(() => validate(component, undefined, undefined, 1 as unknown as string)).toThrow(TypeError);
			expect(component.state).toEqual({});
			expect(warningsFor(propName)).toHaveLength(1);
		});
	});

	describe('validateQuote', () => {
		it('warns as a required prop for undefined', () => {
			validateQuote(createLegacyComponent(), undefined);
			expect(warningsFor('_quote')).toEqual([expect.stringMatching(/Allowed values are: String$/)]);
		});
	});

	// Known difference to the skeleton `customClassProp`: that one accepts a single safe class name only.
	describe('validateCustomClass', () => {
		it('accepts any string, also several or unsafe class names', () => {
			const component = createLegacyComponent();
			validateCustomClass(component, 'first second 1-unsafe!');
			expect(component.state._customClass).toBe('first second 1-unsafe!');
		});
	});

	describe('validateLabel', () => {
		const labelHints = (): string[] => getLoggedMessages(debugSpy.mock.calls).filter((message) => message.startsWith('The heading or label'));

		it('is validateLabelWithExpertSlot', () => {
			expect(validateLabelWithExpertSlot).toBe(validateLabel);
		});

		// Known difference to the skeleton `labelProp`: that one accepts '' or 2 to 80 characters only.
		it.each([[''], ['A']])('accepts the string %p', (value) => {
			const component = createLegacyComponent();
			validateLabel(component, value);
			expect(component.state._label).toBe(value);
		});

		it('accepts a label longer than 80 characters and gives a ui/ux hint', () => {
			const component = createLegacyComponent();
			const value = 'Long label '.repeat(8);
			validateLabel(component, value);
			expect(component.state._label).toBe(value);
			expect(getLoggedMessages(debugSpy.mock.calls)).toContain('A heading or label should not be longer than 80 characters.');
		});

		// The options are typed as `WatchStringOptions`, but `validateLabel` validates with `typeof value === 'string'` only.
		it('ignores minLength and maxLength of the options', () => {
			const component = createLegacyComponent();
			validateLabel(component, 'ab', { minLength: 3 });
			expect(component.state._label).toBe('ab');
			validateLabel(component, 'abcd', { maxLength: 3 });
			expect(component.state._label).toBe('abcd');
		});

		it('stores the default value of the options for undefined', () => {
			const component = createLegacyComponent();
			validateLabel(component, undefined, { defaultValue: 'fallback' });
			expect(component.state._label).toBe('fallback');
		});

		it('gives an a11y hint for a label with fewer than three readable characters', () => {
			validateLabel(createLegacyComponent(), 'X!');
			expect(labelHints()).toEqual([expect.stringContaining('("X!")')]);
		});

		it.each([['42'], ['Label']])('gives no a11y hint for %p', (value) => {
			validateLabel(createLegacyComponent(), value);
			expect(labelHints()).toEqual([]);
		});

		it('calls the hooks of the options in addition to its own afterPatch hook', () => {
			const afterPatch = jest.fn<Generic.Element.StateHooksCallback>();
			const beforePatch = jest.fn<Generic.Element.NextStateHooksCallback>();
			const component = createLegacyComponent();
			validateLabel(component, 'Label', { hooks: { afterPatch, beforePatch } });
			expect(beforePatch).toHaveBeenCalledWith('Label', expect.any(Map), component, '_label');
			expect(afterPatch).toHaveBeenCalledWith('Label', component.state, component, '_label');
		});

		// `watchValidator` adds `null` to the allowed values it is given, and `validateLabel` passes one shared set.
		it('lists null as allowed value for a required label once an optional label was invalid', () => {
			validateLabel(createLegacyComponent(), 1 as unknown as string);
			validateLabel(createLegacyComponent(), 2 as unknown as string, { required: true });
			expect(warningsFor('_label').pop()).toMatch(/Allowed values are: string, $/);
		});
	});

	describe('hasEnoughReadableChars', () => {
		it.each([
			['', 1, false],
			['ab', 3, false],
			['a-b-c', 3, true],
			['äöü', 3, true],
			['!?', 1, false],
		])('hasEnoughReadableChars(%p, %p) is %p', (value, min, expected) => {
			expect(hasEnoughReadableChars(value, min)).toBe(expected);
		});
	});

	describe('containsOnlyNumbers', () => {
		it.each([
			['123', true],
			['', false],
			['1.5', false],
			['12a', false],
		])('containsOnlyNumbers(%p) is %p', (value, expected) => {
			expect(containsOnlyNumbers(value)).toBe(expected);
		});
	});
});
