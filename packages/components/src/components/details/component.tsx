import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { DetailsApi } from '../../internal/functional-components/details/api';
import { detailsPropsConfig } from '../../internal/functional-components/details/api';
import { DetailsFC } from '../../internal/functional-components/details/component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { detailsCallbacksProp, disabledProp, labelProp, levelProp, openProp } from '../../internal/props';
import type { ClickableElement, DetailsCallbacksPropType, DetailsProps, FocusableElement, HeadingLevel, KolFocusOptions, LabelPropType } from '../../schema';
import { createRelatedUniqueId, createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

/**
 * The **Details** component allows additional information to be initially shown with a short introductory text,
 * which is only fully expanded after the user clicks on an arrow icon.
 *
 * By default, the **Details** component is displayed as a single-line layout element consisting of an arrow icon
 * followed by a short introductory text. The actual content is revealed below after clicking the header area. The arrow icon
 * changes its orientation from **_right_** to **_down_**.
 * The component can also be closed again to hide the content.
 *
 * @slot - The content displayed in the detail description.
 */
@Component({
	tag: 'kol-details',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolDetails extends BaseWebComponent<DetailsApi> implements ClickableElement, DetailsProps, FocusableElement, WebComponentInterface<DetailsApi> {
	@Element() protected readonly host?: HTMLKolDetailsElement;

	private readonly detailsId = createUniqueId('details');

	protected readonly ctaRef = createCtaRef<HTMLKolButtonWcElement>();

	private toggleTimeout?: ReturnType<typeof setTimeout>;

	// --- @State ---

	@State() public controlId: string = createRelatedUniqueId(this.detailsId, 'control');
	@State() public headingId: string = createRelatedUniqueId(this.detailsId, 'heading');

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(detailsPropsConfig);

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

		clearTimeout(this.toggleTimeout);

		this.toggleTimeout = setTimeout(() => {
			if (this.host) {
				dispatchDomEvent(this.host, KolEvent.toggle, Boolean(this._open));
			}
			this.getRenderProp('on').onToggle?.(event, Boolean(this._open));
		}, 25);
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
	 * Triggers a click on the summary/toggle button.
	 */
	@Method()
	@delegateClick('ctaRef')
	public async click(): Promise<void> {}

	// --- Render ---

	public render(): JSX.Element {
		return (
			<Host>
				<DetailsFC
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
				</DetailsFC>
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
	@Prop() public _label!: LabelPropType;
	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
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
	 * Defines the callback functions for details.
	 */
	@Prop() public _on?: DetailsCallbacksPropType<boolean>;
	@Watch('_on')
	public watchOn(value?: DetailsCallbacksPropType<boolean>): void {
		detailsCallbacksProp.apply(value, (v) => this.setRenderProp('on', v));
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
