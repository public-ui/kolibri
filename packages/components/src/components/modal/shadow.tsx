import type { KoliBriModalEventCallbacks, LabelPropType, ModalAPI, ModalStates } from '../../schema';
import { setState, validateLabel, watchString } from '../../schema';
import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

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

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	async openModal() {
		this.refDialog?.showModal();
	}

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async closeModal() {
		/* The optional chaining for the `close` method is not strictly necessary, but a simple/lazy workaround for HTMLDialog not being implemented in jsdom, causing Jest tests to fail. It may be removed in the future. */
		this.refDialog?.close?.();
	}

	public render(): JSX.Element {
		return (
			<dialog
				class="kol-modal"
				ref={(el) => {
					this.refDialog = el;
				}}
				style={{
					width: this.state._width,
				}}
				aria-label={this.state._label}
				onClose={this.handleNativeCloseEvent.bind(this)}
			>
				{/* It's necessary to have a block element container for cross-browser compatibility. The display property for the slot content is unknown and could be inline. */}
				<div>
					<slot />
				</div>
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
		watchString(this, '_width', value, {
			defaultValue: '100%',
		});
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
		this.validateOn(this._on);
		this.validateWidth(this._width);
	}
}
