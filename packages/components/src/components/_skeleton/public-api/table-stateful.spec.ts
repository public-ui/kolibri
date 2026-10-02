import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-table-stateful` (14 props, 2 methods), extracted from the legacy `shadow.tsx`
 * before its skeleton migration (#9599).
 */
const KOL_TABLE_STATEFUL_PUBLIC_API: PublicApiContract = {
	getSelection: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Returns the selected rows.',
	},
	resetSort: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Resets the sort state to the default values defined in the `_headers` prop.',
	},
	_allowMultiSort: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		doc: 'Defines whether to allow multi sort.',
	},
	_ariaLabelledby: {
		kind: 'prop',
		type: 'AriaLabelledbyPropType',
		required: false,
		doc: 'References an external element by ID that serves as the accessible label for this table. Uses ElementInternals.ariaLabelledByElements to cross the Shadow DOM boundary. Supported by desktop screen readers (NVDA, JAWS with Chrome/Firefox). Not yet supported by mobile screen readers (TalkBack, VoiceOver iOS) — use `_label` instead.',
	},
	_data: {
		kind: 'prop',
		type: 'Stringified<KoliBriTableDataType[]>',
		required: true,
		doc: 'Defines the primary table data.',
	},
	_dataFoot: {
		kind: 'prop',
		type: 'Stringified<KoliBriTableDataType[]>',
		required: false,
		doc: 'Defines the data for the table footer.',
	},
	_fixedCols: {
		kind: 'prop',
		type: 'FixedColsPropType',
		required: false,
		doc: 'Defines the fixed number of columns from start and end of the table',
	},
	_hasSettingsMenu: {
		kind: 'prop',
		type: 'HasSettingsMenuPropType',
		required: false,
		doc: 'Enables the settings menu if true (default: false).',
	},
	_headers: {
		kind: 'prop',
		type: 'Stringified<KoliBriTableHeaders>',
		required: true,
		doc: 'Defines the horizontal and vertical table headers.',
	},
	_label: {
		kind: 'prop',
		type: 'string',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_loading: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		doc: 'Wether the table shows a loading spinner (default: false).',
	},
	_on: {
		kind: 'prop',
		type: 'TableStatefulCallbacksPropType',
		required: false,
		doc: 'Defines the callback functions for table events.',
	},
	_pagination: {
		kind: 'prop',
		type: 'boolean | Stringified<KoliBriTablePaginationProps>',
		required: false,
		doc: 'Defines whether to show the data distributed over multiple pages.',
	},
	_paginationPosition: {
		kind: 'prop',
		type: 'PaginationPositionPropType',
		required: false,
		default: "'bottom'",
		doc: 'Controls the position of the pagination.',
	},
	_selection: {
		kind: 'prop',
		type: 'TableSelectionPropType',
		required: false,
		doc: 'Defines how rows can be selected and the current selection.',
	},
	_variant: {
		kind: 'prop',
		type: 'VariantClassNamePropType',
		required: false,
		doc: 'Defines which variant should be used for presentation.',
	},
};

describePublicApiContract({ tag: 'kol-table-stateful', component: 'table-stateful', file: 'shadow.tsx', pinnedApi: KOL_TABLE_STATEFUL_PUBLIC_API });
