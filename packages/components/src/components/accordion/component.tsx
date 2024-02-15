// https://codepen.io/mbxtr/pen/OJPOYg?html-preprocessor=haml

import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { HeadingLevel } from '../../types/heading-level';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { OpenPropType, validateOpen } from '../../types/props/open';
import { featureHint } from '../../utils/a11y.tipps';
import { nonce } from '../../utils/dev.utils';
import { setState } from '../../utils/prop.validators';
import { propagateFocus } from '../../utils/reuse';
import { watchHeadingLevel } from '../heading/validation';
import { API, KoliBriAccordionCallbacks, States } from './types';

featureHint(`[KolAccordion] Anfrage nach einer KolAccordionGroup bei dem immer nur ein Accordion geöffnet ist.

- onClick auf der KolAccordion anwenden
- Click-Event prüft den _open-Status der Accordions
- Logik Öffnet und Schließt entsprechend`);
featureHint(`[KolAccordion] Tab-Sperre des Inhalts im geschlossenen Zustand.`);

/**
 *
 * @slot - Ermöglicht das Einfügen beliebigen HTML's in den Inhaltsbereich des Accordions.
 * @slot content - Ermöglicht das Einfügen beliebigen HTML's in den Inhaltsbereich des Accordions.
 * @slot header - Deprecated für Version 2: Ermöglicht das Einfügen beliebigen HTML's in den Kopfbereich des Accordions.
 */
@Component({
	tag: 'kol-accordion',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolAccordion implements API {
	@Element() private readonly host?: HTMLKolDetailsElement;
	private readonly nonce = nonce();

	private readonly catchRef = (ref?: HTMLKolButtonWcElement) => {
		propagateFocus(this.host, ref);
	};

	public render(): JSX.Element {
		return (
			<Host>
				<div
					class={{
						'kol-accordion-wc': true,
						accordion: true,
						open: this.state._open === true,
					}}
				>
					<kol-heading-wc _label="" _level={this.state._level} class="kol-heading-wc">
						<kol-button-wc
							ref={this.catchRef}
							// slot="expert"
							_ariaControls={this.nonce}
							_ariaExpanded={this.state._open}
							_icons={this.state._open ? 'codicon codicon-remove' : 'codicon codicon-add'}
							_label={this.state._label}
							_on={{ onClick: this.onClick }}
							class="kol-button-wc"
						></kol-button-wc>
					</kol-heading-wc>
					<div class="header">
						<slot name="header"></slot>
					</div>
					<div class="wrapper">
						<div class="animation-wrapper">
							<div aria-hidden={this.state._open === false ? 'true' : undefined} class="content" id={this.nonce}>
								<slot name="content"></slot> {/* Deprecated for version 2 */}
								<slot />
							</div>
						</div>
					</div>
				</div>
			</Host>
		);
	}

	/**
	 * Deprecated: Gibt die Beschriftung der Komponente an.
	 * @deprecated Use _label.
	 */
	@Prop() public _heading?: string;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: string;

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 1;

	/**
	 * Gibt die EventCallback-Funktionen an.
	 */
	@Prop() public _on?: KoliBriAccordionCallbacks;

	/**
	 * If set (to true) opens/expands the element, closes if not set (or set to false).
	 * @TODO: Change type back to `OpenPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _open?: boolean = false;

	@State() public state: States = {
		_label: '…', // ⚠ required
		_level: 1,
	};

	@Watch('_heading')
	public validateHeading(value?: string): void {
		this.validateLabel(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			required: true,
		});
	}

	@Watch('_level')
	public validateLevel(value?: HeadingLevel): void {
		watchHeadingLevel(this, value);
	}

	@Watch('_on')
	public validateOn(value?: KoliBriAccordionCallbacks): void {
		if (typeof value === 'object' && value !== null && typeof value.onClick === 'function') {
			setState(this, '_on', value);
		}
	}

	@Watch('_open')
	public validateOpen(value?: OpenPropType): void {
		validateOpen(this, value);
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label || this._heading);
		this.validateLevel(this._level);
		this.validateOn(this._on);
		this.validateOpen(this._open);
	}

	private onClick = (event: Event) => {
		this._open = !this._open;

		/**
		 * Der Timeout wird benötigt, damit das Event
		 * vom Button- auf das Accordion-Event wechselt.
		 * So ist es dem Anwendenden möglich das _open-
		 * Attribute abzufragen.
		 */
		setTimeout(() => {
			if (typeof this.state._on?.onClick === 'function') {
				this.state._on.onClick(event, this._open === true);
			}
		});
	};
}
