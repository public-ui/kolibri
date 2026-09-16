import { alertTypeOptions, type AlertType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Type prop for alert semantics
 *
 * Description:
 * Determines the semantic meaning of the alert, which selects the icon and the color scheme.
 *
 * Usage (according to WCAG 2.1 and WAI-ARIA):
 * - The type must be distinguishable by more than color alone (WCAG 1.4.1 Use of Color) — each type renders its own icon
 * - "error" and "warning" convey critical information and must be perceivable (WCAG 4.1.3 Status Messages)
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html
 * @see https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html
 */
export type AlertTypeProp = SimpleProp<'type', AlertType>;
export const alertTypeProp = createPropDefinition<AlertTypeProp>(
	'type',
	'default',
	(value: unknown) => {
		const str = normalizeString(value);
		if (alertTypeOptions.includes(str as AlertType)) {
			return str as AlertType;
		}
		throw new Error(`Invalid alert type: ${str}`);
	},
	() => true,
);
