import { describe, expect, it } from '@jest/globals';
import { attachInternals, resolveTargets } from './aria-labelledby';

describe('attachInternals', () => {
	it('returns undefined without a host', () => {
		expect(attachInternals(undefined)).toBeUndefined();
	});

	it('returns undefined for a host without attachInternals', () => {
		expect(attachInternals({} as Element)).toBeUndefined();
	});
});

describe('resolveTargets', () => {
	it('resolves every id of the space separated list to its element in the document', () => {
		const first = document.createElement('span');
		first.id = 'resolve-targets-first';
		const second = document.createElement('span');
		second.id = 'resolve-targets-second';
		document.body.append(first, second);

		expect(resolveTargets(undefined, 'resolve-targets-first resolve-targets-second')).toEqual([first, second]);

		first.remove();
		second.remove();
	});

	it('drops unknown ids and keeps the order of the resolved elements', () => {
		const known = document.createElement('span');
		known.id = 'resolve-targets-known';
		document.body.append(known);

		expect(resolveTargets(undefined, 'resolve-targets-missing resolve-targets-known')).toEqual([known]);

		known.remove();
	});

	it('returns an empty list for an empty or missing value', () => {
		expect(resolveTargets(undefined, undefined)).toEqual([]);
		expect(resolveTargets(undefined, '   ')).toEqual([]);
	});
});
