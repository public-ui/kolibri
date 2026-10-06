import { describe, expect, it } from '@jest/globals';
import { attachInternals } from './aria-labelledby';

describe('attachInternals', () => {
	it('returns undefined without a host', () => {
		expect(attachInternals(undefined)).toBeUndefined();
	});

	it('returns undefined for a host without attachInternals', () => {
		expect(attachInternals({} as Element)).toBeUndefined();
	});
});
