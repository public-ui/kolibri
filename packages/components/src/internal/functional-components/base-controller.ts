import type { ComponentApi, InternalOf, ResolvedInputProps, ResolvedProps, StrictFields } from './generic-types';

type InternalStates<Api extends ComponentApi> = InternalOf<NonNullable<Api['States']>>;

export abstract class BaseController<Api extends ComponentApi> {
	private readonly rawProps: Partial<Record<string, unknown>> = {};

	public constructor(
		protected readonly component: InternalStates<Api>,
		private readonly props: StrictFields<ResolvedProps<Api>>,
	) {}

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
