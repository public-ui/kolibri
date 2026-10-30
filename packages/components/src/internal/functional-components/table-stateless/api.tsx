import type { KoliBriTableCell, KoliBriTableDataType, KoliBriTableHeaderCell, SelectionChangeEventPayload, SortEventPayload } from '../../../schema';
import { fixedColsProp } from '../../props/fixed-cols';
import { hasSettingsMenuProp } from '../../props/has-settings-menu';
import { labelLangSegmentsProp } from '../../props/label-lang-segment';
import { tableCallbacksProp } from '../../props/table-callbacks';
import { tableDataProp } from '../../props/table-data';
import { tableDataFootProp } from '../../props/table-data-foot';
import { tableHeadersProp } from '../../props/table-headers';
import { tableLoadingProp } from '../../props/table-loading';
import { tableSelectionProp } from '../../props/table-selection';
import { variantProp } from '../../props/variant';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props configuration for the stateless table.
 *
 * Notes on prop choices:
 * - `tableLoadingProp`, not `loadingProp`: both use the key `loading`, but `loadingProp` is the
 *   lazy-loading hint of embedded content.
 */
export const tableStatelessPropsConfig = {
	required: [labelLangSegmentsProp, tableDataProp],
	optional: [fixedColsProp, hasSettingsMenuProp, tableCallbacksProp, tableDataFootProp, tableHeadersProp, tableLoadingProp, tableSelectionProp, variantProp],
} as const satisfies PropsConfigShape;

export type TableStatelessApi = ApiFromConfig<
	typeof tableStatelessPropsConfig,
	{
		Callbacks: {
			/** Runs a cell's custom `render` function against its rendered `<td>`. */
			renderCell: (cell: KoliBriTableCell, element?: HTMLElement) => void;
			/** A selection checkbox or radio changed; the payload is the complete new selection. */
			selectionChange: (event: Event, payload: SelectionChangeEventPayload) => void;
			/** A sort button of a header cell was clicked. */
			sort: (event: MouseEvent, payload: SortEventPayload) => void;
		};
		Listeners: {
			/** The settings menu applied new horizontal header cells. */
			changeHeaderCells: CustomEvent<KoliBriTableHeaderCell[][]>;
			/** Arrow up/down moves the focus between the selection checkboxes. */
			keydown: KeyboardEvent;
		};
		Refs: {
			scrollContainer: HTMLDivElement;
			table: HTMLTableElement;
		};
		States: {
			/**
			 * Elements that label the table from outside its shadow root (`_ariaLabelledby`). While
			 * there are any, the table renders no caption of its own.
			 */
			externalLabelElements: HTMLElement[];
			/** Whether the scroll container overflows horizontally; it then becomes a keyboard stop. */
			hasScrollbar: boolean;
			/**
			 * A stable key per body row object, so a re-sorted table moves its rows instead of
			 * rewriting their cells.
			 */
			rowKeys: Map<KoliBriTableDataType, string>;
			/**
			 * Bumped whenever the settings menu changes the header cells. Part of every body cell's
			 * key, so each cell is recreated after a settings change.
			 */
			settingsChangedCounter: number;
			/** Whether the fixed columns are too wide for the container and render unfixed. */
			stickyColsDisabled: boolean;
		};
	}
>;
