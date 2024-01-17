import type { HeadingAPI, HeadingLevel, HeadingStates, HeadingVariantPropType, LabelWithExpertSlotPropType } from '@public-ui/schema';
import { validateHeadingVariant, validateLabelWithExpertSlot, watchString } from '@public-ui/schema';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';

import { watchHeadingLevel } from './validation';

import type { JSX } from '@stencil/core';
/**
 * @slot - Inhalt der Überschrift.
 */
@Component({
	tag: 'kol-heading-wc',
	shadow: false,
})
export class KolHeadingWc implements HeadingAPI {
	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 1;

	/**
	 * Setzt den Text einer weiteren Überschrift, einen Level kleiner, unter der Ersten.
	 */
	@Prop() public _secondaryHeadline?: string;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: HeadingVariantPropType;

	@State() public state: HeadingStates = {
		_label: '', // ⚠ required
		_level: 1,
	};

	@Watch('_label')
	public validateLabel(value?: LabelWithExpertSlotPropType): void {
		validateLabelWithExpertSlot(this, value);
	}

	@Watch('_level')
	public validateLevel(value?: HeadingLevel): void {
		watchHeadingLevel(this, value);
	}

	@Watch('_secondaryHeadline')
	public validateSecondaryHeadline(value?: string): void {
		watchString(this, '_secondaryHeadline', value);
	}

	@Watch('_variant')
	public validateVariant(value?: HeadingVariantPropType): void {
		validateHeadingVariant(this, value);
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
		this.validateLevel(this._level);
		this.validateSecondaryHeadline(this._secondaryHeadline);
		this.validateVariant(this._variant);
	}

	private readonly renderHeadline = (headline: LabelWithExpertSlotPropType, level?: number): JSX.Element => {
		const validHeadline = typeof level === 'number' && level > 0 && level <= 6;
		const HeadlineTag = validHeadline ? `h${level}` : 'strong';
		const variant = this._variant || HeadlineTag;

		return (
			<HeadlineTag
				class={{
					headline: true,
					[`headline-${variant}`]: true,
				}}
			>
				{headline}
				<slot name="expert" />
			</HeadlineTag>
		);
	};

	private readonly renderSecondaryHeadline = (headline: string, level?: number): JSX.Element => {
		switch (level) {
			case 1: // if the headline is only strong
				return <span class="secondary-headline">{headline}</span>;
			case 2: // if the headline is h1
				return <h2 class="secondary-headline">{headline}</h2>;
			case 3: // if the headline is h2
				return <h3 class="secondary-headline">{headline}</h3>;
			case 4: // if the headline is h3
				return <h4 class="secondary-headline">{headline}</h4>;
			case 5: // if the headline is h4
				return <h5 class="secondary-headline">{headline}</h5>;
			case 6: // if the headline is h5
				return <h6 class="secondary-headline">{headline}</h6>;
			default: // if the headline is h6
				return <strong class="secondary-headline">{headline}</strong>;
		}
	};

	public render(): JSX.Element {
		return (
			<Host>
				{typeof this.state._secondaryHeadline === 'string' && this.state._secondaryHeadline.length > 0 ? (
					<hgroup>
						{this.renderHeadline(this.state._label, this.state._level)}
						{this.state._secondaryHeadline && this.renderSecondaryHeadline(this.state._secondaryHeadline, this.state._level + 1)}
					</hgroup>
				) : (
					this.renderHeadline(this.state._label, this.state._level)
				)}
			</Host>
		);
	}
}
