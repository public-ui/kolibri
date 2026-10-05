import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-link-button` — byte-identical to the predecessor `shadow.tsx` on the
 * develop branch (18 props + focus/click). `_role` stays declared but, as before, is not forwarded
 * to the inner element.
 */
const KOL_LINK_BUTTON_PUBLIC_API: PublicApiContract = {
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
	_ariaCurrentValue: {
		kind: 'prop',
		type: 'AriaCurrentValuePropType',
		required: false,
		doc: 'Defines the value for the aria-current attribute.',
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
	_download: {
		kind: 'prop',
		type: 'DownloadPropType',
		required: false,
		doc: 'Tells the browser that the link contains a file. Optionally sets the filename.',
	},
	_hideLabel: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Hides the caption by default and displays the caption text with a tooltip when the interactive element is focused or the mouse is over it. @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.',
	},
	_href: {
		kind: 'prop',
		type: 'HrefPropType',
		required: true,
		doc: 'Defines the target URI of the link.',
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
		required: false,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.',
	},
	_on: {
		kind: 'prop',
		type: 'LinkOnCallbacksPropType',
		required: false,
		doc: 'Defines the callback functions for links.',
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
	_target: {
		kind: 'prop',
		type: 'LinkTargetPropType',
		required: false,
		doc: 'Defines where to open the link.',
	},
	_tooltipAlign: {
		kind: 'prop',
		type: 'TooltipAlignPropType',
		required: false,
		default: "'right'",
		doc: 'Defines where to show the Tooltip preferably: top, right, bottom or left.',
	},
	_variant: {
		kind: 'prop',
		type: 'VariantClassNamePropType',
		required: false,
		default: "getFeatureFlag('buttonVariantDefault', this.host) ?? 'normal'",
		doc: 'Defines which variant should be used for presentation.',
	},
};

describePublicApiContract({ tag: 'kol-link-button', component: 'link-button', pinnedApi: KOL_LINK_BUTTON_PUBLIC_API, schemaInterface: 'LinkButtonProps' });
