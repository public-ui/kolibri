import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-input-text` (30 props, 8 methods),
 * extracted from the legacy `shadow.tsx` ahead of its skeleton migration (G0 of
 * `docs/FORM_FIELD_SKELETON_MIGRATION_PLAN.md`). The migration points the pin to `component.tsx`
 * and adds the schema interface check; the pinned contract stays unchanged.
 */
const KOL_INPUT_TEXT_PUBLIC_API: PublicApiContract = {
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
	selectionEnd: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Get selection end of internal element.',
	},
	selectionStart: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Get selection start of internal element.',
	},
	setRangeText: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Add string at position of internal element; just like https://developer.mozilla.org/docs/Web/API/HTMLInputElement/setRangeText',
	},
	setSelectionRange: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Set selection start and end, and optional in which direction, of internal element; just like https://developer.mozilla.org/docs/Web/API/HTMLInputElement/setSelectionRange',
	},
	setSelectionStart: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Set selection start (and end = start) of internal element.',
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
		doc: 'References an external element by ID that provides accessible details for this input.',
	},
	_autoComplete: {
		kind: 'prop',
		type: 'AutoCompletePropType',
		required: false,
		default: "'off'",
		doc: 'Defines whether the input can be auto-completed.',
	},
	_disabled: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Makes the element not focusable and ignore all events. @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.',
	},
	_hasCounter: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Shows a character counter for the input element.',
	},
	_hideLabel: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Hides the caption by default and displays the caption text with a tooltip when the interactive element is focused or the mouse is over it. @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.',
	},
	_hideMsg: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: "Hides the error message but leaves it in the DOM for the input's aria-describedby. @TODO: Change type back to `HideMsgPropType` after Stencil#4663 has been resolved.",
	},
	_hint: {
		kind: 'prop',
		type: 'string',
		required: false,
		default: "''",
		doc: 'Defines the hint text.',
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
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.',
	},
	_maxLength: {
		kind: 'prop',
		type: 'number',
		required: false,
		doc: 'Defines the maximum number of input characters.',
	},
	_maxLengthBehavior: {
		kind: 'prop',
		type: 'MaxLengthBehaviorPropType',
		required: false,
		default: "'hard'",
		doc: "Defines the behavior when maxLength is set. 'hard' sets the maxlength attribute, 'soft' shows a character counter without preventing input.",
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
	_pattern: {
		kind: 'prop',
		type: 'string',
		required: false,
		doc: 'Defines a validation pattern for the input field.',
	},
	_placeholder: {
		kind: 'prop',
		type: 'string',
		required: false,
		doc: "Defines the placeholder for input field. To be shown when there's no value.",
	},
	_readOnly: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Makes the input element read only. @TODO: Change type back to `ReadOnlyPropType` after Stencil#4663 has been resolved.',
	},
	_required: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Makes the input element required. @TODO: Change type back to `RequiredPropType` after Stencil#4663 has been resolved.',
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
	_spellCheck: {
		kind: 'prop',
		type: 'SpellCheckPropType',
		required: false,
		doc: 'Defines whether the browser should check the spelling and grammar.',
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
		default: "'top'",
		doc: 'Defines where to show the Tooltip preferably: top, right, bottom or left.',
	},
	_touched: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Shows if the input was touched by a user. @TODO: Change type back to `TouchedPropType` after Stencil#4663 has been resolved.',
	},
	_type: {
		kind: 'prop',
		type: 'InputTextTypePropType',
		required: false,
		default: "'text'",
		doc: 'Defines either the type of the component or of the components interactive element.',
	},
	_value: {
		kind: 'prop',
		type: 'string',
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

describePublicApiContract({ tag: 'kol-input-text', component: 'input-text', file: 'shadow.tsx', pinnedApi: KOL_INPUT_TEXT_PUBLIC_API });
