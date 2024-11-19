import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import type { JSX } from '@stencil/core';
import type { HeadingAPI, HeadingLevel, HeadingStates, HeadingVariantPropType, LabelWithExpertSlotPropType } from '../../schema';
import { validateHeadingVariant, validateLabelWithExpertSlot, watchString } from '../../schema';
import { KolHeadingFc } from '../../functional-components';
import { watchHeadingLevel } from './validation';

/**
 *
 * @slot - Inhalt der Überschrift.
 */
@Component({
	tag: 'kol-heading',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolHeading implements HeadingAPI {
	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 1;

	/**
	 * Defines the text of the secondary headline.
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
		const { _secondaryHeadline, _label, _level, _variant } = this.state;

		return (
			<Host class="kol-heading">
				<KolHeadingFc secondaryHeadline={_secondaryHeadline} level={_level} variant={_variant}>
					{_label}
					<slot name="expert" slot="expert" />
				</KolHeadingFc>
			</Host>
		);
	}
}
