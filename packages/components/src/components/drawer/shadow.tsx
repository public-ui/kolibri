/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import type { KoliBriModalEventCallbacks, LabelPropType, DrawerAPI, AlignPropType, DrawerStates } from '../../schema';
import { setState, validateLabel } from '../../schema';
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
	@Method()
	async open() {
		this.state._open = true;
	}

	@Method()
	async close() {
		this.state._open = false;
		if (this._on?.onClose) {
			this._on.onClose();
		}
	}

	private readonly onKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && this.state._open) {
			this.close();
		}
	};

	public render(): JSX.Element {
		return (
			<Host
				class={{
					'kol-drawer': true,
					[this._align as string]: true,
					modal: this._modal ?? false,
					open: this.state._open,
				}}
			>
				<div class="backdrop" onClick={() => this.close()}></div>
				<dialog open={this.state._open} onKeyDown={this.onKeyDown}>
					<div class="drawer-content" aria-label={this._label}>
						<slot />
					</div>
				</dialog>
			</Host>
		);
	}

	/**
	 * Gibt die Referenz auf das auslösende HTML-Element an, wodurch das Modal geöffnet wurde.
	 */
	@Prop() public _align?: AlignPropType = 'left';

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Defines if drawer is a modal.
	 */
	@Prop() public _modal?: boolean;

	/**
	 * Specifies the EventCallback function for closing the drawer.
	 */
	@Prop() public _on?: KoliBriModalEventCallbacks;

	@State() public state: DrawerStates = {
		_label: '', // ⚠ required
		_open: false,
	};

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
		this.validateLabel(this._label);
		this.validateOn(this._on);
	}
}
