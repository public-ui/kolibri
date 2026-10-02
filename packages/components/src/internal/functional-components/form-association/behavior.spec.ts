import { describe, expect, it } from '@jest/globals';
import type { StencilUnknown } from '../../../schema';
import { BaseWebComponent } from '../base-web-component';
import type { FormAssociationType } from './api';
import { FormAssociationBehavior } from './behavior';

/**
 * Pins how `setFormAssociatedValue` mirrors a value into a native target (#11015). The target is set
 * directly; the hidden form element of `kol-select` is a `<select multiple>` like the select target.
 */
const syncInto = <T extends HTMLInputElement | HTMLSelectElement>(type: FormAssociationType, target: T, ...values: StencilUnknown[]): T => {
	const host = document.createElement('div');
	host.attachShadow({ mode: 'open' });
	const behavior = new FormAssociationBehavior(BaseWebComponent.stateLess, { host, type });
	behavior.syncToOwnInput = target;
	values.forEach((value) => behavior.setFormAssociatedValue(value));
	return target;
};

const selectedValues = (select: HTMLSelectElement): (string | null)[] =>
	Array.from(select.querySelectorAll('option'))
		.filter((option) => option.hasAttribute('selected'))
		.map((option) => option.getAttribute('value'));

const createMultipleSelect = (): HTMLSelectElement => {
	const select = document.createElement('select');
	select.setAttribute('multiple', '');
	return select;
};

describe('FormAssociationBehavior.setFormAssociatedValue', () => {
	describe('select into a <select>', () => {
		it('selects one option for a single value', () => {
			expect(selectedValues(syncInto('select', createMultipleSelect(), 'E'))).toEqual(['E']);
		});

		it('selects one option per item of an array', () => {
			expect(selectedValues(syncInto('select', createMultipleSelect(), ['W', 'E']))).toEqual(['W', 'E']);
		});

		it('stringifies a non-string value', () => {
			expect(selectedValues(syncInto('select', createMultipleSelect(), 5, [{ a: 1 }]))).toEqual(['{"a":1}']);
		});

		it.each([null, undefined])('selects no option for %s', (value) => {
			expect(selectedValues(syncInto('select', createMultipleSelect(), 'E', value))).toEqual([]);
		});

		it('replaces the options of the previous value', () => {
			expect(selectedValues(syncInto('select', createMultipleSelect(), ['W', 'E'], 'N'))).toEqual(['N']);
		});
	});

	describe('select into an <input>', () => {
		it('writes a single value', () => {
			expect(syncInto('select', document.createElement('input'), 'E').value).toBe('E');
		});

		it('writes an array as JSON', () => {
			expect(syncInto('select', document.createElement('input'), ['W', 'E']).value).toBe('["W","E"]');
		});

		it('clears the value for null', () => {
			expect(syncInto('select', document.createElement('input'), 'E', null).value).toBe('');
		});
	});

	it('writes the string value into an <input> for a text field', () => {
		expect(syncInto('text', document.createElement('input'), 'abc').value).toBe('abc');
	});
});
