import type { KoliBriModalEventCallbacks, LabelPropType, ModalAPI, ModalStates } from '../../schema';
import { setState, validateLabel, watchString, watchValidator } from '../../schema';
import type { JSX } from '@stencil/core';
import { Method } from '@stencil/core';
import { Component, h, Prop, State, Watch } from '@stencil/core';

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
	private refDialog?: HTMLDialogElement;

	public componentDidRender(): void {
		if (this.state._activeElement) {
			this.refDialog?.showModal();
		}
	}

	public disconnectedCallback(): void {
		void this.closeModal();
	}

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	async openModal() {
		this.refDialog?.showModal();
	}

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async closeModal() {
		this._activeElement = null;
		this.refDialog?.close();
		this.state._on?.onClose?.();
	}

	private readonly onKeyDown = (event: KeyboardEvent) => {
		if (event?.code === 'Escape') {
			void this.closeModal();
		}
	};

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
				onKeyDown={this.onKeyDown}
			>
				<slot />
			</dialog>
		);
	}

	/**
	 * Legacy property - while set to an HTMLElement, the modal is open.
	 * @deprecated Use methode `openModal` and `closeModal` instead.
	 */
	@Prop({ mutable: true }) public _activeElement?: HTMLElement | null;

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
		_activeElement: null,
		_label: '', // ⚠ required
		_width: '100%',
	};

	@Watch('_activeElement')
	public validateActiveElement(value?: HTMLElement | null): void {
		watchValidator(this, '_activeElement', (value): boolean => typeof value === 'object' || value === null, new Set(['HTMLElement', 'null']), value, {
			defaultValue: null,
			hooks: {
				afterPatch: () => {
					if (this.state._activeElement) {
						void this.openModal();
					} else {
						void this.closeModal();
					}
				},
			},
		});
	}

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
		this.validateActiveElement(this._activeElement);
		this.validateLabel(this._label);
		this.validateOn(this._on);
		this.validateWidth(this._width);
	}
}
