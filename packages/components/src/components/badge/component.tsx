import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { ButtonProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { KoliBriIconProp } from '../../types/icon';
import { ColorPair, handleColorChange, PropColor, validateColor } from '../../types/props/color';
import { a11yHint, featureHint } from '../../utils/a11y.tipps';
import { objectObjectHandler, parseJson, setState } from '../../utils/prop.validators';
import { validateLabel } from '../../types/props';

featureHint(`[KolBadge] Optimierung des _color-Properties (rgba, rgb, hex usw.).`);

type RequiredProps = {
	label: string;
};
type OptionalProps = {
	color: Stringified<PropColor>;
	icon: Stringified<KoliBriIconProp>;
	iconOnly: boolean;
	smartButton: Stringified<ButtonProps>;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	color: ColorPair;
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
	 * Setzt die Hintergrundfarbe.
	 */
	@Prop() public _color?: Stringified<PropColor> = '#000';

	/**
	 * Iconklasse (z.B.: "codicon codicon-home")
	 */
	@Prop() public _icon?: Stringified<KoliBriIconProp>;

	/**
	 * Gibt an, ob nur das Icon angezeigt wird.
	 */
	@Prop({ reflect: true }) public _iconOnly?: boolean = false;

	/**
	 * Setzt den sichtbaren Text des Elements.
	 */
	@Prop() public _label!: string;

	/**
	 * Ermöglicht einen Schalter ins das Eingabefeld mit einer beliebigen Aktion zu einzufügen (nur Icon-Only).
	 */
	@Prop() public _smartButton?: Stringified<ButtonProps>;

	@State() public state: States = {
		_color: {
			backgroundColor: '#000',
			foregroundColor: '#fff',
		},
		_label: '…', // ⚠ required
	};

	private handleColorChange = (value: unknown) => {
		const colorPair = handleColorChange(value);
		this.bgColorStr = colorPair.backgroundColor;
		this.colorStr = colorPair.foregroundColor as string;
	};

	@Watch('_color')
	public validateColor(value?: Stringified<PropColor>): void {
		validateColor(this, value, {
			defaultValue: '#000',
			hooks: {
				beforePatch: this.handleColorChange,
			},
		});
	}

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

	public componentWillLoad(): void {
		this.validateColor(this._color);
		this.validateLabel(this._label);
		this.validateSmartButton(this._smartButton);
	}
}
