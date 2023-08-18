import { Component, h, JSX, Prop } from '@stencil/core';

import { HeadingLevel } from '../../types/heading-level';
import { LabelWithExpertSlotPropType } from '../../types/props/label';
import { Props } from './types';

/**
 * @slot - Inhalt der Überschrift.
 */
@Component({
	tag: 'kol-heading',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolHeading implements Props {
	public render(): JSX.Element {
		return (
			<kol-heading-wc _label={this._label} _level={this._level} _secondaryHeadline={this._secondaryHeadline}>
				<slot />
			</kol-heading-wc>
		);
	}
	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat. Oder bei 0, ob es keine Überschrift ist und als fett gedruckter Text angezeigt werden soll.
	 */
	@Prop() public _level?: HeadingLevel;

	/**
	 * Gibt den Text der zusätzlichen Überschrift an.
	 */
	@Prop() public _secondaryHeadline?: string;
}
