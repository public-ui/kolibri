import type { ComponentApi, InternalOf, StateAccess } from './generic-types';

/**
 * Throws when a stateless controller accidentally attempts to read or write state.
 * Used as the implementation behind {@link BaseWebComponent.withoutState}.
 */
function throwNoStateAccess(): never {
	throw new Error('This controller does not use component state.');
}

/**
 * Base class for web components that provides type-safe state access.
 * Subclasses pass `this.stateAccess` to their controller constructors, ensuring
 * that all state reads and writes are validated against Api['States'] at compile time.
 */
export abstract class BaseWebComponent<Api extends ComponentApi> {
	/**
	 * Frozen sentinel for controllers that do not need component state.
	 * Both `setState` and `getState` throw if called, catching accidental
	 * state access at runtime.
	 *
	 * Pass this to the controller constructor in web components whose
	 * controller only uses render props (no `@State` fields).
	 */
	public static readonly withoutState: StateAccess<never> = Object.freeze({
		setState: throwNoStateAccess,
		getState: throwNoStateAccess,
	});

	/**
	 * Bundled state access for passing to controllers.
	 * Writes trigger a Stencil re-render via the @State decorator on the subclass.
	 */
	protected readonly stateAccess: StateAccess<Api> = {
		setState: <K extends keyof InternalOf<NonNullable<Api['States']>>>(key: K, value: InternalOf<NonNullable<Api['States']>>[K]): void => {
			(this as Record<string, unknown>)[key as string] = value;
		},
		getState: <K extends keyof InternalOf<NonNullable<Api['States']>>>(key: K): InternalOf<NonNullable<Api['States']>>[K] => {
			return (this as Record<string, unknown>)[key as string] as InternalOf<NonNullable<Api['States']>>[K];
		},
	};
}
