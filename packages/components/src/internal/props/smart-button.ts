import type { InternalButtonProps, Stringified } from '../../schema';
import { parseJson } from '../../schema';
import { createPropDefinition, type Prop } from './helpers/factory';

/**
 * Smart Button prop for an embedded action button
 *
 * Description:
 * Describes a button that a component renders inside its own boundary — for example the
 * remove action of a badge. The value is the full prop set of `kol-button`, either as an
 * object or as a JSON string when it is passed through an HTML attribute.
 *
 * Usage:
 * - Object: `_smartButton={{ _label: 'Remove', _on: { onClick: remove } }}`
 * - Attribute: `_smart-button='{"_label":"Remove"}'`
 * - Absent: the host component renders no button at all
 *
 * Accessibility:
 * - The button carries its own label, so `_label` is mandatory even when the button only
 *   shows an icon (WCAG 4.1.2 Name, Role, Value)
 * - The embedded button is rendered with `_hideLabel`, which turns the label into a tooltip
 *   and keeps it available to assistive technology
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html
 */
export type SmartButtonProp = Prop<'smartButton', Stringified<InternalButtonProps>, InternalButtonProps>;

function normalizeSmartButton(value: unknown): InternalButtonProps | never {
	const parsed = typeof value === 'string' ? parseJson<InternalButtonProps>(value) : value;
	if (typeof parsed === 'object' && parsed !== null) {
		return parsed as InternalButtonProps;
	}
	throw new Error(`Invalid smart button: ${typeof value}`);
}

/**
 * The default is never rendered: a component clears the render prop when no smart button is
 * configured (see `KolBadge.applySmartButton`), so `apply` is only ever called with a value.
 * It exists because `createPropDefinition` seeds the render-prop store from it.
 */
export const smartButtonProp = createPropDefinition<SmartButtonProp>('smartButton', { _label: '' }, normalizeSmartButton);
