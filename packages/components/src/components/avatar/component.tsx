import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';
import { ImageSourcePropType, validateImageSource } from '../../types/props/image-source';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { formatLabelAsInitials } from './controller';
import { API, States } from './types';

@Component({
	tag: 'kol-avatar-wc',
	shadow: false,
})
export class KolAvatarWc implements API {
	public render(): JSX.Element {
		return (
			<Host>
				<div aria-label={translate('kol-avatar-alt', { placeholders: { name: this.state._label } })} class="kol-avatar-wc container" role="img">
					{this.state._src ? (
						<img alt="" aria-hidden="true" class="image" src={this.state._src} />
					) : (
						<span aria-hidden="true" class="initials">
							{formatLabelAsInitials(this.state._label.trim())}
						</span>
					)}
				</div>
			</Host>
		);
	}

	/**
	 * Sets the image `src` attribute to the given string.
	 */
	@Prop() public _src?: ImageSourcePropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	@State() public state: States = {
		_src: '',
		_label: '…', // ⚠ required
	};

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
		this.validateSrc(this._src);
		this.validateLabel(this._label);
	}
}
