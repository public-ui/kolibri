import { afterAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Log } from '../../schema/utils/dev.utils';
import { accessKeyProp } from './access-key';
import { altProp } from './alt';
import { ariaControlsProp } from './aria-controls';
import { ariaDescriptionProp } from './aria-description';
import { ariaOwnsProp } from './aria-owns';
import { badgeTextProp } from './badge-text';
import { downloadProp } from './download';
import { hrefProp, optionalHrefProp } from './href';
import { iconsProp } from './icons';
import { idProp } from './id';
import { labelProp } from './label';
import { labelWithExpertSlotProp } from './label-with-expert-slot';
import { linkTargetProp } from './link-target';
import { nameProp } from './name';
import { quoteProp } from './quote';
import { secondaryHeadlineProp } from './secondary-headline';
import { shortKeyProp } from './short-key';
import { sizesProp } from './sizes';
import { srcProp } from './src';
import { srcsetProp } from './srcset';
import { unitProp } from './unit';
import { widthProp } from './width';

/**
 * Pins the string prop definitions built on `normalizeString`: numbers, booleans and bigints are
 * converted with `String()`, any other value is ignored with a developer warning.
 *
 * `devWarning` logs each distinct message once and the message names the prop and the value, so
 * props sharing a prop name (`label`, `href`) use different invalid values.
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
const warn = jest.spyOn(Log, 'warn').mockImplementation(() => undefined);
const hints = (): string[] => debug.mock.calls.map(([message]) => toText(message));
const warnings = (): string[] => warn.mock.calls.map(([message]) => toText(message));

beforeEach(() => {
	debug.mockClear();
	warn.mockClear();
});

afterAll(() => {
	debug.mockRestore();
	warn.mockRestore();
});

const STRING_PROPS: ReadonlyArray<{ name: string; definition: PropDefinition; defaultValue: string | undefined }> = [
	{ name: 'accessKeyProp', definition: accessKeyProp, defaultValue: '' },
	{ name: 'altProp', definition: altProp, defaultValue: '' },
	{ name: 'ariaControlsProp', definition: ariaControlsProp, defaultValue: '' },
	{ name: 'ariaDescriptionProp', definition: ariaDescriptionProp, defaultValue: '' },
	{ name: 'ariaOwnsProp', definition: ariaOwnsProp, defaultValue: '' },
	{ name: 'badgeTextProp', definition: badgeTextProp, defaultValue: '' },
	{ name: 'downloadProp', definition: downloadProp, defaultValue: undefined },
	{ name: 'iconsProp', definition: iconsProp, defaultValue: 'kolicon-logo' },
	{ name: 'idProp', definition: idProp, defaultValue: '' },
	{ name: 'labelWithExpertSlotProp', definition: labelWithExpertSlotProp, defaultValue: '' },
	{ name: 'linkTargetProp', definition: linkTargetProp, defaultValue: '' },
	{ name: 'nameProp', definition: nameProp, defaultValue: '' },
	{ name: 'optionalHrefProp', definition: optionalHrefProp, defaultValue: '' },
	{ name: 'quoteProp', definition: quoteProp, defaultValue: '' },
	{ name: 'secondaryHeadlineProp', definition: secondaryHeadlineProp, defaultValue: '' },
	{ name: 'shortKeyProp', definition: shortKeyProp, defaultValue: '' },
	{ name: 'sizesProp', definition: sizesProp, defaultValue: '' },
	{ name: 'srcProp', definition: srcProp, defaultValue: '' },
	{ name: 'srcsetProp', definition: srcsetProp, defaultValue: '' },
	{ name: 'widthProp', definition: widthProp, defaultValue: '100%' },
];

describe.each(STRING_PROPS)('$name', ({ definition, defaultValue }) => {
	it.each([undefined, null])(`applies the default ${JSON.stringify(defaultValue)} for %p without a warning`, (value) => {
		expect(applied(definition, value)).toEqual([defaultValue]);
		expect(warnings()).toEqual([]);
	});

	it.each<[unknown, string]>([
		['abc', 'abc'],
		['', ''],
		[' padded ', ' padded '],
		[5, '5'],
		[true, 'true'],
	])('normalizes %p to %p', (value, expected) => {
		expect(applied(definition, value)).toEqual([expected]);
		expect(warnings()).toEqual([]);
	});

	it.each<unknown>([{}, []])('ignores %p with a developer warning', (value) => {
		expect(applied(definition, value)).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`for '${definition.propName}' is not valid (Cannot convert object to string)`)]);
	});
});

/**
 * `hrefProp` differs from `optionalHrefProp` (covered above) only by its `required` flag.
 */
