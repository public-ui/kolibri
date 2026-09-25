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
		type: 'string',
		required: false,
		doc: "Defines the key combination that can be used to trigger or focus the component's interactive element.",
	},
	_ariaDetails: {
		kind: 'prop',
		type: 'AriaDetailsPropType',
		required: false,
		doc: 'References an external element by ID that provides accessible details for this select.',
	},
	_disabled: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Makes the element not focusable and ignore all events. @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.',
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
	_msg: {
		kind: 'prop',
		type: 'Stringified<MsgPropType>',
		required: false,
		doc: 'Defines the properties for a message rendered as Alert component.',
	},
	_multiple: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Makes the input accept multiple inputs. @TODO: Change type back to `MultiplePropType` after Stencil#4663 has been resolved.',
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
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Makes the input element required. @TODO: Change type back to `RequiredPropType` after Stencil#4663 has been resolved.',
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
		type: 'number',
		required: false,
		doc: 'Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)',
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

describePublicApiContract({ tag: 'kol-select', component: 'select', file: 'shadow.tsx', pinnedApi: KOL_SELECT_PUBLIC_API });

/**
 * Pinned surface of `kol-select-wc` (23 props, 3 methods): internal contract for `kol-pagination`, which
 * renders the tag directly. It stays pinned until `kol-pagination` renders the select FC (G5 of
 * `docs/FORM_FIELD_SKELETON_MIGRATION_PLAN.md`).
 */
const KOL_SELECT_WC_PUBLIC_API: PublicApiContract = {
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
		type: 'string',
		required: false,
		doc: 'Defines the key combination that can be used to trigger or focus the component’s interactive element.',
	},
	_ariaDetails: {
		kind: 'prop',
		type: 'AriaDetailsPropType',
		required: false,
		doc: 'References an external element by ID that provides accessible details for this select.',
	},
	_disabled: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Makes the element not focusable and ignore all events. @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.',
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
	_msg: {
		kind: 'prop',
		type: 'Stringified<MsgPropType>',
		required: false,
		doc: 'Defines the properties for a message rendered as Alert component.',
	},
	_multiple: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Makes the input accept multiple inputs. @TODO: Change type back to `MultiplePropType` after Stencil#4663 has been resolved.',
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
		doc: 'Options the user can choose from, also supporting Optgroup.',
	},
	_required: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Makes the input element required. @TODO: Change type back to `RequiredPropType` after Stencil#4663 has been resolved.',
	},
	_rows: {
		kind: 'prop',
		type: 'RowsPropType',
		required: false,
		doc: 'Defines how many rows of options should be visible at the same time.',
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
		type: 'number',
		required: false,
		doc: 'Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)',
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
	_value: {
		kind: 'prop',
		type: 'Stringified<StencilUnknown[]> | Stringified<StencilUnknown>',
		required: false,
		doc: 'Defines the value of the input.',
	},
	_variant: {
		kind: 'prop',
		type: 'VariantClassNamePropType',
		required: false,
		doc: 'Defines which variant should be used for presentation.',
	},
};

describePublicApiContract({ tag: 'kol-select-wc', component: 'select', file: 'component.tsx', pinnedApi: KOL_SELECT_WC_PUBLIC_API });
