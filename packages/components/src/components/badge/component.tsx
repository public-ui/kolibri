import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { ButtonProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { KoliBriIconProp } from '../../types/icon';
import { a11yHint, devHint, featureHint } from '../../utils/a11y.tipps';
import { objectObjectHandler, parseJson, setState, watchValidator } from '../../utils/prop.validators';
import { validateLabel } from '../../utils/validators/label';
import { ColorContrast, createContrastColorPair } from './contrast';

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
	smartButton: Stringified<ButtonProps>;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	color: Stringified<KoliBriColor>;
	label: string;
};
type OptionalStates = {
	smartButton: ButtonProps;
};
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-badge',
	styleUrls: {
		default: './style.css',
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
					<kol-span-wc _icon={this._icon} _iconOnly={this._iconOnly} _label={this.state._label}></kol-span-wc>
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
	@Prop() public _color?: string | KoliBriColor = '#000';

	/**
	 * Gibt einen Identifier eines Icons aus den Icofont's an. (https://icofont.com/)
	 */
	@Prop() public _icon?: Stringified<KoliBriIconProp>;

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
		_color: '#000',
		_label: '…', // ⚠ required
	};

	private handleColorChange = (value: unknown) => {
		let color = value as string | KoliBriColor;
		let colorContrast: ColorContrast<string>;
		if (typeof color === 'string') {
			if (HACK_REG_EX.test(color)) {
				// Catch Breaking Change - remove next Major
				devHint(
					`[KolBadge] Bitte verwenden Sie zukünftig nur noch das Standard-Farbformat für CSS (https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).`
				);
				color = `#${color}`;
			}
			colorContrast = createContrastColorPair(color);
		} else {
			colorContrast = createContrastColorPair({
				background: color.backgroundColor,
				foreground: color.color,
			});
		}
		if (colorContrast.contrast < 7) {
			a11yHint(
				`[KolBadge] The contrast of ${colorContrast.contrast} (≥7, AAA) is too low, between the color pair ${colorContrast.background} and ${colorContrast.foreground}.`
			);
		}
		this.bgColorStr = colorContrast.background;
		this.colorStr = colorContrast.foreground;
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_color')
	public validateColor(value?: string | KoliBriColor): void {
		watchValidator(
			this,
			'_color',
			(value) =>
				typeof value === 'string' ||
				(typeof value === 'object' && value !== null && typeof value.backgroundColor === 'string' && typeof value.color === 'string'),
			new Set(['string', 'KoliBriColor']),
			value,
			{
				defaultValue: '#000',
				hooks: {
					beforePatch: this.handleColorChange,
				},
			}
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_label')
	public validateLabel(value?: string): void {
		validateLabel(this, value, {
			hooks: {
				afterPatch: (value) => {
					if (typeof value === 'string' && value.length > 32) {
						a11yHint(`[KolBadge] The label is too long for a badge (${value.length} > 32).`);
					}
				},
			},
		});
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
		this.validateLabel(this._label);
		this.validateSmartButton(this._smartButton);
	}
}
