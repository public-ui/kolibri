import type { AlignPropType, BreadcrumbLinkProps, LinkOnCallbacksPropType } from '../../../schema';
import { setEventTarget } from '../../../schema';
import { validateAccessAndShortKey } from '../../../schema/validators/access-and-short-key';
import { nonce } from '../../../utils/dev.utils';
import { createCtaRef } from '../../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../../utils/events';
import { accessKeyProp } from '../../props/access-key';
import { ariaControlsProp } from '../../props/aria-controls';
import { ariaCurrentValueProp } from '../../props/aria-current-value';
import { ariaDescriptionProp } from '../../props/aria-description';
import { disabledProp } from '../../props/disabled';
import { downloadProp } from '../../props/download';
import { hideLabelProp } from '../../props/hide-label';
import { hrefProp } from '../../props/href';
import { inlineProp } from '../../props/inline';
import { labelWithExpertSlotProp } from '../../props/label-with-expert-slot';
import { linkCallbacksProp } from '../../props/link-callbacks';
import { linkTargetProp } from '../../props/link-target';
import { shortKeyProp } from '../../props/short-key';
import { spanIconsProp } from '../../props/span-icons';
import { tabIndexProp } from '../../props/tab-index';
import { tooltipAlignProp } from '../../props/tooltip-align';
import { BaseWebComponent } from '../base-web-component';
import type { FunctionalComponentProps } from '../generic-types';
import type { LinkApi } from '../link/api';
import { linkPropsConfig } from '../link/api';
import { buildDefaultPropsFromConfig } from '../props-from-config';
import { TooltipBehavior } from '../tooltip/behavior';

/**
 * One orchestrated breadcrumb link entry: the raw (normalized) link plus everything `LinkFC`
 * needs to render it — the full link prop surface is applied per entry, exactly like the
 * transitional `kol-link-wc` did before this component rendered `LinkFC` directly.
 *
 * The item is a plain object with closures (not a class instance) so the web component can
 * cheaply clone it on derived-state updates (aria-current) while the per-item tooltip
 * behavior and anchor ref survive by reference.
 */
export type BreadcrumbLinkItem = {
	/** Raw normalized link entry — drives the current-page span rendering. */
	link: BreadcrumbLinkProps;
	/** Fully resolved props for `LinkFC`, including per-item callbacks, refs and states. */
	fcProps: FunctionalComponentProps<LinkApi>;
	/** Re-registers the tooltip listeners on the current anchor element (after every render). */
	syncTooltipListeners(): void;
	/** Tears down the per-item tooltip behavior (when the item is removed or rebuilt). */
	destroy(): void;
};

export const createBreadcrumbLinkItem = (link: BreadcrumbLinkProps, getHost: () => HTMLElement | undefined): BreadcrumbLinkItem => {
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
	// The predecessor rendered `<kol-link-wc _inline={false} {...link}>`: the entry's own
	// `_inline` overrode the forced `false`, anything else fell back to `false`.
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
		link,
		fcProps: renderProps as FunctionalComponentProps<LinkApi>,
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
