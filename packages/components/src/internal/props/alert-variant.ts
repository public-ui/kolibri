import { alertVariantOptions, type AlertVariantPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Variant prop for the alert presentation
 *
 * Description:
 * Determines the visual presentation of the alert. Both variants convey the same semantic
 * information; the variant choice is presentation-only.
 *
 * Usage:
 * - "msg": inline message style for compact notifications within the content flow
 * - "card": card style for standalone notifications
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html
 */
export type AlertVariantProp = SimpleProp<'variant', AlertVariantPropType>;
export const alertVariantProp = createPropDefinition<AlertVariantProp>(
	'variant',
	'msg',
	(value: unknown) => {
		const str = normalizeString(value);
		if (alertVariantOptions.includes(str as AlertVariantPropType)) {
			return str as AlertVariantPropType;
		}
		throw new Error(`Invalid alert variant: ${str}`);
	},
	() => true,
);
