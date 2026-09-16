import type { AlignPropType, LinkOnCallbacksPropType, LinkProps } from '../../../schema';
import { setEventTarget } from '../../../schema';
import { validateAccessAndShortKey } from '../../../schema/validators/access-and-short-key';
import { nonce } from '../../../utils/dev.utils';
import { createCtaRef } from '../../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../../utils/events';
import {
	accessKeyProp,
	ariaControlsProp,
	ariaCurrentValueProp,
	ariaDescriptionProp,
	disabledProp,
	downloadProp,
	hideLabelProp,
	hrefProp,
	// SkipNav links render as standalone block links so each entry can be tabbed to in turn.
	inlineProp,
	labelWithExpertSlotProp,
	linkCallbacksProp,
	linkTargetProp,
	shortKeyProp,
	spanIconsProp,
	tabIndexProp,
	tooltipAlignProp,
} from '../../props';
import { BaseWebComponent } from '../base-web-component';
import type { FunctionalComponentProps } from '../generic-types';
import type { LinkApi } from '../link/api';
import { linkPropsConfig } from '../link/api';
import { buildDefaultPropsFromConfig } from '../props-from-config';
import { TooltipBehavior } from '../tooltip/behavior';

/**
 * One orchestrated skip-nav link entry: everything `LinkFC` needs to render it — the full link
 * prop surface is applied per entry, exactly like the transitional `kol-link-wc` did before
 * this component rendered `LinkFC` directly.
 *
 * The item is a plain object with closures (not a class instance) so the web component can
 * cheaply rebuild it when `_links` changes while the per-item tooltip behavior and anchor ref
 * survive by reference.
 */
export type SkipNavLinkItem = {
	/** Fully resolved props for `LinkFC`, including per-item callbacks, refs and states. */
	fcProps: FunctionalComponentProps<LinkApi>;
	/** Returns the link's anchor element, if it has been rendered and ref'd. */
	getAnchor(): HTMLAnchorElement | undefined;
	/** Re-registers the tooltip listeners on the current anchor element (after every render). */
	syncTooltipListeners(): void;
	/** Tears down the per-item tooltip behavior (when the item is removed or rebuilt). */
	destroy(): void;
};

export const createSkipNavLinkItem = (link: LinkProps, getHost: () => HTMLElement | undefined): SkipNavLinkItem => {
	const tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
	const ctaRef = createCtaRef<HTMLAnchorElement>();
	const renderProps = buildDefaultPropsFromConfig(linkPropsConfig);

	// An unset tabindex must not render as `tabindex="0"` — links are natively tabbable and the
	// attribute would trigger focus outlines that the predecessor did not draw.
	delete renderProps.tabIndex;

	const apply = (prop: { propName: string; apply(value: unknown, callback: (normalized: unknown) => void): void }, value: unknown): void =>
		prop.apply(value, (v) => {
			renderProps[prop.propName] = v;
		});

	apply(accessKeyProp, link._accessKey);
	apply(ariaControlsProp, link._ariaControls);
	apply(ariaCurrentValueProp, link._ariaCurrentValue);
	apply(ariaDescriptionProp, link._ariaDescription);
	apply(disabledProp, link._disabled);
	apply(downloadProp, link._download);
	apply(hideLabelProp, link._hideLabel);
	apply(hrefProp, link._href);
	apply(spanIconsProp, link._icons);
	// SkipNav links are standalone block links (one per row), matching the predecessor.
	apply(inlineProp, link._inline ?? false);
	apply(labelWithExpertSlotProp, link._label);
	apply(linkCallbacksProp, link._on);
	apply(shortKeyProp, link._shortKey);
	if (typeof link._tabIndex === 'number') {
		apply(tabIndexProp, link._tabIndex);
	}
	apply(linkTargetProp, link._target);
	apply(tooltipAlignProp, link._tooltipAlign);

	validateAccessAndShortKey(link._accessKey, link._shortKey);

	const getTooltipLabel = (): string => {
		const label = renderProps.label;
		if (typeof label === 'string' && label.length > 0) {
			return label;
		}
		const href = renderProps.href;
		return typeof href === 'string' ? href : '';
	};

	tooltipBehavior.componentWillLoad({
		label: getTooltipLabel(),
		align: renderProps.tooltipAlign as AlignPropType,
	});

	renderProps.ariaCurrent = '';
	renderProps.ariaDescriptionId = nonce();
	renderProps.expertSlot = link._label === '';

	const getResolvedHref = (): string => (typeof renderProps.href === 'string' ? renderProps.href : '');

	const handleAnchorClick = (event: Event): void => {
		tooltipBehavior.hideTooltip();
		if (renderProps.disabled === true) {
			event.preventDefault();
			return;
		}
		const href = getResolvedHref();
		const on = renderProps.on as LinkOnCallbacksPropType | undefined;
		if (typeof on?.onClick === 'function') {
			setEventTarget(event, ctaRef.el);
			on.onClick(event, href);
		}
		const host = getHost();
		if (host) {
			dispatchDomEvent(host, KolEvent.click, href);
		}
	};
	renderProps.handleAnchorClick = handleAnchorClick;
	renderProps.refAnchor = (el?: HTMLAnchorElement): void => {
		ctaRef(el);
	};
	renderProps.refTooltip = tooltipBehavior.setTooltipElementRef;

	return {
		fcProps: renderProps as FunctionalComponentProps<LinkApi>,
		getAnchor: (): HTMLAnchorElement | undefined => ctaRef.el,
		syncTooltipListeners: (): void => {
			if (ctaRef.el) {
				tooltipBehavior.syncListeners(undefined, ctaRef.el, true);
			}
		},
		destroy: (): void => {
			tooltipBehavior.destroy();
		},
	};
};
