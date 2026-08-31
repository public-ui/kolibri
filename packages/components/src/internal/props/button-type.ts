import type { ButtonTypePropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

const BUTTON_TYPE_OPTIONS: readonly ButtonTypePropType[] = ['button', 'reset', 'submit'];

/**
 * Type prop for the interactive element of button-like components.
 *
 * Defaults to `'button'` so a button inside a form never submits it accidentally — the same
 * default the predecessor validator enforced.
 */
export type ButtonTypeProp = SimpleProp<'type', ButtonTypePropType>;

function normalizeButtonType(value: unknown): ButtonTypePropType {
	const str = normalizeString(value);
	if ((BUTTON_TYPE_OPTIONS as readonly string[]).includes(str)) {
		return str as ButtonTypePropType;
	}
	throw new Error(`Invalid button type: ${str}`);
}

export const buttonTypeProp = createPropDefinition<ButtonTypeProp>('type', 'button', normalizeButtonType, (v) =>
	(BUTTON_TYPE_OPTIONS as readonly string[]).includes(v),
);
