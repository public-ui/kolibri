import { describe, expect, it } from '@jest/globals';
import { clampPage, getPageCount, getPageItems, getVisibleRange, resolvePageSize } from './model';

const options = [
	{ label: '10', value: 10 },
	{ label: '20', value: 20 },
];

describe('getPageCount', () => {
	it.each([
		[40, 10, 4],
		[41, 10, 5],
		[0, 10, 0],
		[5, undefined, 5],
	])('counts %s entries with page size %s as %s pages', (max, pageSize, expected) => {
		expect(getPageCount(max, pageSize)).toBe(expected);
	});
});

describe('clampPage', () => {
	it.each([
		[20, 1, 10, 10],
		[0, 1, 10, 1],
		[-3, 10, 40, 1],
		[4, 20, 40, 2],
	])('clamps page %s (page size %s, %s entries) to %s', (page, pageSize, max, expected) => {
		expect(clampPage(page, pageSize, max)).toBe(expected);
	});

	it.each([
		[3, 10, 40],
		[20, 10, 0],
	])('keeps page %s (page size %s, %s entries)', (page, pageSize, max) => {
		expect(clampPage(page, pageSize, max)).toBeUndefined();
	});

	it('counts each entry as one page without a page size', () => {
		expect(clampPage(30, undefined, 40)).toBeUndefined();
		expect(clampPage(50, undefined, 40)).toBe(40);
	});
});

describe('resolvePageSize', () => {
	it.each([
		[20, options, 20],
		[15, options, 10],
		[15, [], 15],
	])('resolves %s to %s', (pageSize, pageSizeOptions, expected) => {
		expect(resolvePageSize(pageSize, pageSizeOptions)).toBe(expected);
	});
});

describe('getPageItems', () => {
	const render = (page: number, count: number, boundaryCount: number, siblingCount: number) =>
		getPageItems(page, count, boundaryCount, siblingCount)
			.map((item) => (item === null ? '_' : item === 'separator' ? '…' : item.selected ? `[${item.page}]` : `${item.page}`))
			.join(' ');

	it.each([
		[1, 2, 1, 1, '[1] 2'],
		[5, 10, 1, 1, '1 … _ 4 [5] 6 … _ _ 10'],
		[10, 10, 2, 2, '1 2 … _ _ _ _ 8 9 [10]'],
		[6, 12, 0, 1, '_ _ _ _ 5 [6] 7 … _ _ _ _'],
		[1, 0, 1, 1, ''],
	])('page %s of %s (boundary %s, sibling %s) renders %s', (page, count, boundaryCount, siblingCount, expected) => {
		expect(render(page, count, boundaryCount, siblingCount)).toBe(expected);
	});
});

describe('getVisibleRange', () => {
	it.each([
		[1, 10, 40, 1, 10],
		[4, 10, 35, 31, 35],
		[1, 1, 0, 1, 0],
	])('page %s, page size %s, %s entries: %s to %s', (page, pageSize, max, start, end) => {
		expect(getVisibleRange(page, pageSize, max)).toEqual({ start, end });
	});
});
