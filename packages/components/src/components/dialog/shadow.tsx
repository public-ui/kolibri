import type { JSX } from '@stencil/core';
import { Component, h, Method, Prop } from '@stencil/core';
import { KolDialogWcTag } from '../../core/component-names';
import type { DialogProps, HeadingLevel, KoliBriDialogEventCallbacks, LabelPropType } from '../../schema';
import type { ModalVariantPropType } from '../../schema/props/variant/modal';

/**
 * @slot - The dialog's contents.
 */
@Component({
	tag: 'kol-dialog',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolDialog implements DialogProps {
	private dialogRef?: HTMLKolDialogWcElement;

	private readonly catchRef = (ref?: HTMLKolDialogWcElement) => {
		this.dialogRef = ref;
	};

	/**
	 * Opens the dialog.
	 * @deprecated Use showModal() instead.
	 */
	@Method()
	public async openModal(): Promise<void> {
		await this.showModal();
	}

	/**
	 * Opens the dialog as a modal.
	 */
	@Method()
	public async showModal(): Promise<void> {
		await this.dialogRef?.showModal();
	}

	/**
	 * Opens the dialog. Pass false to open as a non-modal (modeless) dialog.
	 */
	@Method()
	public async show(modal: boolean = true): Promise<void> {
		await this.dialogRef?.show(modal);
	}

	/**
	 * Closes the dialog.
	 */
	@Method()
	public async close(): Promise<void> {
		await this.dialogRef?.close();
	}

	/**
	 * Closes the dialog.
	 * @deprecated Use close() instead.
	 */
	@Method()
	public async closeModal(): Promise<void> {
		await this.close();
	}

	public render(): JSX.Element {
		return (
			<KolDialogWcTag ref={this.catchRef} _label={this._label} _level={this._level} _on={this._on} _variant={this._variant} _width={this._width}>
				<slot />
			</KolDialogWcTag>
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
}
