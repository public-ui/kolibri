import { Component, h, Host, JSX, Prop } from '@stencil/core';

import { Props } from './types';

@Component({
	tag: 'kol-avatar',
	styleUrls: {
		default: './style.scss',
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
	 * Sets the image `src` attribute to the given string.
	 */
	@Prop() public _src?: string;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: string;
}
