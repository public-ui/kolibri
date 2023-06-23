import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';
import { Stringified } from '../../types/common';

import { KoliBriIconProp } from '../../types/icon';
import { validateIcon } from '../../types/props/icon';
import { validateHideLabel } from '../../types/props';
import { KolibriSpanAPI, KolibriSpanStates } from './types';
import { validateLabelWithAriaLabel } from '../../types/props/label';

/**
 * @internal
 */
@Component({
	tag: 'kol-span-wc',
	shadow: false,
})
export class KolSpanWc implements KolibriSpanAPI {
	public render(): JSX.Element {
		const hideExpertSlot = this.state._label.length > 0;
		return (
			<Host
				class={{
					'icon-only': !!this.state._hideLabel, // @deprecated in v2
					'hide-label': !!this.state._hideLabel,
				}}
			>
				{this.state._icon.top && <kol-icon class="icon top" style={this.state._icon.top.style} _ariaLabel="" _icon={this.state._icon.top.icon} />}
				<span>
					{this.state._icon.left && <kol-icon class="icon left" style={this.state._icon.left.style} _ariaLabel="" _icon={this.state._icon.left.icon} />}
					{this.state._hideLabel !== true && this.state._label.length > 0 ? <span>{this.state._label}</span> : ''}
					<span aria-hidden={hideExpertSlot ? 'true' : undefined} hidden={hideExpertSlot}>
						<slot name="expert" />
					</span>
					{this.state._icon.right && <kol-icon class="icon right" style={this.state._icon.right.style} _ariaLabel="" _icon={this.state._icon.right.icon} />}
				</span>
				{this.state._icon.bottom && <kol-icon class="icon bottom" style={this.state._icon.bottom.style} _ariaLabel="" _icon={this.state._icon.bottom.icon} />}
			</Host>
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
	@Prop() public _label!: string;

	@State() public state: KolibriSpanStates = {
		_hideLabel: false,
		_icon: {},
		_iconOnly: false,
		_label: '…', // ⚠ required
	};

	@Watch('_hideLabel')
	public validateHideLabel(value?: boolean): void {
		validateHideLabel(this, value);
	}

	@Watch('_icon')
	public validateIcon(value?: KoliBriIconProp): void {
		validateIcon(this, value);
	}

	/**
	 * @deprecated use _hide-label
	 */
	@Watch('_iconOnly')
	public validateIconOnly(value?: boolean): void {
		this.validateHideLabel(value);
	}

	@Watch('_label')
	public validateLabel(value?: string): void {
		validateLabelWithAriaLabel(this, value);
	}

	public componentWillLoad(): void {
		this.validateHideLabel(this._hideLabel || this._iconOnly);
		this.validateIcon(this._icon);
		this.validateLabel(this._label);
	}
}
