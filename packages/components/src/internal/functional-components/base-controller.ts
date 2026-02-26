import type { ComponentApi, InternalOf, ResolvedProps, StrictFields } from './generic-types';

type InternalStates<Api extends ComponentApi> = InternalOf<NonNullable<Api['States']>>;

export abstract class BaseController<Api extends ComponentApi> {
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

	protected setState<K extends keyof InternalStates<Api>>(key: K, value: InternalStates<Api>[K]): void {
		(this.component as Record<string, unknown>)[key as string] = value;
	}
}
