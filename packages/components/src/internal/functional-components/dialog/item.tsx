import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import type { HeadingLevel, KoliBriDialogEventCallbacks, LabelPropType } from '../../../schema';
import type { ModalVariantPropType } from '../../../schema/props/variant/modal';
import { createUniqueId, nonce } from '../../../utils/dev.utils';
import { createCtaRef } from '../../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../../utils/events';
import { lockScroll, unlockScroll } from '../../../utils/scroll-lock';
import { handleCancelOverlay } from '../../../utils/tooltip-open-tracking';
import { dialogCallbacksProp, labelProp, levelProp, variantDialogProp, widthProp } from '../../props';
import { BaseWebComponent } from '../base-web-component';
import type { ResolvedButtonProps } from '../button/resolve-props';
import { resolveCardCloseButtonProps } from '../card/close-button';
import type { CardFCProps } from '../card/component';
import { CardFC } from '../card/component';
import { TooltipBehavior } from '../tooltip/behavior';
import type { DialogFCProps } from './component';
import { dialogBlockClass, DialogFC } from './component';

/** The configuration of an embedded dialog: the public props of the dialog elements. */
export type DialogItemProps = {
	label: LabelPropType;
	level?: HeadingLevel;
	on?: KoliBriDialogEventCallbacks;
	variant?: ModalVariantPropType;
	width?: string;
};

/** The resolved props of `DialogItemFC`; `card` only for the card variant. */
export type DialogItemFCProps = {
	dialog: DialogFCProps;
	card?: CardFCProps;
};

/** Renders an embedded dialog from the props of `DialogItem.getFcProps`, with the children as its content. */
export const DialogItemFC: FC<DialogItemFCProps> = ({ dialog, card }, children) => (
	<DialogFC {...dialog}>{card ? <CardFC {...card}>{children}</CardFC> : children}</DialogFC>
);

/**
 * One orchestrated dialog embedded in another component's shadow DOM: the counterpart of the dialog
 * elements for a component that renders `DialogFC` itself. It keeps the open state of the native
 * dialog, the scroll lock, the cancel and close handling and, for the card variant, the close
 * button with its tooltip behavior.
 *
 * The `KolEvent` DOM events are dispatched on an element the embedding component provides, an
 * ancestor of the `<dialog>`: dispatched on the `<dialog>` itself, the `close` and `cancel` events
 * would reach the dialog's own native `close` and `cancel` listeners.
 */
export type DialogItem = {
	/** Resolves the dialog for the current render pass. Call once per render. */
	getFcProps(props: DialogItemProps): DialogItemFCProps;
	/** Opens the dialog, modal or not. */
	show(modal: boolean): void;
	/** Closes the dialog. */
	close(): void;
	/** Re-registers the close button's tooltip listeners. Call from `componentDidRender`. */
	syncListeners(): void;
	/** Closes the dialog and tears down the scroll lock and the tooltip behavior. Call from `disconnectedCallback`. */
	destroy(): void;
};

/**
 * The card variant renders no link, so its anchor never exists: the card's own `_on` callbacks
 * describe that anchor, and its ref is never called.
 */
const NOOP = (): void => {};

/**
 * @param getFlagHost - Element the theme-scoped `buttonVariantDefault` feature flag of the card's
 * close button is resolved against.
 * @param requestRender - Renders the embedding component again, after the dialog switched between
 * modal and non-modal.
 * @param getEventTarget - Element the `KolEvent` DOM events are dispatched on, an ancestor of the `<dialog>`.
 */
