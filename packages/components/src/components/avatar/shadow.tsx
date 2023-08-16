import { Component, h, Host, JSX, Prop } from '@stencil/core';

import { Props } from './types';

@Component({
	tag: 'kol-avatar',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolAvatar implements Props {
	public render(): JSX.Element {
		return (
			<Host>
				<kol-avatar-wc _src={this._src} _label={this._label}></kol-avatar-wc>
			</Host>
		);
	}

	/**
	 * Defines the image source to render
	 */
	@Prop() public _src?: string;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _label!: string;
}
