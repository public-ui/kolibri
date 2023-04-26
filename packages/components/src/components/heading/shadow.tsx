import { Component, h, JSX, Prop } from '@stencil/core';

import { HeadingLevel } from '../../types/heading-level';
import { Props } from './component';

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
	 * Gibt den Text der Überschrift an.
	 */
	@Prop() public _label!: string;

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat. Oder ob es keine Überschrift ist, sondern nur fett gedruckt.
	 */
	@Prop() public _level?: HeadingLevel;

	/**
	 * Gibt den Text der zusätzlichen Überschrift an.
	 */
	@Prop() public _secondaryHeadline?: string;
}
