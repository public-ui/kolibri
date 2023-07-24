import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { API, States } from './types';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { ImageSourcePropType, validateImageSource } from '../../types/props/image-source';
import { formatLabelAsInitials } from './controller';
import { translate } from '../../i18n';

@Component({
	tag: 'kol-avatar-wc',
	shadow: false,
})
export class KolAvatarWc implements API {
	public render(): JSX.Element {
		return (
			<Host>
				<div aria-description={this.state._label} class="container">
					{this.state._src ? (
						<kol-image _alt={translate('kol-avatar-alt', { placeholders: { name: this.state._label } })} _src={this.state._src} class="image"></kol-image>
					) : (
						<span aria-hidden="true" class="initials">
							{formatLabelAsInitials(this.state._label)}
						</span>
					)}
				</div>
			</Host>
		);
	}

	/**
	 * Defines the image source to render
	 */
	@Prop() public _src?: ImageSourcePropType;

	/**
	 * Defines the label, usually the name of the person, to render as alt text and to compute initials from
	 */
	@Prop() public _label!: LabelPropType;

	@State() public state: States = {
		_src: ``,
		_label: ``, // ⚠ required
	};

	@Watch('_src')
	public validateSrc(value?: ImageSourcePropType): void {
		validateImageSource(this, value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	public componentWillLoad(): void {
		this.validateSrc(this._src);
		this.validateLabel(this._label);
	}
}
