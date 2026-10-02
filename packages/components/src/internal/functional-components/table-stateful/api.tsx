import type { KoliBriTableDataType, KoliBriTableHeaderCell } from '../../../schema';
import {
	allowMultiSortProp,
	fixedColsProp,
	hasSettingsMenuProp,
	labelWithExpertSlotProp,
	paginationPositionProp,
	tableDataFootProp,
	tableDataProp,
	tableLoadingProp,
	tablePaginationProp,
	tableSelectionProp,
	tableStatefulCallbacksProp,
	tableStatefulHeadersProp,
	variantProp,
} from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props configuration of `kol-table-stateful`. The element renders the stateless table itself; these
 * are its own props, from which it derives the render props of the stateless table (displayed rows,
 * header cells with their sort state). `labelWithExpertSlotProp` for the caption, as in the stateless
 * table.
 */
export const tableStatefulPropsConfig = {
	required: [labelWithExpertSlotProp, tableDataProp, tableStatefulHeadersProp],
	optional: [
		allowMultiSortProp,
		fixedColsProp,
		hasSettingsMenuProp,
		paginationPositionProp,
		tableDataFootProp,
		tableLoadingProp,
		tablePaginationProp,
		tableSelectionProp,
		tableStatefulCallbacksProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type TableStatefulApi = ApiFromConfig<
	typeof tableStatefulPropsConfig,
	{
		Listeners: {
			/** The settings menu applied new horizontal header cells. */
			changeHeaderCells: CustomEvent<KoliBriTableHeaderCell[][]>;
			/** Arrow up/down moves the focus between the selection checkboxes. */
			keydown: KeyboardEvent;
		};
		Methods: {
			/** Returns the selected rows. */
			getSelection: () => KoliBriTableDataType[] | null;
			/** Resets the sort to the one defined in the headers. */
			resetSort: () => void;
		};
		States: {
			/** Elements outside the shadow root that label the table (`_ariaLabelledby`). */
			externalLabelElements: HTMLElement[];
			/** Whether the scroll container overflows; it then becomes a keyboard stop. */
			hasScrollbar: boolean;
			/** A stable key per body row object. */
			rowKeys: Map<KoliBriTableDataType, string>;
			/** Bumped whenever the settings menu changes the header cells. */
			settingsChangedCounter: number;
			/** All rows, sorted; the displayed page is sliced from them. */
			sortedData: KoliBriTableDataType[];
			/** Whether the fixed columns are too wide for the container and render unfixed. */
			stickyColsDisabled: boolean;
		};
	}
>;
