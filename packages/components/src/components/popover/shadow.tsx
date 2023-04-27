import { Component, h, Host, JSX, Prop } from '@stencil/core';

import { Alignment } from '../../types/props';
import { Props } from './types';

@Component({
	tag: 'kol-popover',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolPopover implements Props {
	private triggerElement?: HTMLElement;
	private host?: HTMLElement;

	/* catchElement functions */
	private catchHostAndTriggerElement = (element: HTMLElement | null): void => {
		if (element) this.host = element;
		if (element?.previousElementSibling) this.triggerElement = element.previousElementSibling as HTMLElement;
	};

	public render(): JSX.Element {
		return (
			<Host ref={this.catchHostAndTriggerElement}>
				<kol-popover-wc _alignment={this._alignment} _hideArrow={this._hideArrow} _host={this.host} _show={this._show} _triggerElement={this.triggerElement}>
					<slot />
				</kol-popover-wc>
			</Host>
		);
	}

	/**
	 * Setzt die Ausrichtung des Popovers in Relation zum Triggerelement.
	 */
	@Prop() public _alignment?: Alignment = 'top';

	/**
	 * Setzt die Ausrichtung des Popovers in Relation zum Triggerelement.
	 */
	@Prop() public _hideArrow?: boolean;

	/**
	 * Öffnet/schließt das Popover.
	 */
	@Prop({ mutable: true, reflect: true }) public _show?: boolean = false;
}
