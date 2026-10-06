import type { SimpleProp } from './helpers/factory';
import { createDependentPropDefinition } from './helpers/factory';
import { normalizeNumber } from './helpers/normalizers';

/**
 * Clamped value prop for bounded numeric ranges
 *
 * Description:
 * Represents a numeric value that is automatically clamped between a minimum and maximum.
 * If the provided value falls outside the allowed range, it is silently adjusted to the
 * nearest boundary. This ensures the value always stays within valid bounds.
 *
 * Usage (according to W3C HTML specification and WAI-ARIA):
 * - Depends on min and max props to define the valid range
 * - Corresponds to the HTML <progress> or <meter> element's value, min, and max attributes
 * - Maps to aria-valuenow, aria-valuemin, and aria-valuemax in WAI-ARIA
 * - Clamping happens transparently; no error is raised for out-of-range inputs
 * - The default `0` is clamped as well; `NaN` and non-numeric values are ignored with a warning
 *
 * Accessibility:
 * - The value boundaries must be programmatically determinable (WCAG 1.3.1 Info and Relationships)
 * - Screen readers use aria-valuemin, aria-valuenow, and aria-valuemax to announce range status
 * - Consider providing aria-valuetext for a human-readable description of the value
 *
 * @see https://html.spec.whatwg.org/multipage/form-elements.html#the-meter-element
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-valuenow
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-valuemin
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-valuemax
 */
export type ClampedNumberValueProp = SimpleProp<'value', number>;

export type ClampedNumberValueDeps = {
	min: number;
	max: number;
};

function clamp(value: number, deps: ClampedNumberValueDeps): number {
	if (value < deps.min) {
		return deps.min;
	} else if (value > deps.max) {
		return deps.max;
	}
	return value;
}

const clampedNumberValueDefinition = createDependentPropDefinition<ClampedNumberValueProp, ClampedNumberValueDeps>(
	'value',
	0,
	(value, deps) => clamp(normalizeNumber(value), deps),
	(v) => typeof v === 'number' && !isNaN(v),
);

/**
 * The factory applies the default `0` for `undefined`/`null` without normalizing it, so `apply`
 * clamps every applied value, the default included, against the current `min` and `max`.
 */
export const clampedNumberValueProp: typeof clampedNumberValueDefinition = {
	...clampedNumberValueDefinition,
	apply(value, callback, deps) {
		clampedNumberValueDefinition.apply(value, (normalized) => callback(clamp(normalized, deps)), deps);
	},
};
