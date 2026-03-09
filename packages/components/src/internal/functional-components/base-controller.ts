import type { ComponentApi, GetStateFn, ResolvedInputProps, ResolvedProps, SetStateFn, StrictFields } from './generic-types';

export abstract class BaseController<Api extends ComponentApi> {
	private readonly rawProps: Partial<Record<string, unknown>> = {};
	private readonly renderProps: StrictFields<ResolvedProps<Api>>;

	public constructor(
		protected readonly defaultProps: StrictFields<ResolvedProps<Api>>,
		protected readonly setState: SetStateFn<Api> = () => {},
		protected readonly getState?: GetStateFn<Api>,
	) {
		this.renderProps = {
			...defaultProps,
		};
	}

	protected getDefaultProp<K extends keyof ResolvedProps<Api>>(key: K): NonNullable<ResolvedProps<Api>[K]> {
		return this.defaultProps[key] as NonNullable<ResolvedProps<Api>[K]>;
	}

	protected setRawProp<K extends keyof ResolvedInputProps<Api>>(key: K, value: ResolvedInputProps<Api>[K] | undefined): void {
		this.rawProps[key as string] = value;
	}

	protected getRawProp<K extends keyof ResolvedInputProps<Api>>(key: K): ResolvedInputProps<Api>[K] | undefined {
		return this.rawProps[key as string] as ResolvedInputProps<Api>[K] | undefined;
	}

	protected setRenderProp<K extends keyof ResolvedProps<Api>>(key: K, value: StrictFields<ResolvedProps<Api>>[K]): void {
		this.renderProps[key] = value;
	}

	public getRenderProp<K extends keyof ResolvedProps<Api>>(key: K): StrictFields<ResolvedProps<Api>>[K] {
		return this.renderProps[key];
	}
}
