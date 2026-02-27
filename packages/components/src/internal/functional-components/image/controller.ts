import type { AltProp, LoadingProp, LoadingType, SizesProp, SrcProp, SrcsetProp } from '../../props';
import { altProp, loadingProp, sizesProp, srcProp, srcsetProp, withValidPropValue } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedInputProps } from '../generic-types';
import type { ImageApi } from './api';

export class ImageController extends BaseController<ImageApi> implements ControllerInterface<ImageApi> {
	public constructor(states: ImageApi['States'] = {}) {
		super(states, {
			alt: '',
			loading: 'lazy',
			sizes: '',
			src: '',
			srcset: '',
		});
	}

	public componentWillLoad(props: ResolvedInputProps<ImageApi>): void {
		const { alt, loading, sizes, src, srcset } = props;
		this.watchAlt(alt);
		this.watchLoading(loading);
		this.watchSizes(sizes);
		this.watchSrc(src);
		this.watchSrcset(srcset);
	}

	public watchAlt(value?: string): void {
		withValidPropValue<AltProp>(altProp, value, (v) => {
			this.setProp('alt', v);
		});
	}

	public watchLoading(value?: LoadingType): void {
		withValidPropValue<LoadingProp>(loadingProp, value, (v) => {
			this.setProp('loading', v);
		});
	}

	public watchSizes(value?: string): void {
		withValidPropValue<SizesProp>(sizesProp, value, (v) => {
			this.setProp('sizes', v);
		});
	}

	public watchSrc(value?: string): void {
		withValidPropValue<SrcProp>(srcProp, value, (v) => {
			this.setProp('src', v);
		});
	}

	public watchSrcset(value?: string): void {
		withValidPropValue<SrcsetProp>(srcsetProp, value, (v) => {
			this.setProp('srcset', v);
		});
	}
}
