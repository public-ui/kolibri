import { Generic } from '@a11y-ui/core';
import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';
import { Stringified } from '../../types/common';

import { KoliBriCustomIcon, KoliBriIconProp } from '../../types/icon';
import { validateIcon } from '../../types/props/icon';
import { validateLabelWithAriaLabel } from '../../types/props/label';
import { PropHideLabel, validateHideLabel } from '../../types/props';

type RequiredProps = {
	label: string;
};
type OptionalProps = {
	icon: Stringified<KoliBriIconProp>;
	/**
	 * @deprecated use _hide-label
	 */
	iconOnly: boolean;
} & PropHideLabel;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	icon: {
		top?: KoliBriCustomIcon;
		right?: KoliBriCustomIcon;
		bottom?: KoliBriCustomIcon;
		left?: KoliBriCustomIcon;
	};
	label: string;
};
type OptionalStates = {
	/**
	 * @deprecated use _hide-label
	 */
	iconOnly: boolean;
} & PropHideLabel;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

/**
 * @internal
 */
@Component({
	tag: 'kol-span-wc',
	shadow: false,
})
export class KolSpanWc implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
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
	@Prop({ reflect: true }) public _hideLabel?: boolean = false;

	/**
	 * Setzt die Iconklasse (z.B.: `_icon="codicon codicon-home`).
	 */
	@Prop() public _icon?: Stringified<KoliBriIconProp>;

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 * @deprecated use _hide-label
	 */
	@Prop({ reflect: true }) public _iconOnly?: boolean;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _label!: string;

	@State() public state: States = {
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
