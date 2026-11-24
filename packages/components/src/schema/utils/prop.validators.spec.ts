import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

import { getLoggedMessages } from '../../utils/testing/logged-messages';
import { Log, setExperimentalMode } from './dev.utils';
import {
	KoliBriDevHelper,
	koliBriQuerySelector,
	koliBriQuerySelectorAll,
	mapBoolean2String,
	mapStringOrBoolean2String,
	objectObjectHandler,
	parseJson,
	setEventTarget,
	stringifyJson,
} from './prop.validators';

type DebugSpy = jest.SpiedFunction<typeof Log.debug>;

describe('prop validator utils', () => {
	let debugSpy: DebugSpy;

	beforeEach(() => {
		debugSpy = jest.spyOn(Log, 'debug');
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

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
