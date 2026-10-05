import type { IconsHorizontalPropType, KoliBriIconsProp, KoliBriIconsState } from '../../schema';
import { isIcon, isString, mapIconProp2State, parseJson } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Horizontal icons prop for form fields
 *
 * Description:
 * Icons rendered at the start (`left`) and end (`right`) of an input, as an object, as a JSON
 * string when it is passed through an HTML attribute, or as a single icon class that is placed
 * on the left. The value is normalized to an icon object per position.
 *
 * Accessibility:
 * - Icons are decorative unless they carry a `label` (WCAG 1.1.1 Non-text Content)
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html
 */
export type HorizontalIconsProp = Prop<'icons', IconsHorizontalPropType, KoliBriIconsState>;

const isIconPosition = (value: unknown): boolean => isString(value, 0) || isIcon(value);

function normalizeHorizontalIcons(value: unknown): KoliBriIconsState | never {
	let parsed = value;
	if (typeof value === 'string') {
		try {
			parsed = parseJson<KoliBriIconsProp>(value);
		} catch {
			// A plain icon class is no JSON and stays a string.
		}
	}
	if (isString(parsed, 1)) {
		return mapIconProp2State(parsed as KoliBriIconsProp);
	}
	if (typeof parsed === 'object' && parsed !== null) {
		const icons = parsed as Record<string, unknown>;
		if (Object.keys(icons).length === 0 || ['left', 'right', 'top', 'bottom'].some((position) => isIconPosition(icons[position]))) {
			return mapIconProp2State(parsed as KoliBriIconsProp);
		}
	}
	throw new Error(`Invalid icons: ${typeof value}`);
}

export const horizontalIconsProp = createPropDefinition<HorizontalIconsProp>('icons', {}, normalizeHorizontalIcons);
