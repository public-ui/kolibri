import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { PropsConfigShape, WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { ImageApi } from '../../internal/functional-components/image/api';
import { imagePropsConfig } from '../../internal/functional-components/image/api';
import { ImageFC } from '../../internal/functional-components/image/component';
import { altProp, imageCallbacksProp, loadingProp, sizesProp, srcProp, srcsetProp, type LoadingType } from '../../internal/props';
import type { AltPropType, SizesPropType, SrcPropType, SrcsetPropType } from '../../schema';
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
	@Element()
	private readonly host?: HTMLKolImageElement;

	protected readonly propsConfig: PropsConfigShape = imagePropsConfig;

	/**
	 * Sets the alternative text of the image.
	 */
	@Prop()
	public _alt!: AltPropType;

	@Watch('_alt')
	public watchAlt(value?: AltPropType): void {
		this.applyProp(altProp, value);
	}

	/**
	 * Defines the loading mode for the image.
	 */
	@Prop()
	public _loading?: LoadingType = undefined;

	@Watch('_loading')
	public watchLoading(value?: LoadingType): void {
		this.applyProp(loadingProp, value);
	}

	/**
	 * Defines callbacks for image load events (`onError`, `onLoad`).
	 */
	@Prop()
	public _on?: KoliBriImageEventCallbacks = undefined;

	@Watch('_on')
	public watchOn(value?: KoliBriImageEventCallbacks): void {
		this.applyProp(imageCallbacksProp, value);
	}

	/**
	 * Defines the image sizes for different screen resolutions, supporting _srcset.
	 */
	@Prop()
	public _sizes?: SizesPropType = undefined;

	@Watch('_sizes')
	public watchSizes(value?: SizesPropType): void {
		this.applyProp(sizesProp, value);
	}

	/**
	 * Sets the image `src` attribute to the given string.
	 */
	@Prop()
	public _src!: SrcPropType;

	@Watch('_src')
	public watchSrc(value?: SrcPropType): void {
		this.applyProp(srcProp, value);
	}

	/**
	 * Sets a list of source URLs with widths of the images.
	 */
	@Prop()
	public _srcset?: SrcsetPropType = undefined;

	@Watch('_srcset')
	public watchSrcset(value?: SrcsetPropType): void {
		this.applyProp(srcsetProp, value);
	}

	public componentWillLoad(): void {
		this.watchAlt(this._alt);
		this.watchLoading(this._loading);
		this.watchOn(this._on);
		this.watchSizes(this._sizes);
		this.watchSrc(this._src);
		this.watchSrcset(this._srcset);
	}

	private readonly handleError = (event: Event): void => {
		this.getRenderProp('on').onError?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.error, event);
		}
	};

	private readonly handleLoad = (event: Event): void => {
		this.getRenderProp('on').onLoad?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.load, event);
		}
	};

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
