import type { JSXBase } from '@stencil/core/internal';

import { onLocationChange, type UnsubscribeFunction } from '../../../../internals/src/components/link/ariaCurrentService';
import { BaseWebComponent } from '../../../../internals/src/controller/base-web-component';
import type { EmbeddedLinkProps, ResolvedLinkProps } from '../../../../internals/src/controller/link/resolve-props';
import { resolveLinkProps } from '../../../../internals/src/controller/link/resolve-props';
import { TooltipBehavior } from '../../../../internals/src/controller/tooltip/behavior';
import type { AlignPropType } from '../../../../internals/src/schema/index';
import { setEventTarget } from '../../../../internals/src/schema/index';
import { nonce } from '../../../../internals/src/utils/dev.utils';
import { createCtaRef } from '../../../../internals/src/utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../../../internals/src/utils/events';
import type { LinkFCProps } from './component';

/** Attributes the embedding component puts on the `.kol-link` root, e.g. its BEM element class. */
type LinkItemRootAttributes = Pick<JSXBase.HTMLAttributes<HTMLElement>, 'class'>;

/**
 * One orchestrated link embedded in another component's shadow DOM: everything `LinkFC` needs to
 * render, plus the lifecycle hooks the surrounding web component has to drive. The counterpart of
 * `button/item.ts`.
 *
 * Besides the tooltip behavior, the anchor ref and the description id, the item keeps the
 * `aria-current` state of the link: it follows the location like the link elements do and asks the
 * embedding component to render again when it changes.
 */
export type LinkItem = {
	/**
	 * Resolves the link for the current render pass. Call once per render, so changed props take
	 * effect.
	 */
	getFcProps(props: EmbeddedLinkProps, rootAttributes?: LinkItemRootAttributes): LinkFCProps;
	/** Re-registers the tooltip listeners. Call from `componentDidRender`. */
	syncListeners(): void;
	/** Tears down the tooltip behavior and the location subscription. Call from `disconnectedCallback`. */
	destroy(): void;
};

/**
 * @param requestRender - Renders the embedding component again, after the location changed the
 * `aria-current` state of the link.
 */
export const createLinkItem = (requestRender: () => void): LinkItem => {
	const tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
	const ctaRef = createCtaRef<HTMLAnchorElement>();
	const ariaDescriptionId = nonce();
	let resolved: ResolvedLinkProps | undefined;
	let ariaCurrent = '';
	let rootElement: HTMLElement | undefined;
	let unsubscribe: UnsubscribeFunction | undefined;
	let subscribing = false;

	const getHref = (): string => (typeof resolved?.href === 'string' ? resolved.href : '');

	const getTooltipLabel = (): string => {
		const label = resolved?.label;
		return typeof label === 'string' && label.length > 0 ? label : getHref();
	};

	const handleLocationChange = (location: string): void => {
		const next = location === resolved?.href ? (resolved.ariaCurrentValue as string) : '';
		if (ariaCurrent !== next) {
			ariaCurrent = next;
			// The subscription calls back synchronously once while the render pass subscribes.
			if (!subscribing) {
				requestRender();
			}
		}
	};

	const handleAnchorClick = (event: Event): void => {
		tooltipBehavior.hideTooltip();
		if (resolved?.disabled === true) {
			event.preventDefault();
			return;
		}
		const href = getHref();
		const on = resolved?.on;
		if (typeof on?.onClick === 'function') {
			setEventTarget(event, ctaRef.el);
			on.onClick(event, href);
		}
		if (rootElement) {
			dispatchDomEvent(rootElement, KolEvent.click, href);
		}
	};

	const refRoot = (element?: HTMLElement): void => {
		if (element) {
			rootElement = element;
		}
	};

	return {
		getFcProps: (props: EmbeddedLinkProps, rootAttributes?: LinkItemRootAttributes): LinkFCProps => {
			resolved = resolveLinkProps(props);
			if (!unsubscribe) {
				subscribing = true;
				unsubscribe = onLocationChange(handleLocationChange);
				subscribing = false;
			}
			tooltipBehavior.componentWillLoad({
				label: getTooltipLabel(),
				align: resolved.tooltipAlign as AlignPropType,
			});

			return {
				...resolved,
				...rootAttributes,
				ariaCurrent,
				ariaDescriptionId,
				expertSlot: props._label === '',
				handleAnchorClick,
				ref: refRoot,
				refAnchor: ctaRef,
				refTooltip: tooltipBehavior.setTooltipElementRef,
			} as LinkFCProps;
		},
		syncListeners: (): void => {
			if (ctaRef.el) {
				tooltipBehavior.syncListeners(undefined, ctaRef.el, true);
			}
		},
		destroy: (): void => {
			unsubscribe?.();
			unsubscribe = undefined;
			tooltipBehavior.destroy();
		},
	};
};
