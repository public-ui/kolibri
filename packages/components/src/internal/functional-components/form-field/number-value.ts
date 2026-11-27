/** Parses the value of a native number input of `kol-input-number`: an empty input has no value. */
export function parseInputNumberValue(raw?: string): number | null {
	return raw === '' ? null : Number(raw);
}

/**
 * Parses the value of a native input of `kol-input-range` and clamps it to the bounds. A bound of `0`
 * does not clamp (#10861), and an empty input yields `NaN`.
 */
export function clampRangeValue(raw: string, min?: number | null, max?: number | null): number {
	const value = parseFloat(raw);
	if (max && value > max) {
		return max;
	}
	if (min && value < min) {
		return min;
	}
	return value;
}
