// https://codepen.io/mbxtr/pen/OJPOYg?html-preprocessor=haml

import { featureHint, propagateFocus, setState, validateDisabled, validateLabel, validateOpen } from '@public-ui/schema';
import type { JSX } from '@stencil/core';
import { Component, Element, Host, Prop, State, Watch, h } from '@stencil/core';

import { nonce } from '../../utils/dev.utils';
import { watchHeadingLevel } from '../heading/validation';
import { KolHeadingWcTag, KolButtonWcTag } from '../../core/component-names';

import type { AccordionAPI, AccordionStates, DisabledPropType, HeadingLevel, KoliBriAccordionCallbacks, LabelPropType, OpenPropType } from '@public-ui/schema';
featureHint(`[KolAccordion] Anfrage nach einer KolAccordionGroup bei dem immer nur ein Accordion geöffnet ist.

- onClick auf der KolAccordion anwenden
- Click-Event prüft den _open-Status der Accordions
- Logik Öffnet und Schließt entsprechend`);
featureHint(`[KolAccordion] Tab-Sperre des Inhalts im geschlossenen Zustand.`);

/**
 *
 * @slot - Ermöglicht das Einfügen beliebigen HTML's in den Inhaltsbereich des Accordions.
 */
@Component({
	tag: 'kol-accordion',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolAccordion implements AccordionAPI {
	@Element() private readonly host?: HTMLKolDetailsElement;
	private readonly nonce = nonce();

	private readonly catchRef = (ref?: HTMLKolButtonWcElement) => {
		propagateFocus(this.host, ref);
	};

	public render(): JSX.Element {
		return (
			<Host class="kol-accordion">
				<div
					class={{
						accordion: true,
						disabled: this.state._disabled === true,
						open: this.state._open === true,
					}}
				>
					<KolHeadingWcTag _label="" _level={this.state._level} class="accordion-heading">
						<KolButtonWcTag
							class="accordion-button"
							ref={this.catchRef}
							slot="expert"
							_ariaControls={this.nonce}
							_ariaExpanded={this.state._open}
							_disabled={this.state._disabled}
							_icons={this.state._open ? 'codicon codicon-remove' : 'codicon codicon-add'}
							_label={this.state._label}
							_on={{ onClick: this.onClick }}
						></KolButtonWcTag>
					</KolHeadingWcTag>
					<div class="wrapper">
						<div class="animation-wrapper">
							<div aria-hidden={this.state._open === false ? 'true' : undefined} class="content" id={this.nonce}>
								<slot />
							</div>
						</div>
					</div>
				</div>
			</Host>
		);
	}

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: string;

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

	@State() public state: AccordionStates = {
		_label: '', // ⚠ required
		_level: 1,
	};

	@Watch('_disabled')
	public validateDisabled(value?: DisabledPropType): void {
		validateDisabled(this, value);
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
		this.validateDisabled(this._disabled);
		this.validateLabel(this._label);
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
