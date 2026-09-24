import type { JSX } from '@stencil/core';
import { h } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { ResolvedButtonProps } from '../../internal/functional-components/button/resolve-props';
import { resolveCardCloseButtonProps } from '../../internal/functional-components/card/close-button';
import type { CardFCProps } from '../../internal/functional-components/card/component';
import { CardFC } from '../../internal/functional-components/card/component';
import type { DialogApi } from '../../internal/functional-components/dialog/api';
import { dialogPropsConfig } from '../../internal/functional-components/dialog/api';
import { dialogBlockClass, DialogFC } from '../../internal/functional-components/dialog/component';
import { TooltipBehavior } from '../../internal/functional-components/tooltip/behavior';
import { dialogCallbacksProp, labelProp, levelProp, variantDialogProp, widthProp } from '../../internal/props';
import type { HeadingLevel, KoliBriDialogEventCallbacks, LabelPropType } from '../../schema';
import type { ModalVariantPropType } from '../../schema/props/variant/modal';
import { createCtaRef } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import { lockScroll, unlockScroll } from '../../utils/scroll-lock';
import { handleCancelOverlay } from '../../utils/tooltip-open-tracking';

/**
 * The card variant renders no link, so its anchor never exists: the card's own `_on` callbacks
 * describe that anchor, and its ref is never called.
 */
const NOOP = (): void => {};

/**
 * Orchestrator shared by `kol-dialog`, the deprecated `kol-modal` and the transitional
 * `kol-dialog-wc`. All three render the same `DialogFC`; the concrete element only declares the
 * Stencil members and delegates from its watchers, methods and lifecycle hooks.
 *
 * The card variant renders `CardFC` directly instead of the transitional `kol-card-wc`, so this
 * class also owns what that element used to orchestrate: the close button's resolved props, its
 * tooltip behavior and its ref.
 */
export abstract class BaseDialogWebComponent extends BaseWebComponent<DialogApi> {
	protected abstract readonly host?: HTMLElement;

	protected readonly dialogRef = createCtaRef<HTMLDialogElement>();
	private readonly cardCloseButtonRef = createCtaRef<HTMLButtonElement>();

	/** Drives the card close button's tooltip — it renders with `hideLabel`, so its label lives there. */
	private readonly cardCloseTooltipBehavior = new TooltipBehavior(this.stateAccess);

	/** Resolved once in `componentWillLoad`: the close button's configuration never changes. */
	private cardCloseButtonProps!: ResolvedButtonProps;

	// --- Lifecycle ---

	protected initDialogRenderProps(): void {
		this.initRenderProps(dialogPropsConfig);

		this.cardCloseButtonProps = resolveCardCloseButtonProps(this.host);
		this.cardCloseTooltipBehavior.componentWillLoad({
			label: this.cardCloseButtonProps.label,
			align: this.cardCloseButtonProps.tooltipAlign,
		});
	}

	protected syncCardCloseTooltipListeners(): void {
		if (this.cardCloseButtonRef.el) {
			this.cardCloseTooltipBehavior.syncListeners(undefined, this.cardCloseButtonRef.el, true);
		}
	}

	protected teardownDialog(): void {
		this.closeDialog();
		unlockScroll(this);
		this.cardCloseTooltipBehavior.destroy();
	}

	// --- Prop application ---

	protected applyLabel(value?: LabelPropType): void {
		labelProp.apply(value, (v) => this.setRenderProp('label', v));
	}

	protected applyLevel(value?: HeadingLevel): void {
		levelProp.apply(value, (v) => this.setRenderProp('level', v));
	}

	protected applyOn(value?: KoliBriDialogEventCallbacks): void {
		dialogCallbacksProp.apply(value, (v) => this.setRenderProp('on', v));
	}

	protected applyVariant(value?: ModalVariantPropType): void {
		variantDialogProp.apply(value, (v) => this.setRenderProp('variant', v));
	}

	protected applyWidth(value?: string): void {
		widthProp.apply(value, (v) => this.setRenderProp('width', v));
	}

	// --- Dialog control ---

	/*
	 * The optional chaining on the native methods is a workaround for HTMLDialogElement not being
	 * implemented in jsdom, which would otherwise fail the Jest tests.
	 */

	protected showDialog(modal: boolean): void {
		const dialog = this.dialogRef.el;
		if (dialog?.open) {
			return;
		}

		this.setState('modal', modal);
		if (modal) {
			dialog?.showModal?.();
			if (dialog) {
				lockScroll(this);
			}
		} else {
			dialog?.show?.();
		}
	}

	protected closeDialog(): void {
		this.dialogRef.el?.close?.();
	}

	// --- Event handling ---

	private readonly handleCancel = (event: Event): void => {
		handleCancelOverlay(event);
		if (event.defaultPrevented) return;

		this.getRenderProp('on').onCancel?.(event);
		if (event.defaultPrevented) return;

		if (this.host && !dispatchDomEvent(this.host, KolEvent.cancel)) {
			event.preventDefault();
		}
	};

	private readonly handleClose = (event: Event): void => {
		// Ignore close events that bubble up from child components (e.g. KolAlert).
		// Only react when the dialog element itself is the event origin.
		if (event.target !== this.dialogRef.el) {
			return;
		}

		unlockScroll(this);
		this.getRenderProp('on').onClose?.();
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.close);
		}
	};

	/** The card's close button closes the dialog, which then fires its own native close event. */
	private readonly handleCardClose = (): void => {
		this.cardCloseTooltipBehavior.hideTooltip();
		this.closeDialog();
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.close);
		}
	};

	// --- Render ---

	/**
	 * Stencil derives light-DOM slot relocation from the `<slot />` it finds in the element file,
	 * so each element supplies its own through `renderSlot`.
	 */
	protected abstract renderSlot(): JSX.Element;

	private buildCardProps(): CardFCProps {
		return {
			ariaDescriptionId: this.getState('ariaDescriptionId'),
			closeButtonProps: this.cardCloseButtonProps,
			handleBlur: NOOP,
			handleClose: this.handleCardClose,
			handleFocus: NOOP,
			hasCloser: true,
			headingId: this.getState('headingId'),
			href: '',
			label: this.getRenderProp('label'),
			level: this.getRenderProp('level'),
			on: {},
			refCloseButton: this.cardCloseButtonRef,
			refCta: NOOP,
			refTooltip: this.cardCloseTooltipBehavior.setTooltipElementRef,
			target: '',
		};
	}

	protected renderDialogFC(): JSX.Element {
		const variant = this.getRenderProp('variant');
		const isCard = variant === 'card';

		return (
			<DialogFC
				blockClass={dialogBlockClass(variant)}
				handleCancel={this.handleCancel}
				handleClose={this.handleClose}
				label={this.getRenderProp('label')}
				labelledBy={isCard ? this.getState('headingId') : undefined}
				modal={this.getState('modal')}
				refDialog={this.dialogRef}
				width={this.getRenderProp('width')}
			>
				{isCard ? <CardFC {...this.buildCardProps()}>{this.renderSlot()}</CardFC> : this.renderSlot()}
			</DialogFC>
		);
	}
}
