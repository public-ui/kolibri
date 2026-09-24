import type { AriaOwnsPropType, CustomClassPropType, LinkProps, VariantClassNamePropType } from '../../../schema';
import { validateAccessAndShortKey } from '../../../schema/validators/access-and-short-key';
import {
	accessKeyProp,
	ariaControlsProp,
	ariaCurrentValueProp,
	ariaDescriptionProp,
	ariaExpandedProp,
	ariaOwnsProp,
	customClassProp,
	disabledProp,
	downloadProp,
	hideLabelProp,
	hrefProp,
	inlineProp,
	labelWithExpertSlotProp,
	linkCallbacksProp,
	linkRoleProp,
	linkTargetProp,
	shortKeyProp,
	spanIconsProp,
	tabIndexProp,
	tooltipAlignProp,
	variantProp,
} from '../../props';
import type { ResolvedProps, StrictFields } from '../generic-types';
import { buildDefaultPropsFromConfig } from '../props-from-config';
import type { LinkApi } from './api';
import { linkPropsConfig } from './api';

/** The fully normalized render props `LinkFC` expects. */
export type ResolvedLinkProps = StrictFields<ResolvedProps<LinkApi>>;

/**
 * An embedded link's configuration: the public `LinkProps` plus the internal props the
 * transitional `kol-link-wc` accepted from consumers rendering it inside their own shadow DOM.
 */
export type EmbeddedLinkProps = LinkProps & {
	_ariaExpanded?: boolean;
	_ariaOwns?: AriaOwnsPropType;
	_customClass?: CustomClassPropType;
	_variant?: VariantClassNamePropType;
};

/**
 * The defaults the link elements declare on their `@Prop` fields. `inlineProp` and
 * `tooltipAlignProp` are shared with the button, so they are restated here rather than relied on.
 */
const LINK_ELEMENT_DEFAULTS = {
	disabled: false,
	hideLabel: false,
	inline: true,
	tooltipAlign: 'right',
} as const;

/**
 * Normalizes an embedded link's props into the render props `LinkFC` expects — the counterpart
 * of `resolveButtonProps` for a component rendering a link inside its own boundary.
 *
 * Props only. Everything stateful belongs to the composing web component: the `TooltipBehavior`,
 * the click handler dispatching the public DOM event, the anchor ref and the `ariaCurrent`,
 * `ariaDescriptionId` and `expertSlot` states.
 *
 * @param props - The embedded link's configuration, as handed to the host component.
 */
export function resolveLinkProps(props: EmbeddedLinkProps): ResolvedLinkProps {
	const resolved = buildDefaultPropsFromConfig(linkPropsConfig) as ResolvedLinkProps;
	const set = <K extends keyof ResolvedLinkProps>(key: K) => {
		return (value: ResolvedLinkProps[K]): void => {
			resolved[key] = value;
		};
	};

	hrefProp.apply(props._href, set('href'));
	accessKeyProp.apply(props._accessKey, set('accessKey'));
	ariaControlsProp.apply(props._ariaControls, set('ariaControls'));
	ariaCurrentValueProp.apply(props._ariaCurrentValue, set('ariaCurrentValue'));
	ariaDescriptionProp.apply(props._ariaDescription, set('ariaDescription'));
	ariaExpandedProp.apply(props._ariaExpanded, set('ariaExpanded'));
	ariaOwnsProp.apply(props._ariaOwns, set('ariaOwns'));
	customClassProp.apply(props._customClass, set('customClass'));
	disabledProp.apply(props._disabled ?? LINK_ELEMENT_DEFAULTS.disabled, set('disabled'));
	downloadProp.apply(props._download, set('download'));
	hideLabelProp.apply(props._hideLabel ?? LINK_ELEMENT_DEFAULTS.hideLabel, set('hideLabel'));
	spanIconsProp.apply(props._icons, set('icons'));
	inlineProp.apply(props._inline ?? LINK_ELEMENT_DEFAULTS.inline, set('inline'));
	labelWithExpertSlotProp.apply(props._label, set('label'));
	linkCallbacksProp.apply(props._on, set('on'));
	linkRoleProp.apply(props._role, set('role'));
	shortKeyProp.apply(props._shortKey, set('shortKey'));
	linkTargetProp.apply(props._target, set('target'));
	tooltipAlignProp.apply(props._tooltipAlign ?? LINK_ELEMENT_DEFAULTS.tooltipAlign, set('tooltipAlign'));
	variantProp.apply(props._variant, set('variant'));

	// An unset tabindex must not render as `tabindex="0"` — links are natively tabbable and the
	// attribute would draw focus outlines the element never had. The props config seeds `0`, so
	// anything but an explicit number clears it again.
	if (typeof props._tabIndex === 'number') {
		tabIndexProp.apply(props._tabIndex, set('tabIndex'));
	} else {
		resolved.tabIndex = undefined as unknown as ResolvedLinkProps['tabIndex'];
	}

	validateAccessAndShortKey(props._accessKey, props._shortKey);

	return resolved;
}
