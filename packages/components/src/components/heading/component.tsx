import type { HeadingAPI, HeadingLevel, HeadingStates, HeadingVariantPropType, LabelWithExpertSlotPropType } from '../../schema';
import { validateHeadingVariant, validateLabelWithExpertSlot, watchString } from '../../schema';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';

import { watchHeadingLevel } from './validation';

import type { JSX } from '@stencil/core';
import { KolHeadingFc } from '../@shared';

/**
 * @internal
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

	public render(): JSX.Element {
		return (
			<Host class="kol-heading-wc">
				<KolHeadingFc _label={this.state._label} _level={this.state._level} _secondaryHeadline={this.state._secondaryHeadline} _variant={this.state._variant}>
					<slot name="expert" />
				</KolHeadingFc>
			</Host>
		);
	}
}
