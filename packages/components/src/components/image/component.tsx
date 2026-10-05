import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { ImageApi } from '../../internal/functional-components/image/api';
import { imagePropsConfig } from '../../internal/functional-components/image/api';
import { ImageFC } from '../../internal/functional-components/image/component';
import { altProp, loadingProp, sizesProp, srcProp, srcsetProp, type LoadingType } from '../../internal/props';
import type { KoliBriImageEventCallbacks } from '../../schema/components/image';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

/**
 * The **Image** component renders an image with support for responsive loading via `srcset` and `sizes`, lazy loading, and accessible alternative text.
 */
@Component({
	tag: 'kol-image',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolImage extends BaseWebComponent<ImageApi> implements WebComponentInterface<ImageApi> {
	@Element() private readonly host?: HTMLKolImageElement;

	private readonly handleError = (event: Event): void => {
		this._on?.onError?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.error, event);
		}
	};

	private readonly handleLoad = (event: Event): void => {
		this._on?.onLoad?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.load, event);
		}
	};

	/**
	 * Sets the alternative text of the image.
	 */
	@Prop()
	public _alt!: string;

	@Watch('_alt')
	public watchAlt(value?: string): void {
		altProp.apply(value, (v) => this.setRenderProp('alt', v));
	}

	/**
	 * Defines the loading mode for the image.
	 */
	@Prop()
	public _loading?: LoadingType;

	@Watch('_loading')
	public watchLoading(value?: LoadingType): void {
		loadingProp.apply(value, (v) => this.setRenderProp('loading', v));
	}

	/**
	 * Defines the image sizes for different screen resolutions, supporting _srcset.
	 */
	@Prop()
	public _sizes?: string;

	@Watch('_sizes')
	public watchSizes(value?: string): void {
		sizesProp.apply(value, (v) => this.setRenderProp('sizes', v));
	}

	/**
	 * Sets the image `src` attribute to the given string.
	 */
	@Prop()
	public _src!: string;

	@Watch('_src')
	public watchSrc(value?: string): void {
		srcProp.apply(value, (v) => this.setRenderProp('src', v));
	}

	/**
	 * Sets a list of source URLs with widths of the images.
	 */
	@Prop()
	public _srcset?: string;

	@Watch('_srcset')
	public watchSrcset(value?: string): void {
		srcsetProp.apply(value, (v) => this.setRenderProp('srcset', v));
	}

	/**
	 * Defines callbacks for image load events (`onError`, `onLoad`).
	 */
	@Prop()
	public _on?: KoliBriImageEventCallbacks;

	public componentWillLoad(): void {
		this.initRenderProps(imagePropsConfig);

		altProp.apply(this._alt, (v) => this.setRenderProp('alt', v));
		loadingProp.apply(this._loading, (v) => this.setRenderProp('loading', v));
		sizesProp.apply(this._sizes, (v) => this.setRenderProp('sizes', v));
		srcProp.apply(this._src, (v) => this.setRenderProp('src', v));
		srcsetProp.apply(this._srcset, (v) => this.setRenderProp('srcset', v));
	}

	public render(): JSX.Element {
		return (
			<Host>
				<ImageFC
					alt={this.getRenderProp('alt')}
					loading={this.getRenderProp('loading')}
					sizes={this.getRenderProp('sizes')}
					src={this.getRenderProp('src')}
					srcset={this.getRenderProp('srcset')}
					handleError={this.handleError}
					handleLoad={this.handleLoad}
				/>
			</Host>
		);
	}
}
