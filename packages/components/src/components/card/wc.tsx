import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';

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
import { directClick, directFocus } from '../../utils/element-interaction';
import { BaseCardWebComponent } from './base';

/**
 * Transitional `kol-card-wc` — a `shadow:false` element that renders `CardFC` into the light DOM.
 *
 * `kol-dialog` and `kol-drawer` render it inside their own shadow DOM and style the inner
 * `.kol-card` classes from their stylesheets, which a shadow root would hide. Once both consumers
 * render `CardFC` directly, this element can be deleted.
 *
 * Differences to `kol-card`:
 *
 * - `@directFocus`/`@directClick`: without a shadow root the interactive element is reached directly.
 * - `_headingId`, so a consumer can point its own `aria-labelledby` at the card's heading.
 *
 * @internal
 * @slot - Allows arbitrary HTML to be inserted into the content area of the card.
 */
@Component({
	tag: 'kol-card-wc',
	shadow: false,
})
export class KolCardWc extends BaseCardWebComponent implements CardProps, ClickableElement, FocusableElement, WebComponentInterface<CardApi> {
	@Element() protected readonly host?: HTMLKolCardElement;

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initCardRenderProps();

		this.watchHasCloser(this._hasCloser);
		this.watchHeadingId(this._headingId);
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
	@directFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	/**
	 * Clicks the primary interactive element inside this component.
	 */
	@Method()
	@directClick('ctaRef')
	public async click(): Promise<void> {}

	// --- Render ---

	protected renderSlot(): JSX.Element {
		return <slot />;
	}

	public render(): JSX.Element {
		return this.renderCardFC();
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
	 * Defines the ID of the heading element. If not provided, an internal ID will be generated.
	 * @internal
	 */
	@Prop() public _headingId?: string;
	@Watch('_headingId')
	public watchHeadingId(value?: string): void {
		this.applyHeadingId(value);
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
