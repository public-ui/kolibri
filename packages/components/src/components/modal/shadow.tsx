import type { JSX } from '@stencil/core';
import { Component, h, Method, Prop } from '@stencil/core';
import { KolDialogWcTag } from '../../core/component-names';
import type { DialogProps, KoliBriDialogEventCallbacks, LabelPropType } from '../../schema';
import type { ModalVariantPropType } from '../../schema/props/variant/modal';

/**
 * The **Modal** component has been superseded by `kol-dialog`, which provides improved accessibility and conforms to the HTML dialog specification. It is still available in version 2 for backwards compatibility.
 *
 * @deprecated Use `kol-dialog` instead.
 * @slot - The modal's contents.
 */
@Component({
	tag: 'kol-modal',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolModal implements DialogProps {
	private dialogRef?: HTMLKolDialogWcElement;

	private readonly catchRef = (ref?: HTMLKolDialogWcElement) => {
		this.dialogRef = ref;
	};

	/**
	 * Opens the modal dialog.
	 * @deprecated Use showModal() instead.
	 */
	@Method()
	public openModal(): Promise<void> {
		return this.showModal();
	}

	/**
	 * Opens the dialog as a modal.
	 */
	@Method()
	public showModal(): Promise<void> {
		return this.dialogRef?.showModal() ?? Promise.resolve();
	}

	/**
	 * Opens the dialog. Pass true to open as a modal dialog.
	 */
	@Method()
	public show(modal: boolean = false): Promise<void> {
		return this.dialogRef?.show(modal) ?? Promise.resolve();
	}

	/**
	 * Closes the modal dialog.
	 */
	@Method()
	public close(): Promise<void> {
		return this.dialogRef?.close() ?? Promise.resolve();
	}

	/**
	 * Closes the modal dialog.
	 * @deprecated Use close() instead.
	 */
	@Method()
	public closeModal(): Promise<void> {
		return this.close();
	}

	public render(): JSX.Element {
		return (
			<KolDialogWcTag ref={this.catchRef} _label={this._label} _on={this._on} _variant={this._variant} _width={this._width}>
				<slot />
			</KolDialogWcTag>
		);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

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
}
