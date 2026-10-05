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
 * The defaults the button elements declare on their `@Prop` fields.
 *
 * These are **not** the prop definitions' own defaults: `inlineProp` and `tooltipAlignProp` are
 * shared with the link, which wants `true` and `'right'` where a button wants `false` and
 * `'top'`. Restate them here, or the button renders `--inline` with a tooltip on the right and
 * nothing fails.
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
 * A component rendering a button inside its own boundary — the badge's smart button, an input's
 * clear button — gets that button's configuration as one opaque `InternalButtonProps` object and
 * has to run every button prop definition over it. This is that step, in one call.
 *
 * Props only. Everything stateful belongs to the composing web component: the `TooltipBehavior`,
 * the event handlers dispatching the public DOM events, the button ref and the
 * `ariaDescriptionId` state — a behavior must not own another behavior, and a plain function must
 * not own a lifecycle.
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
	// attribute would pin them into the document tab order. The props config seeds `0`, so
	// anything but an explicit number clears it again.
	if (typeof props._tabIndex === 'number') {
		tabIndexProp.apply(props._tabIndex, set('tabIndex'));
	} else {
		resolved.tabIndex = undefined as unknown as ResolvedButtonProps['tabIndex'];
	}

	// The variant default comes from the `buttonVariantDefault` feature flag, resolved per theme
	// against the host.
	variantProp.apply(props._variant ?? getFeatureFlag('buttonVariantDefault', host) ?? 'normal', set('variant'));

	return resolved;
}
