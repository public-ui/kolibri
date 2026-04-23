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
	 */
	@Method()
	public async openModal() {
		await this.dialogRef?.openModal();
	}

	/**
	 * Closes the dialog.
	 */
	@Method()
	public async closeModal() {
		await this.dialogRef?.closeModal();
	}

	public render(): JSX.Element {
		return (
			<KolDialogWcTag ref={this.catchRef} _label={this._label} _on={this._on} _variant={this._variant} _width={this._width} _level={this._level}>
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
