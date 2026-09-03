import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { isSafeClassName } from './helpers/validators';

/**
 * Variant prop for class-name based variants (e.g. kol-link, kol-button).
 *
 * External type: `string | string[]` — a space-separated string of variant names or an array.
 * Internal type: `string[]` — always normalized to an array. An empty array means "no variant".
 *
 * This mirrors the legacy `validateVariantClassName` → `beforePatchString` pipeline, which split
 * strings by spaces into arrays before storing them in state. The `classNameFromVariant` renderer
 * only processes arrays, so normalizing here ensures the variant classes are always applied.
 */
export type VariantProp = Prop<'variant', string | string[], string[]>;

/**
 * Normalizes the variant value to an array of variant tokens.
 *
 * - Arrays are passed through as-is.
 * - Strings are split by spaces into tokens (matches `beforePatchString`).
 * - The factory's `apply` handles undefined/null before this is reached.
 */
function normalizeVariant(value: unknown): string[] {
	if (Array.isArray(value)) {
		return value as string[];
	}
	if (typeof value === 'string') {
		return value.split(' ');
	}
	return [];
}

/**
 * Validates the normalized variant value.
 *
 * - Empty array means "no variant" and is valid.
 * - Non-empty arrays must consist entirely of safe class names.
 */
function validateVariant(value: string[]): boolean {
	return value.length === 0 || value.every(isSafeClassName);
}

export const variantProp = createPropDefinition<VariantProp>('variant', [], normalizeVariant, validateVariant);
