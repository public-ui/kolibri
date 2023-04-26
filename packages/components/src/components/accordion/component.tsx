// https://codepen.io/mbxtr/pen/OJPOYg?html-preprocessor=haml

import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { HeadingLevel } from '../../types/heading-level';
import { validateOpen } from '../../types/props';
import { featureHint } from '../../utils/a11y.tipps';
import { nonce } from '../../utils/dev.utils';
import { setState, watchString } from '../../utils/prop.validators';
import { watchHeadingLevel } from '../heading/validation';
import { API, KoliBriAccordionCallbacks, States } from './types';

featureHint(`[KolAccordion] Anfrage nach einer KolAccordionGroup bei dem immer nur ein Accordion geöffnet ist.

- onClick auf der KolAccordion anwenden
- Click-Event prüft den _open-Status der Accordions
- Logik Öffnet und Schließt entsprechend`);
featureHint(`[KolAccordion] Tab-Sperre des Inhalts im geschlossenen Zustand.`);

/**
 *
 * @slot header - Ermöglicht das Einfügen beliebigen HTML's in den Kopfbereich des Accordions.
 * @slot content - Ermöglicht das Einfügen beliebigen HTML's in den Inhaltsbereich des Accordions.
 */
@Component({
	tag: 'kol-accordion',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolAccordion implements API {
	private readonly nonce = nonce();

	public render(): JSX.Element {
		// const height = this.content?.getBoundingClientRect().height ?? 0;
		return (
			<Host>
				<div
					class={{
						accordion: true,
						open: this.state._open === true,
						close: this.state._open !== true,
					}}
				>
					<kol-heading-wc _label="" _level={this.state._level}>
						<kol-button-wc
							// slot="expert"
							_ariaControls={this.nonce}
							_ariaExpanded={this.state._open}
							_icon={this.state._open ? 'codicon codicon-remove' : 'codicon codicon-add'}
							_label={this.state._heading}
							_on={{ onClick: this.onClick }}
						></kol-button-wc>
					</kol-heading-wc>
					<div class="header">
						<slot name="header" />
					</div>
					<div
						aria-hidden={this.state._open === false ? 'true' : undefined}
						class="content"
						id={this.nonce}
						hidden={this.state._open === false}
						style={
							this.state._open === false
								? {
										display: 'none',
										height: '0',
										visibility: 'hidden',
								  }
								: undefined
						}
						// style={
						// 	this.state._open
						// 		? height > 0 && processEnv !== 'test' // TODO: remove this check when testing is fixed
						// 			? {
						// 				height: `${height}px`,
						// 				overflow: 'hidden',
						// 			}
						// 			: undefined
						// 		: {
						// 			height: '0',
						// 			overflow: 'hidden',
						// 			visibility: 'hidden',
						// 		}
						// }
					>
						<slot name="content" />
					</div>
				</div>
			</Host>
		);
	}

	/**
	 * Gibt die Überschrift des Accordions an.
	 */
	@Prop() public _heading!: string;

	/**
	 * Setzt den H-Level, von 1 bis 6, der Überschrift.
	 */
	@Prop() public _level?: HeadingLevel = 1;

	/**
	 * Gibt die EventCallback-Funktionen an.
	 */
	@Prop() public _on?: KoliBriAccordionCallbacks;

	/**
	 * Gibt an, ob das Accordion geöffnet ist.
	 */
	@Prop({ mutable: true, reflect: true }) public _open?: boolean = false;

	@State() public state: States = {
		_heading: '…', // ⚠ required
		_level: 1,
	};

	@Watch('_heading')
	public validateHeading(value?: string): void {
		watchString(this, '_heading', value, {
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
	public validateOpen(value?: boolean): void {
		validateOpen(this, value);
	}

	public componentWillLoad(): void {
		this.validateHeading(this._heading);
		this.validateLevel(this._level);
		this.validateOn(this._on);
		this.validateOpen(this._open);
	}

	private onClick = (event: Event) => {
		this._open = this._open === false;

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
