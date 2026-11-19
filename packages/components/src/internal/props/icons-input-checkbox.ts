import type { InputCheckboxIconsProp, InputCheckboxIconsPropType, InputCheckboxIconsState } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

const iconKeys = ['checked', 'indeterminate', 'unchecked'] as const;

const isIconClass = (value: unknown): boolean => typeof value === 'string' && value.length > 0;

/**
 * Icons prop of `kol-input-checkbox`
 *
 * Description:
 * Icon classes of the three checkbox states. A value sets at least one of them; the field merges it
 * into the icons it already has, so the other states keep their icons.
 *
 * Only an object is accepted: a JSON string is rejected, like the legacy validator did.
 */
export type IconsInputCheckboxProp = Prop<'icons', InputCheckboxIconsPropType, Partial<InputCheckboxIconsState>>;
export const iconsInputCheckboxProp = createPropDefinition<IconsInputCheckboxProp>(
	'icons',
	{
		checked: 'kolicon-check',
		indeterminate: 'kolicon-minus',
		unchecked: 'kolicon-cross',
	},
	(value: unknown) => {
		if (typeof value === 'object' && value !== null && iconKeys.some((key) => isIconClass((value as Record<string, unknown>)[key]))) {
			return value as InputCheckboxIconsProp;
		}
		throw new Error('Expected an object with at least one icon class of checked, indeterminate or unchecked');
	},
);
