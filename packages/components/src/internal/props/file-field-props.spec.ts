import { describe, expect, it, jest } from '@jest/globals';
import { acceptProp } from './accept';

/**
 * Pins the props of `kol-input-file` against the legacy validator `validateAccept` they replace (G3c.1 of
 * `docs/FORM_FIELD_SKELETON_MIGRATION_PLAN.md`). `_multiple` and `_required` reuse `multipleProp` and `requiredProp`.
 */
const applied = (value: unknown): unknown[] => {
	const callback = jest.fn();
	acceptProp.apply(value as string, callback);
	return callback.mock.calls.map(([normalized]) => normalized);
};

describe('acceptProp', () => {
	it.each([undefined, null])('applies the default undefined for %s', (value) => {
		expect(applied(value)).toEqual([undefined]);
	});

	it.each(['image/*,.pdf', '.txt', ''])('accepts %p', (value) => {
		expect(applied(value)).toEqual([value]);
	});

	it('ignores an object', () => {
		expect(applied({})).toEqual([]);
	});
});
