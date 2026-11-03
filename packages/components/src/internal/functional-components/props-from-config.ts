import type { ApiFromConfig, ComponentApi, PropsConfigShape, ResolvedFunctionalComponentProps, ResolvedProps } from './generic-types';

/**
 * Builds a record of default property values from a props configuration.
 * Iterates over all required and optional property definitions and
 * collects their initial values.
 */
export function buildDefaultPropsFromConfig(config: PropsConfigShape): Record<string, unknown> {
	const defaults: Record<string, unknown> = {};
	for (const def of [...(config.required ?? []), ...(config.optional ?? [])]) {
		defaults[def.propName] = def.getDefaultValue();
	}
	return defaults;
}

/**
 * `ApiFromConfig` of a concrete config is a full `ComponentApi`; the intersection keeps the
 * still-unresolved generic of the signature inside the `ComponentApi` constraint.
 */
type ApiOf<Config extends PropsConfigShape> = ApiFromConfig<Config> & ComponentApi;

/**
 * Resolves a functional component's props: every optional prop omitted by the caller receives its
 * configured default, everything else passes through unchanged. A key present in `props` wins even
 * when its value is `undefined` — that is how `unsetRenderProp` keeps genuinely unsettable props
 * (such as the meter's boundaries) absent instead of carrying their default.
 *
 * The config must be the component's own props config. The `props` constraint checks the value
 * props against the config — the only domain this function touches — so a config of another
 * component fails the call when their required and optional slots disagree. Callbacks, refs and
 * states stay outside the check: a component may treat them freely in its own FC-facing props
 * type (as the card does for the link observers).
 */
export function resolveFcProps<Config extends PropsConfigShape, P extends ResolvedProps<ApiOf<Config>> = ResolvedProps<ApiOf<Config>>>(
	config: Config,
	props: P,
): ResolvedFunctionalComponentProps<ApiOf<Config>> & P {
	return { ...buildDefaultPropsFromConfig(config), ...props } as ResolvedFunctionalComponentProps<ApiOf<Config>> & P;
}
