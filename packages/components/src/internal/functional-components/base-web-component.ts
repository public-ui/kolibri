import type { ComponentApi, InternalOf, PropsConfigShape, ResolvedInputProps, ResolvedProps, StateAccess, StrictFields } from './generic-types';

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
 * Throws when a stateless behavior accidentally attempts to read or write state.
 * Used as the implementation behind {@link BaseWebComponent.stateLess}.
 */
function throwNoStateAccess(): never {
	throw new Error('This behavior does not use component state.');
}

/**
 * Base class for web components that provides type-safe state access and
 * render-prop management. Subclasses are the orchestrators: they hold the
 * `@Prop`/`@State`/`@Watch` declarations, compose behaviors, and feed fully
 * resolved render props to the functional component.
 *
 * Each WC manages two property layers:
 * - **Raw props**: the unprocessed values received from `@Prop`.
 * - **Render props**: the validated and normalized values used for rendering.
 *
 * State access (setState/getState) is provided via {@link stateAccess},
 * which is also passed to composed behaviors ({@link TooltipBehavior}, etc.).
 * Stateless behaviors receive {@link BaseWebComponent.stateLess}.
 */
export abstract class BaseWebComponent<Api extends ComponentApi> {
	/** Stores unprocessed property values as received from the @Prop. */
	private readonly rawProps: Partial<Record<string, unknown>> = {};

	/** Stores validated and normalized property values ready for rendering. */
	private renderProps: StrictFields<ResolvedProps<Api>> | undefined;

	/** Writes a value into the web component's reactive Stencil state. */
	protected readonly setState = <K extends keyof InternalOf<NonNullable<Api['States']>>>(key: K, value: InternalOf<NonNullable<Api['States']>>[K]): void => {
		(this as Record<string, unknown>)[key as string] = value;
	};

	/** Reads a value from the web component's reactive Stencil state. */
	protected readonly getState = <K extends keyof InternalOf<NonNullable<Api['States']>>>(key: K): InternalOf<NonNullable<Api['States']>>[K] => {
		return (this as Record<string, unknown>)[key as string] as InternalOf<NonNullable<Api['States']>>[K];
	};

	/**
	 * Bundled state access for passing to behaviors.
	 */
	protected readonly stateAccess: StateAccess<Api> = {
		setState: this.setState,
		getState: this.getState,
	};

	/**
	 * Frozen sentinel for behaviors that do not need component state.
	 * Both `setState` and `getState` throw if called, catching accidental
	 * state access at runtime.
	 *
	 * Pass this to a behavior constructor in web components whose
	 * behavior only uses render props (no `@State` fields).
	 */
	public static readonly stateLess: StateAccess<never> = Object.freeze({
		setState: throwNoStateAccess,
		getState: throwNoStateAccess,
	});

	/**
	 * Initializes the render-prop store from a props configuration.
	 * Must be called once in `componentWillLoad` before any `setRenderProp` / `getRenderProp` call.
	 */
	protected initRenderProps(config: PropsConfigShape): void {
		this.renderProps = buildDefaultPropsFromConfig(config) as StrictFields<ResolvedProps<Api>>;
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
		if (this.renderProps) {
			this.renderProps[key] = value;
		}
	}

	/** Returns the current validated render value for a property. */
	public getRenderProp<K extends keyof ResolvedProps<Api>>(key: K): StrictFields<ResolvedProps<Api>>[K] {
		return this.renderProps![key];
	}
}
