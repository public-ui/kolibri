import { Generic } from '@a11y-ui/core';
import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';
import { Stringified } from '../../types/common';

import { KoliBriCustomIcon, KoliBriIconProp } from '../../types/icon';
import { watchBoolean } from '../../utils/prop.validators';
import { validateIcon } from '../../utils/validators/icon';
import { validateLabelWithAriaLabel } from '../../utils/validators/label';

/**
 * API
 */
type RequiredProps = {
	label: string;
};
type OptionalProps = {
	icon: Stringified<KoliBriIconProp>;
	iconOnly: boolean;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	icon: {
		top?: KoliBriCustomIcon;
		right?: KoliBriCustomIcon;
		bottom?: KoliBriCustomIcon;
		left?: KoliBriCustomIcon;
	};
	iconOnly: boolean;
	label: string;
};
type OptionalStates = unknown;
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
					'icon-only': this.state._iconOnly,
				}}
			>
				{this.state._icon.top && (
					<kol-icon
						class={{
							'icon top': true,
						}}
						style={this.state._icon.top.style}
						_ariaLabel=""
						_icon={this.state._icon.top.icon}
					/>
				)}
				<span>
					{this.state._icon.left && (
						<kol-icon
							class={{
								'icon left': true,
							}}
							style={this.state._icon.left.style}
							_ariaLabel=""
							_icon={this.state._icon.left.icon}
						/>
					)}
					{this.state._iconOnly !== true && this.state._label.length > 0 ? <span>{this.state._label}</span> : ''}
					<span aria-hidden={hideExpertSlot ? 'true' : undefined} hidden={hideExpertSlot}>
						<slot name="expert" />
					</span>
					{this.state._icon.right && (
						<kol-icon
							class={{
								'icon right': true,
							}}
							style={this.state._icon.right.style}
							_ariaLabel=""
							_icon={this.state._icon.right.icon}
						/>
					)}
				</span>
				{this.state._icon.bottom && (
					<kol-icon
						class={{
							'icon bottom': true,
						}}
						style={this.state._icon.bottom.style}
						_ariaLabel=""
						_icon={this.state._icon.bottom.icon}
					/>
				)}
			</Host>
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

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_icon: {},
		_iconOnly: false,
		_label: '…', // ⚠ required
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_icon')
	public validateIcon(value?: KoliBriIconProp): void {
		validateIcon(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_iconOnly')
	public validateIconOnly(value?: boolean): void {
		watchBoolean(this, '_iconOnly', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_label')
	public validateLabel(value?: string): void {
		validateLabelWithAriaLabel(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateIcon(this._icon);
		this.validateIconOnly(this._iconOnly);
		this.validateLabel(this._label);
	}
}
