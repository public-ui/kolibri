import { getFeatureFlag } from 'adopted-style-sheets';

import { propagateResetEventToForm, propagateSubmitEventToForm } from '../../../components/form/controller';
import type { ToolbarItemPropType } from '../../../schema';
import { setEventTarget } from '../../../schema';
import { nonce } from '../../../utils/dev.utils';
import { createCtaRef } from '../../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../../utils/events';
import { BaseWebComponent } from '../base-web-component';
import type { ButtonApi } from '../button/api';
import { resolveButtonProps } from '../button/resolve-props';
import type { FunctionalComponentProps } from '../generic-types';
import type { LinkApi } from '../link/api';
import type { EmbeddedLinkProps } from '../link/resolve-props';
import { resolveLinkProps } from '../link/resolve-props';
import { TooltipBehavior } from '../tooltip/behavior';

type ToolbarItemBase = {
	/** Whether the item refuses interaction; the roving tabindex skips it. */
	disabled: boolean;
	/** The item's interactive element, once rendered. */
	getElement(): HTMLAnchorElement | HTMLButtonElement | undefined;
	/**
	 * Ref for the item's wrapper. The public `KolEvent` DOM events are dispatched on it, i.e. on
	 * the node that the transitional `kol-button-wc`/`kol-link-wc` host occupied before.
	 */
	refWrapper: (element?: HTMLElement) => void;
	/** Re-registers the tooltip listeners on the current element. Call from `componentDidRender`. */
	syncListeners(): void;
	/** Tears down the tooltip behavior. Call when the item is replaced or the toolbar disconnects. */
	destroy(): void;
};

export type ToolbarButtonItem = ToolbarItemBase & {
	type: 'button';
	/** Fully resolved `ButtonFC` props for the given roving tabindex. */
	getFcProps(tabIndex: number): FunctionalComponentProps<ButtonApi>;
};

export type ToolbarLinkItem = ToolbarItemBase & {
	type: 'link';
	/**
	 * Fully resolved `LinkFC` props for the given roving tabindex and current location (`''` while
	 * no location has been reported).
	 */
	getFcProps(tabIndex: number, location: string): FunctionalComponentProps<LinkApi>;
};

/**
 * One orchestrated toolbar entry: everything `ButtonFC` or `LinkFC` needs to render it, plus the
 * lifecycle hooks the toolbar has to drive — what the transitional `kol-button-wc` and
 * `kol-link-wc` did per entry before the toolbar rendered the functional components directly.
 *
 * A plain object with closures, like `breadcrumb/link-item.ts` and `popover-button/item.ts`, so
 * the toolbar rebuilds it cheaply whenever `_items` changes while tooltip behavior and refs
 * survive by reference.
 *
 * The toolbar's own defaults — `_inline: false` and the theme's `buttonVariantDefault` — apply
 * only where the entry leaves the prop unset, and an entry's own `_tabIndex` wins over the roving
 * tabindex, exactly like the predecessor's `{...defaults} {...item}` spread.
 */
export const createToolbarItem = (item: ToolbarItemPropType, getFlagHost: () => HTMLElement | undefined): ToolbarButtonItem | ToolbarLinkItem =>
	item.type === 'link' ? createLinkItem(item, getFlagHost) : createButtonItem(item, getFlagHost);

