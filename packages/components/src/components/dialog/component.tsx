import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { KoliBriDialogApi, KoliBriDialogStates } from '../../types/dialog';
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
				<dialog ref={this.catchDialogElement} class="dialog" onKeyDown={this.onKeyDown}>
					<slot />
				</dialog>
			</Host>
		);
	}

	/**
	 * Übergibt eine Referenz auf das öffnende HTML-Element, wodurch der Dialog geöffnet wird. "null" um zu schließen.
	 */
	@Prop({ mutable: true }) public _activeElement?: HTMLElement | null;

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

	public componentWillLoad(): void {
		this.validateActiveElement(this._activeElement);
	}
}
