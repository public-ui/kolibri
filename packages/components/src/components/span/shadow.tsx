import { Component, h, JSX, Prop } from '@stencil/core';

import { Stringified } from '../../types/common';
import { KoliBriIconProp } from '../../types/icon';
import { LabelWithExpertSlotPropType } from '../../types/props/label';
import { Props } from './types';

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
			<kol-span-wc _icon={this._icon} _hideLabel={this._hideLabel} _label={this._label}>
				<slot name="expert" slot="expert"></slot>
			</kol-span-wc>
		);
	}

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the icon classnames (e.g. `_icon="fa-solid fa-user"`).
	 */
	@Prop() public _icon?: Stringified<KoliBriIconProp>;

	/**
	 * Deprecated: Hides the label and shows the description in a Tooltip instead.
	 * @deprecated use _hide-label
	 */
	@Prop() public _iconOnly?: boolean;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;
}
