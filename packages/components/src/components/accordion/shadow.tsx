// https://codepen.io/mbxtr/pen/OJPOYg?html-preprocessor=haml
import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import type { JSX } from '@stencil/core';
import type {
	AccordionAPI,
	AccordionStates,
	AccordionCallbacksPropType,
	DisabledPropType,
	FocusableElement,
	HeadingLevel,
	LabelPropType,
	OpenPropType,
} from '../../schema';
import { featureHint, validateAccordionCallbacks, validateDisabled, validateLabel, validateOpen } from '../../schema';
import { nonce } from '../../utils/dev.utils';
import { watchHeadingLevel } from '../heading/validation';
import KolCollapsibleFc, { type CollapsibleProps } from '../../functional-components/Collapsible';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

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
export class KolAccordion implements AccordionAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolAccordionElement;

	private readonly nonce = nonce();
	private buttonWcRef?: HTMLKolButtonWcElement;

	private readonly catchRef = (ref?: HTMLKolButtonWcElement) => {
		this.buttonWcRef = ref;
	};

	@Method()
	public async kolFocus() {
		await this.buttonWcRef?.kolFocus();
	}

	private handleOnClick = (event: MouseEvent) => {
		this._open = !this._open;

		/**
		 * Der Timeout wird benötigt, damit das Event
		 * vom Button- auf das Accordion-Event wechselt.
		 * So ist es dem Anwendenden möglich das _open-
		 * Attribute abzufragen.
		 */
		setTimeout(() => {
			this.state._on?.onClick?.(event, this._open === true);
			if (this.host) {
				dispatchDomEvent(this.host, KolEvent.click, this._open === true);
			}
		});
	};

	public render(): JSX.Element {
		const { _open, _label, _disabled, _level } = this.state;
		const rootClass = 'kol-accordion';

		const props: CollapsibleProps = {
			id: this.nonce,
			label: _label,
			open: _open,
			disabled: _disabled,
			level: _level,
			onClick: this.handleOnClick,
			class: rootClass,
			HeadingProps: { class: `${rootClass}__heading` },
			HeadingButtonProps: {
				ref: this.catchRef,
				class: `${rootClass}__heading-button`,
			},
			ContentProps: {
				class: `${rootClass}__content`,
				wrapperClass: `${rootClass}__wrapper`,
				animationClass: `${rootClass}__wrapper-animation`,
			},
		};

		return (
			<KolCollapsibleFc {...props}>
				<slot />
			</KolCollapsibleFc>
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
	@Prop() public _level?: HeadingLevel = 0;

	/**
	 * Gibt die EventCallback-Funktionen an.
	 */
	@Prop() public _on?: AccordionCallbacksPropType<boolean>;

	/**
	 * Opens/expands the element when truthy, closes/collapses when falsy.
	 * @TODO: Change type back to `OpenPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _open?: boolean = false;

	@State() public state: AccordionStates = {
		_label: '', // ⚠ required
		_level: 0,
		_on: {},
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
	public validateOn(on?: AccordionCallbacksPropType<boolean>): void {
		validateAccordionCallbacks(this, on);
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
}
