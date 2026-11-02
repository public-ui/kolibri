import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-link` — identical to the predecessor on the develop branch
 * (18 props + focus) except `_role`, which was removed by owner decision ("keine public
 * role nur an der FC"; fulfils the deprecation announced on develop). The role exists only
 * as an internal `LinkFC` render prop.
 */
const KOL_LINK_PUBLIC_API: PublicApiContract = {
	_accessKey: {
		kind: 'prop',
		type: 'AccessKeyPropType',
		required: false,
		doc: "Defines the key combination that can be used to trigger or focus the component's interactive element.",
	},
	_ariaControls: {
		kind: 'prop',
		type: 'AriaControlsPropType',
		required: false,
		doc: 'Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)',
	},
	_ariaCurrentValue: {
		kind: 'prop',
		type: 'AriaCurrentValuePropType',
		required: false,
		doc: 'Defines the value for the aria-current attribute.',
	},
	_ariaDescription: {
		kind: 'prop',
		type: 'AriaDescriptionPropType',
		required: false,
		doc: 'Defines the value for the aria-description attribute.',
	},
	_ariaExpanded: {
		kind: 'prop',
		type: 'AriaExpandedPropType',
		required: false,
		doc: 'Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)',
	},
	_disabled: {
		kind: 'prop',
		type: 'DisabledPropType',
		required: false,
		doc: 'Makes the element not focusable and ignore all events.',
		default: 'false',
	},
	_download: {
		kind: 'prop',
		type: 'DownloadPropType',
		required: false,
		doc: 'Tells the browser that the link contains a file. Optionally sets the filename.',
	},
	_hideLabel: {
		kind: 'prop',
		type: 'HideLabelPropType',
		required: false,
		doc: 'Hides the caption by default and displays the caption text with a tooltip when the interactive element is focused or the mouse is over it.',
		default: 'false',
	},
	_href: {
		kind: 'prop',
		type: 'HrefPropType',
		required: true,
		doc: 'Sets the target URI of the link or citation source.',
	},
	_icons: {
		kind: 'prop',
		type: 'Stringified<KoliBriIconsProp>',
		required: false,
		doc: 'Defines the icon classnames.',
	},
	_inline: {
		kind: 'prop',
		type: 'InlinePropType',
		required: false,
		doc: 'Defines whether the component is displayed as a standalone block or inline without enforcing a minimum size of 44px.',
		default: 'true',
	},
	_label: {
		kind: 'prop',
		type: 'LabelWithExpertSlotPropType',
		required: false,
		doc: "Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `''` to enable the expert slot.",
	},
	_on: {
		kind: 'prop',
		type: 'LinkOnCallbacksPropType',
		required: false,
		doc: 'Defines the callback functions for links.',
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
		doc: 'Defines where to show the Tooltip preferably: top, right, bottom or left.',
		default: "'right'",
	},
	_variant: {
		kind: 'prop',
		type: 'VariantClassNamePropType',
		required: false,
		doc: 'Defines which variant should be used for presentation.',
	},
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the internal element.',
	},
};

describePublicApiContract({ tag: 'kol-link', component: 'link', pinnedApi: KOL_LINK_PUBLIC_API, schemaInterface: 'LinkProps' });
