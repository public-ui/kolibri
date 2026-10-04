import type { JSXBase } from '@stencil/core/internal';

import { propagateResetEventToForm, propagateSubmitEventToForm } from '../../../components/form/controller';
import type { InternalButtonProps, StencilUnknown } from '../../../schema';
import { setEventTarget } from '../../../schema';
import { nonce } from '../../../utils/dev.utils';
import { createCtaRef } from '../../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../../utils/events';
import { BaseWebComponent } from '../base-web-component';
import type { FunctionalComponentProps } from '../generic-types';
import { TooltipBehavior } from '../tooltip/behavior';
import type { ButtonApi } from './api';
import type { ResolvedButtonProps } from './resolve-props';
import { resolveButtonProps } from './resolve-props';

/**
 * Attributes the embedding component puts on the `.kol-button` root, e.g. its BEM element class,
 * a `data-testid`, `hidden` or listeners for the `KolEvent` DOM events of the button.
 */
export type ButtonItemRootAttributes = Partial<Pick<JSXBase.HTMLAttributes<HTMLElement>, 'aria-current' | 'class' | 'hidden' | 'onBlur' | 'onFocus'>> & {
	[dataAttribute: `data-${string}`]: string;
};

/** Everything `ButtonFC` needs for one render pass, plus the ref of its root element. */
export type ButtonItemFcProps = FunctionalComponentProps<ButtonApi> &
	ButtonItemRootAttributes & {
		/**
		 * Ref of the `.kol-button` root. The `KolEvent` DOM events are dispatched on it: it stands where
		 * the host of a separate button element would stand, so the events bubble along the same path.
		 */
		ref: (element?: HTMLElement) => void;
	};

/**
 * One orchestrated button embedded in another component's shadow DOM: everything `ButtonFC` needs
 * to render, plus the lifecycle hooks the surrounding web component has to drive.
 *
 * `ButtonFC` is stateless, but an embedded button is not: its tooltip behavior, its event handlers,
 * its element refs and its description id have to live somewhere. The item is a plain object with
 * closures, like `popover-button/item.ts`, so the embedding component composes one per button.
 *
 * The button's form association is absent: an embedded button carries no `_name`, so there is no
 * form value to write.
 */
export type ButtonItem = {
	/**
	 * Resolves the button for the current render pass. Call once per render, so changed props such
	 * as `_disabled` or `_label` take effect.
	 */
	getFcProps(props: InternalButtonProps, rootAttributes?: ButtonItemRootAttributes): ButtonItemFcProps;
	/** The rendered `<button>`, once it is in the DOM. */
	getElement(): HTMLButtonElement | undefined;
	/** The `.kol-button` root, once it is in the DOM. */
	getRootElement(): HTMLElement | undefined;
	/** Re-registers the tooltip listeners. Call from `componentDidRender`. */
	syncListeners(): void;
	/** Tears down the tooltip behavior. Call from `disconnectedCallback`. */
	destroy(): void;
};

/**
 * @param getFlagHost - Element the theme-scoped `buttonVariantDefault` feature flag is resolved against.
 */
export const createButtonItem = (getFlagHost: () => HTMLElement | undefined): ButtonItem => {
	const tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
	const ctaRef = createCtaRef<HTMLButtonElement>();
	const ariaDescriptionId = nonce();
	let resolved: ResolvedButtonProps | undefined;
	let value: StencilUnknown;
	let rootElement: HTMLElement | undefined;

	const dispatch = (event: KolEvent, detail?: unknown): void => {
		if (rootElement) {
			dispatchDomEvent(rootElement, event, detail);
		}
	};

	const handleClick = (event: MouseEvent): void => {
		event.stopPropagation();
		tooltipBehavior.hideTooltip();

		if (resolved?.type === 'submit') {
			propagateSubmitEventToForm({ form: rootElement, ref: ctaRef.el });
		} else if (resolved?.type === 'reset') {
			propagateResetEventToForm({ form: rootElement, ref: ctaRef.el });
		} else {
			const onClick = resolved?.on.onClick;
			if (typeof onClick === 'function') {
				setEventTarget(event, ctaRef.el);
				onClick(event, value);
			}
		}

		dispatch(KolEvent.click, value);
	};

	const handleMouseDown = (event: MouseEvent): void => {
		resolved?.on.onMouseDown?.(event);
		dispatch(KolEvent.mousedown);
	};

	const handleFocus = (event: FocusEvent): void => {
		resolved?.on.onFocus?.(event);
		dispatch(KolEvent.focus);
	};

	const handleBlur = (event: FocusEvent): void => {
		resolved?.on.onBlur?.(event);
		dispatch(KolEvent.blur);
	};

	/*
	 * Keeps the last root when Stencil resets the ref: a click that removes the button (e.g. a clear
	 * button clearing its own field) resets the ref before the button loses the focus, and the blur
	 * still has to be dispatched from where the button stood.
	 */
	const refRoot = (element?: HTMLElement): void => {
		if (element) {
			rootElement = element;
		}
	};

	return {
		getFcProps: (props: InternalButtonProps, rootAttributes?: ButtonItemRootAttributes): ButtonItemFcProps => {
			resolved = resolveButtonProps(props, getFlagHost());
			value = props._value;

			tooltipBehavior.componentWillLoad({
				label: resolved.label,
				align: resolved.tooltipAlign,
			});

			return {
				...resolved,
				...rootAttributes,
				ariaDescriptionId,
				handleBlur,
				handleClick,
				handleFocus,
				handleMouseDown,
				ref: refRoot,
				refButton: ctaRef,
				refTooltip: tooltipBehavior.setTooltipElementRef,
			};
		},
		getElement: (): HTMLButtonElement | undefined => ctaRef.el,
		getRootElement: (): HTMLElement | undefined => rootElement,
		syncListeners: (): void => {
			if (ctaRef.el) {
				tooltipBehavior.syncListeners(undefined, ctaRef.el, true);
			}
		},
		destroy: (): void => {
			tooltipBehavior.destroy();
		},
	};
};
