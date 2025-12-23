/**
 * Parses a column width and returns its numeric value.
 * Returns defaultWidth if the width is not finite or not positive.
 */
export const parseColumnWidth = (width?: number | string, defaultWidth = 100): number => {
	const parsed = typeof width === 'number' ? width : typeof width === 'string' ? parseFloat(width) : NaN;
	return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultWidth;
};
