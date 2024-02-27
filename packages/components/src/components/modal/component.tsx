/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { KoliBriModalEventCallbacks } from '../../types/modal';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { featureHint } from '../../utils/a11y.tipps';
import { getKoliBri } from '../../utils/dev.utils';
import { setState, watchString, watchValidator } from '../../utils/prop.validators';
import { ModalService } from './service';
import { API, States } from './types';

/**
 * https://en.wikipedia.org/wiki/Modal_window
 * @deprecated use the native <dialog> instead
 */

/**
 * @slot - Der Inhalt des Modals.
 */
@Component({
	tag: 'kol-modal',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolModal implements API {
	private hostElement?: HTMLElement;

	public componentDidRender(): void {
		if (this.hostElement /* SSR instanceof HTMLElement */) {
			if (this.state._activeElement /* SSR instanceof HTMLElement */) {
				(getKoliBri().Modal as ModalService).openModal(this.hostElement, this.state._activeElement);
			} else {
				(getKoliBri().Modal as ModalService).closeModal(this.hostElement);
			}
		}
	}

	public disconnectedCallback(): void {
		if (this.hostElement /* SSR instanceof HTMLElement */) {
			(getKoliBri().Modal as ModalService).closeModal(this.hostElement);
		}
	}

	private readonly onKeyDown = (event: KeyboardEvent) => {
		if (event && event.code === 'Escape') {
			this._activeElement = null;
		}
	};

	public render(): JSX.Element {
		return (
			<Host
				class="kol-modal"
				ref={(el) => {
					this.hostElement = el as HTMLElement;
				}}
			>
				{this.state._activeElement /* SSR instanceof HTMLElement */ && (
					<div class="overlay">
						<div
							class="modal"
							style={{
								width: this.state._width,
							}}
							aria-label={this.state._label}
							aria-modal="true"
							role="dialog"
							onKeyDown={this.onKeyDown}
							ref={(el) => {
								if (el /* SSR instanceof HTMLElement */) {
									el.setAttribute('tabindex', '0');
									setTimeout(() => el.focus(), 250);
								}
							}}
						>
							<slot />
						</div>
					</div>
				)}
			</Host>
		);
	}

	/**
	 * Gibt die Referenz auf das auslösende HTML-Element an, wodurch das Modal geöffnet wurde.
	 */
	@Prop({ mutable: true }) public _activeElement?: HTMLElement | null;

	/**
	 * Deprecated: Setzt die semantische Beschriftung der Komponente.
	 *
	 * @deprecated use _label instead
	 */
	@Prop() public _ariaLabel?: string;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: LabelPropType; // TODO: required in v2

	/**
	 * Gibt die EventCallback-Function für das Schließen des Modals an.
	 */
	@Prop() public _on?: KoliBriModalEventCallbacks;

	/**
	 * Defines the width of the modal. (max-width: 100%)
	 */
	@Prop() public _width?: string = '100%';

	@State() public state: States = {
		_activeElement: null,
		_label: '…', // ⚠ required
		_width: '100%',
	};

	@Watch('_activeElement')
	public validateActiveElement(value?: HTMLElement | null): void {
		watchValidator(this, '_activeElement', (value): boolean => typeof value === 'object' || value === null, new Set(['HTMLElement', 'null']), value, {
			defaultValue: null,
			hooks: {
				afterPatch: () => {
					/* Call onClose event in the _activeElement watcher because activeElement can be set internally and from the outside and closes the modal when set to null. */
					if (this._activeElement === null && this.state._on?.onClose) {
						this.state._on.onClose();
					}
				},
			},
		});
	}

	/**
	 * @deprecated
	 */
	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		this.validateLabel(value);
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
			featureHint('[KolTabs] Prüfen, wie man auch einen EventCallback einzeln ändern kann.');
			const callbacks: KoliBriModalEventCallbacks = {};
			if (typeof value.onClose === 'function' || value.onClose === true) {
				callbacks.onClose = value.onClose;
			}
			setState<KoliBriModalEventCallbacks>(this, '_on', callbacks);
		}
	}

	@Watch('_width')
	public validateWidth(value?: string): void {
		watchString(this, '_width', value, {
			defaultValue: '100%',
		});
	}

	public componentWillLoad(): void {
		this.validateActiveElement(this._activeElement);
		this.validateLabel(this._label || this._ariaLabel);
		this.validateOn(this._on);
		this.validateWidth(this._width);
	}
}
