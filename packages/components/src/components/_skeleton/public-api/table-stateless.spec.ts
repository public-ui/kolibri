import type { PublicApiContract } from './contract';
import { describePublicApiContract, extractFrom, readSource } from './contract';

/**
 * Pinned public API of `kol-table-stateless`: 12 props, including the deprecated `_headerCells`,
 * and no methods.
 */
const KOL_TABLE_STATELESS_PUBLIC_API: PublicApiContract = {
	_ariaLabelledby: {
		kind: 'prop',
		type: 'AriaLabelledbyPropType',
		required: false,
		doc: 'References an external element by ID that serves as the accessible label for this table. Uses ElementInternals.ariaLabelledByElements to cross the Shadow DOM boundary. Supported by desktop screen readers (NVDA, JAWS with Chrome/Firefox). Not yet supported by mobile screen readers (TalkBack, VoiceOver iOS) — use `_label` instead.',
	},
	_data: {
		kind: 'prop',
		type: 'TableDataPropType',
		required: true,
		doc: 'Defines the primary table data.',
	},
	_dataFoot: {
		kind: 'prop',
		type: 'TableDataFootPropType',
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
	_headerCells: {
		kind: 'prop',
		type: 'TableHeaderCellsPropType',
		required: false,
		doc: '@deprecated Will be removed in the future. Use _headers instead. Defines the horizontal and vertical table headers.',
	},
	_headers: {
		kind: 'prop',
		type: 'TableHeaderCellsPropType',
		required: false,
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
		type: 'TableCallbacksPropType',
		required: false,
		doc: 'Defines the callback functions for table events.',
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

describePublicApiContract({
	tag: 'kol-table-stateless',
	component: 'table-stateless',
	pinnedApi: KOL_TABLE_STATELESS_PUBLIC_API,
	schemaInterface: 'TableStatelessProps',
});

describe('kol-table-stateless-wc transitional wrapper (internal contract for legacy consumers)', () => {
	it('keeps every prop kol-table-stateful sets, plus externalLabelElements', () => {
		const source = readSource('table-stateless', 'wc.tsx');
		const props = [...source.matchAll(/@Prop\(\)\s+public\s+(\w+)/g)].map((match) => match[1]);
		expect(props.sort()).toEqual(
			[
				'_data',
				'_dataFoot',
				'_fixedCols',
				'_hasSettingsMenu',
				'_headers',
				'_label',
				'_loading',
				'_on',
				'_selection',
				'_variant',
				'externalLabelElements',
			].sort(),
		);
		expect(extractFrom('table-stateless', 'wc.tsx').filter((member) => member.kind === 'method')).toHaveLength(0);
	});
});
