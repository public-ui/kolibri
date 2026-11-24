import { isValidLabelSegments, isValidLabelString, type LabelDecorativePropType, type LabelWithExpertSlotPropType } from '../../../schema/props/label';

/**
 * Shared validators for prop definitions.
 *
 * `_customClass` and `_variant` share one class-name rule: a single safe class name of 1–61
 * characters that starts with a letter. A value with several classes such as `"foo bar"` is
 * rejected. Pinned by tests in `validators.spec.ts`.
 */
const SAFE_CLASS_NAME_RE = /^[a-zA-Z][a-zA-Z0-9_-]{0,60}$/;

export const isSafeClassName = (value: unknown): value is string => typeof value === 'string' && SAFE_CLASS_NAME_RE.test(value);

/**
 * A label is at least two characters long. Numbers-only labels are exempt from the minimum
 * length — generated labels like page numbers are valid button texts (same exemption as the
 * label hints). The "not set" state never reaches the validator: `apply` passes it through
 * directly when the definition has no default. The predicates live in `schema/props/label.ts`,
 * the single source shared with the watch-validator route.
 */
export const isValidLabel = isValidLabelString;

export { isValidLabelSegments };

/**
 * The label of a component with an expert slot additionally accepts the empty string — it enables
 * the expert slot — and, like `isValidLabelSegments`, language segments.
 */
export const isValidLabelWithExpertSlot = (value: LabelWithExpertSlotPropType): boolean => value === '' || isValidLabelSegments(value);

/** The label of an icon additionally accepts the empty string, which marks the icon as decorative. */
export const isValidLabelDecorative = (value: LabelDecorativePropType): boolean => value === '' || isValidLabel(value);
