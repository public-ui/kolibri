import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import { KolCardWcTag } from '../../core/component-names';
import type { DialogAPI, DialogStates, HeadingLevel, KoliBriDialogEventCallbacks, LabelPropType } from '../../schema';
import { setState, validateLabel, validateWidth } from '../../schema';
import type { ModalVariantPropType } from '../../schema/props/variant/modal';
import { validateModalVariant } from '../../schema/props/variant/modal';
import clsx from '../../utils/clsx';
import { createUniqueId } from '../../utils/dev.utils';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import { lockScroll, unlockScroll } from '../../utils/scroll-lock';
import { handleCancelOverlay } from '../../utils/tooltip-open-tracking';
import { watchHeadingLevel } from '../heading/validation';

/**
 * https://en.wikipedia.org/wiki/Modal_window
 *
 * @internal
 * @slot - The dialog's contents.
 */
@Component({
	tag: 'kol-dialog-wc',
	shadow: false,
})
export class KolDialogWc implements DialogAPI {
	@Element() private readonly host?: HTMLKolDialogWcElement;
	private refDialog?: HTMLDialogElement;
	private readonly cardHeadingId = createUniqueId('dialog-heading');

	@State() private isModal: boolean = true;

	private readonly _cardOn = { onClose: () => void this.close() };

	public disconnectedCallback(): void {
		void this.close();
		unlockScroll(this);
	}

	private handleCancelEvent = (event: Event): void => {
		handleCancelOverlay(event);
		if (event.defaultPrevented) return;

		this.state._on?.onCancel?.(event);
		if (event.defaultPrevented) return;

		if (this.host && !dispatchDomEvent(this.host, KolEvent.cancel)) {
			event.preventDefault();
		}
	};

	private handleNativeCloseEvent(event: Event) {
		// Ignore close events that bubble up from child components (e.g. KolAlert).
		// Only react when the dialog element itself is the event origin.
		if (event.target !== this.refDialog) {
			return;
		}
		unlockScroll(this);
		if (typeof this.state._on?.onClose === 'function') {
			this.state._on.onClose();
		}
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.close);
		}
	}

	/**
	 * Opens the dialog. Pass true to open as a modal dialog.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async show(modal: boolean = false): Promise<void> {
		if (this.refDialog?.open) {
			return;
		}
		this.isModal = modal;
		if (modal) {
			this.refDialog?.showModal?.();
			if (this.refDialog) {
				lockScroll(this);
			}
		} else {
			this.refDialog?.show?.();
		}
	}

	/**
	 * Opens the dialog as a modal.
	 */
	@Method()
	public showModal(): Promise<void> {
		return this.show(true);
	}

	/**
	 * Opens the dialog as a modal.
	 * @deprecated Use showModal() instead.
	 */
	@Method()
	public openModal(): Promise<void> {
		return this.showModal();
	}

	/**
	 * Closes the dialog.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async close(): Promise<void> {
		/* The optional chaining for the `close` method is not strictly necessary, but a simple/lazy workaround for HTMLDialog not being implemented in jsdom, causing Jest tests to fail. It may be removed in the future. */
		this.refDialog?.close?.();
	}

	/**
	 * Closes the dialog.
	 * @deprecated Use close() instead.
	 */
	@Method()
	public closeModal(): Promise<void> {
		return this.close();
	}

	public render(): JSX.Element {
		return (
			<dialog
				aria-label={this.state._variant === 'blank' ? this.state._label : undefined}
				aria-labelledby={this.state._variant === 'card' ? this.cardHeadingId : undefined}
				aria-modal={this.isModal ? 'true' : 'false'}
				class={clsx('kol-dialog', 'kol-modal', {
					'kol-dialog__blank': this.state._variant === 'blank',
					'kol-dialog__card': this.state._variant === 'card',
					'kol-modal__blank': this.state._variant === 'blank',
					'kol-modal__card': this.state._variant === 'card',
				})}
				onCancel={this.handleCancelEvent}
				onClose={this.handleNativeCloseEvent.bind(this)}
				ref={(el) => {
					this.refDialog = el;
				}}
				style={{
					width: this.state._width,
				}}
			>
				{this.state._variant === 'blank' && <slot />}
				{this.state._variant === 'card' && (
					<KolCardWcTag _hasCloser _headingId={this.cardHeadingId} _label={this.state._label} _level={this._level} _on={this._cardOn}>
						<slot />
					</KolCardWcTag>
				)}
			</dialog>
		);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 0;

	/**
	 * Defines the modal callback functions.
	 */
	@Prop() public _on?: KoliBriDialogEventCallbacks;

	/**
	 * Defines the width of the modal. (max-width: 100%)
	 */
	@Prop() public _width?: string = '100%';

	/**
	 * Defines the variant of the modal.
	 */
	@Prop() public _variant?: ModalVariantPropType = 'blank';

	@State() public state: DialogStates = {
		_label: '', // ⚠ required
		_width: '100%',
	};

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			required: true,
		});
	}

	@Watch('_level')
	public validateLevel(value?: HeadingLevel): void {
		watchHeadingLevel(this, value);
	}

	@Watch('_on')
	public validateOn(value?: KoliBriDialogEventCallbacks): void {
		if (typeof value === 'object' && value !== null) {
			const callbacks: KoliBriDialogEventCallbacks = {};
			if (typeof value.onCancel === 'function') {
				callbacks.onCancel = value.onCancel;
			}
			if (typeof value.onClose === 'function') {
				callbacks.onClose = value.onClose;
			}
			setState<KoliBriDialogEventCallbacks>(this, '_on', callbacks);
		}
	}

	@Watch('_width')
	public validateWidth(value?: string): void {
		validateWidth(this, value);
	}

	@Watch('_variant')
	public validateVariant(value?: ModalVariantPropType): void {
		validateModalVariant(this, value);
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
		this.validateLevel(this._level);
		this.validateOn(this._on);
		this.validateWidth(this._width);
		this.validateVariant(this._variant);
	}
}
