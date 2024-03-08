import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { ImageSourcePropType, validateImageSource } from '../../types/props/image-source';
import { watchString } from '../../utils/prop.validators';
import { Loading, validateLoading } from '../../utils/validators/loading';
import { API, States } from './types';

@Component({
	tag: 'kol-image',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolImage implements API {
	/**
	 * Setzt den alternativen Text.
	 */
	@Prop() public _alt!: string;

	/**
	 * Defines the loading mode for the image.
	 */
	@Prop() public _loading?: Loading = 'lazy';

	/**
	 * Defines the image sizes for different screen resolutions, supporting _srcset.
	 */
	@Prop() public _sizes?: string;

	/**
	 * Sets the image `src` attribute to the given string.
	 */
	@Prop() public _src!: ImageSourcePropType;

	/**
	 * Setzt eine Liste von Quell-URLs mit Breiten der Bilder.
	 */
	@Prop() public _srcset?: string;

	@State() public state: States = {
		_alt: '', // ⚠ required
		_loading: 'lazy',
		_src: '', // ⚠ required
	};

	@Watch('_alt')
	public validateAlt(value?: string): void {
		watchString(this, '_alt', value, {
			required: true,
		});
	}

	@Watch('_loading')
	public validateLoading(value?: Loading): void {
		validateLoading(this, value);
	}

	@Watch('_sizes')
	public validateSizes(value?: string): void {
		watchString(this, '_sizes', value);
	}

	@Watch('_src')
	public validateSrc(value?: ImageSourcePropType): void {
		validateImageSource(this, value, {
			required: true,
		});
	}

	@Watch('_srcset')
	public validateSrcset(value?: string): void {
		watchString(this, '_srcset', value);
	}

	public componentWillLoad(): void {
		this.validateAlt(this._alt);
		this.validateLoading(this._loading);
		this.validateSizes(this._sizes);
		this.validateSrc(this._src);
		this.validateSrcset(this._srcset);
	}

	public render(): JSX.Element {
		return (
			<Host class="kol-image">
				<img alt={this.state._alt} loading={this.state._loading} sizes={this.state._sizes} src={this.state._src} srcset={this.state._srcset}></img>
			</Host>
		);
	}
}
