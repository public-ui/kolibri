import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

import { getLoggedMessages } from '../../utils/testing/logged-messages';
import { Log } from '../utils/dev.utils';
import { validateAriaLabelledby } from './aria-labelledby';

let hostCount = 0;

/**
 * Each host gets a unique constructor name, because `devHint` logs a message only once.
 */
const createHost = (): object => {
	hostCount += 1;
	const Host = class {};
	Object.defineProperty(Host, 'name', { value: `AriaLabelledbyHost${hostCount}` });
	return new Host();
};

describe('validateAriaLabelledby', () => {
	const globals = globalThis as { Document?: unknown };
	const hadDocument = 'Document' in globals;
	let debugSpy: jest.SpiedFunction<typeof Log.debug>;
	let target: HTMLElement;

	const warnings = (): string[] => getLoggedMessages(debugSpy.mock.calls).filter((message) => message.includes(`for '_ariaLabelledby' is not valid`));

	// `resolveTargets` tests the root node with `instanceof Document`, which the Stencil mock window does not define.
	beforeEach(() => {
		debugSpy = jest.spyOn(Log, 'debug');
		if (!hadDocument) {
			globals.Document = class Document {};
		}
		target = document.createElement('span');
		target.id = 'aria-labelledby-target';
		document.body.appendChild(target);
	});

	afterEach(() => {
		target.remove();
		if (!hadDocument) {
			delete globals.Document;
		}
		jest.restoreAllMocks();
	});

	it('resolves the existing elements of the IDREF list', () => {
		expect(validateAriaLabelledby(createHost(), undefined, 'aria-labelledby-target aria-labelledby-missing')).toEqual([target]);
		expect(warnings()).toEqual([]);
	});

	it('resolves no elements for undefined', () => {
		expect(validateAriaLabelledby(createHost(), undefined, undefined)).toEqual([]);
		expect(warnings()).toEqual([]);
	});

	it.each<unknown>([1, { id: 'aria-labelledby-target' }])('only warns for the invalid value %p and resolves no element', (value) => {
		expect(validateAriaLabelledby(createHost(), undefined, value as string)).toEqual([]);
		expect(warnings()).toHaveLength(1);
	});
});
