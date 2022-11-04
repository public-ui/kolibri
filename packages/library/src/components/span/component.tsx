import { Generic } from '@public-ui/core';
import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';
import { watchTooltipAlignment } from '../../types/button-link';

import { KoliBriCustomIcon, KoliBriIconProp, watchIcon } from '../../types/icon';
import { watchString } from '../../utils/prop.validators';
import { TooltipAlignment } from '../tooltip/component';

/**
 * API
 */
type RequiredProps = unknown;
type OptionalProps = {
	icon: KoliBriIconProp;
	label: string;
	tooltipAlign: TooltipAlignment;
	tooltipId: string;
};
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps & {
	icon: {
		top?: KoliBriCustomIcon;
		right?: KoliBriCustomIcon;
		bottom?: KoliBriCustomIcon;
		left?: KoliBriCustomIcon;
	};
	label: string;
};
type OptionalStates = {
	tooltipAlign: TooltipAlignment;
	tooltipId: string;
};
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

/**
 * @internal
 */
@Component({
	tag: 'kol-span',
	shadow: false,
})
export class KolSpan implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	public render(): JSX.Element {
		return (
			<Host>
				<span>
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
					<span class="flex items-center">
						{this.state._icon.left && (
							<kol-icon
								class={{
									'icon left': true,
									'mr-2': typeof this.state._tooltipId === 'string',
								}}
								style={this.state._icon.left.style}
								_ariaLabel=""
								_icon={this.state._icon.left.icon}
							/>
						)}
						{typeof this.state._tooltipId !== 'string' && (
							<span>
								{typeof this.state._label === 'string' && this.state._label}
								{/*
								Es ist keine gute Idee hier einen Slot einzufügen,
								da dadurch die komplette Unterstützung der Komponente
								 umgangen werden kann.
							*/}
								<slot />
							</span>
						)}
						{this.state._icon.right && (
							<kol-icon
								class={{
									'icon right': true,
									'ml-2': typeof this.state._tooltipId === 'string',
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
				</span>
				{typeof this.state._tooltipId === 'string' && (
					<kol-tooltip
						/**
						 * Dieses Aria-Hidden verhindert das doppelte Vorlesen des Labels,
						 * verhindert aber nicht das Aria-Labelledby vorgelesen wird.
						 */
						// aria-hidden="true"
						_align={this.state._tooltipAlign}
						_id={this.state._tooltipId}
						_label={this.state._label}
					></kol-tooltip>
				)}
			</Host>
		);
	}

	/**
	 * Gibt den Class-Identifier eines Icons eine eingebunden Icofont an. (z.B. https://icofont.com/)
	 */
	@Prop() public _icon?: KoliBriIconProp;

	/**
	 * Gibt den Label für die Beschriftung der Schaltfläche an.
	 */
	@Prop({ reflect: true }) public _label?: string = '';

	/**
	 * Gibt an, ob der Tooltip oben, rechts, unten oder links angezeigt werden soll.
	 */
	@Prop({ reflect: true }) public _tooltipAlign?: TooltipAlignment = 'top';

	/**
	 * Gibt an, ob der Tooltip oben, rechts, unten oder links angezeigt werden soll.
	 */
	@Prop({ reflect: true }) public _tooltipId?: string = '';

	/**
	 * Die State-Parameter repräsentieren den inneren State
	 * einer Komponente.
	 *
	 * @see: https://stenciljs.com/docs/state
	 */
	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_icon: {},
		_label: '',
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_icon')
	public validateIcon(value?: KoliBriIconProp): void {
		watchIcon(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_label')
	public validateLabel(value?: string): void {
		watchString(this, '_label', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_tooltipAlign')
	public validateTooltipAlign(value?: TooltipAlignment): void {
		watchTooltipAlignment(this, '_tooltipAlign', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_tooltipId')
	public validateTooltipId(value?: string): void {
		watchString(this, '_tooltipId', value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateIcon(this._icon);
		this.validateLabel(this._label);
		this.validateTooltipAlign(this._tooltipAlign);
		this.validateTooltipId(this._tooltipId);
	}
}
