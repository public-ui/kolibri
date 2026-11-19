import type { Option, Stringified } from '../../schema';
import { parseJson } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Page size options prop of `kol-pagination`
 *
 * Description:
 * The page sizes of the page size select, as an array of numbers or as a JSON string. One value that
 * is not a number rejects the whole list.
 */
export type PageSizeOptionsProp = Prop<'pageSizeOptions', Stringified<number[]>, Option<number>[]>;

const OBJECT_OBJECT = /^\[object Object\]$/;

function normalizePageSizeOptions(value: unknown): Option<number>[] | never {
	// An empty string or '[object Object]' is what Stencil passes for an array it could not reflect.
	if (value === '' || (typeof value === 'string' && OBJECT_OBJECT.test(value))) {
		throw new Error('Unreflected page size options');
	}
	const parsed = typeof value === 'string' ? parseJson<unknown>(value) : value;
	if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'number')) {
		return parsed.map((size) => ({ label: `${size}`, value: size }));
	}
	throw new Error('Invalid page size options');
}

export const pageSizeOptionsProp = createPropDefinition<PageSizeOptionsProp>('pageSizeOptions', [], normalizePageSizeOptions);
