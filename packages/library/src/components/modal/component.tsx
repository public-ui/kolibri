/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { AriaLabel } from '../../types/aria-label';
import { KoliBriModalEventCallbacks } from '../../types/modal';
import { featureHint } from '../../utils/a11y.tipps';
import { getKoliBri } from '../../utils/dev.utils';
import { setState, watchBoolean, watchString, watchValidator } from '../../utils/prop.validators';
import { ModalService } from './service';

/**
 * https://en.wikipedia.org/wiki/Modal_window
 */

/**
 * API
 */
type RequiredProps = AriaLabel;
type OptionalProps = {
	activeElement: HTMLElement | null;
	on: KoliBriModalEventCallbacks;
	width: string;
	show: boolean;
};
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = AriaLabel & {
	activeElement: HTMLElement | null;
	width: string;
};
type OptionalStates = {
	on: KoliBriModalEventCallbacks;
	show: boolean;
};
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-modal',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolModal implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
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
				ref={(el) => {
					this.hostElement = el as HTMLElement;
				}}
			>
				{this.state._activeElement /* SSR instanceof HTMLElement */ && (
					<div>
						<div>
							<div
								style={{
									width: this.state._width,
								}}
								aria-label={this.state._ariaLabel}
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
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 */
	@Prop() public _ariaLabel!: string;

	/**
	 * Gibt an, wie breit der Anzeigebereich sein soll (<= max-width: 100%).
	 */
	@Prop() public _width?: string = '100%';

	/**
	 * Gibt die EventCallback-Function für das Schließen des Modals an.
	 */
	@Prop() public _on?: KoliBriModalEventCallbacks;

	/**
	 * Gibt an, ob das Modal angezeigt wird.
	 */
	@Prop({ reflect: true }) public _show?: boolean = false;

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_activeElement: null,
		_ariaLabel: '…',
		_show: false,
		_width: '100%',
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_activeElement')
	public validateActiveElement(value?: HTMLElement | null): void {
		watchValidator(this, '_activeElement', (value): boolean => typeof value === 'object' || value === null, new Set(['HTMLElement', 'null']), value, {
			defaultValue: null,
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		watchString(this, '_ariaLabel', value, {
			required: true,
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
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

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_show')
	public validateShow(value?: boolean): void {
		watchBoolean(this, '_show', value, {
			defaultValue: false,
			hooks: {
				afterPatch: () => {
					if (this.state._show === false) {
						this._activeElement = null;
					}
				},
			},
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_width')
	public validateWidth(value?: string): void {
		watchString(this, '_width', value, {
			defaultValue: '100%',
		});
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateActiveElement(this._activeElement);
		this.validateAriaLabel(this._ariaLabel);
		this.validateOn(this._on);
		this.validateShow(this._show);
		this.validateWidth(this._width);
	}
}
