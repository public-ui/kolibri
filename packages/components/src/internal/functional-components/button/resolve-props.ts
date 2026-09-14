import { getFeatureFlag } from 'adopted-style-sheets';

import type { InternalButtonProps } from '../../../schema';
import {
	accessKeyProp,
	ariaControlsProp,
	ariaDescriptionProp,
	ariaExpandedProp,
	ariaSelectedProp,
	buttonCallbacksProp,
	buttonTypeProp,
	customClassProp,
	disabledProp,
	hideLabelProp,
	idProp,
	inlineProp,
	labelWithExpertSlotProp,
	linkRoleProp,
	nameProp,
	shortKeyProp,
	spanIconsProp,
	tabIndexProp,
	tooltipAlignProp,
	variantProp,
} from '../../props';
import type { ResolvedProps, StrictFields } from '../generic-types';
import { buildDefaultPropsFromConfig } from '../props-from-config';
import type { ButtonApi } from './api';
import { buttonPropsConfig } from './api';

/** The fully normalized render props `ButtonFC` expects. */
export type ResolvedButtonProps = StrictFields<ResolvedProps<ButtonApi>>;

/**
 * The defaults `kol-button` and `kol-button-wc` declare on their `@Prop` fields.
 *
 * These are **not** the prop definitions' own defaults. Several definitions are shared with the
 * link, whose conventions differ: `inlineProp` defaults to `true` and `tooltipAlignProp` to
 * `'right'`, while both button elements declare `false` and `'top'`. A consumer that renders
 * `ButtonFC` without restating them gets a silently different button — `kol-button--inline`
 * instead of `--standalone`, and a tooltip on the right instead of above. Both were caught by the
 * pixel gate, not by any test.
 */
const BUTTON_ELEMENT_DEFAULTS = {
	disabled: false,
	hideLabel: false,
	inline: false,
	tooltipAlign: 'top',
	type: 'button',
} as const;

/**
 * Normalizes an embedded button's props into the render props `ButtonFC` expects.
 *
 * A component that renders a button inside its own boundary — the badge's smart button, an input's
 * clear button — receives that button's configuration as one opaque `InternalButtonProps` object.
 * Rendering `ButtonFC` for it means running the same prop definitions `kol-button` and
 * `kol-button-wc` run in their watchers. This function is that step, so a consumer switching from
 * the transitional `kol-button-wc` element to `ButtonFC` does not have to restate 20 watchers.
 *
 * It covers **props only**. Everything stateful stays with the composing web component: the
 * `TooltipBehavior`, the event handlers that dispatch the public DOM events, the button ref, and
 * the `ariaDescriptionId` state. Behaviors must not instantiate other behaviors, and a plain
 * function must not own a lifecycle — so the split is deliberate.
 *
 * @param props - The embedded button's configuration, as handed to the host component.
 * @param host - The host element, used for the per-theme `buttonVariantDefault` feature flag.
 */
export function resolveButtonProps(props: InternalButtonProps, host?: HTMLElement): ResolvedButtonProps {
	const resolved = buildDefaultPropsFromConfig(buttonPropsConfig) as ResolvedButtonProps;
	const set = <K extends keyof ResolvedButtonProps>(key: K) => {
		return (value: ResolvedButtonProps[K]): void => {
			resolved[key] = value;
		};
	};

	labelWithExpertSlotProp.apply(props._label, set('label'));
	accessKeyProp.apply(props._accessKey, set('accessKey'));
	ariaControlsProp.apply(props._ariaControls, set('ariaControls'));
	ariaDescriptionProp.apply(props._ariaDescription, set('ariaDescription'));
	ariaExpandedProp.apply(props._ariaExpanded, set('ariaExpanded'));
	ariaSelectedProp.apply(props._ariaSelected, set('ariaSelected'));
	buttonCallbacksProp.apply(props._on, set('on'));
	buttonTypeProp.apply(props._type ?? BUTTON_ELEMENT_DEFAULTS.type, set('type'));
	customClassProp.apply(props._customClass, set('customClass'));
	disabledProp.apply(props._disabled ?? BUTTON_ELEMENT_DEFAULTS.disabled, set('disabled'));
	hideLabelProp.apply(props._hideLabel ?? BUTTON_ELEMENT_DEFAULTS.hideLabel, set('hideLabel'));
	idProp.apply(props._id, set('id'));
	inlineProp.apply(props._inline ?? BUTTON_ELEMENT_DEFAULTS.inline, set('inline'));
	linkRoleProp.apply(props._role, set('role'));
	nameProp.apply(props._name, set('name'));
	shortKeyProp.apply(props._shortKey, set('shortKey'));
	spanIconsProp.apply(props._icons, set('icons'));
	tooltipAlignProp.apply(props._tooltipAlign ?? BUTTON_ELEMENT_DEFAULTS.tooltipAlign, set('tooltipAlign'));

	// An unset tabindex must not render as `tabindex="0"` — buttons are natively tabbable and the
	// attribute would pin them into the document tab order. The props config seeds the default `0`,
	// so anything but an explicit number clears it again (same rule as `kol-button-wc`).
	if (typeof props._tabIndex === 'number') {
		tabIndexProp.apply(props._tabIndex, set('tabIndex'));
	} else {
		resolved.tabIndex = undefined as unknown as ResolvedButtonProps['tabIndex'];
	}

	// The variant default comes from the `buttonVariantDefault` feature flag, resolved per theme
	// against the host — identical to the fallback in `kol-button` and `kol-button-wc`.
	variantProp.apply(props._variant ?? getFeatureFlag('buttonVariantDefault', host) ?? 'normal', set('variant'));

	return resolved;
}