describe('hrefProp', () => {
	it('applies the default "" for undefined and warns about the missing required value', () => {
		expect(applied(hrefProp, undefined)).toEqual(['']);
		expect(warnings()).toEqual([expect.stringContaining(`The required property '_href' did not receive a value.`)]);
	});

	it('applies the default "" for null', () => {
		expect(applied(hrefProp, null)).toEqual(['']);
	});

	it.each<[unknown, string]>([
		['https://example.com', 'https://example.com'],
		['#section', '#section'],
		['', ''],
		[1, '1'],
	])('normalizes %p to %p without a warning', (value, expected) => {
		expect(applied(hrefProp, value)).toEqual([expected]);
		expect(warnings()).toEqual([]);
	});

	it('ignores an object with a developer warning', () => {
		expect(applied(hrefProp, { href: '/' })).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`for 'href' is not valid (Cannot convert object to string)`)]);
	});
});

/**
 * `labelProp` accepts the empty string or 2 to 80 characters and emits the label hints for an
 * accepted value.
 */
describe('labelProp', () => {
	it.each([undefined, null])('applies the default "" for %p', (value) => {
		expect(applied(labelProp, value)).toEqual(['']);
	});

	it.each<[unknown, string]>([
		['', ''],
		['Label', 'Label'],
		[12, '12'],
		['a'.repeat(80), 'a'.repeat(80)],
	])('accepts %p as %p', (value, expected) => {
		expect(applied(labelProp, value)).toEqual([expected]);
		expect(warnings()).toEqual([]);
	});

	it.each<unknown>(['a', 1, 'b'.repeat(81)])('ignores %p with a developer warning', (value) => {
		expect(applied(labelProp, value)).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`for 'label' is not valid. The value is ignored.`)]);
	});

	it('ignores an object with a developer warning', () => {
		expect(applied(labelProp, { label: 'Label' })).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`for 'label' is not valid (Cannot convert object to string)`)]);
	});

	it('emits the a11y hint for an accepted label with fewer than three readable characters', () => {
		expect(applied(labelProp, 'ab')).toEqual(['ab']);
		expect(hints()).toEqual([expect.stringContaining('The heading or label ("ab") is inaccessible.')]);
	});

	it.each<unknown>(['Label', '12', 'c'.repeat(81)])('emits no hint for %p', (value) => {
		applied(labelProp, value);
		expect(hints()).toEqual([]);
	});
});

/**
 * `unitProp` rejects the empty string; whitespace passes.
 */
describe('unitProp', () => {
	it.each([undefined, null])("applies the default '%' for %p", (value) => {
		expect(applied(unitProp, value)).toEqual(['%']);
	});

	it.each<[unknown, string]>([
		['px', 'px'],
		[' ', ' '],
		[5, '5'],
	])('normalizes %p to %p', (value, expected) => {
		expect(applied(unitProp, value)).toEqual([expected]);
	});

	it('ignores the empty string with a developer warning', () => {
		expect(applied(unitProp, '')).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`The property value "" for 'unit' is not valid. The value is ignored.`)]);
	});

	it('ignores an object with a developer warning', () => {
		expect(applied(unitProp, {})).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`for 'unit' is not valid (Cannot convert object to string)`)]);
	});
});
