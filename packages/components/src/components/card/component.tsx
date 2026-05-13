import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import type { CardAPI, CardStates, HasCloserPropType, HeadingLevel, KoliBriAlertEventCallbacks, KoliBriCardEventCallbacks, LabelPropType } from '../../schema';
import { setState, validateHasCloser, validateLabel } from '../../schema';

import { translate } from '../../i18n';
import { watchHeadingLevel } from '../heading/validation';

import { KolButtonWcTag } from '../../core/component-names';
import { KolHeadingFc } from '../../functional-components';
import { createUniqueId } from '../../utils/dev.utils';
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
export class KolCardWc implements CardAPI {
	@Element() private readonly host?: HTMLKolCardElement;
	private readonly translateClose = translate('kol-close');

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

	public render(): JSX.Element {
		return (
			<Host>
				{/*
					Using a semantic <article> container with aria-labelledby provides proper
					accessibility for a self-contained card. When many cards appear together,
					wrap them in a list (<ul> / <ol>) to preserve clean page navigation.
				*/}
				<article aria-labelledby={this._headingId} class="kol-card">
					<KolHeadingFc class="kol-card__header" id={this._headingId} level={this.state._level}>
						{this.state._label}
					</KolHeadingFc>
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

	@State() public state: CardStates = {
		_label: '', // ⚠ required
	};

	private validateOnValue = (value: unknown): boolean =>
		typeof value === 'object' && value !== null && typeof (value as KoliBriCardEventCallbacks).onClose === 'function';

	@Watch('_hasCloser')
	public validateHasCloser(value?: HasCloserPropType): void {
		validateHasCloser(this, value);
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

	public componentWillLoad(): void {
		this.validateHasCloser(this._hasCloser);
		this.validateLabel(this._label);
		this.validateLevel(this._level);
		this.validateOn(this._on);
	}
}
