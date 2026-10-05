import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import type { DialogApi } from '../../internal/functional-components/dialog/api';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { DialogProps, HeadingLevel, KoliBriDialogEventCallbacks, LabelPropType } from '../../schema';
import type { ModalVariantPropType } from '../../schema/props/variant/modal';
import { createUniqueId, nonce } from '../../utils/dev.utils';
import { BaseDialogWebComponent } from './base';

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
export class KolDialog extends BaseDialogWebComponent implements DialogProps, WebComponentInterface<DialogApi> {
	@Element() protected readonly host?: HTMLKolDialogElement;

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initDialogRenderProps();

		this.watchLabel(this._label);
		this.watchLevel(this._level);
		this.watchOn(this._on);
		this.watchVariant(this._variant);
		this.watchWidth(this._width);
	}

	public componentDidRender(): void {
		this.syncCardCloseTooltipListeners();
	}

	public disconnectedCallback(): void {
		this.teardownDialog();
	}

	// --- Public methods ---

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
		await this.show(true);
	}

	/**
	 * Opens the dialog. Pass true to open as a modal dialog.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async show(modal: boolean = false): Promise<void> {
		this.showDialog(modal);
	}

	/**
	 * Closes the dialog.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async close(): Promise<void> {
		this.closeDialog();
	}

	/**
	 * Closes the dialog.
	 * @deprecated Use close() instead.
	 */
	@Method()
	public async closeModal(): Promise<void> {
		await this.close();
	}

	// --- Render ---

	protected renderSlot(): JSX.Element {
		return <slot />;
	}

	public render(): JSX.Element {
		return <Host>{this.renderDialogFC()}</Host>;
	}

	// --- @State ---

	@State() public ariaDescriptionId: string = nonce();

	@State() public headingId: string = createUniqueId('dialog-heading');

	@State() public modal: boolean = true;

	// --- Props + Watchers ---

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;
	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		this.applyLabel(value);
	}

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 0;
	@Watch('_level')
	public watchLevel(value?: HeadingLevel): void {
		this.applyLevel(value);
	}

	/**
	 * Defines the modal callback functions.
	 */
	@Prop() public _on?: KoliBriDialogEventCallbacks;
	@Watch('_on')
	public watchOn(value?: KoliBriDialogEventCallbacks): void {
		this.applyOn(value);
	}

	/**
	 * Defines the variant of the modal.
	 */
	@Prop() public _variant?: ModalVariantPropType = 'blank';
	@Watch('_variant')
	public watchVariant(value?: ModalVariantPropType): void {
		this.applyVariant(value);
	}

	/**
	 * Defines the width of the modal. (max-width: 100%)
	 */
	@Prop() public _width?: string = '100%';
	@Watch('_width')
	public watchWidth(value?: string): void {
		this.applyWidth(value);
	}
}