const createButtonItem = (item: Extract<ToolbarItemPropType, { type: 'button' }>, getFlagHost: () => HTMLElement | undefined): ToolbarButtonItem => {
	const tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
	const ctaRef = createCtaRef<HTMLButtonElement>();
	const ariaDescriptionId = nonce();
	let wrapper: HTMLElement | undefined;

	const props = resolveButtonProps(item, getFlagHost());
	const value = item._value;

	tooltipBehavior.componentWillLoad({ label: props.label, align: props.tooltipAlign });

	const dispatch = (event: KolEvent, detail?: unknown): void => {
		if (wrapper) {
			dispatchDomEvent(wrapper, event, detail);
		}
	};

	const handleClick = (event: MouseEvent): void => {
		event.stopPropagation();
		tooltipBehavior.hideTooltip();

		if (props.type === 'submit') {
			propagateSubmitEventToForm({ form: wrapper, ref: ctaRef.el });
		} else if (props.type === 'reset') {
			propagateResetEventToForm({ form: wrapper, ref: ctaRef.el });
		} else if (typeof props.on.onClick === 'function') {
			setEventTarget(event, ctaRef.el);
			props.on.onClick(event, value);
		}

		dispatch(KolEvent.click, value);
	};

	const handleMouseDown = (event: MouseEvent): void => {
		props.on.onMouseDown?.(event);
		dispatch(KolEvent.mousedown);
	};

	const handleFocus = (event: FocusEvent): void => {
		props.on.onFocus?.(event);
		dispatch(KolEvent.focus);
	};

	const handleBlur = (event: FocusEvent): void => {
		props.on.onBlur?.(event);
		dispatch(KolEvent.blur);
	};

	return {
		type: 'button',
		disabled: props.disabled,
		getElement: () => ctaRef.el,
		getFcProps: (tabIndex) => ({
			...props,
			ariaDescriptionId,
			handleBlur,
			handleClick,
			handleFocus,
			handleMouseDown,
			refButton: ctaRef,
			refTooltip: tooltipBehavior.setTooltipElementRef,
			tabIndex: typeof item._tabIndex === 'number' ? props.tabIndex : tabIndex,
		}),
		refWrapper: (element) => {
			wrapper = element;
		},
		syncListeners: () => {
			if (ctaRef.el) {
				tooltipBehavior.syncListeners(undefined, ctaRef.el, true);
			}
		},
		destroy: () => tooltipBehavior.destroy(),
	};
};

const createLinkItem = (item: Extract<ToolbarItemPropType, { type: 'link' }>, getFlagHost: () => HTMLElement | undefined): ToolbarLinkItem => {
	const tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
	const ctaRef = createCtaRef<HTMLAnchorElement>();
	const ariaDescriptionId = nonce();
	let wrapper: HTMLElement | undefined;

	const link: EmbeddedLinkProps = item;
	const props = resolveLinkProps({
		...link,
		_inline: link._inline ?? false,
		_variant: link._variant ?? getFeatureFlag('buttonVariantDefault', getFlagHost()) ?? 'normal',
	});

	// A link without a label shows its href, and so does its tooltip.
	tooltipBehavior.componentWillLoad({ label: props.label.length > 0 ? props.label : props.href, align: props.tooltipAlign });

	const handleAnchorClick = (event: Event): void => {
		tooltipBehavior.hideTooltip();
		if (props.disabled) {
			event.preventDefault();
			return;
		}
		if (typeof props.on.onClick === 'function') {
			setEventTarget(event, ctaRef.el);
			props.on.onClick(event, props.href);
		}
		if (wrapper) {
			dispatchDomEvent(wrapper, KolEvent.click, props.href);
		}
	};

	return {
		type: 'link',
		disabled: props.disabled,
		getElement: () => ctaRef.el,
		getFcProps: (tabIndex, location) => ({
			...props,
			ariaCurrent: location !== '' && location === props.href ? props.ariaCurrentValue : '',
			ariaDescriptionId,
			expertSlot: item._label === '',
			handleAnchorClick,
			refAnchor: ctaRef,
			refTooltip: tooltipBehavior.setTooltipElementRef,
			tabIndex: typeof item._tabIndex === 'number' ? props.tabIndex : tabIndex,
		}),
		refWrapper: (element) => {
			wrapper = element;
		},
		syncListeners: () => {
			if (ctaRef.el) {
				tooltipBehavior.syncListeners(undefined, ctaRef.el, true);
			}
		},
		destroy: () => tooltipBehavior.destroy(),
	};
};
