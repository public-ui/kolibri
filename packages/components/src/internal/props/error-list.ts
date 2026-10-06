import type { ErrorListPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeArray } from './helpers/normalizers';

/**
 * Error-list prop of the form: the issues rendered as an alert above the form element, each one
 * linking to the form control it belongs to.
 *
 * The item predicate mirrors `ErrorListPropType`: a `message` string plus a `selector` that is
 * either a CSS selector string or an event callback, the same shape the legacy `validateErrorList`
 * checks. A malformed list is ignored with a developer warning instead of being rendered.
 */
export type ErrorListProp = SimpleProp<'errorList', ErrorListPropType[]>;

function isErrorListEntry(value: unknown): value is ErrorListPropType {
	if (typeof value !== 'object' || value === null) {
		return false;
	}
	const { message, selector } = value as Partial<ErrorListPropType>;
	return typeof message === 'string' && (typeof selector === 'string' || typeof selector === 'function');
}

export const errorListProp = createPropDefinition<ErrorListProp>(
	'errorList',
	[],
	(value) => normalizeArray(value) as ErrorListPropType[],
	(items) => items.every(isErrorListEntry),
);
