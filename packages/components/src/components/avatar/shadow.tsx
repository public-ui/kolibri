import type { JSX } from '@stencil/core';
import { Component, h, Prop } from '@stencil/core';

import type { AvatarProps } from '../../schema';
import { KolAvatarWcTag } from '../../core/component-names';

@Component({
	tag: 'kol-avatar',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolAvatar implements AvatarProps {
	public render(): JSX.Element {
		return <KolAvatarWcTag _src={this._src} _label={this._label}></KolAvatarWcTag>;
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
