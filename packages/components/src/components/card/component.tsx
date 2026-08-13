import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import type {
	CardAPI,
	CardStates,
	ClickableElement,
	FocusableElement,
	HasCloserPropType,
	HeadingLevel,
	HrefPropType,
	KoliBriAlertEventCallbacks,
	KoliBriCardEventCallbacks,
	LabelPropType,
	LinkTargetPropType,
} from '../../schema';
import { setState, validateHasCloser, validateHref, validateLabel, validateLinkTarget } from '../../schema';

import { translate } from '../../i18n';
import { watchHeadingLevel } from '../heading/validation';

import { KolButtonWcTag } from '../../core/component-names';
import { KolHeadingFc } from '../../functional-components';
import { createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, directClick, directFocus } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

/**
 * @internal
 * @slot - Allows arbitrary HTML to be inserted into the content area of the card.
 *
 * ## Accessibility
 * The card uses semantic `<article>` markup with `aria-labelledby` to properly label the content region.
 * When displaying multiple cards, wrap them in a `<ul>` or `<ol>` to group them semantically.
 *
 * @example
 * // Single card
 * <kol-card-wc _label="Card Title">Content here</kol-card-wc>
 *
 * // Multiple cards (recommended)
 * <ul>
 *   <li><kol-card-wc _label="Card 1">Content 1</kol-card-wc></li>
 *   <li><kol-card-wc _label="Card 2">Content 2</kol-card-wc></li>
 * </ul>
 */
@Component({
	tag: 'kol-card-wc',
	shadow: false,
})
export class KolCardWc implements CardAPI, ClickableElement, FocusableElement {
	@Element() private readonly host?: HTMLKolCardElement;
	private readonly translateClose = translate('kol-close');
	protected readonly ctaRef = createCtaRef<HTMLAnchorElement>();

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

	private readonly close = () => {
		if (this._on?.onClose !== undefined) {
			this._on.onClose(new Event('Close'));
		}
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.close);
		}
	};

	private readonly on = {
		onClick: this.close,
	};

	private readonly onFocus = (event: FocusEvent) => {
		this.state?._on?.onFocus?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.focus);
		}
	};

	private readonly onBlur = (event: FocusEvent) => {
		this.state?._on?.onBlur?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.blur);
		}
	};

	public render(): JSX.Element {
		return (
			<Host>
				{/*
					Using a semantic <article> container with aria-labelledby provides proper
					accessibility for a self-contained card. When many cards appear together,
					wrap them in a list (<ul> / <ol>) to preserve clean page navigation.
				*/}
				<article aria-labelledby={this._headingId} class="kol-card">
					{this._href && (
						<a href={this._href} target={this._target} class="kol-card__link" onFocus={this.onFocus} onBlur={this.onBlur} ref={this.ctaRef}>
							<KolHeadingFc class="kol-card__header" id={this._headingId} level={this.state._level}>
								{this.state._label}
							</KolHeadingFc>
						</a>
					)}
					{!this._href && (
						<KolHeadingFc class="kol-card__header" id={this._headingId} level={this.state._level}>
							{this.state._label}
						</KolHeadingFc>
					)}
					<div class="kol-card__content">
						<slot />
					</div>
					{this.state._hasCloser && (
						<KolButtonWcTag
							class="kol-card__close-button kol-close-button"
							data-testid="card-close-button"
							_hideLabel
							_icons={{
								left: {
									icon: 'kolicon-cross',
								},
							}}
							_label={this.translateClose}
							_on={this.on}
							_tooltipAlign="left"
						/>
					)}
				</article>
			</Host>
		);
	}

	/**
	 * Defines whether the element can be closed.
	 * @TODO: Change type back to `HasCloserPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hasCloser?: boolean = false;

	/**
	 * Defines the ID of the heading element. If not provided, an internal ID will be generated.
	 * @internal
	 */
	@Prop() public _headingId?: string = createUniqueId('card-heading');

	/**
	 * Sets the target URI of the link or citation source.
	 */
	@Prop() public _href?: HrefPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 0;

	/**
	 * Defines the event callback functions for the component.
	 */
	@Prop() public _on?: KoliBriCardEventCallbacks;

	/**
	 * Defines where to open the link.
	 */
	@Prop() public _target?: LinkTargetPropType;

	@State() public state: CardStates = {
		_label: '', // ⚠ required
	};

	private validateOnValue = (value: unknown): boolean =>
		typeof value === 'object' && value !== null && typeof (value as KoliBriCardEventCallbacks).onClose === 'function';

	@Watch('_hasCloser')
	public validateHasCloser(value?: HasCloserPropType): void {
		validateHasCloser(this, value);
	}

	@Watch('_href')
	public validateHref(value?: string): void {
		validateHref(this, value);
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
	public validateOn(value?: KoliBriCardEventCallbacks): void {
		if (this.validateOnValue(value)) {
			setState<KoliBriCardEventCallbacks>(this, '_on', {
				onClose: (value as KoliBriAlertEventCallbacks).onClose,
			});
		}
	}

	@Watch('_target')
	public validateTarget(value?: LinkTargetPropType): void {
		validateLinkTarget(this, value);
	}

	public componentWillLoad(): void {
		this.validateHasCloser(this._hasCloser);
		this.validateHref(this._href);
		this.validateLabel(this._label);
		this.validateLevel(this._level);
		this.validateOn(this._on);
		this.validateTarget(this._target);
	}
}
