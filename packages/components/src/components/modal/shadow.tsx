import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import clsx from 'clsx';
import { KolCardWcTag } from '../../core/component-names';
import type { KoliBriModalEventCallbacks, LabelPropType, ModalAPI, ModalStates } from '../../schema';
import { setState, validateLabel, validateWidth } from '../../schema';
import type { ModalVariantPropType } from '../../schema/props/variant/modal';
import { validateModalVariant } from '../../schema/props/variant/modal';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import { handleCancelOverlay } from '../../utils/tooltip-open-tracking';

/**
 * https://en.wikipedia.org/wiki/Modal_window
 *
 * @slot - The modal's contents.
 */
@Component({
	tag: 'kol-modal',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolModal implements ModalAPI {
	@Element() private readonly host?: HTMLKolModalElement;
	private refDialog?: HTMLDialogElement;

	public disconnectedCallback(): void {
		void this.closeModal();
	}

	private handleNativeCloseEvent() {
		this.state._on?.onClose?.();
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.close);
		}
	}

	/**
	 * Opens the modal dialog.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	async openModal() {
		this.refDialog?.showModal();
	}

	/**
	 * Closes the modal dialog.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async closeModal() {
		/* The optional chaining for the `close` method is not strictly necessary, but a simple/lazy workaround for HTMLDialog not being implemented in jsdom, causing Jest tests to fail. It may be removed in the future. */
		this.refDialog?.close?.();
	}

	private readonly on = {
		onClose: async () => {
			await this.closeModal();
		},
	};

	public render(): JSX.Element {
		return (
			<dialog
				aria-label={this.state._label}
				class={clsx('kol-modal', {
					'kol-modal__blank': this.state._variant === 'blank',
					'kol-modal__card': this.state._variant === 'card',
				})}
				onCancel={handleCancelOverlay}
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
					<KolCardWcTag _label={this.state._label} _hasCloser _on={this.on}>
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
	 * Defines the modal callback functions.
	 */
	@Prop() public _on?: KoliBriModalEventCallbacks;

	/**
	 * Defines the width of the modal. (max-width: 100%)
	 */
	@Prop() public _width?: string = '100%';

	/**
	 * Defines the variant of the modal.
	 */
	@Prop() public _variant?: ModalVariantPropType = 'blank';

	@State() public state: ModalStates = {
		_label: '', // ⚠ required
		_width: '100%',
	};

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			required: true,
		});
	}

	@Watch('_on')
	public validateOn(value?: KoliBriModalEventCallbacks): void {
		if (typeof value === 'object' && value !== null) {
			const callbacks: KoliBriModalEventCallbacks = {};
			if (typeof value.onClose === 'function' || value.onClose === true) {
				callbacks.onClose = value.onClose;
			}
			setState<KoliBriModalEventCallbacks>(this, '_on', callbacks);
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
		this.validateOn(this._on);
		this.validateWidth(this._width);
		this.validateVariant(this._variant);
	}
}
