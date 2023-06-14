/* eslint-disable jsx-a11y/label-has-associated-control */
import { Component, h, Host, JSX, Prop } from '@stencil/core';
import { Props } from './types';
import { ButtonOrLinkOrTextWithChildrenProps, ButtonWithChildrenProps, LinkWithChildrenProps } from '../../types/button-link-text';
import { Stringified } from '../../types/common';
import { KoliBriButtonCallbacks, KoliBriIconProp } from '../../components';

/**
 * @internal
 */
@Component({
	tag: 'kol-button-link-text-switch',
	shadow: false,
})
export class KolButtonLinkSwitch implements Props {
	public render(): JSX.Element {
		return <Host>{this.renderContent()}</Host>;
	}

	private renderContent() {
		const prop = this._prop;
		const compact = this._compact;

		if ((prop as ButtonWithChildrenProps)._on) {
			return this.button(compact, (prop as ButtonWithChildrenProps)._disabled === true, prop._icon, prop._label, (prop as ButtonWithChildrenProps)._on);
		} else if ((prop as LinkWithChildrenProps)._href) {
			return this.link(this._selected ?? false, compact, (prop as LinkWithChildrenProps)._href, prop._icon, prop._label);
		} else {
			return this.text(compact, prop._icon, prop._label);
		}
	}

	private button(
		compact: boolean,
		disabled: boolean,
		icon: Stringified<KoliBriIconProp> | undefined,
		label: string,
		on: KoliBriButtonCallbacks<unknown>
	): JSX.Element {
		return (
			<kol-button-wc
				// _ariaCurrent will not be set here, since it will be set on a child of this item.
				_disabled={disabled}
				_icon={icon || '-'}
				_iconOnly={compact}
				_label={label}
				_on={on}
			></kol-button-wc>
		);
	}

	private link(selected: boolean, compact: boolean, href: string, icon: Stringified<KoliBriIconProp> | undefined, label: string): JSX.Element {
		return (
			<kol-link-wc
				// _ariaCurrent will not be set here, since it will be set on a child of this item.
				_ariaExpanded={selected}
				_href={href}
				_icon={icon || '-'}
				_iconOnly={compact}
				_label={label}
			></kol-link-wc>
		);
	}

	private text(compact: boolean, icon: Stringified<KoliBriIconProp> | undefined, label: string): JSX.Element {
		return <kol-span-wc _icon={icon || '-'} _iconOnly={compact} _label={label}></kol-span-wc>;
	}

	/**
	 * Die Property-Daten welche das Switch verwendet, um die entsprechende Komponente zu rendern.
	 */
	@Prop() public _prop!: ButtonOrLinkOrTextWithChildrenProps;

	/**
	 * Kompakte Darstellung aktivieren.
	 */
	@Prop() public _compact: boolean = false;

	/**
	 * Ist der Link selectiert? (Nur wenn es ein Link ist.)
	 */
	@Prop() public _selected: boolean = false;
}
