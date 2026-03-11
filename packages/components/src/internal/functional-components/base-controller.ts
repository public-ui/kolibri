import type { ComponentApi, GetStateFn, PropsConfigShape, ResolvedInputProps, ResolvedProps, SetStateFn, StrictFields } from './generic-types';

function buildDefaultPropsFromConfig(config: PropsConfigShape): Record<string, unknown> {
	const defaults: Record<string, unknown> = {};
	for (const def of [...(config.required ?? []), ...(config.optional ?? [])]) {
		defaults[def.propName] = def.getDefaultValue();
	}
	return defaults;
}

export abstract class BaseController<Api extends ComponentApi> {
	private readonly rawProps: Partial<Record<string, unknown>> = {};
	private readonly renderProps: StrictFields<ResolvedProps<Api>>;

	public constructor(
		propsConfig: PropsConfigShape,
		protected readonly setState: SetStateFn<Api>,
		protected readonly getState: GetStateFn<Api>,
	) {
		this.renderProps = buildDefaultPropsFromConfig(propsConfig) as StrictFields<ResolvedProps<Api>>;
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
