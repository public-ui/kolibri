import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

const ARIA_CURRENT_VALUE_OPTIONS = ['date', 'location', 'page', 'step', 'time', 'true', 'false'] as const;

export type AriaCurrentValuePropType = (typeof ARIA_CURRENT_VALUE_OPTIONS)[number];
export type AriaCurrentValueProp = SimpleProp<'ariaCurrentValue', AriaCurrentValuePropType>;
export const ariaCurrentValueProp = createPropDefinition<AriaCurrentValueProp>(
	'ariaCurrentValue',
	'page',
	(value) => {
		if (value === undefined || value === null || value === '') return 'page';
		const str = normalizeString(value);
		if ((ARIA_CURRENT_VALUE_OPTIONS as readonly string[]).includes(str)) {
			return str as AriaCurrentValuePropType;
		}
		throw new Error(`Invalid ariaCurrentValue: ${str}`);
	},
	(v) => (ARIA_CURRENT_VALUE_OPTIONS as readonly string[]).includes(v),
);
