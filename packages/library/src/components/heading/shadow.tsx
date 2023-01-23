import { Component, h, JSX, Prop } from '@stencil/core';

import { HeadingLevel } from '../../types/heading-level';
import { Props } from './component';

@Component({
	tag: 'kol-heading',
	styleUrls: {
		default: '../style.sass',
	},
	shadow: true,
})
export class KolHeading implements Props {
	public render(): JSX.Element {
		return (
			<kol-heading-wc _level={this._level}>
				<slot />
			</kol-heading-wc>
		);
	}

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat.
	 */
	@Prop({ reflect: true }) public _level?: HeadingLevel = 1; // reflect for simpler test selection
}
