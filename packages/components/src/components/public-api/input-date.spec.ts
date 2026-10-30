import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-input-date` (27 props, 4 methods),
 * extracted from the legacy `shadow.tsx` ahead of its skeleton migration (G0 of
 * `docs/FORM_FIELD_SKELETON_MIGRATION_PLAN.md`). The migration points the pin to `component.tsx`
 * and adds the schema interface check; the pinned contract stays unchanged.
 */
const KOL_INPUT_DATE_PUBLIC_API: PublicApiContract = {
	click: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Clicks the primary interactive element inside this component.',
	},
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
		doc: 'Returns the current value.',
	},
	reset: {
		kind: 'method',
		type: '',
		required: false,
		doc: "Resets the component's value.",
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
		doc: 'References an external element by ID that provides accessible details for this input. Uses ElementInternals.ariaDetailsElements to cross the Shadow DOM boundary. Supported by desktop screen readers (NVDA, JAWS with Chrome/Firefox). Not yet supported by mobile screen readers (TalkBack, VoiceOver iOS).',
	},
	_autoComplete: {
		kind: 'prop',
		type: 'AutoCompletePropType',
		required: false,
		doc: 'Defines whether the input can be auto-completed.',
		default: "'off'",
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
	_max: {
		kind: 'prop',
		type: 'Iso8601 | Date',
		required: false,
		doc: 'Defines the maximum value of the element.',
	},
	_min: {
		kind: 'prop',
		type: 'Iso8601 | Date',
		required: false,
		doc: 'Defines the smallest possible input value.',
	},
	_msg: {
		kind: 'prop',
		type: 'Stringified<MsgPropType>',
		required: false,
		doc: 'Defines the properties for a message rendered as Alert component.',
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
	_readOnly: {
		kind: 'prop',
		type: 'ReadOnlyPropType',
		required: false,
		doc: 'Makes the input element read only.',
		default: 'false',
	},
	_required: {
		kind: 'prop',
		type: 'RequiredPropType',
		required: false,
		doc: 'Makes the input element required.',
		default: 'false',
	},
	_shortKey: {
		kind: 'prop',
		type: 'ShortKeyPropType',
		required: false,
		doc: 'Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.',
	},
	_smartButton: {
		kind: 'prop',
		type: 'Stringified<InternalButtonProps>',
		required: false,
		doc: 'Allows to add a button with an arbitrary action within the element (_hide-label only).',
	},
	_step: {
		kind: 'prop',
		type: 'number | NumberString',
		required: false,
		doc: 'Defines the step size for value changes.',
	},
	_suggestions: {
		kind: 'prop',
		type: 'SuggestionsPropType',
		required: false,
		doc: 'Suggestions to provide for the input.',
	},
	_syncValueBySelector: {
		kind: 'prop',
		type: 'SyncValueBySelectorPropType',
		required: false,
		doc: 'Selector for synchronizing the value with another input element. @internal',
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
	_type: {
		kind: 'prop',
		type: 'InputDateTypePropType',
		required: false,
		doc: 'Defines either the type of the component or of the components interactive element.',
		default: "'date'",
	},
	_value: {
		kind: 'prop',
		type: 'Iso8601 | Date | null',
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

describePublicApiContract({ tag: 'kol-input-date', component: 'input-date', pinnedApi: KOL_INPUT_DATE_PUBLIC_API, schemaInterface: 'InputDateProps' });
