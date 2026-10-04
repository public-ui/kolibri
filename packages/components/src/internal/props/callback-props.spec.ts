import { afterAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Log } from '../../schema/utils/dev.utils';
import { buttonCallbacksProp } from './button-callbacks';
import { cardCallbacksProp } from './card-callbacks';
import { collapsibleCallbacksProp } from './collapsible-callbacks';
import { dialogCallbacksProp } from './dialog-callbacks';
import { drawerCallbacksProp } from './drawer-callbacks';
import { formCallbacksProp } from './form-callbacks';
import { linkCallbacksProp } from './link-callbacks';
import { tableCallbacksProp } from './table-callbacks';
import { tabsCallbacksProp } from './tabs-callbacks';

/**
 * Pins the `_on` callback prop definitions. Every one of them falls back to `{}` and accepts any
 * non-null object, including an array; a function or a primitive is ignored with a developer
 * warning. The dialog, drawer and tabs definitions additionally keep only the callbacks the
 * component invokes.
 *
 * All of them share the prop name `on` and `devWarning` logs each distinct message once, so the
 * warning is checked with an invalid value unique to each prop.
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

const warn = jest.spyOn(Log, 'warn').mockImplementation(() => undefined);
const warnings = (): string[] => warn.mock.calls.map(([message]) => (Array.isArray(message) ? message.join(' ') : String(message)));

beforeEach(() => {
	warn.mockClear();
});

afterAll(() => {
	warn.mockRestore();
});

const onClick = () => undefined;
const onCancel = () => undefined;
const onClose = () => undefined;
const onCreate = () => undefined;
const onSelect = () => undefined;
const onToggle = () => undefined;

const CALLBACK_PROPS: ReadonlyArray<{ name: string; definition: PropDefinition }> = [
	{ name: 'buttonCallbacksProp', definition: buttonCallbacksProp },
	{ name: 'cardCallbacksProp', definition: cardCallbacksProp },
	{ name: 'collapsibleCallbacksProp', definition: collapsibleCallbacksProp },
	{ name: 'dialogCallbacksProp', definition: dialogCallbacksProp },
	{ name: 'drawerCallbacksProp', definition: drawerCallbacksProp },
	{ name: 'formCallbacksProp', definition: formCallbacksProp },
	{ name: 'linkCallbacksProp', definition: linkCallbacksProp },
	{ name: 'tableCallbacksProp', definition: tableCallbacksProp },
	{ name: 'tabsCallbacksProp', definition: tabsCallbacksProp },
];

describe.each(CALLBACK_PROPS)('$name', ({ name, definition }) => {
	it('is the `on` prop', () => {
		expect(definition.propName).toBe('on');
	});

	it.each([undefined, null])('applies the default {} for %p', (value) => {
		expect(applied(definition, value)).toEqual([{}]);
	});

	it('accepts an empty object', () => {
		expect(applied(definition, {})).toEqual([{}]);
	});

	it('accepts an array without a warning', () => {
		expect(applied(definition, [])).toHaveLength(1);
		expect(warnings()).toEqual([]);
	});

	it.each<unknown>(['{}', 1, true, onClick])('ignores %p', (value) => {
		expect(applied(definition, value)).toEqual([]);
	});

	it('warns about an ignored value', () => {
		expect(applied(definition, name)).toEqual([]);
		expect(warnings()).toEqual([
			expect.stringContaining(`The property value "${name}" for 'on' is not valid (Invalid on callbacks: expected object, got string)`),
		]);
	});
});

describe.each([
	{ name: 'buttonCallbacksProp', definition: buttonCallbacksProp },
	{ name: 'cardCallbacksProp', definition: cardCallbacksProp },
	{ name: 'collapsibleCallbacksProp', definition: collapsibleCallbacksProp },
	{ name: 'formCallbacksProp', definition: formCallbacksProp },
	{ name: 'linkCallbacksProp', definition: linkCallbacksProp },
	{ name: 'tableCallbacksProp', definition: tableCallbacksProp },
])('$name', ({ definition }) => {
	it('passes the callbacks object through by reference', () => {
		const callbacks = { onClick, unknown: 'kept' };
		const [normalized] = applied(definition, callbacks);
		expect(normalized).toBe(callbacks);
	});
});

describe('dialogCallbacksProp', () => {
	it('keeps only onCancel and onClose', () => {
		expect(applied(dialogCallbacksProp, { onCancel, onClick, onClose, onToggle })).toEqual([{ onCancel, onClose }]);
	});

	it('drops callbacks that are not functions', () => {
		expect(applied(dialogCallbacksProp, { onCancel: 'cancel', onClose: 1 })).toEqual([{}]);
	});
});

describe('drawerCallbacksProp', () => {
	it('keeps only onCancel, onClose and onToggle', () => {
		expect(applied(drawerCallbacksProp, { onCancel, onClick, onClose, onToggle })).toEqual([{ onCancel, onClose, onToggle }]);
	});

	it('drops callbacks that are not functions', () => {
		expect(applied(drawerCallbacksProp, { onCancel: 'cancel', onClose: 1, onToggle: {} })).toEqual([{}]);
	});
});

describe('tabsCallbacksProp', () => {
	it('keeps only onCreate and onSelect', () => {
		expect(applied(tabsCallbacksProp, { onClick, onCreate, onSelect })).toEqual([{ onCreate, onSelect }]);
	});

	it('drops callbacks that are not functions', () => {
		expect(applied(tabsCallbacksProp, { onCreate: 'create', onSelect: 1 })).toEqual([{}]);
	});
});
