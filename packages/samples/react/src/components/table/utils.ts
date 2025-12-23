import type { KoliBriTableHeaderCellWithLogic, KoliBriTableHeaders } from '@public-ui/components';

type HeaderCellInput = Omit<KoliBriTableHeaderCellWithLogic, 'width'> & { width?: number };

type HeadersInput = {
	horizontal?: HeaderCellInput[][];
	vertical?: HeaderCellInput[][];
};

export const ensureHeaderWidths = <T extends HeadersInput>(headers: T, defaultWidth = 160): KoliBriTableHeaders => {
	const withDefaultWidth = (cell: HeaderCellInput): KoliBriTableHeaderCellWithLogic => ({ ...cell, width: cell.width ?? defaultWidth });

	return {
		horizontal: headers.horizontal?.map((row) => row.map(withDefaultWidth)) ?? [],
		vertical: headers.vertical?.map((row) => row.map(withDefaultWidth)) ?? [],
	};
};
