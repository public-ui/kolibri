import type { FixedColsPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeArray } from './helpers/normalizers';

/**
 * Number of sticky columns at the start and at the end of a table.
 *
 * The default `[0, 0]` fixes no column, which renders exactly like an unset value: no column index
 * is lower than 0 or at least as high as the column count.
 */
export type FixedColsProp = SimpleProp<'fixedCols', FixedColsPropType>;

const isFixedColCount = (value: unknown): boolean => typeof value === 'number' && Number.isInteger(value) && value >= 0;

export const fixedColsProp = createPropDefinition<FixedColsProp>(
	'fixedCols',
	[0, 0],
	(value) => normalizeArray(value) as FixedColsPropType,
	(value) => value.length === 2 && value.every(isFixedColCount),
);
