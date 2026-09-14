import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import type { AccordionApi } from '../../internal/functional-components/accordion/api';
import { accordionPropsConfig } from '../../internal/functional-components/accordion/api';
import { AccordionFC } from '../../internal/functional-components/accordion/component';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { accordionCallbacksProp, disabledProp, labelProp, levelProp, openProp } from '../../internal/props';
import type { AccordionCallbacksPropType, AccordionProps, ClickableElement, FocusableElement, HeadingLevel, KolFocusOptions } from '../../schema';
import { createRelatedUniqueId, createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

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
export class KolAccordion
	extends BaseWebComponent<AccordionApi>
	implements AccordionProps, ClickableElement, FocusableElement, WebComponentInterface<AccordionApi>
{
	@Element() protected readonly host?: HTMLKolAccordionElement;

	private readonly accordionId = createUniqueId('accordion');

	protected readonly ctaRef = createCtaRef<HTMLKolButtonWcElement>();

	// --- @State ---

	@State() public controlId: string = createRelatedUniqueId(this.accordionId, 'control');
	@State() public headingId: string = createRelatedUniqueId(this.accordionId, 'heading');

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(accordionPropsConfig);

		this.watchDisabled(this._disabled);
		this.watchLabel(this._label);
		this.watchLevel(this._level);
		this.watchOn(this._on);
		this.watchOpen(this._open);
	}

	// --- Event handling ---

	private readonly handleToggle = (event: MouseEvent): void => {
		this._open = !this._open;

		/**
		 * Der Timeout wird benötigt, damit das Event
		 * vom Button- auf das Accordion-Event wechselt.
		 * So ist es dem Anwendenden möglich das _open-
		 * Attribute abzufragen.
		 */

		setTimeout(() => {
			const on = this.getRenderProp('on');
			on.onClick?.(event, Boolean(this._open));
			on.onToggle?.(event, Boolean(this._open));

			if (this.host) {
				dispatchDomEvent(this.host, KolEvent.click, Boolean(this._open));
				dispatchDomEvent(this.host, KolEvent.toggle, Boolean(this._open));
			}
		});
	};

	// --- Public methods ---

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@delegateFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	/**
	 * Triggers a click on the trigger button of the first section.
	 */
	@Method()
	@delegateClick('ctaRef')
	public async click(): Promise<void> {}

	// --- Render ---

	public render(): JSX.Element {
		return (
			<Host>
				<AccordionFC
					controlId={this.controlId}
					disabled={this.getRenderProp('disabled')}
					handleToggle={this.handleToggle}
					headingId={this.headingId}
					label={this.getRenderProp('label')}
					level={this.getRenderProp('level')}
					on={this.getRenderProp('on')}
					open={this.getRenderProp('open')}
					refHeadingButton={this.ctaRef}
				>
					<slot />
				</AccordionFC>
			</Host>
		);
	}

	// --- Props + Watchers ---

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: boolean = false;
	@Watch('_disabled')
	public watchDisabled(value?: boolean): void {
		disabledProp.apply(value, (v) => this.setRenderProp('disabled', v));
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: string;
	@Watch('_label')
	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => this.setRenderProp('label', v));
	}

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 0;
	@Watch('_level')
	public watchLevel(value?: HeadingLevel): void {
		levelProp.apply(value, (v) => this.setRenderProp('level', v));
	}

	/**
	 * Gibt die EventCallback-Funktionen an.
	 */
	@Prop() public _on?: AccordionCallbacksPropType<boolean>;
	@Watch('_on')
	public watchOn(value?: AccordionCallbacksPropType<boolean>): void {
		accordionCallbacksProp.apply(value, (v) => this.setRenderProp('on', v));
	}

	/**
	 * Opens/expands the element when truthy, closes/collapses when falsy.
	 * @TODO: Change type back to `OpenPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _open?: boolean = false;
	@Watch('_open')
	public watchOpen(value?: boolean): void {
		openProp.apply(value, (v) => this.setRenderProp('open', v));
	}
}
