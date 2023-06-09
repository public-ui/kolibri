import { Component, h, JSX, Prop } from '@stencil/core';
import { Stringified } from '../../types/common';

import { KoliBriIconProp } from '../../types/icon';
import { Props } from './component';

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
			<kol-span-wc _icon={this._icon} _iconOnly={this._iconOnly} _label={this._label}>
				<slot name="expert" slot="expert"></slot>
			</kol-span-wc>
		);
	}

	/**
	 * Setzt die Iconklasse (z.B.: `_icon="codicon codicon-home`).
	 */
	@Prop() public _icon?: Stringified<KoliBriIconProp>;

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 */
	@Prop({ reflect: true }) public _iconOnly?: boolean = false;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _label!: string;
}
