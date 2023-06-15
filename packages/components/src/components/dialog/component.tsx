import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { KoliBriModalEventCallbacks } from '../../types/modal';
import { setState, watchString } from '../../utils/prop.validators';
import { KoliBriDialogApi, KoliBriDialogEventCallbacks, KoliBriDialogStates } from '../../types/dialog';
import { validateActiveElement } from '../../types/props/active-element';

/**
 * @slot - Der Inhalt des Modals.
 */
@Component({
	tag: 'kol-dialog',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolDialog implements KoliBriDialogApi {
	private dialogElement?: HTMLDialogElement;

	public readonly catchDialogElement = (el?: HTMLDialogElement) => {
		this.dialogElement = el;
	};

	public readonly closeDialog = (): void => {
		this.state._activeElement?.focus();
		this._activeElement = null;

		if (typeof this.state._on?.onClose === 'function') {
			this.state._on.onClose();
		}
	};

	public disconnectedCallback(): void {
		if (this.dialogElement) {
			this.closeDialog();
		}
	}

	private readonly onKeyDown = (event: KeyboardEvent) => {
		if (event && event.code === 'Escape') {
			this.closeDialog();
		}
	};

	public render(): JSX.Element {
		return (
			<Host>
				<dialog ref={this.catchDialogElement} class="dialog" style={{ width: this.state._width }} onKeyDown={this.onKeyDown}>
					{this.state._hideCloseButton ? (
						''
					) : (
						<kol-button-wc
							class="close_button"
							_hideLabel
							_icon="codicon codicon-close"
							_label="Dialog schließen"
							_on={{ onClick: this.closeDialog }}
						></kol-button-wc>
					)}
					<slot />
				</dialog>
			</Host>
		);
	}

	/**
	 * Übergibt eine Referenz auf das öffnende HTML-Element, wodurch der Dialog geöffnet wird. "null" um zu schließen.
	 */
	@Prop({ mutable: true }) public _activeElement?: HTMLElement | null;

	/**
	 * Mit diesem Attribut kann die Schließenschaltfläche ausgeblendet werden. Wenn man z.B. einen eigenen Einbaut.
	 */
	@Prop() public _hideCloseButton?: boolean;

	/**
	 * Übergibt eine Funktion, die nach dem Schließen des Dialogs aufgerufen wird.
	 */
	@Prop() public _on?: KoliBriDialogEventCallbacks;

	/**
	 * Setzt die Breite des Dialogs. (max-width: 100%). Die Ausmaße des Dialogs sollten durch den Inhalt definiert werden, nutzen Sie diese Eigenschaft nur, wenn dies nicht funktioniert.
	 */
	@Prop() public _width?: string;

	@State() public state: KoliBriDialogStates = {
		_activeElement: null,
	};

	@Watch('_activeElement')
	public validateActiveElement(value?: HTMLElement | null): void {
		validateActiveElement(this, value);
		if (this.state._activeElement) {
			this.dialogElement?.showModal();
		} else {
			this.dialogElement?.close();
		}
	}

	@Watch('_hideCloseButton')
	public validateHideCloseButton(value?: boolean): void {
		setState<boolean>(this, '_hideCloseButton', value);
	}

	@Watch('_on')
	public validateOn(value?: KoliBriModalEventCallbacks): void {
		setState<KoliBriModalEventCallbacks>(this, '_on', value);
	}

	@Watch('_width')
	public validateWidth(value?: string): void {
		watchString(this, '_width', value);
	}

	public componentWillLoad(): void {
		this.validateActiveElement(this._activeElement);
		this.validateHideCloseButton(this._hideCloseButton);
		this.validateOn(this._on);
		this.validateWidth(this._width);
	}
}
