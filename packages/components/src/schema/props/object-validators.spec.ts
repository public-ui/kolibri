import { describe, expect, it } from '@jest/globals';

import { isIcon, mapIconProp2State } from './icons';
import type { MsgPropType } from './msg';
import { checkHasMsg, getMsgType, isMsgDefinedAndInputTouched, normalizeMsg } from './msg';
import { classNameFromVariant } from './variant-class-name';

describe('object prop helpers', () => {
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
