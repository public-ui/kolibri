export const parseColumnWidth = (width?: string, defaultWidth = 100): number => {
	const parsed = Number.parseInt(width ?? '', 10);
	return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultWidth;
};
