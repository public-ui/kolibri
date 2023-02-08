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
			<kol-heading-wc _label={this._label} _level={this._level} _overline={this._overline}>
				<slot />
			</kol-heading-wc>
		);
	}

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat. Oder ob es keine Überschrift ist, sondern nur fett gedruckt.
	 */
	@Prop({ reflect: true }) public _level?: HeadingLevel;

	/**
	 * Gibt den Text der Überschrift an.
	 */
	@Prop({ reflect: true }) public _label!: string;

	/**
	 * Gibt den Text der zusätzlichen Beschriftung an.
	 */
	@Prop({ reflect: true }) public _overline?: string = '';
}
