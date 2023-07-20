import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { ButtonProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { KoliBriIconProp } from '../../types/icon';
import { handleColorChange, PropColor, validateColor } from '../../types/props/color';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { a11yHint, featureHint } from '../../utils/a11y.tipps';
import { nonce } from '../../utils/dev.utils';
import { objectObjectHandler, parseJson, setState } from '../../utils/prop.validators';
import { KoliBriBadgeProps, KoliBriBadgeStates } from './types';

featureHint(`[KolBadge] Optimierung des _color-Properties (rgba, rgb, hex usw.).`);

@Component({
	tag: 'kol-badge',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolBadge implements KoliBriBadgeProps {
	private bgColorStr = '#000';
	private colorStr = '#fff';
	private readonly id = nonce();

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
					<kol-span-wc id={this.id} _icon={this._icon} _hideLabel={this._hideLabel || this._iconOnly} _label={this.state._label}></kol-span-wc>
					{typeof this.state._smartButton === 'object' && this.state._smartButton !== null && (
						<kol-button-wc
							_ariaControls={this.id}
							_customClass={this.state._smartButton._customClass}
							_disabled={this.state._smartButton._disabled}
							_hideLabel={true}
							_icon={this.state._smartButton._icon}
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
	@Prop() public _label!: LabelPropType;

	/**
	 * Ermöglicht einen Schalter ins das Eingabefeld mit einer beliebigen Aktion zu einzufügen (nur _hide-label).
	 */
	@Prop() public _smartButton?: Stringified<ButtonProps>;

	@State() public state: KoliBriBadgeStates = {
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
	public validateLabel(value?: LabelPropType): void {
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
