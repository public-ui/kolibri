import { Component, h, JSX, Prop } from '@stencil/core';

import { Stringified } from '../../types/common';
import { KoliBriIconsProp } from '../../types/icons';
import { LabelWithExpertSlotPropType } from '../../types/props/label';
import { Props } from './types';
import { AccessKeyPropType } from '../../types/props/access-key';

@Component({
	tag: 'kol-span',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolSpan implements Props {
	public render(): JSX.Element {
		return (
			<kol-span-wc _icons={this._icons} _hideLabel={this._hideLabel} _label={this._label} _accessKey={this._accessKey}>
				<slot name="expert" slot="expert"></slot>
			</kol-span-wc>
		);
	}

	/**
	 * Defines the elements access key.
	 */
	@Prop() public _accessKey?: AccessKeyPropType;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the g classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: Stringified<KoliBriIconsProp>;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;
}
