// https://codepen.io/mbxtr/pen/OJPOYg?html-preprocessor=haml
import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import KolCollapsibleFc, { type CollapsibleProps } from '../../functional-components/Collapsible';
import type {
	AccordionAPI,
	AccordionCallbacksPropType,
	AccordionStates,
	DisabledPropType,
	FocusableElement,
	HeadingLevel,
	LabelPropType,
	OpenPropType,
} from '../../schema';
import { featureHint, validateAccordionCallbacks, validateDisabled, validateLabel, validateOpen } from '../../schema';
import { nonce } from '../../utils/dev.utils';
import { delegateFocus } from '../../utils/element-focus';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import { watchHeadingLevel } from '../heading/validation';

featureHint(`[KolAccordion] Anfrage nach einer KolAccordionGroup bei dem immer nur ein Accordion geöffnet ist.

- onClick auf der KolAccordion anwenden
- Click-Event prüft den _open-Status der Accordions
- Logik Öffnet und Schließt entsprechend`);
featureHint(`[KolAccordion] Tab-Sperre des Inhalts im geschlossenen Zustand.`);

/**
 * The **Accordion** component is a collapsible menu. Clicking the header area — consisting of an icon and a heading — expands the content to reveal additional information. It is an interactive navigation element designed to present extensive content in a space-saving manner.
 *
 * Accordions are used whenever content associated with a thematic heading needs to be shown or hidden. They allow more detailed information for a heading than would normally be practical, leaving it to the users to decide whether to view that information.
 *
 * @slot - Allows arbitrary HTML to be inserted into the content area of the accordion.
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

	private readonly setButtonWcRef = (ref?: HTMLKolButtonWcElement) => {
		this.buttonWcRef = ref;
	};

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	public async focus(): Promise<void> {
		return delegateFocus(this.host!, () => Promise.resolve(this.buttonWcRef?.focus?.()));
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
				ref: this.setButtonWcRef,
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
