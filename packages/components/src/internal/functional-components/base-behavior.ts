import type { ComponentApi, GetStateFn, PropsConfigShape, ResolvedProps, SetStateFn, StateAccess, StrictFields } from './generic-types';

/**
 * Builds a record of default property values from a props configuration.
 * Iterates over all required and optional property definitions and
 * collects their initial values.
 */
function buildDefaultPropsFromConfig(config: PropsConfigShape): Record<string, unknown> {
	const defaults: Record<string, unknown> = {};
	for (const def of [...(config.required ?? []), ...(config.optional ?? [])]) {
		defaults[def.propName] = def.getDefaultValue();
	}
	return defaults;
}

/**
 * Abstract base class for composable behaviors.
 *
 * A behavior is a reusable unit of logic that lives INSIDE a web component.
 * It manages its own render props but receives state access from its host
 * WC — either a real `StateAccess` or {@link BaseWebComponent.stateLess}
 * for stateless behaviors.
 *
 * Example:
 * ```ts
 * export class TooltipBehavior extends BaseBehavior<TooltipApi> {
 *   // show/hide tooltip, listener syncing, positioning...
 * }
 *
 * // Inside a WC:
 * private readonly tooltip = new TooltipBehavior(this.stateAccess);
 * ```
 *
 * Key rule: a WC has exactly one orchestrator (itself), plus N behaviors.
 * Behaviors must never instantiate other behaviors directly — the WC
 * composes them.
 */
export abstract class BaseBehavior<Api extends ComponentApi> {
	/** Stores validated and normalized property values ready for rendering. */
	private readonly renderProps: StrictFields<ResolvedProps<Api>>;

	/** Writes a value into the web component's reactive Stencil state. */
	protected readonly setState: SetStateFn<Api>;

	/** Reads a value from the web component's reactive Stencil state. */
	protected readonly getState: GetStateFn<Api>;

	/**
	 * @param stateAccess - Bundled setState/getState provided by the web component,
	 *   or {@link BaseWebComponent.stateLess} for stateless behaviors.
	 * @param propsConfig - Property configuration defining required/optional props
	 *   and their default values.
	 */
	protected constructor(stateAccess: StateAccess<Api>, propsConfig: PropsConfigShape) {
		this.setState = stateAccess.setState;
		this.getState = stateAccess.getState;
		this.renderProps = buildDefaultPropsFromConfig(propsConfig) as StrictFields<ResolvedProps<Api>>;
	}

	/**
	 * Stores a validated and normalized property value for rendering.
	 * This is the value the functional component will receive.
	 */
	protected setRenderProp<K extends keyof ResolvedProps<Api>>(key: K, value: StrictFields<ResolvedProps<Api>>[K]): void {
		this.renderProps[key] = value;
	}

	/** Returns the current validated render value for a property. */
	public getRenderProp<K extends keyof ResolvedProps<Api>>(key: K): StrictFields<ResolvedProps<Api>>[K] {
		return this.renderProps[key];
	}
}
