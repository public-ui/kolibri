import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Stringified } from '../../types/common';
import { KoliBriIconProp } from '../../types/icon';
import { handleColorChange, PropColor, validateColor } from '../../types/props/color';
import { LabelPropType } from '../../types/props/label';
import { featureHint } from '../../utils/a11y.tipps';
import { nonce } from '../../utils/dev.utils';
import { objectObjectHandler, parseJson, setState } from '../../utils/prop.validators';
import { ButtonProps } from '../button/types';
import { API, States } from './types';

featureHint(`[KolBadge] Optimierung des _color-Properties (rgba, rgb, hex usw.).`);

@Component({
	tag: 'kol-badge',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolBadge implements API {
	private bgColorStr = '#000';
	private colorStr = '#fff';
	private readonly id = nonce();

	private renderSmartButton(props: ButtonProps): JSX.Element {
		return (
			<kol-button-wc
				_ariaControls={this.id}
				_customClass={props._customClass}
				_disabled={props._disabled}
				_hideLabel={true}
				_icon={props._icon}
				_id={props._id}
				_label={props._label}
				_on={props._on}
				_tooltipAlign={props._tooltipAlign}
				_variant={props._variant}
			></kol-button-wc>
		);
	}

	public render(): JSX.Element {
		const hasSmartButton = typeof this.state._smartButton === 'object' && this.state._smartButton !== null;
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
					<kol-span-wc
						id={hasSmartButton ? this.id : undefined}
						_hideLabel={this._hideLabel || this._iconOnly}
						_icon={this._icon}
						_label={this._label}
					></kol-span-wc>
					{hasSmartButton && this.renderSmartButton(this.state._smartButton as ButtonProps)}
				</span>
			</Host>
		);
	}

	/**
	 * Setzt die Hintergrundfarbe.
	 */
	@Prop() public _color?: Stringified<PropColor> = '#000';

	/**
	 * ⚠️ We does not support the `_hide-label` property for the `kol-badge` element,
	 *   since it would not be accessible without visible labeling. A separate tooltip
	 *   is not planed, because a badge is not an interactive element.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 * @deprecated Will be removed in the next major version.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Setzt die Iconklasse (z.B.: `_icon="codicon codicon-home`).
	 */
	@Prop() public _icon?: Stringified<KoliBriIconProp>;

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 *
	 * @deprecated use _hide-label
	 */
	@Prop() public _iconOnly?: boolean;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Ermöglicht einen Schalter in das Eingabefeld mit einer beliebigen Aktion zu einzufügen (nur _hide-label).
	 */
	@Prop() public _smartButton?: Stringified<ButtonProps>;

	@State() public state: States = {
		_color: {
			backgroundColor: '#000',
			foregroundColor: '#fff',
		},
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
		this.validateSmartButton(this._smartButton);
	}
}
