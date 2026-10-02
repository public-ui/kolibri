import { describe, expect, it } from '@jest/globals';
import { getFileNames } from './file-value';

const file = (name: string): File => ({ name }) as File;

describe('getFileNames', () => {
	it('joins the names of the files', () => {
		expect(getFileNames([file('a.txt'), file('b.txt')])).toBe('a.txt, b.txt');
	});

	it('returns the name of a single file', () => {
		expect(getFileNames([file('a.txt')])).toBe('a.txt');
	});

	it.each([null, undefined, []])('returns undefined for %p', (files) => {
		expect(getFileNames(files)).toBeUndefined();
	});
});
