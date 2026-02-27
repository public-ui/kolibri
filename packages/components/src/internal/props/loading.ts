import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type LoadingProp = SimpleProp<'loading', 'eager' | 'lazy'>;
export const loadingProp = createPropDefinition<LoadingProp>((v) => {
	const s = normalizeString(v);
	if (s === 'eager' || s === 'lazy') {
		return s;
	}
	throw new Error(`Invalid loading value: ${s}`);
});
