import type { ComponentApi, GetStateFn, InternalOf, SetStateFn } from './generic-types';

/**
 * Base class for web components that provides a type-safe setState method.
 * Subclasses pass `this.setState` to their controller constructors, ensuring
 * that all state writes are validated against Api['States'] at compile time.
 */
export abstract class BaseWebComponent<Api extends ComponentApi> {
	/**
	 * Sets a reactive @State field with type safety.
	 * The key must be a valid state field name defined in Api['States'],
	 * and the value must match its declared type.
	 * Each call triggers a Stencil re-render.
	 */
	public setState: SetStateFn<Api> = <K extends keyof InternalOf<NonNullable<Api['States']>>>(
		key: K,
		value: InternalOf<NonNullable<Api['States']>>[K],
	): void => {
		(this as Record<string, unknown>)[key as string] = value;
	};

	/**
	 * Reads a reactive @State field with type safety.
	 * The key must be a valid state field name defined in Api['States'],
	 * and it returns the current value with the correct type.
	 */
	public getState: GetStateFn<Api> = <K extends keyof InternalOf<NonNullable<Api['States']>>>(key: K): InternalOf<NonNullable<Api['States']>>[K] => {
		return (this as Record<string, unknown>)[key as string] as InternalOf<NonNullable<Api['States']>>[K];
	};
}
