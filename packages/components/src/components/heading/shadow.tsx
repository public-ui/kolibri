import type { HeadingLevel, HeadingProps, HeadingVariantPropType, LabelWithExpertSlotPropType } from '../../schema';
import type { JSX } from '@stencil/core';
import { Component, h, Prop } from '@stencil/core';
import { KolHeadingWcTag } from '../../core/component-names';

/**
 * @slot headline - Content of the headline.
 */
@Component({
	tag: 'kol-heading',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolHeading implements HeadingProps {
	public render(): JSX.Element {
		return (
			<KolHeadingWcTag _label={this._label} _level={this._level} _secondaryHeadline={this._secondaryHeadline} _variant={this._variant} class="kol-heading">
				<slot name="expert" slot="expert" />
			</KolHeadingWcTag>
		);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel;

	/**
	 * Defines the text of the secondary headline.
	 */
	@Prop() public _secondaryHeadline?: string;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: HeadingVariantPropType;
}
