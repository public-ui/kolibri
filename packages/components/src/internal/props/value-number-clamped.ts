import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeNumber } from './helpers/normalizers';

export type ClampedNumberValueProp = SimpleProp<'value', number>;

export type ClampedNumberValueDeps = {
	min: number;
	max: number;
};

export const clampedNumberValueProp = createPropDefinition<ClampedNumberValueProp, ClampedNumberValueDeps>(
	(value, deps) => {
		const normalized = normalizeNumber(value);
		if (normalized < deps.min) {
			return deps.min;
		} else if (deps.max !== undefined && normalized > deps.max) {
			return deps.max;
		}
		return normalized;
	},
	(v) => v >= 0,
);
