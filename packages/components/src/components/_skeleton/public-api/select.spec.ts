import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-select` (23 props, 2 methods),
 * extracted from the legacy `shadow.tsx` ahead of its skeleton migration (G0 of
 * `docs/FORM_FIELD_SKELETON_MIGRATION_PLAN.md`). The migration points the pin to `component.tsx`
 * and adds the schema interface check; the pinned contract stays unchanged.
 */
const KOL_SELECT_PUBLIC_API: PublicApiContract = {
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the internal element.',
	},
	getValue: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Returns the selected values.',
	},
	_accessKey: {
		kind: 'prop',
		type: 'AccessKeyPropType',
		required: false,
		doc: "Defines the key combination that can be used to trigger or focus the component's interactive element.",
	},
	_ariaDetails: {
		kind: 'prop',
		type: 'AriaDetailsPropType',
		required: false,
		doc: "References an external element by ID that provides accessible details for this select. The IDs are pushed as element references to the native control's `ariaDetailsElements` to cross the Shadow DOM boundary. Screen reader support is heavily fragmented (only Orca is complete; VoiceOver, TalkBack and Narrator ignore the relation) — provide the details visibly as well. See KNOWN_ISSUES.md.",
	},
	_disabled: {
		kind: 'prop',
		type: 'DisabledPropType',
		required: false,
		doc: 'Makes the element not focusable and ignore all events.',
		default: 'false',
	},
	_hideLabel: {
		kind: 'prop',
		type: 'HideLabelPropType',
		required: false,
		doc: 'Hides the caption by default and displays the caption text with a tooltip when the interactive element is focused or the mouse is over it.',
		default: 'false',
	},
	_hideMsg: {
		kind: 'prop',
		type: 'HideMsgPropType',
		required: false,
		doc: "Hides the error message but leaves it in the DOM for the input's aria-describedby.",
		default: 'false',
	},
	_hint: {
		kind: 'prop',
		type: 'HintPropType',
		required: false,
		doc: 'Defines the hint text.',
		default: "''",
	},
	_icons: {
		kind: 'prop',
		type: 'IconsHorizontalPropType',
		required: false,
		doc: 'Defines the icon classnames.',
	},
	_infoPopover: {
		kind: 'prop',
		type: 'FormFieldLabelInfoPopoverProps',
		required: false,
		doc: 'Defines the informational popover after the label.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelWithExpertSlotPropType',
		required: true,
		doc: "Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `''` to enable the expert slot.",
	},
	_msg: {
		kind: 'prop',
		type: 'Stringified<MsgPropType>',
		required: false,
		doc: 'Defines the properties for a message rendered as Alert component.',
	},
	_multiple: {
		kind: 'prop',
		type: 'MultiplePropType',
		required: false,
		doc: 'Makes the input accept multiple inputs.',
		default: 'false',
	},
	_name: {
		kind: 'prop',
		type: 'NamePropType',
		required: false,
		doc: 'Defines the technical name of an input field.',
	},
	_on: {
		kind: 'prop',
		type: 'InputTypeOnDefault',
		required: false,
		doc: 'Gibt die EventCallback-Funktionen für das Input-Event an.',
	},
	_options: {
		kind: 'prop',
		type: 'OptionsWithOptgroupPropType',
		required: true,
		doc: 'Options the user can choose from.',
	},
	_required: {
		kind: 'prop',
		type: 'RequiredPropType',
		required: false,
		doc: 'Makes the input element required.',
		default: 'false',
	},
	_rows: {
		kind: 'prop',
		type: 'RowsPropType',
		required: false,
		doc: 'Maximum number of visible rows of the element.',
	},
	_shortKey: {
		kind: 'prop',
		type: 'ShortKeyPropType',
		required: false,
		doc: 'Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.',
	},
	_syncValueBySelector: {
		kind: 'prop',
		type: 'SyncValueBySelectorPropType',
		required: false,
		doc: 'Selector for synchronizing the value with another input element. @internal',
	},
	_tabIndex: {
		kind: 'prop',
		type: 'TabIndexPropType',
		required: false,
		doc: 'Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)',
	},
	_tooltipAlign: {
		kind: 'prop',
		type: 'TooltipAlignPropType',
		required: false,
		doc: 'Defines where to show the Tooltip preferably: top, right, bottom or left.',
		default: "'top'",
	},
	_touched: {
		kind: 'prop',
		type: 'TouchedPropType',
		required: false,
		doc: 'Shows if the input was touched by a user.',
		default: 'false',
	},
	_value: {
		kind: 'prop',
		type: 'Stringified<StencilUnknown[]> | Stringified<StencilUnknown>',
		required: false,
		doc: 'Defines the value of the element.',
	},
	_variant: {
		kind: 'prop',
		type: 'VariantClassNamePropType',
		required: false,
		doc: 'Defines which variant should be used for presentation.',
	},
};

describePublicApiContract({ tag: 'kol-select', component: 'select', pinnedApi: KOL_SELECT_PUBLIC_API, schemaInterface: 'SelectProps' });
