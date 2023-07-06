/* eslint-disable jsx-a11y/label-has-associated-control */
import { Component, h, Host, JSX, Prop } from '@stencil/core';

import { ButtonOrLinkOrTextWithChildrenProps, ButtonWithChildrenProps, LinkWithChildrenProps, TextWithChildrenProps } from '../../types/button-link-text';
import { AriaCurrent } from '../../types/props/aria-current';
import { Props } from './types';

/**
 * Internal component that renders an action or text component like a button or a link.
 * @internal
 */
@Component({
	tag: 'kol-button-link-text-switch',
	shadow: false,
})
export class KolButtonLinkTextSwitch implements Props {
	public render(): JSX.Element {
		return <Host>{this.renderContent()}</Host>;
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

	private button = (button: ButtonWithChildrenProps): JSX.Element => (
		<kol-button-wc
			_ariaCurrent={this._hasChildren === true ? this._ariaCurrentValue : undefined}
			_ariaSelected={this._selected === true}
			_disabled={button._disabled}
			_hideLabel={this._hideLabel === true}
			_icon={button._icon}
			_label={button._label}
			_on={button._on}
		></kol-button-wc>
	);

	private link = (link: LinkWithChildrenProps): JSX.Element => (
		<kol-link-wc
			_ariaCurrent={this._hasChildren === true ? this._ariaCurrentValue : undefined}
			_ariaSelected={this._selected === true}
			_hideLabel={this._hideLabel === true}
			_href={link._href}
			_icon={link._icon}
			_label={link._label}
		></kol-link-wc>
	);

	private text = (text: TextWithChildrenProps): JSX.Element => (
		<kol-span-wc _hideLabel={this._hideLabel === true} _icon={text._icon} _label={text._label}></kol-span-wc>
	);

	/**
	 * Gibt den Wert von aria-current an, der bei dem aktuellen Kontext innerhalb der Navigation verwendet werden soll.
	 */
	@Prop() public _ariaCurrentValue: AriaCurrent = false;

	/**
	 * Gibt an, ob diese Komponente Kinder hat.
	 */
	@Prop() public _hasChildren?: boolean = false;

	/**
	 * Die Link-Daten welche diese Komponente verwendet, um die entsprechende Komponente zu rendern.
	 */
	@Prop() public _link!: ButtonOrLinkOrTextWithChildrenProps;

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Ist der Link selektiert? (Nur wenn es ein Link ist.)
	 */
	@Prop() public _selected?: boolean = false;
}
