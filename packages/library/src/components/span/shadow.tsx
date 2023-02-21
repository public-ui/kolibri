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
				{/*
					Es ist keine gute Idee hier einen Slot einzufügen, da dadurch ermöglicht wird,
					die Unterstützung hinsichtlich der Barrierefreiheit der Komponente zu umgehen.
				*/}
				<slot name="expert" slot="expert" />
			</kol-span-wc>
		);
	}

	/**
	 * Gibt den Class-Identifier eines Icons eine eingebunden Icofont an. (z.B. https://icofont.com/)
	 */
	@Prop() public _icon?: Stringified<KoliBriIconProp>;

	/**
	 * Gibt an, ob nur das Icon angezeigt wird.
	 */
	@Prop({ reflect: true }) public _iconOnly?: boolean = false;

	/**
	 * Gibt einen beschreibenden Text für das Text-Element an.
	 */
	@Prop() public _label!: string;
}
