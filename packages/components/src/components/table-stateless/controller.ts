/**
 * Parses a column width string and returns its numeric value.
 * Strips any unit suffix (e.g., 'px', 'ch') and supports fractional values.
 * Returns defaultWidth if the parsed value is not finite or not positive.
 */
export const parseColumnWidth = (width?: string, defaultWidth = 100): number => {
	const parsed = Number.parseFloat(width ?? '');
	return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultWidth;
};
