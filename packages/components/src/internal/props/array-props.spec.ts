import { afterAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Log } from '../../schema/utils/dev.utils';
import { breadcrumbLinksProp } from './breadcrumb-links';
import { errorListProp } from './error-list';
import { skipNavLinksProp } from './skip-nav-links';
import { tableDataFootProp } from './table-data-foot';
import { tabsProp } from './tabs';
import { toolbarItemsProp } from './toolbar-items';

/**
 * Pins the list prop definitions: each accepts an array or its JSON string, falls back to `[]`
 * and rejects the whole list with a developer warning when one item is invalid. The navigation
 * lists emit the "magical number seven" hint for more than seven accepted items.
 *
 * `devWarning` logs each distinct message once and the message names the prop and the value, so
 * every invalid value below is unique to its prop.
 */
type PropDefinition = {
	readonly propName: string;
	apply: (value: unknown, callback: (normalized: unknown) => void) => void;
};

const applied = (definition: PropDefinition, value: unknown): unknown[] => {
	const callback = jest.fn();
	definition.apply(value, callback);
	return callback.mock.calls.map(([normalized]) => normalized);
};

const toText = (message: unknown): string => (Array.isArray(message) ? message.join(' ') : String(message));
const debug = jest.spyOn(Log, 'debug').mockImplementation(() => undefined);
const error = jest.spyOn(Log, 'error').mockImplementation(() => undefined);
const warn = jest.spyOn(Log, 'warn').mockImplementation(() => undefined);
const hints = (): string[] => debug.mock.calls.map(([message]) => toText(message));
const warnings = (): string[] => warn.mock.calls.map(([message]) => toText(message));

beforeEach(() => {
	debug.mockClear();
	error.mockClear();
	warn.mockClear();
});

afterAll(() => {
	debug.mockRestore();
	error.mockRestore();
	warn.mockRestore();
});

const onError = () => undefined;

const LIST_PROPS: ReadonlyArray<{
	name: string;
	definition: PropDefinition;
	validItems: unknown[];
	invalidLists: unknown[][];
}> = [
	{
		name: 'breadcrumbLinksProp',
		definition: breadcrumbLinksProp,
		validItems: [{ _href: '/', _label: 'Home' }, { _label: 'Label only' }, { _href: '/href-only' }],
		invalidLists: [[{}], ['Home'], [null]],
	},
	{
		name: 'errorListProp',
		definition: errorListProp,
		validItems: [
			{ message: 'Required', selector: '#name' },
			{ message: '', selector: '#empty-message' },
		],
		invalidLists: [[{ message: 'Required' }], [{ selector: '#name' }], [{ message: 1, selector: '#name' }], [null]],
	},
	{
		name: 'skipNavLinksProp',
		definition: skipNavLinksProp,
		validItems: [{ _href: '#main', _label: 'Main' }, { _label: 'Label only' }, { _href: '#href-only' }],
		invalidLists: [[{ _href: 1 }], [1], [{ _label: 'Main' }, null]],
	},
	{
		name: 'tableDataFootProp',
		definition: tableDataFootProp,
		validItems: [{ sum: 1 }, {}],
		invalidLists: [[1], ['row'], [{ sum: 1 }, null]],
	},
	{
		name: 'tabsProp',
		definition: tabsProp,
		validItems: [{ _label: 'Tab 1' }, { _label: 'Tab 2', _icons: 'kolicon-plus' }],
		invalidLists: [[{ _label: '' }], [{}], [null], ['Tab']],
	},
	{
		name: 'toolbarItemsProp',
		definition: toolbarItemsProp,
		validItems: [{}, { _label: 'Item' }],
		invalidLists: [[null], ['Item'], [{}, 1]],
	},
];

describe.each(LIST_PROPS)('$name', ({ name, definition, validItems, invalidLists }) => {
	it.each([undefined, null])('applies the default [] for %p', (value) => {
		expect(applied(definition, value)).toEqual([[]]);
	});

	it('accepts an empty list', () => {
		expect(applied(definition, [])).toEqual([[]]);
	});

	it('accepts a list of valid items by reference', () => {
		const [normalized] = applied(definition, validItems);
		expect(normalized).toBe(validItems);
		expect(warnings()).toEqual([]);
	});

	it('parses a JSON string', () => {
		expect(applied(definition, JSON.stringify(validItems))).toEqual([validItems]);
	});

	it.each(invalidLists.map((list) => [list]))('ignores %j with a developer warning', (list) => {
		expect(applied(definition, list)).toEqual([]);
		expect(warnings()).toContainEqual(expect.stringContaining(`for '${definition.propName}' is not valid`));
	});

	it('ignores an object that is not a list with a developer warning', () => {
		const value = { [name]: validItems };
		expect(applied(definition, value)).toEqual([]);
		expect(warnings()).toContainEqual(expect.stringContaining(`The property value ${JSON.stringify(value)} for '${definition.propName}' is not valid`));
	});

	it('ignores an unparsable string with a developer warning', () => {
		expect(applied(definition, `[${name}`)).toEqual([]);
		expect(warnings()).toContainEqual(expect.stringContaining(`The property value "[${name}" for '${definition.propName}' is not valid`));
	});
});

describe('errorListProp', () => {
	it('accepts a selector callback', () => {
		const errorList = [{ message: 'Required', selector: onError }];
		expect(applied(errorListProp, errorList)).toEqual([errorList]);
	});
});

describe('tableDataFootProp', () => {
	it('parses a single-quoted JSON string', () => {
		expect(applied(tableDataFootProp, "[{'sum':1}]")).toEqual([[{ sum: 1 }]]);
	});

	it('ignores a JSON object string with a developer warning', () => {
		expect(applied(tableDataFootProp, '{"sum":1}')).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`for 'dataFoot' is not valid (Invalid table data: expected an array of row objects.)`)]);
	});
});

/**
 * The hint fires once per message, so each prop checks the seven-item case before the eight-item
 * case.
 */
describe.each([
	{ name: 'breadcrumbLinksProp', definition: breadcrumbLinksProp, component: 'KolBreadcrumb', item: { _href: '/', _label: 'Link' } },
	{ name: 'skipNavLinksProp', definition: skipNavLinksProp, component: 'KolSkipNav', item: { _href: '#main', _label: 'Link' } },
	{ name: 'tabsProp', definition: tabsProp, component: 'KolTabs', item: { _label: 'Tab' } },
])('$name hints', ({ definition, component, item }) => {
	const list = (length: number): unknown[] => Array.from({ length }, () => ({ ...item }));

	it('emits no hint for seven items', () => {
		expect(applied(definition, list(7))).toHaveLength(1);
		expect(hints()).toEqual([]);
	});

	it('emits no hint for eight items that fail the validation', () => {
		expect(applied(definition, [...list(7), null])).toEqual([]);
		expect(hints()).toEqual([]);
	});

	it('emits the hint for eight items parsed from a JSON string', () => {
		expect(applied(definition, JSON.stringify(list(8)))).toEqual([list(8)]);
		expect(hints()).toEqual([expect.stringContaining(`[${component}] Within navigation structures, it is recommended to use no more than 7 menu items.`)]);
	});
});
