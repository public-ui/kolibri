import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-button-link` — byte-identical to the predecessor `shadow.tsx` on the
 * develop branch (19 props + getValue/focus/click), except `_on`'s JSDoc, translated from German
 * to English to match every other prop's documentation (doc-only, no behavior change). `_role`
 * stays declared but, as before, is not forwarded to the inner element.
 */
const KOL_BUTTON_LINK_PUBLIC_API: PublicApiContract = {
	getValue: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Returns the current value.',
	},
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the internal element.',
	},
	click: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Clicks the primary interactive element inside this component.',
	},
	_accessKey: {
		kind: 'prop',
		type: 'AccessKeyPropType',
		required: false,
		doc: "Defines the key combination that can be used to trigger or focus the component's interactive element.",
	},
	_ariaControls: {
		kind: 'prop',
		type: 'string',
		required: false,
		doc: 'Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)',
	},
	_ariaDescription: {
		kind: 'prop',
		type: 'AriaDescriptionPropType',
		required: false,
		doc: 'Defines the value for the aria-description attribute.',
	},
	_ariaExpanded: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		doc: 'Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded) @TODO: Change type back to `AriaExpandedPropType` after Stencil#4663 has been resolved.',
	},
	_ariaSelected: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		doc: 'Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected) @TODO: Change type back to `AriaSelectedPropType` after Stencil#4663 has been resolved.',
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
	_icons: {
		kind: 'prop',
		type: 'IconsPropType',
		required: false,
		doc: 'Defines the icon classnames.',
	},
	_inline: {
		kind: 'prop',
		type: 'InlinePropType',
		required: false,
		default: 'true',
		doc: 'Defines whether the component is displayed as a standalone block or inline without enforcing a minimum size of 44px.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelWithExpertSlotPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.',
	},
	_name: {
		kind: 'prop',
		type: 'NamePropType',
		required: false,
		doc: 'Defines the technical name of an input field.',
	},
	_on: {
		kind: 'prop',
		type: 'ButtonCallbacksPropType<StencilUnknown>',
		required: false,
		doc: 'Defines the callback functions for button events.',
	},
	_role: {
		kind: 'prop',
		type: 'AlternativeButtonLinkRolePropType',
		required: false,
		doc: 'Defines the role of the components primary element. @deprecated We prefer the semantic role of the HTML element and do not allow for customization. We will remove this prop in the future.',
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
	_tooltipAlign: {
		kind: 'prop',
		type: 'TooltipAlignPropType',
		required: false,
		default: "'top'",
		doc: 'Defines where to show the Tooltip preferably: top, right, bottom or left.',
	},
	_type: {
		kind: 'prop',
		type: 'ButtonTypePropType',
		required: false,
		default: "'button'",
		doc: 'Defines either the type of the component or of the components interactive element.',
	},
	_value: {
		kind: 'prop',
		type: 'StencilUnknown',
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

describePublicApiContract({ tag: 'kol-button-link', component: 'button-link', pinnedApi: KOL_BUTTON_LINK_PUBLIC_API, schemaInterface: 'ButtonLinkProps' });
