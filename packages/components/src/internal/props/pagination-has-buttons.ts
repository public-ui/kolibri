import type { PaginationHasButton, Stringified } from '../../schema';
import { parseJson } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Has buttons prop of `kol-pagination`
 *
 * Description:
 * Which navigation buttons to render: `true`/`false` for all four, or an object (also as JSON string)
 * that sets single buttons. The normalized value holds only the buttons the value sets; the
 * pagination merges it into the current buttons.
 */
export type PaginationHasButtonsProp = Prop<'hasButtons', boolean | Stringified<PaginationHasButton>, Partial<PaginationHasButton>>;

const BUTTONS = ['first', 'last', 'next', 'previous'] as const;

const allButtons = (shown: boolean): PaginationHasButton => ({ first: shown, last: shown, next: shown, previous: shown });

function normalizeHasButtons(value: unknown): Partial<PaginationHasButton> | never {
	if (typeof value === 'boolean') {
		return allButtons(value);
	}
	if (typeof value === 'object' && value !== null) {
		const buttons: Partial<PaginationHasButton> = {};
		BUTTONS.forEach((button) => {
			const shown = (value as Partial<Record<string, unknown>>)[button];
			if (typeof shown === 'boolean') {
				buttons[button] = shown;
			}
		});
		return buttons;
	}
	if (typeof value === 'string') {
		const parsed = parseJson<unknown>(value);
		// A JSON string that is no object renders no button.
		return typeof parsed === 'object' && parsed !== null ? normalizeHasButtons(parsed) : allButtons(false);
	}
	throw new Error('Invalid pagination buttons');
}

export const paginationHasButtonsProp = createPropDefinition<PaginationHasButtonsProp>('hasButtons', allButtons(true), normalizeHasButtons);
