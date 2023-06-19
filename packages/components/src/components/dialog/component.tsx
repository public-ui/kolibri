import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { KoliBriDialogApi, KoliBriDialogCallbacks, KoliBriDialogStates } from '../../types/dialog';
import { setState, watchBoolean } from '../../utils/prop.validators';

/**
 * @slot - Der Inhalt des Dialogs (Modals).
 */
@Component({
	tag: 'kol-dialog',
	styleUrls: {
		default: './style.css',
	},
	shadow: false,
})
export class KolDialog implements KoliBriDialogApi {
	private dialogElement?: HTMLDialogElement;

	public readonly catchDialogElement = (el?: HTMLDialogElement) => {
		this.dialogElement = el;
	};

	private readonly onKeyDown = (event: KeyboardEvent) => {
		if (event && event.code === 'Escape') {
			this._show = false;
			if (this._on?.onClosedByEsc) {
				this._on?.onClosedByEsc(event);
			}
		}
	};

	public render(): JSX.Element {
		return (
			<Host>
				<dialog ref={this.catchDialogElement} onKeyDown={this.onKeyDown}>
					<slot />
				</dialog>
			</Host>
		);
	}

	/**
	 * Event handling for the dialog (modal).
	 */
	@Prop() public _on?: KoliBriDialogCallbacks = {};

	/**
	 * Shows or hides the dialog.
	 */
	@Prop({ mutable: true, reflect: true }) public _show?: boolean = false;

	@State() public state: KoliBriDialogStates = {
		_on: {},
		_show: false,
	};

	@Watch('_on')
	public validateOn(value?: KoliBriDialogCallbacks): void {
		if (typeof value === 'object' && value !== null && typeof value.onClosedByEsc === 'function') {
			setState(this, '_on', value);
		}
	}

	@Watch('_show')
	public validateShow(value?: boolean): void {
		watchBoolean(this, '_show', value, {
			hooks: {
				afterPatch: () => {
					/**
					 * Der Timeout wird benötigt, weil die Referenz auf das Dialog-Element erst nach dem Rendern
					 * verfügbar ist. Und erst danach kann die Methode `showModal` oder `close` aufgerufen werden.
					 */
					setTimeout(() => {
						if (this.state._show) {
							this.dialogElement?.showModal();
						} else {
							this.dialogElement?.close();
						}
					});
				},
			},
		});
	}

	public componentWillLoad(): void {
		this.validateOn(this._on);
		this.validateShow(this._show);
	}
}
