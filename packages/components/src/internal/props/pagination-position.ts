import type { PaginationPositionPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

const paginationPositionOptions: readonly PaginationPositionPropType[] = ['both', 'bottom', 'top'];

/**
 * Where a table renders its pagination: above, below or on both sides of the table.
 */
export type PaginationPositionProp = SimpleProp<'paginationPosition', PaginationPositionPropType>;
export const paginationPositionProp = createPropDefinition<PaginationPositionProp>('paginationPosition', 'bottom', (value: unknown) => {
	const str = normalizeString(value);
	if (paginationPositionOptions.includes(str as PaginationPositionPropType)) {
		return str as PaginationPositionPropType;
	}
	throw new Error(`Invalid pagination position: ${str}`);
});
