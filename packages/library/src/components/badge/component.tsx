import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { Nationalfarben } from '../../enums/color';
import { Alignment, KoliBriIconProp } from '../../types/icon';
import { devHint, featureHint } from '../../utils/a11y.tipps';
import { objectObjectHandler, parseJson, setState, watchValidator } from '../../utils/prop.validators';
import { createContrastColorPair, KoliBriContrastColor } from './contrast';
import { Stringified } from '../../types/common';
import { ButtonProps } from '../../types/button-link';

featureHint(`[KolBadge] Optimierung des _color-Properties (rgba, rgb, hex usw.).`);

const HACK_REG_EX = /^([a-f0-9]{3}|[a-f0-9]{6})$/;

export type KoliBriColor = {
	backgroundColor: string;
	color: string;
};

/**
 * API
 */
type RequiredProps = {
	label: string;
};
type OptionalProps = {
	color: Stringified<KoliBriColor>;
	icon: Stringified<KoliBriIconProp>;
	iconOnly: boolean;
	smarButton: Stringified<ButtonProps>;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	color: Stringified<KoliBriColor>;
};
type OptionalStates = {
	smartButton: ButtonProps;
};
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-badge',
	styleUrls: {
		default: './style.sass',
	},
	shadow: true,
})
export class KolBadge implements Props {
	private bgColorStr = '#000';
	private colorStr = '#fff';

	public render(): JSX.Element {
		return (
			<Host>
				<span
					class={{
						'smart-button': typeof this.state._smartButton === 'object' && this.state._smartButton !== null,
					}}
					style={{
						backgroundColor: this.bgColorStr,
						color: this.colorStr,
					}}
				>
					<kol-span-wc _icon={this._icon} _iconOnly={this._iconOnly} _label={this._label}></kol-span-wc>
					{typeof this.state._smartButton === 'object' && this.state._smartButton !== null && (
						<kol-button-wc
							_ariaLabel={this.state._smartButton._ariaLabel}
							_customClass={this.state._smartButton._customClass}
							_disabled={this.state._smartButton._disabled}
							_icon={this.state._smartButton._icon}
							_iconOnly={true}
							_id={this.state._smartButton._id}
							_label={this.state._smartButton._label}
							_on={this.state._smartButton._on}
							_tooltipAlign={this.state._smartButton._tooltipAlign}
							_variant={this.state._smartButton._variant}
						></kol-button-wc>
					)}
				</span>
			</Host>
		);
	}

	/**
	 * Gibt die Farbe des Hintergrundes bzw. der Schrift an.
	 */
	@Prop() public _color?: string | KoliBriColor = Nationalfarben.Schwarz;

	/**
	 * Gibt einen Identifier eines Icons aus den Icofont's an. (https://icofont.com/)
	 */
	@Prop() public _icon?: Stringified<KoliBriIconProp>;

	/**
	 * Gibt an, ob das Icon entweder links oder rechts dargestellt werden soll.
	 * @deprecated
	 */
	@Prop() public _iconAlign?: Alignment = 'left';

	/**
	 * Gibt an, ob nur das Icon angezeigt wird.
	 */
	@Prop({ reflect: true }) public _iconOnly?: boolean = false;

	/**
	 * Gibt den Label-Text des Badges an.
	 */
	@Prop() public _label!: string;

	/**
	 * Ermöglicht einen Schalter ins das Eingabefeld mit einer beliebigen Aktion zu einzufügen (nur Icon-Only).
	 */
	@Prop() public _smartButton?: Stringified<ButtonProps>;

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_color: Nationalfarben.Schwarz,
	};

	private handleColorChange = (value: unknown) => {
		let color = value as string | KoliBriColor;
		let colorPair: KoliBriContrastColor;
		if (typeof color === 'string') {
			if (HACK_REG_EX.test(color)) {
				// Catch Breaking Change - remove next Major
				devHint(
					`[KolBadge] Bitte verwenden Sie zukünftig nur noch das Standard-Farbformat für CSS (https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).`
				);
				color = `#${color}`;
			}
			colorPair = createContrastColorPair(color);
		} else {
			colorPair = createContrastColorPair({
				baseColor: color.backgroundColor,
				contrastColor: color.color,
			});
		}
		this.bgColorStr = colorPair.baseColor;
		this.colorStr = colorPair.contrastColor;
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_color')
	public validateColor(value?: string | KoliBriColor): void {
		watchValidator(
			this,
			'_color',
			(value) => typeof value === 'string' || (typeof value === 'object' && value !== null),
			new Set(['string', 'KoliBriColor']),
			value,
			{
				defaultValue: Nationalfarben.Schwarz,
				hooks: {
					beforePatch: this.handleColorChange,
				},
			}
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_smartButton')
	public validateSmartButton(value?: ButtonProps | string): void {
		objectObjectHandler(value, () => {
			try {
				value = parseJson<ButtonProps>(value as string);
				// eslint-disable-next-line no-empty
			} catch (e) {
				// value behält den ursprünglichen Wert
			}
			setState(this, '_smartButton', value);
		});
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateColor(this._color);
		this.validateSmartButton(this._smartButton);
	}
}
