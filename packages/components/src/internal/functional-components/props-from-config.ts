import type { PropsConfigShape } from './generic-types';

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
