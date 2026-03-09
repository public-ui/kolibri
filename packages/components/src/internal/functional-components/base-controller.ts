import type { ComponentApi, InternalOf, ResolvedInputProps, ResolvedProps, StrictFields } from './generic-types';

type InternalStates<Api extends ComponentApi> = InternalOf<NonNullable<Api['States']>>;

export abstract class BaseController<Api extends ComponentApi> {
	private readonly props: StrictFields<ResolvedProps<Api>>;
	private readonly rawProps: Partial<Record<string, unknown>> = {};

	public constructor(
		protected readonly component: InternalStates<Api>,
		protected readonly defaultProps: StrictFields<ResolvedProps<Api>>,
	) {
		this.props = {
			...defaultProps,
		};
	}

	protected getDefaultProp<K extends keyof ResolvedProps<Api>>(key: K): NonNullable<ResolvedProps<Api>[K]> {
		return this.defaultProps[key] as NonNullable<ResolvedProps<Api>[K]>;
	}

	protected setProp<K extends keyof ResolvedProps<Api>>(key: K, value: StrictFields<ResolvedProps<Api>>[K]): void {
		this.props[key] = value;
	}

	public getProps(): StrictFields<ResolvedProps<Api>> {
		return this.props;
	}

	protected setRawProp<K extends keyof ResolvedInputProps<Api>>(key: K, value: ResolvedInputProps<Api>[K] | undefined): void {
		this.rawProps[key as string] = value;
	}

	protected getRawProps(): Partial<ResolvedInputProps<Api>> {
		return this.rawProps as Partial<ResolvedInputProps<Api>>;
	}

	protected setState<K extends keyof InternalStates<Api>>(key: K, value: InternalStates<Api>[K]): void {
		(this.component as Record<string, unknown>)[key as string] = value;
	}
}
