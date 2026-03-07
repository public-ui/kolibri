import type { ComponentApi, InternalOf, ResolvedProps, StrictFields } from './generic-types';

type InternalStates<Api extends ComponentApi> = InternalOf<NonNullable<Api['States']>>;

export abstract class BaseController<Api extends ComponentApi> {
	private readonly props: Partial<StrictFields<ResolvedProps<Api>>> = {};

	public constructor(protected readonly component: InternalStates<Api> = {} as InternalStates<Api>) {}

	protected setProp<K extends keyof ResolvedProps<Api>>(key: K, value: StrictFields<ResolvedProps<Api>>[K]): void {
		this.props[key] = value;
	}

	public getProps(): StrictFields<ResolvedProps<Api>> {
		return this.props as StrictFields<ResolvedProps<Api>>;
	}

	protected setState<K extends keyof InternalStates<Api>>(key: K, value: InternalStates<Api>[K]): void {
		(this.component as Record<string, unknown>)[key as string] = value;
	}
}
