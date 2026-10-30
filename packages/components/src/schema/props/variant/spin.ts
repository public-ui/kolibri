import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../../utils/prop.validators';

/* types */
/**
 * Loading-spinner
 * - https://github.com/vineethtrv/css-loader
 */
const spinVariantPropTypeOptions = ['cycle', 'dot', 'none'] as const;

/**
 * @deprecated Unused legacy schema of `kol-spin`. The component normalizes and validates its props
 * internally (`internal/props`); this exported schema is kept only for backwards compatibility and
 * will be removed in a future major release.
 */
export type SpinVariantPropType = (typeof spinVariantPropTypeOptions)[number];

/**
 * Defines the variant of spin navigation.
 *
 * @deprecated Unused legacy schema of `kol-spin`. See `SpinVariantPropType`.
 */
export type PropSpinVariant = {
	variant: SpinVariantPropType;
};

/* validator */

/**
 * @deprecated Unused legacy schema of `kol-spin`. The component validates its props internally
 * (`internal/props`); this exported validator is kept only for backwards compatibility and will be
 * removed in a future major release.
 */
export const validateSpinVariant = (component: Generic.Element.Component, value?: SpinVariantPropType): void => {
	watchValidator(
		component,
		'_variant',
		(value) => typeof value === 'string' && spinVariantPropTypeOptions.includes(value),
		new Set(spinVariantPropTypeOptions),
		value,
	);
};
