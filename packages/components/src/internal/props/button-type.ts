import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

const BUTTON_TYPES = ['button', 'reset', 'submit'] as const;
export type ButtonType = (typeof BUTTON_TYPES)[number];

/**
 * Button Type prop for defining button behavior
 *
 * Description:
 * Defines either the type of the component or of the component's interactive element.
 * - button: Default type, performs no implicit action
 * - submit: Submits the form data
 * - reset: Resets all form controls to their initial values
 *
 * Usage (according to HTML specification):
 * - Default: 'button' (no form action)
 * - Use 'submit' for form submission buttons
 * - Use 'reset' for form reset buttons
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#type
 */
export type ButtonTypeProp = SimpleProp<'type', ButtonType>;
export const buttonTypeProp = createPropDefinition<ButtonTypeProp>(
	'type',
	'button',
	(value: unknown) => {
		const normalized = normalizeString(value);
		return BUTTON_TYPES.includes(normalized as ButtonType) ? (normalized as ButtonType) : 'button';
	},
	(v) => BUTTON_TYPES.includes(v),
);