export const createDialogItem = (
	getFlagHost: () => HTMLElement | undefined,
	requestRender: () => void,
	getEventTarget: () => HTMLElement | undefined,
): DialogItem => {
	const dialogRef = createCtaRef<HTMLDialogElement>();
	const cardCloseButtonRef = createCtaRef<HTMLButtonElement>();
	const cardCloseTooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
	const ariaDescriptionId = nonce();
	const headingId = createUniqueId('dialog-heading');
	/* The scroll lock is counted per owner; the item is the owner of its dialog's lock. */
	const scrollLockOwner = {};
	let cardCloseButtonProps: ResolvedButtonProps | undefined;
	let modal = true;
	let on: KoliBriDialogEventCallbacks = {};

	const dispatch = (event: KolEvent): boolean => {
		const target = getEventTarget();
		return target ? dispatchDomEvent(target, event) : true;
	};

	/*
	 * The optional chaining on the native methods is a workaround for HTMLDialogElement not being
	 * implemented in jsdom, which would otherwise fail the Jest tests.
	 */
	const close = (): void => {
		dialogRef.el?.close?.();
	};

	const handleCancel = (event: Event): void => {
		handleCancelOverlay(event);
		if (event.defaultPrevented) return;

		on.onCancel?.(event);
		if (event.defaultPrevented) return;

		if (!dispatch(KolEvent.cancel)) {
			event.preventDefault();
		}
	};

	const handleClose = (event: Event): void => {
		// Ignore close events that bubble up from child components (e.g. KolAlert).
		// Only react when the dialog element itself is the event origin.
		if (event.target !== dialogRef.el) {
			return;
		}

		unlockScroll(scrollLockOwner);
		on.onClose?.();
		dispatch(KolEvent.close);
	};

	/** The card's close button closes the dialog, which then fires its own native close event. */
	const handleCardClose = (): void => {
		cardCloseTooltipBehavior.hideTooltip();
		close();
		dispatch(KolEvent.close);
	};

	return {
		getFcProps: (props: DialogItemProps): DialogItemFCProps => {
			let label = '';
			let level: HeadingLevel = 0;
			let variant = 'blank' as ModalVariantPropType;
			let width = '100%';
			labelProp.apply(props.label, (v) => {
				label = v;
			});
			levelProp.apply(props.level ?? 0, (v) => {
				level = v;
			});
			dialogCallbacksProp.apply(props.on, (v) => {
				on = v;
			});
			variantDialogProp.apply(props.variant ?? 'blank', (v) => {
				variant = v;
			});
			widthProp.apply(props.width ?? '100%', (v) => {
				width = v;
			});

			const isCard = variant === 'card';
			if (isCard && !cardCloseButtonProps) {
				cardCloseButtonProps = resolveCardCloseButtonProps(getFlagHost());
				cardCloseTooltipBehavior.componentWillLoad({
					label: cardCloseButtonProps.label,
					align: cardCloseButtonProps.tooltipAlign,
				});
			}

			return {
				dialog: {
					blockClass: dialogBlockClass(variant),
					handleCancel,
					handleClose,
					label,
					labelledBy: isCard ? headingId : undefined,
					modal,
					refDialog: dialogRef,
					width,
				},
				card:
					isCard && cardCloseButtonProps
						? {
								ariaDescriptionId,
								closeButtonProps: cardCloseButtonProps,
								handleBlur: NOOP,
								handleClose: handleCardClose,
								handleFocus: NOOP,
								hasCloser: true,
								headingId,
								href: '',
								label,
								level,
								on: {},
								refCloseButton: cardCloseButtonRef,
								refCta: NOOP,
								refTooltip: cardCloseTooltipBehavior.setTooltipElementRef,
								target: '',
							}
						: undefined,
			};
		},
		show: (nextModal: boolean): void => {
			const dialog = dialogRef.el;
			if (dialog?.open) {
				return;
			}

			if (modal !== nextModal) {
				modal = nextModal;
				requestRender();
			}
			if (nextModal) {
				dialog?.showModal?.();
				if (dialog) {
					lockScroll(scrollLockOwner);
				}
			} else {
				dialog?.show?.();
			}
		},
		close,
		syncListeners: (): void => {
			if (cardCloseButtonRef.el) {
				cardCloseTooltipBehavior.syncListeners(undefined, cardCloseButtonRef.el, true);
			}
		},
		destroy: (): void => {
			close();
			unlockScroll(scrollLockOwner);
			cardCloseTooltipBehavior.destroy();
		},
	};
};
