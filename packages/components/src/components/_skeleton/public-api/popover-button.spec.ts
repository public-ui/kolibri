import type { PublicApiContract } from './contract';
import { describePublicApiContract, extractFrom } from './contract';

/**
 * Pinned public API of `kol-popover-button` — identical surface to the predecessor (17 props plus
 * showPopover(), hidePopover(), focus() and click()). The wrapper-forwarding wording of the two
 * popover method docs was adapted to the skeleton orchestrator; the surface itself is unchanged.
 */
const KOL_POPOVER_BUTTON_PUBLIC_API: PublicApiContract = {
	hidePopover: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Hides the popover programmatically.',
	},
	showPopover: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Shows the popover programmatically.',
	},
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
	_accessKey: {
		kind: 'prop',
		type: 'AccessKeyPropType',
		required: false,
		doc: "Defines the key combination that can be used to trigger or focus the component's interactive element.",
	},
	_ariaDescription: {
		kind: 'prop',
		type: 'AriaDescriptionPropType',
		required: false,
		doc: 'Defines the value for the aria-description attribute.',
	},
	_customClass: {
		kind: 'prop',
		type: 'CustomClassPropType',
		required: false,
		doc: 'Defines the custom class attribute if _variant="custom" is set.',
	},
	_disabled: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Makes the element not focusable and ignore all events.',
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
		default: 'false',
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
		type: 'string',
		required: false,
		doc: 'Defines the technical name of an input field.',
	},
	_popoverAlign: {
		kind: 'prop',
		type: 'PopoverAlignPropType',
		required: false,
		default: "'bottom'",
		doc: 'Defines where to show the Popover preferably: top, right, bottom or left.',
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
		default: "'normal'",
		doc: 'Defines which variant should be used for presentation.',
	},
};

describePublicApiContract({
	tag: 'kol-popover-button',
	component: 'popover-button',
	pinnedApi: KOL_POPOVER_BUTTON_PUBLIC_API,
	schemaInterface: 'PopoverButtonProps',
});

describe('kol-popover-button-wc transitional wrapper (internal contract for legacy consumers)', () => {
	it('keeps the full predecessor surface: 18 props plus showPopover(), hidePopover(), focus() and click()', () => {
		const extracted = extractFrom('popover-button', 'wc.tsx');
		expect(extracted.filter((member) => member.kind === 'prop')).toHaveLength(18);
		expect(extracted.filter((member) => member.kind === 'method').map((member) => member.name)).toEqual(['hidePopover', 'showPopover', 'focus', 'click']);
	});
});
