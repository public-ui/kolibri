import type { JSX } from '@stencil/core';
import { Component, h, Prop, State, Watch } from '@stencil/core';
import { handleColorChange, validateColor, validateImageSource, validateLabel } from '../../schema';

import { translate } from '../../i18n';
import { formatLabelAsInitials } from './controller';

import type { AvatarAPI, AvatarStates, ImageSourcePropType, LabelPropType, PropColor, Stringified } from '../../schema';

/**
 * @internal
 */
@Component({
	tag: 'kol-avatar-wc',
	shadow: false,
})
export class KolAvatarWc implements AvatarAPI {
	private bgColorStr = '#d3d3d3';
	private colorStr = '#000';

	public render(): JSX.Element {
		return (
			<div
				aria-label={translate('kol-avatar-alt', { placeholders: { name: this.state._label } })}
				class="kol-avatar"
				role="img"
				style={{
					backgroundColor: this.bgColorStr,
					color: this.colorStr,
				}}
			>
				{this.state._src ? (
					<img alt="" aria-hidden="true" class="kol-avatar__image" src={this.state._src} />
				) : (
					<span aria-hidden="true" class="kol-avatar__initials">
						{formatLabelAsInitials(this.state._label.trim())}
					</span>
				)}
			</div>
		);
	}

	private handleColorChange = (value: unknown) => {
		const colorPair = handleColorChange(value);
		this.bgColorStr = colorPair.backgroundColor;
		this.colorStr = colorPair.foregroundColor as string;
	};

	/**
	 * Defines the backgroundColor and foregroundColor.
	 */
	@Prop() public _color?: Stringified<PropColor> = '#d3d3d3';

	/**
	 * Sets the image `src` attribute to the given string.
	 */
	@Prop() public _src?: ImageSourcePropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	@State() public state: AvatarStates = {
		_src: '',
		_label: '', // ⚠ required
		_color: {
			backgroundColor: '#d3d3d3',
			foregroundColor: '#000',
		},
	};

	@Watch('_color')
	public validateColor(value?: Stringified<PropColor>) {
		validateColor(this, value, {
			defaultValue: '#d3d3d3',
			hooks: {
				beforePatch: this.handleColorChange,
			},
		});
	}

	@Watch('_src')
	public validateSrc(value?: ImageSourcePropType): void {
		validateImageSource(this, value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			required: true,
		});
	}

	public componentWillLoad(): void {
		this.validateColor(this._color);
		this.validateSrc(this._src);
		this.validateLabel(this._label);
	}
}
