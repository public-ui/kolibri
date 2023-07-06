import { Component, h, JSX, Prop } from '@stencil/core';

import { Stringified } from '../../types/common';
import { KoliBriIconProp } from '../../types/icon';
import { LabelWithExpertSlotPropType } from '../../types/props/label';
import { KolibriSpanProps } from './types';

@Component({
	tag: 'kol-span',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolSpan implements KolibriSpanProps {
	public render(): JSX.Element {
		return (
			<kol-span-wc _icon={this._icon} _hideLabel={this._hideLabel} _label={this._label}>
				<slot name="expert" slot="expert"></slot>
			</kol-span-wc>
		);
	}

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Setzt die Iconklasse (z.B.: `_icon="codicon codicon-home`).
	 */
	@Prop() public _icon?: Stringified<KoliBriIconProp>;

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 * @deprecated use _hide-label
	 */
	@Prop() public _iconOnly?: boolean;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;
}
