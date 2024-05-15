/* eslint-disable jsx-a11y/label-has-associated-control */
import { Component, h, Host, JSX, Prop } from '@stencil/core';

import { ButtonOrLinkOrTextWithChildrenProps, ButtonWithChildrenProps, LinkWithChildrenProps, TextWithChildrenProps } from '../../types/button-link-text';
import { Props } from './types';
import { KolButtonWcTag, KolLinkWcTag, KolSpanWcTag } from '../../core/component-names';

/**
 * Internal component that renders an action or text component like a button or a link.
 * @internal
 */
@Component({
	tag: 'kol-button-link-text-switch-wc',
	shadow: false,
})
export class KolButtonLinkTextSwitchWc implements Props {
	public render(): JSX.Element {
		return <Host class="kol-button-link-text-switch-wc">{this.renderContent()}</Host>;
	}

	private renderContent() {
		if ((this._link as ButtonWithChildrenProps)._on) {
			const button = this._link as ButtonWithChildrenProps;
			return this.button(button);
		} else if ((this._link as LinkWithChildrenProps)._href) {
			const link = this._link as LinkWithChildrenProps;
			return this.link(link);
		} else {
			const text = this._link as TextWithChildrenProps;
			return this.text(text);
		}
	}

	private button = (button: ButtonWithChildrenProps): JSX.Element => <KolButtonWcTag {...button}></KolButtonWcTag>;

	private link = (link: LinkWithChildrenProps): JSX.Element => <KolLinkWcTag {...link}></KolLinkWcTag>;

	private text = (text: TextWithChildrenProps): JSX.Element => <KolSpanWcTag {...text}></KolSpanWcTag>;

	/**
	 * Die Link-Daten welche diese Komponente verwendet, um die entsprechende Komponente zu rendern.
	 */
	@Prop() public _link!: ButtonOrLinkOrTextWithChildrenProps;
}
