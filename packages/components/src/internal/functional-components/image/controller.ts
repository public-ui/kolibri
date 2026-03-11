import type { LoadingType } from '../../props';
import { altProp, loadingProp, sizesProp, srcProp, srcsetProp } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, GetStateFn, ResolvedInputProps, SetStateFn } from '../generic-types';
import type { ImageApi } from './api';
import { imagePropsConfig } from './api';

export class ImageController extends BaseController<ImageApi> implements ControllerInterface<ImageApi> {
	public constructor(setState: SetStateFn<ImageApi>, getState: GetStateFn<ImageApi>) {
		super(imagePropsConfig, setState, getState);
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
		altProp.apply(value, (v) => {
			this.setRenderProp('alt', v);
		});
	}

	public watchLoading(value?: LoadingType): void {
		loadingProp.apply(value, (v) => {
			this.setRenderProp('loading', v);
		});
	}

	public watchSizes(value?: string): void {
		sizesProp.apply(value, (v) => {
			this.setRenderProp('sizes', v);
		});
	}

	public watchSrc(value?: string): void {
		srcProp.apply(value, (v) => {
			this.setRenderProp('src', v);
		});
	}

	public watchSrcset(value?: string): void {
		srcsetProp.apply(value, (v) => {
			this.setRenderProp('srcset', v);
		});
	}
}
