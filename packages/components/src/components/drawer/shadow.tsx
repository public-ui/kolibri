/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import type { KoliBriModalEventCallbacks, LabelPropType, DrawerAPI, AlignPropType, OpenPropType, DrawerStates } from '../../schema';
import { setState, validateLabel, validateOpen } from '../../schema';
import { Component, Host, Method, Prop, State, Watch, h } from '@stencil/core';

import type { JSX } from '@stencil/core';

/**
 * @slot - Der Inhalt des Drawers.
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
		if (this._modal) {
			this.dialogElement?.showModal()
		} else {
			this._open = true;
			this.dialogElement?.show()
		}
	}

	@Method()
	async close() {
		this._on?.onClose?.();
		if (this._modal) {
			this.dialogElement?.close()
		} else {
			this._open = false;
		}
	}

	public render(): JSX.Element {
		return (
			<Host
				class={{
					'kol-drawer': true,
					[this._align as string]: true,
					modal: this._modal ?? false,
					open: this.state._open,
				}}
				ref={(el) => (this.hostElement = el as HTMLElement)}
			>
				<dialog ref={(el) => (this.dialogElement = el as HTMLDialogElement)} open={this.state._open}>
					<div class="drawer-wrapper" aria-label={this._label}>
						<div class="drawer-content">
							<slot />
						</div>
					</div>
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
	@Prop() public _align?: AlignPropType = 'left';

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Indicates whether the drawer is a modal.
	 */
	@Prop() public _modal?: boolean;

	/**
	 * Specifies the EventCallback function to be called when the drawer is closing.
	 */
	@Prop() public _on?: KoliBriModalEventCallbacks;

	@State() public state: DrawerStates = {
		_label: '', // ⚠ required
		_open: false,
	};

	@Watch('_open')
	public validateOpen(value?: OpenPropType): void {
		if (typeof value === "boolean") {
			validateOpen(this, value);
		}
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

	public componentWillLoad(): void {
		this.validateOpen(this._open);
		this.validateLabel(this._label);
		this.validateOn(this._on);
	}
}
