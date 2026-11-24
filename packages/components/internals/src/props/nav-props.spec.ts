import { describe, expect, it, jest } from '@jest/globals';
import { collapsibleProp } from './collapsible';
import { hasCompactButtonProp } from './has-compact-button';
import { hasIconsWhenExpandedProp } from './has-icons-when-expanded';
import { navLinksProp } from './nav-links';

/**
 * Pins the props of `kol-nav` against the legacy validators they replace (#11152).
 */
type PropDefinition = {
	apply: (value: unknown, callback: (normalized: unknown) => void) => void;
};

const applied = (definition: PropDefinition, value: unknown): unknown[] => {
	const callback = jest.fn();
	definition.apply(value, callback);
	return callback.mock.calls.map(([normalized]) => normalized);
};

describe.each([
	['collapsibleProp', collapsibleProp, true],
	['hasCompactButtonProp', hasCompactButtonProp, false],
	['hasIconsWhenExpandedProp', hasIconsWhenExpandedProp, false],
])('%s', (_name, definition, defaultValue) => {
	it.each([true, false])('applies %s', (value) => {
		expect(applied(definition, value)).toEqual([value]);
	});

	it.each([undefined, null])(`applies the default ${String(defaultValue)} for %s`, (value) => {
		expect(applied(definition, value)).toEqual([defaultValue]);
	});
});

describe('navLinksProp', () => {
	const links = [{ _label: 'Link', _href: '#' }, { _label: 'Text' }, { _href: '#only-href' }];

	it('accepts entries with a string _label or _href', () => {
		expect(applied(navLinksProp, links)).toEqual([links]);
	});

	it('parses a JSON string', () => {
		expect(applied(navLinksProp, JSON.stringify(links))).toEqual([links]);
	});

	it('does not validate the children', () => {
		const withChildren = [{ _label: 'Parent', _children: [{ _icons: 'kolicon-home' }] }];
		expect(applied(navLinksProp, withChildren)).toEqual([withChildren]);
	});

	it.each([[[{ _icons: 'kolicon-home' }]], [[{ _label: 1 }]], [[null]], [['text']]])('rejects the whole list for %j', (value) => {
		expect(applied(navLinksProp, value)).toEqual([]);
	});

	it.each([undefined, null])('applies an empty list for %s', (value) => {
		expect(applied(navLinksProp, value)).toEqual([[]]);
	});
});
