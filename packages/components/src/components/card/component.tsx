import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import type { CardApi } from '../../internal/functional-components/card/api';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type {
	CardProps,
	ClickableElement,
	FocusableElement,
	HeadingLevel,
	HrefPropType,
	KolFocusOptions,
	KoliBriCardEventCallbacks,
	LabelPropType,
	LinkTargetPropType,
} from '../../schema';
import { createUniqueId, nonce } from '../../utils/dev.utils';
import { delegateClick, delegateFocus } from '../../utils/element-interaction';
import { BaseCardWebComponent } from './base';

/**
 * The **Card** component is ideal for visually highlighting individual sections of your website. It allows you to structure your content very easily.
 *
 * The **Card** component consists of a **_title area_** and a **_content area_**.
 *
 * The **title area** is displayed in a larger font. The **content area** is visually separated from the title area by a horizontal dividing line and is rendered in the default font.
 *
 * @slot - Allows arbitrary HTML to be inserted into the content area of the card.
 */
@Component({
	tag: 'kol-card',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolCard extends BaseCardWebComponent implements CardProps, ClickableElement, FocusableElement, WebComponentInterface<CardApi> {
	@Element() protected readonly host?: HTMLKolCardElement;

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initCardRenderProps();

		this.watchHasCloser(this._hasCloser);
		this.watchHref(this._href);
		this.watchLabel(this._label);
		this.watchLevel(this._level);
		this.watchOn(this._on);
		this.watchTarget(this._target);
	}

	public componentDidRender(): void {
		this.syncTooltipListeners();
	}

	public disconnectedCallback(): void {
		this.destroyTooltipBehavior();
	}

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
	 * Clicks the primary interactive element inside this component.
	 */
	@Method()
	@delegateClick('ctaRef')
	public async click(): Promise<void> {}

	// --- Render ---

	protected renderSlot(): JSX.Element {
		return <slot />;
	}

	public render(): JSX.Element {
		return <Host>{this.renderCardFC()}</Host>;
	}

	// --- @State ---

	@State() public ariaDescriptionId: string = nonce();

	@State() public headingId: string = createUniqueId('card-heading');

	// --- Props + Watchers ---

	/**
	 * Defines whether the element can be closed.
	 * @TODO: Change type back to `HasCloserPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hasCloser?: boolean = false;
	@Watch('_hasCloser')
	public watchHasCloser(value?: boolean): void {
		this.applyHasCloser(value);
	}

	/**
	 * Sets the target URI of the link or citation source.
	 */
	@Prop() public _href?: HrefPropType;
	@Watch('_href')
	public watchHref(value?: HrefPropType): void {
		this.applyHref(value);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;
	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		this.applyLabel(value);
	}

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 0;
	@Watch('_level')
	public watchLevel(value?: HeadingLevel): void {
		this.applyLevel(value);
	}

	/**
	 * Defines the event callback functions for the component.
	 */
	@Prop() public _on?: KoliBriCardEventCallbacks;
	@Watch('_on')
	public watchOn(value?: KoliBriCardEventCallbacks): void {
		this.applyOn(value);
	}

	/**
	 * Defines where to open the link.
	 */
	@Prop() public _target?: LinkTargetPropType;
	@Watch('_target')
	public watchTarget(value?: LinkTargetPropType): void {
		this.applyTarget(value);
	}
}
