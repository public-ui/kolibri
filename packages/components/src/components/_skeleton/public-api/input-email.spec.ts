import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-input-email` (29 props, 3 methods),
 * extracted from the legacy `shadow.tsx` ahead of its skeleton migration (G0 of
 * `docs/FORM_FIELD_SKELETON_MIGRATION_PLAN.md`). The migration points the pin to `component.tsx`
 * and adds the schema interface check; the pinned contract stays unchanged.
 */
const KOL_INPUT_EMAIL_PUBLIC_API: PublicApiContract = {
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
		doc: "References an external element by ID that provides accessible details for this input. The IDs are pushed as element references to the native control's `ariaDetailsElements` to cross the Shadow DOM boundary. Screen reader support is heavily fragmented (only Orca is complete; VoiceOver, TalkBack and Narrator ignore the relation) — provide the details visibly as well. See KNOWN_ISSUES.md.",
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
	_hasCounter: {
		kind: 'prop',
		type: 'HasCounterPropType',
		required: false,
		doc: 'Shows a character counter for the input element.',
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
	_maxLength: {
		kind: 'prop',
		type: 'MaxLengthPropType',
		required: false,
		doc: 'Defines the maximum number of input characters.',
	},
	_maxLengthBehavior: {
		kind: 'prop',
		type: 'MaxLengthBehaviorPropType',
		required: false,
		doc: "Defines the behavior when maxLength is set. 'hard' sets the maxlength attribute, 'soft' shows a character counter without preventing input.",
		default: "'hard'",
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
	_pattern: {
		kind: 'prop',
		type: 'PatternPropType',
		required: false,
		doc: 'Defines a validation pattern for the input field.',
	},
	_placeholder: {
		kind: 'prop',
		type: 'PlaceholderPropType',
		required: false,
		doc: "Defines the placeholder for input field. To be shown when there's no value.",
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
	_value: {
		kind: 'prop',
		type: 'StringValuePropType',
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

describePublicApiContract({ tag: 'kol-input-email', component: 'input-email', pinnedApi: KOL_INPUT_EMAIL_PUBLIC_API, schemaInterface: 'InputEmailProps' });
