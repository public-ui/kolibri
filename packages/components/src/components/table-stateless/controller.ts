/**
 * Parses a column width and returns its numeric value.
 * Returns undefined if the width is not finite or not positive.
 */
export const parseColumnWidth = (width: number | undefined): number | undefined => {
	return Number.isFinite(width) && width !== undefined && width > 0 ? width : undefined;
};
