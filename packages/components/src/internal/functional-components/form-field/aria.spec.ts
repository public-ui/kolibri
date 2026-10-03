import { describe, expect, it } from '@jest/globals';
import { getFormFieldAria } from './aria';

const error = { _type: 'error' as const, _description: 'Error' };

describe('getFormFieldAria', () => {
	it('references nothing without message and hint', () => {
		expect(getFormFieldAria({ id: 'field-nonce' })).toEqual({ hasError: false, hasHint: false, ariaDescribedBy: [] });
	});

	it('references the message and the hint', () => {
		expect(getFormFieldAria({ id: 'field-nonce', msg: error, hint: 'Hint', touched: true }).ariaDescribedBy).toEqual(['field-msg-nonce', 'field-hint-nonce']);
	});

	it('is invalid for an error message once touched', () => {
		expect(getFormFieldAria({ id: 'field-nonce', msg: error }).hasError).toBe(false);
		expect(getFormFieldAria({ id: 'field-nonce', msg: error, touched: true }).hasError).toBe(true);
	});

	it('is not invalid for a message of another type', () => {
		expect(getFormFieldAria({ id: 'field-nonce', msg: { _type: 'info', _description: 'Info' }, touched: true }).hasError).toBe(false);
	});

	it('treats a plain string message as error', () => {
		expect(getFormFieldAria({ id: 'field-nonce', msg: 'Error', touched: true })).toEqual({
			hasError: true,
			hasHint: false,
			ariaDescribedBy: ['field-msg-nonce'],
		});
	});

	it('does not reference the message before touched', () => {
		expect(getFormFieldAria({ id: 'field-nonce', msg: error }).ariaDescribedBy).toEqual([]);
	});

	it('references the message with hideMsg when touched', () => {
		expect(getFormFieldAria({ id: 'field-nonce', msg: error, hideMsg: true, touched: true })).toEqual({
			hasError: true,
			hasHint: false,
			ariaDescribedBy: ['field-msg-nonce'],
		});
	});
});
