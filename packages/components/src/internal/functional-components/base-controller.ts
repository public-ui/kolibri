import type { ComponentApi, GetStateFn, PropsConfigShape, ResolvedInputProps, ResolvedProps, SetStateFn, StateAccess, StrictFields } from './generic-types';

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
 * Abstract base class for component controllers.
 * Controllers encapsulate validation, normalization, and business logic
 * for component properties, keeping web components thin.
 *
 * Each controller manages two property layers:
 * - **Raw props**: the unprocessed values received from the web component.
 * - **Render props**: the validated and normalized values used for rendering.
 *
 * State access (setState/getState) is provided by the web component via
 * {@link StateAccess}. Controllers that do not need component state
 * receive {@link BaseWebComponent.stateLess}.
 */
export abstract class BaseController<Api extends ComponentApi> {
	/** Stores unprocessed property values as received from the web component. */
	private readonly rawProps: Partial<Record<string, unknown>> = {};

	/** Stores validated and normalized property values ready for rendering. */
	private readonly renderProps: StrictFields<ResolvedProps<Api>>;

	/** Writes a value into the web component's reactive Stencil state. */
	protected readonly setState: SetStateFn<Api>;

	/** Reads a value from the web component's reactive Stencil state. */
	protected readonly getState: GetStateFn<Api>;

	/**
	 * @param stateAccess - Bundled setState/getState provided by the web component,
	 *   or {@link BaseWebComponent.stateLess} for stateless controllers.
	 * @param propsConfig - Property configuration defining required/optional props
	 *   and their default values.
	 */
	protected constructor(stateAccess: StateAccess<Api>, propsConfig: PropsConfigShape) {
		this.setState = stateAccess.setState;
		this.getState = stateAccess.getState;
		this.renderProps = buildDefaultPropsFromConfig(propsConfig) as StrictFields<ResolvedProps<Api>>;
	}

	/**
	 * Stores an unprocessed property value before validation.
	 * Useful for comparisons in watch handlers to detect actual changes.
	 */
	protected setRawProp<K extends keyof ResolvedInputProps<Api>>(key: K, value: ResolvedInputProps<Api>[K] | undefined): void {
		this.rawProps[key as string] = value;
	}

	/** Returns the last stored raw (unprocessed) value for a property. */
	protected getRawProp<K extends keyof ResolvedInputProps<Api>>(key: K): ResolvedInputProps<Api>[K] | undefined {
		return this.rawProps[key as string] as ResolvedInputProps<Api>[K] | undefined;
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
