/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import type { KoliBriModalEventCallbacks, LabelPropType, ModalAPI, ModalStates } from '@public-ui/schema';
import { featureHint, setState, validateLabel, watchString, watchValidator } from '@public-ui/schema';
import { Component, Host, Prop, State, Watch, h } from '@stencil/core';

import type { JSX } from '@stencil/core';
import { ModalService } from './service';

const modalService = new ModalService();

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
		default: './style.css',
	},
	shadow: true,
})
export class KolModal implements ModalAPI {
	private hostElement?: HTMLElement;

	public componentDidRender(): void {
		if (this.hostElement /* SSR instanceof HTMLElement */) {
			if (this.state._activeElement /* SSR instanceof HTMLElement */) {
				modalService.openModal(this.hostElement, this.state._activeElement);
			} else {
				modalService.closeModal(this.hostElement);
			}
		}
	}

	public disconnectedCallback(): void {
		if (this.hostElement /* SSR instanceof HTMLElement */) {
			modalService.closeModal(this.hostElement);
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
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Gibt die EventCallback-Function für das Schließen des Modals an.
	 */
	@Prop() public _on?: KoliBriModalEventCallbacks;

	/**
	 * Defines the width of the modal. (max-width: 100%)
	 */
	@Prop() public _width?: string = '100%';

	@State() public state: ModalStates = {
		_activeElement: null,
		_label: '', // ⚠ required
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
		this.validateLabel(this._label);
		this.validateOn(this._on);
		this.validateWidth(this._width);
	}
}
