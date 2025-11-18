import type { JSX } from '@stencil/core';
import { Component, h, Prop } from '@stencil/core';

import { KolAvatarWcTag } from '../../core/component-names';
import type { AvatarProps, PropColor, Stringified } from '../../schema';

@Component({
	tag: 'kol-avatar',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolAvatar implements AvatarProps {
	public render(): JSX.Element {
		return <KolAvatarWcTag _color={this._color} _src={this._src} _label={this._label}></KolAvatarWcTag>;
	}

	/**
	 * Defines the backgroundColor and foregroundColor.
	 */
	@Prop() public _color?: Stringified<PropColor> = '#d3d3d3';

	/**
	 * Sets the image `src` attribute to the given string.
	 */
	@Prop() public _src?: string;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: string;
}
