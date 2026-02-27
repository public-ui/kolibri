import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { ImageApi } from '../../internal/functional-components/image/api';
import { ImageFC } from '../../internal/functional-components/image/component';
import { ImageController } from '../../internal/functional-components/image/controller';
import type { LoadingType } from '../../internal/props';

@Component({
	tag: 'kol-image',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolImage implements WebComponentInterface<ImageApi> {
	private readonly ctrl = new ImageController();

	/**
	 * Sets the alternative text of the image.
	 */
	@Prop()
	public _alt!: string;

	@Watch('_alt')
	public watchAlt(value?: string): void {
		this.ctrl.watchAlt(value);
	}

	/**
	 * Defines the loading mode for the image.
	 */
	@Prop()
	public _loading?: LoadingType;

	@Watch('_loading')
	public watchLoading(value?: LoadingType): void {
		this.ctrl.watchLoading(value);
	}

	/**
	 * Defines the image sizes for different screen resolutions, supporting _srcset.
	 */
	@Prop()
	public _sizes?: string;

	@Watch('_sizes')
	public watchSizes(value?: string): void {
		this.ctrl.watchSizes(value);
	}

	/**
	 * Sets the image `src` attribute to the given string.
	 */
	@Prop()
	public _src!: string;

	@Watch('_src')
	public watchSrc(value?: string): void {
		this.ctrl.watchSrc(value);
	}

	/**
	 * Sets a list of source URLs with widths of the images.
	 */
	@Prop()
	public _srcset?: string;

	@Watch('_srcset')
	public watchSrcset(value?: string): void {
		this.ctrl.watchSrcset(value);
	}

	public componentWillLoad(): void {
		this.ctrl.componentWillLoad({
			alt: this._alt,
			loading: this._loading,
			sizes: this._sizes,
			src: this._src,
			srcset: this._srcset,
		});
	}

	public render(): JSX.Element {
		const { alt, loading, sizes, src, srcset } = this.ctrl.getProps();
		return (
			<Host>
				<ImageFC alt={alt} loading={loading} sizes={sizes} src={src} srcset={srcset} />
			</Host>
		);
	}
}
