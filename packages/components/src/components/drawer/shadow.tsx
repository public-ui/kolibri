/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import type { KoliBriModalEventCallbacks, LabelPropType, DrawerAPI, AlignPropType, OpenPropType, ModalPropType, DrawerStates } from '../../schema';
import { setState, validateLabel, validateOpen, validateAlign, validateModal } from '../../schema';
import { Component, Host, Method, Prop, State, Watch, h } from '@stencil/core';

import type { JSX } from '@stencil/core';

/**
 * @slot - The Content of drawer.
 */
@Component({
	tag: 'kol-drawer',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolDrawer implements DrawerAPI {
	public hostElement?: HTMLElement;
	private dialogElement?: HTMLDialogElement;

	@Method()
	async open() {
		this.state._open = true;
		if (this.state._modal) {
			this.dialogElement?.showModal();
		} else {
			this.dialogElement?.show();
		}
	}

	@Method()
	async close() {
		this.state._open = false;
		this._on?.onClose?.();
		this.dialogElement?.close();
	}

	private renderDialogContent() {
		return (
			<div class={`drawer__wrapper drawer__wrapper--${this.state._align as string}`} aria-label={this.state._label}>
				<div class="drawer__content">
					<slot />
				</div>
			</div>
		);
	}

	private getRef = (el: HTMLDialogElement | undefined) => (this.dialogElement = el as HTMLDialogElement);
	public render(): JSX.Element {
		const isModal = this.state._modal;
		const isOpen = this.state._open;
		return (
			<Host class={`kol-drawer drawer ${isModal ? 'drawer--modal' : ''} ${isOpen ? 'drawer--open' : ''}`} ref={(el) => (this.hostElement = el as HTMLElement)}>
				<dialog class="drawer__dialog" ref={this.getRef}>
					{this.renderDialogContent()}
				</dialog>
			</Host>
		);
	}

	/**
	 * Specifies the default open state of the drawer.
	 */
	@Prop() public _open?: OpenPropType;

	/**
	 * Specifies the orientation of the drawer.
	 */
	@Prop() public _align?: AlignPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Indicates whether the drawer is a modal.
	 */
	@Prop() public _modal?: ModalPropType;

	/**
	 * Specifies the EventCallback function to be called when the drawer is closing.
	 */
	@Prop() public _on?: KoliBriModalEventCallbacks;

	@State() public state: DrawerStates = {
		_label: '', // ⚠ required
		_open: false,
		_align: 'left',
	};

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			required: true,
		});
	}

	@Watch('_align')
	public validateAlign(value?: AlignPropType): void {
		validateAlign(this, value);
	}

	@Watch('_modal')
	public validateModal(value?: ModalPropType): void {
		validateModal(this, value);
	}

	@Watch('_open')
	public validateOpen(value?: OpenPropType): void {
		if (typeof value === 'boolean') {
			validateOpen(this, value);
			value ? this.open() : this.close();
		}
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

	private handleClose() {
		this.close();
	}

	public componentDidLoad(): void {
		this.dialogElement?.addEventListener('close', this.handleClose.bind(this));
	}

	public disconnectedCallback(): void {
		this.dialogElement?.removeEventListener('close', this.handleClose);
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
		this.validateOpen(this._open);
		this.validateAlign(this._align);
		this.validateModal(this._modal);
		this.validateOn(this._on);
	}
}
