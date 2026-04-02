import type { AriaCurrentValuePropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Aria Current Value prop
 *
 * Defines the value for the aria-current attribute, indicating the current item within a container or set.
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current
 */
export type AriaCurrentValueProp = SimpleProp<'ariaCurrentValue', AriaCurrentValuePropType>;

const ariaCurrentValueOptions: readonly string[] = ['date', 'location', 'page', 'step', 'time', 'true', 'false'];

export const ariaCurrentValueProp = createPropDefinition<AriaCurrentValueProp>(
	'ariaCurrentValue',
	'page',
	(value) => {
		const str = normalizeString(value);
		if (ariaCurrentValueOptions.includes(str)) {
			return str as AriaCurrentValuePropType;
		}
		throw new Error(`Invalid ariaCurrentValue: ${str}`);
	},
	(v) => ariaCurrentValueOptions.includes(v),
);
